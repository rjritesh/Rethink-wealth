import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { db } from '@/services/firebase';
import { doc, getDoc } from "firebase/firestore";
import { isAdminCached, addAdminToCache } from '@/lib/adminSet';
import React from 'react';
import AdminHeader from '@/components/shared/AdminHeader';
import admin from '@/lib/adminAccess';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const token = (await cookies()).get('token')?.value;

  if (!token) redirect('/');

  let uid: string;
  try {
    const { uid: decodedUid } = await admin.auth().verifyIdToken(token);
    uid = decodedUid;
  } catch (err) {
    console.error('Token verification failed:', err);
    redirect('/');
  }

  // Fast return if UID is cached as admin
  if (isAdminCached(uid)) {
    return (
      <>
        <AdminHeader />
        {children}
      </>
    );
  }

  // Fetch user doc only if not cached
  const userSnap = await getDoc(doc(db, 'users', uid));

  if (!userSnap.exists() || !userSnap.data()?.role?.isAdmin) {
    redirect('/');
  }

  addAdminToCache(uid);

  return (
    <>
      <AdminHeader />
      {children}
    </>
  );
}
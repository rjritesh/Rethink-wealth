import * as admin from 'firebase-admin'
import type { ServiceAccount } from 'firebase-admin';
import serviceAccount from '@/lib/rethinkwealthabmin.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
  })
}

export default admin
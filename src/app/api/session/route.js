import { NextResponse } from 'next/server'

export async function POST(req) {
  const { token } = await req.json()
  const res = NextResponse.json({ success: true })
  res.cookies.set('token', token, {
    httpOnly: true,
    secure: true,
    path: '/',
    maxAge: 60 * 60 * 24,
  })
  return res
}
export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set('token', '', {
    httpOnly: true,
    secure: true,
    path: '/',
    maxAge: 0,
  });

  return res;
}

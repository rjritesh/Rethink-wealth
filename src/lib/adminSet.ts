const adminSet = new Set<string>();

export function isAdminCached(uid: string) {
  return adminSet.has(uid);
}

export function addAdminToCache(uid: string) {
  adminSet.add(uid);
}
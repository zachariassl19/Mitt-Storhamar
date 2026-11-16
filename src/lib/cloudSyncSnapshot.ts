import { mergeCloudStorage } from './cloudSyncMerge'

type StorageState = Record<string, string>

/**
 * Wait for the remote snapshot before reading local storage.
 *
 * A user can save a trip or expense while a slow request is in flight.
 * Reading local storage before the await risks replacing that new edit with
 * an older cloud snapshot when the response arrives.
 */
export async function reconcileAfterRemoteFetch<Remote>(
  fetchRemote: () => Promise<Remote>,
  remoteStorage: (remote: Remote) => StorageState | null | undefined,
  readLocal: () => StorageState,
): Promise<{ remote: Remote; local: StorageState; merged: StorageState }> {
  const remote = await fetchRemote()
  const local = readLocal()
  const cloud = remoteStorage(remote)
  const merged = cloud
    ? Object.keys(local).length === 0 ? cloud : mergeCloudStorage(cloud, local)
    : local
  return { remote, local, merged }
}

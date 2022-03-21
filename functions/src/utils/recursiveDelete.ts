import { to } from 'await-to-js';
import { error, info } from 'firebase-functions/logger';
import * as firebaseTools from 'firebase-tools';

/**
 * recursiveDelete recursively deletes documents and any subcollections
 * of a document using the firebase-tools module. This function should
 * usually only be used for top-level documents such as model or project
 * documents to easily clean up the subcollections of those documents.
 * Use with caution.
 * @param paths
 */
export async function recursiveDelete(path: string) {
  info(`Recursively deleting documents at path ${path} . . .`);
  const [deleteErr] = await to(
    firebaseTools.firestore.delete(path, {
      project: process.env.GCLOUD_PROJECT,
      recursive: true,
      yes: true,
    }),
  );

  if (deleteErr) {
    error(`Error recursively deleting documents at path ${path}`, deleteErr);
    throw deleteErr;
  }
}

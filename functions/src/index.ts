import * as functions from 'firebase-functions';
import { initializeApp } from 'firebase-admin/app';
import { recursiveDelete } from './utils/recursiveDelete';

initializeApp();

interface DeleteCollectionData {
  collectionName: string;
}

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const deleteCollection = functions.https.onCall(
  async (data: DeleteCollectionData) => {
    await recursiveDelete(data.collectionName);
    return true;
  },
);

import { deleteCollection } from '../src';
import * as firebaseFunctionsTest from 'firebase-functions-test';
import { to } from 'await-to-js';
import { getFirestore } from 'firebase-admin/firestore';

const test = firebaseFunctionsTest({
  projectId: process.env.GCLOUD_PROJECT,
});
const db = getFirestore();

describe('deleteCollection', () => {
  it('deletes collection and its subcollections', async () => {
    const docPaths = [
      '/parent-collection/parent-doc',
      '/parent-collection/parent-doc/child-collection-1/child-doc-1',
      '/parent-collection/parent-doc/child-collection-2/child-doc-2',
    ];

    for (const path of docPaths) {
      await db.doc(path).create({ foo: 'bar' });
    }

    const wrapped = test.wrap(deleteCollection);

    const [err] = await to(wrapped({ collectionName: 'parent-collection' }));

    expect(err).toBeFalsy();

    for (const path of docPaths) {
      const snapshot = await db.doc(path).get();

      expect(snapshot.exists).toBe(false);
    }
  });
});

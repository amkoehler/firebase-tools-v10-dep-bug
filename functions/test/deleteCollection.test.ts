import { deleteCollection } from '../src';
import * as firebaseFunctionsTest from 'firebase-functions-test';
import { to } from 'await-to-js';

const test = firebaseFunctionsTest({
  projectId: process.env.GCLOUD_PROJECT,
});

describe('deleteCollection', () => {
  it('deletes collection and its subcollections', async () => {
    // TODO set up collection and subcollection
    const wrapped = test.wrap(deleteCollection);

    const [err] = await to(wrapped({ collectionName: 'delete-parent' }));

    expect(err).toBeFalsy();

    // TODO check collections
  });
});

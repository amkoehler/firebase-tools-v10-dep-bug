# Firebase CLI v10 module error with Jest

This repo recreates a firebase-tools module issue when running unit tests with Jest that import the `firebase-tools` module in a node script. In the `functions/src` directory is a sample cloud function used for recursively deleting a collection. This was built based on the [example](https://firebase.google.com/docs/firestore/solutions/delete-collections) for deleting collections from a cloud function.

To see the issue, run the `npm run test` command first with the `firebase-tools` version 10 installed (default), then install firebase-tools version 9 and re-run `npm run test`.

```sh
$ npm install
$ npm run test

# ... test fails ⛔

$ npm install firebase-tools@9 && npm run test

# ... test works ✅

```

### Output with `firebase-tools` v10

```bash
❯ npm run test

> functions@ test /home/alex/dev/tinkering/firebase-tools-v10-dep-bug/functions
> npm run build && firebase emulators:exec "jest"

> functions@ build /home/alex/dev/tinkering/firebase-tools-v10-dep-bug/functions
> tsc

i emulators: Starting emulators: functions, firestore
⚠ functions: The following emulators are not running, calls to these services from the Functions emulator will affect production: auth, database, hosting, pubsub, storage
⚠ Your requested "node" version "16" doesn't match your global version "14". Using node@14 from host.
i firestore: Firestore Emulator logging to firestore-debug.log
i functions: Watching "/home/alex/dev/tinkering/firebase-tools-v10-dep-bug/functions" for Cloud Functions...
✔ functions[us-central1-recursiveDelete]: http function initialized (http://127.0.0.1:5001/test-project-ef3f6/us-central1/recursiveDelete).
i Running script: jest
console.warn
{"severity":"WARNING","message":"Warning, estimating Firebase Config based on GCLOUD_PROJECT. Initializing firebase-admin may fail"}

        at write (../node_modules/firebase-functions/lib/logger/index.js:44:78)
        at warn (../node_modules/firebase-functions/lib/logger/index.js:95:5)
        at setup (../node_modules/firebase-functions/lib/setup.js:46:31)
        at Object.<anonymous> (../node_modules/firebase-functions/lib/index.js:71:19)

FAIL test/deleteCollection.test.ts
● Test suite failed to run

    Cannot find module 'commander' from '../node_modules/firebase-tools/lib/index.js'

    Require stack:
        /home/alex/dev/tinkering/firebase-tools-v10-dep-bug/functions/node_modules/firebase-tools/lib/index.js
        /home/alex/dev/tinkering/firebase-tools-v10-dep-bug/functions/src/utils/recursiveDelete.ts
        /home/alex/dev/tinkering/firebase-tools-v10-dep-bug/functions/src/index.ts
        deleteCollection.test.ts

        at Resolver.resolveModule (../node_modules/jest-resolve/build/resolver.js:324:11)
        at Object.<anonymous> (../node_modules/firebase-tools/lib/index.js:2:15)

Test Suites: 1 failed, 1 total
Tests: 0 total
Snapshots: 0 total
Time: 2.752 s
Ran all test suites.
⚠ Script exited unsuccessfully (code 1)
i emulators: Shutting down emulators.
i functions: Stopping Functions Emulator
i firestore: Stopping Firestore Emulator
i hub: Stopping emulator hub

Error: Script "jest" exited with code 1
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! functions@ test: `npm run build && firebase emulators:exec "jest"`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the functions@ test script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR! /home/alex/.npm/\_logs/2022-03-21T18_36_59_936Z-debug.log
```

### Output with `firebase-tools` v9

```bash
❯ npm run test

> functions@ test /home/alex/dev/tinkering/firebase-tools-v10-dep-bug/functions
> npm run build && jest --clearCache && firebase --project=fakeproject emulators:exec "jest"


> functions@ build /home/alex/dev/tinkering/firebase-tools-v10-dep-bug/functions
> tsc

Cleared /tmp/jest_rs
i  emulators: Starting emulators: functions, firestore
⚠  functions: The following emulators are not running, calls to these services from the Functions emulator will affect production: auth, database, hosting, pubsub, storage
⚠  Your requested "node" version "16" doesn't match your global version "14"
⚠  functions: Unable to fetch project Admin SDK configuration, Admin SDK behavior in Cloud Functions emulator may be incorrect.
i  firestore: Firestore Emulator logging to firestore-debug.log
i  functions: Watching "/home/alex/dev/tinkering/firebase-tools-v10-dep-bug/functions" for Cloud Functions...
✔  functions[us-central1-recursiveDelete]: http function initialized (http://127.0.0.1:5001/fakeproject/us-central1/recursiveDelete).
i  Running script: jest
  console.warn
    {"severity":"WARNING","message":"Warning, estimating Firebase Config based on GCLOUD_PROJECT. Initializing firebase-admin may fail"}

      at write (../node_modules/firebase-functions/lib/logger/index.js:44:78)
      at warn (../node_modules/firebase-functions/lib/logger/index.js:95:5)
      at setup (../node_modules/firebase-functions/lib/setup.js:46:31)
      at Object.<anonymous> (../node_modules/firebase-functions/lib/index.js:71:19)

  console.info
    {"severity":"INFO","message":"Recursively deleting documents at path parent-collection . . ."}

      at write (../node_modules/firebase-functions/lib/logger/index.js:44:78)

i  You have set FIRESTORE_EMULATOR_HOST=127.0.0.1:8080, this command will execute against the Firestore Emulator running at that address.
Deleted 3 docs (Infinity docs/s)
 PASS  test/deleteCollection.test.ts (6.518 s)
  deleteCollection
    ✓ deletes collection and its subcollections (1625 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        6.562 s
Ran all test suites.
✔  Script exited successfully (code 0)
i  emulators: Shutting down emulators.
i  functions: Stopping Functions Emulator
i  firestore: Stopping Firestore Emulator
i  hub: Stopping emulator hub
```

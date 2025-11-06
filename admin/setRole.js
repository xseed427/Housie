/**
 * setRole.js
 * Usage:
 * 1. Place your Firebase service account JSON at ./admin/serviceAccountKey.json
 * 2. npm install firebase-admin
 * 3. node setRole.js user@example.com organizer
 *
 * This script finds the user by email in Firebase Auth, then updates their Firestore user document role.
 */
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const keyPath = path.join(__dirname, 'serviceAccountKey.json');
if (!fs.existsSync(keyPath)) {
  console.error('Missing serviceAccountKey.json in admin folder. Place your service account key there.');
  process.exit(1);
}
admin.initializeApp({
  credential: admin.credential.cert(require(keyPath))
});

const firestore = admin.firestore();
const auth = admin.auth();

async function setRoleByEmail(email, role) {
  try {
    const user = await auth.getUserByEmail(email);
    console.log('Found user uid=', user.uid);
    // Update Firestore user doc
    const userRef = firestore.collection('users').doc(user.uid);
    await userRef.set({ role: role }, { merge: true });
    console.log('Role set to', role);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

const argv = process.argv.slice(2);
if (argv.length < 2) {
  console.error('Usage: node setRole.js user@example.com role');
  process.exit(1);
}
setRoleByEmail(argv[0], argv[1]);

# housie-secure — Changes summary

Changes applied:
- Removed any public role selection from signup forms.
- Forces new users to be created with role: "player".
- Added admin/setRole.js script to manually promote users to "organizer" or "admin".
- Minimal inline comments added where modifications were made.

How to use admin script:
1. Put your Firebase service account JSON at `admin/serviceAccountKey.json`.
2. Install firebase-admin: `npm install firebase-admin`.
3. Run: `node admin/setRole.js user@example.com organizer`

Notes:
- Verify your firebase config and environment when running locally.
- This project assumes a React frontend using Firebase Auth + Firestore.

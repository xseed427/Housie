# SECURITY

- Only assign `organizer` or `admin` roles to trusted users.
- Keep your service account key secure; do not commit it to version control.
- Consider adding Firestore security rules in production to restrict role modifications to admins only.

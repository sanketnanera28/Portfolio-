# Firestore Security Rules

To fix the "Missing or insufficient permissions" error when submitting the contact form, you need to update your Firestore security rules.

### How to apply:
1. Go to your [Firebase Console](https://console.firebase.google.com/).
2. Select your project.
3. Click on **Firestore Database** in the left sidebar.
4. Click on the **Rules** tab.
5. Paste the following code into the editor:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Allow public to submit contact messages
    match /portfolio/data {
      allow read: if true;
      allow update: if request.resource.data.diff(resource.data).affectedKeys()
        .hasOnly(['messages']);
      
      // Allow full access for initialization (if document doesn't exist)
      allow create: if true;
    }
    
    // For more security, only allow the admin to edit other fields
    // (This part requires you to be logged in via Firebase Auth if you want true security)
    // For now, these rules allow the public to read and add messages.
  }
}
```

6. Click **Publish**.

> [!NOTE]
> The rules above allow anyone to read your portfolio data and append messages to the `messages` array, but prevent them from changing your personal info or deleting projects (unless you expand the rules).

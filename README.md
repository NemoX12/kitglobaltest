# Global KIT SSR Test App

Simple one-page blog created using React, NextJS, Firebase.

### Main Features:

- Create a post
- Edit a post
- Delete a post
- Add a comment

## Requirements

User should have installed following requirements:

```
Node 22.x+
NPM 10.x+
```

## Instalation

1. Clone the project on local machine

   `git clone https://github.com/NemoX12/kitglobaltest.git`

2. Open project's directory

   `cd kitglobaltest`

3. Install all dependencies

   `npm i`

## Firebase Config

```ts
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
```

To change all keys you should do the following:

1. Create a `.env.local` file

2. Insert your keys from Firebase console:

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

## Usage

To run locally on your device, use:

`npm run dev`

By default it should be listening on:

`http://localhost:3000/`

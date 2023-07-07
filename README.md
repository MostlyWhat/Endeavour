# Endeavour

Introducing Endeavour, a social media inspired by Twitter and built with Next.js + TypeScript + Tailwind CSS using Cloud Firestore and Storage.

## Live Preview 📸

You can see the live website [here](https://endeavour.mostlywhat.com).

## Features ✨

- Authentication with Firebase Authentication
- Strongly typed React components with TypeScript
- Users can add transmits, like, retransmit, and reply
- Users can delete transmits, add a transmit to bookmarks, and pin their transmit
- Users can add images and GIFs to transmit
- Users can follow and unfollow other users
- Users can see their and other followers and the following list
- Users can see all users and the trending list
- Realtime update likes, retransmits, and user profile
- Realtime trending data from Twitter API
- User can edit their profile
- Responsive design for mobile, tablet, and desktop
- Users can customize the site color scheme and color background
- All images uploads are stored on Firebase Cloud Storage

## Tech 🛠

- [Next.js](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Firebase](https://firebase.google.com)
- [SWR](https://swr.vercel.app)
- [Headless UI](https://headlessui.com)
- [React Hot Toast](https://react-hot-toast.com)
- [Framer Motion](https://framer.com)

## Development 💻

Here are the steps to run the project locally.

1. Clone the repository

   ```bash
   git clone https://github.com/mostlywhat/endeavour.git
   ```

1. Install dependencies

   ```bash
   npm i
   ```

1. Create a Firebase project and select the web app

1. Add your Firebase config to `.env.development`. Note that `NEXT_PUBLIC_MEASUREMENT_ID` is optional

1. Make sure you have enabled the following Firebase services:

   - Authentication. Enable the Google sign-in method.
   - Cloud Firestore. Create a database and set its location to your nearest region.
   - Cloud Storage. Create a storage bucket.

1. Install Firebase CLI globally

   ```bash
   npm i -g firebase-tools
   ```

1. Log in to Firebase

   ```bash
   firebase login
   ```

1. Use the project ID

   ```bash
   firebase use endeavour-systems
   ```

1. Deploy Firestore rules, Firestore indexes, and Cloud Storage rules

   ```bash
   firebase deploy --except functions
   ```

1. Run the project

   ```bash
   npm run dev
   ```

> **_Note_**: When you deploy Firestore indexes rules, it might take a few minutes to complete. So before the indexes are enabled, you will get an error when you fetch the data from Firestore.<br><br>You can check the status of your Firestore indexes with the link below, replace `your-project-id` with your project ID: https://console.firebase.google.com/u/0/project/your-project-id/firestore/indexes

## Deployment 🚀

The project is deployed on [Vercel](https://vercel.com).

## License 📝

This project is not licensed. See the [Terms and Conditions](https://endeavour.mostlywhat.com/legal/terms-and-conditions) for details.

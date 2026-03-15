# LifeOS - Personal Productivity Web App

LifeOS is a modern **life management system** that helps you track:

- Daily planner (goals, to-dos, mood, gratitude)
- Habits (workout, skincare, haircare)
- Food diary & exercise
- Glow-up tracker
- Photo timeline
- Tracker charts (steps, sleep, water, reading, skills, screen time, social media, sunlight)
- All charts support **daily, weekly, monthly, half-yearly, yearly filters**
- Data stored in **Firebase Firestore** and photos in **Firebase Storage**
- Offline storage and persistent data

---

## **Setup Instructions**

1. **Clone or download the LifeOS folder.**

2. **Firebase Setup**
   - Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
   - Enable **Authentication**:
     - Google Sign-In
     - Email/Password
   - Enable **Firestore Database**
   - Enable **Storage**
   - Copy your Firebase config keys and replace placeholders in:
     - `index.html`
     - `dashboard.html`

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_AUTH_DOMAIN_HERE",
  projectId: "YOUR_PROJECT_ID_HERE",
  storageBucket: "YOUR_STORAGE_BUCKET_HERE",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID_HERE"
};

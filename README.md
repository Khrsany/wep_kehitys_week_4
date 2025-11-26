# Media Browser – Custom Hooks Assignment

This project is part of the WEP-kurssi (Web Programming) at Metropolia University of Applied Sciences.

In this assignment, the media fetching logic was refactored into a custom React hook called **useMedia**.  
The goal was to separate the business logic from UI components and make the code easier to maintain.

---

## 📁 Live Demo

Open the deployed version in your browser:

👉 **https://users.metropolia.fi/~alabassa/custom-hooks**

---

## 🧩 What Was Done in This Assignment

- Created a new Git branch: **custom-hooks**
- Added a `hooks/` folder inside `src`
- Implemented `useMedia()` in `apiHooks.js`
- Moved:
  - `mediaArray` state
  - `getMedia()` function
  - `useEffect()` fetching logic  
    from **Home.jsx** into the custom hook
- Cleaned up Home.jsx so it only handles UI
- Built the project with Vite
- Uploaded the `dist` build to `public_html/custom-hooks`

---

## 🚀 How to Run Locally

https://users.metropolia.fi/~alabassa/forms

## Context / Shared State

Open [Context App](https://users.metropolia.fi/~alabassa/context) to view it in the browser.

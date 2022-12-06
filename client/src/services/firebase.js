import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "app-60174.firebaseapp.com",
    projectId: "app-60174",
    storageBucket: "app-60174.appspot.com",
    messagingSenderId: "776909151558",
    appId: "1:776909151558:web:c2f47a317640baabc75947",
    measurementId: "G-CV1MS5S0PH"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()

export default app;
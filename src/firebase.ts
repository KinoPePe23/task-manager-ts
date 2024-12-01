// firebase.ts
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, remove } from 'firebase/database';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  User 
} from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7Mlw8vwpZKV9dv7mqwy-8E4sK9xWsbT4",
  authDomain: "taskmanager-898a2.firebaseapp.com",
  databaseURL: 'https://taskmanager-898a2-default-rtdb.europe-west1.firebasedatabase.app/', 
  projectId: "taskmanager-898a2",
  storageBucket: "taskmanager-898a2.firebasestorage.app",
  messagingSenderId: "507242755121",
  appId: "1:507242755121:web:e8cc64cd182c0a9df2d110"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export const registerUser = (email: string, password: string): Promise<User> => {
  return createUserWithEmailAndPassword(auth, email, password).then((cred) => cred.user);
};

export const loginUser = (email: string, password: string): Promise<User> => {
  return signInWithEmailAndPassword(auth, email, password).then((cred) => cred.user);
};

export const logoutUser = (): Promise<void> => {
  return signOut(auth);
};

export const removeUserTasks = async (uid: string): Promise<void> => {
  const userTasksRef = ref(db, `tasks/${uid}`);
  await remove(userTasksRef);
};

export { db, ref, set, get, remove, auth };

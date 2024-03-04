import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAWu1OoNvYTsXW_0eYgrLf1ensDHSRuMUg",
  authDomain: "projectcafeuts.firebaseapp.com",
  projectId: "projectcafeuts",
  storageBucket: "projectcafeuts.appspot.com",
  messagingSenderId: "999566459137",
  appId: "1:999566459137:web:bad0c78b9223962d1a5b00"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(); // Obtiene la instancia del objeto de autenticación

const loginWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    alert('Usuario autenticado:', user);
    // Aquí puedes redirigir al usuario a la página correspondiente después de iniciar sesión
  } catch (error) {
    alert('Error al iniciar sesión:', error.message);
    // Manejar el error de inicio de sesión (mostrar mensaje al usuario, etc.)
  }
}

const logout = async () => {
  try {
    await auth.signOut(); // Cierra la sesión del usuario
    console.log('Sesión cerrada');
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};

const getCursosFromFirebase = async (db2) => {
  // Función para obtener la lista de cursos desde Firebase
  console.log("db ----->",db2,db);
  try {
    const cursosSnapshot = await db2.collection('Courses').get();
    console.log(cursosSnapshot);
    return cursosSnapshot;
  } catch (error) {
    console.error('Error al obtener cursos desde Firebase:', error);
    throw error;
  }
};

export { db, auth, loginWithEmailAndPassword,getCursosFromFirebase,logout };
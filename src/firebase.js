import { initializeApp } from "firebase/app";
import { getFirestore,addDoc,getDocs,getDoc,collection,doc,updateDoc  } from "firebase/firestore";
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
const db = getFirestore(app); // Asegúrate de que db sea inicializado correctamente con getFirestore
const auth = getAuth();

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

// Inicio cursos Firebase

const getCursosFromFirebase = async () => {
  try {
    const cursosSnapshot = await getDocs(collection(db, "Courses"));
    return cursosSnapshot.docs.map(doc => {
      const data = doc.data();
      return { id: doc.id, ...data };
    });
  } catch (error) {
    console.error('Error al obtener cursos desde Firebase:', error);
    return []; // Devuelve un array vacío en caso de error
  }
};

const getCursosFromFirebaseId = async (id) => {
  try {
    const cursosId = doc(db, "Courses", id);
    return getDoc(cursosId).then(resultado => {
      console.log("resultado.data() ------->",resultado.data());
     return { id: resultado.id, ...resultado.data() };
    });
  } catch (error) {
    console.error('Error al obtener cursos desde Firebase:', error);
    return []; // Devuelve un array vacío en caso de error
  }
};

const guardarCursosFromFirebase = async (data) => {
  try {
    const cursosCollection = collection(db, "Courses");
    const docRef = await addDoc(cursosCollection, data); // Espera a que se complete la operación de escritura
    console.log("Curso guardado correctamente con ID:", docRef.id);
    return docRef.id; // Retorna el ID del documento
  } catch (error) {
    console.error("Error al guardar el curso:", error);
    throw error; // Lanza el error para manejarlo en la parte que llama a esta función
  }
};
const updateEstadoCurso = async (cursoId, nuevoEstado) => {
  try {
    const cursoRef = doc(db, 'Courses', cursoId);
    await updateDoc(cursoRef, { estado: nuevoEstado });
    console.log('Estado del curso actualizado correctamente');
  } catch (error) {
    console.error('Error al actualizar el estado del curso:', error);
    throw error;
  }
};

const updateCursoEnFirebase = async (cursoId, cursoData) => {
  try {
    const cursoRef = doc(db, 'Courses', cursoId);
    await updateDoc(cursoRef, cursoData);
    console.log('Curso actualizado correctamente');
  } catch (error) {
    console.error('Error al actualizar el curso:', error);
    throw error;
  }
};

// Fin cursos Firebase


// Inicio modulos Firebase

const getModulosFromFirebase = async () => {
  try {
    const modulosSnapshot = await getDocs(collection(db, "Module"));
    return modulosSnapshot.docs.map(doc => {
      const data = doc.data();
      return { id: doc.id, ...data };
    });
  } catch (error) {
    console.error('Error al obtener modulos desde Firebase:', error);
    return []; // Devuelve un array vacío en caso de error
  }
};

const getModulosFromFirebaseId = async (id) => {
  try {
    const modulosId = doc(db, "Module", id);
    return getDoc(modulosId).then(resultado => {
      console.log("resultado.data() ------->",resultado.data());
     return { id: resultado.id, ...resultado.data() };
    });
  } catch (error) {
    console.error('Error al obtener modulos desde Firebase:', error);
    return []; // Devuelve un array vacío en caso de error
  }
};

const guardarModulosFromFirebase = async (data) => {
  try {
    const modulosCollection = collection(db, "Module");
    const docRef = await addDoc(modulosCollection, data); // Espera a que se complete la operación de escritura
    console.log("Modulo guardado correctamente con ID:", docRef.id);
    return docRef.id; // Retorna el ID del documento
  } catch (error) {
    console.error("Error al guardar el curso:", error);
    throw error; // Lanza el error para manejarlo en la parte que llama a esta función
  }
};
const updateEstadoModulo = async (moduloId, nuevoEstado) => {
  try {
    const moduloRef = doc(db, 'Module', moduloId);
    await updateDoc(moduloRef, { estado: nuevoEstado });
    console.log('Estado del modulo actualizado correctamente');
  } catch (error) {
    console.error('Error al actualizar el estado del modulo:', error);
    throw error;
  }
};

const updateModuloEnFirebase = async (moduloId, moduloData) => {
  try {
    const moduloRef = doc(db, 'Module', moduloId);
    await updateDoc(moduloRef, moduloData);
    console.log('Curso actualizado correctamente');
  } catch (error) {
    console.error('Error al actualizar el modulo:', error);
    throw error;
  }
};

// Fin modulos Firebase


export { db, auth, guardarCursosFromFirebase,updateEstadoCurso,updateCursoEnFirebase,loginWithEmailAndPassword,getCursosFromFirebase,logout,getCursosFromFirebaseId,getModulosFromFirebase,getModulosFromFirebaseId,guardarModulosFromFirebase,updateEstadoModulo,updateModuloEnFirebase };
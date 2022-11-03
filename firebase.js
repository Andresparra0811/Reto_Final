// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-analytics.js";
import { getFirestore,collection,addDoc,getDocs,onSnapshot,deleteDoc,doc,getDoc,updateDoc} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPSEPjUiUpqjNu4bYDB1MzgaH7P90G5bw",
  authDomain: "reto-final-crud-bf9a1.firebaseapp.com",
  projectId: "reto-final-crud-bf9a1",
  storageBucket: "reto-final-crud-bf9a1.appspot.com",
  messagingSenderId: "75551235876",
  appId: "1:75551235876:web:158e5c1eea9a840b29ddb1",
  measurementId: "G-7BHSM86QP2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore()


export const save_estudiante= (id_estudiante,apellidos_estudiante,nombre_estudiante)=>
    addDoc(collection(db,"estudiantes"),{ id_estudiante,apellidos_estudiante,nombre_estudiante})

export const save_clase= (id_clase,titulo,descripcion)=>
    addDoc(collection(db,"clases"),{ id_clase,titulo,descripcion})

export const save_matricula= (id_matricula,id_estudiante,id_clase)=>
  addDoc(collection(db,"matriculas"),{ id_matricula,id_estudiante,id_clase})

export const get_estudiante= () => getDocs(collection(db,"estudiantes"))
export const on_get_estudiante= (callback) => onSnapshot(collection(db,"estudiantes"),callback)

export const get_clase= () => getDocs(collection(db,"estudiantes"))
export const on_get_clase= (callback) => onSnapshot(collection(db,"clases"),callback)

export const get_matricula= () => getDocs(collection(db,"matriculas"))
export const on_get_matricula= (callback) => onSnapshot(collection(db,"matriculas"),callback)

export const deleteClase= id =>deleteDoc(doc(db,"clases",id))
export const deleteEstudiante= id =>deleteDoc(doc(db,"estudiantes",id))
export const deleteMatricula= id =>deleteDoc(doc(db,"matriculas",id))

export const getEstudiante= id => getDoc(doc(db,"estudiantes",id))
export const getClase= id => getDoc(doc(db,"clases",id))
export const getMatricula= id => getDoc(doc(db,"matriculas",id))

export const updateEstudiante= (id,newFields) => updateDoc(doc(db,"estudiantes",id),newFields)
export const updateClase= (id,newFields) => updateDoc(doc(db,"clases",id),newFields)
export const updateMatricula= (id,newFields) => updateDoc(doc(db,"matriculas",id),newFields)
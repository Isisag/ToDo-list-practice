  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-analytics.js";
  import { getFirestore, 
    collection , 
    addDoc, 
    getDocs, 
    onSnapshot, 
    deleteDoc, 
    doc, 
    getDoc,
    updateDoc} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js"
  
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBSDuEHdSyc8HsIExdQA19yelmrRhmAhr4",
    authDomain: "social-craft-test.firebaseapp.com",
    projectId: "social-craft-test",
    storageBucket: "social-craft-test.appspot.com",
    messagingSenderId: "336049561307",
    appId: "1:336049561307:web:4176338033f196f15136fe",
    measurementId: "G-9Z2G850GNV"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  const dataBase = getFirestore();

 export const saveTask = (title,content) => addDoc(collection(dataBase, 'post'), {titulo: title, descripcion: content})
  
 export const getTasks = () => getDocs(collection(dataBase, 'post'))

 export const getTask = id => getDoc(doc(dataBase, 'post', id))

 export const onGetTasks = (callback) => onSnapshot(collection(dataBase, 'post'), callback)

 export const deleteTask = id => deleteDoc(doc(dataBase, 'post', id))

 export const editTask = (id, newContent) => updateDoc(doc(dataBase,'post', id) , newContent)
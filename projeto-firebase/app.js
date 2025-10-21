import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCqHtImeZ1EcyVwD8ZDmA0ed8ua2r_g0r4",
  authDomain: "autenticacao-firebasenz.firebaseapp.com",
  projectId: "autenticacao-firebasenz",
  storageBucket: "autenticacao-firebasenz.firebasestorage.app",
  messagingSenderId: "992125946963",
  appId: "1:992125946963:web:45388c1f3e4c4033804aa6",
  measurementId: "G-DK6TNXXET7"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const storage = firebase.storage();
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


function cadastrar() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  auth.createUserWithEmailAndPassword(email, senha)
    .then(() => document.getElementById('msg').innerText = "Cadastro realizado com sucesso!")
    .catch(e => document.getElementById('msg').innerText = e.message);
}


function login() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  auth.signInWithEmailAndPassword(email, senha)
    .then(() => window.location.href = "perfil.html")
    .catch(e => document.getElementById('msg').innerText = e.message);
}


auth.onAuthStateChanged(user => {
  if (user) {
    document.getElementById('usuario').innerText = `Logado como: ${user.email}`;
  } else {
    window.location.href = "index.html";
  }
});

function logout() {
  auth.signOut().then(() => window.location.href = "index.html");
}

function uploadImagem() {
  const file = document.getElementById('fotoPerfil').files[0];
  const storageRef = storage.ref(`fotos/${auth.currentUser.uid}.jpg`);
  storageRef.put(file)
    .then(() => storageRef.getDownloadURL())
    .then(url => {
      document.getElementById('imgPreview').src = url;
      alert("Upload realizado com sucesso!");
    });
}
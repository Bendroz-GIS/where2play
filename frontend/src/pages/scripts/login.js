// Importer notre module d'authentification
const VITE_API_URL = import.meta.env.VITE_API_URL;
const API_BASE_URL = VITE_API_URL +'/api';

import { auth } from '../../auth.js';

async function login() {
  const email = loginForm.email.value;
  const password = loginForm.password.value;
  const errorMessage = document.getElementById('error-message');
  console.log(email, password)

  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email: email, password: password }),
    });

    const data = await response.json();

    if (!response.ok) {
      
      throw new Error(data.error || "Erreur de connexion");
    }

    localStorage.setItem("accessToken", data.accessToken);
    console.log("Connexion réussie");
    window.location.href = "dashboard.html";
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.classList.remove('hidden');
  }
}

const loginForm = document.getElementById("login-form");
loginForm.onsubmit = (event) => {
  event.preventDefault();
  login();
};

// Si déjà connecté
document.addEventListener('DOMContentLoaded', function() {
  if (auth.isAuthenticated()) {
    window.location.href = '/';
  }
});


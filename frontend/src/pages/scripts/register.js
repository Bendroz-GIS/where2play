const VITE_API_URL = import.meta.env.VITE_API_URL;
const API_BASE_URL = VITE_API_URL +'/api';


async function register() {
  const name = registerForm.name.value;
  const email = registerForm.email.value;
  const password = registerForm.password.value;

  try {
    


    const response = await fetch(`${API_BASE_URL}/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName: name, userEmail: email, userPassword: password }),
    })

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Erreur lors de la création du compte");
    }

    window.location.href = "login.html"
  } catch (error) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = error.message;
    errorMessage.classList.remove('hidden');
  }
}

const registerForm = document.getElementById("register-form");
registerForm.onsubmit = (event) => {
  event.preventDefault();
  register();
};
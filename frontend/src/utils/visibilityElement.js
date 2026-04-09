import { auth } from "../auth";


function handleLogged() {
  if (auth.isAuthenticated()) {
    const loginLink = document.getElementById("login-link");
    loginLink.classList.add("hidden");
  }
}

function handleDisconnected() {
  if (!auth.isAuthenticated()) {
    const loginLink = document.getElementById("login-link");
    loginLink.classList.remove("hidden");
  }
}


function handleVisibility() {
  handleLogged();
  handleDisconnected();
}


export { handleVisibility }


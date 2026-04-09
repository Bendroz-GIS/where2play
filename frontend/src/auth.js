const VITE_API_URL = import.meta.env.VITE_API_URL;


// Constantes pour les URLs et messages
const API_BASE_URL = VITE_API_URL +'/api';
const AUTH_URLS = {
  USER_PROFILE: `${API_BASE_URL}/user/me`,
  REFRESH_TOKEN: `${API_BASE_URL}/auth/refresh_token`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
};

const ERROR_MESSAGES = {
  FETCH_USER: 'Impossible de récupérer les informations utilisateur',
  REFRESH_TOKEN: 'Impossible de rafraîchir le token',
  TOKEN_EXPIRED: 'Le token a expiré',
};

// Fonction utilitaire pour gérer les erreurs de requête
const handleRequestError = (error, message) => {
  console.error(message, error);
  return null;
};

// Fonction utilitaire pour décoder le token
const decodeToken = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (error) {
    console.error('Erreur lors du décodage du token:', error);
    return null;
  }
};


const auth = {
  isAuthenticated() {
    return localStorage.getItem('accessToken') !== null;
  },

  getAccessToken() {
    return localStorage.getItem('accessToken');
  },

  getUserInfo() {
    const token = this.getAccessToken();
    if (!token) return null;
    return decodeToken(token);
  },

  async refreshToken() {
    try {
      const response = await fetch(AUTH_URLS.REFRESH_TOKEN, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) throw new Error(ERROR_MESSAGES.REFRESH_TOKEN);

      const data = await response.json();
      localStorage.setItem('accessToken', data.accessToken);
      return data.accessToken;
    } catch (error) {
      return handleRequestError(error, ERROR_MESSAGES.REFRESH_TOKEN);
    }
  },

  // Récupère le profil utilisateur
  async fetchUserProfile() {
    try {
      const token = await this.getAccessToken();
      const response = await fetch(AUTH_URLS.USER_PROFILE, {
        method: 'GET',
        // credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error(ERROR_MESSAGES.FETCH_USER);

      return await response.json();
    } catch (error) {
      return handleRequestError(error, ERROR_MESSAGES.FETCH_USER);
    }
  },

  // raffraîchissement du token
  startTokenRefreshInterval() {
    setInterval(async () => {
      const token = this.getAccessToken();
      if (token) {
        const payload = this.getUserInfo();
        const now = Math.floor(Date.now() / 1000);
        const expiresIn = payload.exp - now;

        // Rafraîchir le token s'il expire dans moins de 5 minutes
        if (expiresIn < 5) {
          await this.refreshToken();
          console.log('Token rafraîchi automatiquement');
        }
      }
    }, 5000); // => 5sec
  },

  logout() {
    localStorage.removeItem('accessToken');
    fetch(AUTH_URLS.LOGOUT, {
      method: 'POST',
      credentials: 'include',
    }).catch((error) => console.error('Erreur lors de la déconnexion:', error));

    window.location.href = 'login.html';
  },
};

export { auth };
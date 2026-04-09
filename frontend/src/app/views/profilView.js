import { auth } from "../../auth";

async function displayProfileInfo() {
  const profileData = document.getElementById('profile-data');
  try {
    const userProfile = await auth.fetchUserProfile();
    
    if (!userProfile) {
      throw new Error('Impossible de récupérer les informations du profil');
    }

    profileData.innerHTML = `
      <div class="profile-info">
        <span><strong>ID:</strong> ${userProfile.user_id}</span>
        <span><strong>Nom:</strong> ${userProfile.user_name}</span>
        <span><strong>Email:</strong> ${userProfile.user_email}</span>
      </div>
    `;
    profileData.classList.remove('loading');
    
  } catch (error) {
    console.error('Erreur:', error);
    profileData.innerHTML = `<span class="error">Erreur: ${error.message}</span>`;
    profileData.classList.remove('loading');
  }
}

export { displayProfileInfo}
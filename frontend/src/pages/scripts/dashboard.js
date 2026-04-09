// Importer notre module d'authentification
import { auth } from '../../auth.js';
import { displayEvent } from '../../app/views/eventView.js';
import { displayProfileInfo } from '../../app/views/profilView.js';


document.addEventListener('DOMContentLoaded', async function() {
  const logoutButton = document.getElementById('logout-button');
  if (logoutButton) {
    logoutButton.addEventListener('click', function(e) {
      e.preventDefault();
      auth.logout();
    });
  };

  auth.startTokenRefreshInterval();
  const userProfile = await auth.fetchUserProfile();
  console.log(userProfile)
  displayProfileInfo();
  displayEvent('event-data', userProfile.user_id)


  
  
});
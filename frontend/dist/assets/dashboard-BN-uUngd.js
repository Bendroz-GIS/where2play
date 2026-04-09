import"./modulepreload-polyfill-B5Qt9EMX.js";import{a as o}from"./auth-Db8ij5IJ.js";import{d as t}from"./map-COuTue65.js";async function s(){const r=document.getElementById("profile-data");try{const e=await o.fetchUserProfile();if(!e)throw new Error("Impossible de récupérer les informations du profil");r.innerHTML=`
      <div class="profile-info">
        <span><strong>ID:</strong> ${e.user_id}</span>
        <span><strong>Nom:</strong> ${e.user_name}</span>
        <span><strong>Email:</strong> ${e.user_email}</span>
      </div>
    `,r.classList.remove("loading")}catch(e){console.error("Erreur:",e),r.innerHTML=`<span class="error">Erreur: ${e.message}</span>`,r.classList.remove("loading")}}document.addEventListener("DOMContentLoaded",async function(){const r=document.getElementById("logout-button");r&&r.addEventListener("click",function(n){n.preventDefault(),o.logout()}),o.startTokenRefreshInterval();const e=await o.fetchUserProfile();console.log(e),s(),t("event-data",e.user_id)});

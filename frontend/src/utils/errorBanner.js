
const errorBanner = {
  html:  `
  <div id="error-banner">
    <span id="banner-message">Vous devez être connecté</span>
    <div class="close-button-container">
      <button id="close-error-banner" type="button"><span class="material-symbols-outlined">close</span></button>
    </div>
  </div>
  `,

  handleClose() {
    const closeButton = document.getElementById("close-error-banner");
    closeButton.addEventListener("click", () => {
      const banner = document.getElementById("error-banner");
      banner.remove();
    })
  },

  display() {
    const banner = document.getElementById("error-banner");
  
    if (!banner) {
      const e = document.getElementById("banner-container")
      e.innerHTML = this.html
      this.handleClose();
    }
  }
}


export { errorBanner }
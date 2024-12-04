//Template Function that can be used to run JavaScript on the page
//Note: This can be changed to whatever JavaScript formatting you would like
function knowledgeRunner(){

}





knowledgeRunner()

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("communityModal");
    const openModalButton = document.getElementById("openModal");
    const closeModalButton = document.getElementById("closeModal");
    
    // Handle opening the modal
    openModalButton.addEventListener("click", () => {
      modal.style.display = "block";
      modal.setAttribute("aria-hidden", "false");
      closeModalButton.focus(); // Move focus to close button
    });
  
    // Handle closing the modal
    closeModalButton.addEventListener("click", closeModal);
    modal.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    });
  
    function closeModal() {
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
      openModalButton.focus(); // Return focus to the button
    }
  
    // Trap focus inside the modal when it's open
    modal.addEventListener("keydown", (event) => {
      if (event.key === "Tab") {
        const focusableElements = modal.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
  
        if (event.shiftKey) { // Shift + Tab
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else { // Tab
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    });
    document.getElementById('scheduleCallButton').addEventListener('click', () => {
      const form = document.getElementById('scheduleForm');
      const email = form.email.value;
      const phone = form['phone-number'].value;
      const errorMessages = [];
  
      if (!email || !email.includes('@')) {
          errorMessages.push('Please provide a valid email.');
      }
  
      if (!phone || phone.length < 10) {
          errorMessages.push('Please provide a valid phone number.');
      }
  
      if (errorMessages.length > 0) {
          alert(errorMessages.join('\n'));
      } else {
          document.getElementById('formSuccessMessage').hidden = false;
      }
  });
  
  });
  

  
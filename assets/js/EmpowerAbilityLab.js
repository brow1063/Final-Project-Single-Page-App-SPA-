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
  });
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('scheduleForm');
    const successMessage = document.getElementById('formSuccessMessage');
    const scheduleButton = document.getElementById('scheduleCallButton');
    const emailUpdatesSwitch = document.getElementById('email-updates');

    scheduleButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent form submission
        const errors = [];

        // Validate Business Name
        const businessName = document.getElementById('business-name').value.trim();
        if (!businessName) {
            errors.push('Business Name is required.');
        }

        // Validate Phone Number
        const phoneNumber = document.getElementById('phone-number').value.trim();
        const phoneRegex = /^[2-9]\d{2}-\d{3}-\d{4}$/; // Format: 613-123-1234
        if (!phoneNumber) {
            errors.push('Phone Number is required.');
        } else if (!phoneRegex.test(phoneNumber)) {
            errors.push('Phone Number must be in the format 613-123-1234.');
        }

        // Validate Email
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            errors.push('Email is required.');
        } else if (!emailRegex.test(email)) {
            errors.push('Please enter a valid Email address.');
        }

        // Validate at least one topic selected
        const topics = form.querySelectorAll('input[name="topic"]:checked');
        if (topics.length === 0) {
            errors.push('Please select at least one topic.');
        }

        // Show Errors or Success
        const errorContainer = document.getElementById('formErrorMessages');
        if (errors.length > 0) {
            // Display errors
            errorContainer.innerHTML = errors.join('<br>');
            errorContainer.hidden = false;
            successMessage.hidden = true;
        } else {
            // Success message
            errorContainer.hidden = true;
            successMessage.hidden = false;

            // Check the switch state
            const emailUpdatesMessage = emailUpdatesSwitch.checked
                ? ' You will also receive emails about updates and services.'
                : '';

            // Display the success message
            successMessage.innerText = `Thank you! Your request has been submitted.${emailUpdatesMessage}`;
        }
    });
});

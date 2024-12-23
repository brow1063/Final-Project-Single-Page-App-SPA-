document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("communityModal");
  const openModalButton = document.getElementById("openModal");
  const closeModalButton = document.getElementById("closeModal");
  const cancelButton = document.getElementById("cancelModal");

  // Handle opening the modal
  openModalButton.addEventListener("click", () => {
      modal.style.display = "block";
      modal.setAttribute("aria-hidden", "false");
      closeModalButton.focus(); // Move focus to close button
  });

  // Handle closing the modal
  closeModalButton.addEventListener("click", closeModal);
  cancelButton.addEventListener("click", closeModal);

  // Handle closing the modal with Enter & Space keys
  closeModalButton.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          closeModal();
      }
  });

  cancelButton.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          closeModal();
      }
  });

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
    const errorContainer = document.getElementById('formErrorMessages');
    const scheduleButton = document.getElementById('scheduleCallButton');
    const speakerCheckbox = document.getElementById('speaker');
    const additionalInfoContainer = document.getElementById('additional-info-container');
    const phoneNumberField = document.getElementById('phone-number');
    const emailField = document.getElementById('email');
    const businessNameField = document.getElementById('business-name');

    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarContent = document.getElementById("navbarContent");

    navbarToggler.addEventListener("click", function() {
      if (navbarContent.classList.contains("collapse")) {
        navbarContent.classList.remove("collapse");
      } else {
        navbarContent.classList.add("collapse");
      }
    });

    scheduleButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent form submission
        const errors = [];
        errorContainer.innerHTML = ''; // Clear previous errors

        // Reset all fields
        resetErrorField(businessNameField);
        resetErrorField(phoneNumberField);
        resetErrorField(emailField);

        // Validate Business Name
        const businessName = businessNameField.value.trim();
        if (!businessName) {
            errors.push('Business Name is required.');
            highlightErrorField(businessNameField);
        }

        // Validate Phone Number (Dynamic format check)
        const phoneNumber = phoneNumberField.value.trim();
        const phoneRegex = /^[2-9]\d{2}-\d{3}-\d{4}$/; // Format: 613-123-1234
        if (!phoneNumber) {
            errors.push('Phone Number is required.');
            highlightErrorField(phoneNumberField);
        } else if (!phoneRegex.test(phoneNumber)) {
            errors.push('Invalid Phone Number. Use format xxx-xxx-xxxx.');
            highlightErrorField(phoneNumberField);
        }

        // Validate Email
        const email = emailField.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            errors.push('Email is required.');
            highlightErrorField(emailField);
        } else if (!emailRegex.test(email)) {
            errors.push('Please enter a valid Email address.');
            highlightErrorField(emailField);
        }

        // If there are errors, focus on the first invalid field
        if (errors.length > 0) {
            errorContainer.innerHTML = errors.join('<br>');
            errorContainer.hidden = false;
            successMessage.hidden = true;

            // Automatically focus on the first field with an error
            const firstErrorField = document.querySelector('.is-invalid');
            if (firstErrorField) {
                firstErrorField.focus();
            }
        } else {
            errorContainer.hidden = true;
            successMessage.hidden = false;

            const emailUpdatesSwitch = document.getElementById('email-updates');
            const emailUpdatesMessage = emailUpdatesSwitch.checked
                ? ' You will also receive emails about updates and services.'
                : '';

            successMessage.innerText = `Thank you! Your request has been submitted.${emailUpdatesMessage}`;
        }

        
    });

    // Show/Hide Additional Info Container for "Invite a Speaker"
    speakerCheckbox.addEventListener('change', function () {
        additionalInfoContainer.style.display = this.checked ? 'block' : 'none';
    });

    
    // Function to highlight error fields
    function highlightErrorField(field) {
      field.classList.add('is-invalid'); 
  }

  // Function to reset error fields
  function resetErrorField(field) {
      field.classList.remove('is-invalid'); 
      field.addEventListener('input', () => field.classList.remove('is-invalid'), { once: true });
  }

    // Update: Handle Enter key for accessibility
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const activeElement = document.activeElement;
            if (activeElement.tagName === 'BUTTON' || activeElement.type === 'checkbox') {
                activeElement.click();
            }
        }
    });
});


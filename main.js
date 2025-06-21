document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');
    const loading = document.getElementById('formLoading');

    const fullNameError = document.getElementById('fullNameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');
    const messageCounter = document.getElementById('messageCounter');

    const formFields = [fullName, email, subject, message];

    function validateFullName() {
        const value = fullName.value.trim();
        if (!value) {
            fullNameError.textContent = 'Full Name is required.';
            return false;
        } else if (value.length < 3) {
            fullNameError.textContent = 'Full Name must be at least 3 characters.';
            return false;
        } else {
            fullNameError.textContent = '';
            return true;
        }
    }

    function validateEmail() {
        const value = email.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
            emailError.textContent = 'Email is required.';
            return false;
        } else if (!emailPattern.test(value)) {
            emailError.textContent = 'Please enter a valid email address.';
            return false;
        } else {
            emailError.textContent = '';
            return true;
        }
    }

    function validateMessage() {
        const value = message.value.trim();
        if (!value) {
            messageError.textContent = 'Message is required.';
            return false;
        } else if (value.length > 500) {
            messageError.textContent = 'Message cannot exceed 500 characters.';
            return false;
        } else {
            messageError.textContent = '';
            return true;
        }
    }

    function validateForm() {
        const isFullNameValid = validateFullName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        // Subject is optional, no validation
        return isFullNameValid && isEmailValid && isMessageValid;
    }

    function updateSubmitState() {
        submitBtn.disabled = !validateForm();
    }

    function updateMessageCounter() {
        messageCounter.textContent = `${message.value.length}/500`;
    }

    function setFormDisabled(disabled) {
        formFields.forEach(field => field.disabled = disabled);
        submitBtn.disabled = disabled;
    }

    fullName.addEventListener('input', function () {
        validateFullName();
        updateSubmitState();
    });
    email.addEventListener('input', function () {
        validateEmail();
        updateSubmitState();
    });
    message.addEventListener('input', function () {
        validateMessage();
        updateMessageCounter();
        updateSubmitState();
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!validateForm()) {
            updateSubmitState();
            return;
        }
        setFormDisabled(true);
        loading.style.display = 'flex';
        setTimeout(function () {
            loading.style.display = 'none';
            alert('Form submitted successfully!');
            form.reset();
            updateMessageCounter();
            setFormDisabled(false);
            updateSubmitState();
        }, 1500);
    });

    // Initial state
    updateMessageCounter();
    updateSubmitState();
}); 
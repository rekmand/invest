document.addEventListener('DOMContentLoaded', () => {
    fetchMarketSummary();
    fetchTopFunds();
    const API_BASE_URL = 'http://127.0.0.1:8000/api';

    AOS.init();

    // Handle calculator modal display
    const calculatorModal = document.getElementById('calculatorModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const calculatorButtons = document.querySelectorAll('.calculator-btn');

    calculatorButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            calculatorModal.classList.remove('hidden');
            calculatorModal.classList.add('flex');
            // Trigger the show.bs.modal event manually for calculators.js
            const showEvent = new Event('show.bs.modal', { bubbles: true, cancelable: true });
            showEvent.relatedTarget = button;
            calculatorModal.dispatchEvent(showEvent);
        });
    });

    closeModalBtn.addEventListener('click', () => {
        calculatorModal.classList.add('hidden');
        calculatorModal.classList.remove('flex');
    });

    // Close modal when clicking outside
    calculatorModal.addEventListener('click', (event) => {
        if (event.target === calculatorModal) {
            calculatorModal.classList.add('hidden');
            calculatorModal.classList.remove('flex');
        }
    });

    // Handle mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent this click from immediately closing the menu
            mobileMenu.classList.toggle('hidden');
        });

        document.addEventListener('click', (event) => {
            if (!mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // Handle dropdowns
    const dropdowns = document.querySelectorAll('.relative.group');
    dropdowns.forEach(dropdown => {
        const button = dropdown.querySelector('button');
        const menu = dropdown.querySelector('.absolute');

        button.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (event) => {
            if (!dropdown.contains(event.target)) {
                menu.classList.add('hidden');
            }
        });
    });

    // Handle Back to Top button
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) { // Show button after scrolling down 200px
            backToTopButton.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
            backToTopButton.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
        } else {
            backToTopButton.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
            backToTopButton.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Handle contact form submission with loading indicator
    const contactForm = document.querySelector('#contact form');
    const contactSubmitBtn = document.getElementById('contact-submit-btn');
    const buttonText = document.getElementById('button-text');
    const loadingSpinner = document.getElementById('loading-spinner');

    if (contactForm && contactSubmitBtn && buttonText && loadingSpinner) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission

            // Get form inputs
            const nameInput = contactForm.querySelector('#name');
            const emailInput = contactForm.querySelector('#email');
            const messageInput = contactForm.querySelector('#message');

            // Basic validation
            if (!nameInput.value.trim()) {
                alert('Please enter your name.');
                nameInput.focus();
                return;
            }

            if (!emailInput.value.trim()) {
                alert('Please enter your email address.');
                emailInput.focus();
                return;
            }

            // Simple email regex validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                alert('Please enter a valid email address.');
                emailInput.focus();
                return;
            }

            if (!messageInput.value.trim()) {
                alert('Please enter your message.');
                messageInput.focus();
                return;
            }

            // Show loading indicator
            contactSubmitBtn.disabled = true;
            buttonText.classList.add('hidden');
            loadingSpinner.classList.remove('hidden');

            // Simulate form submission (e.g., API call)
            setTimeout(() => {
                // Hide loading indicator
                contactSubmitBtn.disabled = false;
                buttonText.classList.remove('hidden');
                loadingSpinner.classList.add('hidden');

                alert('Thank you for your message! (Demo only)');
                contactForm.reset(); // Clear the form
            }, 2000); // Simulate a 2-second delay
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {
    fetchMarketSummary();
    fetchTopFunds();
    

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

    // Handle contact form submission
    const contactSubmitBtn = document.getElementById('contact-submit-btn');

    if (contactSubmitBtn) {
        contactSubmitBtn.addEventListener('click', () => {
            const name = document.getElementById('name').value.trim();
            const contactNumber = document.getElementById('contact-number').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !contactNumber || !subject || !message) {
                alert('Please fill out all fields before sending.');
                return;
            }

            const mailtoLink = `mailto:mandal.rekha@gmail.com?subject=${encodeURIComponent(`${subject}   (CLIENT QUERY)`)}&body=${encodeURIComponent(`Message:\n${message}\n\nFrom: ${name}\nContact Number: ${contactNumber}`)}`;

            window.open(mailtoLink, '_blank');
        });
    }

});
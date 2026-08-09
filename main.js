document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const priceEl = document.getElementById('dynamic-price');
    const availabilityEl = document.getElementById('dynamic-availability');
    const btnAvisarme = document.getElementById('btn-avisarme');
    const modal = document.getElementById('email-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const emailForm = document.getElementById('email-form');
    const emailInput = document.getElementById('email-input');
    const formMsg = document.getElementById('form-msg');

    // Remove fetch to api/config since it's static now

    // Modal Logic
    if (btnAvisarme) {
        btnAvisarme.addEventListener('click', () => {
            modal.classList.add('active');
            formMsg.textContent = '';
            emailInput.value = '';
        });
    }

    // Auto popup after 4 seconds (only once per session)
    if (modal && !sessionStorage.getItem('popupShown')) {
        setTimeout(() => {
            modal.classList.add('active');
            formMsg.textContent = '';
            emailInput.value = '';
            sessionStorage.setItem('popupShown', 'true');
        }, 4000);
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    // Close if clicked outside content
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // Form Submission
    if (emailForm) {
        emailForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = emailInput.value.trim();
            
            if (!email) return;

            const GOOGLE_URL = 'https://script.google.com/macros/s/AKfycbzCut0sHR265AYQ4QlLvPHPtlPg3hOuetg3_OQgjlJo0ifTEQuGJP_Vihg6LuzXuPdmRA/exec';

            fetch(GOOGLE_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify({ email })
            })
            .then(() => {
                formMsg.style.color = '#3b82f6'; 
                formMsg.textContent = 'Ya quedaste registrado. Prepárate.';
                emailInput.value = '';
                setTimeout(() => {
                    modal.classList.remove('active');
                }, 2000);
            })
            .catch(err => {
                formMsg.style.color = 'red';
                formMsg.textContent = '> ERROR DE CONEXIÓN.';
            });
        });
    }
});

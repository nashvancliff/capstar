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

    // Popup Logic Removed

        if (emailForm) {
            emailForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const prefixEl = document.getElementById('store-prefix');
                const prefix = prefixEl ? prefixEl.value : '';
                const phone = emailInput.value.trim();
                
                if (!phone) return;
                
                // El apóstrofe inicial (') evita que Google Sheets interprete el "+" como una fórmula matemática
                const fullPhone = "'" + prefix + ' ' + phone;

                const GOOGLE_URL = 'https://script.google.com/macros/s/AKfycbzCut0sHR265AYQ4QlLvPHPtlPg3hOuetg3_OQgjlJo0ifTEQuGJP_Vihg6LuzXuPdmRA/exec';

                fetch(GOOGLE_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    body: JSON.stringify({ email: fullPhone })
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

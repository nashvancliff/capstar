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

    // Fetch Dynamic Content
    fetch('/api/config')
        .then(res => res.json())
        .then(data => {
            if (data.price && priceEl) priceEl.textContent = data.price;
            if (data.availability && availabilityEl) availabilityEl.textContent = data.availability;
        })
        .catch(err => console.error('Error fetching config:', err));

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

            fetch('/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    formMsg.style.color = '#3b82f6'; // Match tech theme but clearly successful
                    formMsg.textContent = '> PROTOCOLO ACEPTADO. REGISTRO EXITOSO.';
                    emailInput.value = '';
                    setTimeout(() => {
                        modal.classList.remove('active');
                    }, 2000);
                } else {
                    formMsg.style.color = 'red';
                    formMsg.textContent = '> ERROR DEL SISTEMA. INTENTA DE NUEVO.';
                }
            })
            .catch(err => {
                formMsg.style.color = 'red';
                formMsg.textContent = '> ERROR DE CONEXIÓN.';
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // FECHA DEL DROP: Cambia esto por la fecha real de tu lanzamiento. Formato (Año-Mes-DiaTHora:Minuto:Segundo)
    const targetDate = new Date("2026-08-19T19:00:00").getTime(); 

    // CONTRASEÑA DE LA TIENDA: Cambia esto por la clave que tú quieras
    const STORE_PASSWORD = 'Capstar1029';

    // Elements
    const cdDays = document.getElementById('cd-days');
    const cdHours = document.getElementById('cd-hours');
    const cdMins = document.getElementById('cd-mins');
    const cdSecs = document.getElementById('cd-secs');

    const emailForm = document.getElementById('landing-email-form');
    const emailInput = document.getElementById('landing-email');
    const successMsg = document.getElementById('landing-success-msg');

    const btnEnterAtelier = document.getElementById('btn-enter-atelier');
    const pwdModal = document.getElementById('password-modal');
    const closePwdModal = document.getElementById('close-pwd-modal');
    const pwdForm = document.getElementById('pwd-form');
    const pwdInput = document.getElementById('pwd-input');
    const pwdMsg = document.getElementById('pwd-msg');



    // Countdown Timer Logic
    setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            cdDays.textContent = "00";
            cdHours.textContent = "00";
            cdMins.textContent = "00";
            cdSecs.textContent = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        cdDays.textContent = String(days).padStart(2, '0');
        cdHours.textContent = String(hours).padStart(2, '0');
        cdMins.textContent = String(minutes).padStart(2, '0');
        cdSecs.textContent = String(seconds).padStart(2, '0');
    }, 1000);

    // Email Submit (Conectado a Google Sheets)
    emailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const prefix = document.getElementById('landing-prefix').value;
        const phone = emailInput.value.trim();
        if (!phone) return;
        
        // El apóstrofe inicial (') evita que Google Sheets interprete el "+" como una fórmula matemática
        const fullPhone = "'" + prefix + ' ' + phone;

        const GOOGLE_URL = 'https://script.google.com/macros/s/AKfycbzCut0sHR265AYQ4QlLvPHPtlPg3hOuetg3_OQgjlJo0ifTEQuGJP_Vihg6LuzXuPdmRA/exec';

        fetch(GOOGLE_URL, {
            method: 'POST',
            mode: 'no-cors', // Evita errores de seguridad en navegadores
            body: JSON.stringify({ email: fullPhone })
        })
        .then(() => {
            // Como usamos no-cors, asumimos que se envió correctamente
            emailForm.style.display = 'none';
            successMsg.style.display = 'block';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al registrar el correo. Intenta de nuevo.');
        });
    });

    // Password Modal Logic
    btnEnterAtelier.addEventListener('click', () => {
        pwdModal.classList.add('active');
        pwdMsg.textContent = '';
        pwdInput.value = '';
    });

    closePwdModal.addEventListener('click', () => {
        pwdModal.classList.remove('active');
    });

    pwdModal.addEventListener('click', (e) => {
        if (e.target === pwdModal) pwdModal.classList.remove('active');
    });

    pwdForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = pwdInput.value;

        // Validación estática de contraseña
        if (password === STORE_PASSWORD) {
            // Guardamos el acceso en el navegador temporalmente
            sessionStorage.setItem('storeAccess', 'true');
            window.location.href = 'store.html'; // Redirigir a la tienda
        } else {
            pwdMsg.textContent = '> ACCESO DENEGADO';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // FECHA DEL DROP: Cambia esto por la fecha real de tu lanzamiento. Formato (Año-Mes-DiaTHora:Minuto:Segundo)
    const targetDate = new Date("2026-08-27T19:00:00-05:00").getTime(); 

    // CONTRASEÑA DE LA TIENDA: Cambia esto por la clave que tú quieras
    const STORE_PASSWORD = 'Capstar01';

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



    // Password Logic
    if (pwdForm) {
        pwdForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = pwdInput.value;
        const now = new Date().getTime();

        if (now < targetDate) {
            pwdMsg.textContent = '> EL ATELIER AÚN ESTÁ CERRADO.';
            return;
        }

        // Validación estática de contraseña
        if (password === STORE_PASSWORD) {
            // Guardamos el acceso en el navegador temporalmente
            sessionStorage.setItem('storeAccess', 'true');
            window.location.href = 'store.html'; // Redirigir a la tienda
        } else {
            pwdMsg.textContent = '> ACCESO DENEGADO';
        }
    });
    }
});

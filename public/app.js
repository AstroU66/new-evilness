document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.panel');
  const toggleEye = document.querySelector('#guest .toggle');
  const guestPassword = document.getElementById('guest-password');
  const rules = document.querySelectorAll('#pw-rules li');

  tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.target).classList.add('active');
  }));

  if (toggleEye) {
    toggleEye.addEventListener('click', () => {
      const showing = guestPassword.type === 'text';
      guestPassword.type = showing ? 'password' : 'text';
      guestPassword.parentElement.classList.toggle('showing-password', !showing);
    });
  }

  if (guestPassword) {
    guestPassword.addEventListener('input', validatePassword);
  }

  document.getElementById('guest-form').addEventListener('submit', e => {
    e.preventDefault();
    submitForm('/api/guests', new FormData(e.target));
  });
  document.getElementById('corp-form').addEventListener('submit', e => {
    e.preventDefault();
    submitForm('/api/corp', new FormData(e.target));
  });
  document.getElementById('priv-form').addEventListener('submit', e => {
    e.preventDefault();
    submitForm('/api/private', new FormData(e.target));
  });

  function validatePassword() {
    const val = guestPassword.value;
    const checks = [
      /[a-z]/.test(val),
      /[A-Z]/.test(val),
      /\d/.test(val),
      /[._\-?!%]/.test(val),
      val.length >= 8,
      /^[A-Za-z0-9._\-?!%]+$/.test(val)
    ];
    rules.forEach((li, i) => li.classList.toggle('valid', checks[i]));
  }

  function submitForm(url, formData) {
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(formData))
    })
      .then(r => r.json())
      .then(data => alert(data.message))
      .catch(() => alert('Fehler beim Senden'));
  }
});

(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  const serviceSelect = document.querySelector('#service');
  const monthSelect = document.querySelector('#month');
  const form = document.querySelector('#brief-form');
  const status = document.querySelector('#form-status');
  const photoInput = document.querySelector('#photos');
  const fileLabel = document.querySelector('#file-label');

  menuButton?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.querySelector('[aria-hidden="true"]').textContent = open ? 'Close' : 'Menu';
  });

  nav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuButton?.setAttribute('aria-expanded', 'false');
      if (menuButton) menuButton.querySelector('[aria-hidden="true"]').textContent = 'Menu';
    });
  });

  document.querySelectorAll('.choose-service').forEach((button) => {
    button.addEventListener('click', () => {
      serviceSelect.value = button.closest('[data-service]').dataset.service;
      document.querySelector('#garden-brief').scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.setTimeout(() => serviceSelect.focus({ preventScroll: true }), 500);
    });
  });

  document.querySelectorAll('.month-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.month-chip').forEach((item) => item.classList.remove('is-selected'));
      chip.classList.add('is-selected');
      monthSelect.value = chip.dataset.month;
    });
  });

  photoInput?.addEventListener('change', () => {
    const count = photoInput.files.length;
    fileLabel.textContent = count ? `${count} ${count === 1 ? 'file selected' : 'files selected'}` : 'Choose files';
  });

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      status.textContent = '';
      return;
    }
    const service = serviceSelect.value.toLowerCase();
    status.textContent = `Your ${service} brief is ready to review. This demonstration has not sent any details.`;
  });
})();

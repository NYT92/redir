const form = document.querySelector('form');
form.addEventListener('submit', (function () {
  const e = document.querySelector('.txtbx').value;
  if ('' === e) return alert('Please enter a text.');
  window.location.href = 'mailto:hello@nsdev.ml?subject=A%20Message%20to%20nyt92&body=' + e
}));

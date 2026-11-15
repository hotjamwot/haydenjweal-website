(function () {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored;
    if (!theme) {
      theme = 'dark';
    }
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
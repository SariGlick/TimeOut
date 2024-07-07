document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('toggleDarkMode').addEventListener('click', function() {
      chrome.tabs.create({ url: chrome.runtime.getURL('pop.html') });
    });
  });
  
document.addEventListener('DOMContentLoaded', function () {
  var blockSitesBtn = document.getElementById('blockSitesBtn');
  var browsingDataBtn = document.getElementById('browsingDataBtn');
  var blockDiv = document.getElementById('blockDiv');
  var browsingDataDiv = document.getElementById('browsingDataDiv');
  var blockedSitesList = document.getElementById('blockedSitesList');
  var enterSite = document.getElementById('enterSite');

  // חדש - הוספת אלמנטים לרשימה הלבנה
  var allowedSitesBtn = document.getElementById('allowedSitesBtn');
  var allowedSitesDiv = document.getElementById('allowedSitesDiv');
  var allowedSitesList = document.getElementById('allowedSitesList');
  var addAllowedSiteForm = document.getElementById('addAllowedSiteForm');
  var allowedSiteInput = document.getElementById('allowedSiteInput');

  // חדש - כפתור למעבר בין רשימה שחורה לרשימה לבנה
  var toggleModeBtn = document.getElementById('toggleModeBtn');

  enterSite.addEventListener('click', function () {
    chrome.tabs.create({ url: 'http://localhost:3000/home' });
  });

  blockSitesBtn.addEventListener('click', function () {
    blockDiv.classList.remove('hidden');
    browsingDataDiv.classList.add('hidden');
    allowedSitesDiv.classList.add('hidden'); // מסתיר את הרשימה הלבנה
    chrome.runtime.sendMessage({ action: 'getBlockedSites' }, (response) => {
      const blockedSites = response.blockedSites || [];
      blockedSitesList.innerHTML = '';
      blockedSites.forEach((hostname) => {
        const li = document.createElement("li");
        li.textContent = hostname;
        blockedSitesList.appendChild(li);
      });
    });
  });

  // חדש - הצגת הרשימה הלבנה
  allowedSitesBtn.addEventListener('click', function () {
    allowedSitesDiv.classList.remove('hidden');
    blockDiv.classList.add('hidden');
    browsingDataDiv.classList.add('hidden');
    chrome.runtime.sendMessage({ action: 'getAllowedSites' }, (response) => {
      const allowedSites = response.allowedSites || [];
      allowedSitesList.innerHTML = '';
      allowedSites.forEach((hostname) => {
        const li = document.createElement("li");
        li.textContent = hostname;
        allowedSitesList.appendChild(li);
      });
    });
  });

  browsingDataBtn.addEventListener('click', function () {
    browsingDataDiv.classList.remove('hidden');
    blockDiv.classList.add('hidden');
    allowedSitesDiv.classList.add('hidden'); // מסתיר את הרשימה הלבנה
    browsingDataDiv.innerHTML = '<h3>Browsing Data:</h3><p>This is where browsing data will be displayed.</p>';
  });

  const blockForm = document.getElementById("blockForm");
  const siteInput = document.getElementById("siteInput");
  blockForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputUrl = siteInput.value.trim();
    if (inputUrl) {
      try {
        const url = new URL(inputUrl);
        const hostname = url.hostname.toLowerCase();
        if (hostname) {
          chrome.runtime.sendMessage({ action: 'addBlockedSite', hostname: hostname }, (response) => {
            if (response.success) {
              const li = document.createElement("li");
              li.textContent = inputUrl;
              blockedSitesList.appendChild(li);
            } else {
              console.error(response.message);
            }
          });
        }
      } catch (e) {
        console.error('Invalid URL');
      }
    }
    siteInput.value = "";
  });

  // חדש - הוספת אתר לרשימה הלבנה
  addAllowedSiteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const allowedUrl = allowedSiteInput.value.trim();
    if (allowedUrl) {
      try {
        const url = new URL(allowedUrl);
        const hostname = url.hostname.toLowerCase();
        if (hostname) {
          chrome.runtime.sendMessage({ action: 'addAllowedSite', hostname: hostname }, (response) => {
            if (response.success) {
              const li = document.createElement("li");
              li.textContent = allowedUrl;
              allowedSitesList.appendChild(li);
            } else {
              console.error(response.message);
            }
          });
        }
      } catch (e) {
        console.error('Invalid URL');
      }
    }
    allowedSiteInput.value = "";
  });

  // חדש - מעבר בין רשימה שחורה לרשימה לבנה
  toggleModeBtn.addEventListener('click', function () {
    chrome.runtime.sendMessage({ action: 'toggleMode' }, (response) => {
      if (response.isBlackList) {
        toggleModeBtn.textContent = "Switch to Whitelist Mode";
      } else {
        toggleModeBtn.textContent = "Switch to Blacklist Mode";
      }
    });
  });

  // חדש - עדכון טקסט כפתור לפי המצב הנוכחי
  chrome.runtime.sendMessage({ action: 'getMode' }, (response) => {
    if (response.isBlackList) {
      toggleModeBtn.textContent = "Switch to Whitelist Mode";
    } else {
      toggleModeBtn.textContent = "Switch to Blacklist Mode";
    }
  });
});

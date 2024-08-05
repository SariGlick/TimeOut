document.addEventListener('DOMContentLoaded', function () {
  var blockSitesBtn = document.getElementById('blockSitesBtn');
  var browsingDataBtn = document.getElementById('browsingDataBtn');
  var blockDiv = document.getElementById('blockDiv');
  var browsingDataDiv = document.getElementById('browsingDataDiv');
  var blockedSitesList = document.getElementById('blockedSitesList');
  var enterSite = document.getElementById('enterSite');
  var allowedSitesBtn = document.getElementById('allowedSitesBtn');
  var allowedSitesDiv = document.getElementById('allowedSitesDiv');
  var allowedSitesList = document.getElementById('allowedSitesList');
  var addAllowedSiteForm = document.getElementById('addAllowedSiteForm');
  var allowedSiteInput = document.getElementById('allowedSiteInput');
  var toggleModeBtn = document.getElementById('toggleModeBtn');
  var modeDisplay = document.getElementById('modeDisplay');

  enterSite.addEventListener('click', function () {
    chrome.tabs.create({ url: 'http://localhost:3000/home' });
  });

  blockSitesBtn.addEventListener('click', function () {
    blockDiv.classList.remove('hidden');
    browsingDataDiv.classList.add('hidden');
    allowedSitesDiv.classList.add('hidden');
    chrome.runtime.sendMessage({ action: 'getBlockedSites' }, (response) => {
      const blockedSites = response.blockedSites || [];
      blockedSitesList.innerHTML = '';
      blockedSites.forEach((hostname) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = `http://${hostname}`;
        a.textContent = hostname;
        a.target = "_blank";
        li.appendChild(a);
        blockedSitesList.appendChild(li);
      });
    });
  });

  allowedSitesBtn.addEventListener('click', function () {
    allowedSitesDiv.classList.remove('hidden');
    blockDiv.classList.add('hidden');
    browsingDataDiv.classList.add('hidden');
    chrome.runtime.sendMessage({ action: 'getAllowedSites' }, (response) => {
      const allowedSites = response.allowedSites || [];
      allowedSitesList.innerHTML = '';
      allowedSites.forEach((hostname) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = `http://${hostname}`;
        a.textContent = hostname;
        a.target = "_blank";
        li.appendChild(a);
        allowedSitesList.appendChild(li);
      });
    });
  });

  browsingDataBtn.addEventListener('click', function () {
    browsingDataDiv.classList.remove('hidden');
    blockDiv.classList.add('hidden');
    allowedSitesDiv.classList.add('hidden');
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
              const a = document.createElement("a");
              a.href = `http://${hostname}`;
              a.textContent = hostname;
              a.target = "_blank";
              li.appendChild(a);
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
              const a = document.createElement("a");
              a.href = `http://${hostname}`;
              a.textContent = hostname;
              a.target = "_blank";
              li.appendChild(a);
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

  toggleModeBtn.addEventListener('click', function () {
    chrome.runtime.sendMessage({ action: 'toggleMode' }, (response) => {
      updateModeDisplay(response.isBlackList);
    });
  });

  function updateModeDisplay(isBlackList) {
    modeDisplay.textContent = isBlackList ? "Blacklist Mode" : "Whitelist Mode";
  }

  // Initial load
  chrome.runtime.sendMessage({ action: 'getMode' }, (response) => {
    updateModeDisplay(response.isBlackList);
  });
});

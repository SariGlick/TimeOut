document.addEventListener('DOMContentLoaded', function () {
  var blockSitesBtn = document.getElementById('blockSitesBtn');
  var browsingDataBtn = document.getElementById('browsingDataBtn');
  var blockDiv = document.getElementById('blockDiv');
  var browsingDataDiv = document.getElementById('browsingDataDiv');
  var blockedSitesList = document.getElementById('blockedSitesList');
  var visitedSitesList = document.getElementById('visitedSitesList');
  var enterSite = document.getElementById('enterSite');

  enterSite.addEventListener('click', function () {
    chrome.tabs.create({ url: 'http://localhost:3000/home' });
  });

  blockSitesBtn.addEventListener('click', function () {
    blockDiv.classList.remove('hidden');
    browsingDataDiv.classList.add('hidden');
    updateBlockedSitesList();
  });

  browsingDataBtn.addEventListener('click', function () {
    browsingDataDiv.classList.remove('hidden');
    blockDiv.classList.add('hidden');
    updateSiteList();
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
              updateBlockedSitesList();
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

  updateSiteList();

  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("Received message in popup:", request);
    if (request.action === 'updateAllSiteStats') {
      updateSiteListFromStats(request.stats);
    }
  });

  function updateBlockedSitesList() {
    chrome.runtime.sendMessage({ action: 'getBlockedSites' }, (response) => {
      const blockedSites = response.blockedSites || [];
      blockedSitesList.innerHTML = '';
      blockedSites.forEach((hostname) => {
        const li = document.createElement("li");
        li.textContent = hostname;
        blockedSitesList.appendChild(li);
      });
    });
  }

  function updateSiteList() {
    console.log("Requesting site stats");
    chrome.runtime.sendMessage({ action: 'getSiteStats' });
  }

  function updateSiteListFromStats(stats) {
    console.log("Updating site list with stats:", stats);
    visitedSitesList.innerHTML = '';
    stats.forEach(function (site) {
      addSiteToList(site.hostname, site.visitTime);
    });
  }

  function addSiteToList(hostname, visitTime) {
    var visitedLi = document.createElement('li');
    visitedLi.style.display = 'flex';
    visitedLi.dataset.hostname = hostname;

    var faviconUrl = "http://www.google.com/s2/favicons?domain=" + hostname;
    var faviconImg = document.createElement('img');
    faviconImg.src = faviconUrl;
    faviconImg.style.width = '16px';
    faviconImg.style.height = '16px';
    faviconImg.style.marginRight = '5px';
    faviconImg.onerror = function () {
      console.log('Error loading favicon for:', hostname);
      this.src = 'default-icon.png';
    };

    var siteNameSpan = document.createElement('span');
    var parts = hostname.split('.');
    siteNameSpan.textContent = parts[0];
    siteNameSpan.style.marginRight = '10px';

    var visitTimeSpan = document.createElement('span');
    visitTimeSpan.textContent = visitTime;
    visitTimeSpan.className = 'visit-time';
    visitTimeSpan.style.marginRight = '10px';

    visitedLi.appendChild(faviconImg);
    visitedLi.appendChild(siteNameSpan);
    visitedLi.appendChild(visitTimeSpan);

    visitedSitesList.appendChild(visitedLi);
  }

  // עדכון אוטומטי כל שנייה
  setInterval(updateSiteList, 1000);
});
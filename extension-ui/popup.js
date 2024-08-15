

document.addEventListener('DOMContentLoaded', async function () {

  var blockSitesBtn = document.getElementById('blockSitesBtn');
  var browsingDataBtn = document.getElementById('browsingDataBtn');
  var blockDiv = document.getElementById('blockDiv');
  var browsingDataDiv = document.getElementById('browsingDataDiv');
  var blockedSitesList = document.getElementById('blockedSitesList');
  var enterSite = document.getElementById('enterSite');
  var modeDisplay = document.getElementById('modeDisplay');

  enterSite.addEventListener('click', function () {
    //TODO Insert a folder-client-side inside a folder extension-ui
    // chrome.tabs.create({ url: chrome.runtime.getURL('client-side/dist/index.html') });
  });


  blockSitesBtn.addEventListener('click', function () {
    blockDiv.classList.remove('hidden');
    browsingDataDiv.classList.add('hidden');
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

  browsingDataBtn.addEventListener('click', async function () {
    browsingDataDiv.classList.remove('hidden');
    blockDiv.classList.add('hidden');
    
    // Clear previous content
    browsingDataDiv.innerHTML = '<h3>Browsing Data:</h3>';
    
    const siteList = document.createElement('ul');
    siteList.id = 'siteList';
    browsingDataDiv.appendChild(siteList);

    const sites = await getSites();

    // Sort sites by time spent (descending order)
    const sortedSites = Object.entries(sites).sort((a, b) => b[1].time - a[1].time);

    for (const [hostname, data] of sortedSites) {
      const li = document.createElement('li');
      
      // Create favicon image
      const favicon = document.createElement('img');
      favicon.className = 'favicon';
      favicon.src = `https://www.google.com/s2/favicons?domain=${hostname}`;
      favicon.onerror = () => {
        favicon.src = 'default-favicon.png'; // Make sure to add a default favicon image to your extension
      };
      
      // Create text node
      const textNode = document.createTextNode(`${hostname}: ${formatTime(data.time)}`);
      
      // Append favicon and text to list item
      li.appendChild(favicon);
      li.appendChild(textNode);
      
      siteList.appendChild(li);
    }
  });

  const blockForm = document.getElementById('blockForm');
  const siteInput = document.getElementById('siteInput');
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

  function updateModeDisplay(isBlackList) {
    modeDisplay.textContent = isBlackList ? "Blacklist Mode" : "Whitelist Mode";
  }

  // Initial load
  chrome.runtime.sendMessage({ action: 'getMode' }, (response) => {
    updateModeDisplay(response.isBlackList);
  });
});

function getSites() {
  return new Promise((resolve) => {
    chrome.storage.local.get('sites', (result) => {
      resolve(result.sites || {});
    });
  });
}

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${padZero(hours)}:${padZero(minutes)}:${padZero(remainingSeconds)}`;
}

function padZero(num) {
  return num.toString().padStart(2, '0');
}

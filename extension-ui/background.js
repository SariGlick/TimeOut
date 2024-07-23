let siteStats = {};
let activeTabId;
let activeHostname = null;

// טען את הנתונים בעת הפעלת התוסף
chrome.runtime.onStartup.addListener(loadSiteStatsFromStorage);
chrome.runtime.onInstalled.addListener(loadSiteStatsFromStorage);

function loadSiteStatsFromStorage() {
  chrome.storage.local.get('siteStats', function(result) {
    if (result.siteStats) {
      siteStats = result.siteStats;
      console.log("Loaded siteStats:", siteStats);
    }
  });
}

chrome.tabs.onActivated.addListener(function(activeInfo) {
  activeTabId = activeInfo.tabId;
  updateCurrentSite(activeTabId);
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tabId === activeTabId) {
    updateCurrentSite(tabId);
  }
});

function updateCurrentSite(tabId) {
  chrome.tabs.get(tabId, function(tab) {
    if (tab && tab.url) {
      activeHostname = new URL(tab.url).hostname;
      console.log("Active hostname updated:", activeHostname);
      if (!siteStats[activeHostname]) {
        siteStats[activeHostname] = { visitTime: 0, lastVisit: Date.now() };
      } else {
        siteStats[activeHostname].lastVisit = Date.now();
      }
      chrome.storage.local.set({ siteStats: siteStats });
    }
  });
}

chrome.alarms.create('updateTimer', { periodInMinutes: 1/60 });

chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === 'updateTimer') {
    updateActiveTimer();
  }
});

function updateActiveTimer() {
  if (activeHostname && siteStats[activeHostname]) {
    siteStats[activeHostname].visitTime += 1;
    console.log("Updated time for", activeHostname, ":", siteStats[activeHostname].visitTime);
    chrome.storage.local.set({ siteStats: siteStats });
    sendUpdatedStats();
  }
}

function sendUpdatedStats() {
  let statsArray = Object.keys(siteStats).map(hostname => ({
    hostname: hostname,
    visitTime: formatTime(siteStats[hostname].visitTime)
  }));
  
  console.log("Sending updated stats:", statsArray);
  chrome.runtime.sendMessage({
    action: 'updateAllSiteStats',
    stats: statsArray
  });
}

function formatTime(seconds) {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  seconds = seconds % 60;
  return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(num) {
  return num.toString().padStart(2, '0');
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'getSiteStats') {
    console.log("Received getSiteStats request");
    sendUpdatedStats();
  }
  return true;
});

////.....
let blockedSitesCache = null;

// Initialize cache when the extension is loaded
chrome.runtime.onStartup.addListener(() => initializeBlockedSitesCache());
chrome.runtime.onInstalled.addListener(() => initializeBlockedSitesCache());

function initializeBlockedSitesCache(callback) {
  chrome.storage.local.get("blockedSites", (data) => {
    blockedSitesCache = data.blockedSites || [];
    if (typeof callback === "function") {
      callback();
    }
  });
}

// Use this function to ensure cache is initialized
function ensureBlockedSitesCacheInitialized(callback) {
  if (blockedSitesCache === null) {
    initializeBlockedSitesCache(callback);
  } else if (typeof callback === "function") {
    callback();
  }
}

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  ensureBlockedSitesCacheInitialized(() => {
    handleBeforeNavigate(details);
  });
}, { url: [{ schemes: ['http', 'https'] }] });

function handleBeforeNavigate(details) {
  try {
    const url = new URL(details.url);
    
    if (url.protocol === 'chrome:' || url.protocol === 'about:') {
      return;
    }

    const hostname = url.hostname.toLowerCase();
    
    if (blockedSitesCache.some(site => hostname.includes(site))) {
      chrome.tabs.get(details.tabId, (tab) => {
        if (tab.url.startsWith('chrome://') || tab.url.startsWith('about:')) {
          return;
        }
        chrome.scripting.executeScript({
          target: { tabId: details.tabId },
          func: () => {
            //TODO  add UI for the oops window
             window.stop();
            window.location.href = chrome.runtime.getURL('oops.html');
          }
        }).catch(error => {
          console.error("Error executing script: ", error);
        });
      });
    }
  } catch (error) {
    console.error("Invalid URL: ", error);
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'addBlockedSite') {
    const hostname = request.hostname.toLowerCase();
    ensureBlockedSitesCacheInitialized(() => {
      if (!blockedSitesCache.includes(hostname)) {
        blockedSitesCache.push(hostname);
        chrome.storage.local.set({ blockedSites: blockedSitesCache }, () => {
          sendResponse({ success: true });
        });
      } else {
        sendResponse({ success: false, message: 'Site already blocked' });
      }
    });
    return true; // כדי להורות שהתגובה היא אסינכרונית
  } else if (request.action === 'getBlockedSites') {
    ensureBlockedSitesCacheInitialized(() => {
      sendResponse({ blockedSites: blockedSitesCache });
    });
    return true; // כדי להורות שהתגובה היא אסינכרונית
  }
});
//


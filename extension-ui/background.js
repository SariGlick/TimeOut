
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

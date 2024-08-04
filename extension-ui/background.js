let blockedSitesCache = null;
let allowedSitesCache = null;
let isBlackList = false; // שימי לב שהגדרת isBlackList ל-false כדי לבדוק את הרשימה הלבנה

chrome.runtime.onStartup.addListener(() => initializeCaches());
chrome.runtime.onInstalled.addListener(() => initializeCaches());

function initializeCaches(callback) {
  chrome.storage.local.get(["blockedSites", "allowedSites"], (data) => {
    blockedSitesCache = data.blockedSites || [];
    allowedSitesCache = data.allowedSites || [];
    console.log("Caches initialized:", { blockedSitesCache, allowedSitesCache }); // לוגים
    if (typeof callback === "function") {
      callback();
    }
  });
}

function ensureCachesInitialized(callback) {
  if (blockedSitesCache === null || allowedSitesCache === null) {
    initializeCaches(callback);
  } else if (typeof callback === "function") {
    callback();
  }
}

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  ensureCachesInitialized(() => {
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
    console.log("Navigating to:", hostname); // לוגים

    if (isBlackList) {
      if (blockedSitesCache.some(site => hostname.includes(site))) {
        console.log("Blocking site (blacklist):", hostname); // לוגים
        blockSite(details.tabId);
      }
    } else {
      if (!allowedSitesCache.some(site => hostname.includes(site))) {
        console.log("Blocking site (whitelist):", hostname); // לוגים
        blockSite(details.tabId);
      } else {
        console.log("Site allowed (whitelist):", hostname); // לוגים
      }
    }
  } catch (error) {
    console.error("Invalid URL: ", error);
  }
}

function blockSite(tabId) {
  chrome.tabs.get(tabId, (tab) => {
    if (tab.url.startsWith('chrome://') || tab.url.startsWith('about:')) {
      return;
    }
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: () => {
        window.stop();
        window.location.href = chrome.runtime.getURL('oops.html');
      }
    }).catch(error => {
      console.error("Error executing script: ", error);
    });
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'addBlockedSite') {
    const hostname = request.hostname.toLowerCase();
    ensureCachesInitialized(() => {
      if (!blockedSitesCache.includes(hostname)) {
        blockedSitesCache.push(hostname);
        chrome.storage.local.set({ blockedSites: blockedSitesCache }, () => {
          sendResponse({ success: true });
        });
      } else {
        sendResponse({ success: false, message: 'Site already blocked' });
      }
    });
    return true;
  } else if (request.action === 'getBlockedSites') {
    ensureCachesInitialized(() => {
      sendResponse({ blockedSites: blockedSitesCache });
    });
    return true;
  } else if (request.action === 'addAllowedSite') {
    const hostname = request.hostname.toLowerCase();
    ensureCachesInitialized(() => {
      if (!allowedSitesCache.includes(hostname)) {
        allowedSitesCache.push(hostname);
        chrome.storage.local.set({ allowedSites: allowedSitesCache }, () => {
          sendResponse({ success: true });
        });
      } else {
        sendResponse({ success: false, message: 'Site already allowed' });
      }
    });
    return true;
  } else if (request.action === 'getAllowedSites') {
    ensureCachesInitialized(() => {
      sendResponse({ allowedSites: allowedSitesCache });
    });
    return true;
  }
});

importScripts('constants.js');
let blockedSitesCache = null;
let allowedSitesCache = ["http://localhost:3000","https://github.com"]; 
let isBlackList = false; 

chrome.runtime.onStartup.addListener(() => initializeCaches());
chrome.runtime.onInstalled.addListener(() => initializeCaches());

function initializeCaches(callback) {
  chrome.storage.local.get(["blockedSites"], (data) => {
    blockedSitesCache = data.blockedSites || [];
    if (typeof callback === "function") {
      callback();
    }
  });
}

function ensureCachesInitialized(callback) {
  if (blockedSitesCache === null) {
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

    if (isBlackList) {
      if (blockedSitesCache.some(site => hostname.includes(site))) {
        blockSite(details.tabId);
      }
    } else {
      if (!allowedSitesCache.some(site => hostname.includes(site))) {
        blockSite(details.tabId);
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
        sendResponse({ success: false, message: "Site is already blocked." });
      }
    });
    return true;
  }

  if (request.action === 'getMode') {
    ensureCachesInitialized(() => {
      sendResponse({ isBlackList: isBlackList });
    });
    return true;
  }

  if (request.action === 'getBlockedSites') {
    ensureCachesInitialized(() => {
      sendResponse({ blockedSites: blockedSitesCache });
    });
    return true;
  }

  if (request.action === 'getAllowedSites') {
    sendResponse({ allowedSites: allowedSitesCache });
    return true;
  }
});

function showNotification(site, num, options = {}) {
  var message = NOTIFICATION_MESSAGE.replace('{site}', site).replace('{num}', num);
  var notificationOptions = {
    type: 'basic',
    iconUrl: options.iconUrl || 'images/icon48.png',
    title: NOTIFICATION_TITLE,
    message: message,
    priority: options.priority || 2
  };
  
  chrome.notifications.create(notificationOptions);
}

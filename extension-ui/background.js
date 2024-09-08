importScripts('constants.js');
let blockedSitesCache = null;
let allowedSitesCache = [];
let isBlackList = true;
let currentUserId = null;

chrome.runtime.onStartup.addListener(() => {
  initializeCaches();
  getUserIdFromTokenCookie();
});

chrome.runtime.onInstalled.addListener(() => {
  initializeCaches();
  getUserIdFromTokenCookie();
});

function getUserIdFromTokenCookie() {
  chrome.cookies.get({ url: "http://localhost:5000", name: "token" }, (cookie) => {
    if (cookie) {
      const token = cookie.value;
      const userId = parseUserIdFromToken(token);
      console.log("User ID:", userId);

    } else {
      console.log("Token cookie not found!");
    }
    
});}

function parseUserIdFromToken(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.userId;   
  } catch (error) {
    console.error("Failed to parse token:", error);
    return null;
  }
}


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

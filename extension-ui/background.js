importScripts('constants.js');
let blockedSitesCache = null;
let allowedSitesCache = [];
let isBlackList = true;
let currentUser = null;

chrome.runtime.onStartup.addListener(() => {
  initializeCaches();
  initializeSession();
});

chrome.runtime.onInstalled.addListener(() => {
  initializeCaches();
  initializeSession();
});

function initializeCaches(callback) {
  chrome.storage.local.get("blockedSites", (data) => {
    blockedSitesCache = data.blockedSites || [];
    if (typeof callback === "function") {
      callback();
    }
  });
}

function ensureBlockedSitesCacheInitialized(callback) {
  if (blockedSitesCache === null) {
    initializeCaches(callback);
  } else if (typeof callback === "function") {
    callback();
  }
}

function initializeSession() {
  chrome.storage.local.get(['userId'], (result) => {
    if (result.userId) {
      currentUser = result.userId;
      console.log("Current User ID:", currentUser);
    } else {
      // No userId in storage, fetch it from the server
      fetchUserIdFromServer();
    }
  });
}

function fetchUserIdFromServer() {
  fetch('http://localhost:5000/users/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json', 'Cache-Control': 'no-cache'
    },
    credentials: 'include' // אם אתה זקוק לשלוח עוגיות
  })
  .then((response) => response.json())
  .then((user_id) => {
    if (user_id) {
      const userId = user_id; // נניח ש-ID של המשתמש נמצא ב- data.user._id
      currentUser = userId; // עדכן את המשתנה currentUser
      // שמור את ה-userId ב-chrome.storage.local
      chrome.storage.local.set({ userId: currentUser }, () => {
        console.log("User ID fetched from server and stored:", currentUser);
      });
    } else {
      console.log("User ID not found on the server.");
    }
  })
  .catch((error) => {
    console.error("Error fetching user ID from server:", error);
  });
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
      blockSite(details.tabId);
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
    return true;
  } else if (request.action === 'getBlockedSites') {
    ensureBlockedSitesCacheInitialized(() => {
      sendResponse({ blockedSites: blockedSitesCache });
    });
    return true;
  } else if (request.action === 'storeUserId' && request.userId) {
    // שמירת ה-UserId שנשלח מדף ה-HTML
    chrome.storage.local.set({ userId: request.userId }, () => {
      currentUser = request.userId;
      console.log('User ID stored:', currentUser);
      sendResponse({ success: true });
    });
    return true;
  }
});

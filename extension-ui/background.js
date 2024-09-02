let blockedSitesCache = null;
let allowedSitesCache = [];
let isBlackList = false;
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

function parseUserIdFromToken(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.userId;   
  } catch (error) {
    console.error("Failed to parse token:", error);
    return null;
  }
}


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

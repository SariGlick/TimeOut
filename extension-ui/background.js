let currentTab = null;
let startTime = null;

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  try {
    const tab= await chrome.tabs.get(activeInfo.tabId);
    updateData(tab);
  } catch (error) {
    console.error('Error in onActivated listener:', error);
  }
});


chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.active) {
    updateData(tab);
  }
});

async function updateData(tab) {
    await updateTimeForPreviousTab();
    currentTab = tab;
    startTime = Date.now();
    if (tab.url) {
      await addSiteToList(tab.url);
    }
}

async function updateTimeForPreviousTab() {
  if (currentTab && startTime && currentTab.url) {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    await updateSiteTime(currentTab.url, timeSpent);
  }
}

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

async function addSiteToList(url) {
  if (!isValidUrl(url)) return;
  
  const { hostname } = new URL(url);
  const sites = await getSites();
  if (!sites[hostname]) {
    sites[hostname] = { time: 0 };
    await chrome.storage.local.set({ sites });
  }
}

async function updateSiteTime(url, time) {
  if (!isValidUrl(url)) return;
  
  const { hostname } = new URL(url);
  const sites = await getSites();
  if (sites[hostname]) {
    sites[hostname].time += time;
    await chrome.storage.local.set({ sites });
  }
}

async function getSites() {
  const result = await chrome.storage.local.get('sites');
  return result.sites || {};
}

// Listener for when the browser window is closed
chrome.windows.onRemoved.addListener(async () => {
  await updateTimeForPreviousTab();
});

// Set up alarm to periodically update time
chrome.alarms.create('updateTime', { periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'updateTime') {
    await updateTimeForPreviousTab();
    if (currentTab && currentTab.url) {
      startTime = Date.now();  // Reset start time
    }
  }
});
importScripts('constants.js');import { BASE_URL } from './constants';
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

async function updateCurrentTabTime() {
  if (currentTab && currentTab.url) {
    await updateTimeForPreviousTab();
  }
}
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "updateCurrentTabTime") {
    updateCurrentTabTime().then(() => sendResponse({success: true}));
    return true; // Indicates that the response is sent asynchronously
  }
});
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

chrome.runtime.onInstalled.addListener(() => {

  fetch(`${BASE_URL}/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    })
    .then(settings => {
      chrome.storage.local.set({ userSettings: settings }, () => {
      });
    })
    .catch(error => console.error('Failed to fetch user settings:', error));
});


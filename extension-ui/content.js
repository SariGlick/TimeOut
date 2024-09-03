let blockedSitesCache = null;
let allowedSitesCache = null;
let isBlackList = true;

function initializeCache(callback) {
  chrome.storage.local.get(["blockedSites", "allowedSites", "isBlackList"], (data) => {
    blockedSitesCache = data.blockedSites || [];
    allowedSitesCache = data.allowedSites || [];
    isBlackList = data.isBlackList !== undefined ? data.isBlackList : true;
    if (callback) callback();
  });
}
initializeCache(() => {
  const hostname = window.location.hostname.toLowerCase();

  if (isBlackList) {
    if (blockedSitesCache && blockedSitesCache.includes(hostname)) {
      window.location.href = chrome.runtime.getURL('oops.html');
    }
  } else {
    if (allowedSitesCache && !(allowedSitesCache.includes(hostname))) {
      window.location.href = chrome.runtime.getURL('oops.html');
    }
  }
});
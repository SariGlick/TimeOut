let blockedSitesCache = null;
let allowedSitesCache = null;

function initializeCache(callback) {
  chrome.storage.local.get(["blockedSites", "allowedSites"], (data) => {
    blockedSitesCache = data.blockedSites || [];
    allowedSitesCache = data.allowedSites || [];
    if (callback) callback();
  });
}

initializeCache(() => {
  const hostname = window.location.hostname.toLowerCase();
  const domain = hostname.split(".")[1];

  if (isBlackList) {
    if (blockedSitesCache && blockedSitesCache.includes(domain)) {
      window.location.href = chrome.runtime.getURL('oops.html');
    }
  } else {
    if (allowedSitesCache && !allowedSitesCache.includes(domain)) {
      window.location.href = chrome.runtime.getURL('oops.html');
    }
  }
});

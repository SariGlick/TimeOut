let blockedSitesCache = null;

function initializeBlockedSitesCache(callback) {
  chrome.storage.local.get("blockedSites", (data) => {
    blockedSitesCache = data.blockedSites || [];
    if (callback) callback();
  });
}

initializeBlockedSitesCache(() => {
  const hostname = window.location.hostname.toLowerCase();
  const domain = hostname.split(".")[1];
  if (blockedSitesCache && blockedSitesCache.includes(domain)) {
    window.location.href = chrome.runtime.getURL('oops.html');
  }
});



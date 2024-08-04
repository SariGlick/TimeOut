let blockedSitesCache = null;
let allowedSitesCache = null;
let isBlackList = false; // ודא ש-isBlackList מוגדר ל-false כדי לבדוק את הרשימה הלבנה

function initializeCache(callback) {
  chrome.storage.local.get(["blockedSites", "allowedSites"], (data) => {
    blockedSitesCache = data.blockedSites || [];
    allowedSitesCache = data.allowedSites || [];
    console.log("Caches initialized:", { blockedSitesCache, allowedSitesCache }); // לוגים
    if (callback) callback();
  });
}

initializeCache(() => {
  const hostname = window.location.hostname.toLowerCase();
  console.log("Current hostname:", hostname); // לוגים

  if (isBlackList) {
    if (blockedSitesCache && blockedSitesCache.includes(hostname)) {
      console.log("Blocking site (blacklist):", hostname); // לוגים
      window.location.href = chrome.runtime.getURL('oops.html');
    }
  } else {
    if (allowedSitesCache && !allowedSitesCache.includes(hostname)) {
      console.log("Blocking site (whitelist):", hostname); // לוגים
      window.location.href = chrome.runtime.getURL('oops.html');
    } else {
      console.log("Site allowed (whitelist):", hostname); // לוגים
    }
  }
});

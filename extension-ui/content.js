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

// שינוי פונקציה לinitializeCache
initializeCache(() => {
  const hostname = window.location.hostname.toLowerCase();

  // בדיקה לפי משתנה isBlackList
  if (isBlackList) {
    // חסום אם האתר נמצא ברשימת החסומות
    if (blockedSitesCache && blockedSitesCache.includes(hostname)) {
      window.location.href = chrome.runtime.getURL('oops.html');
    }
  } else {
    // חסום אם האתר אינו נמצא ברשימת האתרים המורשים
    if (allowedSitesCache && !allowedSitesCache.includes(hostname)) {
      window.location.href = chrome.runtime.getURL('oops.html');
    }
  }
});

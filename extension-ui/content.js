let blockedSitesCache = null;
let allowedSitesCache = null; // משתנה חדש לרשימה הלבנה

function initializeCache(callback) {
  chrome.storage.local.get(["blockedSites", "allowedSites"], (data) => {
    blockedSitesCache = data.blockedSites || [];
    allowedSitesCache = data.allowedSites || []; // טען את הרשימה הלבנה
    if (callback) callback();
  });
}

// שינוי פונקציה לinitializeCache
initializeCache(() => {
  const hostname = window.location.hostname.toLowerCase();
  const domain = hostname.split(".")[1];

  // בדיקה לפי משתנה isBlackList
  if (isBlackList) {
    // חסום אם האתר נמצא ברשימת החסומות
    if (blockedSitesCache && blockedSitesCache.includes(domain)) {
      window.location.href = chrome.runtime.getURL('oops.html');
    }
  } else {
    // חסום אם האתר אינו נמצא ברשימת האתרים המורשים
    if (allowedSitesCache && !allowedSitesCache.includes(domain)) {
      window.location.href = chrome.runtime.getURL('oops.html');
    }
  }
});

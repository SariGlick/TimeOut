export class SiteLimit {
  constructor(url, limit, notificationTime) {
    this.url = url;
    this.limit = limit;
    this.notificationTime = notificationTime;
    this.timeLeft = limit;
    this.isBlocked = false;
    this.notificationShown = false;
    this.lastVisit = {
      time: Date.now(),
      date: new Date().toDateString()
    };
  }

  updateRemainingTime() {
    if (this.isTabActive) {
      const now = Date.now();
      const timeSpent = now - this.lastVisit.time;
      this.timeLeft -= timeSpent;
      this.lastVisit.time = now;
      if (this.timeLeft <= 0) {
        this.timeLeft = 0;
        this.isBlocked = true;
        this.redirectToOopsPage();
      } else {
        this.updateStorage();
      }
    }
  }

  resetTimer() {
    clearTimeout(this.notificationTimeoutId);
    clearTimeout(this.timeoutId);
    this.notificationShown = false;
  }

  startTimer() {
    this.checkForNewDay();
    this.checkProfileChange();
    clearTimeout(this.notificationTimeoutId);
    clearTimeout(this.timeoutId);

    const warningTime = this.timeLeft - this.notificationTime;

    this.notificationTimeoutId = setTimeout(() => {
      if (!this.notificationShown) {
        showNotification(this.url, this.notificationTime);
        this.notificationShown = true;
        this.updateStorage();
      }
      this.timeoutId = setTimeout(() => {
        this.isBlocked = true;
        this.updateStorage();
        this.redirectToOopsPage();
      }, this.notificationTime);
    }, warningTime);
  }

  checkForNewDay() {
    const currentDate = new Date().toDateString();
    if (currentDate !== this.lastVisit.date) {
      this.timeLeft = profileLimits[currentProfile];
      this.lastVisit.date = currentDate;
      this.isBlocked = false;
      this.notificationShown = false;
      this.updateStorage();
    }
  }

  checkProfileChange() {
    chrome.storage.local.get(['currentProfile'], (data) => {
      if (data.currentProfile && data.currentProfile !== currentProfile) {
        currentProfile = data.currentProfile;
        updateStorage();
        Object.values(siteLimits).forEach(siteLimit => {
          siteLimit.limit = profileLimits[currentProfile];
          siteLimit.updateStorage();
          if (siteLimit.isBlocked) {
            siteLimit.redirectToOopsPage();
          }
        });
      }
    });
  }
  updateStorage() {
    chrome.storage.local.set({
      [`${this.url}_lastVisit`]: this.lastVisit,
      [`${this.url}_timeLeft`]: this.timeLeft,
      [`${this.url}_isBlocked`]: this.isBlocked,
      [`${this.url}_notificationShown`]: this.notificationShown
    });
  }

  redirectToOopsPage() {
    chrome.tabs.query({ url: `*://${this.url}/*` }, (tabs) => {
      tabs.forEach(tab => {
        chrome.tabs.update(tab.id, { url: chrome.runtime.getURL("oops.html") });
      });
    });
  }

  showNotification(site, num, options = {}) {
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
}


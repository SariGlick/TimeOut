
// document.addEventListener('DOMContentLoaded', async function() {
//   updateSiteList();

//   chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//       if (request.action === 'updateTimer') {
//           updateSiteTimer(request.hostname, request.visitTime);
//       }
//   });

//   // הוספת אירוע שינוי לתיבת הבחירה של המשתמש
//   var layoutDirectionSelect = document.getElementById('layoutDirection');
//   layoutDirectionSelect.addEventListener('change', function() {
//       var selectedDirection = layoutDirectionSelect.value;
//       // עדכון את הסגנון של התצוגה בהתאם לבחירת המשתמש
//       updateDisplayLayout(selectedDirection);
//   });

//   // קריאה ראשונית לפונקציה כדי להגדיר את התצוגה על פי הערך הראשוני של הבחירה
//   var initialDirection = layoutDirectionSelect.value;
//   updateDisplayLayout(initialDirection);
// });

// async function updateSiteList() {
//   let response = await new Promise((resolve) => {
//       chrome.runtime.sendMessage({ action: 'getSiteStats' }, function(response) {
//           resolve(response);
//       });
//   });

//   var visitedSitesList = document.getElementById('visitedSitesList');
//   visitedSitesList.innerHTML = ''; // נקה את הרשימה הקיימת

//   response.siteStats.forEach(function(site) {
//       addSiteToList(site.hostname, site.visitTime);
//   });
// }

// function addSiteToList(hostname, visitTime) {
//   var visitedSitesList = document.getElementById('visitedSitesList');

//   var visitedLi = document.createElement('li');
//   visitedLi.style.display = 'flex';
//   visitedLi.dataset.hostname = hostname;

//   var faviconUrl = "http://www.google.com/s2/favicons?domain=" + hostname;
//   var faviconImg = document.createElement('img');
//   faviconImg.src = faviconUrl;
//   faviconImg.style.width = '16px';
//   faviconImg.style.height = '16px';
//   faviconImg.style.marginRight = '5px';
//   faviconImg.onerror = function() {
//     console.log('Error loading favicon for:', hostname);
//     this.src = 'default-icon.png';
// };
//   var siteNameSpan = document.createElement('span');
//   var parts = hostname.split('.');
//   siteNameSpan.textContent = parts[0];
//   siteNameSpan.style.marginRight = '10px'; // כמו בקוד הקיים

//   var visitTimeSpan = document.createElement('span');
//   visitTimeSpan.textContent = visitTime;
//   visitTimeSpan.className = 'visit-time';
//   visitTimeSpan.style.marginRight = '10px'; // כמו בקוד הקיים

//   visitedLi.appendChild(faviconImg);
//   visitedLi.appendChild(siteNameSpan);
//   visitedLi.appendChild(visitTimeSpan);

//   visitedSitesList.appendChild(visitedLi);
// }

// function updateSiteTimer(hostname, newTime) {
//   var visitedSitesList = document.getElementById('visitedSitesList');
//   var siteItem = visitedSitesList.querySelector(`li[data-hostname="${hostname}"]`);
//   if (siteItem) {
//       var timeSpan = siteItem.querySelector('.visit-time');
//       if (timeSpan) {
//           timeSpan.textContent = newTime;
//       }
//   } else {
//       addSiteToList(hostname, newTime);
//   }
// }

// function updateDisplayLayout(direction) {
//   var visitedSitesList = document.getElementById('visitedSitesList');
//   if (direction === 'rtl') {
//       visitedSitesList.style.direction = 'rtl';
//   } else {
//       visitedSitesList.style.direction = 'ltr';
//   }
// }

(()=>{"use strict";let t=!1;function e(t){document.body.style.backgroundColor=t}chrome.action.onClicked.addListener((c=>{t=!t;const o=t?"orange":"white";chrome.scripting.executeScript({target:{tabId:c.id?c.id:-1},func:e,args:[o]})}))})();
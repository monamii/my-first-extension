// chrome.runtime.onInstalled.addListener(()=>{

//     const queryCallback: (result: chrome.tabs.Tab[]) => void = ((tabs: chrome.tabs.Tab[])=>{
//         chrome.action.disable(tabs[0].id);
//     });

//     const queryInfo: chrome.tabs.QueryInfo = {active: true, currentWindow: true};
//     const webNavCompleteCallback: () => void = ()=>{
//         chrome.tabs.query(queryInfo, queryCallback);
//     }

//     const urlFilter: chrome.events.UrlFilter = {hostContains: "google.com"};
//     const webNavFilter: chrome.webNavigation.WebNavigationEventFilter = {url: [urlFilter]};
//     chrome.webNavigation.onCompleted.addListener(webNavCompleteCallback, webNavFilter);
    
// });

chrome.runtime.onInstalled.addListener(() => {
    chrome.webNavigation.onCompleted.addListener(() => {
      chrome.tabs.query({ active: true, currentWindow: true }, ([{ id }]) => {
        if (id) {
          chrome.action.disable(id);
        }
      });
    }, { url: [{ hostContains: 'google.com' }] });
  });
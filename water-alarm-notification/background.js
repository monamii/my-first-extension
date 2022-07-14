"use strict";

chrome.alarms.onAlarm.addListener(() => {
  chrome.action.setBadgeText({ text: "" });
  chrome.notifications.create({
    type: "basic",
    iconUrl: "images/stay_hydrated.png",
    title: "Time to Hydrate",
    message: "Everyday I'm Guzzlin'!",
    buttons: [{ title: "Keep it Flowing." }, { title: "Stop drinking." }],
    priority: 0,
  });
});

chrome.notifications.onButtonClicked.addListener(
  async (_notificationId, buttonIndex) => {
    if (buttonIndex === 0) {
      const item = await chrome.storage.sync.get(["milliseconds"]);
      console.log(item);
      chrome.action.setBadgeText({ text: "ON" });
      chrome.alarms.create({
        when: Date.now() + item.milliseconds,
      });
    } else {
      chrome.action.setBadgeText({ text: "" });
      chrome.alarms.clearAll();
    }
  }
);

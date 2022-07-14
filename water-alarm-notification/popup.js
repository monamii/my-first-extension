"use strict";
function setAlarm(event) {
  console.log("called");
  const milliseconds = parseFloat(event.target.value) * 1000;
  chrome.action.setBadgeText({ text: "ON" });
  chrome.alarms.create({ when: Date.now() + milliseconds });
  chrome.storage.sync.set({ milliseconds: milliseconds });
  window.close();
}

function stopAlarm() {
  chrome.action.setBadgeText({ text: "" });
  chrome.alarms.clearAll();
  window.close();
}

document.getElementById("testButton").addEventListener("click", setAlarm);
document.getElementById("min15").addEventListener("click", setAlarm);
document.getElementById("min30").addEventListener("click", setAlarm);
document.getElementById("stopAlarm").addEventListener("click", stopAlarm);

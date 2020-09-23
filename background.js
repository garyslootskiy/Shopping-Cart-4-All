console.log('Background running');
chrome.browserAction.onClicked.addListener(IconClicked);
function IconClicked(tab) {
  const msg = {
    txt: 'Hello',
  };
  chrome.tabs.sendMessage(tab.id, msg);
}

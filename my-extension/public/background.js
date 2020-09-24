// // Called when the user clicks on the browser action
// chrome.browserAction.onClicked.addListener(function(tab) {
//   // Send a message to the active tab
//   chrome.tabs.query({active: true, currentWindow:true},
//      function(tabs) {
//         var activeTab = tabs[0];
//         chrome.tabs.sendMessage(activeTab.id, 
//             {"message": "clicked_browser_action"}
//         );
//   });
// });

// //contentScript.js
// const item = {};
// item.name = document.getElementsByClassName("heading-5");
// item.price = document.getElementsByClassName("priceView-customer-price");
// return item;
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
     localStorage["url"] = request.url;
     localStorage["name"] = request.name;
     localStorage["price"] = request.price;
     localStorage["store"] = request.store;
     localStorage["image"] = request.image;
     sendResponse();
  }
);
// //contentScript.js
// const item = {};
// item.name = document.getElementsByClassName("heading-5");
// item.price = document.getElementsByClassName("priceView-customer-price");
// return item;
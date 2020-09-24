

// Once the DOM is ready...
// window.addEventListener('DOMContentLoaded', () => {
//   item.name = document.getElementsByClassName("heading-5");
//   item.price = document.getElementsByClassName("priceView-customer-price");
// });

  // const item = document.getElementsByClassName("heading-5 v-fw-regular")[0].innerHTML;



  // const item = chrome.runtime.getUrl

  // chrome.runtime.sendMessage({
  //   currentItem: item
  //     // price: document.getElementById("priceView-customer-price")
  //   })
  // });


  chrome.extension.sendMessage({}, function(response) {
    var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);
      
      const price =  document.evaluate('/html/body/div[4]/main/div[1]/div[3]/div[2]/div/div/div[3]/div/div/div/div/div[2]/div/div[1]/div/span[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;
      const store = 'bestbuy';
      const name = document.getElementsByClassName("heading-5 v-fw-regular")[0].innerHTML;
      const url = window.location.href;
      const image =  document.getElementsByClassName("primary-image")[0].src;
      chrome.runtime.sendMessage({
        url: url,
        name: name,
        price: price,
        store: store,
        image: image
          // price: document.getElementById("priceView-customer-price")
        })
    }
    }, 10);
  });
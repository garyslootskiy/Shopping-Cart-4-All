

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
    
      let price = '0';
      let store = 'none';
      let name = 'none';
      let image;
      const url = window.location.href;
      const hostCheck =  window.location.hostname;
      
      if (hostCheck == 'www.bestbuy.com') {
        store = 'BestBuy';
        name = document.getElementsByClassName("heading-5 v-fw-regular")[0].innerHTML;
        image = document.getElementsByClassName("primary-image")[0].src;
        price = document.getElementsByClassName("priceView-hero-price priceView-customer-price")[0].innerText;
        let pattern = /\d+(?:\.\d+)?/g;
        price = pattern.exec(price);
      }

      if (hostCheck == 'www.target.com') {
        // name = document.querySelector("div[data-test='product-price']").innerText;
        store = 'Target';
        name = document.getElementsByClassName("Heading__StyledHeading-sc-1m9kw5a-0")[0].innerText;
        image =  document.getElementsByClassName("styles__ThumbnailImage-beej2j-11")[0].src;
        price =  document.getElementsByClassName("style__PriceFontSize-sc-17wlxvr-0")[0].innerText.trim().slice(1);
      }

      if (hostCheck == 'www.walmart.com') {
        price =  document.getElementsByClassName("price-characteristic")[0].innerHTML;
        store = 'Walmart';
        name = document.getElementsByClassName("prod-ProductTitle")[0].innerHTML;
        image =  document.getElementsByClassName("hover-zoom-hero-image")[0].src;
      }
      
      chrome.runtime.sendMessage({
        url: url,
        name: name,
        price: price,
        store: store,
        image: image
          // price: document.getElementById("priceView-customer-price")
        });
      }}, 10);
  });
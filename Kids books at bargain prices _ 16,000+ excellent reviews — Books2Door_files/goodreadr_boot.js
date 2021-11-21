// Copyright 2021 KlaudSol Apps. All rights reserved.

(function(){
  
  if(!document.addEventListener) {
    console.error("You are using an old browser. Goodreadr does not support this browser.");  
    return;
  }
  
  var docReady = function (fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
  };    
  
  var url = function(domain, method, params) {
    return "https://" + domain +  '/.netlify/functions/index/' + method + (params ? '?' + params : '');
  };

  
  docReady(function(event) { 
    
    console.log("Goodreadr v2.0 (Serverless) KlaudSol Apps");
    
    
    //get script source domain name
    //get last JS that matched. This assumes that the last one has been added the later.
    var scriptTags = document.getElementsByTagName("script");
    var i, matches, domain, shop;
    for(i = scriptTags.length - 1; i >= 0; i--) {
      if(matches = scriptTags[i].src.match(/https:\/\/([^\/]*)\/goodreadr_boot.js\?shop=(.*)/)) {
        domain = matches[1];  
        shop = matches[2];
        break;
      }
    }
    
    if(!window.onGoodreadrIframeError) {
      
      window.onGoodreadrIframeLoad = function(iframe) {
        if (window.fetch) {
          var verifyEndpoint = url(iframe.dataset.domain, 'widget/verify/' + iframe.dataset.isbn);
          window.fetch(verifyEndpoint).then(function(response) {
            if(!response.ok) {
              iframe.style.display = 'none';  
            }  
          });
        }
      };
      
    }
    
    console.log("Goodreadr v2.0 Script loading from host: https://" + domain);
    console.log("Goodreadr v2.0 Script loaded from Shopify https://" + shop);
    
    var aTags = document.getElementsByClassName("goodreadr");
    for(i = 0; i < aTags.length; i++) {
      var currentTag = aTags[i];
      var isbn = currentTag.dataset.isbn;
      currentTag.innerHTML = '<iframe width="110%" height="500" onload="window.onGoodreadrIframeLoad(this)" ' + 
        'src="' + url(domain, ('widget/' + isbn + '.html'), ('shop=' + shop)) + '" ' + 
        'data-domain="' + domain + '" ' + 
        'data-isbn="' + isbn + '" ' + 
        'frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    }
    
    console.log("Goodreadr v2.0 finished exectuting successfully.");
  
  });
  
})();
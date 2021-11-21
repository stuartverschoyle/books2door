window.crosssellTrackingURL = 'https://csell.co/tracking'
// TODO: create webpack project to build this script for different env: heroku-staging, cdn and local dev

// Replace crosssellTrackingURL with env specific
// window.crosssellTrackingURL = 'https://csell.co/tracking'

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

window.xsellStats = window.xsellStats || {};
window.xsellStats.version = '2.1.0';

window.xsellStats.track = function(){
  var shopdomain = Shopify.shop;
  var domain = window.location.hostname;
  var url = window.location.pathname; 
  var carttoken = document.cookie.replace(/(?:(?:^|.*;\s*)cart\s*\=\s*((?:[^;](?!;))*[^;]?).*)|.*/, "$1");
  var referringPage = sessionStorage.getItem('setpage') || getCookie('setpage');

  if(referringPage){
    var productclicked = url.substr(url.lastIndexOf("/") + 1);
    if (url.indexOf('/products/') == -1) { return; }
    
    if(window.xsellStats.trackingEnabled() && (referringPage != productclicked)){
      var data = '';
      data += 'shop=' + shopdomain + '&';
      data += 'productpage=' + referringPage + '&';
      data += 'crosssellproductclicked=' + productclicked + '&';
      data += 'carttoken=' + carttoken + '&';
      data += 'click_type=standard';

      var request = new XMLHttpRequest();
      request.open('POST', window.crosssellTrackingURL);
      request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          sessionStorage.removeItem('setpage');
          setCookie('setpage', '', -1);
        }
      };
      request.onerror = function() {};
      request.send(data);
    }
  }
}

window.xsellStats.trackV2 = function(product_handle_clicked, click_type){
  var shopdomain = Shopify.shop;
  var domain = window.location.hostname;
  var url = window.location.pathname; 
  var carttoken = document.cookie.replace(/(?:(?:^|.*;\s*)cart\s*\=\s*((?:[^;](?!;))*[^;]?).*)|.*/, "$1");
  var crosssellpage = url.substr(url.lastIndexOf("/") + 1);

  if(window.xsellStats.trackingEnabled() && (crosssellpage != product_handle_clicked)){
    var data = '';
    data += 'shop=' + shopdomain + '&';
    data += 'productpage=' + crosssellpage + '&';
    data += 'crosssellproductclicked=' + product_handle_clicked + '&';
    data += 'carttoken=' + carttoken + '&';
    data += 'click_type=' + click_type;

    var request = new XMLHttpRequest();
    request.open('POST', window.crosssellTrackingURL);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.onload = function() {};
    request.onerror = function() {};
    request.send(data);
  }
}

window.xsellStats.setCartToken = function(){
  var carttoken = document.cookie.replace(/(?:(?:^|.*;\s*)cart\s*\=\s*((?:[^;](?!;))*[^;]?).*)|.*/, "$1");
  var domain = window.location.hostname;
  if(!carttoken){
    if(window.xsellStats.trackingEnabled()){
      var request = new XMLHttpRequest();
      request.open('POST', '//' + domain + '/cart.js');
      request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      request.onload = function() {};
      request.onerror = function() {};
      request.send('cart=true'); // params can be anything, just using request to generate a cart token.
    }
  }
}

window.xsellStats.watchCrossSells = function(){
  var selectors = ['.cross-sell a', '.cross-sell input', '.cross-sell .cs_btn'];
  for (var i = 0; i < selectors.length; i++) {
    window.xsellStats.setListeners(selectors[i]);
  }
}

window.xsellStats.setListeners = function(selector){
  var xsells = document.querySelectorAll(selector);
  for (var i = 0; i < xsells.length; i++) {
    xsells[i].addEventListener('click', function(){
      window.xsellStats.setItem();
    });
  }
}

window.xsellStats.setItem = function(){
  var url = window.location.pathname;
  var referringpage = url.substr(url.lastIndexOf("/") + 1);

  sessionStorage.setItem('setpage', referringpage);
  setCookie('setpage', referringpage, 0.0005);
}

window.xsellStats.trackingEnabled = function(){
  // assume tracking is not optional: https://sureswift.atlassian.net/browse/DEV-4626
  if(window.xsellStats.alwayTrack()){
    return true
  }
 

  try{
    if (sessionStorage.getItem('cstr') == '1'){
      return true;
    }
  } catch(ign){}
  try{
    if (xsellSettings && xsellSettings.crosssellsettings[0] && xsellSettings.crosssellsettings[0]['cstr'] == 'on'){
      return true;
    }
  } catch(ign){}
  try{
    if (xsellSettings && xsellSettings.crosssellsettings[0] && xsellSettings.crosssellsettings[0]['cstr'] == true){
      return true;
    }
  } catch(ign){}
  try{
    if (crosssellsettings[0].cstr == 'on'){
      return true;
    }
  } catch(ign){}
  try{
    if (document.getElementById('cs_cstr').value == 'on' || document.getElementById('cs_cstr').value == 'true'){
      return true;
    }
  } catch(ign){}
  return false;
}

window.xsellStats.alwayTrack = function(){
  // assume tracking is not optional: https://sureswift.atlassian.net/browse/DEV-4626
  return true
}

if (window.xsellStats.trackingEnabled()){
  sessionStorage.setItem('cstr', '1'); 
}

setTimeout(function(){
  window.xsellStats.watchCrossSells();
}, 10000);

window.xsellStats.setCartToken();
window.xsellStats.track();
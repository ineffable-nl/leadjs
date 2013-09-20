if (typeof require==='undefined') {
  require = function(_module) {
    console.log('require', _module);
    // get some kind of XMLHttpRequest
    var xhrObj = createXMLHTTPObject();
    // open and send a synchronous request
    xhrObj.open('GET', _module+'.js', false);
    xhrObj.send('');
    // add the returned content to a newly created script tag
    var se = document.createElement('script');
    se.type = "text/javascript";
    se.text = xhrObj.responseText;
    document.getElementsByTagName('head')[0].appendChild(se);
  }
}

Browser
=======

    if not require?
      require = (_module) ->
        console.log('require', _module);

Get some kind of XMLHttpRequest

        xhrObj = createXMLHTTPObject();

Open and send a synchronous request

        xhrObj.open('GET', _module+'.js', false);
        xhrObj.send('');


Add the returned content to a newly created script tag

        se = document.createElement('script');
        se.type = "text/javascript";
        se.text = xhrObj.responseText;
        document.getElementsByTagName('head')[0].appendChild(se);

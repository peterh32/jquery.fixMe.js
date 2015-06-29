# jquery.fixMe.js
JQuery plugin to make element lock in place when it hits the top of the browser

## Approach
When you scroll the page to where the element hits the top of the browser, change
the element to position:fixed. To maintain document flow, replace the element with
an empty placeholder.

## Usage
`$('.my_element').fixMe();` 
or 
`$('.my_element').fixMe({yPad: 60});`
   
## Options
yPad: Number of pixels from the top of the page at which fixed behavior should kick in. Default is zero.

## Iframe Support
Can support a page inside an iframe using a window message sent from the top window, something like this:

   ```
   iframe = document.getElementById('#my_iframe');
   $(window).on("scroll", function() {
       var y = Math.round($(window).scrollTop() - $(iframe).offset().top);
       iframe.contentWindow.postMessage({'y': y}, '*');
   });
   ```

The postMessage should consist of the object {'y': some number of pixels }, and of course the initialization `$('.my_element').fixMe();` needs to run in the iframe, not the top window.

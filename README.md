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

js-scrolldepth
==============

A simple vanilla javascript plugin to track scroll depth. A lot of this was borrowed from @robflaherty. I needed a stripped-down version that didn't require jQuery as a dependency.

Tested on: Chrome, Firefox, Safari, IE7-11

To initialize: 

`<script>
var foo = ScrollDepth();
</script>`

Currently I'm logging (console.log):

* baseline - fired when plugin loads
* scrolled 25%
* scrolled 50%
* scrolled 75%
* scrolled 100%

You can drop-in any analytics code in place of the console.log.


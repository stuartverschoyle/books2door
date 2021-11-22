/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */
!function(s){"use strict";function e(s){return new RegExp("(^|\\s+)"+s+"(\\s+|$)")}var n,a,t;function c(s,e){var c;(n(s,e)?t:a)(s,e)}"classList"in document.documentElement?(n=function(s,e){return s.classList.contains(e)},a=function(s,e){s.classList.add(e)},t=function(s,e){s.classList.remove(e)}):(n=function(s,n){return e(n).test(s.className)},a=function(s,e){n(s,e)||(s.className=s.className+" "+e)},t=function(s,n){s.className=s.className.replace(e(n)," ")});var i={hasClass:n,addClass:a,removeClass:t,toggleClass:c,has:n,add:a,remove:t,toggle:c};"function"==typeof define&&define.amd?(define(i),s.classie=i):s.classie=i}(window);
//# sourceMappingURL=/s/files/1/0024/6874/1219/t/34/assets/classie.js.map?v=683035442066164312

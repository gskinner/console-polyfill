console-polyfill
================

Simple console polyfill for all console methods.

These console methods are assigned an empty function if they do not exist: **log, profile, profileEnd, timeStamp, trace**

These are aliased to console.log if they do not exist: **debug, info, warn, error, dir, dirxml**

These are defined with appropriate functionality if they do not exist (see below for more details): **group, groupCollapsed, groupEnd, time, timeEnd, assert, count, clear**

Note that some browsers may define console methods without fully implementing them (ex. console.group in FireFox 28).

testing
-------
If you would like to test the injected methods, you can set the "test" variable to true in console.js.

console_deploy
--------------

The included console\_deploy.js file assigns an empty function to all of the above methods. You can point to console.js during debug, and point your minifier to console\_deploy.js for deployment.

While this is an easy way to prevent console output from being exposed in your production deployment, it is preferable to completely strip console calls from deployment code.

clear
-----

If the browser does not support console.clear, it will be defined to log a visual break of six empty lines instead.

group, groupCollapsed, groupEnd
-------------------------------

If the browser does not support console.group, it will be defined with a method that provides output visually separated into groups. It does not indent child items in order to preserve specialized console formatting and improve performance.

time, timeEnd, count, assert
----------------------------

If the browser does not support these methods, they are defined with methods that provide the functionality as expected, including using high precision timing when available for time/timeEnd.
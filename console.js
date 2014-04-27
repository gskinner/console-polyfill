/*
* console polyfill
* http://github.com/gskinner/console-polyfill/
*
* Copyright ©2014 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/


(function (con) {
	"use strict";
	
	var groups = [], times={}, counts={}, f=function(){};
	var hr="-----"; hr+=hr; hr+=hr; hr+=hr; hr+=hr; // 80 char column
	var clear="\n\n\n\n\n\n"; // six empty lines
	
	// helper functions:
	var perf=window.performance, now=perf&&(perf.now || perf.mozNow || perf.msNow || perf.oNow || perf.webkitNow);
	function getTime() { return (now&&now.call(perf))||(new Date().getTime()); }
	
	// these all do nothing if they aren't defined:
	if (!con.log) { con.log = f; }
	if (!con.profile) { con.profile = f; }
	if (!con.profileEnd) { con.profileEnd = f; }
	if (!con.timeStamp) { con.timeStamp = f; }
	if (!con.trace) { con.trace = f; }
	
	// these all alias to console.log if they aren't defined:
	if (!con.debug) { con.debug = con.log; } // identical to console.log
	if (!con.info) { con.info = con.log; } // identical to console.log
	if (!con.warn) { con.warn = con.log; }
	if (!con.error) { con.error = con.log; }
	if (!con.dir) { con.dir = con.log; }
	if (!con.dirxml) { con.dirxml = con.dir; }
	
	// these mimic the appropriate behaviour if they aren't defined:
	var test=false; // set to true to test these methods in any browser
	if (test || !con.group) { con.group = function(label) {
		groups.push(label);
		con.log(hr+"\nBEGIN GROUP: "+label+"");
	};}
	if (test || !con.groupCollapsed) { con.groupCollapsed = con.group; }
	if (test || !con.groupEnd) { con.groupEnd = function() {
		con.log("END GROUP: "+groups.pop()+"\n"+hr);
	};}
	if (test || !con.time) { con.time = function(label) {
		times[label] = getTime();
	};}
	if (test || !con.timeEnd) { con.timeEnd = function(label) {
		con.log(label+": "+(getTime()-times[label]).toFixed(3)+"ms");
		delete(times[label]);
	};}
	if (test || !con.assert) { con.assert = function(expression, label) {
		if (!expression) { con.error("Assertion failed: "+label); }
	};}
	if (test || !con.count) { con.count = function(label) {
		if (!counts[label]) { counts[label] = 0; }
		counts[label]++;
		con.log(label+": "+counts[label]);
	};}
	if (test || !con.clear) { con.clear = function() {
		con.log(clear);
	};}
	
})(window.console = window.console || {});
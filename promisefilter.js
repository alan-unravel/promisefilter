(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.promisefilter = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var operative = (typeof window !== "undefined" ? window['operative'] : typeof global !== "undefined" ? global['operative'] : null);

var cfUrl = '/base/node_modules/crossfilter2/crossfilter.js';

// URL.createObjectURL
// window.URL = window.URL || window.webkitURL;

// var blob;
// try {
// 	blob = new Blob([function() {}.toString()], {type: 'application/javascript'});
// } catch (e) { // Backwards-compatibility
//     window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
//     blob = new BlobBuilder();
//     blob.append(function() {}.toString());
//     blob = blob.getBlob();
// }
// var cfUrl = URL.createObjectURL(blob);

var opfilter = operative({
	"unpack": function unpackFunction(func, context) {
		var internal, evalStr = "";
		if(context) {
			evalStr += context;
		}
		evalStr += "internal = " + func;
		eval(evalStr);
		return internal;
	},
	"crossfilters": {},
	"crossfilterIndex": 0,
	"dimensions": {},
	"dimensionIndex": 0,
	"groupAlls": {},
	"groupAllIndex": 0,
	"dimensionGroupAlls": {},
	"dimensionGroupAllIndex": 0,
	"dimensionGroups": {},
	"dimensionGroupIndex": 0,
	"new": function(data) {
		if(data) {
			this.crossfilters[this.crossfilterIndex] = crossfilter(data);	
		} else {
			this.crossfilters[this.crossfilterIndex] = crossfilter([]);
		}
		var oldIndex = this.crossfilterIndex;
		this.crossfilterIndex++;
		this.deferred().fulfill(oldIndex);
	},
	"dimension": function(index, accessor) {
		var promise = this.deferred();
    try{
		  this.dimensions[this.dimensionIndex] = this.crossfilters[index].dimension(this.unpack(accessor));
		  var oldIndex = this.dimensionIndex;
		  this.dimensionIndex++;
		  promise.fulfill(oldIndex);
    } catch(e){
      promise.reject(e.message);
    }
	},
	"dimension.dispose": function(index) {
    var promise = this.deferred();
    try{
		  this.dimensions[index].dispose();
		  promise.fulfill();
    } catch(e){
      promise.reject(e.message);
    }
	},
	"dimension.groupAll": function(index) {
    var promise = this.deferred();
    try{
		  this.dimensionGroupAlls[this.dimensionGroupAllIndex] = this.dimensions[index].groupAll();
		  var oldIndex = this.dimensionGroupAllIndex;
		  this.dimensionGroupAllIndex++;
		  promise.fulfill(oldIndex);
    } catch(e){
      promise.reject(e.message);
    }
	},
	"dimension.groupAll.value": function(index) {
    var promise = this.deferred();
    try{
		  var value = this.dimensionGroupAlls[index].value();
		  promise.fulfill(value);
    } catch(e){
      promise.reject(e.message);
    }
	},
	"dimension.groupAll.reduceSum": function(index, accessor) {
    var promise = this.deferred();
    try{
		  this.dimensionGroupAlls[index].reduceSum(this.unpack(accessor));
		  promise.fulfill();
    } catch(e){
      promise.reject(e.message);
    }
	},
	"dimension.groupAll.reduceCount": function(index) {
    var promise = this.deferred();
    try{
		  this.dimensionGroupAlls[index].reduceCount();
		  promise.fulfill();
    } catch(e){
      promise.reject(e.message);
    }
	},
	"dimension.groupAll.reduce": function(index, add, remove,initial) {
    var promise = this.deferred();
    try{
		  this.dimensionGroupAlls[index].reduce(this.unpack(add), this.unpack(remove), this.unpack(initial));
		  promise.fulfill();
    } catch(e){
      promise.reject(e.message);
    }
	},
	"dimension.groupAll.dispose": function(index) {
    var promise = this.deferred();
    try{
		  this.dimensionGroupAlls[index].dispose();
		  promise.fulfill();
    } catch(e){
      promise.reject(e.message);
    }
	},
	"dimension.filterRange": function(index, range) {
    var promise = this.deferred();
    try{
		  this.dimensions[index].filterRange(range);
		  promise.fulfill();
    } catch(e){
      promise.reject(e.message);
    }
	},
	"dimension.filterExact": function(index, value) {
    var promise = this.deferred();
    try{
		  this.dimensions[index].filterExact(value);
		  promise.fulfill();
    } catch(e){
      promise.reject(e.message);
    }
	},
	"dimension.filterFunction": function(index, func) {
    var promise = this.deferred();
    try{
		  this.dimensions[index].filterFunction(this.unpack(func));
		  promise.fulfill();
    } catch(e){
      promise.reject(e.message);
    }
	},
	"dimension.filterAll": function(index) {
    var promise = this.deferred();
    try{
		  this.dimensions[index].filterAll();
		  promise.fulfill();
    } catch(e){
      promise.reject(e.message);
    }
	},
	"dimension.filter": function(index, value) {
    var promise = this.deferred();
    try{
		  this.dimensions[index].filter(value);
		  promise.fulfill();
    } catch(e){
      promise.reject(e.message);
    }
	},
	"dimension.top": function(index, value) {
    var promise = this.deferred();
    try{
		  var top = this.dimensions[index].top(value);
		  promise.fulfill(top);
    } catch(e){
      promise.reject(e.message);
    }
	},
	"dimension.bottom": function(index, value) {
    var promise = this.deferred();
    try{
		  var bottom = this.dimensions[index].bottom(value);
		  promise.fulfill(bottom);
    } catch(e){
      promise.reject(e.message);
    }
	},
	"dimension.group": function(index, accessor) {
    var promise = this.deferred();
    try{
		  this.dimensionGroups[this.dimensionGroupIndex] = this.dimensions[index].group(this.unpack(accessor));
		  var oldIndex = this.dimensionGroupIndex;
		  this.dimensionGroupIndex++;
		  promise.fulfill(oldIndex);
    } catch(e){
      promise.reject(e.message);
    }
	},
	"dimension.group.top": function(index, value) {
    var promise = this.deferred();
    try{
		  var top = this.dimensionGroups[index].top(value);
		  promise.fulfill(top);
    } catch(e){
      promise.reject(e.message);
    }
	},
	"dimension.group.all": function(index) {
    var promise = this.deferred();
    try{
		  var all = this.dimensionGroups[index].all();
		  promise.fulfill(all);
    } catch(e){
      promise.reject(e.message);
    }
	},
	"dimension.group.size": function(index) {
    var promise = this.deferred();
    try{
		  var size = this.dimensionGroups[index].size();
		  promise.fulfill(size);	
    } catch(e){
      promise.reject(e.message);
    }
	},
	"dimension.group.reduce": function(index, add, remove,initial) {
    var promise = this.deferred();
    try{
		  this.dimensionGroups[index].reduce(this.unpack(add), this.unpack(remove), this.unpack(initial));
		  promise.fulfill();
    } catch(e){
      promise.reject(e.message);
    }
	},
	"dimension.group.order": function(index, accessor) {
    var promise = this.deferred();
    try{
		  this.dimensionGroups[index].order(this.unpack(accessor));
		  problem.fulfill();
    } catch(e){
      promise.reject(e.message);
    }
	},
	"dimension.group.orderNatural": function(index) {
    var promise = this.deferred();
    try{
		  this.dimensionGroups[index].orderNatural();
		  promise.fulfill();
    } catch(e){
      promise.reject(e.message);
    }
	},
	"dimension.group.reduceSum": function(index, accessor) {
    var promise = this.deferred();
    try{
		  this.dimensionGroups[index].reduceSum(this.unpack(accessor));
		  promise.fulfill();
    } catch(e){
      promise.fulfill(e.message);
    }
	},
	"dimension.group.reduceCount": function(index) {
    var promise = this.deferred();
    try{
		  this.dimensionGroups[index].reduceCount();
		  promise.fulfill();
    } catch(e){
      promise.reject(e.message);
    }
	},
	"dimension.group.dispose": function(index) {
    var promise = this.deferred();
    try{
		  this.dimensionGroups[index].dispose();
		  promise.fulfill();
    } catch(e){
      promise.reject(e.message);
    }
	},
	"groupAll": function(index) {
		var promise = this.deferred();
    try{
		  this.groupAlls[this.groupAllIndex] = this.crossfilters[index].groupAll();
		  var oldIndex = this.groupAllIndex;
		  this.groupAllIndex++;
		  promise.fulfill(oldIndex);
    } catch(e){
      promise.reject(e.message);
    }
	},
	"groupAll.value": function(index) {
    var promise = this.deferred();
    try{
		  var value = this.groupAlls[index].value();
		  promise.fulfill(value);
    } catch(e){
      promise.reject(e.message);
    }
	},
	"groupAll.reduceSum": function(index, accessor) {
    var promise = this.deferred();
    try{
		  this.groupAlls[index].reduceSum(this.unpack(accessor));
		  promise.fulfill();
    } catch(e){
      promise.reject(e.message);
    }
	},
	"groupAll.reduceCount": function(index) {
    var promise = this.deferred();
    try{
		  this.groupAlls[index].reduceCount();
		  promise.fulfill();
    } catch(e){
      promise.reject(e.message);
    }
	},
	"groupAll.reduce": function(index, add, remove,initial) {
    var promise = this.deferred();
    try{
		  this.groupAlls[index].reduce(this.unpack(add), this.unpack(remove), this.unpack(initial));
		  promise.fulfill();
    } catch(e){
      promise.reject(e.message);
    }
	},
	"groupAll.dispose": function(index) {
    var promise = this.deferred();
    try{
		  this.groupAlls[index].dispose();
		  promise.fulfill();
    } catch(e){
      promise.reject(e.message);
    }
	},
	"add": function(index, data) {
    var promise = this.deferred();
    try{
		  this.crossfilters[index].add(data);
		  promise.fulfill();
    } catch(e){
      promise.reject(e.message);
    }
	},
	"size": function(index) {
    var promise = this.deferred();
    try{
		  var size = this.crossfilters[index].size();
		  promise.fulfill(size);
    } catch(e){
      promise.reject(e.message);
    }
	},
	"all": function(index) {
    var promise = this.deferred();
    try{
		  var all = this.crossfilters[index].all();
		  promise.fulfill(all);
    } catch(e){
      promise.reject(e.message);
    }
	},
	"remove": function(index) {
    var promise = this.deferred();
    try{
		  this.crossfilters[index].remove();
		  promise.fulfill();
    } catch(e){
      promise.reject(e.message);
    }
	}
}, [cfUrl]);

var readSynchronizer = Promise.resolve();
var updateSynchronizer = Promise.resolve();

var cfFacade = function(data) {
	var cfIndex = opfilter.new(data);
	return {
		dimension: function(accessor) {
			var dimIndex = cfIndex.then(function(idx) { return opfilter["dimension"](idx, accessor.toString()); });
			return {
				dispose: function() {
					var p = Promise.all([dimIndex, readSynchronizer, updateSynchronizer]).then(function(idx) { return opfilter["dimension.dispose"](idx[0]); });
					updateSynchronizer = Promise.all([updateSynchronizer, p]);
					return p;
				},
				groupAll: function() {
					var dimGaIndex = dimIndex.then(function(idx) { return opfilter["dimension.groupAll"](idx); });
					return {
						value: function() {
							var p = Promise.all([dimGaIndex, readSynchronizer, updateSynchronizer]).then(function(idx) { return opfilter["dimension.groupAll.value"](idx[0]); });
							readSynchronizer = Promise.all([readSynchronizer, p]);
							return p;
						},
						reduceSum: function(accessor) {
							var p = Promise.all([dimGaIndex, readSynchronizer, updateSynchronizer]).then(function(idx) { return opfilter["dimension.groupAll.reduceSum"](idx[0], accessor.toString()); });
							updateSynchronizer = Promise.all([updateSynchronizer, p]);
							return this;
						},
						reduceCount: function() {
							var p = Promise.all([dimGaIndex, readSynchronizer, updateSynchronizer]).then(function(idx) { return opfilter["dimension.groupAll.reduceCount"](idx[0]); });
							updateSynchronizer = Promise.all([updateSynchronizer, p]);
							return this;
						},
						reduce: function(add, remove, initial) {
							var p = Promise.all([dimGaIndex, readSynchronizer, updateSynchronizer]).then(function(idx) { return opfilter["dimension.groupAll.reduce"](idx[0], add.toString(), remove.toString(), initial.toString()); });
							updateSynchronizer = Promise.all([updateSynchronizer, p]);
							return this;
						},
						dispose: function() {
							var p = Promise.all([dimGaIndex, readSynchronizer, updateSynchronizer]).then(function(idx) { return opfilter["dimension.groupAll.dispose"](idx[0]); });
							updateSynchronizer = Promise.all([updateSynchronizer, p]);
							return p;
						}
					}
				},
				group: function(accessor) {
					var dimGroupIndex = dimIndex.then(function(idx) { return opfilter["dimension.group"](idx, accessor ? accessor.toString() : (function(d) { return d; }).toString() ); });
					return {
						top: function(value) {
							var p = Promise.all([dimGroupIndex, readSynchronizer, updateSynchronizer]).then(function(idx) { return opfilter["dimension.group.top"](idx[0], value); });
							readSynchronizer = Promise.all([readSynchronizer, p]);
							return p;
						},
						all: function() {
							var p = Promise.all([dimGroupIndex, readSynchronizer, updateSynchronizer]).then(function(idx) { return opfilter["dimension.group.all"](idx[0]); });
							readSynchronizer = Promise.all([readSynchronizer, p]);
							return p;
						},
						size: function() {
							return dimGroupIndex.then(function(idx) { return opfilter["dimension.group.size"](idx); });
						},
						reduceSum: function(accessor) {
							var p = Promise.all([dimGroupIndex, readSynchronizer, updateSynchronizer]).then(function(idx) { return opfilter["dimension.group.reduceSum"](idx[0], accessor.toString()); });
              var resolver = p.catch(function(d){
                return false;
              }).then(function(d){
                return d;
              });
							updateSynchronizer = Promise.all([updateSynchronizer, resolver]);
							return this;
						},
						reduceCount: function() {
							var p = Promise.all([dimGroupIndex, readSynchronizer, updateSynchronizer]).then(function(idx) { return opfilter["dimension.group.reduceCount"](idx[0]); });
							updateSynchronizer = Promise.all([updateSynchronizer, p]);
							return this;
						},
						reduce: function(add, remove, initial) {
							var p = Promise.all([dimGroupIndex, readSynchronizer, updateSynchronizer]).then(function(idx) { return opfilter["dimension.group.reduce"](idx[0], add.toString(), remove.toString(), initial.toString()); });
							updateSynchronizer = Promise.all([updateSynchronizer, p]);
							return this;
						},
						order: function(accessor) {
							var p = Promise.all([dimGroupIndex, readSynchronizer, updateSynchronizer]).then(function(idx) { return opfilter["dimension.group.order"](idx[0], accessor.toString()); });
							updateSynchronizer = Promise.all([updateSynchronizer, p]);
							return this;
						},
						orderNatural: function() {
							var p = Promise.all([dimGroupIndex, readSynchronizer, updateSynchronizer]).then(function(idx) { return opfilter["dimension.group.orderNatural"](idx[0]); });
							updateSynchronizer = Promise.all([updateSynchronizer, p]);
							return this;
						},
						dispose: function() {
							var p = Promise.all([dimGroupIndex, readSynchronizer, updateSynchronizer]).then(function(idx) { return opfilter["dimension.group.dispose"](idx[0]); });
							updateSynchronizer = Promise.all([updateSynchronizer, p]);
							return p;
						}
					};
				},
				filterRange: function(range) {
					var p = Promise.all([dimIndex, readSynchronizer, updateSynchronizer]).then(function(idx) { return opfilter["dimension.filterRange"](idx[0], range); });
					updateSynchronizer = Promise.all([updateSynchronizer, p]);
					return p;
				},
				filterExact: function(value) {
					var p = Promise.all([dimIndex, readSynchronizer, updateSynchronizer]).then(function(idx) { return opfilter["dimension.filterExact"](idx[0], value); });
					updateSynchronizer = Promise.all([updateSynchronizer, p]);
					return p;
				},
				filterFunction: function(func) {
					var p = Promise.all([dimIndex, readSynchronizer, updateSynchronizer]).then(function(idx) { return opfilter["dimension.filterFunction"](idx[0], func.toString()); });
					updateSynchronizer = Promise.all([updateSynchronizer, p]);
					return p;
				},
				filterAll: function() {
					var p = Promise.all([dimIndex, readSynchronizer, updateSynchronizer]).then(function(idx) { return opfilter["dimension.filterAll"](idx[0]); });
					updateSynchronizer = Promise.all([updateSynchronizer, p]);
					return p;
				},
				filter: function(value) {
					var p = Promise.all([dimIndex, readSynchronizer, updateSynchronizer]).then(function(idx) { return opfilter["dimension.filter"](idx[0], value); });
					updateSynchronizer = Promise.all([updateSynchronizer, p]);
					return p;
				},
				top: function(value) {
					var p = Promise.all([dimIndex, readSynchronizer, updateSynchronizer]).then(function(idx) { return opfilter["dimension.top"](idx[0], value); });
					readSynchronizer = Promise.all([readSynchronizer, p]);
					return p;
				},
				bottom: function(value) {
					var p = Promise.all([dimIndex, readSynchronizer, updateSynchronizer]).then(function(idx) { return opfilter["dimension.bottom"](idx[0], value); });
					readSynchronizer = Promise.all([readSynchronizer, p]);
					return p;
				}
			}	
		},
		groupAll: function() {
			var gaIndex = cfIndex.then(function(idx) { return opfilter.groupAll(idx); });
			
			return {
				value: function() {
					var p = Promise.all([gaIndex, readSynchronizer, updateSynchronizer]).then(function(idx) { return opfilter["groupAll.value"](idx[0]); });
					readSynchronizer = Promise.all([readSynchronizer, p]);
					return p;
				},
				reduceSum: function(accessor) {
					var p = Promise.all([gaIndex, readSynchronizer, updateSynchronizer]).then(function(idx) { opfilter["groupAll.reduceSum"](idx[0], accessor.toString()); });
					updateSynchronizer = Promise.all([updateSynchronizer, p]);
					return this;
				},
				reduceCount: function() {
					var p = Promise.all([gaIndex, readSynchronizer, updateSynchronizer]).then(function(idx) { opfilter["groupAll.reduceCount"](idx[0]); });
					updateSynchronizer = Promise.all([updateSynchronizer, p]);
					return this;
				},
				reduce: function(add, remove, initial) {
					var p = Promise.all([gaIndex, readSynchronizer, updateSynchronizer]).then(function(idx) { opfilter["groupAll.reduce"](idx[0], add.toString(), remove.toString(), initial.toString()) });;
					updateSynchronizer = Promise.all([updateSynchronizer, p]);
					return this;
				},
				dispose: function() {
					var p = Promise.all([gaIndex, readSynchronizer, updateSynchronizer]).then(function(idx) { return opfilter["groupAll.dispose"](idx[0]); });
					updateSynchronizer = Promise.all([updateSynchronizer, p]);
					return p;
				}
			}
		},
		remove: function() {
			var p = Promise.all([cfIndex, readSynchronizer, updateSynchronizer]).then(function(idx) { return opfilter.remove(idx[0]); });
			updateSynchronizer = Promise.all([updateSynchronizer, p]);
			return this;
		},
		add: function(data) {
			var p = Promise.all([cfIndex, readSynchronizer, updateSynchronizer]).then(function(idx) { return opfilter.add(idx[0], data); });
			updateSynchronizer = Promise.all([updateSynchronizer, p]);
			return this;
		},
		size: function() {
			var p = Promise.all([cfIndex, readSynchronizer, updateSynchronizer]).then(function(idx) { return opfilter["size"](idx[0]); });
			readSynchronizer = Promise.all([readSynchronizer, p]);
			return p;
		},
		all: function() {
			return cfIndex.then(function(idx) { return opfilter.all(idx); });
		}
	};
}

// var testing = operative({
// 	test: function() {
// 		this.deferred().fulfill("TESTING TESTING - THIS IS A RESULT");
// 	}
// })
// alert("TESTING TESTING 123");
// testing.test().then(function(d) { alert(d); })

module.exports = cfFacade;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});
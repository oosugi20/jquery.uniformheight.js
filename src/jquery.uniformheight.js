;(function ($, window, undefiend) {
'use script';

var MODULE_NAME = 'UniformHeight';
var PLUGIN_NAME = 'uniformheight';
var Module;


/**
 * Module
 */
Module = function (element, options) {
	this.el = element;
	this.$el = $(element);
	this.options = $.extend({
		item_selector: '.js-uniformheight-item', // required
		col: 'auto', // {Nuber} required
		organizeResize: false
	}, options);
};

(function (fn) {
	/**
	 * init
	 */
	fn.init = function () {
		this.$item = this.$el.find(this.options.item_selector);
		this._setCol();

		this._row = Math.ceil(this.$item.length / this._col);
		this._createRows();

		this.setEachHeight();
	};

	/**
	 * setEachHeight
	 */
	fn.setEachHeight = function () {
		$.each(this._rows, function (index, row) {
			var max_height = 0;
			$.each(row, function (i, item) {
				max_height = Math.max(max_height, $(item).height());
			});
			$(row).height(max_height);
		});
	};

	/**
	 * _createRows
	 */
	fn._createRows = function () {
		var i, l;
		var rows = [];
		for (i = 0, l = this._row; i < l; i += 1) {
			rows.push(this.$item.slice(i * this._col, (i + 1) * this._col));
		}
		this._rows = rows;
	};

	/**
	 * _setCol
	 */
	fn._setCol = function () {
		var opt_col = this.options.col;
		// [todo]
		//if (opt_col === 'auto') {
		//	this._col = this.$list.innerWidth() / this.$item.outerWidth();
		//}
		this._col = opt_col;
	};

})(Module.prototype);


// set jquery.fn
$.fn[PLUGIN_NAME] = function (options) {
	return this.each(function () {
		var module;
		if (!$.data(this, PLUGIN_NAME)) {
			module = new Module(this, options);
			$.data(this, PLUGIN_NAME, module);
			module.init();
		}
	});
};

// set global
$[MODULE_NAME] = Module;

})(jQuery, this);

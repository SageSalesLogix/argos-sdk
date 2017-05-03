/* start-amd-strip-block */
(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function($) {
/* end-amd-strip-block */

  $.fn.autocomplete = function(options) {
    'use strict';

    // Settings and Options
    var pluginName = 'autocomplete',
      defaults = {
        source: [], //Defines the data to use, must be specified.
        sourceArguments: {}, // If a source method is defined, this flexible object can be passed into the source method, and augmented with parameters specific to the implementation.
        template: undefined, // If defined, use this to draw the contents of each search result instead of the default draw routine.
        filterMode: 'startsWith',  // startsWith and contains Supported - false will not client side filter
        delay: 300, // delay is the delay between key strokes on the keypad before it thinks you stopped typing
        width: null, //width of the auto complete menu
        offset: null, //left or top offset
        autoSelectFirstItem: false // if true will cause the first item in the list to be selected
      },
      settings = $.extend({}, defaults, options);

    /**
     * @constructor
     * @param {Object} element
     */
    function Autocomplete(element) {
      this.settings = $.extend({}, settings);
      this.element = $(element);
      Soho.logTimeStart(pluginName);
      this.init();
      Soho.logTimeEnd(pluginName);
    }

    // Default Autocomplete Result Item Template
    var resultTemplate = '<li id="{{listItemId}}" data-index="{{index}}" {{#hasValue}}data-value="{{value}}"{{/hasValue}} role="listitem">' + '\n\n' +
      '<a href="#" tabindex="-1">' + '\n\n' +
        '<span>{{{label}}}</span>' + '\n\n' +
      '</a>' + '\n\n' +
    '</li>';

    // Plugin Object
    Autocomplete.prototype = {

      init: function() {
        // data-autocomplete can be a url, 'source' or an array
        var data = this.element.attr('data-autocomplete');
        if (data && data !== 'source') {
          this.settings.source = data;
        }

        this.addMarkup();
        this.handleEvents();
      },

      addMarkup: function () {
        this.element.addClass('autocomplete').attr({
          'role': 'combobox',
          'autocomplete': 'off'
        });
      },

      isLoading: function() {
        return this.element.hasClass('is-loading') && this.element.hasClass('is-blocked');
      },

      openList: function (term, items) {
        if (this.element.is('[disabled], [readonly]') || this.isLoading()) {
          return;
        }

        var self = this,
          matchingOptions = [];

        term = term.toLowerCase();

        //append the list
        this.list = $('#autocomplete-list');
        if (this.list.length === 0) {
          this.list = $('<ul id="autocomplete-list" aria-expanded="true"></ul>').appendTo('body');
        }

        this.list[0].style.height = 'auto';
        this.list[0].style.width = this.element.outerWidth() + 'px';
        this.list.addClass('autocomplete');
        this.list.empty();

        if (this.settings.width) {
          this.list[0].style.width = this.settings.width + (/(px|%)/i.test(this.settings.width + '') ? '' : 'px');
        }

        // Pre-compile template.
        // Try to get an element first, and use its contents.
        // If the string provided isn't a selector, attempt to use it as a string, or fall back to the default template.
        var templateAttr = $(this.element.attr('data-tmpl'));
        this.tmpl = $(templateAttr).length ? $(templateAttr).text() :
          typeof templateAttr === 'string' ? templateAttr :
          $(this.settings.template).length ? $(this.settings.template).text() :
          typeof this.settings.template === 'string' ? this.settings.template :
          resultTemplate;

        for (var i = 0; i < items.length; i++) {
          var isString = typeof items[i] === 'string',
            option = (isString ? items[i] : items[i].label),
            baseData = {
              label: option
            },
            dataset = isString ? baseData : $.extend(baseData, items[i]),
            parts = option.split(' '),
            containsTerm = !this.settings.filterMode ? true : false;

          if (this.settings.filterMode === 'startsWith') {
              for (var a = 0; a < parts.length; a++) {
                if (parts[a].toLowerCase().indexOf(term) === 0) {
                  containsTerm = true;
                }
              }

              //Direct Match
              if (option.toLowerCase().indexOf(term) === 0) {
                containsTerm = true;
              }

              if (term.indexOf(' ') > 0 && option.toLowerCase().indexOf(term) > 0) {
                //Partial dual word match
                containsTerm = true;
              }

          }

          if (this.settings.filterMode === 'contains') {
            if (option.toLowerCase().indexOf(term) >= 0) {
              containsTerm = true;
            }
          }

          if (containsTerm) {
            matchingOptions.push(option);

            // Build the dataset that will be submitted to the template
            dataset.listItemId = 'ac-list-option' + i;
            dataset.index = i;

            if (this.settings.filterMode === 'contains') {
              dataset.label = dataset.label.replace(new RegExp('(' + term + ')', 'ig'), '<i>$1</i>');
            } else {
              dataset.label = option.toLowerCase().indexOf(term)===0 ? '<i>' + option.substr(0,term.length) + '</i>' + option.substr(term.length) : option;

              var pos = option.toLowerCase().indexOf(term);
              if (pos > 0) {
                dataset.label = option.substr(0, pos) + '<i>' + option.substr(pos, term.length) + '</i>' + option.substr(term.length + pos);
              }
            }

            dataset.hasValue = !isString && items[i].value !== undefined;

            if (dataset.hasValue) {
              dataset.value = items[i].value;
            }

            if (typeof Tmpl !== 'undefined') {
              var compiledTmpl = Tmpl.compile(this.tmpl),
                renderedTmpl = compiledTmpl.render(dataset);

              self.list.append($.sanitizeHTML(renderedTmpl));
            } else {
              var listItem = $('<li role="listitem"></li>');
              listItem.attr('id', dataset.listItemId);
              listItem.attr('data-index', dataset.index);
              listItem.attr('data-value', dataset.value);
              listItem.append('<a href="#" tabindex="-1"><span>' + dataset.label + '</span></a>');
              self.list.append($.sanitizeHTML(listItem));
            }
          }
        }

        function autocompletePlaceCallback(placementObj) {
          // Nudge the autocomplete to the right by 1px in Chrome
          if (Soho.env.browser.name === 'chrome') {
            placementObj.setCoordinate('x', placementObj.x + 1);
          }
          return placementObj;
        }

        var popupOpts = {
          menuId: 'autocomplete-list',
          ariaListbox: true,
          mouseFocus: false,
          trigger: 'immediate',
          autoFocus: false,
          placementOpts: {
            callback: autocompletePlaceCallback,
            parent: this.element
          }
        };

        this.element.addClass('is-open')
          .popupmenu(popupOpts)
          .on('close.autocomplete', function () {
            self.list.parent('.popupmenu-wrapper').remove();
            self.element.removeClass('is-open');
          });

        // Optionally select the first item in the list
        if (self.settings.autoSelectFirstItem) {
          self.list.children().filter(':not(.separator):not(.hidden):not(.heading):not(.group):not(.is-disabled)').first()
            .addClass('is-selected');
        }

        this.noSelect = true;
        this.element.trigger('populated', [matchingOptions]).focus();

        // Overrides the 'click' listener attached by the Popupmenu plugin
        self.list.off('click touchend')
          .on('touchend.autocomplete click.autocomplete', 'a', function(e) {
            self.select(e, items);
          });

        // Highlight anchors on focus
        var all = self.list.find('a').on('focus.autocomplete touchend.autocomplete', function () {
          self.highlight($(this), all);
        });

        if (this.settings.offset) {
          var domListParent = this.list.parent()[0];

          if (this.settings.offset.left) {
            domListParent.style.left = parseInt(domListParent.style.left, 10) + this.settings.offset.left + 'px';
          }
          if (this.settings.offset.top) {
            domListParent.style.top = parseInt(domListParent.style.top, 10) + this.settings.offset.top + 'px';
          }
        }

        // As chars are typed into the edit field, nothing was announced to indicate
        // that a value has been suggested, for the non-sighted user an offscreen span
        // added and will remove soon popup close that includes aria-live="polite"
        // which have the first suggested item automatically announced when it
        // appears without moving focus.
        self.list.parent('.popupmenu-wrapper').append(''+
          '<span id="ac-is-arialive" aria-live="polite" class="audible">'+
            $.trim(this.list.find('>li:first-child').text()) +
          '</span>');

        this.noSelect = true;
        this.element.trigger('listopen', [items]);
      },

      closeList: function() {
        var popup = this.element.data('popupmenu');
        if (!popup) {
          return;
        }

        popup.close();
      },

      listIsOpen: function() {
        return this.list && this.list.is(':visible');
      },

      handleEvents: function () {
        //similar code as dropdown but close enough to be dry
        var self = this;

        this.element.off('updated.autocomplete').on('updated.autocomplete', function() {
          self.updated();
        }).off('keydown.autocomplete').on('keydown.autocomplete', function(e) {
          self.handleAutocompleteKeydown(e);
        }).off('input.autocomplete').on('input.autocomplete', function (e) {
          self.handleAutocompleteInput(e);
        }).off('focus.autocomplete').on('focus.autocomplete', function () {
          self.handleAutocompleteFocus();
        });
      },

      // Handles the Autocomplete's "keydown" event
      handleAutocompleteKeydown: function(e) {
        var self = this,
          selected;

        function getSelected() {
          return self.list.find('.is-selected');
        }

        if (self.isLoading()) {
          e.preventDefault();
          return false;
        }

        var excludes = 'li:not(.separator):not(.hidden):not(.heading):not(.group):not(.is-disabled)';

        //Down - select next
        if (e.keyCode === 40 && this.listIsOpen()) {
          selected = getSelected();
          if (selected.length) {
            self.noSelect = true;
            selected.removeClass('is-selected is-focused');
            selected.next(excludes).addClass('is-selected').find('a').focus();
            e.preventDefault();
            e.stopPropagation();
          }
        }

        //Up select prev
        if (e.keyCode === 38 && this.listIsOpen()) {
          selected = getSelected();
          if (selected.length) {
            self.noSelect = true;
            selected.removeClass('is-selected is-focused');
            selected.prev(excludes).addClass('is-selected').find('a').focus();
            e.preventDefault();
            e.stopPropagation();
          }
        }

        //Enter/Tab - apply selected item
        if ((e.keyCode === 9 || e.keyCode === 13) && this.listIsOpen()) {
          selected = getSelected();

          //Apply selection if an item is selected, otherwise close list and allow default tab/enter behavior to happen
          if (selected.length) {
            e.stopPropagation();
            e.preventDefault();
            self.noSelect = true;
            self.select(selected, this.currentDataSet);
          } else {
            self.closeList();
          }
        }

        if (e.keyCode === 8 && this.listIsOpen()) {
          self.element.trigger('input');
        }
      },

      // Handles the Autocomplete's "input" event
      handleAutocompleteInput: function(e) {
        var self = this;

        if (self.isLoading()) {
          e.preventDefault();
          return false;
        }

        // Makes a new AJAX call every time a key is pressed.
        var waitForSource = this.getDataFromSource();
        waitForSource.done(function doneHandler(term, response) {
          self.currentDataSet = response;
          self.openList(term, response);
        });
      },

      getDataFromSource: function() {
        var self = this;

        // Don't attempt to load if we're already loading.
        if (self.isLoading()) {
          return false;
        }

        var field = this.element,
          dfd = $.Deferred(),
          buffer;

        clearTimeout(this.loadingTimeout);

        function done(searchTerm, response, deferredStatus) {
          self.element.triggerHandler('complete'); // For Busy Indicator
          self.element.trigger('requestend', [searchTerm, response]);

          if (deferredStatus === false) {
            return dfd.reject(searchTerm);
          }
          return dfd.resolve(searchTerm, response);
        }

        this.loadingTimeout = setTimeout(function () {
          if (self.isLoading()) {
            return;
          }

          buffer = field.val();
          if (buffer === '') {
            if (self.element.data('popupmenu')) {
              self.element.data('popupmenu').close();
            }
            return;
          }
          buffer = buffer;

          var sourceType = typeof self.settings.source;
          self.element.triggerHandler('start'); // For Busy Indicator
          self.element.trigger('requeststart', [buffer]);

          if (sourceType === 'function') {
            // Call the 'source' setting as a function with the done callback.
            self.settings.source(buffer, done, self.settings.sourceArguments);
          } else if (sourceType === 'object') {
            // Use the 'source' setting as pre-existing data.
            // Sanitize accordingly.
            var sourceData = $.isArray(self.settings.source) ? self.settings.source : [self.settings.source];
            done(buffer, sourceData, true);
          } else if (!self.settings.source) {
            dfd.reject(buffer);
            return;
          } else {

            // Attempt to resolve source as a URL string.  Do an AJAX get with the URL
            var sourceURL = self.settings.source.toString(),
              request = $.getJSON(sourceURL + buffer);

            request.done(function(data) {
              done(buffer, data, true);
            }).fail(function() {
              done(buffer, [], false);
            });
          }

        }, self.settings.delay);

        return dfd;
      },

      // Handles the Autocomplete's "focus" event
      handleAutocompleteFocus: function() {
        var self = this;
        if (this.noSelect) {
          this.noSelect = false;
          return;
        }

        //select all
        setTimeout(function () {
          self.element.select();
        }, 10);
      },

      highlight: function(anchor, allAnchors) {
        var text = anchor.text().trim();

        if (anchor.find('.display-value').length > 0) {
          text = anchor.find('.display-value').text().trim();
        }

        if (allAnchors && allAnchors.length) {
          allAnchors.parent('li').removeClass('is-selected');
        }
        anchor.parent('li').addClass('is-selected');

        this.noSelect = true;
        this.element.val(text).focus();
      },

      select: function(anchorOrEvent, items) {
        var a, li, ret, dataIndex, dataValue,
          isEvent = false;

        // Initial Values
        if (anchorOrEvent instanceof $.Event) {
          isEvent = true;
          a = $(anchorOrEvent.currentTarget);
        } else {
          a = anchorOrEvent;
        }

        if (a.is('li')) {
          li = a;
          a = a.children('a');
        }

        li = a.parent('li');
        ret = a.text().trim();
        dataIndex = li.attr('data-index');
        dataValue = li.attr('data-value');

        this.element.attr('aria-activedescendant', li.attr('id'));

        if (items && items.length) {
          // If the data-index attr is supplied, use it to get the item (since two items could have same value)
          if (dataIndex) {
            ret = items[parseInt(dataIndex, 10)];
          } else if (dataValue) {
            // Otherwise use data-value to get the item (a custom template may not supply data-index)
            for (var i = 0, value; i < items.length; i++) {
              value = items[i].value.toString();
              if (value === dataValue) {
                ret = items[i];
              }
            }
          }
        }

        this.closeList();
        this.highlight(a);

        this.noSelect = true;
        this.element
          .trigger('selected', [a, ret])
          .focus();

        if (isEvent) {
          anchorOrEvent.preventDefault();
        }

        return false;
      },

      updated: function() {
        this.teardown().init();
        return this;
      },

      enable: function() {
        this.element.prop('disabled', false);
      },

      disable: function() {
        this.element.prop('disabled', true);
      },

      teardown: function(){
        var popup = this.element.data('popupmenu');
        if (popup) {
          popup.destroy();
        }

        this.element.off('keypress.autocomplete focus.autocomplete requestend.autocomplete updated.autocomplete');
        return this;
      },

      destroy: function() {
        this.teardown();
        $.removeData(this.element[0], pluginName);
      }
    };

    // Initialize Once
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        instance = $.data(this, pluginName, new Autocomplete(this, settings));
      } else {
        instance.settings = $.extend({}, instance.settings, options);
        instance.updated();
      }
    });
  };

/* start-amd-strip-block */
}));
/* end-amd-strip-block */

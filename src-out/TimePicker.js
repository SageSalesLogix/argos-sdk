define('argos/TimePicker', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/_base/event', 'dojo/_base/connect', 'dojo/dom-attr', 'dojo/dom-class', 'dijit/_Widget', 'argos/_Templated', './Modal'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojo_baseEvent, _dojo_baseConnect, _dojoDomAttr, _dojoDomClass, _dijit_Widget, _argos_Templated, _Modal) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  /* Copyright (c) 2010, Sage Software, Inc. All rights reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * @class argos.TimePicker
   * @alternateClassName Time Select
   */

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _event = _interopRequireDefault(_dojo_baseEvent);

  var _connect = _interopRequireDefault(_dojo_baseConnect);

  var _domAttr = _interopRequireDefault(_dojoDomAttr);

  var _domClass = _interopRequireDefault(_dojoDomClass);

  var _Widget2 = _interopRequireDefault(_dijit_Widget);

  var _Templated2 = _interopRequireDefault(_argos_Templated);

  var _Modal2 = _interopRequireDefault(_Modal);

  var __class = (0, _declare['default'])('argos.TimePicker', [_Widget2['default'], _Templated2['default']], {
    widgetTemplate: new Simplate(['<div class="time-select panel">', '<div class="time-parts">', '{%! $.hourSelectTemplate %}', ' : ', '{%! $.minuteSelectTemplate %}', '{%! $.meridiemSelectTemplate %}', '</div>', '{% if ($.showSetTime) { %}', '<div class="button tertiary">{%= $.setTimeText %}</div>', '{% } %}', '</div>']),
    hourSelectTemplate: new Simplate(['<div class="dropdown" data-dojo-attach-point="hourNode">', '<input class="hours"></input>', '<span class="fa fa-caret-down"></span>', '</div>']),
    minuteSelectTemplate: new Simplate(['<div class="dropdown" data-dojo-attach-point="minuteNode">', '<input class="minutes"></input>', '<span class="fa fa-caret-down"></span>', '</div>']),
    meridiemSelectTemplate: new Simplate(['<div class="toggle toggle-horizontal meridiem-field" data-action="toggleMeridiem" data-dojo-attach-point="meridiemNode">', '<span class="thumb horizontal"></span>', '<span class="toggleOn">{%= $.amText %}</span>', '<span class="toggleOff">{%= $.pmText %}</span>', '</div>']),
    listStartTemplate: new Simplate(['<ul class="list">']),
    listEndTemplate: new Simplate(['</ul>']),
    listItemTemplate: new Simplate(['<li class="list-item" data-action="{$.action}">', '{%= $.value }', '</li>']),

    amText: 'AM',
    pmText: 'PM',
    setTimeText: 'Set Time',

    timeValue: null,
    _hourModal: null,
    _minuteModal: null,
    showSetTime: true,
    hourValues: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    minuteValues: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55],

    createHourModal: function createHourModal() {
      this._hourModal = new _Modal2['default']({ id: 'hour-modal', showBackdrop: false, positioning: 'right' });
      this._hourModal.placeModal(this.domNode.offsetParent).setContentPicklist({ items: this.hourValues, action: 'setSelectedHour', actionScope: this });
      _connect['default'].connect(this.hourNode, 'onclick', this, this.toggleHours);
      return this;
    },
    createMinuteModal: function createMinuteModal() {
      this._minuteModal = new _Modal2['default']({ id: 'minute-modal', showBackdrop: false, positioning: 'right' });
      this._minuteModal.placeModal(this.domNode.offsetParent).setContentPicklist({ items: this.minuteValues, action: 'setSelectedMinute', actionScope: this });
      _connect['default'].connect(this.minuteNode, 'onclick', this, this.toggleMinutes);
      return this;
    },
    getContent: function getContent() {
      return this.timeValue;
    },
    setSelectedHour: function getSelectedHour() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var entity = params;
      return entity;
    },
    setSelectedMinute: function getSelectedMinute() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var entity = params;
      return entity;
    },
    setTimeValue: function setTimeValue() {
      if (!this._isTimeless()) {
        this.timeValue.hours = parseInt(this.hourNode.value, 10);
        this.timeValue.minutes = parseInt(this.minuteNode.value, 10);
        this.timeValue.isPM = this.is24hrTimeFormat ? this.timeValue.hours > 11 : _domAttr['default'].get(this.meridiemNode, 'toggled') !== true;

        this.timeValue.hours = this.timeValue.isPM ? this.timeValue.hours % 12 + 12 : this.timeValue.hours % 12;
      }
      return this;
    },
    show: function show() {
      this.createHourModal().createMinuteModal();
    },
    toggleHours: function toggleHours() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      this._hourModal.toggleModal(params.target);
      _event['default'].stop(params);
    },
    toggleMeridiem: function toggleMeridiem() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var el = params.$source;

      if (el) {
        var toggledValue = el && _domAttr['default'].get(el, 'toggled') !== true;
        _domClass['default'].toggle(el, 'toggleStateOn');
        _domAttr['default'].set(el, 'toggled', toggledValue);
      }
    },
    toggleMinutes: function toggleMinutes() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      this._minuteModal.toggleModal(params.target);
      _event['default'].stop(params);
    },
    _isTimeless: function _isTimeless() {
      return this.options && this.options.timeless || this.timeless;
    }
  });

  _lang['default'].setObject('Sage.Platform.Mobile.TimePicker', __class);
  module.exports = __class;
});
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
 * @class argos.Calendar
 * @alternateClassName Calendar
 */
import declare from 'dojo/_base/declare';
import array from 'dojo/_base/array';
import lang from 'dojo/_base/lang';
import query from 'dojo/query';
import domClass from 'dojo/dom-class';
import domConstruct from 'dojo/dom-construct';
import domProp from 'dojo/dom-prop';
import View from 'argos/View';
import Modal from 'argos/Modal';
import moment from 'moment';

const __class = declare('argos.Calendar', [View], {
  widgetTemplate: new Simplate([
    '<div id="{%= $.id %}" class="calendar panel">',
      '{%! $.calendarHeaderTemplate %}',
      '{%! $.calendarTableTemplate %}',
      '{%! $.calendarFooterTemplate %}',
    '</div>',
  ]),
  calendarHeaderTemplate: new Simplate([
    '<div class="calendar-header">',
      '<span class="fa fa-angle-left" data-action="decrementMonth"></span>',
      '<span class="month" data-dojo-attach-point="monthNode" data-action="toggleMonthModal"></span>',
      '<span class="year" data-dojo-attach-point="yearNode" data-action="toggleYearModal"></span>',
      '<span class="fa fa-angle-right" data-action="incrementMonth"></span>',
    '</div>',
  ]),
  calendarTableTemplate: new Simplate([
     '<table class="calendar-table">',
      '<thead>',
        '{%! $.calendarWeekDaysTemplate %}',
      '</thead>',
      '<tbody data-dojo-attach-point="weeksNode"></tbody>',
     '</table>',
  ]),
  calendarFooterTemplate: new Simplate([
    '<div class="calendar-footer">',
      '<div class="button tertiary clear" data-action="clearCalendar" data-dojo-attach-point="clearButton">{%= $.clearText %}</div>',
      '<div class="button tertiary toToday" data-action="goToToday" data-dojo-attach-point="todayButton">{%= $.todayText %}</div>',
    '</div>',
  ]),
  calendarTableDayTemplate: new Simplate([
    '<td class="day {%= $.month %} {%= $.weekend %} {%= $.selected %} {%= $.isToday %}" data-action="changeDay" data-date="{%= $.date %}">',
      '{%= $.day %}',
    '</td>',
  ]),
  calendarTableWeekStartTemplate: new Simplate([
    '<tr class="calendar-week">',
  ]),
  calendarTableWeekEndTemplate: new Simplate([
    '</tr>',
  ]),
  calendarWeekDaysTemplate: new Simplate([
    '<tr class="calendar-weekdays">',
      '<th>{%= $.weekDaysShortText[0] %}</th>',
      '<th>{%= $.weekDaysShortText[1] %}</th>',
      '<th>{%= $.weekDaysShortText[2] %}</th>',
      '<th>{%= $.weekDaysShortText[3] %}</th>',
      '<th>{%= $.weekDaysShortText[4] %}</th>',
      '<th>{%= $.weekDaysShortText[5] %}</th>',
      '<th>{%= $.weekDaysShortText[6] %}</th>',
    '</tr>',
  ]),
  timePickTemplate: new Simplate([
    '<div class="time-picker">',
    '</div>',
  ]),

  // Localization
  titleText: 'Calendar',
  amText: 'AM',
  pmText: 'PM',
  clearText: 'Clear',
  todayText: 'Today',
  monthsText: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
  ],
  weekDaysShortText: [
      'Su',
      'Mo',
      'Tu',
      'We',
      'Th',
      'Fr',
      'Sa',
  ],

  id: 'generic_calendar',
  showTimePicker: true,
  // This boolean value is used to trigger the modal hide and show and must be used by each entity
  isModal: false,
  // Date is an object containing selected day, month, year, time, todayMoment (today), selectedDateMoment, etc.
  date: null,
  _monthModal: null,
  _currentMonth: null,
  _todayMonth: null,
  _yearModal: null,
  _currentYear: null,
  _todayYear: null,

  changeDay: function changeDay(params) {
    // TODO: Need to register this event to dojo/connect so that the activity feed and then change based on the date chosen.
    const selected = query('.selected', this.weeksNode)[0];

    if (selected) {
      domClass.remove(selected, 'selected');
    }

    domClass.add(params.$source, 'selected');

    this.date.selectedDateMoment = moment(params.date, 'YYYY-MM-DD');

    if (this.date.selectedDateMoment.date() !== this.date.todayMoment.date()) {
      domClass.add(this.todayButton, 'selected');
    }
    if (this.date.month !== this.date.selectedDateMoment.month()) {
      this.refreshCalendar(this.date);
    }

    return this;
  },
  changeMonthShown: function changeMonthShown({ month }) {
    domConstruct.empty(this.monthNode);
    this.monthNode.innerHTML = month;
    return this;
  },
  changeYearShown: function changeYearShown({ year }) {
    domConstruct.empty(this.yearNode);
    this.yearNode.innerHTML = ' ' + year;
    return this;
  },
  checkAndRenderDay: function checkAndRenderDay(data = {}) {
    const dayIndexer = data.day + data.startingDay - 1;
    if (data.day === data.todayMoment.date() && data.todayMoment.month() === data.dateMoment.month()) {
      data.isToday = 'isToday';
    } else {
      data.isToday = '';
    }
    if (dayIndexer % 7 === data.weekEnds.Sunday || dayIndexer % 7 === data.weekEnds.Saturday) {
      data.weekend = 'weekend';
    } else {
      data.weekend = '';
    }
    data.date = data.dateMoment.date(data.day).format('YYYY-MM-DD');
    domConstruct.place(this.calendarTableDayTemplate.apply(data, this), data.week);
  },
  clearCalendar: function clearCalendar() {
    const selected = query('.selected', this.weeksNode)[0];

    if (selected) {
      domClass.remove(selected, 'selected');
      domClass.add(this.todayButton, 'selected');
    }
    this.date.selectedDateMoment = null;
  },
  createMonthModal: function createMonthModal() {
    this._monthModal = new Modal({ id: 'month-modal', showBackdrop: false, positioning: 'center', closeAction: 'hideMonthModal', actionScope: this });
    this._monthModal.placeModal(this.domNode.offsetParent)
                   .setContentPicklist({ items: this.monthsText, action: 'setSelectedMonth', actionScope: this, defaultValue: this.date.selectedDateMoment.format('MMMM') });
    this._currentMonth = this._monthModal.getSelected();
    this._todayMonth = this._currentMonth;
    return this;
  },
  createYearModal: function createYearModal() {
    this._yearModal = new Modal({ id: 'year-modal', showBackdrop: false, positioning: 'center', closeAction: 'hideYearModal', actionScope: this });
    this._yearModal.placeModal(this.domNode.offsetParent)
                   .setContentPicklist({ items: this.getYearRange(), action: 'setSelectedYear', actionScope: this, defaultValue: this.date.selectedDateMoment.format('YYYY')});
    this._currentYear = this._yearModal.getSelected();
    this._todayYear = this._currentYear;
    return this;
  },
  decrementMonth: function decrementMonth() {
    this.date.selectedDateMoment.subtract({ months: 1 });
    this.refreshCalendar(this.date);
  },
  getContent: function getContent() {
    return this.date;
  },
  goToToday: function goToToday() {
    domClass.remove(this.todayButton, 'selected');
    this.date.selectedDateMoment = this.date.todayMoment.clone();
    this.refreshCalendar(this.date)
        .setDropdownsToday();
  },
  getYearRange: function getYearRange() {
    const items = [];
    const thisYear = this.date.todayMoment.year();
    for (let i = thisYear - 50; i <= thisYear + 50; i++) {
      items.push(i);
    }
    return items;
  },
  hideModals: function hideModals() {
    this.hideYearModal();
    this.hideMonthModal();
  },
  hideMonthModal: function hideMonthModal() {
    domClass.remove(this.monthNode, 'selected');
    this._monthModal.hideModal();
  },
  hideYearModal: function hideYearModal() {
    domClass.remove(this.yearNode, 'selected');
    this._yearModal.hideModal();
  },
  incrementMonth: function incrementMonth() {
    this.date.selectedDateMoment.add({ months: 1 });
    this.refreshCalendar(this.date);
  },
  init: function init() {
    this.inherited(arguments);
  },
  refreshCalendar: function refreshCalendar(date = {}) {
    domConstruct.empty(this.weeksNode);
    this.renderCalendar(date)
        .changeMonthShown(date)
        .changeYearShown(date);
    return this;
  },
  renderCalendar: function renderCalendar({ todayMoment, selectedDateMoment }) {
    const daysInMonth = selectedDateMoment.daysInMonth();
    const startingDay = selectedDateMoment.clone().startOf('month').day();
    const endPrevMonth = selectedDateMoment.clone().startOf('month').subtract({ days: startingDay });
    const startNextMonth = selectedDateMoment.clone().endOf('month').add({ days: 1 });
    const data = {
      todayMoment,
      selectedDateMoment,
      dateMoment: endPrevMonth.clone(),
      week: domConstruct.toDom(this.calendarTableWeekStartTemplate.apply()),
      startingDay: endPrevMonth.clone().startOf('month').day(),
      weekEnds: {
        Sunday: 0,
        Saturday: 6,
      },
    };

    // Iterate through the days that are in the start week of the current month but are in the previous month
    for (let day = endPrevMonth.date(); day < endPrevMonth.date() + startingDay; day++) {
      data.day = day;
      this.checkAndRenderDay(data);
    }

    data.month = 'current-month';
    data.startingDay = startingDay;
    data.dateMoment = selectedDateMoment.clone();
    for (let day = 1; day <= daysInMonth; day++) {
      if (day === selectedDateMoment.date()) {
        data.selected = 'selected';
      } else {
        data.selected = '';
      }
      data.day = day;
      this.checkAndRenderDay(data);
      if ((day + startingDay) % 7 === 0) {
        domConstruct.place(this.calendarTableWeekEndTemplate.apply(), data.week);
        domConstruct.place(data.week, this.weeksNode);
        data.week = domConstruct.toDom(this.calendarTableWeekStartTemplate.apply());
      }
    }


    data.selected = '';
    data.month = '';
    data.startingDay = startNextMonth.day();
    data.dateMoment = startNextMonth.clone();
    // Iterate through remaining days of the week based on 7 days in the week and ensure there are 6 weeks shown (for consistency)
    for (let day = 1; day <= (1 + data.weekEnds.Saturday - startNextMonth.day()); day++) {
      data.day = day;
      this.checkAndRenderDay(data);
    }
    domConstruct.place(this.calendarTableWeekEndTemplate.apply(), data.week);
    domConstruct.place(data.week, this.weeksNode);

    if (this.weeksNode.children.length === 5) {
      data.week = domConstruct.toDom(this.calendarTableWeekStartTemplate.apply());
      for (let day = 2 + data.weekEnds.Saturday - startNextMonth.day(); day <= (8 + data.weekEnds.Saturday - startNextMonth.day()); day++) {
        data.day = day;
        this.checkAndRenderDay(data);
      }
      domConstruct.place(this.calendarTableWeekEndTemplate.apply(), data.week);
      domConstruct.place(data.week, this.weeksNode);
    }

    this.setDateObject(selectedDateMoment);

    if (this.date.monthNumber !== moment().month()) {
      domClass.add(this.todayButton, 'selected');
    }

    return this;
  },
  setDateObject: function setDateObject(dateMoment = {}) {
    this.date.day = dateMoment.date();
    this.date.month = dateMoment.format('MMMM');
    this.date.monthNumber = dateMoment.month();
    this.date.year = dateMoment.year();
    this.date.date = moment(dateMoment).toDate();

    return this;
  },
  setDropdownsToday: function setDropdownsToday() {
    if (this._currentMonth !== this._todayMonth) {
      domClass.remove(this._currentMonth, 'selected');
      domClass.add(this._todayMonth, 'selected');
      domProp.set(this._monthModal.getContent(), 'scrollTop', domProp.get(this._todayMonth, 'offsetTop'));
    }
    if (this._currentYear !== this._todayYear) {
      domClass.remove(this._currentYear, 'selected');
      domClass.add(this._todayYear, 'selected');
      domProp.set(this._yearModal.getContent(), 'scrollTop', domProp.get(this._todayYear, 'offsetTop'));
    }
    return this;
  },
  setSelectedMonth: function setSelectedMonth({ target }) {
    if (target) {
      domClass.add(target, 'selected');
      if (this._currentMonth) {
        domClass.remove(this._currentMonth, 'selected');
      }
      this._currentMonth = target;
      this.date.selectedDateMoment.month(array.indexOf(this._monthModal.getContent().children, target));
      this.toggleMonthModal();
      this.refreshCalendar(this.date);
    }
    return this;
  },
  setSelectedYear: function setSelectedYear({ target }) {
    if (target) {
      domClass.add(target, 'selected');
      if (this._currentYear) {
        domClass.remove(this._currentYear, 'selected');
      }
      this._currentYear = target;
      this.date.selectedDateMoment.year(parseInt(target.innerHTML, 10));
      this.toggleYearModal();
      this.refreshCalendar(this.date);
    }
    return this;
  },
  show: function show(options = {}) {
    if (!this.isModal) {
      this.inherited(arguments);
    }
    this.date = {};
    this.options = options || this.options;

    this.titleText = this.options.label ? this.options.label : this.titleText;
    this.showTimePicker = this.options && this.options.showTimePicker;
    this.date.selectedDateMoment = moment((this.options && this.options.date) || moment());
    this.date.todayMoment = moment();
    if (this.isModal || this.options.isModal) {
      this.clearButton.style.display = 'none';
    }
    this.createMonthModal()
        .createYearModal();

    this.goToToday(this.date);
  },
  toggleMonthModal: function toggleMonthModal(params = {}) {
    domClass.toggle(this.monthNode, 'selected');
    this._monthModal.toggleModal(params.$source);
  },
  toggleYearModal: function toggleYearModal(params = {}) {
    domClass.toggle(this.yearNode, 'selected');
    this._yearModal.toggleModal(params.$source);
  },
});

lang.setObject('Sage.Platform.Mobile.Calendar', __class);
export default __class;

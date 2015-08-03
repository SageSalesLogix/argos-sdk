/**
 * @class argos.TabWidget
 * @alternateClassName TabWidget
 */
import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import array from 'dojo/_base/array';
import domConstruct from 'dojo/dom-construct';
import query from 'dojo/query';
import _Templated from 'argos/_Templated';

const __class = declare('argos.TabWidget', [_Templated], {
  /**
   * @property {Simplate}
   * HTML that starts a new tab list
   */
  tabContentTemplate: new Simplate([
    '<div class="panel-content" data-dojo-attach-point="contentNode">',
    '{%! $.tabListTemplate %}',
    '</div>',
  ]),
  /**
   * @property {Simplate}
   * HTML that starts a new tab list
   */
  tabListTemplate: new Simplate([
    '<ul class="tab-list" data-dojo-attach-point="tabList">',
    '</ul>',
  ]),
  /**
   * @property {Simplate}
   * HTML that starts a new More tab list
   */
  moreTabListTemplate: new Simplate([
    '<ul class="more-tab-dropdown" data-dojo-attach-point="moreTabList">',
    '</ul>',
  ]),
  /**
   * @property {Simplate}
   * HTML that starts a new animation bar
   */
  tabListAnimTemplate: new Simplate([
    '<div class="tab-focus-indicator"></div>',
    '<div class="animated-bar"></div>',
  ]),
  /**
   * @property {Simplate}
   * HTML that creates a new tab to be placed in the tab list
   *
   * `$` => the view instance
   */
  tabListItemTemplate: new Simplate([
    '<li class="tab" data-action="changeTab">',
    '{%: ($.title || $.options.title) %}',
    '</li>',
  ]),
  /**
   * @property {Simplate}
   * HTML that creates a new tab to be placed in the more tab list
   *
   * `$` => the view instance
   */
  moreTabItemTemplate: new Simplate([
    '<li class="tab more-item" data-action="toggleDropDown">',
    '{%: ($.title || $.options.title) %}',
    '<span class="fa fa-angle-right"></span>',
    '</li>',
  ]),

  /**
   * @cfg {String}
   * More text that is used as the overflow tab for the tab list
   */
  moreText: 'More',
  /**
   * @property {li}
   * Current tab (html element li) that the view is on
   */
  currentTab: null,
  /**
   * @property {bool}
   * Boolean value for whether tabs caused an overflow in the tab list
   */
  inOverflow: false,
  /**
   * @property {int}
   * int value representing the index at which the more tab starts (used to place the remaining tabs into the more tab)
   */
  tabMoreIndex: null,
  /**
   * @property {Array}
   * Mapping of tab to the section
   */
  tabMapping: null,

  /**
   * Changes the tab state in the tab list and changes visibility of content.
   * @param {Object} The event type and source.
   * @private
   */
  changeTab: function changeTab(params) {
    const tab = params.$source;
    if (tab !== this.currentTab) {
      const indexShift = this.tabList.children.length - 1;
      let currentIndex = array.indexOf(this.tabList.children, this.currentTab);
      if (currentIndex === -1) {
        currentIndex = array.indexOf(this.moreTabList.children, this.currentTab) + indexShift;
      }
      let tabIndex = array.indexOf(this.tabList.children, tab);
      if (tabIndex === -1) {
        tabIndex = array.indexOf(this.moreTabList.children, tab) + indexShift;
      }
      if (currentIndex > -1 && tabIndex > -1) {
        this.tabMapping[currentIndex].style.display = 'none';
        this.tabMapping[tabIndex].style.display = 'block';
        const moreTab = query('.more-item', this.id)[0];
        if (array.indexOf(this.tabList.children, tab) > -1) {
          this.positionFocusState(tab);
          this.currentTab.className = 'tab';
          tab.className = 'tab selected';
          this.currentTab = tab;
          if (moreTab) {
            moreTab.className = 'tab more-item';
          }
        } else {
          if (moreTab) {
            this.positionFocusState(moreTab);
            moreTab.className = 'tab more-item selected';
            this.currentTab.className = 'tab';
            tab.className = 'tab selected';
            this.currentTab = tab;
          }
        }
      }
    }
  },
  /**
   * Changes the tab state in the tab list and changes visibility of content.
   * @param {Object} The event type and source.
   * @private
   */
  toggleDropDown: function toggleDropDown(params) {
    const tab = params.$source;
    const moreTab = query('.more-item', this.id)[0];
    const icon = query('.fa', moreTab)[0];

    if (tab) {
      if (this.moreTabList.style.visibility === 'hidden') {
        this.moreTabList.style.visibility = 'visible';
        if (icon) {
          icon.className = 'fa fa-angle-down';
        }

        if (!this.moreTabList.style.left) {
          const posTop = moreTab.offsetTop;
          const posLeft = moreTab.offsetLeft;
          const width = parseInt(moreTab.offsetWidth, 10);
          const height = parseInt(moreTab.offsetHeight, 10);
          const maxHeight = this.domNode.offsetHeight - this.domNode.offsetTop - posTop;

          this.moreTabList.style.left = posLeft - this.moreTabList.offsetWidth + width + 'px';
          this.moreTabList.style.top = posTop + height + 'px';
          this.moreTabList.style.maxHeight = maxHeight + 'px';
        }
      } else {
        this.moreTabList.style.visibility = 'hidden';
        if (icon) {
          icon.className = 'fa fa-angle-right';
        }
      }
    } else {
      if (params.target !== moreTab) {
        this.moreTabList.style.visibility = 'hidden';
        if (icon) {
          icon.className = 'fa fa-angle-right';
        }
      }
    }
  },
  /**
   * Reorganizes the tab when the screen orientation changes.
   * @private
   */
  reorderTabs: function reorderTabs() {
    const moreTab = query('.more-item', this.id)[0];
    this.inOverflow = false;

    if (this.moreTabList.children.length > 0) {
      if (moreTab) {
        this.tabList.children[this.tabList.children.length - 1].remove();
      }
      // Need to reference a different array when calling array.forEach since this.moreTabList.children is being modified, hence have arr be this.moreTabList.children
      const arr = [].slice.call(this.moreTabList.children);
      array.forEach(arr, function placeFromMoreTab(tab) {
        this.moreTabList.children[array.indexOf(this.moreTabList.children, tab)].remove();
        domConstruct.place(tab, this.tabList);
        this.checkTabOverflow(tab);
      }, this);
    } else {
      const arr = [].slice.call(this.tabList.children);
      domConstruct.empty(this.tabList);
      array.forEach(arr, function recreateTabList(tab) {
        domConstruct.place(tab, this.tabList);
        this.checkTabOverflow(tab);
      }, this);
    }

    if (moreTab && array.indexOf(this.moreTabList.children, this.currentTab) > -1) {
      this.positionFocusState(moreTab);
      moreTab.className = 'tab more-item selected';
    } else {
      this.positionFocusState(this.currentTab);
    }
  },
  /**
   * Handler for positioning the focus bar for the tab list.
   * @param {Object} The target tab in the tabList.
   * @private
   */
  positionFocusState: function positionFocusState(target) {
    const focusState = query('.animated-bar', this.id)[0];

    if (focusState) {
      const posTop = target.offsetTop;
      const posLeft = target.offsetLeft;
      const width = parseInt(target.offsetWidth, 10);
      const height = parseInt(target.offsetHeight, 10);
      const tableTop = this.tabList.offsetTop;
      const tableLeft = this.tabList.offsetLeft;

      focusState.style.left = posLeft - tableLeft + 'px';
      focusState.style.top = posTop - tableTop + 'px';
      focusState.style.right = (posTop - tableTop) + width + 'px';
      focusState.style.bottom = (posTop - tableTop) + height + 'px';
      focusState.style.width = width + 'px';
    }
  },
  /**
   * Checks the tab to see if it causes an overflow when placed in the tabList, if so then push it a new list element called More.
   * @param {Object} The tab object.
   * @private
   */
  checkTabOverflow: function checkTabOverflow(tab) {
    if (tab.offsetTop > this.tabList.offsetTop) {
      if (!this.inOverflow) {
        const moreTab = domConstruct.toDom(this.moreTabItemTemplate.apply({
          title: this.moreText + '...',
        }, this));
        moreTab.style.float = 'right';
        domConstruct.place(moreTab, this.tabList);

        this.tabMoreIndex = array.indexOf(this.tabList.children, tab);
        this.tabList.children[this.tabMoreIndex].remove();
        if (this.tabList.children.length === 1 && !this.moreTabList.children.length) {
          moreTab.className = 'tab more-item selected';
          this.currentTab = tab;
          tab.className = 'tab selected';
        }

        if (moreTab.offsetTop > this.tabList.offsetTop) {
          this.tabMoreIndex = this.tabMoreIndex - 1;
          const replacedTab = this.tabList.children[this.tabMoreIndex];
          this.tabList.children[this.tabMoreIndex].remove();
          domConstruct.place(replacedTab, this.moreTabList);
        }

        domConstruct.place(tab, this.moreTabList);
        this.inOverflow = true;
        this.tabMoreIndex++;
      } else {
        this.tabList.children[this.tabMoreIndex].remove();
        domConstruct.place(tab, this.moreTabList);
      }
    }
  },
});

lang.setObject('Sage.Platform.Mobile.TabWidget', __class);
export default __class;

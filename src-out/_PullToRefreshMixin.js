define('argos/_PullToRefreshMixin', ['exports', 'module', 'dojo/_base/declare', 'dojo/dom-class', 'dojo/dom-construct', 'dojo/dom-geometry', 'dojo/dom-style'], function (exports, module, _dojo_baseDeclare, _dojoDomClass, _dojoDomConstruct, _dojoDomGeometry, _dojoDomStyle) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _domClass = _interopRequireDefault(_dojoDomClass);

  var _domConstruct = _interopRequireDefault(_dojoDomConstruct);

  var _domGeom = _interopRequireDefault(_dojoDomGeometry);

  var _domStyle = _interopRequireDefault(_dojoDomStyle);

  var __class = undefined;

  /**
   * @class argos._PullToRefreshMixin
   * Mixin for pull to refresh actions
   * @alternateClassName _PullToRefreshMixin
   */
  __class = (0, _declare['default'])('argos._PullToRefreshMixin', null, {
    /**
     * @property {Simplate}
     */
    pullRefreshBannerTemplate: new Simplate(['<div class="pull-to-refresh">{%! $.pullRefreshTemplate %}</div>']),

    /**
     * @property {Simplate}
     */
    pullRefreshTemplate: new Simplate(['<span class="fa fa-long-arrow-down"></span>{%= $$._getText("pullRefreshText") %}']),

    /**
     * @property {Simplate}
     */
    pullReleaseTemplate: new Simplate(['<span class="fa fa-long-arrow-up"></span>{%= $$._getText("pullReleaseText") %}']),

    /**
     * @property {String}
     * Text to indicate a pull to refresh
     */
    pullRefreshText: 'Pull down to refresh...',
    /**
     * @property {String}
     * Text to indicate the user should release to cause the refresh
     */
    pullReleaseText: 'Release to refresh...',

    /**
     * @property {Boolean} enablePullToRefresh If true, will enable the user to drag down and refresh the list. Default is true.
     */
    enablePullToRefresh: true,

    /**
     * @property {DOMNode}
     */
    pullRefreshBanner: null,

    /**
     * @property {DOMNode}
     */
    scrollerNode: null,

    _onTouchStartHandle: null,
    _onTouchEndHandle: null,
    _onTouchMoveHandle: null,
    _onTouchCancelHandle: null,

    _getText: function _getText(prop) {
      return __class.prototype[prop];
    },

    /**
     * @static
     * @property {Object}
     * Stores the current pull to refresh data. Do not store object refs here, this structure is static.
     */
    pullToRefresh: {
      originalTop: '0px',
      originalOverflow: '',
      bannerHeight: 0,
      scrollerHeight: 0,
      scrollerWidth: 0,
      dragTop: 0,
      pulling: false,
      dragStartX: 0,
      dragStartY: 0,
      lastX: 0,
      lastY: 0,
      results: false,
      animateCls: 'animate'
    },

    /**
     * @param {DOMNode} scrollerNode The node that scrollers and should be pulled on to refresh.
     */
    initPullToRefresh: function initPullToRefresh(scrollerNode) {
      if (!this.enablePullToRefresh || !window.App.supportsTouch() || !scrollerNode) {
        return;
      }

      this.pullRefreshBanner = _domConstruct['default'].toDom(this.pullRefreshBannerTemplate.apply(this));
      _domConstruct['default'].place(this.pullRefreshBanner, scrollerNode, 'before');

      // Pull down to refresh touch handles
      this.scrollerNode = scrollerNode;
      this._onTouchStartHandle = this.connect(scrollerNode, 'ontouchstart', this._onTouchStart.bind(this));
      this._onTouchMoveHandle = this.connect(scrollerNode, 'ontouchmove', this._onTouchMove.bind(this));
      this._onTouchCancelHandle = this.connect(scrollerNode, 'ontouchcancel', this._onEndTouchDrag.bind(this));
      this._onTouchEndHandle = this.connect(scrollerNode, 'ontouchend', this._onEndTouchDrag.bind(this));
    },

    /**
     * Derived class must implement this to determine when pull to refresh should start. This is called when onTouchStart is fired.
     * @param {DOMNode} scrollerNode
     * Reference to the scoller node
     * @returns {Boolean}
     */
    shouldStartPullToRefresh: function shouldStartPullToRefresh(scrollerNode) {
      var scrollTop = scrollerNode.scrollTop; // How far we are scrolled down, this should be 0 before we start dragging the pull refresh
      return scrollTop === 0;
    },

    _onTouchStart: function _onTouchStart(evt) {
      this.pullToRefresh.pulling = false;
      this.pullToRefresh.results = false;

      var scrollerNode = this.scrollerNode;

      if (!scrollerNode) {
        return;
      }

      if (this.shouldStartPullToRefresh(scrollerNode)) {
        var position = _domGeom['default'].position(scrollerNode);
        var bannerPos = _domGeom['default'].position(this.pullRefreshBanner);
        var style = _domStyle['default'].getComputedStyle(scrollerNode); // expensive
        this.pullToRefresh.bannerHeight = bannerPos.h;
        this.pullToRefresh.scrollerHeight = position.h;
        this.pullToRefresh.scrollerWidth = position.w;
        this.pullToRefresh.originalTop = style.top;
        this.pullToRefresh.originalOverflow = style.overflow;
        this.pullToRefresh.dragTop = parseInt(style.top, 10);
        this.pullToRefresh.dragStartY = this.pullToRefresh.lastY = evt.clientY;
        this.pullToRefresh.dragStartX = this.pullToRefresh.lastX = evt.clientX;

        this.pullToRefresh.pulling = true;

        _domStyle['default'].set(this.pullRefreshBanner, 'visibility', 'visible');
      }
    },
    _onTouchMove: function _onTouchMove(evt) {
      var PULL_PADDING = 20;

      var scrollerNode = this.scrollerNode;

      if (!this.pullToRefresh.pulling || !scrollerNode) {
        return;
      }

      _domClass['default'].remove(scrollerNode, this.pullToRefresh.animateCls);

      // distance from last drag
      var distance = evt.clientY - this.pullToRefresh.lastY;

      var MAX_DISTANCE = this.pullToRefresh.bannerHeight + PULL_PADDING;

      // slow down the pull down speed a bit, the user has to drag a bit futher, but it feels a bit more smooth
      distance = distance / 2;

      if (distance >= 0) {
        evt.preventDefault();
        var _top = this.pullToRefresh.dragTop;

        _top = _top + distance;
        _domStyle['default'].set(scrollerNode, {
          'top': _top + 'px',
          'overflow': 'hidden'
        });

        if (distance > MAX_DISTANCE) {
          // The user has pulled down the max distance required to trigger a refresh
          this.pullToRefresh.results = true;
          this.pullRefreshBanner.innerHTML = this.pullReleaseTemplate.apply(this);
        } else {
          // The user pulled down, but not far enough to trigger a refresh
          this.pullToRefresh.results = false;
          this.pullRefreshBanner.innerHTML = this.pullRefreshTemplate.apply(this);
        }
      }
    },
    _onEndTouchDrag: function _onEndTouchDrag() {
      var scrollerNode = this.scrollerNode;

      if (!this.pullRefreshBanner || !scrollerNode || !this.pullToRefresh.pulling) {
        return;
      }

      // Restore our original scroller styles
      _domStyle['default'].set(scrollerNode, {
        'top': this.pullToRefresh.originalTop,
        'overflow': this.pullToRefresh.originalOverflow
      });

      _domStyle['default'].set(this.pullRefreshBanner, 'visibility', 'hidden');

      _domClass['default'].add(scrollerNode, this.pullToRefresh.animateCls);

      // Trigger a refresh
      if (this.pullToRefresh.results) {
        this.onPullToRefreshComplete();
      } else {
        this.onPullToRefreshCancel();
      }

      this.pullToRefresh.pulling = false;
      this.pullToRefresh.results = false;
    },

    /**
     * Fires when the pull to refresh is successful.
     */
    onPullToRefreshComplete: function onPullToRefreshComplete() {},

    /**
     * Fires when the pull to refresh is canceled.
     */
    onPullToRefreshCancel: function onPullToRefreshCancel() {}
  });

  module.exports = __class;
});

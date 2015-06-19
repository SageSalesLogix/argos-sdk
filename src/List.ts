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
import declare = require('dojo/_base/declare');
import lang = require('dojo/_base/lang');
import _ListBase = require('./_ListBase');
import _SDataListMixin = require('./_SDataListMixin');
import _RelatedViewWidgetListMixin = require('./_RelatedViewWidgetListMixin');

/**
 * @class argos.List
 * List extends _ListBase and mixes in _SDataListMixin to provide backwards compatibility for consumers.
 * @extends argos._ListBase
 * @alternateClassName List
 * @requires argos._ListBase
 * @requires argos._SDataListMixin
 * @mixins argos._RelateViewdWidgetListMixin
 */
var __class = declare('argos.List', [_ListBase, _SDataListMixin, _RelatedViewWidgetListMixin], {
});

lang.setObject('Sage.Platform.Mobile.List', __class);
export = <argos.List>__class;

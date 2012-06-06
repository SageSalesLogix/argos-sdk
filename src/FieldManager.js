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

define('Sage/Platform/Mobile/FieldManager', [
    'dojo/_base/lang'
], function(
    lang
) {
    var store = {};
    // todo: move, and rename, to Fields/Registry
    return lang.setObject('Sage.Platform.Mobile.FieldManager', {
        types: store,
        register: function(name, ctor) {
            return (store[name] = ctor);
        },
        get: function(name) {
            return store[name];
        }
    });
});
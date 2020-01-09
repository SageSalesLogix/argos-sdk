/* Copyright 2017 Infor
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @module argos/Models/Adapter
 */
import Manager from './Manager';
import MODEL_TYPES from './Types';

/**
 * @class
 * @alias module:argos/Models/Adapter
 * @static
 */
export default /** @lends module:argos/Models/Adapter */{
  getModel: function getModel(entityName) {
    let Ctor;
    if (App.onLine) {
      Ctor = Manager.get(entityName, MODEL_TYPES.SDATA);
    } else {
      Ctor = Manager.get(entityName, MODEL_TYPES.OFFLINE);
    }

    return typeof Ctor === 'function' ? new Ctor() : false;
  },
};

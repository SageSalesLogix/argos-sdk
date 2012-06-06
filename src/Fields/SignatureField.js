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

define('Sage/Platform/Mobile/Fields/SignatureField', [
    'dojo/_base/declare',
    'dojo/_base/json',
    'dojo/dom-attr',
    'Sage/Platform/Mobile/Format',
    'Sage/Platform/Mobile/Fields/EditorField'
], function(
    declare,
    json,
    domAttr,
    format,
    EditorField
) {
    return declare('Sage.Platform.Mobile.Fields.SignatureField', [EditorField], {
        // Localization
        emptyText: '',
        titleText: 'Signature',
        signatureLabelText: 'signature',
        signatureText: '...',

        signature: [],
        config: {
            scale: 1,
            lineWidth: 1,
            penColor: 'blue',
            width: 180,
            height: 50
        },
        context: null,
        widgetTemplate: new Simplate([
            '<label for="{%= $.name %}">{%: $.label %}</label>',
            '<button class="button simpleSubHeaderButton" aria-label="{%: $.signatureLabelText %}"><span aria-hidden="true">{%: $.signatureText %}</span></button>',
            '<img data-dojo-attach-point="signatureNode" src="" width="{%: $.config.width %}" height="{%: $.config.height %}" alt="" />',
            '<input data-dojo-attach-point="inputNode" type="hidden">'
        ]),

        createNavigationOptions: function() {
            var options = this.inherited(arguments);

            options.signature = this.signature;

            return options;
        },
        getValuesFromView: function() {
            var view = App.getPrimaryActiveView();
            if (view)
            {
                var value = view.getValues();
                this.currentValue = this.validationValue = value;
                this.setValue(this.currentValue, false);
            }
        },
        setValue: function (val, initial) {
            if (initial) this.originalValue = val;

            domAttr.set(this.inputNode, 'value', val || '');

            try
            {
                this.signature = json.fromJson(val);
            }
            catch(e)
            {
                this.signature = [];
            }

            if (!this.signature || Array != this.signature.constructor)
                this.signature = [];

            this.signatureNode.src = format.imageFromVector(this.signature, this.config, false);
        },
        clearValue: function() {
            this.setValue('', true);
        },
        formatValue: function(val) {
            return val;
        }
    });
});

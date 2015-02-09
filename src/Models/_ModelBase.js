/* 
 * See copyright file.
 */

/**
 * @class Sage.Platform.Mobile.Models._ModelBase
 * Model is the base class for all data models. It describes all the functions a model should support giving no implementation itself, merely a shell. The one function that `_Field` does provide that most fields leave untouched is `validate`.
 *
 * 
 * @alternateClassName _ModelBase
 */
define('Sage/Platform/Mobile/Models/_ModelBase', [
    'dojo/_base/declare',
    'dojo/_base/lang'

], function(
    declare,
    lang
) {

    return declare('Sage.Platform.Mobile.Models._ModelBase', null, {
        
         /**
         * @property {String}
         * The unique (within the current form) name of the model
         */
        name: 'baseModel',
        dispalyName: 'baseModel',
        displayNamePlural: 'baseModels',
        constructor: function(o) {
            lang.mixin(this, o);

        },
        init: function(){

         
        }
        
        
    });
});

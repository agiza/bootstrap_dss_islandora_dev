/**
 * @file Drupal widgets
 * A Drupal widget
 *
 */

/**
 * The Widget constructor
 * @param {object} $ - The jQuery Object
 * @param {string} name - A property "name"
 * @param {object} options  - An associative array of properties
 *
 */

var Widget = function($, name, options) {

    this.$ = $;
    this.name = name;
    this.defaults = { height: '400px',
		      width: '640px' };

    // Override any default options with the optional arguments
    this.options = $.extend(this.defaults, options);
};

/**
 * The closure for Drupal widgets
 * @param {object} $ - The jQuery Object
 * @param {object} Drupal - The Drupal Object
 * @param {object} MyWidget - The Widget Constructor
 */
(function($, Drupal, Widget) {

    /**
     * Drupal behaviors for Themes...
     * Please note that these methods must be invoked by using client-side script
     * @usage Drupal.theme('myThemeFunction', arg1, arg2);
     *
     */
    Drupal.theme.prototype.myThemeFunction = function(arg1, arg2) {
	
	return 'testing our theme function with arguments: ' + arg1 + ' ' + arg2;
    };

    /**
     * Drupal behaviors for Modules...
     * Please note that these behaviors are integrated with jQuery, and are called bound to DOM events by the loading of the DOM
     *
     */
    Drupal.behaviors.myModuleBehavior = {

	attach: function(context, settings) {
	    
	    // Create a global instance of the Widget Object
	    myWidget = new Widget($, 'My New Drupal Widget', { height: '320px' });

	    console.log(Drupal.theme('myThemeFunction', 'we can call this from within our module behavior', '!'));
	}
    };

})(jQuery, Drupal, Widget);

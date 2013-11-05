/**
 * jQuery functionality for the theme
 * @author griffinj@lafayette.edu
 *
 */

(function($, Drupal) {

    // Following the Drupal.theme implementation
    // Please see https://drupal.org/node/304258
    Drupal.theme.prototype.bootstrapDssLdr = function() {

	// Work-around: The collapse widget appears to be broken
	$('.navbar-toggle').click(function() {

		$('.collapse').collapse('toggle');
		
	    });

	// For the popovers
	$('#share-modal-help').popover();
	$('#auth-modal-help').popover();

    }

    // Ensure that the execution of all bootstrap functionality lies within a modular, Drupal-compliant context
    Drupal.behaviors.bootstrapDssLdr = {

	attach: function(context, settings) {

	    Drupal.theme('bootstrapDssLdr');
	}
    }
})(jQuery, Drupal);
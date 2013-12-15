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

	// Refactor
	$('#auth-modal-toggle').popover({content: $('#auth-modal').html()}).on('shown.bs.popover', function() {

	    var $that = $(this);

	    //$('.auth-container button.close').click(function(e) {
	    $(this).parents('.modal-container').find('.close').click(function(e) {

		//$(this).popover('hide');
		$that.popover('hide');
	    });

	    var $popover = $(this).parents('.modal-container').find('.popover');

	    // Work-around
	    $popover.css('top', parseInt($popover.css('top')) + 10);

	    //$(document).data('LafayetteDssPopover.' + $(this).attr('id') + '.offset.top', $popover.offset().top);

	    // Work-around
	    $(document).data('LafayetteDssPopover.' + $(this).attr('id') + '.offset.top', $popover.offset().top - 11);
	});

	// Refactor
	$('#share-modal-toggle').popover({content: $('#share-modal').html()}).on('shown.bs.popover', function() {

	    var $that = $(this);

	    //$('.auth-container button.close').click(function(e) {
	    $(this).parents('.modal-container').find('.close').click(function(e) {

		//$(this).popover('hide');
		$that.popover('hide');
	    });


	    var $popover = $(this).parents('.modal-container').find('.popover');

	    // Work-around
	    $popover.css('top', parseInt($popover.css('top')) + 10);

	    //$(document).data('LafayetteDssPopover.' + $(this).attr('id') + '.offset.top', $popover.offset().top);

	    // Work-around
	    $(document).data('LafayetteDssPopover.' + $(this).attr('id') + '.offset.top', $popover.offset().top - 11);
	});


	// For the header
	//$('#navbar').affix({
	/*
	$('.navbar-header').affix({

		offset: {

		    top: 30,
			bottom: 5

		}
	    });
	*/

	/*
	$('#navbar-header').on('activate.bs.scrollspy', function () {

		console.log('trace');
	    });
	*/

	/*
	$('.navbar-inner').affix({

		offset: {

		    top: $('.navbar-inner').offset().top,

			/*
		    bottom: function() {

			return $('.navbar-inner').offset().top;
		    }
			* /
		}
	    });
	*/

	$('.navbar-inner').affix({

		offset: {

		    top: $('.navbar-inner').offset().top,
		}
	    });

	//$('.dropdown-submenu').dropdown('toggle').click(function(e) {
	/*
	$('.dropdown-menu li .dropdown-menu').dropdown('toggle').click(function(e) {

		e.preventDefault();
		$(this).dropdown();
	    });
	*/

	/*
	$('.dropdown-menu li .dropdown-menu').each(function(i, e) {

		console.log( $(e));
		$(e).addClass('dropdown-submenu');

		$(e).dropdown('toggle').parent().click(function(e) {

			e.preventDefault();
			$(this).dropdown();
		    });
	    });
	*/

	//$('.dropdown-submenu').dropdown('toggle');
	/*
	$('.dropdown-submenu').on('show.bs.dropdown', function(e) {

		console.log('trace');
	    });
	*/


	$(document).data('LafayetteDssModal.navbar.offset.top', $('.navbar-inner').offset().top);

	$(window).scroll(function() {

	    $('.modal-container > div.popover').each(function(i,e) {

		var toggleId = $('.modal-container > div.popover').parents('.modal-container').find('.modal-toggle').attr('id');
		var offsetTop = $(document).data('LafayetteDssPopover.' + toggleId + '.offset.top');

		var navbarOffsetTop = $('.navbar-inner').offset().top;
		if(! $(document).data('LafayetteDssModal.navbar.offset.top') || $(window).scrollTop() == 0) {

		    $(document).data('LafayetteDssModal.navbar.offset.top', navbarOffsetTop);

		    if( $(window).scrollTop() == 0 ) {

			$(e).css('top', offsetTop );
		    }
		}

		if($(window).scrollTop() < navbarOffsetTop) {

		    $(e).css('top', offsetTop );
		}

		var $navbar = $('.navbar-inner.affix');

		if($navbar.length > 0) {

		    //$(e).css('top', $(e).offset().top + $(window).scrollTop());
		    //$(e).css('top', offsetTop - $(window).scrollTop() - $(document).data('LafayetteDssModal.navbar.offset.top') );
		    //$(e).css('top', offsetTop - $(window).scrollTop());
		    $(e).css('top', offsetTop - $(document).data('LafayetteDssModal.navbar.offset.top'));
		}

	    /*
	    var $navbar = $('.navbar-inner.affix');

	    if($navbar.length > 0) {

		$('.modal-container > div.popover').each(function(i,e) {

		    $(e).css('top', $('.auth-container > div.popover').offset().top - $(document).data('LafayetteDssModal.navbar.offset.top') );
		}
	    }
	    */
	    });
	});

	$(window).resize(function() {

	    if($( window ).width() <= 754 ) {

		// Refactor
		if($('#navbar .navbar-header h1 a').text() != 'DSS') {

		    $(document).data('Drupal.theme.bootstrap.dss', $('#navbar .navbar-header h1 a').text());
		    $('#navbar .navbar-header h1 a').text('DSS');
		}

		$('header#navbar').addClass('navbar-static-width');
	    } else {

		//$(document).data('Drupal.theme.bootstrap.dss', $('#navbar .navbar-header h1 a').text());
		if($('#navbar .navbar-header h1 a').text() == 'DSS') {

		    $('#navbar .navbar-header h1 a').text( $(document).data('Drupal.theme.bootstrap.dss'));
		}

		$('header#navbar').removeClass('navbar-static-width');
	    }
	});

    }

    // Ensure that the execution of all bootstrap functionality lies within a modular, Drupal-compliant context
    Drupal.behaviors.bootstrapDssLdr = {

	attach: function(context, settings) {

	    Drupal.theme('bootstrapDssLdr');
	}
    }
})(jQuery, Drupal);

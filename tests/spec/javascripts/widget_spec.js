/**
 * @file Unit testing for the widget
 *
 */

describe("Example Drupal widget", function() {

    var drupal;

    beforeEach(function() {

	drupal = new Object();
    });

    it("should bind to the DOM", function() {

	expect(true).toBeTruthy();
    });

    describe("when some DOM state is captured by a jQuery Object", function() {

	beforeEach(function() {

	    $('<div id="element"></div>').appendTo($('body'));
	});

	it("should indicate that t(he song is currently paused", function() {

	    expect($('div#element').length).toEqual(1);
	});
    });
});

/**
 * @file Unit testing for the widget
 *
 */

describe("Example Drupal widget", function() {

	beforeEach(function() {

		targetElement = $('body');
		date = new Date(0);
		widget = new Widget($, 'My Widget', { height: '246px', targetElement: targetElement, date: date });
	    });
	
	it("should have a name", function() {

		expect(widget.name).toEqual('My Widget');
	    });
	
	it("should have options", function() {

		expect(widget.options.height).toEqual('246px');
		expect(widget.options.width).toEqual('640px');
	    });

	it("should have a target element", function() {

		expect(widget.options.targetElement).toBe(targetElement);
	    });

	it("should have for a date option a unique object instance", function() {

		// Here, one verifies that this is the same value...
		expect(widget.options.date).toEqual(new Date(0));

		// ...and that this is a unique object:
		expect(widget.options.date).not.toBe(new Date(0));
	    });
    });

/**
 * @file Unit testing for our widget
 *
 */

require('/widget.js');

describe('Our Drupal widget', function() {

        it('can find DOM elements using jQuery', function() {

                expect($('body').length).toEqual(1);
            });
    });

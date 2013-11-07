
/**
 * @file
 * A jQuery UI plug-in based off of the Twitter Bootstrap modal widget
 *
 */

/* =========================================================
 * bootstrap-modal.js v2.3.2
 * http://getbootstrap.com/2.3.2/javascript.html#modals
 * =========================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */


!function ($) {

  "use strict"; // jshint ;_;

 /* MODAL CLASS DEFINITION
  * ====================== */

  var Modal = function (element, options) {

    this.options = options
    this.$element = $(element)
      .delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this))

    if (this.options) this.options.remote && this.$element.find('.modal-body').load(this.options.remote)
  }

  Modal.prototype = {

      constructor: Modal

    , toggle: function () {
        return this[!this.isShown ? 'show' : 'hide']()
      }

    , show: function () {
        var that = this
          , e = $.Event('show')

        this.$element.trigger(e)

        if (this.isShown || e.isDefaultPrevented()) return

        this.isShown = true

        this.escape()

        this.backdrop(function () {
          var transition = $.support.transition && that.$element.hasClass('fade')

          if (!that.$element.parent().length) {
            that.$element.appendTo(document.body) //don't move modals dom position
          }

          that.$element.show()

          if (transition) {
            that.$element[0].offsetWidth // force reflow
          }

          that.$element
            .addClass('in')
            .attr('aria-hidden', false)

          that.enforceFocus()

          transition ?
            that.$element.one($.support.transition.end, function () { that.$element.focus().trigger('shown') }) :
            that.$element.focus().trigger('shown')

        })
      }

    , hide: function (e) {
        e && e.preventDefault()

        var that = this

        e = $.Event('hide')

        this.$element.trigger(e)

        if (!this.isShown || e.isDefaultPrevented()) return

        this.isShown = false

        this.escape()

        $(document).off('focusin.modal')

        this.$element
          .removeClass('in')
          .attr('aria-hidden', true)

        $.support.transition && this.$element.hasClass('fade') ?
          this.hideWithTransition() :
          this.hideModal()
      }

    , enforceFocus: function () {
        var that = this
        $(document).on('focusin.modal', function (e) {
          if (that.$element[0] !== e.target && !that.$element.has(e.target).length) {
            that.$element.focus()
          }
        })
      }

    , escape: function () {
        var that = this
        if (this.isShown && this.options.keyboard) {
          this.$element.on('keyup.dismiss.modal', function ( e ) {
            e.which == 27 && that.hide()
          })
        } else if (!this.isShown) {
          this.$element.off('keyup.dismiss.modal')
        }
      }

    , hideWithTransition: function () {
        var that = this
          , timeout = setTimeout(function () {
              that.$element.off($.support.transition.end)
              that.hideModal()
            }, 500)

        this.$element.one($.support.transition.end, function () {
          clearTimeout(timeout)
          that.hideModal()
        })
      }

    , hideModal: function () {
        var that = this
        this.$element.hide()
        this.backdrop(function () {
          that.removeBackdrop()
          that.$element.trigger('hidden')
        })
      }

    , removeBackdrop: function () {
        this.$backdrop && this.$backdrop.remove()
        this.$backdrop = null
      }

    , backdrop: function (callback) {
        var that = this
          , animate = this.$element.hasClass('fade') ? 'fade' : ''

        if (this.isShown && this.options.backdrop) {
          var doAnimate = $.support.transition && animate

          this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
            .appendTo(document.body)

          this.$backdrop.click(
            this.options.backdrop == 'static' ?
              $.proxy(this.$element[0].focus, this.$element[0])
            : $.proxy(this.hide, this)
          )

          if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

          this.$backdrop.addClass('in')

          if (!callback) return

          doAnimate ?
            this.$backdrop.one($.support.transition.end, callback) :
            callback()

        } else if (!this.isShown && this.$backdrop) {
          this.$backdrop.removeClass('in')

          $.support.transition && this.$element.hasClass('fade')?
            this.$backdrop.one($.support.transition.end, callback) :
            callback()

        } else if (callback) {
          callback()
        }
      }
  }

  /* MODAL PLUGIN DEFINITION
   * ======================= */

  var old = $.fn.modal

  $.fn.modal = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('modal')
        , options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option]()
      else if (options.show) data.show()
    })
  }

  $.fn.modal.defaults = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  $.fn.modal.Constructor = Modal

 /* MODAL NO CONFLICT
  * ================= */

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }

 /* MODAL DATA-API
  * ============== */

  $(document).on('click.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this = $(this)
      , href = $this.attr('href')
      , $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
      , option = $target.data('modal') ? 'toggle' : $.extend({ remote:!/#/.test(href) && href }, $target.data(), $this.data())

    e.preventDefault()

    $target
      .modal(option)
      .one('hide', function () {
        $this.focus()
      })
  });

  /**
   * The Lafayette College DSS Modal class
   *
   * Object constructor
   *
   */
  var LafayetteDssModal = function(element, options) {

      this.options = options;

      // Work-around
      // Refactor
      //this.holdsFocus = false;

      this.$element = $(element)
      .delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this));

      // Work-around
      // Refactor

      $(document).mousedown(function(e) {

	      $(document).data('LafayetteDssModal', {$lastTarget: $(e.target)});
	  });

      if (this.options) this.options.remote && this.$element.find('.modal-body').load(this.options.remote);
  };

  /**
   * Modal Object
   *
   */
  LafayetteDssModal.prototype = {

      constructor: LafayetteDssModal,
      toggle: Modal.prototype.toggle,
      
      /**
       * Overriding the show method
       * @see Modal.show()
       *
       */
      show: function() {

	  var that = this;
	  var e = $.Event('show');

	  this.$element.trigger(e);

	  if (this.isShown || e.isDefaultPrevented()) return;

	  this.isShown = true;
	  
	  this.escape();

	  var transition = $.support.transition && that.$element.hasClass('fade');

	  if(!that.$element.parent().length) {

	      that.$element.appendTo(document.body); //don't move modals dom position
	  }

	  //that.$element.show();

	  /**
	   * Add the non-Bootstrap transition
	   *
	   */

	  //that.$element.hide();

	  /*
	    that.$element
	    .addClass('in')
	    .attr('aria-hidden', false);
	  */

	  that.$element.attr('aria-hidden', false);

	  /**
	   * Integrate with jQuery UI
	   *
	   */
	  that.$element.show('scale', function() {

		  $._data($(this)[0], 'events');

		  // Ensure that the modal is hidden after 3 seconds
		  /*
		  setTimeout(function() {

			  //$( "#effect:visible" ).removeAttr( "style" ).fadeOut();
			  //that.$element.fadeOut();
			  that.hide();
		      }, 3000);
		  */

		  $(this).find('input.form-text:first').focus();

		  // Hide when losing focus
		  //$(this).focusout(function(e) {

		  /**
		   * Work-around
		   * This can only be set after the "hide" method has been explicitly inherited from the Twitter Modal Object
		   * Attempting to implement this within the constructor raises an error, as hide(e) has not yet been appended
		   * @todo Refactor
		   *
		   */
		  $(this)
		      .focusin(function(e) {

			      $(document).data('LafayetteDssModal.focusedModal', that);
			  })
		      .off('focusout')
		      .focusout(function(e) {

			      $(document).data('LafayetteDssModal.focusedModal', null);

			  //e.preventDefault();

			  /*
			  console.log('trace');

			  console.log( $(e.target).parents('#' + $(this).attr('id')));
			  console.log($(e.target).is($(this)));

			  console.log($(e.target));
			  */

			      /*
			      console.log(e);
			      console.log($(e.target));
			      console.log($(e.target).parents('#' + $(this).attr('id') ).length);
			      */

			      /*
			      console.log(window.lastElementClicked);
			      var $clickedElem = $(window.lastElementClicked);
			      */

			      /*
			      console.log($(':focus'));
			      console.log($(':focus').parents('#' + $(this).attr('id') ).length);
			      */

			      /*
			      console.log($clickedElem);
			      console.log($clickedElem.parents('#' + $(this).attr('id') ).length);
			      */

			      /*
			      //if(!$(e.target).is($(this)) && !$(e.target).parents('#' + $(this).attr('id')).length ) {
			      if(!$(':focus').is($(this)) && !$(e.target).parents('#' + $(this).attr('id')).length) {

				  console.log('trace');
				  //that.hide();

				  // Ensure that the modal is hidden after 3 seconds
				  setTimeout(function() {
					  
					  if( !$(':focus').is($(this)) && !$(e.target).parents('#' + $(this).attr('id')).length) {

					      //that.hide();
					      console.log('trace');
					  }
				      }, 3000);
			      }
			      */
			      /*
				} else {
				
				console.log($(e.target));
				console.log($(this));
				}
			      */

			      console.log($(document).data('LafayetteDssModal').$lastTarget);
			      
			      // Ensure that the modal is hidden after 3 seconds
			      setTimeout(function() {

				      var focusedModal = $(document).data('LafayetteDssModal.focusedModal');

				      if(focusedModal) {

					  // Ensure that the last element clicked does not lie within a modal...
					  if(!$(document).data('LafayetteDssModal').$lastTarget.is($(this)) &&
					     !$(document).data('LafayetteDssModal').$lastTarget.parents('#' + focusedModal.$element.attr('id')).length ) {
					      
					      that.hide();
					  }
				      } else {

					  that.hide();
				      }
				  }, 3000);
			  });
	      });

	  that.$element.addClass('shown');
	  if(transition) {

	      that.$element[0].offsetWidth; // force reflow
	  }

	  //that.$element.attr('aria-hidden', false).show('scale');

	  /*
	    that.$element
	    .css('top', '20%')
	    .show('scale');
	  */

	  that.enforceFocus();

	  transition ?
	  that.$element.one($.support.transition.end, function () { that.$element.focus().trigger('shown') }) :
	  that.$element.focus().trigger('shown');

	  /*
	  this.backdrop(function() {

		  var transition = $.support.transition && that.$element.hasClass('fade');

		  if(!that.$element.parent().length) {

		      that.$element.appendTo(document.body); //don't move modals dom position
		  }

		  that.$element.show();

		  if (transition) {

		      that.$element[0].offsetWidth; // force reflow
		  }

		  /**
		   * Add the non-Bootstrap transition
		   *
		   */

		  //that.$element.hide();

		  /*
		  that.$element
		      .addClass('in')
		      .attr('aria-hidden', false);
		  * /

		  that.$element.attr('aria-hidden', false);
		  that.$element.show('scale');

		  //that.$element.attr('aria-hidden', false).show('scale');

		  /*
		  that.$element
		      .css('top', '20%')
		      .show('scale');
		  * /

		  that.enforceFocus();

		  transition ?
		      that.$element.one($.support.transition.end, function () { that.$element.focus().trigger('shown') }) :
		      that.$element.focus().trigger('shown');
	      });

		  */
      },

      /**
       * Overriding the hide method
       * @see Modal.hide()
       */
      hide: function(e) {

	  e && e.preventDefault();

	  var that = this;

	  e = $.Event('hide');

	  this.$element.trigger(e);

	  if (!this.isShown || e.isDefaultPrevented()) return;

	  this.isShown = false;

	  this.escape();

	  $(document).off('focusin.modal');

	  // Work-around for losing focus
	  this.$element.off('focusout');

	  /**
	   * Updating the Document state
	   * @todo Refactor for race conditions
	   *
	   */
	  if($(document).data('LafayetteDssModal.focusedModal') == that) {

	      $(document).data('LafayetteDssModal.focusedModal', null);
	  }

	  this.$element
          .removeClass('in')
          .attr('aria-hidden', true);

	  $.support.transition && this.$element.hasClass('fade') ? this.hideWithTransition() : this.hideModal();
      },

      enforceFocus: Modal.prototype.enforceFocus,
      escape: Modal.prototype.escape,

      /**
       * Overriding the hideWithTransition method
       * @see Modal.hideWithTransition()
       *
       */
      hideWithTransition: function() {

	  var that = this;
	  var timeout = setTimeout(function () {

		  that.$element.off($.support.transition.end)
		  that.hideModal()
	      }, 500);

	  this.$element.one($.support.transition.end, function() {

		  clearTimeout(timeout);
		  that.hideModal();
	      });
      },

      //hideModal: Modal.prototype.hideModal,

      /**
       * Overriding the hideWithTransition method
       * @see Modal.hideModal()
       *
       */
      hideModal: function() {

	  var that = this;

	  this.$element.hide('scale');

	  this.backdrop(function () {

		  that.removeBackdrop();
		  that.$element.trigger('hidden');
	      });
      },

      removeBackdrop: Modal.prototype.removeBackdrop,
      backdrop: Modal.prototype.backdrop,
  };

  // MODAL PLUGIN DEFINITION
  // =======================

  var old = $.fn.lafayetteDssModal;

  $.fn.lafayetteDssModal = function(option, _relatedTarget) {

      return this.each(function() {

	      var $this   = $(this);
	      var data    = $this.data('bs.modal');
	      var options = $.extend({}, $.fn.lafayetteDssModal.defaults, $this.data(), typeof option == 'object' && option);

	      if (!data) $this.data('bs.modal', (data = new LafayetteDssModal(this, options)));

	      console.log(option);

	      if (typeof option == 'string') {

		  data[option](_relatedTarget);
	      } else if (options.show) {

		  data.show(_relatedTarget);
	      }
	  });
  };

  /**
   * Default values for the plug-in
   *
   */
  $.fn.lafayetteDssModal.defaults = {

      backdrop: true,
      keyboard: true,
      show: true
  };

  $.fn.lafayetteDssModal.Constructor = LafayetteDssModal;

  // MODAL NO CONFLICT
  // =================

  $.fn.lafayetteDssModal.noConflict = function() {

      $.fn.lafayetteDssModal = old;
      return this;
  };

  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="lafayette-dss-modal"]', function(e) {

	  var $this   = $(this);
	  var href    = $this.attr('href');
	  var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))); //strip for ie7
	  var option  = $target.data('modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data());

	  e.preventDefault();

	  $target.lafayetteDssModal(option, this);
      });

}(window.jQuery);

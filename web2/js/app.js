/*!
 * Bootstrap v3.3.5 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

/*!
 * Generated using the Bootstrap Customizer (http://getbootstrap.com/customize/?id=4d6ed1c7b67ee5183a59)
 * Config saved to config.json and https://gist.github.com/4d6ed1c7b67ee5183a59
 */
if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}
+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.5
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.5'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.5
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.5'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"]') || $(e.target).is('input[type="checkbox"]'))) e.preventDefault()
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.5
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.5'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.5
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.5'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.5
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.5'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element
        .removeAttr('aria-describedby')
        .trigger('hidden.bs.' + that.type)
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.5
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.5'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.5
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.5'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.5
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.5'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.5
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){var d=a("./core");a("../lib/CollectionGroup"),a("../lib/View"),a("../lib/Highchart"),a("../lib/Persist"),a("../lib/Document"),a("../lib/Overview"),a("../lib/Grid"),a("../lib/NodeApiClient"),a("../lib/BinaryLog");"undefined"!=typeof window&&(window.ForerunnerDB=d),b.exports=d},{"../lib/BinaryLog":4,"../lib/CollectionGroup":7,"../lib/Document":11,"../lib/Grid":13,"../lib/Highchart":14,"../lib/NodeApiClient":30,"../lib/Overview":33,"../lib/Persist":35,"../lib/View":42,"./core":2}],2:[function(a,b,c){var d=a("../lib/Core");a("../lib/Shim.IE8");"undefined"!=typeof window&&(window.ForerunnerDB=d),b.exports=d},{"../lib/Core":9,"../lib/Shim.IE8":41}],3:[function(a,b,c){"use strict";var d,e=a("./Shared"),f=a("./Path"),g=function(a){this._primaryKey="_id",this._keyArr=[],this._data=[],this._objLookup={},this._count=0,this._keyArr=d.parse(a,!0)};e.addModule("ActiveBucket",g),e.mixin(g.prototype,"Mixin.Sorting"),d=new f,e.synthesize(g.prototype,"primaryKey"),g.prototype.qs=function(a,b,c,d){if(!b.length)return 0;for(var e,f,g,h=-1,i=0,j=b.length-1;j>=i&&(e=Math.floor((i+j)/2),h!==e);)f=b[e],void 0!==f&&(g=d(this,a,c,f),g>0&&(i=e+1),g<0&&(j=e-1)),h=e;return g>0?e+1:e},g.prototype._sortFunc=function(a,b,c,e){var f,g,h,i=c.split(".:."),j=e.split(".:."),k=a._keyArr,l=k.length;for(f=0;f<l;f++)if(g=k[f],h=typeof d.get(b,g.path),"number"===h&&(i[f]=Number(i[f]),j[f]=Number(j[f])),i[f]!==j[f]){if(1===g.value)return a.sortAsc(i[f],j[f]);if(g.value===-1)return a.sortDesc(i[f],j[f])}},g.prototype.insert=function(a){var b,c;return b=this.documentKey(a),c=this._data.indexOf(b),c===-1?(c=this.qs(a,this._data,b,this._sortFunc),this._data.splice(c,0,b)):this._data.splice(c,0,b),this._objLookup[a[this._primaryKey]]=b,this._count++,c},g.prototype.remove=function(a){var b,c;return b=this._objLookup[a[this._primaryKey]],b?(c=this._data.indexOf(b),c>-1?(this._data.splice(c,1),delete this._objLookup[a[this._primaryKey]],this._count--,c):c):-1},g.prototype.index=function(a){var b,c;return b=this.documentKey(a),c=this._data.indexOf(b),c===-1&&(c=this.qs(a,this._data,b,this._sortFunc)),c},g.prototype.documentKey=function(a){var b,c,e,f="",g=this._keyArr,h=g.length;for(c=0;c<h;c++)e=g[c],f&&(f+=".:."),b=d.get(a,e.path),f+=void 0!==b?b:"0";return f+=".:."+a[this._primaryKey]},g.prototype.count=function(){return this._count},e.finishModule("ActiveBucket"),b.exports=g},{"./Path":34,"./Shared":40}],4:[function(a,b,c){"use strict";var d,e,f,g,h,i,j;d=a("./Shared"),j=function(){this.init.apply(this,arguments)},j.prototype.init=function(a){var b=this;b._logCounter=0,b._parent=a,b.size(1e3)},d.addModule("BinaryLog",j),d.mixin(j.prototype,"Mixin.Common"),d.mixin(j.prototype,"Mixin.ChainReactor"),d.mixin(j.prototype,"Mixin.Events"),f=d.modules.Collection,h=d.modules.Db,e=d.modules.ReactorIO,g=f.prototype.init,i=h.prototype.init,d.synthesize(j.prototype,"name"),d.synthesize(j.prototype,"size"),j.prototype.attachIO=function(){var a=this;a._io||(a._log=new f(a._parent.name()+"-BinaryLog",{capped:!0,size:a.size()}),a._log.objectId=function(b){return b||(b=++a._logCounter),b},a._io=new e(a._parent,a,function(b){return a._log.insert({type:b.type,data:b.data}),!1}))},j.prototype.detachIO=function(){var a=this;a._io&&(a._log.drop(),a._io.drop(),delete a._log,delete a._io)},f.prototype.init=function(){g.apply(this,arguments),this._binaryLog=new j(this)},d.finishModule("BinaryLog"),b.exports=j},{"./Shared":40}],5:[function(a,b,c){"use strict";var d=a("./Shared"),e=a("./Path"),f=new e,g=function(a,b,c){this.init.apply(this,arguments)};g.prototype.init=function(a,b,c,d,e){this._store=[],this._keys=[],void 0!==c&&this.primaryKey(c),void 0!==b&&this.index(b),void 0!==d&&this.compareFunc(d),void 0!==e&&this.hashFunc(e),void 0!==a&&this.data(a)},d.addModule("BinaryTree",g),d.mixin(g.prototype,"Mixin.ChainReactor"),d.mixin(g.prototype,"Mixin.Sorting"),d.mixin(g.prototype,"Mixin.Common"),d.synthesize(g.prototype,"compareFunc"),d.synthesize(g.prototype,"hashFunc"),d.synthesize(g.prototype,"indexDir"),d.synthesize(g.prototype,"primaryKey"),d.synthesize(g.prototype,"keys"),d.synthesize(g.prototype,"index",function(a){return void 0!==a&&(this.debug()&&console.log("Setting index",a,f.parse(a,!0)),this.keys(f.parse(a,!0))),this.$super.call(this,a)}),g.prototype.clear=function(){delete this._data,delete this._left,delete this._right,this._store=[]},g.prototype.data=function(a){return void 0!==a?(this._data=a,this._hashFunc&&(this._hash=this._hashFunc(a)),this):this._data},g.prototype.push=function(a){return void 0!==a&&(this._store.push(a),this)},g.prototype.pull=function(a){if(void 0!==a){var b=this._store.indexOf(a);if(b>-1)return this._store.splice(b,1),this}return!1},g.prototype._compareFunc=function(a,b){var c,d,e=0;for(c=0;c<this._keys.length;c++)if(d=this._keys[c],1===d.value?e=this.sortAscIgnoreUndefined(f.get(a,d.path),f.get(b,d.path)):d.value===-1&&(e=this.sortDescIgnoreUndefined(f.get(a,d.path),f.get(b,d.path))),this.debug()&&console.log("Compared %s with %s order %d in path %s and result was %d",f.get(a,d.path),f.get(b,d.path),d.value,d.path,e),0!==e)return this.debug()&&console.log("Retuning result %d",e),e;return this.debug()&&console.log("Retuning result %d",e),e},g.prototype._hashFunc=function(a){return a[this._keys[0].path]},g.prototype.removeChildNode=function(a){this._left===a?delete this._left:this._right===a&&delete this._right},g.prototype.nodeBranch=function(a){return this._left===a?"left":this._right===a?"right":void 0},g.prototype.insert=function(a){var b,c,d,e;if(a instanceof Array){for(c=[],d=[],e=0;e<a.length;e++)this.insert(a[e])?c.push(a[e]):d.push(a[e]);return{inserted:c,failed:d}}return this.debug()&&console.log("Inserting",a),this._data?(b=this._compareFunc(this._data,a),0===b?(this.debug()&&console.log("Data is equal (currrent, new)",this._data,a),this._left?this._left.insert(a):(this._left=new g(a,this._index,this._binaryTree,this._compareFunc,this._hashFunc),this._left._parent=this),!0):b===-1?(this.debug()&&console.log("Data is greater (currrent, new)",this._data,a),this._right?this._right.insert(a):(this._right=new g(a,this._index,this._binaryTree,this._compareFunc,this._hashFunc),this._right._parent=this),!0):1===b&&(this.debug()&&console.log("Data is less (currrent, new)",this._data,a),this._left?this._left.insert(a):(this._left=new g(a,this._index,this._binaryTree,this._compareFunc,this._hashFunc),this._left._parent=this),!0)):(this.debug()&&console.log("Node has no data, setting data",a),this.data(a),!0)},g.prototype.remove=function(a){var b,c,d,e=this.primaryKey();if(a instanceof Array){for(c=[],d=0;d<a.length;d++)this.remove(a[d])&&c.push(a[d]);return c}return this.debug()&&console.log("Removing",a),this._data[e]===a[e]?this._remove(this):(b=this._compareFunc(this._data,a),b===-1&&this._right?this._right.remove(a):!(1!==b||!this._left)&&this._left.remove(a))},g.prototype._remove=function(a){var b,c;return this._left?(b=this._left,c=this._right,this._left=b._left,this._right=b._right,this._data=b._data,this._store=b._store,c&&(b.rightMost()._right=c)):this._right?(c=this._right,this._left=c._left,this._right=c._right,this._data=c._data,this._store=c._store):this.clear(),!0},g.prototype.leftMost=function(){return this._left?this._left.leftMost():this},g.prototype.rightMost=function(){return this._right?this._right.rightMost():this},g.prototype.lookup=function(a,b,c,d){var e=this._compareFunc(this._data,a);return d=d||[],0===e&&(this._left&&this._left.lookup(a,b,c,d),d.push(this._data),this._right&&this._right.lookup(a,b,c,d)),e===-1&&this._right&&this._right.lookup(a,b,c,d),1===e&&this._left&&this._left.lookup(a,b,c,d),d},g.prototype.inOrder=function(a,b){switch(b=b||[],this._left&&this._left.inOrder(a,b),a){case"hash":b.push(this._hash);break;case"data":b.push(this._data);break;default:b.push({key:this._data,arr:this._store})}return this._right&&this._right.inOrder(a,b),b},g.prototype.startsWith=function(a,b,c,d){var e,g,h=f.get(this._data,a),i=h.substr(0,b.length);return d=d||[],void 0===d._visitedCount&&(d._visitedCount=0),d._visitedCount++,d._visitedNodes=d._visitedNodes||[],d._visitedNodes.push(h),g=this.sortAscIgnoreUndefined(i,b),e=i===b,0===g&&(this._left&&this._left.startsWith(a,b,c,d),e&&d.push(this._data),this._right&&this._right.startsWith(a,b,c,d)),g===-1&&(e&&d.push(this._data),this._right&&this._right.startsWith(a,b,c,d)),1===g&&(this._left&&this._left.startsWith(a,b,c,d),e&&d.push(this._data)),d},g.prototype.findRange=function(a,b,c,d,f,g){f=f||[],g=g||new e(b),this._left&&this._left.findRange(a,b,c,d,f,g);var h=g.value(this._data),i=this.sortAscIgnoreUndefined(h,c),j=this.sortAscIgnoreUndefined(h,d);if(!(0!==i&&1!==i||0!==j&&j!==-1))switch(a){case"hash":f.push(this._hash);break;case"data":f.push(this._data);break;default:f.push({key:this._data,arr:this._store})}return this._right&&this._right.findRange(a,b,c,d,f,g),f},g.prototype.match=function(a,b,c){var d,e,g,h=[],i=0;for(d=f.parseArr(this._index,{verbose:!0}),e=f.parseArr(a,c&&c.pathOptions?c.pathOptions:{ignore:/\$/,verbose:!0}),g=0;g<d.length;g++)e[g]===d[g]&&(i++,h.push(e[g]));return{matchedKeys:h,totalKeyCount:e.length,score:i}},d.finishModule("BinaryTree"),b.exports=g},{"./Path":34,"./Shared":40}],6:[function(a,b,c){"use strict";var d,e,f,g,h,i,j,k,l,m,n,o;d=a("./Shared");var p=function(a,b){this.init.apply(this,arguments)};p.prototype.init=function(a,b){b=b||{},this.sharedPathSolver=o,this._primaryKey=b.primaryKey||"_id",this._primaryIndex=new g("primary",{primaryKey:this.primaryKey()}),this._primaryCrc=new g("primaryCrc",{primaryKey:this.primaryKey()}),this._crcLookup=new g("crcLookup",{primaryKey:this.primaryKey()}),this._name=a,this._data=[],this._metrics=new f,this._options=b||{changeTimestamp:!1},this._options.db&&this.db(this._options.db),this._metaData={},this._deferQueue={insert:[],update:[],remove:[],upsert:[],async:[]},this._deferThreshold={insert:100,update:100,remove:100,upsert:100},this._deferTime={insert:1,update:1,remove:1,upsert:1},this._deferredCalls=!0,this.subsetOf(this)},d.addModule("Collection",p),d.mixin(p.prototype,"Mixin.Common"),d.mixin(p.prototype,"Mixin.Events"),d.mixin(p.prototype,"Mixin.ChainReactor"),d.mixin(p.prototype,"Mixin.CRUD"),d.mixin(p.prototype,"Mixin.Constants"),d.mixin(p.prototype,"Mixin.Triggers"),d.mixin(p.prototype,"Mixin.Sorting"),d.mixin(p.prototype,"Mixin.Matching"),d.mixin(p.prototype,"Mixin.Updating"),d.mixin(p.prototype,"Mixin.Tags"),f=a("./Metrics"),g=a("./KeyValueStore"),h=a("./Path"),i=a("./IndexHashMap"),j=a("./IndexBinaryTree"),k=a("./Index2d"),e=d.modules.Db,l=a("./Overload"),m=a("./ReactorIO"),n=a("./Condition"),o=new h,d.synthesize(p.prototype,"deferredCalls"),d.synthesize(p.prototype,"state"),d.synthesize(p.prototype,"name"),d.synthesize(p.prototype,"metaData"),d.synthesize(p.prototype,"capped"),d.synthesize(p.prototype,"cappedSize"),p.prototype._asyncPending=function(a){this._deferQueue.async.push(a)},p.prototype._asyncComplete=function(a){for(var b=this._deferQueue.async.indexOf(a);b>-1;)this._deferQueue.async.splice(b,1),b=this._deferQueue.async.indexOf(a);0===this._deferQueue.async.length&&this.deferEmit("ready")},p.prototype.data=function(){return this._data},p.prototype.drop=function(a){var b;if(this.isDropped())return a&&a.call(this,!1,!0),!0;if(this._db&&this._db._collection&&this._name){if(this.debug()&&console.log(this.logIdentifier()+" Dropping"),this._state="dropped",this.emit("drop",this),delete this._db._collection[this._name],this._collate)for(b in this._collate)this._collate.hasOwnProperty(b)&&this.collateRemove(b);return delete this._primaryKey,delete this._primaryIndex,delete this._primaryCrc,delete this._crcLookup,delete this._data,delete this._metrics,delete this._listeners,a&&a.call(this,!1,!0),!0}return a&&a.call(this,!1,!0),!1},p.prototype.primaryKey=function(a){if(void 0!==a){if(this._primaryKey!==a){var b=this._primaryKey;this._primaryKey=a,this._primaryIndex.primaryKey(a),this.rebuildPrimaryKeyIndex(),this.chainSend("primaryKey",{keyName:a,oldData:b})}return this}return this._primaryKey},p.prototype._onInsert=function(a,b){this.emit("insert",a,b)},p.prototype._onUpdate=function(a){this.emit("update",a)},p.prototype._onRemove=function(a){this.emit("remove",a)},p.prototype._onChange=function(){this._options.changeTimestamp&&(this._metaData.lastChange=this.serialiser.convert(new Date))},d.synthesize(p.prototype,"db",function(a){return a&&"_id"===this.primaryKey()&&(this.primaryKey(a.primaryKey()),this.debug(a.debug())),this.$super.apply(this,arguments)}),d.synthesize(p.prototype,"mongoEmulation"),p.prototype.setData=new l("Collection.prototype.setData",{"*":function(a){return this.$main.call(this,a,{})},"*, object":function(a,b){return this.$main.call(this,a,b)},"*, function":function(a,b){return this.$main.call(this,a,{},b)},"*, *, function":function(a,b,c){return this.$main.call(this,a,b,c)},"*, *, *":function(a,b,c){return this.$main.call(this,a,b,c)},$main:function(a,b,c){if(this.isDropped())throw this.logIdentifier()+" Cannot operate in a dropped state!";if(a){var d=this.deferredCalls(),e=[].concat(this._data);this.deferredCalls(!1),b=this.options(b),b.$decouple&&(a=this.decouple(a)),a instanceof Array||(a=[a]),this.remove({}),this.insert(a),this.deferredCalls(d),this._onChange(),this.emit("setData",this._data,e)}return c&&c.call(this),this}}),p.prototype.rebuildPrimaryKeyIndex=function(a){a=a||{$ensureKeys:void 0,$violationCheck:void 0};var b,c,d,e,f=!a||void 0===a.$ensureKeys||a.$ensureKeys,g=!a||void 0===a.$violationCheck||a.$violationCheck,h=this._primaryIndex,i=this._primaryCrc,j=this._crcLookup,k=this._primaryKey;for(h.truncate(),i.truncate(),j.truncate(),b=this._data,c=b.length;c--;){if(d=b[c],f&&this.ensurePrimaryKey(d),g){if(!h.uniqueSet(d[k],d))throw this.logIdentifier()+" Call to setData on collection failed because your data violates the primary key unique constraint. One or more documents are using the same primary key: "+d[this._primaryKey]}else h.set(d[k],d);e=this.hash(d),i.set(d[k],e),j.set(e,d)}},p.prototype.ensurePrimaryKey=function(a){void 0===a[this._primaryKey]&&(a[this._primaryKey]=this.objectId())},p.prototype.truncate=function(){var a;if(this.isDropped())throw this.logIdentifier()+" Cannot operate in a dropped state!";this.emit("truncate",this._data),this._data.length=0,this._primaryIndex=new g("primary",{primaryKey:this.primaryKey()}),this._primaryCrc=new g("primaryCrc",{primaryKey:this.primaryKey()}),this._crcLookup=new g("crcLookup",{primaryKey:this.primaryKey()});for(a in this._indexByName)this._indexByName.hasOwnProperty(a)&&this._indexByName[a].rebuild();return this._onChange(),this.emit("immediateChange",{type:"truncate"}),this.deferEmit("change",{type:"truncate"}),this},p.prototype.upsert=function(a,b){if(this.isDropped())throw this.logIdentifier()+" Cannot operate in a dropped state!";if(a){var c,d,e=this._deferQueue.upsert,f=this._deferThreshold.upsert,g={};if(a instanceof Array){if(this._deferredCalls&&a.length>f)return this._deferQueue.upsert=e.concat(a),this._asyncPending("upsert"),this.processQueue("upsert",b),{};for(g=[],d=0;d<a.length;d++)g.push(this.upsert(a[d])[0]);return b&&b.call(this,g),g}switch(a[this._primaryKey]?(c={},c[this._primaryKey]=a[this._primaryKey],this._primaryIndex.lookup(c)[0]?g.op="update":g.op="insert"):g.op="insert",g.op){case"insert":g.result=this.insert(a,b);break;case"update":g.result=this.update(c,a,{},b)}return b&&b.call(this,[g]),[g]}return b&&b.call(this,{op:"none"}),{}},p.prototype.filter=function(a,b,c){var d;return"function"==typeof a&&(c=a,a={},b={}),"function"==typeof b&&(c&&(d=c),c=b,b=d||{}),this.find(a,b).filter(c)},p.prototype.filterUpdate=function(a,b,c){var d,e,f,g,h=this.find(a,c),i=[],j=this.primaryKey();for(g=0;g<h.length;g++)d=h[g],f=b(d),f&&(e={},e[j]=d[j],i.push(this.update(e,f)));return i},p.prototype.update=function(a,b,c,d){if(this.isDropped())throw this.logIdentifier()+" Cannot operate in a dropped state!";return this.mongoEmulation()?(this.convertToFdb(a),this.convertToFdb(b)):b=this.decouple(b),b.$replace&&(c=c||{},c.$replace=!0,b=b.$replace),b=this.transformIn(b),this._handleUpdate(a,b,c,d)},p.prototype._handleUpdate=function(a,b,c,d){var e,f,g=this,h=this._metrics.create("update"),i=function(d){var e,f,i,j=g.decouple(d);return g.willTrigger(g.TYPE_UPDATE,g.PHASE_BEFORE)||g.willTrigger(g.TYPE_UPDATE,g.PHASE_AFTER)?(e=g.decouple(d),f={type:"update",query:g.decouple(a),update:g.decouple(b),options:g.decouple(c),op:h},i=g.updateObject(e,f.update,f.query,f.options,""),g.processTrigger(f,g.TYPE_UPDATE,g.PHASE_BEFORE,d,e)!==!1?(g._removeFromIndexes(d),i=g.updateObject(d,e,f.query,f.options,""),g._insertIntoIndexes(d),g.processTrigger(f,g.TYPE_UPDATE,g.PHASE_AFTER,j,e)):i=!1):(g._removeFromIndexes(d),i=g.updateObject(d,b,a,c,""),g._insertIntoIndexes(d)),i};return h.start(),h.time("Retrieve documents to update"),e=this.find(a,{$decouple:!1}),h.time("Retrieve documents to update"),e.length?(h.time("Update documents"),f=e.filter(i),h.time("Update documents"),f.length?(this.debug()&&console.log(this.logIdentifier()+" Updated some data"),h.time("Resolve chains"),this.chainWillSend()&&this.chainSend("update",{query:a,update:b,dataSet:this.decouple(f)},c),h.time("Resolve chains"),this._onUpdate(f),this._onChange(),d&&d.call(this,f||[]),this.emit("immediateChange",{type:"update",data:f}),this.deferEmit("change",{type:"update",data:f})):d&&d.call(this,f||[])):d&&d.call(this,f||[]),h.stop(),f||[]},p.prototype._replaceObj=function(a,b){var c;this._removeFromIndexes(a);for(c in a)a.hasOwnProperty(c)&&delete a[c];for(c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);if(!this._insertIntoIndexes(a))throw this.logIdentifier()+" Primary key violation in update! Key violated: "+a[this._primaryKey];return this},p.prototype.updateById=function(a,b,c,d){var e,f={};return f[this._primaryKey]=a,d&&(e=function(a){d(a[0])}),this.update(f,b,c,e)[0]},p.prototype.updateObject=function(a,b,c,d,e,f){b=this.decouple(b),e=e||"","."===e.substr(0,1)&&(e=e.substr(1,e.length-1));var g,i,j,k,l,m,n,o,p,q,r,s,t=!1,u=!1;if(d&&d.$replace===!0){g=!0,n=b,o=this.primaryKey();for(m in a)a.hasOwnProperty(m)&&m!==o&&void 0===n[m]&&(this._updateUnset(a,m),t=!0);for(m in n)n.hasOwnProperty(m)&&m!==o&&(this._updateOverwrite(a,m,n[m]),t=!0);return t}for(s in b)if(b.hasOwnProperty(s)){if(g=!1,!g&&"$"===s.substr(0,1))switch(s){case"$key":case"$index":case"$data":case"$min":case"$max":g=!0;break;case"$each":for(g=!0,k=b.$each.length,j=0;j<k;j++)u=this.updateObject(a,b.$each[j],c,d,e),u&&(t=!0);t=t||u;break;case"$replace":g=!0,n=b.$replace,o=this.primaryKey();for(m in a)a.hasOwnProperty(m)&&m!==o&&void 0===n[m]&&(this._updateUnset(a,m),t=!0);for(m in n)n.hasOwnProperty(m)&&m!==o&&(this._updateOverwrite(a,m,n[m]),t=!0);break;case"$overwrite":case"$inc":case"$push":case"$splicePush":case"$splicePull":case"$addToSet":case"$pull":case"$pop":case"$move":case"$cast":case"$unset":case"$pullAll":case"$mul":case"$rename":case"$toggle":g=!0,u=this.updateObject(a,b[s],c,d,e,s),t=t||u;break;default:g=!1}if(!g&&this._isPositionalKey(s)&&(g=!0,s=s.substr(0,s.length-2),p=new h(e+"."+s),a[s]&&a[s]instanceof Array&&a[s].length)){for(i=[],j=0;j<a[s].length;j++)this._match(a[s][j],p.value(c)[0],d,"",{})&&i.push(j);for(j=0;j<i.length;j++)u=this.updateObject(a[s][i[j]],b[s+".$"],c,d,e+"."+s,f),t=t||u}if(!g)if(f||"object"!=typeof b[s])switch(f){case"$inc":var v=!0;b[s]>0?b.$max&&a[s]>=b.$max&&(v=!1):b[s]<0&&b.$min&&a[s]<=b.$min&&(v=!1),v&&(this._updateIncrement(a,s,b[s]),t=!0);break;case"$cast":switch(b[s]){case"array":a[s]instanceof Array||(this._updateProperty(a,s,b.$data||[]),t=!0);break;case"object":a[s]instanceof Object&&!(a[s]instanceof Array)||(this._updateProperty(a,s,b.$data||{}),t=!0);break;case"number":"number"!=typeof a[s]&&(this._updateProperty(a,s,Number(a[s])),t=!0);break;case"string":"string"!=typeof a[s]&&(this._updateProperty(a,s,String(a[s])),t=!0);break;default:throw this.logIdentifier()+" Cannot update cast to unknown type: "+b[s]}break;case"$push":if(void 0===a[s]&&this._updateProperty(a,s,[]),!(a[s]instanceof Array))throw this.logIdentifier()+" Cannot push to a key that is not an array! ("+s+")";if(void 0!==b[s].$position&&b[s].$each instanceof Array)for(l=b[s].$position,k=b[s].$each.length,j=0;j<k;j++)this._updateSplicePush(a[s],l+j,b[s].$each[j]);else if(b[s].$each instanceof Array)for(k=b[s].$each.length,j=0;j<k;j++)this._updatePush(a[s],b[s].$each[j]);else this._updatePush(a[s],b[s]);t=!0;break;case"$pull":if(a[s]instanceof Array){for(i=[],j=0;j<a[s].length;j++)this._match(a[s][j],b[s],d,"",{})&&i.push(j);for(k=i.length;k--;)this._updatePull(a[s],i[k]),t=!0}break;case"$pullAll":if(a[s]instanceof Array){if(!(b[s]instanceof Array))throw this.logIdentifier()+" Cannot pullAll without being given an array of values to pull! ("+s+")";if(i=a[s],k=i.length,k>0)for(;k--;){for(l=0;l<b[s].length;l++)i[k]===b[s][l]&&(this._updatePull(a[s],k),k--,t=!0);if(k<0)break}}break;case"$addToSet":if(void 0===a[s]&&this._updateProperty(a,s,[]),!(a[s]instanceof Array))throw this.logIdentifier()+" Cannot addToSet on a key that is not an array! ("+s+")";var w,x,y,z,A=a[s],B=A.length,C=!0,D=d&&d.$addToSet;for(b[s].$key?(y=!1,z=new h(b[s].$key),x=z.value(b[s])[0],delete b[s].$key):D&&D.key?(y=!1,z=new h(D.key),x=z.value(b[s])[0]):(x=this.jStringify(b[s]),y=!0),w=0;w<B;w++)if(y){if(this.jStringify(A[w])===x){C=!1;break}}else if(x===z.value(A[w])[0]){C=!1;break}C&&(this._updatePush(a[s],b[s]),t=!0);break;case"$splicePush":if(void 0===a[s]&&this._updateProperty(a,s,[]),!(a[s]instanceof Array))throw this.logIdentifier()+" Cannot splicePush with a key that is not an array! ("+s+")";if(l=b.$index,void 0===l)throw this.logIdentifier()+" Cannot splicePush without a $index integer value!";delete b.$index,l>a[s].length&&(l=a[s].length),this._updateSplicePush(a[s],l,b[s]),t=!0;break;case"$splicePull":if(void 0!==a[s]){if(!(a[s]instanceof Array))throw this.logIdentifier()+" Cannot splicePull from a key that is not an array! ("+s+")";if(l=b[s].$index,void 0===l)throw this.logIdentifier()+" Cannot splicePull without a $index integer value!";l<a[s].length&&(this._updateSplicePull(a[s],l),t=!0)}break;case"$move":if(!(a[s]instanceof Array))throw this.logIdentifier()+" Cannot move on a key that is not an array! ("+s+")";for(j=0;j<a[s].length;j++)if(this._match(a[s][j],b[s],d,"",{})){var E=b.$index;if(void 0===E)throw this.logIdentifier()+" Cannot move without a $index integer value!";delete b.$index,this._updateSpliceMove(a[s],j,E),t=!0;break}break;case"$mul":this._updateMultiply(a,s,b[s]),t=!0;break;case"$rename":this._updateRename(a,s,b[s]),t=!0;break;case"$overwrite":this._updateOverwrite(a,s,b[s]),t=!0;break;case"$unset":this._updateUnset(a,s),t=!0;break;case"$clear":this._updateClear(a,s),t=!0;break;case"$pop":if(!(a[s]instanceof Array))throw this.logIdentifier()+" Cannot pop from a key that is not an array! ("+s+")";this._updatePop(a[s],b[s])&&(t=!0);break;case"$toggle":this._updateProperty(a,s,!a[s]),t=!0;break;default:a[s]!==b[s]&&(this._updateProperty(a,s,b[s]),t=!0)}else if(null!==a[s]&&"object"==typeof a[s])if(q=a[s]instanceof Array,r=b[s]instanceof Array,q||r)if(!r&&q)for(j=0;j<a[s].length;j++)u=this.updateObject(a[s][j],b[s],c,d,e+"."+s,f),t=t||u;else a[s]!==b[s]&&(this._updateProperty(a,s,b[s]),t=!0);else a[s]instanceof Date?(this._updateProperty(a,s,b[s]),t=!0):(u=this.updateObject(a[s],b[s],c,d,e+"."+s,f),t=t||u);else a[s]!==b[s]&&(this._updateProperty(a,s,b[s]),t=!0)}return t},p.prototype._isPositionalKey=function(a){return".$"===a.substr(a.length-2,2)},p.prototype.remove=function(a,b,c){if(this.isDropped())throw this.logIdentifier()+" Cannot operate in a dropped state!";var d,e,f,g,h,i,j,k,l=this;if("function"==typeof b&&(c=b,b={}),this.mongoEmulation()&&this.convertToFdb(a),a instanceof Array){for(g=[],f=0;f<a.length;f++)g.push(this.remove(a[f],{noEmit:!0}));return(!b||b&&!b.noEmit)&&this._onRemove(g),c&&c.call(this,!1,g),g}if(g=[],d=this.find(a,{$decouple:!1}),d.length){h=function(a){l._removeFromIndexes(a),e=l._data.indexOf(a),l._dataRemoveAtIndex(e),g.push(a)};for(var m=0;m<d.length;m++)j=d[m],l.willTrigger(l.TYPE_REMOVE,l.PHASE_BEFORE)||l.willTrigger(l.TYPE_REMOVE,l.PHASE_AFTER)?(i={type:"remove"},k=l.decouple(j),l.processTrigger(i,l.TYPE_REMOVE,l.PHASE_BEFORE,k,k)!==!1&&(h(j),l.processTrigger(i,l.TYPE_REMOVE,l.PHASE_AFTER,k,k))):h(j);g.length&&(l.chainSend("remove",{query:a,dataSet:g},b),(!b||b&&!b.noEmit)&&this._onRemove(g),this._onChange(),this.emit("immediateChange",{type:"remove",data:g}),this.deferEmit("change",{type:"remove",data:g}))}return c&&c.call(this,!1,g),g},p.prototype.removeById=function(a){var b={};return b[this._primaryKey]=a,this.remove(b)[0]},p.prototype.processQueue=function(a,b,c){var d,e,f=this,g=this._deferQueue[a],h=this._deferThreshold[a],i=this._deferTime[a];if(c=c||{deferred:!0},g.length){switch(d=g.length>h?g.splice(0,h):g.splice(0,g.length),e=f[a](d),a){case"insert":c.inserted=c.inserted||[],c.failed=c.failed||[],c.inserted=c.inserted.concat(e.inserted),c.failed=c.failed.concat(e.failed)}setTimeout(function(){f.processQueue.call(f,a,b,c)},i)}else b&&b.call(this,c),this._asyncComplete(a);this.isProcessingQueue()||this.deferEmit("queuesComplete")},p.prototype.isProcessingQueue=function(){var a;for(a in this._deferQueue)if(this._deferQueue.hasOwnProperty(a)&&this._deferQueue[a].length)return!0;return!1},p.prototype.insert=function(a,b,c){if(this.isDropped())throw this.logIdentifier()+" Cannot operate in a dropped state!";return"function"==typeof b?(c=b,b=this._data.length):void 0===b&&(b=this._data.length),a=this.transformIn(a),this._insertHandle(a,b,c)},p.prototype._insertHandle=function(a,b,c){var d,e,f,g=this._deferQueue.insert,h=this._deferThreshold.insert,i=[],j=[];if(a instanceof Array){if(this._deferredCalls&&a.length>h)return this._deferQueue.insert=g.concat(a),this._asyncPending("insert"),void this.processQueue("insert",c);for(f=0;f<a.length;f++)d=this._insert(a[f],b+f),d===!0?i.push(a[f]):j.push({doc:a[f],reason:d})}else d=this._insert(a,b),d===!0?i.push(a):j.push({doc:a,reason:d});return e={deferred:!1,inserted:i,failed:j},this._onInsert(i,j),c&&c.call(this,e),this._onChange(),this.emit("immediateChange",{type:"insert",data:i,failed:j}),this.deferEmit("change",{type:"insert",data:i,failed:j}),e},p.prototype._insert=function(a,b){if(a){var c,d,e,f,g=this,h=this.capped(),i=this.cappedSize();if(this.ensurePrimaryKey(a),c=this.insertIndexViolation(a),e=function(a){g._insertIntoIndexes(a),b>g._data.length&&(b=g._data.length),g._dataInsertAtIndex(b,a),h&&g._data.length>i&&g.removeById(g._data[0][g._primaryKey]),g.chainWillSend()&&g.chainSend("insert",{dataSet:g.decouple([a])},{index:b})},c)return"Index violation in index: "+c;if(g.willTrigger(g.TYPE_INSERT,g.PHASE_BEFORE)||g.willTrigger(g.TYPE_INSERT,g.PHASE_AFTER)){if(d={type:"insert"},g.processTrigger(d,g.TYPE_INSERT,g.PHASE_BEFORE,{},a)===!1)return"Trigger cancelled operation";e(a),g.willTrigger(g.TYPE_INSERT,g.PHASE_AFTER)&&(f=g.decouple(a),g.processTrigger(d,g.TYPE_INSERT,g.PHASE_AFTER,{},f))}else e(a);return!0}return"No document passed to insert"},p.prototype._dataInsertAtIndex=function(a,b){this._data.splice(a,0,b)},p.prototype._dataRemoveAtIndex=function(a){this._data.splice(a,1)},p.prototype._dataReplace=function(a){for(;this._data.length;)this._data.pop();this._data=this._data.concat(a)},p.prototype._insertIntoIndexes=function(a){var b,c,d=this._indexByName,e=this.hash(a),f=this._primaryKey;c=this._primaryIndex.uniqueSet(a[f],a),this._primaryCrc.uniqueSet(a[f],e),this._crcLookup.uniqueSet(e,a);for(b in d)d.hasOwnProperty(b)&&d[b].insert(a);return c},p.prototype._removeFromIndexes=function(a){var b,c=this._indexByName,d=this.hash(a),e=this._primaryKey;this._primaryIndex.unSet(a[e]),this._primaryCrc.unSet(a[e]),this._crcLookup.unSet(d);for(b in c)c.hasOwnProperty(b)&&c[b].remove(a)},p.prototype._updateIndexes=function(a,b){this._removeFromIndexes(a),this._insertIntoIndexes(b)},p.prototype._rebuildIndexes=function(){var a,b=this._indexByName;for(a in b)b.hasOwnProperty(a)&&b[a].rebuild()},p.prototype.subset=function(a,b){var c,d=this.find(a,b);return c=new p,c.db(this._db),c.subsetOf(this).primaryKey(this._primaryKey).setData(d),c},d.synthesize(p.prototype,"subsetOf"),p.prototype.isSubsetOf=function(a){return this._subsetOf===a},p.prototype.distinct=function(a,b,c){if(this.isDropped())throw this.logIdentifier()+" Cannot operate in a dropped state!";var d,e,f,g=this.find(b,c),i=new h,j={},k=[];for(d=i.aggregate(g,a),f=0;f<d.length;f++)e=d[f],e&&!j[e]&&(j[e]=!0,k.push(e));return k},p.prototype.findById=function(a,b){var c={};return c[this._primaryKey]=a,this.find(c,b)[0]},p.prototype.peek=function(a,b){var c,d,e=this._data,f=e.length,g=new p,h=typeof a;if("string"===h){for(c=0;c<f;c++)d=this.jStringify(e[c]),d.indexOf(a)>-1&&g.insert(e[c]);return g.find({},b)}return this.find(a,b)},p.prototype.explain=function(a,b){var c=this.find(a,b);return c.__fdbOp._data},p.prototype.options=function(a){return a=a||{},a.$decouple=void 0===a.$decouple||a.$decouple,a.$explain=void 0!==a.$explain&&a.$explain,a},p.prototype.find=function(a,b,c){return this.mongoEmulation()&&this.convertToFdb(a),c?(c.call(this,"Callbacks for the find() operation are not yet implemented!",[]),[]):this._find.call(this,a,b,c)},p.prototype._find=function(a,b){if(this.isDropped())throw this.logIdentifier()+" Cannot operate in a dropped state!";a=a||{};var c,d,e,f,g,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x=this._metrics.create("find"),y=this.primaryKey(),z=this,A=!0,B={},C=[],D=[],E=[],F={},G={};if(b instanceof Array||(b=this.options(b)),w=function(c){return z._match(c,a,b,"and",F)},x.start(),a){if(a instanceof Array){for(v=this,n=0;n<a.length;n++)v=v.subset(a[n],b&&b[n]?b[n]:{});return v.find()}if(a.$findSub){if(!a.$findSub.$path)throw"$findSub missing $path property!";return this.findSub(a.$findSub.$query,a.$findSub.$path,a.$findSub.$subQuery,a.$findSub.$subOptions)}if(a.$findSubOne){if(!a.$findSubOne.$path)throw"$findSubOne missing $path property!";return this.findSubOne(a.$findSubOne.$query,a.$findSubOne.$path,a.$findSubOne.$subQuery,a.$findSubOne.$subOptions)}if(x.time("analyseQuery"),c=this._analyseQuery(z.decouple(a),b,x),x.time("analyseQuery"),x.data("analysis",c),c.hasJoin&&c.queriesJoin){for(x.time("joinReferences"),f=0;f<c.joinsOn.length;f++)m=c.joinsOn[f],j=m.key,k=m.type,l=m.id,i=new h(c.joinQueries[j]),g=i.value(a)[0],B[l]=this._db[k](j).subset(g),delete a[c.joinQueries[j]];x.time("joinReferences")}if(c.indexMatch.length&&(!b||b&&!b.$skipIndex)?(x.data("index.potential",c.indexMatch),x.data("index.used",c.indexMatch[0].index),x.time("indexLookup"),e=[].concat(c.indexMatch[0].lookup)||[],x.time("indexLookup"),c.indexMatch[0].keyData.totalKeyCount===c.indexMatch[0].keyData.score&&(A=!1)):x.flag("usedIndex",!1),A&&(e&&e.length?(d=e.length,x.time("tableScan: "+d),e=e.filter(w)):(d=this._data.length,x.time("tableScan: "+d),e=this._data.filter(w)),x.time("tableScan: "+d)),b.$orderBy&&(x.time("sort"),e=this.sort(b.$orderBy,e),x.time("sort")),void 0!==b.$page&&void 0!==b.$limit&&(G.page=b.$page,G.pages=Math.ceil(e.length/b.$limit),G.records=e.length,b.$page&&b.$limit>0&&(x.data("cursor",G),e.splice(0,b.$page*b.$limit))),b.$skip&&(G.skip=b.$skip,e.splice(0,b.$skip),x.data("skip",b.$skip)),b.$limit&&e&&e.length>b.$limit&&(G.limit=b.$limit,e.length=b.$limit,x.data("limit",b.$limit)),b.$decouple&&(x.time("decouple"),e=this.decouple(e),x.time("decouple"),x.data("flag.decouple",!0)),b.$join&&(C=C.concat(this.applyJoin(e,b.$join,B)),x.data("flag.join",!0)),C.length&&(x.time("removalQueue"),
this.spliceArrayByIndexList(e,C),x.time("removalQueue")),b.$transform){for(x.time("transform"),n=0;n<e.length;n++)e.splice(n,1,b.$transform(e[n]));x.time("transform"),x.data("flag.transform",!0)}this._transformEnabled&&this._transformOut&&(x.time("transformOut"),e=this.transformOut(e),x.time("transformOut")),x.data("results",e.length)}else e=[];if(!b.$aggregate){x.time("scanFields");for(n in b)b.hasOwnProperty(n)&&0!==n.indexOf("$")&&(1===b[n]?D.push(n):0===b[n]&&E.push(n));if(x.time("scanFields"),D.length||E.length){for(x.data("flag.limitFields",!0),x.data("limitFields.on",D),x.data("limitFields.off",E),x.time("limitFields"),n=0;n<e.length;n++){t=e[n];for(o in t)t.hasOwnProperty(o)&&(D.length&&o!==y&&D.indexOf(o)===-1&&delete t[o],E.length&&E.indexOf(o)>-1&&delete t[o])}x.time("limitFields")}if(b.$elemMatch){x.data("flag.elemMatch",!0),x.time("projection-elemMatch");for(n in b.$elemMatch)if(b.$elemMatch.hasOwnProperty(n))for(q=new h(n),o=0;o<e.length;o++)if(r=q.value(e[o])[0],r&&r.length)for(p=0;p<r.length;p++)if(z._match(r[p],b.$elemMatch[n],b,"",{})){q.set(e[o],n,[r[p]]);break}x.time("projection-elemMatch")}if(b.$elemsMatch){x.data("flag.elemsMatch",!0),x.time("projection-elemsMatch");for(n in b.$elemsMatch)if(b.$elemsMatch.hasOwnProperty(n))for(q=new h(n),o=0;o<e.length;o++)if(r=q.value(e[o])[0],r&&r.length){for(s=[],p=0;p<r.length;p++)z._match(r[p],b.$elemsMatch[n],b,"",{})&&s.push(r[p]);q.set(e[o],n,s)}x.time("projection-elemsMatch")}}return b.$aggregate&&(x.data("flag.aggregate",!0),x.time("aggregate"),u=new h,e=u.aggregate(e,b.$aggregate),x.time("aggregate")),b.$groupBy&&(x.data("flag.group",!0),x.time("group"),e=this.group(b.$groupBy,e),x.time("group")),x.stop(),e.__fdbOp=x,e.$cursor=G,e},p.prototype.findOne=function(){return this.find.apply(this,arguments)[0]},p.prototype.indexOf=function(a,b){var c,d=this.find(a,{$decouple:!1})[0];return d?!b||b&&!b.$orderBy?this._data.indexOf(d):(b.$decouple=!1,c=this.find(a,b),c.indexOf(d)):-1},p.prototype.indexOfDocById=function(a,b){var c,d;return c="object"!=typeof a?this._primaryIndex.get(a):this._primaryIndex.get(a[this._primaryKey]),c?!b||b&&!b.$orderBy?this._data.indexOf(c):(b.$decouple=!1,d=this.find({},b),d.indexOf(c)):-1},p.prototype.removeByIndex=function(a){var b,c;return b=this._data[a],void 0!==b&&(b=this.decouple(b),c=b[this.primaryKey()],this.removeById(c))},p.prototype.transform=function(a){return void 0!==a?("object"==typeof a?(void 0!==a.enabled&&(this._transformEnabled=a.enabled),void 0!==a.dataIn&&(this._transformIn=a.dataIn),void 0!==a.dataOut&&(this._transformOut=a.dataOut)):this._transformEnabled=a!==!1,this):{enabled:this._transformEnabled,dataIn:this._transformIn,dataOut:this._transformOut}},p.prototype.transformIn=function(a){if(this._transformEnabled&&this._transformIn){if(a instanceof Array){var b,c,d=[];for(c=0;c<a.length;c++)b=this._transformIn(a[c]),b instanceof Array?d=d.concat(b):d.push(b);return d}return this._transformIn(a)}return a},p.prototype.transformOut=function(a){if(this._transformEnabled&&this._transformOut){if(a instanceof Array){var b,c,d=[];for(c=0;c<a.length;c++)b=this._transformOut(a[c]),b instanceof Array?d=d.concat(b):d.push(b);return d}return this._transformOut(a)}return a},p.prototype.sort=function(a,b){var c=this,d=o.parse(a,!0);return d.length&&b.sort(function(a,b){var e,f,g=0;for(e=0;e<d.length;e++)if(f=d[e],1===f.value?g=c.sortAsc(o.get(a,f.path),o.get(b,f.path)):f.value===-1&&(g=c.sortDesc(o.get(a,f.path),o.get(b,f.path))),0!==g)return g;return g}),b},p.prototype.group=function(a,b){var c,d,e,f=o.parse(a,!0),g=new h,i={};if(f.length)for(d=0;d<f.length;d++)for(g.path(f[d].path),e=0;e<b.length;e++)c=g.get(b[e]),i[c]=i[c]||[],i[c].push(b[e]);return i},p.prototype._sort=function(a,b){var c,d=this,e=new h,f=e.parse(a,!0)[0];if(e.path(f.path),1===f.value)c=function(a,b){var c=e.value(a)[0],f=e.value(b)[0];return d.sortAsc(c,f)};else{if(f.value!==-1)throw this.logIdentifier()+" $orderBy clause has invalid direction: "+f.value+", accepted values are 1 or -1 for ascending or descending!";c=function(a,b){var c=e.value(a)[0],f=e.value(b)[0];return d.sortDesc(c,f)}}return b.sort(c)},p.prototype._analyseQuery=function(a,b,c){var d,e,f,g,i,j,k,l,m,n,o,p,q,r,s,t,u={queriesOn:[{id:"$collection."+this._name,type:"colletion",key:this._name}],indexMatch:[],hasJoin:!1,queriesJoin:!1,joinQueries:{},query:a,options:b},v=[],w=[];if(c.time("checkIndexes"),p=new h,q=p.parseArr(a,{ignore:/\$/,verbose:!0}).length){void 0!==a[this._primaryKey]&&(r=typeof a[this._primaryKey],("string"===r||"number"===r||a[this._primaryKey]instanceof Array)&&(c.time("checkIndexMatch: Primary Key"),s=[].concat(this._primaryIndex.lookup(a,b,c)),u.indexMatch.push({lookup:s,keyData:{matchedKeys:[this._primaryKey],totalKeyCount:q,score:1},index:this._primaryIndex}),c.time("checkIndexMatch: Primary Key")));for(t in this._indexById)if(this._indexById.hasOwnProperty(t)&&(m=this._indexById[t],n=m.name(),c.time("checkIndexMatch: "+n),l=m.match(a,b),l.score>0&&(o=[].concat(m.lookup(a,b,c)),u.indexMatch.push({lookup:o,keyData:l,index:m})),c.time("checkIndexMatch: "+n),l.score===q))break;c.time("checkIndexes"),u.indexMatch.length>1&&(c.time("findOptimalIndex"),u.indexMatch.sort(function(a,b){return a.keyData.score>b.keyData.score?-1:a.keyData.score<b.keyData.score?1:a.keyData.score===b.keyData.score?a.lookup.length-b.lookup.length:void 0}),c.time("findOptimalIndex"))}if(b.$join){for(u.hasJoin=!0,d=0;d<b.$join.length;d++)for(e in b.$join[d])b.$join[d].hasOwnProperty(e)&&(i=b.$join[d][e],f=i.$sourceType||"collection",g="$"+f+"."+e,v.push({id:g,type:f,key:e}),void 0!==b.$join[d][e].$as?w.push(b.$join[d][e].$as):w.push(e));for(k=0;k<w.length;k++)j=this._queryReferencesSource(a,w[k],""),j&&(u.joinQueries[v[k].key]=j,u.queriesJoin=!0);u.joinsOn=v,u.queriesOn=u.queriesOn.concat(v)}return u},p.prototype._queryReferencesSource=function(a,b,c){var d;for(d in a)if(a.hasOwnProperty(d)){if(d===b)return c&&(c+="."),c+d;if("object"==typeof a[d])return c&&(c+="."),c+=d,this._queryReferencesSource(a[d],b,c)}return!1},p.prototype.count=function(a,b){return a?this.find(a,b).length:this._data.length},p.prototype.findSub=function(a,b,c,d){return this._findSub(this.find(a),b,c,d)},p.prototype._findSub=function(a,b,c,d){var e,f,g,i=new h(b),j=a.length,k=new p("__FDB_temp_"+this.objectId()).db(this._db),l={parents:j,subDocTotal:0,subDocs:[],pathFound:!1,err:""};for(d=d||{},e=0;e<j;e++)if(f=i.value(a[e])[0]){if(k.setData(f),g=k.find(c,d),d.$returnFirst&&g.length)return g[0];d.$split?l.subDocs.push(g):l.subDocs=l.subDocs.concat(g),l.subDocTotal+=g.length,l.pathFound=!0}return k.drop(),l.pathFound||(l.err="No objects found in the parent documents with a matching path of: "+b),d.$stats?l:l.subDocs},p.prototype.findSubOne=function(a,b,c,d){return this.findSub(a,b,c,d)[0]},p.prototype.insertIndexViolation=function(a){var b,c,d,e=this._indexByName;if(this._primaryIndex.get(a[this._primaryKey]))b=this._primaryIndex;else for(c in e)if(e.hasOwnProperty(c)&&(d=e[c],d.unique()&&d.violation(a))){b=d;break}return!!b&&b.name()},p.prototype.ensureIndex=function(a,b){if(this.isDropped())throw this.logIdentifier()+" Cannot operate in a dropped state!";this._indexByName=this._indexByName||{},this._indexById=this._indexById||{};var c,e={start:(new Date).getTime()};if(b)if(b.type){if(!d.index[b.type])throw this.logIdentifier()+' Cannot create index of type "'+b.type+'", type not found in the index type register (Shared.index)';c=new d.index[b.type](a,b,this)}else c=new i(a,b,this);else c=new i(a,b,this);return this._indexByName[c.name()]?{err:"Index with that name already exists"}:(c.rebuild(),this._indexByName[c.name()]=c,this._indexById[c.id()]=c,e.end=(new Date).getTime(),e.total=e.end-e.start,this._lastOp={type:"ensureIndex",stats:{time:e}},{index:c,id:c.id(),name:c.name(),state:c.state()})},p.prototype.index=function(a){if(this._indexByName)return this._indexByName[a]},p.prototype.lastOp=function(){return this._metrics.list()},p.prototype.diff=function(a){var b,c,d,e,f={insert:[],update:[],remove:[]},g=this.primaryKey();if(g!==a.primaryKey())throw this.logIdentifier()+" Diffing requires that both collections have the same primary key!";for(b=a._data;b&&!(b instanceof Array);)a=b,b=a._data;for(e=b.length,c=0;c<e;c++)d=b[c],this._primaryIndex.get(d[g])?this._primaryCrc.get(d[g])!==a._primaryCrc.get(d[g])&&f.update.push(d):f.insert.push(d);for(b=this._data,e=b.length,c=0;c<e;c++)d=b[c],a._primaryIndex.get(d[g])||f.remove.push(d);return f},p.prototype.collateAdd=new l("Collection.prototype.collateAdd",{"object, string":function(a,b){var c=this;c.collateAdd(a,function(d){var e,f;switch(d.type){case"insert":b?(e={$push:{}},e.$push[b]=c.decouple(d.data.dataSet),c.update({},e)):c.insert(d.data.dataSet);break;case"update":b?(e={},f={},e[b]=d.data.query,f[b+".$"]=d.data.update,c.update(e,f)):c.update(d.data.query,d.data.update);break;case"remove":b?(e={$pull:{}},e.$pull[b]={},e.$pull[b][c.primaryKey()]=d.data.dataSet[0][a.primaryKey()],c.update({},e)):c.remove(d.data.dataSet)}})},"object, function":function(a,b){if("string"==typeof a&&(a=this._db.collection(a,{autoCreate:!1,throwError:!1})),a)return this._collate=this._collate||{},this._collate[a.name()]=new m(a,this,b),this;throw"Cannot collate from a non-existent collection!"}}),p.prototype.collateRemove=function(a){if("object"==typeof a&&(a=a.name()),a)return this._collate[a].drop(),delete this._collate[a],this;throw"No collection name passed to collateRemove() or collection not found!"},p.prototype.when=function(a){var b=this.objectId();return this._when=this._when||{},this._when[b]=this._when[b]||new n(this,b,a),this._when[b]},e.prototype.collection=new l("Db.prototype.collection",{"":function(){return this.$main.call(this,{name:this.objectId()})},object:function(a){return a instanceof p?"droppped"!==a.state()?a:this.$main.call(this,{name:a.name()}):this.$main.call(this,a)},string:function(a){return this.$main.call(this,{name:a})},"string, string":function(a,b){return this.$main.call(this,{name:a,primaryKey:b})},"string, object":function(a,b){return b.name=a,this.$main.call(this,b)},"string, string, object":function(a,b,c){return c.name=a,c.primaryKey=b,this.$main.call(this,c)},$main:function(a){var b=this,c=a.name;if(c){if(this._collection[c])return this._collection[c];if(!a||a.autoCreate!==!1){if(this.debug()&&console.log(this.logIdentifier()+" Creating collection "+c),this._collection[c]=this._collection[c]||new p(c,a).db(this),this._collection[c].mongoEmulation(this.mongoEmulation()),void 0!==a.primaryKey&&this._collection[c].primaryKey(a.primaryKey),void 0!==a.capped){if(void 0===a.size)throw this.logIdentifier()+" Cannot create a capped collection without specifying a size!";this._collection[c].capped(a.capped),this._collection[c].cappedSize(a.size)}return b._collection[c].on("change",function(){b.emit("change",b._collection[c],"collection",c)}),b.deferEmit("create",b._collection[c],"collection",c),this._collection[c]}if(a&&a.throwError!==!1)throw this.logIdentifier()+" Cannot get collection "+c+" because it does not exist and auto-create has been disabled!"}else if(!a||a&&a.throwError!==!1)throw this.logIdentifier()+" Cannot get collection with undefined name!"}}),e.prototype.collectionExists=function(a){return Boolean(this._collection[a])},e.prototype.collections=function(a){var b,c,d=[],e=this._collection;a&&(a instanceof RegExp||(a=new RegExp(a)));for(c in e)e.hasOwnProperty(c)&&(b=e[c],a?a.exec(c)&&d.push({name:c,count:b.count(),linked:void 0!==b.isLinked&&b.isLinked()}):d.push({name:c,count:b.count(),linked:void 0!==b.isLinked&&b.isLinked()}));return d.sort(function(a,b){return a.name.localeCompare(b.name)}),d},d.finishModule("Collection"),b.exports=p},{"./Condition":8,"./Index2d":15,"./IndexBinaryTree":16,"./IndexHashMap":17,"./KeyValueStore":18,"./Metrics":19,"./Overload":32,"./Path":34,"./ReactorIO":38,"./Shared":40}],7:[function(a,b,c){"use strict";var d,e,f,g;d=a("./Shared");var h=function(){this.init.apply(this,arguments)};h.prototype.init=function(a){var b=this;b._name=a,b._data=new g("__FDB__cg_data_"+b._name),b._collections=[],b._view=[]},d.addModule("CollectionGroup",h),d.mixin(h.prototype,"Mixin.Common"),d.mixin(h.prototype,"Mixin.ChainReactor"),d.mixin(h.prototype,"Mixin.Constants"),d.mixin(h.prototype,"Mixin.Triggers"),d.mixin(h.prototype,"Mixin.Tags"),d.mixin(h.prototype,"Mixin.Events"),g=a("./Collection"),e=d.modules.Db,f=d.modules.Db.prototype.init,h.prototype.on=function(){this._data.on.apply(this._data,arguments)},h.prototype.off=function(){this._data.off.apply(this._data,arguments)},h.prototype.emit=function(){this._data.emit.apply(this._data,arguments)},h.prototype.primaryKey=function(a){return void 0!==a?(this._primaryKey=a,this):this._primaryKey},d.synthesize(h.prototype,"state"),d.synthesize(h.prototype,"db"),d.synthesize(h.prototype,"name"),h.prototype.addCollection=function(a){if(a&&this._collections.indexOf(a)===-1){if(this._collections.length){if(this._primaryKey!==a.primaryKey())throw this.logIdentifier()+" All collections in a collection group must have the same primary key!"}else this.primaryKey(a.primaryKey());this._collections.push(a),a._groups=a._groups||[],a._groups.push(this),a.chain(this),a.on("drop",function(){if(a._groups&&a._groups.length){var b,c=[];for(b=0;b<a._groups.length;b++)c.push(a._groups[b]);for(b=0;b<c.length;b++)a._groups[b].removeCollection(a)}delete a._groups}),this._data.insert(a.find())}return this},h.prototype.removeCollection=function(a){if(a){var b,c=this._collections.indexOf(a);c!==-1&&(a.unChain(this),this._collections.splice(c,1),a._groups=a._groups||[],b=a._groups.indexOf(this),b!==-1&&a._groups.splice(b,1),a.off("drop")),0===this._collections.length&&delete this._primaryKey}return this},h.prototype._chainHandler=function(a){switch(a.type){case"setData":a.data.dataSet=this.decouple(a.data.dataSet),this._data.remove(a.data.oldData),this._data.insert(a.data.dataSet);break;case"insert":a.data.dataSet=this.decouple(a.data.dataSet),this._data.insert(a.data.dataSet);break;case"update":this._data.update(a.data.query,a.data.update,a.options);break;case"remove":this._data.remove(a.data.query,a.options)}},h.prototype.insert=function(){this._collectionsRun("insert",arguments)},h.prototype.update=function(){this._collectionsRun("update",arguments)},h.prototype.updateById=function(){this._collectionsRun("updateById",arguments)},h.prototype.remove=function(){this._collectionsRun("remove",arguments)},h.prototype._collectionsRun=function(a,b){for(var c=0;c<this._collections.length;c++)this._collections[c][a].apply(this._collections[c],b)},h.prototype.find=function(a,b){return this._data.find(a,b)},h.prototype.removeById=function(a){for(var b=0;b<this._collections.length;b++)this._collections[b].removeById(a)},h.prototype.subset=function(a,b){var c=this.find(a,b);return(new g).subsetOf(this).primaryKey(this._primaryKey).setData(c)},h.prototype.drop=function(a){if(!this.isDropped()){var b,c,d;if(this._debug&&console.log(this.logIdentifier()+" Dropping"),this._state="dropped",this._collections&&this._collections.length)for(c=[].concat(this._collections),b=0;b<c.length;b++)this.removeCollection(c[b]);if(this._view&&this._view.length)for(d=[].concat(this._view),b=0;b<d.length;b++)this._removeView(d[b]);this.emit("drop",this),delete this._listeners,a&&a(!1,!0)}return!0},e.prototype.init=function(){this._collectionGroup={},f.apply(this,arguments)},e.prototype.collectionGroup=function(a){var b=this;return a?a instanceof h?a:this._collectionGroup&&this._collectionGroup[a]?this._collectionGroup[a]:(this._collectionGroup[a]=new h(a).db(this),b.deferEmit("create",b._collectionGroup[a],"collectionGroup",a),this._collectionGroup[a]):this._collectionGroup},e.prototype.collectionGroups=function(){var a,b=[];for(a in this._collectionGroup)this._collectionGroup.hasOwnProperty(a)&&b.push({name:a});return b},b.exports=h},{"./Collection":6,"./Shared":40}],8:[function(a,b,c){"use strict";var d,e;d=a("./Shared"),e=function(){this.init.apply(this,arguments)},e.prototype.init=function(a,b,c){this._dataSource=a,this._id=b,this._query=[c],this._started=!1,this._state=[!1],this._satisfied=!1,this.earlyExit(!0)},d.addModule("Condition",e),d.mixin(e.prototype,"Mixin.Common"),d.mixin(e.prototype,"Mixin.ChainReactor"),d.synthesize(e.prototype,"id"),d.synthesize(e.prototype,"then"),d.synthesize(e.prototype,"else"),d.synthesize(e.prototype,"earlyExit"),d.synthesize(e.prototype,"debug"),e.prototype.and=function(a){return this._query.push(a),this._state.push(!1),this},e.prototype.start=function(a){if(!this._started){var b=this;0!==arguments.length&&(this._satisfied=a),this._updateStates(),b._onChange=function(){b._updateStates()},this._dataSource.on("change",b._onChange),this._started=!0}return this},e.prototype._updateStates=function(){var a,b=!0;for(a=0;a<this._query.length&&(this._state[a]=this._dataSource.count(this._query[a])>0,this._debug&&console.log(this.logIdentifier()+" Evaluating",this._query[a],"=",this._query[a]),this._state[a]||(b=!1,!this._earlyExit));a++);this._satisfied!==b&&(b?this._then&&this._then():this._else&&this._else(),this._satisfied=b)},e.prototype.stop=function(){return this._started&&(this._dataSource.off("change",this._onChange),delete this._onChange,this._started=!1),this},e.prototype.drop=function(){return this.stop(),delete this._dataSource.when[this._id],this},d.finishModule("Condition"),b.exports=e},{"./Shared":40}],9:[function(a,b,c){"use strict";var d,e,f,g,h=[];d=a("./Shared"),g=a("./Overload");var i=function(a){this.init.apply(this,arguments)};i.prototype.init=function(a){this._db={},this._debug={},this._name=a||"ForerunnerDB",h.push(this)},i.prototype.instantiatedCount=function(){return h.length},i.prototype.instances=function(a){return void 0!==a?h[a]:h},i.prototype.namedInstances=function(a){var b,c;{if(void 0===a){for(c=[],b=0;b<h.length;b++)c.push(h[b].name);return c}for(b=0;b<h.length;b++)if(h[b].name===a)return h[b]}},i.prototype.moduleLoaded=new g({string:function(a){if(void 0!==a){a=a.replace(/ /g,"");var b,c=a.split(",");for(b=0;b<c.length;b++)if(!d.modules[c[b]])return!1;return!0}return!1},"string, function":function(a,b){if(void 0!==a){a=a.replace(/ /g,"");var c,e=a.split(",");for(c=0;c<e.length;c++)if(!d.modules[e[c]])return!1;b&&b()}},"array, function":function(a,b){var c,e;for(e=0;e<a.length;e++)if(c=a[e],void 0!==c){c=c.replace(/ /g,"");var f,g=c.split(",");for(f=0;f<g.length;f++)if(!d.modules[g[f]])return!1}b&&b()},"string, function, function":function(a,b,c){if(void 0!==a){a=a.replace(/ /g,"");var e,f=a.split(",");for(e=0;e<f.length;e++)if(!d.modules[f[e]])return c(),!1;b()}}}),i.prototype.version=function(a,b){return void 0!==a?0===d.version.indexOf(a)&&(b&&b(),!0):d.version},i.moduleLoaded=i.prototype.moduleLoaded,i.version=i.prototype.version,i.instances=i.prototype.instances,i.instantiatedCount=i.prototype.instantiatedCount,i.shared=d,i.prototype.shared=d,d.addModule("Core",i),d.mixin(i.prototype,"Mixin.Common"),d.mixin(i.prototype,"Mixin.Constants"),e=a("./Db.js"),f=a("./Metrics.js"),d.synthesize(i.prototype,"name"),d.synthesize(i.prototype,"mongoEmulation"),i.prototype._isServer=!1,i.prototype.isClient=function(){return!this._isServer},i.prototype.isServer=function(){return this._isServer},i.prototype.collection=function(){throw"ForerunnerDB's instantiation has changed since version 1.3.36 to support multiple database instances. Please see the readme.md file for the minor change you have to make to get your project back up and running, or see the issue related to this change at https://github.com/Irrelon/ForerunnerDB/issues/44"},b.exports=i},{"./Db.js":10,"./Metrics.js":19,"./Overload":32,"./Shared":40}],10:[function(a,b,c){"use strict";var d,e,f,g,h;d=a("./Shared"),h=a("./Overload");var i=function(a,b){this.init.apply(this,arguments)};i.prototype.init=function(a,b){this.core(b),this._primaryKey="_id",this._name=a,this._collection={},this._debug={}},d.addModule("Db",i),i.prototype.moduleLoaded=new h({string:function(a){if(void 0!==a){a=a.replace(/ /g,"");var b,c=a.split(",");for(b=0;b<c.length;b++)if(!d.modules[c[b]])return!1;return!0}return!1},"string, function":function(a,b){if(void 0!==a){a=a.replace(/ /g,"");var c,e=a.split(",");for(c=0;c<e.length;c++)if(!d.modules[e[c]])return!1;b&&b()}},"string, function, function":function(a,b,c){if(void 0!==a){a=a.replace(/ /g,"");var e,f=a.split(",");for(e=0;e<f.length;e++)if(!d.modules[f[e]])return c(),!1;b()}}}),i.prototype.version=function(a,b){return void 0!==a?0===d.version.indexOf(a)&&(b&&b(),!0):d.version},i.moduleLoaded=i.prototype.moduleLoaded,i.version=i.prototype.version,i.shared=d,i.prototype.shared=d,d.addModule("Db",i),d.mixin(i.prototype,"Mixin.Common"),d.mixin(i.prototype,"Mixin.ChainReactor"),d.mixin(i.prototype,"Mixin.Constants"),d.mixin(i.prototype,"Mixin.Tags"),d.mixin(i.prototype,"Mixin.Events"),e=d.modules.Core,f=a("./Collection.js"),g=a("./Metrics.js"),i.prototype._isServer=!1,d.synthesize(i.prototype,"core"),d.synthesize(i.prototype,"primaryKey"),d.synthesize(i.prototype,"state"),d.synthesize(i.prototype,"name"),d.synthesize(i.prototype,"mongoEmulation"),i.prototype.isClient=function(){return!this._isServer},i.prototype.isServer=function(){return this._isServer},i.prototype.isClient=function(){return!this._isServer},i.prototype.isServer=function(){return this._isServer},i.prototype.arrayToCollection=function(a){return(new f).setData(a)},i.prototype.peek=function(a){var b,c,d=[],e=typeof a;for(b in this._collection)this._collection.hasOwnProperty(b)&&(c=this._collection[b],d="string"===e?d.concat(c.peek(a)):d.concat(c.find(a)));return d},i.prototype.peek=function(a){var b,c,d=[],e=typeof a;for(b in this._collection)this._collection.hasOwnProperty(b)&&(c=this._collection[b],d="string"===e?d.concat(c.peek(a)):d.concat(c.find(a)));return d},i.prototype.peekCat=function(a){var b,c,d,e={},f=typeof a;for(b in this._collection)this._collection.hasOwnProperty(b)&&(c=this._collection[b],"string"===f?(d=c.peek(a),d&&d.length&&(e[c.name()]=d)):(d=c.find(a),d&&d.length&&(e[c.name()]=d)));return e},i.prototype.drop=new h({"":function(){if(!this.isDropped()){var a,b=this.collections(),c=b.length;for(this._state="dropped",a=0;a<c;a++)this.collection(b[a].name).drop(),delete this._collection[b[a].name];this.emit("drop",this),delete this._listeners,delete this._core._db[this._name]}return!0},function:function(a){if(!this.isDropped()){var b,c=this.collections(),d=c.length,e=0,f=function(){e++,e===d&&a&&a()};for(this._state="dropped",b=0;b<d;b++)this.collection(c[b].name).drop(f),delete this._collection[c[b].name];this.emit("drop",this),delete this._listeners,delete this._core._db[this._name]}return!0},boolean:function(a){if(!this.isDropped()){var b,c=this.collections(),d=c.length;for(this._state="dropped",b=0;b<d;b++)this.collection(c[b].name).drop(a),delete this._collection[c[b].name];this.emit("drop",this),delete this._listeners,delete this._core._db[this._name]}return!0},"boolean, function":function(a,b){if(!this.isDropped()){var c,d=this.collections(),e=d.length,f=0,g=function(){f++,f===e&&b&&b()};for(this._state="dropped",c=0;c<e;c++)this.collection(d[c].name).drop(a,g),delete this._collection[d[c].name];this.emit("drop",this),delete this._listeners,delete this._core._db[this._name]}return!0}}),e.prototype.db=function(a){return a instanceof i?a:(a||(a=this.objectId()),this._db[a]=this._db[a]||new i(a,this),this._db[a].mongoEmulation(this.mongoEmulation()),this._db[a])},e.prototype.databases=function(a){var b,c,d,e=[];a&&(a instanceof RegExp||(a=new RegExp(a)));for(d in this._db)this._db.hasOwnProperty(d)&&(c=!0,a&&(a.exec(d)||(c=!1)),c&&(b={name:d,children:[]},this.shared.moduleExists("Collection")&&b.children.push({module:"collection",moduleName:"Collections",count:this._db[d].collections().length}),this.shared.moduleExists("CollectionGroup")&&b.children.push({module:"collectionGroup",moduleName:"Collection Groups",count:this._db[d].collectionGroups().length}),this.shared.moduleExists("Document")&&b.children.push({module:"document",moduleName:"Documents",count:this._db[d].documents().length}),this.shared.moduleExists("Grid")&&b.children.push({module:"grid",moduleName:"Grids",count:this._db[d].grids().length}),this.shared.moduleExists("Overview")&&b.children.push({module:"overview",moduleName:"Overviews",count:this._db[d].overviews().length}),this.shared.moduleExists("View")&&b.children.push({module:"view",moduleName:"Views",count:this._db[d].views().length}),e.push(b)));return e.sort(function(a,b){return a.name.localeCompare(b.name)}),e},d.finishModule("Db"),b.exports=i},{"./Collection.js":6,"./Metrics.js":19,"./Overload":32,"./Shared":40}],11:[function(a,b,c){"use strict";var d,e,f,g,h;d=a("./Shared");var i=function(){this.init.apply(this,arguments)};i.prototype.init=function(a){this._name=a,this._data={}},d.addModule("Document",i),d.mixin(i.prototype,"Mixin.Common"),d.mixin(i.prototype,"Mixin.Events"),d.mixin(i.prototype,"Mixin.ChainReactor"),d.mixin(i.prototype,"Mixin.Constants"),d.mixin(i.prototype,"Mixin.Triggers"),d.mixin(i.prototype,"Mixin.Matching"),d.mixin(i.prototype,"Mixin.Updating"),d.mixin(i.prototype,"Mixin.Tags"),f=a("./Overload"),e=a("./Collection"),g=d.modules.Db,h=a("./Path"),d.synthesize(i.prototype,"state"),d.synthesize(i.prototype,"db"),d.synthesize(i.prototype,"name"),i.prototype.setData=function(a,b){var c,d,e;if(a){if(b=b||{$decouple:!0},b&&b.$decouple===!0&&(a=this.decouple(a)),this._linked){e={};for(c in this._data)"jQuery"!==c.substr(0,6)&&this._data.hasOwnProperty(c)&&void 0===a[c]&&(e[c]=1);a.$unset=e,this.updateObject(this._data,a,{})}else this._data=a;d={type:"setData",data:this.decouple(this._data)},this.emit("immediateChange",d),this.deferEmit("change",d)}return this},i.prototype.find=function(a,b){var c;return c=b&&b.$decouple===!1?this._data:this.decouple(this._data)},i.prototype.findSub=function(a,b,c,d){return this._findSub([this.find(a)],b,c,d)},i.prototype._findSub=function(a,b,c,d){var f,g,i,j=new h(b),k=a.length,l=new e("__FDB_temp_"+this.objectId()).db(this._db),m={parents:k,subDocTotal:0,subDocs:[],pathFound:!1,err:""};for(d=d||{},f=0;f<k;f++)if(g=j.value(a[f])[0]){if(l.setData(g),i=l.find(c,d),d.$returnFirst&&i.length)return i[0];d.$split?m.subDocs.push(i):m.subDocs=m.subDocs.concat(i),m.subDocTotal+=i.length,m.pathFound=!0}return l.drop(),m.pathFound||(m.err="No objects found in the parent documents with a matching path of: "+b),d.$stats?m:m.subDocs[0]},i.prototype.update=function(a,b,c){var d,e=this.updateObject(this._data,b,a,c);e&&(d={type:"update",data:this.decouple(this._data)},this.emit("immediateChange",d),this.deferEmit("change",d))},i.prototype.updateObject=e.prototype.updateObject,i.prototype._isPositionalKey=function(a){return".$"===a.substr(a.length-2,2)},i.prototype._updateProperty=function(a,b,c){this._linked?(window.jQuery.observable(a).setProperty(b,c),this.debug()&&console.log(this.logIdentifier()+' Setting data-bound document property "'+b+'"')):(a[b]=c,this.debug()&&console.log(this.logIdentifier()+' Setting non-data-bound document property "'+b+'" to val "'+c+'"'))},i.prototype._updateIncrement=function(a,b,c){this._linked?window.jQuery.observable(a).setProperty(b,a[b]+c):a[b]+=c},i.prototype._updateSpliceMove=function(a,b,c){this._linked?(window.jQuery.observable(a).move(b,c),this.debug()&&console.log(this.logIdentifier()+' Moving data-bound document array index from "'+b+'" to "'+c+'"')):(a.splice(c,0,a.splice(b,1)[0]),this.debug()&&console.log(this.logIdentifier()+' Moving non-data-bound document array index from "'+b+'" to "'+c+'"'))},i.prototype._updateSplicePush=function(a,b,c){a.length>b?this._linked?window.jQuery.observable(a).insert(b,c):a.splice(b,0,c):this._linked?window.jQuery.observable(a).insert(c):a.push(c)},i.prototype._updatePush=function(a,b){this._linked?window.jQuery.observable(a).insert(b):a.push(b)},i.prototype._updatePull=function(a,b){this._linked?window.jQuery.observable(a).remove(b):a.splice(b,1)},i.prototype._updateMultiply=function(a,b,c){this._linked?window.jQuery.observable(a).setProperty(b,a[b]*c):a[b]*=c},i.prototype._updateRename=function(a,b,c){var d=a[b];this._linked?(window.jQuery.observable(a).setProperty(c,d),window.jQuery.observable(a).removeProperty(b)):(a[c]=d,delete a[b])},i.prototype._updateUnset=function(a,b){this._linked?window.jQuery.observable(a).removeProperty(b):delete a[b]},i.prototype.drop=function(a){return!!this.isDropped()||!!(this._db&&this._name&&this._db&&this._db._document&&this._db._document[this._name])&&(this._state="dropped",delete this._db._document[this._name],delete this._data,this.emit("drop",this),a&&a(!1,!0),delete this._listeners,!0)},g.prototype.document=new f("Db.prototype.document",{"":function(){return this.$main.call(this,{name:this.objectId()})},object:function(a){return a instanceof i?"droppped"!==a.state()?a:this.$main.call(this,{name:a.name()}):this.$main.call(this,a)},string:function(a){return this.$main.call(this,{name:a})},"string, object":function(a,b){return b.name=a,this.$main.call(this,b)},$main:function(a){var b=this,c=a.name;if(c){if(this._document&&this._document[c])return this._document[c];if(!a||a.autoCreate!==!1)return this.debug()&&console.log(this.logIdentifier()+" Creating document "+c),this._document=this._document||{},this._document[c]=this._document[c]||new i(c,a).db(this),b._document[c].on("change",function(){b.emit("change",b._document[c],"document",c)}),b.deferEmit("create",b._document[c],"document",c),this._document[c];if(a&&a.throwError!==!1)throw this.logIdentifier()+" Cannot get document "+c+" because it does not exist and auto-create has been disabled!"}else if(!a||a&&a.throwError!==!1)throw this.logIdentifier()+" Cannot get document with undefined name!"}}),g.prototype.documents=function(){var a,b,c=[];for(b in this._document)this._document.hasOwnProperty(b)&&(a=this._document[b],c.push({name:b,linked:void 0!==a.isLinked&&a.isLinked()}));return c},d.finishModule("Document"),b.exports=i},{"./Collection":6,"./Overload":32,"./Path":34,"./Shared":40}],12:[function(a,b,c){"use strict";var d,e,f,g,h=Math.PI/180,i=180/Math.PI,j=6371;d=[16,8,4,2,1],e="0123456789bcdefghjkmnpqrstuvwxyz",f={right:{even:"bc01fg45238967deuvhjyznpkmstqrwx"},left:{even:"238967debc01fg45kmstqrwxuvhjyznp"},top:{even:"p0r21436x8zb9dcf5h7kjnmqesgutwvy"},bottom:{even:"14365h7k9dcfesgujnmqp0r2twvyx8zb"}},g={right:{even:"bcfguvyz"},left:{even:"0145hjnp"},top:{even:"prxz"},bottom:{even:"028b"}},f.bottom.odd=f.left.even,f.top.odd=f.right.even,f.left.odd=f.bottom.even,f.right.odd=f.top.even,g.bottom.odd=g.left.even,g.top.odd=g.right.even,g.left.odd=g.bottom.even,g.right.odd=g.top.even;var k=function(){};k.prototype.radians=function(a){return a*h},k.prototype.degrees=function(a){return a*i},k.prototype.refineInterval=function(a,b,c){b&c?a[0]=(a[0]+a[1])/2:a[1]=(a[0]+a[1])/2},k.prototype.calculateNeighbours=function(a,b){var c;return b&&"object"!==b.type?(c=[],c[4]=a,c[3]=this.calculateAdjacent(a,"left"),c[5]=this.calculateAdjacent(a,"right"),c[1]=this.calculateAdjacent(a,"top"),c[7]=this.calculateAdjacent(a,"bottom"),c[0]=this.calculateAdjacent(c[3],"top"),c[2]=this.calculateAdjacent(c[5],"top"),c[6]=this.calculateAdjacent(c[3],"bottom"),c[8]=this.calculateAdjacent(c[5],"bottom")):(c={center:a,left:this.calculateAdjacent(a,"left"),right:this.calculateAdjacent(a,"right"),top:this.calculateAdjacent(a,"top"),bottom:this.calculateAdjacent(a,"bottom")},c.topLeft=this.calculateAdjacent(c.left,"top"),c.topRight=this.calculateAdjacent(c.right,"top"),c.bottomLeft=this.calculateAdjacent(c.left,"bottom"),c.bottomRight=this.calculateAdjacent(c.right,"bottom")),c},k.prototype.calculateLatLngByDistanceBearing=function(a,b,c){var d=a[1],e=a[0],f=Math.asin(Math.sin(this.radians(e))*Math.cos(b/j)+Math.cos(this.radians(e))*Math.sin(b/j)*Math.cos(this.radians(c))),g=this.radians(d)+Math.atan2(Math.sin(this.radians(c))*Math.sin(b/j)*Math.cos(this.radians(e)),Math.cos(b/j)-Math.sin(this.radians(e))*Math.sin(f)),h=(g+3*Math.PI)%(2*Math.PI)-Math.PI;
return{lat:this.degrees(f),lng:this.degrees(h)}},k.prototype.calculateExtentByRadius=function(a,b){var c,d,e,f,g=[],h=[];return e=this.calculateLatLngByDistanceBearing(a,b,0),d=this.calculateLatLngByDistanceBearing(a,b,90),f=this.calculateLatLngByDistanceBearing(a,b,180),c=this.calculateLatLngByDistanceBearing(a,b,270),g[0]=e.lat,g[1]=f.lat,h[0]=c.lng,h[1]=d.lng,{lat:g,lng:h}},k.prototype.calculateHashArrayByRadius=function(a,b,c){var d,e,f,g=this.calculateExtentByRadius(a,b),h=[g.lat[0],g.lng[0]],i=[g.lat[0],g.lng[1]],j=[g.lat[1],g.lng[0]],k=this.encode(h[0],h[1],c),l=this.encode(i[0],i[1],c),m=this.encode(j[0],j[1],c),n=0,o=0,p=[];for(d=k,p.push(d);d!==l;)d=this.calculateAdjacent(d,"right"),n++,p.push(d);for(d=k;d!==m;)d=this.calculateAdjacent(d,"bottom"),o++;for(e=0;e<=n;e++)for(d=p[e],f=0;f<o;f++)d=this.calculateAdjacent(d,"bottom"),p.push(d);return p},k.prototype.calculateAdjacent=function(a,b){a=a.toLowerCase();var c=a.charAt(a.length-1),d=a.length%2?"odd":"even",h=a.substring(0,a.length-1);return g[b][d].indexOf(c)!==-1&&(h=this.calculateAdjacent(h,b)),h+e[f[b][d].indexOf(c)]},k.prototype.decode=function(a){var b,c,f,g,h,i,j,k=1,l=[],m=[];for(l[0]=-90,l[1]=90,m[0]=-180,m[1]=180,i=90,j=180,b=0;b<a.length;b++)for(c=a[b],f=e.indexOf(c),g=0;g<5;g++)h=d[g],k?(j/=2,this.refineInterval(m,f,h)):(i/=2,this.refineInterval(l,f,h)),k=!k;return l[2]=(l[0]+l[1])/2,m[2]=(m[0]+m[1])/2,{lat:l,lng:m}},k.prototype.encode=function(a,b,c){var f,g=1,h=[],i=[],j=0,k=0,l="";for(c||(c=12),h[0]=-90,h[1]=90,i[0]=-180,i[1]=180;l.length<c;)g?(f=(i[0]+i[1])/2,b>f?(k|=d[j],i[0]=f):i[1]=f):(f=(h[0]+h[1])/2,a>f?(k|=d[j],h[0]=f):h[1]=f),g=!g,j<4?j++:(l+=e[k],j=0,k=0);return l},"undefined"!=typeof b&&(b.exports=k)},{}],13:[function(a,b,c){"use strict";var d,e,f,g,h,i,j,k;d=a("./Shared");var l=function(a,b,c){this.init.apply(this,arguments)};l.prototype.init=function(a,b,c){var d=this;this._baseQuery={},this._selector=a,this._template=b,this._options=c||{},this._debug={},this._id=this.objectId(),this._collectionDroppedWrap=function(){d._collectionDropped.apply(d,arguments)}},d.addModule("Grid",l),d.mixin(l.prototype,"Mixin.Common"),d.mixin(l.prototype,"Mixin.ChainReactor"),d.mixin(l.prototype,"Mixin.Constants"),d.mixin(l.prototype,"Mixin.Triggers"),d.mixin(l.prototype,"Mixin.Events"),d.mixin(l.prototype,"Mixin.Tags"),f=a("./Collection"),g=a("./CollectionGroup"),h=a("./View"),k=a("./ReactorIO"),i=f.prototype.init,e=d.modules.Db,j=e.prototype.init,d.synthesize(l.prototype,"state"),d.synthesize(l.prototype,"name"),l.prototype.insert=function(){this._from.insert.apply(this._from,arguments)},l.prototype.update=function(){this._from.update.apply(this._from,arguments)},l.prototype.updateById=function(){this._from.updateById.apply(this._from,arguments)},l.prototype.remove=function(){this._from.remove.apply(this._from,arguments)},l.prototype.from=function(a){return void 0!==a&&(this._from&&(this._from.off("drop",this._collectionDroppedWrap),this._from._removeGrid(this)),"string"==typeof a&&(a=this._db.collection(a)),this._from=a,this._from.on("drop",this._collectionDroppedWrap),"function"==typeof this._from.query&&(this._baseQuery=this._from.query()),this.refresh()),this},d.synthesize(l.prototype,"db",function(a){return a&&this.debug(a.debug()),this.$super.apply(this,arguments)}),l.prototype._collectionDropped=function(a){a&&delete this._from},l.prototype.drop=function(a){return!!this.isDropped()||!!this._from&&(this._from.unlink(this._selector,this.template()),this._from.off("drop",this._collectionDroppedWrap),this._from._removeGrid(this),(this.debug()||this._db&&this._db.debug())&&console.log(this.logIdentifier()+" Dropping grid "+this._selector),this._state="dropped",this._db&&this._selector&&delete this._db._grid[this._selector],this.emit("drop",this),a&&a(!1,!0),delete this._selector,delete this._template,delete this._from,delete this._db,delete this._listeners,!0)},l.prototype.template=function(a){return void 0!==a?(this._template=a,this):this._template},l.prototype._sortGridClick=function(a){var b,c=window.jQuery(a.currentTarget),e=c.attr("data-grid-sort")||"",f=parseInt(c.attr("data-grid-dir")||"-1",10)===-1?1:-1,g=e.split(","),h={};for(window.jQuery(this._selector).find("[data-grid-dir]").removeAttr("data-grid-dir"),c.attr("data-grid-dir",f),b=0;b<g.length;b++)h[g]=f;d.mixin(h,this._options.$orderBy),this.emit("beforeChange","sort"),this.emit("beforeSort",h),this._from.orderBy(h),this.emit("sort",h)},l.prototype.query=function(a,b){return this._baseQuery=a,this._baseQueryOptions=b,this},l.prototype.refresh=function(){if(this._from){if(!this._from.link)throw"Grid requires the AutoBind module in order to operate!";var a=this,b=window.jQuery(this._selector),c=function(){a._sortGridClick.apply(a,arguments)};if(b.html(""),a._from.orderBy&&b.off("click","[data-grid-sort]",c),a._options.$wrap=a._options.$wrap||"gridRow",a._from.link(a._selector,a.template(),a._options),a._from.orderBy&&b.on("click","[data-grid-sort]",c),a._from.query){var d=a.decouple(a._baseQuery);b.find("[data-grid-filter]").each(function(c,e){e=window.jQuery(e);var f,g,h,i,j,k=e.attr("data-grid-filter"),l=e.attr("data-grid-vartype"),m={},n=e.html(),o=a._db.view("tmpGridFilter_"+a._id+"_"+k);m[k]=1,j={$distinct:m},o.query(j).orderBy(m).from(a._from._from),i=function(){o.refresh()},a._from._from.on("change",i),a.on("drop",function(){a._from&&a._from._from&&a._from._from.off("change",i),o.drop()}),h=['<div class="dropdown" id="'+a._id+"_"+k+'">','<button class="btn btn-default dropdown-toggle" type="button" id="'+a._id+"_"+k+'_dropdownButton" data-toggle="dropdown" aria-expanded="true">',n+' <span class="caret"></span>',"</button>","</div>"],f=window.jQuery(h.join("")),g=window.jQuery('<ul class="dropdown-menu" role="menu" id="'+a._id+"_"+k+'_dropdownMenu"></ul>'),f.append(g),e.html(f),o.link(g,{template:['<li role="presentation" class="input-group" style="width: 240px; padding-left: 10px; padding-right: 10px; padding-top: 5px;">','<input type="search" class="form-control gridFilterSearch" placeholder="Search...">','<span class="input-group-btn">','<button class="btn btn-default gridFilterClearSearch" type="button"><span class="glyphicon glyphicon-remove-circle glyphicons glyphicons-remove"></span></button>',"</span>","</li>",'<li role="presentation" class="divider"></li>','<li role="presentation" data-val="$all">','<a role="menuitem" tabindex="-1">','<input type="checkbox" checked>&nbsp;All',"</a>","</li>",'<li role="presentation" class="divider"></li>',"{^{for options}}",'<li role="presentation" data-link="data-val{:'+k+'}">','<a role="menuitem" tabindex="-1">','<input type="checkbox">&nbsp;{^{:'+k+"}}","</a>","</li>","{{/for}}"].join("")},{$wrap:"options"}),b.on("keyup","#"+a._id+"_"+k+"_dropdownMenu .gridFilterSearch",function(a){var b=window.jQuery(this),c=o.query(),d=b.val();d?c[k]=new RegExp(d,"gi"):delete c[k],o.query(c)}),b.on("click","#"+a._id+"_"+k+"_dropdownMenu .gridFilterClearSearch",function(a){window.jQuery(this).parents("li").find(".gridFilterSearch").val("");var b=o.query();delete b[k],o.query(b)}),b.on("click","#"+a._id+"_"+k+"_dropdownMenu li",function(b){b.stopPropagation();var c,e,f,g,h,i=$(this),j=i.find('input[type="checkbox"]'),m=!0;if(window.jQuery(b.target).is("input")?(j.prop("checked",j.prop("checked")),e=j.is(":checked")):(j.prop("checked",!j.prop("checked")),e=j.is(":checked")),g=window.jQuery(this),c=g.attr("data-val"),"$all"===c)delete d[k],g.parent().find('li[data-val!="$all"]').find('input[type="checkbox"]').prop("checked",!1);else{switch(g.parent().find('[data-val="$all"]').find('input[type="checkbox"]').prop("checked",!1),l){case"integer":c=parseInt(c,10);break;case"float":c=parseFloat(c)}for(d[k]=d[k]||{$in:[]},f=d[k].$in,f||(f=d[k].$in=[]),h=0;h<f.length;h++)if(f[h]===c){e===!1&&f.splice(h,1),m=!1;break}m&&e&&f.push(c),f.length||delete d[k]}a.emit("beforeChange","filter"),a.emit("beforeFilter",d),a._from.queryData(d),a._from.pageFirst&&a._from.pageFirst()})})}a.emit("refresh")}return this},l.prototype.count=function(){return this._from.count()},f.prototype.grid=h.prototype.grid=function(a,b,c){if(this._db&&this._db._grid){if(void 0!==a){if(void 0!==b){if(this._db._grid[a])throw this.logIdentifier()+" Cannot create a grid because a grid with this name already exists: "+a;var d=new l(a,b,c).db(this._db).from(this);return this._grid=this._grid||[],this._grid.push(d),this._db._grid[a]=d,d}return this._db._grid[a]}return this._db._grid}},f.prototype.unGrid=h.prototype.unGrid=function(a,b,c){var d,e;if(this._db&&this._db._grid){if(a&&b){if(this._db._grid[a])return e=this._db._grid[a],delete this._db._grid[a],e.drop();throw this.logIdentifier()+" Cannot remove grid because a grid with this name does not exist: "+name}for(d in this._db._grid)this._db._grid.hasOwnProperty(d)&&(e=this._db._grid[d],delete this._db._grid[d],e.drop(),this.debug()&&console.log(this.logIdentifier()+' Removed grid binding "'+d+'"'));this._db._grid={}}},f.prototype._addGrid=g.prototype._addGrid=h.prototype._addGrid=function(a){return void 0!==a&&(this._grid=this._grid||[],this._grid.push(a)),this},f.prototype._removeGrid=g.prototype._removeGrid=h.prototype._removeGrid=function(a){if(void 0!==a&&this._grid){var b=this._grid.indexOf(a);b>-1&&this._grid.splice(b,1)}return this},e.prototype.init=function(){this._grid={},j.apply(this,arguments)},e.prototype.gridExists=function(a){return Boolean(this._grid[a])},e.prototype.grid=function(a,b,c){return this._grid[a]||(this.debug()||this._db&&this._db.debug())&&console.log(this.logIdentifier()+" Creating grid "+a),this._grid[a]=this._grid[a]||new l(a,b,c).db(this),this._grid[a]},e.prototype.unGrid=function(a,b,c){return this._grid[a]||(this.debug()||this._db&&this._db.debug())&&console.log(this.logIdentifier()+" Creating grid "+a),this._grid[a]=this._grid[a]||new l(a,b,c).db(this),this._grid[a]},e.prototype.grids=function(){var a,b,c=[];for(b in this._grid)this._grid.hasOwnProperty(b)&&(a=this._grid[b],c.push({name:b,count:a.count(),linked:void 0!==a.isLinked&&a.isLinked()}));return c},d.finishModule("Grid"),b.exports=l},{"./Collection":6,"./CollectionGroup":7,"./ReactorIO":38,"./Shared":40,"./View":42}],14:[function(a,b,c){"use strict";var d,e,f,g;d=a("./Shared"),g=a("./Overload");var h=function(a,b){this.init.apply(this,arguments)};h.prototype.init=function(a,b){if(this._options=b,this._selector=window.jQuery(this._options.selector),!this._selector[0])throw this.classIdentifier()+' "'+a.name()+'": Chart target element does not exist via selector: '+this._options.selector;this._listeners={},this._collection=a,this._options.series=[],b.chartOptions=b.chartOptions||{},b.chartOptions.credits=!1;var c,d,e;switch(this._options.type){case"pie":this._selector.highcharts(this._options.chartOptions),this._chart=this._selector.highcharts(),c=this._collection.find(),d={allowPointSelect:!0,cursor:"pointer",dataLabels:{enabled:!0,format:"<b>{point.name}</b>: {y} ({point.percentage:.0f}%)",style:{color:window.Highcharts.theme&&window.Highcharts.theme.contrastTextColor||"black"}}},e=this.pieDataFromCollectionData(c,this._options.keyField,this._options.valField),window.jQuery.extend(d,this._options.seriesOptions),window.jQuery.extend(d,{name:this._options.seriesName,data:e}),this._chart.addSeries(d,!0,!0);break;case"line":case"area":case"column":case"bar":e=this.seriesDataFromCollectionData(this._options.seriesField,this._options.keyField,this._options.valField,this._options.orderBy,this._options),this._options.chartOptions.xAxis=e.xAxis,this._options.chartOptions.series=e.series,this._selector.highcharts(this._options.chartOptions),this._chart=this._selector.highcharts();break;default:throw this.classIdentifier()+' "'+a.name()+'": Chart type specified is not currently supported by ForerunnerDB: '+this._options.type}this._hookEvents()},d.addModule("Highchart",h),e=d.modules.Collection,f=e.prototype.init,d.mixin(h.prototype,"Mixin.Common"),d.mixin(h.prototype,"Mixin.Events"),d.synthesize(h.prototype,"state"),h.prototype.pieDataFromCollectionData=function(a,b,c){var d,e=[];for(d=0;d<a.length;d++)e.push([a[d][b],a[d][c]]);return e},h.prototype.seriesDataFromCollectionData=function(a,b,c,d,e){var f,g,h,i,j,k,l,m=this._collection.distinct(a),n=[],o=e&&e.chartOptions&&e.chartOptions.xAxis?e.chartOptions.xAxis:{categories:[]};for(k=0;k<m.length;k++){for(f=m[k],g={},g[a]=f,i=[],h=this._collection.find(g,{orderBy:d}),l=0;l<h.length;l++)o.categories?(o.categories.push(h[l][b]),i.push(h[l][c])):i.push([h[l][b],h[l][c]]);if(j={name:f,data:i},e.seriesOptions)for(l in e.seriesOptions)e.seriesOptions.hasOwnProperty(l)&&(j[l]=e.seriesOptions[l]);n.push(j)}return{xAxis:o,series:n}},h.prototype._hookEvents=function(){var a=this;a._collection.on("change",function(){a._changeListener.apply(a,arguments)}),a._collection.on("drop",function(){a.drop.apply(a)})},h.prototype._changeListener=function(){var a=this;if("undefined"!=typeof a._collection&&a._chart){var b,c=a._collection.find();switch(a._options.type){case"pie":a._chart.series[0].setData(a.pieDataFromCollectionData(c,a._options.keyField,a._options.valField),!0,!0);break;case"bar":case"line":case"area":case"column":var d=a.seriesDataFromCollectionData(a._options.seriesField,a._options.keyField,a._options.valField,a._options.orderBy,a._options);for(d.xAxis.categories&&a._chart.xAxis[0].setCategories(d.xAxis.categories),b=0;b<d.series.length;b++)a._chart.series[b]?a._chart.series[b].setData(d.series[b].data,!0,!0):a._chart.addSeries(d.series[b],!0,!0)}}},h.prototype.drop=function(a){return!!this.isDropped()||(this._state="dropped",this._chart&&this._chart.destroy(),this._collection&&(this._collection.off("change",this._changeListener),this._collection.off("drop",this.drop),this._collection._highcharts&&delete this._collection._highcharts[this._options.selector]),delete this._chart,delete this._options,delete this._collection,this.emit("drop",this),a&&a(!1,!0),delete this._listeners,!0)},e.prototype.init=function(){this._highcharts={},f.apply(this,arguments)},e.prototype.pieChart=new g({object:function(a){return a.type="pie",a.chartOptions=a.chartOptions||{},a.chartOptions.chart=a.chartOptions.chart||{},a.chartOptions.chart.type="pie",this._highcharts[a.selector]||(this._highcharts[a.selector]=new h(this,a)),this._highcharts[a.selector]},"*, string, string, string, ...":function(a,b,c,d,e){e=e||{},e.selector=a,e.keyField=b,e.valField=c,e.seriesName=d,this.pieChart(e)}}),e.prototype.lineChart=new g({string:function(a){return this._highcharts[a]},object:function(a){return a.type="line",a.chartOptions=a.chartOptions||{},a.chartOptions.chart=a.chartOptions.chart||{},a.chartOptions.chart.type="line",this._highcharts[a.selector]||(this._highcharts[a.selector]=new h(this,a)),this._highcharts[a.selector]},"*, string, string, string, ...":function(a,b,c,d,e){e=e||{},e.seriesField=b,e.selector=a,e.keyField=c,e.valField=d,this.lineChart(e)}}),e.prototype.areaChart=new g({object:function(a){return a.type="area",a.chartOptions=a.chartOptions||{},a.chartOptions.chart=a.chartOptions.chart||{},a.chartOptions.chart.type="area",this._highcharts[a.selector]||(this._highcharts[a.selector]=new h(this,a)),this._highcharts[a.selector]},"*, string, string, string, ...":function(a,b,c,d,e){e=e||{},e.seriesField=b,e.selector=a,e.keyField=c,e.valField=d,this.areaChart(e)}}),e.prototype.columnChart=new g({object:function(a){return a.type="column",a.chartOptions=a.chartOptions||{},a.chartOptions.chart=a.chartOptions.chart||{},a.chartOptions.chart.type="column",this._highcharts[a.selector]||(this._highcharts[a.selector]=new h(this,a)),this._highcharts[a.selector]},"*, string, string, string, ...":function(a,b,c,d,e){e=e||{},e.seriesField=b,e.selector=a,e.keyField=c,e.valField=d,this.columnChart(e)}}),e.prototype.barChart=new g({object:function(a){return a.type="bar",a.chartOptions=a.chartOptions||{},a.chartOptions.chart=a.chartOptions.chart||{},a.chartOptions.chart.type="bar",this._highcharts[a.selector]||(this._highcharts[a.selector]=new h(this,a)),this._highcharts[a.selector]},"*, string, string, string, ...":function(a,b,c,d,e){e=e||{},e.seriesField=b,e.selector=a,e.keyField=c,e.valField=d,this.barChart(e)}}),e.prototype.stackedBarChart=new g({object:function(a){return a.type="bar",a.chartOptions=a.chartOptions||{},a.chartOptions.chart=a.chartOptions.chart||{},a.chartOptions.chart.type="bar",a.plotOptions=a.plotOptions||{},a.plotOptions.series=a.plotOptions.series||{},a.plotOptions.series.stacking=a.plotOptions.series.stacking||"normal",this._highcharts[a.selector]||(this._highcharts[a.selector]=new h(this,a)),this._highcharts[a.selector]},"*, string, string, string, ...":function(a,b,c,d,e){e=e||{},e.seriesField=b,e.selector=a,e.keyField=c,e.valField=d,this.stackedBarChart(e)}}),e.prototype.dropChart=function(a){this._highcharts&&this._highcharts[a]&&this._highcharts[a].drop()},d.finishModule("Highchart"),b.exports=h},{"./Overload":32,"./Shared":40}],15:[function(a,b,c){"use strict";var d=a("./Shared"),e=a("./Path"),f=a("./BinaryTree"),g=a("./GeoHash"),h=new e,i=new g,j=[5e3,1250,156,39.1,4.89,1.22,.153,.0382,.00477,.00119,149e-6,372e-7],k=function(){this.init.apply(this,arguments)};k.prototype.init=function(a,b,c){this._btree=new f,this._btree.index(a),this._size=0,this._id=this._itemKeyHash(a,a),this._debug=!(!b||!b.debug)&&b.debug,this.unique(!(!b||!b.unique)&&b.unique),void 0!==a&&this.keys(a),void 0!==c&&(this.collection(c),this._btree.primaryKey(c.primaryKey())),this.name(b&&b.name?b.name:this._id),this._btree.debug(this._debug)},d.addModule("Index2d",k),d.mixin(k.prototype,"Mixin.Common"),d.mixin(k.prototype,"Mixin.ChainReactor"),d.mixin(k.prototype,"Mixin.Sorting"),k.prototype.id=function(){return this._id},k.prototype.state=function(){return this._state},k.prototype.size=function(){return this._size},d.synthesize(k.prototype,"data"),d.synthesize(k.prototype,"name"),d.synthesize(k.prototype,"collection"),d.synthesize(k.prototype,"type"),d.synthesize(k.prototype,"unique"),k.prototype.keys=function(a){return void 0!==a?(this._keys=a,this._keyCount=h.parse(this._keys).length,this):this._keys},k.prototype.rebuild=function(){if(this._collection){var a,b=this._collection.subset({},{$decouple:!1,$orderBy:this._keys}),c=b.find(),d=c.length;for(this._btree.clear(),this._size=0,this._unique&&(this._uniqueLookup={}),a=0;a<d;a++)this.insert(c[a])}this._state={name:this._name,keys:this._keys,indexSize:this._size,built:new Date,updated:new Date,ok:!0}},k.prototype.insert=function(a,b){var c,d=this._unique;a=this.decouple(a),d&&(c=this._itemHash(a,this._keys),this._uniqueLookup[c]=a);var e,f,g,j,k,l=this._btree.keys();for(k=0;k<l.length;k++)e=h.get(a,l[k].path),e instanceof Array&&(g=e[0],j=e[1],f=i.encode(g,j),h.set(a,l[k].path,f));return!!this._btree.insert(a)&&(this._size++,!0)},k.prototype.remove=function(a,b){var c,d=this._unique;return d&&(c=this._itemHash(a,this._keys),delete this._uniqueLookup[c]),!!this._btree.remove(a)&&(this._size--,!0)},k.prototype.violation=function(a){var b=this._itemHash(a,this._keys);return Boolean(this._uniqueLookup[b])},k.prototype.hashViolation=function(a){return Boolean(this._uniqueLookup[a])},k.prototype.lookup=function(a,b,c){var d,e,f,g,i=this._btree.keys();for(g=0;g<i.length;g++)if(d=i[g].path,e=h.get(a,d),"object"==typeof e)return e.$near&&(f=[],f=f.concat(this.near(d,e.$near,b,c))),e.$geoWithin&&(f=[],f=f.concat(this.geoWithin(d,e.$geoWithin,b,c))),f;return this._btree.lookup(a,b)},k.prototype.near=function(a,b,c,d){var e,f,g,k,l,m,n,o,p,q,r,s,t=this,u=[],v=this._collection.primaryKey();if("km"===b.$distanceUnits){for(o=b.$maxDistance,s=0;s<j.length;s++)if(o>j[s]){n=s+1;break}}else if("miles"===b.$distanceUnits)for(o=1.60934*b.$maxDistance,s=0;s<j.length;s++)if(o>j[s]){n=s+1;break}for(0===n&&(n=1),d&&d.time("index2d.calculateHashArea"),e=i.calculateHashArrayByRadius(b.$point,o,n),d&&d.time("index2d.calculateHashArea"),d&&(d.data("index2d.near.precision",n),d.data("index2d.near.hashArea",e),d.data("index2d.near.maxDistanceKm",o),d.data("index2d.near.centerPointCoords",[b.$point[0],b.$point[1]])),m=[],f=0,k={},g=[],d&&d.time("index2d.near.getDocsInsideHashArea"),s=0;s<e.length;s++)l=this._btree.startsWith(a,e[s]),k[e[s]]=l,f+=l._visitedCount,g=g.concat(l._visitedNodes),m=m.concat(l);if(d&&(d.time("index2d.near.getDocsInsideHashArea"),d.data("index2d.near.startsWith",k),d.data("index2d.near.visitedTreeNodes",g)),d&&d.time("index2d.near.lookupDocsById"),m=this._collection._primaryIndex.lookup(m),d&&d.time("index2d.near.lookupDocsById"),b.$distanceField&&(m=this.decouple(m)),m.length){for(p={},d&&d.time("index2d.near.calculateDistanceFromCenter"),s=0;s<m.length;s++)r=h.get(m[s],a),q=p[m[s][v]]=this.distanceBetweenPoints(b.$point[0],b.$point[1],r[0],r[1]),q<=o&&(b.$distanceField&&h.set(m[s],b.$distanceField,"km"===b.$distanceUnits?q:Math.round(.621371*q)),b.$geoHashField&&h.set(m[s],b.$geoHashField,i.encode(r[0],r[1],n)),u.push(m[s]));d&&d.time("index2d.near.calculateDistanceFromCenter"),d&&d.time("index2d.near.sortResultsByDistance"),u.sort(function(a,b){return t.sortAsc(p[a[v]],p[b[v]])}),d&&d.time("index2d.near.sortResultsByDistance")}return u},k.prototype.geoWithin=function(a,b,c){return console.log("geoWithin() is currently a prototype method with no actual implementation... it just returns a blank array."),[]},k.prototype.distanceBetweenPoints=function(a,b,c,d){var e=6371,f=this.toRadians(a),g=this.toRadians(c),h=this.toRadians(c-a),i=this.toRadians(d-b),j=Math.sin(h/2)*Math.sin(h/2)+Math.cos(f)*Math.cos(g)*Math.sin(i/2)*Math.sin(i/2),k=2*Math.atan2(Math.sqrt(j),Math.sqrt(1-j));return e*k},k.prototype.toRadians=function(a){return.01747722222222*a},k.prototype.match=function(a,b){return this._btree.match(a,b)},k.prototype._itemHash=function(a,b){var c,d,f=new e,g="";for(c=f.parse(b),d=0;d<c.length;d++)g&&(g+="_"),g+=f.value(a,c[d].path).join(":");return g},k.prototype._itemKeyHash=function(a,b){var c,d,f=new e,g="";for(c=f.parse(b),d=0;d<c.length;d++)g&&(g+="_"),g+=f.keyValue(a,c[d].path);return g},k.prototype._itemHashArr=function(a,b){var c,d,f,g,h,i=new e,j=[];for(c=i.parse(b),g=0;g<c.length;g++)for(d=i.value(a,c[g].path),f=0;f<d.length;f++)if(0===g)j.push(d[f]);else for(h=0;h<j.length;h++)j[h]=j[h]+"_"+d[f];return j},d.index["2d"]=k,d.finishModule("Index2d"),b.exports=k},{"./BinaryTree":5,"./GeoHash":12,"./Path":34,"./Shared":40}],16:[function(a,b,c){"use strict";var d=a("./Shared"),e=a("./Path"),f=a("./BinaryTree"),g=function(){this.init.apply(this,arguments)};g.prototype.init=function(a,b,c){this._btree=new f,this._btree.index(a),this._size=0,this._id=this._itemKeyHash(a,a),this._debug=!(!b||!b.debug)&&b.debug,this.unique(!(!b||!b.unique)&&b.unique),void 0!==a&&this.keys(a),void 0!==c&&(this.collection(c),this._btree.primaryKey(c.primaryKey())),this.name(b&&b.name?b.name:this._id),this._btree.debug(this._debug)},d.addModule("IndexBinaryTree",g),d.mixin(g.prototype,"Mixin.ChainReactor"),d.mixin(g.prototype,"Mixin.Sorting"),g.prototype.id=function(){return this._id},g.prototype.state=function(){return this._state},g.prototype.size=function(){return this._size},d.synthesize(g.prototype,"data"),d.synthesize(g.prototype,"name"),d.synthesize(g.prototype,"collection"),d.synthesize(g.prototype,"type"),d.synthesize(g.prototype,"unique"),g.prototype.keys=function(a){return void 0!==a?(this._keys=a,this._keyCount=(new e).parse(this._keys).length,this):this._keys},g.prototype.rebuild=function(){if(this._collection){var a,b=this._collection.subset({},{$decouple:!1,$orderBy:this._keys}),c=b.find(),d=c.length;for(this._btree.clear(),this._size=0,this._unique&&(this._uniqueLookup={}),a=0;a<d;a++)this.insert(c[a])}this._state={name:this._name,keys:this._keys,indexSize:this._size,built:new Date,updated:new Date,ok:!0}},g.prototype.insert=function(a,b){var c,d=this._unique;return d&&(c=this._itemHash(a,this._keys),this._uniqueLookup[c]=a),!!this._btree.insert(a)&&(this._size++,!0)},g.prototype.remove=function(a,b){var c,d=this._unique;return d&&(c=this._itemHash(a,this._keys),delete this._uniqueLookup[c]),!!this._btree.remove(a)&&(this._size--,!0)},g.prototype.violation=function(a){var b=this._itemHash(a,this._keys);return Boolean(this._uniqueLookup[b])},g.prototype.hashViolation=function(a){return Boolean(this._uniqueLookup[a])},g.prototype.lookup=function(a,b,c){return this._btree.lookup(a,b,c)},g.prototype.match=function(a,b){return this._btree.match(a,b)},g.prototype._itemHash=function(a,b){var c,d,f=new e,g="";for(c=f.parse(b),d=0;d<c.length;d++)g&&(g+="_"),g+=f.value(a,c[d].path).join(":");return g},g.prototype._itemKeyHash=function(a,b){var c,d,f=new e,g="";for(c=f.parse(b),d=0;d<c.length;d++)g&&(g+="_"),g+=f.keyValue(a,c[d].path);return g},g.prototype._itemHashArr=function(a,b){var c,d,f,g,h,i=new e,j=[];for(c=i.parse(b),g=0;g<c.length;g++)for(d=i.value(a,c[g].path),f=0;f<d.length;f++)if(0===g)j.push(d[f]);else for(h=0;h<j.length;h++)j[h]=j[h]+"_"+d[f];return j},d.index.btree=g,d.finishModule("IndexBinaryTree"),b.exports=g},{"./BinaryTree":5,"./Path":34,"./Shared":40}],17:[function(a,b,c){"use strict";var d=a("./Shared"),e=a("./Path"),f=function(){this.init.apply(this,arguments)};f.prototype.init=function(a,b,c){this._crossRef={},this._size=0,this._id=this._itemKeyHash(a,a),this.data({}),this.unique(!(!b||!b.unique)&&b.unique),void 0!==a&&this.keys(a),void 0!==c&&this.collection(c),this.name(b&&b.name?b.name:this._id)},d.addModule("IndexHashMap",f),d.mixin(f.prototype,"Mixin.ChainReactor"),f.prototype.id=function(){return this._id},f.prototype.state=function(){return this._state},f.prototype.size=function(){return this._size},d.synthesize(f.prototype,"data"),d.synthesize(f.prototype,"name"),d.synthesize(f.prototype,"collection"),d.synthesize(f.prototype,"type"),d.synthesize(f.prototype,"unique"),f.prototype.keys=function(a){return void 0!==a?(this._keys=a,this._keyCount=(new e).parse(this._keys).length,this):this._keys},f.prototype.rebuild=function(){if(this._collection){var a,b=this._collection.subset({},{$decouple:!1,$orderBy:this._keys}),c=b.find(),d=c.length;for(this._data={},this._size=0,this._unique&&(this._uniqueLookup={}),a=0;a<d;a++)this.insert(c[a])}this._state={name:this._name,keys:this._keys,indexSize:this._size,built:new Date,updated:new Date,ok:!0}},f.prototype.insert=function(a,b){var c,d,e,f=this._unique;for(f&&(c=this._itemHash(a,this._keys),this._uniqueLookup[c]=a),d=this._itemHashArr(a,this._keys),e=0;e<d.length;e++)this.pushToPathValue(d[e],a)},f.prototype.update=function(a,b){},f.prototype.remove=function(a,b){var c,d,e,f=this._unique;for(f&&(c=this._itemHash(a,this._keys),delete this._uniqueLookup[c]),d=this._itemHashArr(a,this._keys),e=0;e<d.length;e++)this.pullFromPathValue(d[e],a)},f.prototype.violation=function(a){var b=this._itemHash(a,this._keys);return Boolean(this._uniqueLookup[b])},f.prototype.hashViolation=function(a){return Boolean(this._uniqueLookup[a])},f.prototype.pushToPathValue=function(a,b){var c=this._data[a]=this._data[a]||[];c.indexOf(b)===-1&&(c.push(b),this._size++,this.pushToCrossRef(b,c))},f.prototype.pullFromPathValue=function(a,b){var c,d=this._data[a];c=d.indexOf(b),c>-1&&(d.splice(c,1),this._size--,this.pullFromCrossRef(b,d)),d.length||delete this._data[a]},f.prototype.pull=function(a){var b,c,d=a[this._collection.primaryKey()],e=this._crossRef[d],f=e.length;for(b=0;b<f;b++)c=e[b],this._pullFromArray(c,a);this._size--,delete this._crossRef[d]},f.prototype._pullFromArray=function(a,b){for(var c=a.length;c--;)a[c]===b&&a.splice(c,1)},f.prototype.pushToCrossRef=function(a,b){var c,d=a[this._collection.primaryKey()];this._crossRef[d]=this._crossRef[d]||[],c=this._crossRef[d],c.indexOf(b)===-1&&c.push(b)},f.prototype.pullFromCrossRef=function(a,b){var c=a[this._collection.primaryKey()];delete this._crossRef[c]},f.prototype.lookup=function(a){return this._data[this._itemHash(a,this._keys)]||[]},f.prototype.match=function(a,b){var c,d=new e,f=d.parseArr(this._keys),g=d.parseArr(a),h=[],i=0;for(c=0;c<f.length;c++){if(g[c]!==f[c])return{matchedKeys:[],totalKeyCount:g.length,score:0};i++,h.push(g[c])}return{matchedKeys:h,totalKeyCount:g.length,score:i}},f.prototype._itemHash=function(a,b){var c,d,f=new e,g="";for(c=f.parse(b),d=0;d<c.length;d++)g&&(g+="_"),g+=f.value(a,c[d].path).join(":");return g},f.prototype._itemKeyHash=function(a,b){var c,d,f=new e,g="";for(c=f.parse(b),d=0;d<c.length;d++)g&&(g+="_"),g+=f.keyValue(a,c[d].path);return g},f.prototype._itemHashArr=function(a,b){var c,d,f,g,h,i=new e,j=[];for(c=i.parse(b),g=0;g<c.length;g++)for(d=i.value(a,c[g].path),f=0;f<d.length;f++)if(0===g)j.push(d[f]);else for(h=0;h<j.length;h++)j[h]=j[h]+"_"+d[f];return j},d.index.hashed=f,d.finishModule("IndexHashMap"),b.exports=f},{"./Path":34,"./Shared":40}],18:[function(a,b,c){"use strict";var d=a("./Shared"),e=function(a,b){this.init.apply(this,arguments)};e.prototype.init=function(a,b){b=b||{},this._name=a,this._data={},this._primaryKey=b.primaryKey||"_id"},d.addModule("KeyValueStore",e),d.mixin(e.prototype,"Mixin.ChainReactor"),d.synthesize(e.prototype,"name"),e.prototype.primaryKey=function(a){return void 0!==a?(this._primaryKey=a,this):this._primaryKey},e.prototype.truncate=function(){return this._data={},this},e.prototype.set=function(a,b){return this._data[a]=!b||b,this},e.prototype.get=function(a){return this._data[a]},e.prototype.lookup=function(a){var b,c,d,e=this._primaryKey,f=typeof a,g=[];if("string"===f||"number"===f)return d=this.get(a),void 0!==d?[d]:[];if("object"===f){if(a instanceof Array){for(c=a.length,g=[],b=0;b<c;b++)d=this.lookup(a[b]),d&&(d instanceof Array?g=g.concat(d):g.push(d));return g}if(void 0!==a[e]&&null!==a[e])return this.lookup(a[e])}},e.prototype.unSet=function(a){return delete this._data[a],this},e.prototype.uniqueSet=function(a,b){return void 0===this._data[a]&&(this._data[a]=b,!0)},d.finishModule("KeyValueStore"),b.exports=e},{"./Shared":40}],19:[function(a,b,c){"use strict";var d=a("./Shared"),e=a("./Operation"),f=function(){this.init.apply(this,arguments)};f.prototype.init=function(){this._data=[]},d.addModule("Metrics",f),d.mixin(f.prototype,"Mixin.ChainReactor"),f.prototype.create=function(a){var b=new e(a);return this._enabled&&this._data.push(b),b},f.prototype.start=function(){return this._enabled=!0,this},f.prototype.stop=function(){return this._enabled=!1,this},f.prototype.clear=function(){return this._data=[],this},f.prototype.list=function(){return this._data},d.finishModule("Metrics"),b.exports=f},{"./Operation":31,"./Shared":40}],20:[function(a,b,c){"use strict";var d={preSetData:function(){},postSetData:function(){}};b.exports=d},{}],21:[function(a,b,c){"use strict";var d={chain:function(a){this.debug&&this.debug()&&(a._reactorIn&&a._reactorOut?console.log(a._reactorIn.logIdentifier()+' Adding target "'+a._reactorOut.instanceIdentifier()+'" to the chain reactor target list'):console.log(this.logIdentifier()+' Adding target "'+a.instanceIdentifier()+'" to the chain reactor target list')),this._chain=this._chain||[];var b=this._chain.indexOf(a);b===-1&&this._chain.push(a)},unChain:function(a){if(this.debug&&this.debug()&&(a._reactorIn&&a._reactorOut?console.log(a._reactorIn.logIdentifier()+' Removing target "'+a._reactorOut.instanceIdentifier()+'" from the chain reactor target list'):console.log(this.logIdentifier()+' Removing target "'+a.instanceIdentifier()+'" from the chain reactor target list')),this._chain){var b=this._chain.indexOf(a);b>-1&&this._chain.splice(b,1)}},chainEnabled:function(a){return void 0!==a?(this._chainDisabled=!a,this):!this._chainDisabled},chainWillSend:function(){return Boolean(this._chain&&!this._chainDisabled)},chainSend:function(a,b,c){if(this._chain&&!this._chainDisabled){var d,e,f=this._chain,g=f.length,h=this.decouple(b,g);for(e=0;e<g;e++){if(d=f[e],d._state&&(!d._state||d.isDropped()))throw console.log("Reactor Data:",a,b,c),console.log("Reactor Node:",d),"Chain reactor attempting to send data to target reactor node that is in a dropped state!";this.debug&&this.debug()&&(d._reactorIn&&d._reactorOut?console.log(d._reactorIn.logIdentifier()+' Sending data down the chain reactor pipe to "'+d._reactorOut.instanceIdentifier()+'"'):console.log(this.logIdentifier()+' Sending data down the chain reactor pipe to "'+d.instanceIdentifier()+'"')),
d.chainReceive&&d.chainReceive(this,a,h[e],c)}}},chainReceive:function(a,b,c,d){var e={sender:a,type:b,data:c,options:d},f=!1;this.debug&&this.debug()&&console.log(this.logIdentifier()+" Received data from parent reactor node"),this._chainHandler&&(f=this._chainHandler(e)),f||this.chainSend(e.type,e.data,e.options)}};b.exports=d},{}],22:[function(a,b,c){"use strict";var d,e,f=0,g=a("./Overload"),h=a("./Serialiser"),i=new h;e=function(){var a,b,c,d=[];for(b=0;b<256;b++){for(a=b,c=0;c<8;c++)a=1&a?3988292384^a>>>1:a>>>1;d[b]=a}return d}(),d={serialiser:i,make:function(a){return i.convert(a)},store:function(a,b){if(void 0!==a){if(void 0!==b)return this._store=this._store||{},this._store[a]=b,this;if(this._store)return this._store[a]}},unStore:function(a){return void 0!==a&&delete this._store[a],this},decouple:function(a,b){if(void 0!==a&&""!==a){if(b){var c,d=this.jStringify(a),e=[];for(c=0;c<b;c++)e.push(this.jParse(d));return e}return this.jParse(this.jStringify(a))}},jParse:function(a){return JSON.parse(a,i.reviver())},jStringify:JSON.stringify,objectId:function(a){var b,c=Math.pow(10,17);if(a){var d,e=0,g=a.length;for(d=0;d<g;d++)e+=a.charCodeAt(d)*c;b=e.toString(16)}else f++,b=(f+(Math.random()*c+Math.random()*c+Math.random()*c+Math.random()*c)).toString(16);return b},hash:function(a){return JSON.stringify(a)},debug:new g([function(){return this._debug&&this._debug.all},function(a){return void 0!==a?"boolean"==typeof a?(this._debug=this._debug||{},this._debug.all=a,this.chainSend("debug",this._debug),this):this._debug&&this._debug[a]||this._db&&this._db._debug&&this._db._debug[a]||this._debug&&this._debug.all:this._debug&&this._debug.all},function(a,b){return void 0!==a?void 0!==b?(this._debug=this._debug||{},this._debug[a]=b,this.chainSend("debug",this._debug),this):this._debug&&this._debug[b]||this._db&&this._db._debug&&this._db._debug[a]:this._debug&&this._debug.all}]),classIdentifier:function(){return"ForerunnerDB."+this.className},instanceIdentifier:function(){return"["+this.className+"]"+this.name()},logIdentifier:function(){return"ForerunnerDB "+this.instanceIdentifier()},convertToFdb:function(a){var b,c,d,e;for(e in a)if(a.hasOwnProperty(e)&&(d=a,e.indexOf(".")>-1)){for(e=e.replace(".$","[|$|]"),c=e.split(".");b=c.shift();)b=b.replace("[|$|]",".$"),c.length?d[b]={}:d[b]=a[e],d=d[b];delete a[e]}},isDropped:function(){return"dropped"===this._state},debounce:function(a,b,c){var d,e=this;e._debounce=e._debounce||{},e._debounce[a]&&clearTimeout(e._debounce[a].timeout),d={callback:b,timeout:setTimeout(function(){delete e._debounce[a],b()},c)},e._debounce[a]=d},checksum:function(a){var b,c=-1;for(b=0;b<a.length;b++)c=c>>>8^e[255&(c^a.charCodeAt(b))];return(c^-1)>>>0}},b.exports=d},{"./Overload":32,"./Serialiser":39}],23:[function(a,b,c){"use strict";var d={TYPE_INSERT:0,TYPE_UPDATE:1,TYPE_REMOVE:2,PHASE_BEFORE:0,PHASE_AFTER:1};b.exports=d},{}],24:[function(a,b,c){"use strict";var d=a("./Overload"),e={on:new d({"string, function":function(a,b){return this._listeners=this._listeners||{},this._listeners[a]=this._listeners[a]||{},this._listeners[a]["*"]=this._listeners[a]["*"]||[],this._listeners[a]["*"].push(b),this},"string, *, function":function(a,b,c){return this._listeners=this._listeners||{},this._listeners[a]=this._listeners[a]||{},this._listeners[a][b]=this._listeners[a][b]||[],this._listeners[a][b].push(c),this}}),once:new d({"string, function":function(a,b){var c=this,d=!1,e=function(){d||(c.off(a,e),b.apply(c,arguments),d=!0)};return this.on(a,e)},"string, *, function":function(a,b,c){var d=this,e=!1,f=function(){e||(d.off(a,b,f),c.apply(d,arguments),e=!0)};return this.on(a,b,f)}}),off:new d({string:function(a){var b=this;return this._emitting?(this._eventRemovalQueue=this._eventRemovalQueue||[],this._eventRemovalQueue.push(function(){b.off(a)})):this._listeners&&this._listeners[a]&&a in this._listeners&&delete this._listeners[a],this},"string, function":function(a,b){var c,d,e=this;return this._emitting?(this._eventRemovalQueue=this._eventRemovalQueue||[],this._eventRemovalQueue.push(function(){e.off(a,b)})):"string"==typeof b?this._listeners&&this._listeners[a]&&this._listeners[a][b]&&delete this._listeners[a][b]:this._listeners&&a in this._listeners&&(c=this._listeners[a]["*"],d=c.indexOf(b),d>-1&&c.splice(d,1)),this},"string, *, function":function(a,b,c){var d=this;if(this._emitting)this._eventRemovalQueue=this._eventRemovalQueue||[],this._eventRemovalQueue.push(function(){d.off(a,b,c)});else if(this._listeners&&a in this._listeners&&b in this.listeners[a]){var e=this._listeners[a][b],f=e.indexOf(c);f>-1&&e.splice(f,1)}},"string, *":function(a,b){var c=this;this._emitting?(this._eventRemovalQueue=this._eventRemovalQueue||[],this._eventRemovalQueue.push(function(){c.off(a,b)})):this._listeners&&a in this._listeners&&b in this._listeners[a]&&delete this._listeners[a][b]}}),emit:function(a,b){if(this._listeners=this._listeners||{},this._emitting=!0,a in this._listeners){var c,d,e,f,g,h,i;if(this._listeners[a]["*"])for(f=this._listeners[a]["*"],d=f.length,c=0;c<d;c++)e=f[c],"function"==typeof e&&e.apply(this,Array.prototype.slice.call(arguments,1));if(b instanceof Array&&b[0]&&b[0][this._primaryKey])for(g=this._listeners[a],d=b.length,c=0;c<d;c++)if(g[b[c][this._primaryKey]])for(h=g[b[c][this._primaryKey]].length,i=0;i<h;i++)e=g[b[c][this._primaryKey]][i],"function"==typeof e&&g[b[c][this._primaryKey]][i].apply(this,Array.prototype.slice.call(arguments,1))}return this._emitting=!1,this._processRemovalQueue(),this},_processRemovalQueue:function(){var a;if(this._eventRemovalQueue&&this._eventRemovalQueue.length){for(a=0;a<this._eventRemovalQueue.length;a++)this._eventRemovalQueue[a]();this._eventRemovalQueue=[]}},deferEmit:function(a,b){var c,d=this;return this._noEmitDefer||this._db&&(!this._db||this._db._noEmitDefer)?this.emit.apply(this,arguments):(c=arguments,this._deferTimeout=this._deferTimeout||{},this._deferTimeout[a]&&clearTimeout(this._deferTimeout[a]),this._deferTimeout[a]=setTimeout(function(){d.debug()&&console.log(d.logIdentifier()+" Emitting "+c[0]),d.emit.apply(d,c)},1)),this}};b.exports=e},{"./Overload":32}],25:[function(a,b,c){"use strict";var d={_match:function(a,b,c,d,e){var f,g,h,i,j,k,l=d,m=typeof a,n=typeof b,o=!0;if("object"===m&&null===a&&(m="null"),"object"===n&&null===b&&(n="null"),e=e||{},c=c||{},e.$rootQuery||(e.$rootQuery=b),e.$rootSource||(e.$rootSource=a),e.$currentQuery=b,e.$rootData=e.$rootData||{},"string"!==m&&"number"!==m&&"null"!==m||"string"!==n&&"number"!==n&&"null"!==n){if(("string"===m||"number"===m)&&"object"===n&&b instanceof RegExp)b.test(a)||(o=!1);else for(k in b)if(b.hasOwnProperty(k)){if(e.$previousQuery=e.$parent,e.$parent={query:b[k],key:k,parent:e.$previousQuery},f=!1,j=k.substr(0,2),"//"===j)continue;if(0===j.indexOf("$")&&(i=this._matchOp(k,a,b[k],c,e),i>-1)){if(i){if("or"===d)return!0}else o=i;f=!0}if(!f&&b[k]instanceof RegExp)if(f=!0,"object"===m&&void 0!==a[k]&&b[k].test(a[k])){if("or"===d)return!0}else o=!1;if(!f)if("object"==typeof b[k])if(void 0!==a[k])if(a[k]instanceof Array&&!(b[k]instanceof Array)){for(g=!1,h=0;h<a[k].length&&!(g=this._match(a[k][h],b[k],c,l,e));h++);if(g){if("or"===d)return!0}else o=!1}else if(!(a[k]instanceof Array)&&b[k]instanceof Array){for(g=!1,h=0;h<b[k].length&&!(g=this._match(a[k],b[k][h],c,l,e));h++);if(g){if("or"===d)return!0}else o=!1}else if("object"==typeof a)if(g=this._match(a[k],b[k],c,l,e)){if("or"===d)return!0}else o=!1;else if(g=this._match(void 0,b[k],c,l,e)){if("or"===d)return!0}else o=!1;else if(b[k]&&void 0!==b[k].$exists)if(g=this._match(void 0,b[k],c,l,e)){if("or"===d)return!0}else o=!1;else o=!1;else if(a&&a[k]===b[k]){if("or"===d)return!0}else if(a&&a[k]&&a[k]instanceof Array&&b[k]&&"object"!=typeof b[k]){for(g=!1,h=0;h<a[k].length&&!(g=this._match(a[k][h],b[k],c,l,e));h++);if(g){if("or"===d)return!0}else o=!1}else o=!1;if("and"===d&&!o)return!1}}else"number"===m||"null"===m||"null"===n?a!==b&&(o=!1):a.localeCompare(b)&&(o=!1);return o},_matchOp:function(a,b,c,d,e){switch(a){case"$gt":return b>c;case"$gte":return b>=c;case"$lt":return b<c;case"$lte":return b<=c;case"$exists":return void 0===b!==c;case"$eq":return b==c;case"$eeq":return b===c;case"$ne":return b!=c;case"$nee":return b!==c;case"$not":return!this._match(b,c,d,"and",e);case"$or":for(var f=0;f<c.length;f++)if(this._match(b,c[f],d,"and",e))return!0;return!1;case"$and":for(var g=0;g<c.length;g++)if(!this._match(b,c[g],d,"and",e))return!1;return!0;case"$in":if(c instanceof Array){var h,i=c,j=i.length;for(h=0;h<j;h++)if(this._match(b,i[h],d,"and",e))return!0;return!1}return"object"==typeof c?this._match(b,c,d,"and",e):(console.log(this.logIdentifier()+" Cannot use an $in operator on a non-array key: "+a,e.$rootQuery),!1);case"$nin":if(c instanceof Array){var k,l=c,m=l.length;for(k=0;k<m;k++)if(this._match(b,l[k],d,"and",e))return!1;return!0}return"object"==typeof c?this._match(b,c,d,"and",e):(console.log(this.logIdentifier()+" Cannot use a $nin operator on a non-array key: "+a,e.$rootQuery),!1);case"$fastIn":return c instanceof Array?c.indexOf(b)!==-1:(console.log(this.logIdentifier()+" Cannot use an $fastIn operator on a non-array key: "+a,e.$rootQuery),!1);case"$distinct":var n,o,p;e.$rootData["//distinctLookup"]=e.$rootData["//distinctLookup"]||{};for(var q in c)if(c.hasOwnProperty(q))return"object"==typeof c[q]?(n=this.sharedPathSolver.parse(c)[0].path,o=this.sharedPathSolver.get(b,n),p=n):(o=b[q],p=q),e.$rootData["//distinctLookup"][p]=e.$rootData["//distinctLookup"][p]||{},!e.$rootData["//distinctLookup"][p][o]&&(e.$rootData["//distinctLookup"][p][o]=!0,!0);break;case"$count":var r,s,t;for(r in c)if(c.hasOwnProperty(r)&&(s=b[r],t="object"==typeof s&&s instanceof Array?s.length:0,!this._match(t,c[r],d,"and",e)))return!1;return!0;case"$find":case"$findOne":case"$findSub":var u,v,w,x,y,z,A="collection",B={};if(!c.$from)throw a+" missing $from property!";if(c.$fromType&&(A=c.$fromType,!this.db()[A]||"function"!=typeof this.db()[A]))throw a+' cannot operate against $fromType "'+A+'" because the database does not recognise this type of object!';if(u=c.$query||{},v=c.$options||{},"$findSub"===a){if(!c.$path)throw a+" missing $path property!";if(y=c.$path,w=c.$subQuery||{},x=c.$subOptions||{},!(e.$parent&&e.$parent.parent&&e.$parent.parent.key))return this._match(b,u,{},"and",e)&&(z=this._findSub([b],y,w,x)),z&&z.length>0;z=this.db()[A](c.$from).findSub(u,y,w,x)}else z=this.db()[A](c.$from)[a.substr(1)](u,v);return B[e.$parent.parent.key]=z,this._match(b,B,d,"and",e)}return-1},applyJoin:function(a,b,c,d){var e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x=this,y=[];for(a instanceof Array||(a=[a]),e=0;e<b.length;e++)for(f in b[e])if(b[e].hasOwnProperty(f))for(g=b[e][f],h=g.$sourceType||"collection",i="$"+h+"."+f,j=f,c[i]?k=c[i]:this._db[h]&&"function"==typeof this._db[h]&&(k=this._db[h](f)),l=0;l<a.length;l++){m={},n=!1,o=!1,p="";for(q in g)if(g.hasOwnProperty(q))if(r=g[q],"$"===q.substr(0,1))switch(q){case"$where":if(!r.$query&&!r.$options)throw'$join $where clause requires "$query" and / or "$options" keys to work!';r.$query&&(m=x.resolveDynamicQuery(r.$query,a[l])),r.$options&&(s=r.$options);break;case"$as":j=r;break;case"$multi":n=r;break;case"$require":o=r;break;case"$prefix":p=r}else m[q]=x.resolveDynamicQuery(r,a[l]);if(t=k.find(m,s),!o||o&&t[0])if("$root"===j){if(n!==!1)throw this.logIdentifier()+' Cannot combine [$as: "$root"] with [$multi: true] in $join clause!';u=t[0],v=a[l];for(w in u)u.hasOwnProperty(w)&&void 0===v[p+w]&&(v[p+w]=u[w])}else a[l][j]=n===!1?t[0]:t;else y.push(l)}return y},resolveDynamicQuery:function(a,b){var c,d,e,f,g,h=this;if("string"==typeof a)return f="$$."===a.substr(0,3)?this.sharedPathSolver.value(b,a.substr(3,a.length-3)):this.sharedPathSolver.value(b,a),f.length>1?{$in:f}:f[0];c={};for(g in a)if(a.hasOwnProperty(g))switch(d=typeof a[g],e=a[g],d){case"string":"$$."===e.substr(0,3)?c[g]=this.sharedPathSolver.value(b,e.substr(3,e.length-3))[0]:c[g]=e;break;case"object":c[g]=h.resolveDynamicQuery(e,b);break;default:c[g]=e}return c},spliceArrayByIndexList:function(a,b){var c;for(c=b.length-1;c>=0;c--)a.splice(b[c],1)}};b.exports=d},{}],26:[function(a,b,c){"use strict";var d={sortAsc:function(a,b){return"string"==typeof a&&"string"==typeof b?a.localeCompare(b):a>b?1:a<b?-1:void 0===a&&void 0!==b?-1:void 0===b&&void 0!==a?1:0},sortDesc:function(a,b){return"string"==typeof a&&"string"==typeof b?b.localeCompare(a):a>b?-1:a<b?1:void 0===a&&void 0!==b?1:void 0===b&&void 0!==a?-1:0},sortAscIgnoreUndefined:function(a,b){return"string"==typeof a&&"string"==typeof b?a.localeCompare(b):a>b?1:a<b?-1:0},sortDescIgnoreUndefined:function(a,b){return"string"==typeof a&&"string"==typeof b?b.localeCompare(a):a>b?-1:a<b?1:0}};b.exports=d},{}],27:[function(a,b,c){"use strict";var d,e={};d={tagAdd:function(a){var b,c=this,d=e[a]=e[a]||[];for(b=0;b<d.length;b++)if(d[b]===c)return!0;return d.push(c),c.on&&c.on("drop",function(){c.tagRemove(a)}),!0},tagRemove:function(a){var b,c=e[a];if(c)for(b=0;b<c.length;b++)if(c[b]===this)return c.splice(b,1),!0;return!1},tagLookup:function(a){return e[a]||[]},tagDrop:function(a,b){var c,d,e,f=this.tagLookup(a);if(c=function(){d--,b&&0===d&&b(!1)},f.length)for(d=f.length,e=f.length-1;e>=0;e--)f[e].drop(c);return!0}},b.exports=d},{}],28:[function(a,b,c){"use strict";var d=a("./Overload"),e={addTrigger:function(a,b,c,d){var e,f=this;return e=f._triggerIndexOf(a,b,c),e===-1&&(f.triggerStack={},f._trigger=f._trigger||{},f._trigger[b]=f._trigger[b]||{},f._trigger[b][c]=f._trigger[b][c]||[],f._trigger[b][c].push({id:a,method:d,enabled:!0}),!0)},removeTrigger:function(a,b,c){var d,e=this;return d=e._triggerIndexOf(a,b,c),d>-1&&e._trigger[b][c].splice(d,1),!1},ignoreTriggers:function(a){return void 0!==a?(this._ignoreTriggers=a,this):this._ignoreTriggers},addLinkIO:function(a,b){var c,d,e,f,g,h,i,j,k,l=this;if(l._linkIO=l._linkIO||{},l._linkIO[a]=b,d=b.export,e=b.import,d&&(h=l.db().collection(d.to)),e&&(i=l.db().collection(e.from)),j=[l.TYPE_INSERT,l.TYPE_UPDATE,l.TYPE_REMOVE],c=function(a,b){b(!1,!0)},d&&(d.match||(d.match=c),d.types||(d.types=j),f=function(a,b,c){d.match(c,function(b,e){!b&&e&&d.data(c,a.type,function(b,c,d){!b&&c&&(h.ignoreTriggers(!0),"remove"!==a.type?h.upsert(c,d):h.remove(c,d),h.ignoreTriggers(!1))})})}),e&&(e.match||(e.match=c),e.types||(e.types=j),g=function(a,b,c){e.match(c,function(b,d){!b&&d&&e.data(c,a.type,function(b,c,d){!b&&c&&(h.ignoreTriggers(!0),"remove"!==a.type?l.upsert(c,d):l.remove(c,d),h.ignoreTriggers(!1))})})}),d)for(k=0;k<d.types.length;k++)l.addTrigger(a+"export"+d.types[k],d.types[k],l.PHASE_AFTER,f);if(e)for(k=0;k<e.types.length;k++)i.addTrigger(a+"import"+e.types[k],e.types[k],l.PHASE_AFTER,g)},removeLinkIO:function(a){var b,c,d,e,f=this,g=f._linkIO[a];if(g){if(b=g.export,c=g.import,b)for(e=0;e<b.types.length;e++)f.removeTrigger(a+"export"+b.types[e],b.types[e],f.db.PHASE_AFTER);if(c)for(d=f.db().collection(c.from),e=0;e<c.types.length;e++)d.removeTrigger(a+"import"+c.types[e],c.types[e],f.db.PHASE_AFTER);return delete f._linkIO[a],!0}return!1},enableTrigger:new d({string:function(a){var b,c,d,e,f,g=this,h=g._trigger,i=!1;if(h)for(f in h)if(h.hasOwnProperty(f)&&(b=h[f]))for(d in b)if(b.hasOwnProperty(d))for(c=b[d],e=0;e<c.length;e++)c[e].id===a&&(c[e].enabled=!0,i=!0);return i},number:function(a){var b,c,d,e=this,f=e._trigger[a],g=!1;if(f)for(c in f)if(f.hasOwnProperty(c))for(b=f[c],d=0;d<b.length;d++)b[d].enabled=!0,g=!0;return g},"number, number":function(a,b){var c,d,e=this,f=e._trigger[a],g=!1;if(f&&(c=f[b]))for(d=0;d<c.length;d++)c[d].enabled=!0,g=!0;return g},"string, number, number":function(a,b,c){var d=this,e=d._triggerIndexOf(a,b,c);return e>-1&&(d._trigger[b][c][e].enabled=!0,!0)}}),disableTrigger:new d({string:function(a){var b,c,d,e,f,g=this,h=g._trigger,i=!1;if(h)for(f in h)if(h.hasOwnProperty(f)&&(b=h[f]))for(d in b)if(b.hasOwnProperty(d))for(c=b[d],e=0;e<c.length;e++)c[e].id===a&&(c[e].enabled=!1,i=!0);return i},number:function(a){var b,c,d,e=this,f=e._trigger[a],g=!1;if(f)for(c in f)if(f.hasOwnProperty(c))for(b=f[c],d=0;d<b.length;d++)b[d].enabled=!1,g=!0;return g},"number, number":function(a,b){var c,d,e=this,f=e._trigger[a],g=!1;if(f&&(c=f[b]))for(d=0;d<c.length;d++)c[d].enabled=!1,g=!0;return g},"string, number, number":function(a,b,c){var d=this,e=d._triggerIndexOf(a,b,c);return e>-1&&(d._trigger[b][c][e].enabled=!1,!0)}}),willTrigger:function(a,b){if(!this._ignoreTriggers&&this._trigger&&this._trigger[a]&&this._trigger[a][b]&&this._trigger[a][b].length){var c,d=this._trigger[a][b];for(c=0;c<d.length;c++)if(d[c].enabled)return!0}return!1},processTrigger:function(a,b,c,d,e){var f,g,h,i,j,k,l,m=this;if(!m._ignoreTriggers&&m._trigger&&m._trigger[b]&&m._trigger[b][c]){for(f=m._trigger[b][c],h=f.length,g=0;g<h;g++)if(i=f[g],i.enabled){if(m.debug()){switch(b){case this.TYPE_INSERT:k="insert";break;case this.TYPE_UPDATE:k="update";break;case this.TYPE_REMOVE:k="remove";break;default:k=""}switch(c){case this.PHASE_BEFORE:l="before";break;case this.PHASE_AFTER:l="after";break;default:l=""}console.log('Triggers: Processing trigger "'+i.id+'" for '+k+' in phase "'+l+'"')}if(m.triggerStack&&m.triggerStack[b]&&m.triggerStack[b][c]&&m.triggerStack[b][c][i.id]){m.debug()&&console.log('Triggers: Will not run trigger "'+i.id+'" for '+k+' in phase "'+l+'" as it is already in the stack!');continue}if(m.triggerStack=m.triggerStack||{},m.triggerStack[b]={},m.triggerStack[b][c]={},m.triggerStack[b][c][i.id]=!0,j=i.method.call(m,a,d,e),m.triggerStack=m.triggerStack||{},m.triggerStack[b]={},m.triggerStack[b][c]={},m.triggerStack[b][c][i.id]=!1,j===!1)return!1;if(void 0!==j&&j!==!0&&j!==!1)throw"ForerunnerDB.Mixin.Triggers: Trigger error: "+j}return!0}},_triggerIndexOf:function(a,b,c){var d,e,f,g=this;if(g._trigger&&g._trigger[b]&&g._trigger[b][c])for(d=g._trigger[b][c],e=d.length,f=0;f<e;f++)if(d[f].id===a)return f;return-1}};b.exports=e},{"./Overload":32}],29:[function(a,b,c){"use strict";var d={_updateProperty:function(a,b,c){a[b]=c,this.debug()&&console.log(this.logIdentifier()+' Setting non-data-bound document property "'+b+'" to val "'+c+'"')},_updateIncrement:function(a,b,c){a[b]+=c},_updateSpliceMove:function(a,b,c){a.splice(c,0,a.splice(b,1)[0]),this.debug()&&console.log(this.logIdentifier()+' Moving non-data-bound document array index from "'+b+'" to "'+c+'"')},_updateSplicePush:function(a,b,c){a.length>b?a.splice(b,0,c):a.push(c)},_updateSplicePull:function(a,b,c){c||(c=1),a.splice(b,c)},_updatePush:function(a,b){a.push(b)},_updatePull:function(a,b){a.splice(b,1)},_updateMultiply:function(a,b,c){a[b]*=c},_updateRename:function(a,b,c){a[c]=a[b],delete a[b]},_updateOverwrite:function(a,b,c){a[b]=c},_updateUnset:function(a,b){delete a[b]},_updateClear:function(a,b){var c,d=a[b];if(d&&"object"==typeof d)for(c in d)d.hasOwnProperty(c)&&this._updateUnset(d,c)},_updatePop:function(a,b){var c,d=!1;if(a.length>0)if(b>0){for(c=0;c<b;c++)a.pop();d=!0}else if(b<0){for(c=0;c>b;c--)a.shift();d=!0}return d}};b.exports=d},{}],30:[function(a,b,c){"use strict";var d,e,f,g,h,i=a("./Shared");g=function(){this.init.apply(this,arguments)},g.prototype.init=function(a){var b=this;b._core=a,b.rootPath("/fdb")},i.addModule("NodeApiClient",g),i.mixin(g.prototype,"Mixin.Common"),i.mixin(g.prototype,"Mixin.Events"),i.mixin(g.prototype,"Mixin.ChainReactor"),d=i.modules.Core,e=d.prototype.init,f=i.modules.Collection,h=i.overload,i.synthesize(g.prototype,"rootPath"),g.prototype.server=function(a,b){return void 0!==a?("/"===a.substr(a.length-1,1)&&(a=a.substr(0,a.length-1)),void 0!==b?this._server=a+":"+b:this._server=a,this._host=a,this._port=b,this):void 0!==b?{host:this._host,port:this._port,url:this._server}:this._server},g.prototype.http=function(a,b,c,d,e){var f,g,h,i=this,j=new XMLHttpRequest;switch(a=a.toUpperCase(),j.onreadystatechange=function(){4===j.readyState&&(200===j.status?j.responseText?e(!1,i.jParse(j.responseText)):e(!1,{}):204===j.status?e(!1,{}):(e(j.status,j.responseText),i.emit("httpError",j.status,j.responseText)))},a){case"GET":case"DELETE":case"HEAD":this._sessionData&&(c=void 0!==c?c:{},c[this._sessionData.key]=this._sessionData.obj),f=b+(void 0!==c?"?"+i.jStringify(c):""),h=null;break;case"POST":case"PUT":case"PATCH":this._sessionData&&(g={},g[this._sessionData.key]=this._sessionData.obj),f=b+(void 0!==g?"?"+i.jStringify(g):""),h=void 0!==c?i.jStringify(c):null;break;default:return!1}return j.open(a,f,!0),j.setRequestHeader("Content-Type","application/json;charset=UTF-8"),j.send(h),this},g.prototype.head=new h({"string, function":function(a,b){return this.$main.call(this,a,void 0,{},b)},"string, *, function":function(a,b,c){return this.$main.call(this,a,b,{},c)},"string, *, object, function":function(a,b,c,d){return this.$main.call(this,a,b,c,d)},$main:function(a,b,c,d){return this.http("HEAD",this.server()+this._rootPath+a,b,c,d)}}),g.prototype.get=new h({"string, function":function(a,b){return this.$main.call(this,a,void 0,{},b)},"string, *, function":function(a,b,c){return this.$main.call(this,a,b,{},c)},"string, *, object, function":function(a,b,c,d){return this.$main.call(this,a,b,c,d)},$main:function(a,b,c,d){return this.http("GET",this.server()+this._rootPath+a,b,c,d)}}),g.prototype.put=new h({"string, function":function(a,b){return this.$main.call(this,a,void 0,{},b)},"string, *, function":function(a,b,c){return this.$main.call(this,a,b,{},c)},"string, *, object, function":function(a,b,c,d){return this.$main.call(this,a,b,c,d)},$main:function(a,b,c,d){return this.http("PUT",this.server()+this._rootPath+a,b,c,d)}}),g.prototype.post=new h({"string, function":function(a,b){return this.$main.call(this,a,void 0,{},b)},"string, *, function":function(a,b,c){return this.$main.call(this,a,b,{},c)},"string, *, object, function":function(a,b,c,d){return this.$main.call(this,a,b,c,d)},$main:function(a,b,c,d){return this.http("POST",this.server()+this._rootPath+a,b,c,d)}}),g.prototype.patch=new h({"string, function":function(a,b){return this.$main.call(this,a,void 0,{},b)},"string, *, function":function(a,b,c){return this.$main.call(this,a,b,{},c)},"string, *, object, function":function(a,b,c,d){return this.$main.call(this,a,b,c,d)},$main:function(a,b,c,d){return this.http("PATCH",this.server()+this._rootPath+a,b,c,d)}}),g.prototype.postPatch=function(a,b,c,d,e){var f=this;this.head(a+"/"+b,void 0,{},function(g,h){return g?404===g?f.http("POST",f.server()+f._rootPath+a,c,d,e):void e(g,c):f.http("PATCH",f.server()+f._rootPath+a+"/"+b,c,d,e)})},g.prototype.delete=new h({"string, function":function(a,b){return this.$main.call(this,a,void 0,{},b)},"string, *, function":function(a,b,c){return this.$main.call(this,a,b,{},c)},"string, *, object, function":function(a,b,c,d){return this.$main.call(this,a,b,c,d)},$main:function(a,b,c,d){return this.http("DELETE",this.server()+this._rootPath+a,b,c,d)}}),g.prototype.session=function(a,b){return void 0!==a&&void 0!==b?(this._sessionData={key:a,obj:b},this):this._sessionData},g.prototype.sync=function(a,b,c,d,e){var f,g,h,j=this,k="",l=!0;this.debug()&&console.log(this.logIdentifier()+" Connecting to API server "+this.server()+this._rootPath+b),g=this.server()+this._rootPath+b+"/_sync",this._sessionData&&(h=h||{},this._sessionData.key?h[this._sessionData.key]=this._sessionData.obj:i.mixin(h,this._sessionData.obj)),c&&(h=h||{},h.$query=c),d&&(h=h||{},void 0===d.$initialData&&(d.$initialData=!0),h.$options=d),h&&(k=this.jStringify(h),g+="?"+k),f=new EventSource(g),a.__apiConnection=f,f.addEventListener("open",function(c){(!d||d&&d.$initialData)&&j.get(b,h,function(b,c){b||a.upsert(c)})},!1),f.addEventListener("error",function(b){2===f.readyState&&a.unSync(),l&&(l=!1,e(b))},!1),f.addEventListener("insert",function(b){var c=j.jParse(b.data);a.insert(c.dataSet)},!1),f.addEventListener("update",function(b){var c=j.jParse(b.data);a.update(c.query,c.update)},!1),f.addEventListener("remove",function(b){var c=j.jParse(b.data);a.remove(c.query)},!1),e&&f.addEventListener("connected",function(a){l&&(l=!1,e(!1))},!1)},f.prototype.sync=new h({function:function(a){this.$main.call(this,"/"+this._db.name()+"/collection/"+this.name(),null,null,a)},"string, function":function(a,b){this.$main.call(this,"/"+this._db.name()+"/collection/"+a,null,null,b)},"object, function":function(a,b){this.$main.call(this,"/"+this._db.name()+"/collection/"+this.name(),a,null,b)},"string, string, function":function(a,b,c){this.$main.call(this,"/"+this._db.name()+"/"+a+"/"+b,null,null,c)},"string, object, function":function(a,b,c){this.$main.call(this,"/"+this._db.name()+"/collection/"+a,b,null,c)},"string, string, object, function":function(a,b,c,d){this.$main.call(this,"/"+this._db.name()+"/"+a+"/"+b,c,null,d)},"object, object, function":function(a,b,c){this.$main.call(this,"/"+this._db.name()+"/collection/"+this.name(),a,b,c)},"string, object, object, function":function(a,b,c,d){this.$main.call(this,"/"+this._db.name()+"/collection/"+a,b,c,d)},"string, string, object, object, function":function(a,b,c,d,e){this.$main.call(this,"/"+this._db.name()+"/"+a+"/"+b,c,d,e)},$main:function(a,b,c,d){var e=this;if(!this._db||!this._db._core)throw this.logIdentifier()+" Cannot sync for an anonymous collection! (Collection must be attached to a database)";this.unSync(),this._db._core.api.sync(this,a,b,c,d),this.on("drop",function(){e.unSync()})}}),f.prototype.unSync=function(){return!!this.__apiConnection&&(2!==this.__apiConnection.readyState&&this.__apiConnection.close(),delete this.__apiConnection,!0)},f.prototype.http=new h({"string, function":function(a,b){this.$main.call(this,a,"/"+this._db.name()+"/collection/"+this.name(),void 0,void 0,{},b)},$main:function(a,b,c,d,e,f){if(this._db&&this._db._core)return this._db._core.api.http("GET",this._db._core.api.server()+this._rootPath+b,{$query:c,$options:d},e,f);throw this.logIdentifier()+" Cannot do HTTP for an anonymous collection! (Collection must be attached to a database)"}}),f.prototype.autoHttp=new h({"string, function":function(a,b){this.$main.call(this,a,"/"+this._db.name()+"/collection/"+this.name(),void 0,void 0,{},b)},"string, string, function":function(a,b,c){this.$main.call(this,a,"/"+this._db.name()+"/collection/"+b,void 0,void 0,{},c)},"string, string, string, function":function(a,b,c,d){this.$main.call(this,a,"/"+this._db.name()+"/"+b+"/"+c,void 0,void 0,{},d)},"string, string, string, object, function":function(a,b,c,d,e){this.$main.call(this,a,"/"+this._db.name()+"/"+b+"/"+c,d,void 0,{},e)},"string, string, string, object, object, function":function(a,b,c,d,e,f){this.$main.call(this,a,"/"+this._db.name()+"/"+b+"/"+c,d,e,{},f)},$main:function(a,b,c,d,e,f){var g=this;if(this._db&&this._db._core)return this._db._core.api.http("GET",this._db._core.api.server()+this._db._core.api._rootPath+b,{$query:c,$options:d},e,function(b,c){var d;if(!b&&c)switch(a){case"GET":g.insert(c);break;case"POST":c.inserted&&c.inserted.length&&g.insert(c.inserted);break;case"PUT":case"PATCH":if(c instanceof Array)for(d=0;d<c.length;d++)g.updateById(c[d]._id,{$overwrite:c[d]});else g.updateById(c._id,{$overwrite:c});break;case"DELETE":g.remove(c)}f(b,c)});throw this.logIdentifier()+" Cannot do HTTP for an anonymous collection! (Collection must be attached to a database)"}}),d.prototype.init=function(){e.apply(this,arguments),this.api=new g(this)},i.finishModule("NodeApiClient"),b.exports=g},{"./Shared":40}],31:[function(a,b,c){"use strict";var d=a("./Shared"),e=a("./Path"),f=function(a){this.pathSolver=new e,this.counter=0,this.init.apply(this,arguments)};f.prototype.init=function(a){this._data={operation:a,index:{potential:[],used:!1},steps:[],time:{startMs:0,stopMs:0,totalMs:0,process:{}},flag:{},log:[]}},d.addModule("Operation",f),d.mixin(f.prototype,"Mixin.ChainReactor"),f.prototype.start=function(){this._data.time.startMs=(new Date).getTime()},f.prototype.log=function(a){if(a){var b=this._log.length>0?this._data.log[this._data.log.length-1].time:0,c={event:a,time:(new Date).getTime(),delta:0};return this._data.log.push(c),b&&(c.delta=c.time-b),this}return this._data.log},f.prototype.time=function(a){if(void 0!==a){var b=this._data.time.process,c=b[a]=b[a]||{};return c.startMs?(c.stopMs=(new Date).getTime(),c.totalMs=c.stopMs-c.startMs,c.stepObj.totalMs=c.totalMs,delete c.stepObj):(c.startMs=(new Date).getTime(),c.stepObj={name:a},this._data.steps.push(c.stepObj)),this}return this._data.time},f.prototype.flag=function(a,b){return void 0===a||void 0===b?void 0!==a?this._data.flag[a]:this._data.flag:void(this._data.flag[a]=b)},f.prototype.data=function(a,b,c){return void 0!==b?(this.pathSolver.set(this._data,a,b),this):this.pathSolver.get(this._data,a)},f.prototype.pushData=function(a,b,c){this.pathSolver.push(this._data,a,b)},f.prototype.stop=function(){this._data.time.stopMs=(new Date).getTime(),this._data.time.totalMs=this._data.time.stopMs-this._data.time.startMs},d.finishModule("Operation"),b.exports=f},{"./Path":34,"./Shared":40}],32:[function(a,b,c){"use strict";var d=function(a,b){if(b||(b=a,a=void 0),b){var c,d,e,f,g,h,i=this;if(!(b instanceof Array)){e={};for(c in b)if(b.hasOwnProperty(c))if(f=c.replace(/ /g,""),f.indexOf("*")===-1)e[f]=b[c];else for(h=this.generateSignaturePermutations(f),g=0;g<h.length;g++)e[h[g]]||(e[h[g]]=b[c]);b=e}return function(){var e,f,g,h=[];if(b instanceof Array){for(d=b.length,c=0;c<d;c++)if(b[c].length===arguments.length)return i.callExtend(this,"$main",b,b[c],arguments)}else{for(c=0;c<arguments.length&&(f=typeof arguments[c],"object"===f&&arguments[c]instanceof Array&&(f="array"),1!==arguments.length||"undefined"!==f);c++)h.push(f);if(e=h.join(","),b[e])return i.callExtend(this,"$main",b,b[e],arguments);for(c=h.length;c>=0;c--)if(e=h.slice(0,c).join(","),b[e+",..."])return i.callExtend(this,"$main",b,b[e+",..."],arguments)}throw g=void 0!==a?a:"function"==typeof this.name?this.name():"Unknown",console.log("Overload Definition:",b),'ForerunnerDB.Overload "'+g+'": Overloaded method does not have a matching signature "'+e+'" for the passed arguments: '+this.jStringify(h)}}return function(){}};d.prototype.generateSignaturePermutations=function(a){var b,c,d=[],e=["array","string","object","number","function","undefined"];if(a.indexOf("*")>-1)for(c=0;c<e.length;c++)b=a.replace("*",e[c]),d=d.concat(this.generateSignaturePermutations(b));else d.push(a);return d},d.prototype.callExtend=function(a,b,c,d,e){var f,g;return a&&c[b]?(f=a[b],a[b]=c[b],g=d.apply(a,e),a[b]=f,g):d.apply(a,e)},b.exports=d},{}],33:[function(a,b,c){"use strict";var d,e,f,g;d=a("./Shared");var h=function(){this.init.apply(this,arguments)};h.prototype.init=function(a){var b=this;this._name=a,this._data=new g("__FDB__dc_data_"+this._name),this._collData=new f,this._sources=[],this._sourceDroppedWrap=function(){b._sourceDropped.apply(b,arguments)}},d.addModule("Overview",h),d.mixin(h.prototype,"Mixin.Common"),d.mixin(h.prototype,"Mixin.ChainReactor"),d.mixin(h.prototype,"Mixin.Constants"),d.mixin(h.prototype,"Mixin.Triggers"),d.mixin(h.prototype,"Mixin.Events"),d.mixin(h.prototype,"Mixin.Tags"),f=a("./Collection"),g=a("./Document"),e=d.modules.Db,d.synthesize(h.prototype,"state"),d.synthesize(h.prototype,"db"),d.synthesize(h.prototype,"name"),d.synthesize(h.prototype,"query",function(a){var b=this.$super(a);return void 0!==a&&this._refresh(),b}),d.synthesize(h.prototype,"queryOptions",function(a){var b=this.$super(a);return void 0!==a&&this._refresh(),b}),d.synthesize(h.prototype,"reduce",function(a){var b=this.$super(a);return void 0!==a&&this._refresh(),b}),h.prototype.from=function(a){return void 0!==a?("string"==typeof a&&(a=this._db.collection(a)),this._setFrom(a),this):this._sources},h.prototype.find=function(a,b,c){return this._collData.find.apply(this._collData,arguments)},h.prototype.exec=function(){var a=this.reduce();return a?a.apply(this):void 0},h.prototype.count=function(){return this._collData.count.apply(this._collData,arguments)},h.prototype._setFrom=function(a){for(;this._sources.length;)this._removeSource(this._sources[0]);
return this._addSource(a),this},h.prototype._addSource=function(a){return a&&"View"===a.className&&(a=a.data(),this.debug()&&console.log(this.logIdentifier()+' Using internal private data "'+a.instanceIdentifier()+'" for IO graph linking')),this._sources.indexOf(a)===-1&&(this._sources.push(a),a.chain(this),a.on("drop",this._sourceDroppedWrap),this._refresh()),this},h.prototype._removeSource=function(a){a&&"View"===a.className&&(a=a.data(),this.debug()&&console.log(this.logIdentifier()+' Using internal private data "'+a.instanceIdentifier()+'" for IO graph linking'));var b=this._sources.indexOf(a);return b>-1&&(this._sources.splice(a,1),a.unChain(this),a.off("drop",this._sourceDroppedWrap),this._refresh()),this},h.prototype._sourceDropped=function(a){a&&this._removeSource(a)},h.prototype._refresh=function(){if(!this.isDropped()){if(this._sources&&this._sources[0]){this._collData.primaryKey(this._sources[0].primaryKey());var a,b=[];for(a=0;a<this._sources.length;a++)b=b.concat(this._sources[a].find(this._query,this._queryOptions));this._collData.setData(b)}if(this._reduce){var c=this._reduce.apply(this);this._data.setData(c)}}},h.prototype._chainHandler=function(a){switch(a.type){case"setData":case"insert":case"update":case"remove":this._refresh()}},h.prototype.data=function(){return this._data},h.prototype.drop=function(a){if(!this.isDropped()){for(this._state="dropped",delete this._data,delete this._collData;this._sources.length;)this._removeSource(this._sources[0]);delete this._sources,this._db&&this._name&&delete this._db._overview[this._name],this.emit("drop",this),a&&a(!1,!0),delete this._listeners}return!0},e.prototype.overview=function(a){var b=this;return a?a instanceof h?a:this._overview&&this._overview[a]?this._overview[a]:(this._overview=this._overview||{},this._overview[a]=new h(a).db(this),b.deferEmit("create",b._overview[a],"overview",a),this._overview[a]):this._overview||{}},e.prototype.overviews=function(){var a,b,c=[];for(b in this._overview)this._overview.hasOwnProperty(b)&&(a=this._overview[b],c.push({name:b,count:a.count(),linked:void 0!==a.isLinked&&a.isLinked()}));return c},d.finishModule("Overview"),b.exports=h},{"./Collection":6,"./Document":11,"./Shared":40}],34:[function(a,b,c){"use strict";var d=a("./Shared"),e=function(a){this.init.apply(this,arguments)};e.prototype.init=function(a){a&&this.path(a)},d.addModule("Path",e),d.mixin(e.prototype,"Mixin.Common"),d.mixin(e.prototype,"Mixin.ChainReactor"),e.prototype.path=function(a){return void 0!==a?(this._path=this.clean(a),this._pathParts=this._path.split("."),this):this._path},e.prototype.hasObjectPaths=function(a,b){var c,d=!0;for(c in a)if(a.hasOwnProperty(c)){if(void 0===b[c])return!1;if("object"==typeof a[c]&&(d=this.hasObjectPaths(a[c],b[c]),!d))return!1}return d},e.prototype.countKeys=function(a){var b,c=0;for(b in a)a.hasOwnProperty(b)&&void 0!==a[b]&&("object"!=typeof a[b]?c++:c+=this.countKeys(a[b]));return c},e.prototype.countObjectPaths=function(a,b){var c,d,e={},f=0,g=0;for(d in b)b.hasOwnProperty(d)&&("object"==typeof b[d]?(c=this.countObjectPaths(a[d],b[d]),e[d]=c.matchedKeys,g+=c.totalKeyCount,f+=c.matchedKeyCount):(g++,a&&a[d]&&"object"!=typeof a[d]?(e[d]=!0,f++):e[d]=!1));return{matchedKeys:e,matchedKeyCount:f,totalKeyCount:g}},e.prototype.parse=function(a,b){var c,d,e,f=[],g="";for(d in a)if(a.hasOwnProperty(d))if(g=d,"object"==typeof a[d])if(b)for(c=this.parse(a[d],b),e=0;e<c.length;e++)f.push({path:g+"."+c[e].path,value:c[e].value});else for(c=this.parse(a[d]),e=0;e<c.length;e++)f.push({path:g+"."+c[e].path});else b?f.push({path:g,value:a[d]}):f.push({path:g});return f},e.prototype.parseArr=function(a,b){return b=b||{},this._parseArr(a,"",[],b)},e.prototype._parseArr=function(a,b,c,d){var e,f="";b=b||"",c=c||[];for(e in a)a.hasOwnProperty(e)&&(!d.ignore||d.ignore&&!d.ignore.test(e))&&(f=b?b+"."+e:e,"object"==typeof a[e]?(d.verbose&&c.push(f),this._parseArr(a[e],f,c,d)):c.push(f));return c},e.prototype.set=function(a,b,c){if(void 0!==a&&void 0!==b){var d,e;b=this.clean(b),d=b.split("."),e=d.shift(),d.length?(a[e]=a[e]||{},this.set(a[e],d.join("."),c)):a[e]=c}return a},e.prototype.aggregate=function(a,b){var c,d,e,f=[];if(a instanceof Array){for(e=0;e<a.length;e++)f=f.concat(this.aggregate(a[e],b));return f}return b.indexOf(".")===-1?[a[b]]:(c=b.split("."),d=c.shift(),f=f.concat(this.aggregate(a[d],c.join("."))))},e.prototype.get=function(a,b){return this.value(a,b)[0]},e.prototype.value=function(a,b,c){var d,e,f,g,h,i,j,k,l;if(b&&b.indexOf(".")===-1){if(c&&c.skipArrCheck)return[a[b]];if(!(a instanceof Array))return[a[b]]}if(void 0!==a&&"object"==typeof a){if((!c||c&&!c.skipArrCheck)&&a instanceof Array){for(j=[],k=0;k<a.length;k++)j.push(this.get(a[k],b));return j}for(i=[],void 0!==b&&(b=this.clean(b),d=b.split(".")),e=d||this._pathParts,f=e.length,g=a,k=0;k<f;k++){if(g=g[e[k]],h instanceof Array){for(l=0;l<h.length;l++)i=i.concat(this.value(h,l+"."+e[k],{skipArrCheck:!0}));return i}if(!g||"object"!=typeof g)break;h=g}return[g]}return[]},e.prototype.push=function(a,b,c){if(void 0!==a&&void 0!==b){var d,e;if(b=this.clean(b),d=b.split("."),e=d.shift(),d.length)a[e]=a[e]||{},this.set(a[e],d.join("."),c);else{if(a[e]=a[e]||[],!(a[e]instanceof Array))throw"ForerunnerDB.Path: Cannot push to a path whose endpoint is not an array!";a[e].push(c)}}return a},e.prototype.keyValue=function(a,b){var c,d,e,f,g,h,i;for(void 0!==b&&(b=this.clean(b),c=b.split(".")),d=c||this._pathParts,e=d.length,f=a,i=0;i<e;i++){if(f=f[d[i]],!f||"object"!=typeof f){h=d[i]+":"+f;break}g=f}return h},e.prototype.set=function(a,b,c){if(void 0!==a&&void 0!==b){var d,e;b=this.clean(b),d=b.split("."),e=d.shift(),d.length?(a[e]=a[e]||{},this.set(a[e],d.join("."),c)):a[e]=c}return a},e.prototype.clean=function(a){return"."===a.substr(0,1)&&(a=a.substr(1,a.length-1)),a},d.finishModule("Path"),b.exports=e},{"./Shared":40}],35:[function(a,b,c){"use strict";var d,e,f,g,h,i,j,k,l,m=a("./Shared"),n=a("async"),o=a("localforage");a("./PersistCompress"),a("./PersistCrypto");k=function(){this.init.apply(this,arguments)},k.prototype.localforage=o,k.prototype.init=function(a){var b=this;this._encodeSteps=[function(){return b._encode.apply(b,arguments)}],this._decodeSteps=[function(){return b._decode.apply(b,arguments)}],a.isClient()&&void 0!==window.Storage&&(this.mode("localforage"),o.config({name:String(a.core().name()),storeName:"FDB"}))},m.addModule("Persist",k),m.mixin(k.prototype,"Mixin.ChainReactor"),m.mixin(k.prototype,"Mixin.Common"),d=m.modules.Db,e=a("./Collection"),f=e.prototype.drop,g=a("./CollectionGroup"),h=e.prototype.init,i=d.prototype.init,j=d.prototype.drop,l=m.overload,m.synthesize(k.prototype,"auto",function(a){var b=this;return void 0!==a&&(a?(this._db.on("create",function(){b._autoLoad.apply(b,arguments)}),this._db.on("change",function(){b._autoSave.apply(b,arguments)}),this._db.debug()&&console.log(this._db.logIdentifier()+" Automatic load/save enabled")):(this._db.off("create",this._autoLoad),this._db.off("change",this._autoSave),this._db.debug()&&console.log(this._db.logIdentifier()+" Automatic load/save disabled"))),this.$super.call(this,a)}),k.prototype._autoLoad=function(a,b,c){var d=this;"function"==typeof a.load?(d._db.debug()&&console.log(d._db.logIdentifier()+" Auto-loading data for "+b+":",c),a.load(function(a,b){a&&d._db.debug()&&console.log(d._db.logIdentifier()+" Automatic load failed:",a),d.emit("load",a,b)})):d._db.debug()&&console.log(d._db.logIdentifier()+" Auto-load for "+b+":",c,"no load method, skipping")},k.prototype._autoSave=function(a,b,c){var d=this;"function"==typeof a.save&&(d._db.debug()&&console.log(d._db.logIdentifier()+" Auto-saving data for "+b+":",c),a.save(function(a,b){a&&d._db.debug()&&console.log(d._db.logIdentifier()+" Automatic save failed:",a),d.emit("save",a,b)}))},k.prototype.mode=function(a){return void 0!==a?(this._mode=a,this):this._mode},k.prototype.driver=function(a){if(void 0!==a){switch(a.toUpperCase()){case"LOCALSTORAGE":o.setDriver(o.LOCALSTORAGE);break;case"WEBSQL":o.setDriver(o.WEBSQL);break;case"INDEXEDDB":o.setDriver(o.INDEXEDDB);break;default:throw"ForerunnerDB.Persist: The persistence driver you have specified is not found. Please use either IndexedDB, WebSQL or LocalStorage!"}return this}return o.driver()},k.prototype.decode=function(a,b){n.waterfall([function(b){b&&b(!1,a,{})}].concat(this._decodeSteps),b)},k.prototype.encode=function(a,b){n.waterfall([function(b){b&&b(!1,a,{})}].concat(this._encodeSteps),b)},m.synthesize(k.prototype,"encodeSteps"),m.synthesize(k.prototype,"decodeSteps"),k.prototype.addStep=new l({object:function(a){return this.$main.call(this,function(){a.encode.apply(a,arguments)},function(){a.decode.apply(a,arguments)},0)},"function, function":function(a,b){return this.$main.call(this,a,b,0)},"function, function, number":function(a,b,c){return this.$main.call(this,a,b,c)},$main:function(a,b,c){0===c||void 0===c?(this._encodeSteps.push(a),this._decodeSteps.unshift(b)):(this._encodeSteps.splice(c,0,a),this._decodeSteps.splice(this._decodeSteps.length-c,0,b))}}),k.prototype.unwrap=function(a){var b,c=a.split("::fdb::");switch(c[0]){case"json":b=this.jParse(c[1]);break;case"raw":b=c[1]}},k.prototype._decode=function(a,b,c){var d,e;if(a){switch(d=a.split("::fdb::"),d[0]){case"json":e=this.jParse(d[1]);break;case"raw":e=d[1]}e?(b.foundData=!0,b.rowCount=e.length||0):(b.foundData=!1,b.rowCount=0),c&&c(!1,e,b)}else b.foundData=!1,b.rowCount=0,c&&c(!1,a,b)},k.prototype._encode=function(a,b,c){var d=a;a="object"==typeof a?"json::fdb::"+this.jStringify(a):"raw::fdb::"+a,d?(b.foundData=!0,b.rowCount=d.length||0):(b.foundData=!1,b.rowCount=0),c&&c(!1,a,b)},k.prototype.save=function(a,b,c){switch(this.mode()){case"localforage":this.encode(b,function(b,d,e){return b?c(b):void o.setItem(a,d,function(a){if(c){if(a)return void c(a);c(!1,d,e)}})});break;default:c&&c("No data handler.")}},k.prototype.load=function(a,b){var c=this;switch(this.mode()){case"localforage":o.getItem(a,function(a,d){return a?void(b&&b(a)):void c.decode(d,b)});break;default:b&&b("No data handler or unrecognised data type.")}},k.prototype.drop=function(a,b){switch(this.mode()){case"localforage":o.removeItem(a,function(a){b&&b(a)});break;default:b&&b("No data handler or unrecognised data type.")}},k.prototype._calcSize=function(a){var b,c,d=0,e=String(a||""),f=e.length;for(c=0;c<f;c++)b=encodeURI(e[c]).split("%").length,d+=1===b?1:b-1;return d},k.prototype.persistedSize=function(a,b){function c(a,b){if(null!==a){var c=e._calcSize(a)+e._calcSize(b);d.collections.push([b,c]),d.total+=c}}var d,e=this;switch(d={total:0,collections:[]},this.mode()){case"localforage":switch((typeof a).toLowerCase()){case"string":o.getItem(a).then(function(b){c(b,a)}).then(function(){return o.getItem(a+"-metaData")}).then(function(b){c(b,a+"-metaData")}).then(function(){b&&b(null,d)}).catch(function(a){console.error(JSON.stringify(a)),b&&b(a)});break;case"object":o.iterate(function(b,d){0===d.lastIndexOf(a.name(),0)&&null!==b&&c(b,d)}).then(function(){b(null,d)}).catch(function(a){console.error(JSON.stringify(a)),b&&b(a)});break;default:b&&b("Couldn't determine target for size calculation - must be either a collection name (string) or a db reference (object)")}break;default:b&&b("No data handler or unrecognised data type.")}},e.prototype.drop=new l({"":function(){this.isDropped()||this.drop(!0)},function:function(a){this.isDropped()||this.drop(!0,a)},boolean:function(a){if(!this.isDropped()){if(a){if(!this._name)throw"ForerunnerDB.Persist: Cannot drop a collection's persistent storage when no name assigned to collection!";this._db&&(this._db.persist.drop(this._db._name+"-"+this._name),this._db.persist.drop(this._db._name+"-"+this._name+"-metaData"))}f.call(this)}},"boolean, function":function(a,b){var c=this;if(!this.isDropped()){if(!a)return f.call(this,b);if(this._name){if(this._db)return this._db.persist.drop(this._db._name+"-"+this._name,function(){c._db.persist.drop(c._db._name+"-"+c._name+"-metaData",b)}),f.call(this);b&&b("Cannot drop a collection's persistent storage when the collection is not attached to a database!")}else b&&b("Cannot drop a collection's persistent storage when no name assigned to collection!")}}}),e.prototype.save=function(a){var b,c=this;c._name?c._db?(b=function(){c._db.persist.save(c._db._name+"-"+c._name,c._data,function(b,d,e){return b?void(a&&a(b)):void c._db.persist.save(c._db._name+"-"+c._name+"-metaData",c.metaData(),function(b,f,g){c.deferEmit("save",e,g,{tableData:d,metaData:f,tableDataName:c._db._name+"-"+c._name,metaDataName:c._db._name+"-"+c._name+"-metaData"}),a&&setTimeout(function(){a(b,e,g,{tableData:d,metaData:f,tableDataName:c._db._name+"-"+c._name,metaDataName:c._db._name+"-"+c._name+"-metaData"})},1)})})},c.isProcessingQueue()?c.on("queuesComplete",function(){b()}):b()):a&&a("Cannot save a collection that is not attached to a database!"):a&&a("Cannot save a collection with no assigned name!")},e.prototype.persistedSize=function(a){var b=this;b._name?b._db?b._db.persist.persistedSize(b._db._name+"-"+b._name,a):a&&a("Cannot determine persisted size of a collection that is not attached to a database!"):a&&a("Cannot determine persisted size of a collection with no assigned name!")},e.prototype.load=function(a){var b=this;b._name?b._db?b._db.persist.load(b._db._name+"-"+b._name,function(c,d,e){c?(b.deferEmit("load",e),a&&a(c)):b.remove({},function(){d=d||[],b.insert(d,function(){b._db.persist.load(b._db._name+"-"+b._name+"-metaData",function(c,d,f){c||d&&b.metaData(d),b.deferEmit("load",e,f),a&&a(c,e,f)})})})}):a&&a("Cannot load a collection that is not attached to a database!"):a&&a("Cannot load a collection with no assigned name!")},e.prototype.saveCustom=function(a){var b,c=this,d={};c._name?c._db?(b=function(){c.encode(c._data,function(b,e,f){b?a(b):(d.data={name:c._db._name+"-"+c._name,store:e,tableStats:f},c.encode(c._data,function(b,e,f){b?a(b):(d.metaData={name:c._db._name+"-"+c._name+"-metaData",store:e,tableStats:f},a(!1,d))}))})},c.isProcessingQueue()?c.on("queuesComplete",function(){b()}):b()):a&&a("Cannot save a collection that is not attached to a database!"):a&&a("Cannot save a collection with no assigned name!")},e.prototype.loadCustom=function(a,b){var c=this;c._name?c._db?a.data&&a.data.store?a.metaData&&a.metaData.store?c.decode(a.data.store,function(d,e,f){d?b(d):e&&(c.remove({}),c.insert(e),c.decode(a.metaData.store,function(a,d,e){a?b(a):d&&(c.metaData(d),b&&b(a,f,e))}))}):b('No "metaData" key found in passed object!'):b('No "data" key found in passed object!'):b&&b("Cannot load a collection that is not attached to a database!"):b&&b("Cannot load a collection with no assigned name!")},d.prototype.init=function(){i.apply(this,arguments),this.persist=new k(this)},d.prototype.load=new l({function:function(a){this.$main.call(this,void 0,a)},"object, function":function(a,b){this.$main.call(this,a,b)},$main:function(a,b){var c,d,e,f,g,h=this;if(c=this._collection,d=Object.keys(c),e=d.length,e<=0)return b(!1);f=function(a){a?b&&b(a):(e--,e<=0&&(h.deferEmit("load"),b&&b(!1)))};for(g in c)c.hasOwnProperty(g)&&(a?c[g].loadCustom(a,f):c[g].load(f))}}),d.prototype.save=new l({function:function(a){this.$main.call(this,{},a)},"object, function":function(a,b){this.$main.call(this,a,b)},$main:function(a,b){var c,d,e,f,g,h=this;if(c=this._collection,d=Object.keys(c),e=d.length,e<=0)return b(!1);f=function(a){a?b&&b(a):(e--,e<=0&&(h.deferEmit("save"),b&&b(!1)))};for(g in c)c.hasOwnProperty(g)&&(a.custom?c[g].saveCustom(f):c[g].save(f))}}),d.prototype.persistedSize=function(a){this.persist.persistedSize(this,a)},m.finishModule("Persist"),b.exports=k},{"./Collection":6,"./CollectionGroup":7,"./PersistCompress":36,"./PersistCrypto":37,"./Shared":40,async:43,localforage:79}],36:[function(a,b,c){"use strict";var d=a("./Shared"),e=a("pako"),f=function(){this.init.apply(this,arguments)};f.prototype.init=function(a){},d.mixin(f.prototype,"Mixin.Common"),f.prototype.encode=function(a,b,c){var d,f,g,h={data:a,type:"fdbCompress",enabled:!1};d=a.length,g=e.deflate(a,{to:"string"}),f=g.length,f<d&&(h.data=g,h.enabled=!0),b.compression={enabled:h.enabled,compressedBytes:f,uncompressedBytes:d,effect:Math.round(100/d*f)+"%"},c(!1,this.jStringify(h),b)},f.prototype.decode=function(a,b,c){var d,f=!1;a?(a=this.jParse(a),a.enabled?(d=e.inflate(a.data,{to:"string"}),f=!0):(d=a.data,f=!1),b.compression={enabled:f},c&&c(!1,d,b)):c&&c(!1,d,b)},d.plugins.FdbCompress=f,b.exports=f},{"./Shared":40,pako:80}],37:[function(a,b,c){"use strict";var d=a("./Shared"),e=a("crypto-js"),f=function(){this.init.apply(this,arguments)};f.prototype.init=function(a){if(!a||!a.pass)throw'Cannot initialise persistent storage encryption without a passphrase provided in the passed options object as the "pass" field.';this._algo=a.algo||"AES",this._pass=a.pass},d.mixin(f.prototype,"Mixin.Common"),d.synthesize(f.prototype,"pass"),f.prototype.stringify=function(a){var b={ct:a.ciphertext.toString(e.enc.Base64)};return a.iv&&(b.iv=a.iv.toString()),a.salt&&(b.s=a.salt.toString()),this.jStringify(b)},f.prototype.parse=function(a){var b=this.jParse(a),c=e.lib.CipherParams.create({ciphertext:e.enc.Base64.parse(b.ct)});return b.iv&&(c.iv=e.enc.Hex.parse(b.iv)),b.s&&(c.salt=e.enc.Hex.parse(b.s)),c},f.prototype.encode=function(a,b,c){var d,f=this,g={type:"fdbCrypto"};d=e[this._algo].encrypt(a,this._pass,{format:{stringify:function(){return f.stringify.apply(f,arguments)},parse:function(){return f.parse.apply(f,arguments)}}}),g.data=d.toString(),g.enabled=!0,b.encryption={enabled:g.enabled},c&&c(!1,this.jStringify(g),b)},f.prototype.decode=function(a,b,c){var d,f=this;if(a){a=this.jParse(a);try{if(d=e[this._algo].decrypt(a.data,this._pass,{format:{stringify:function(){return f.stringify.apply(f,arguments)},parse:function(){return f.parse.apply(f,arguments)}}}).toString(e.enc.Utf8),!d)return void(c&&c("Crypto failed to decrypt data, incorrect password?",d,b))}catch(a){return void(c&&c("Crypto failed to decrypt data, incorrect password?",d,b))}c&&c(!1,d,b)}else c&&c(!1,a,b)},d.plugins.FdbCrypto=f,b.exports=f},{"./Shared":40,"crypto-js":52}],38:[function(a,b,c){"use strict";var d=a("./Shared"),e=function(a,b,c){if(!(a&&b&&c))throw"ForerunnerDB.ReactorIO: ReactorIO requires in, out and process arguments to instantiate!";if(this._reactorIn=a,this._reactorOut=b,this._chainHandler=c,!a.chain)throw"ForerunnerDB.ReactorIO: ReactorIO requires passed in and out objects to implement the ChainReactor mixin!";a.chain(this),this.chain(b)};d.addModule("ReactorIO",e),e.prototype.drop=function(){return this.isDropped()||(this._state="dropped",this._reactorIn&&this._reactorIn.unChain(this),this._reactorOut&&this.unChain(this._reactorOut),delete this._reactorIn,delete this._reactorOut,delete this._chainHandler,this.emit("drop",this),delete this._listeners),!0},d.synthesize(e.prototype,"state"),d.mixin(e.prototype,"Mixin.Common"),d.mixin(e.prototype,"Mixin.ChainReactor"),d.mixin(e.prototype,"Mixin.Events"),d.finishModule("ReactorIO"),b.exports=e},{"./Shared":40}],39:[function(a,b,c){"use strict";var d=function(){this.init.apply(this,arguments)};d.prototype.init=function(){var a=this;this._encoder=[],this._decoder=[],this.registerHandler("$date",function(a){return a instanceof Date&&(a.toJSON=function(){return"$date:"+this.toISOString()},!0)},function(b){if("string"==typeof b&&0===b.indexOf("$date:"))return a.convert(new Date(b.substr(6)))}),this.registerHandler("$regexp",function(a){return a instanceof RegExp&&(a.toJSON=function(){return"$regexp:"+this.source.length+":"+this.source+":"+(this.global?"g":"")+(this.ignoreCase?"i":"")},!0)},function(b){if("string"==typeof b&&0===b.indexOf("$regexp:")){var c=b.substr(8),d=c.indexOf(":"),e=Number(c.substr(0,d)),f=c.substr(d+1,e),g=c.substr(d+e+2);return a.convert(new RegExp(f,g))}})},d.prototype.registerHandler=function(a,b,c){void 0!==a&&(this._encoder.push(b),this._decoder.push(c))},d.prototype.convert=function(a){var b,c=this._encoder;for(b=0;b<c.length;b++)if(c[b](a))return a;return a},d.prototype.reviver=function(){var a=this._decoder;return function(b,c){var d,e;for(e=0;e<a.length;e++)if(d=a[e](c),void 0!==d)return d;return c}},b.exports=d},{}],40:[function(a,b,c){"use strict";var d=a("./Overload"),e={version:"2.0.22",modules:{},plugins:{},index:{},_synth:{},addModule:function(a,b){this.modules[a]=b,this.emit("moduleLoad",[a,b])},finishModule:function(a){if(!this.modules[a])throw"ForerunnerDB.Shared: finishModule called on a module that has not been registered with addModule(): "+a;this.modules[a]._fdbFinished=!0,this.modules[a].prototype?this.modules[a].prototype.className=a:this.modules[a].className=a,this.emit("moduleFinished",[a,this.modules[a]])},moduleFinished:function(a,b){this.modules[a]&&this.modules[a]._fdbFinished?b&&b(a,this.modules[a]):this.on("moduleFinished",b)},moduleExists:function(a){return Boolean(this.modules[a])},mixin:new d({"object, string":function(a,b){var c;if("string"==typeof b&&(c=this.mixins[b],!c))throw"ForerunnerDB.Shared: Cannot find mixin named: "+b;return this.$main.call(this,a,c)},"object, *":function(a,b){return this.$main.call(this,a,b)},$main:function(a,b){if(b&&"object"==typeof b)for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return a}}),synthesize:function(a,b,c){if(this._synth[b]=this._synth[b]||function(a){return void 0!==a?(this["_"+b]=a,this):this["_"+b]},c){var d=this;a[b]=function(){var a,e=this.$super;return this.$super=d._synth[b],a=c.apply(this,arguments),this.$super=e,a}}else a[b]=this._synth[b]},overload:d,mixins:{"Mixin.Common":a("./Mixin.Common"),"Mixin.Events":a("./Mixin.Events"),"Mixin.ChainReactor":a("./Mixin.ChainReactor"),"Mixin.CRUD":a("./Mixin.CRUD"),"Mixin.Constants":a("./Mixin.Constants"),"Mixin.Triggers":a("./Mixin.Triggers"),"Mixin.Sorting":a("./Mixin.Sorting"),"Mixin.Matching":a("./Mixin.Matching"),"Mixin.Updating":a("./Mixin.Updating"),"Mixin.Tags":a("./Mixin.Tags")}};e.mixin(e,"Mixin.Events"),b.exports=e},{"./Mixin.CRUD":20,"./Mixin.ChainReactor":21,"./Mixin.Common":22,"./Mixin.Constants":23,"./Mixin.Events":24,"./Mixin.Matching":25,"./Mixin.Sorting":26,"./Mixin.Tags":27,"./Mixin.Triggers":28,"./Mixin.Updating":29,"./Overload":32}],41:[function(a,b,c){Array.prototype.filter||(Array.prototype.filter=function(a){if(void 0===this||null===this)throw new TypeError;var b=Object(this),c=b.length>>>0;if("function"!=typeof a)throw new TypeError;for(var d=[],e=arguments.length>=2?arguments[1]:void 0,f=0;f<c;f++)if(f in b){var g=b[f];a.call(e,g,f,b)&&d.push(g)}return d}),"function"!=typeof Object.create&&(Object.create=function(){var a=function(){};return function(b){if(arguments.length>1)throw Error("Second argument not supported");if("object"!=typeof b)throw TypeError("Argument must be an object");a.prototype=b;var c=new a;return a.prototype=null,c}}()),Array.prototype.indexOf||(Array.prototype.indexOf=function(a,b){var c;if(null===this)throw new TypeError('"this" is null or not defined');var d=Object(this),e=d.length>>>0;if(0===e)return-1;var f=+b||0;if(Math.abs(f)===1/0&&(f=0),f>=e)return-1;for(c=Math.max(f>=0?f:e-Math.abs(f),0);c<e;){if(c in d&&d[c]===a)return c;c++}return-1}),b.exports={}},{}],42:[function(a,b,c){"use strict";var d,e,f,g,h,i,j,k,l,m,n=a("./Overload");d=a("./Shared");var o=function(a,b,c){this.init.apply(this,arguments)};d.addModule("View",o),d.mixin(o.prototype,"Mixin.Common"),d.mixin(o.prototype,"Mixin.Matching"),d.mixin(o.prototype,"Mixin.ChainReactor"),d.mixin(o.prototype,"Mixin.Constants"),d.mixin(o.prototype,"Mixin.Tags"),f=a("./Collection"),g=a("./CollectionGroup"),k=a("./ActiveBucket"),j=a("./ReactorIO"),h=f.prototype.init,e=d.modules.Db,i=e.prototype.init,l=d.modules.Path,m=new l,o.prototype.init=function(a,b,c){var d=this;this.sharedPathSolver=m,this._name=a,this._listeners={},this._querySettings={},this._debug={},this.query(b,c,!1),this._collectionDroppedWrap=function(){d._collectionDropped.apply(d,arguments)},this._data=new f(this.name()+"_internal")},o.prototype._handleChainIO=function(a,b){var c,d,e,f,g=a.type;return("setData"===g||"insert"===g||"update"===g||"remove"===g)&&(c=Boolean(b._querySettings.options&&b._querySettings.options.$join),d=Boolean(b._querySettings.query),e=void 0!==b._data._transformIn,!!(c||d||e)&&(f={dataArr:[],removeArr:[]},"insert"===a.type?a.data.dataSet instanceof Array?f.dataArr=a.data.dataSet:f.dataArr=[a.data.dataSet]:"update"===a.type?f.dataArr=a.data.dataSet:"remove"===a.type&&(a.data.dataSet instanceof Array?f.removeArr=a.data.dataSet:f.removeArr=[a.data.dataSet]),f.dataArr instanceof Array||(console.warn("WARNING: dataArr being processed by chain reactor in View class is inconsistent!"),f.dataArr=[]),f.removeArr instanceof Array||(console.warn("WARNING: removeArr being processed by chain reactor in View class is inconsistent!"),f.removeArr=[]),c&&(this.debug()&&console.time(this.logIdentifier()+" :: _handleChainIO_ActiveJoin"),b._handleChainIO_ActiveJoin(a,f),this.debug()&&console.timeEnd(this.logIdentifier()+" :: _handleChainIO_ActiveJoin")),d&&(this.debug()&&console.time(this.logIdentifier()+" :: _handleChainIO_ActiveQuery"),b._handleChainIO_ActiveQuery(a,f),this.debug()&&console.timeEnd(this.logIdentifier()+" :: _handleChainIO_ActiveQuery")),e&&(this.debug()&&console.time(this.logIdentifier()+" :: _handleChainIO_TransformIn"),b._handleChainIO_TransformIn(a,f),this.debug()&&console.timeEnd(this.logIdentifier()+" :: _handleChainIO_TransformIn")),!f.dataArr.length&&!f.removeArr.length||(f.pk=b._data.primaryKey(),f.removeArr.length&&(this.debug()&&console.time(this.logIdentifier()+" :: _handleChainIO_RemovePackets"),b._handleChainIO_RemovePackets(this,a,f),this.debug()&&console.timeEnd(this.logIdentifier()+" :: _handleChainIO_RemovePackets")),f.dataArr.length&&(this.debug()&&console.time(this.logIdentifier()+" :: _handleChainIO_UpsertPackets"),b._handleChainIO_UpsertPackets(this,a,f),this.debug()&&console.timeEnd(this.logIdentifier()+" :: _handleChainIO_UpsertPackets")),!0)))},o.prototype._handleChainIO_ActiveJoin=function(a,b){var c,d=b.dataArr;c=this.applyJoin(d,this._querySettings.options.$join,{},{}),this.spliceArrayByIndexList(d,c),b.removeArr=b.removeArr.concat(c)},o.prototype._handleChainIO_ActiveQuery=function(a,b){var c,d=this,e=b.dataArr;for(c=e.length-1;c>=0;c--)d._match(e[c],d._querySettings.query,d._querySettings.options,"and",{})||(b.removeArr.push(e[c]),e.splice(c,1))},o.prototype._handleChainIO_TransformIn=function(a,b){var c,d=this,e=b.dataArr,f=b.removeArr,g=d._data._transformIn;for(c=0;c<e.length;c++)e[c]=g(e[c]);for(c=0;c<f.length;c++)f[c]=g(f[c])},o.prototype._handleChainIO_RemovePackets=function(a,b,c){var d,e,f=[],g=c.pk,h=c.removeArr,i={dataSet:h,query:{$or:f}};for(e=0;e<h.length;e++)d={},d[g]=h[e][g],f.push(d);a.chainSend("remove",i)},o.prototype._handleChainIO_UpsertPackets=function(a,b,c){var d,e,f,g=this._data,h=g._primaryIndex,i=g._primaryCrc,j=c.pk,k=c.dataArr,l=[],m=[];for(f=0;f<k.length;f++)d=k[f],h.get(d[j])?i.get(d[j])!==this.hash(d[j])&&m.push(d):l.push(d);if(l.length&&a.chainSend("insert",{dataSet:l}),m.length)for(f=0;f<m.length;f++)d=m[f],e={},e[j]=d[j],a.chainSend("update",{query:e,update:d,dataSet:[d]})},o.prototype.insert=function(){this._from.insert.apply(this._from,arguments)},o.prototype.update=function(a,b,c,d){var e={$and:[this.query(),a]};this._from.update.call(this._from,e,b,c,d)},o.prototype.updateById=function(){this._from.updateById.apply(this._from,arguments)},o.prototype.remove=function(){this._from.remove.apply(this._from,arguments)},o.prototype.find=function(a,b){return this._data.find(a,b)},o.prototype.findOne=function(a,b){return this._data.findOne(a,b)},o.prototype.findById=function(a,b){return this._data.findById(a,b)},o.prototype.findSub=function(a,b,c,d){return this._data.findSub(a,b,c,d)},o.prototype._findSub=function(a,b,c,d){return this._data._findSub(a,b,c,d)},o.prototype.findSubOne=function(a,b,c,d){return this._data.findSubOne(a,b,c,d)},o.prototype._findSubOne=function(a,b,c,d){return this._data._findSubOne(a,b,c,d)},o.prototype.data=function(){return this._data},o.prototype.from=function(a,b){var c=this;if(void 0!==a){this._from&&(this._from.off("drop",this._collectionDroppedWrap),delete this._from),this._io&&(this._io.drop(),delete this._io),"string"==typeof a&&(a=this._db.collection(a)),"View"===a.className&&(a=a._data,this.debug()&&console.log(this.logIdentifier()+' Using internal data "'+a.instanceIdentifier()+'" for IO graph linking')),this._from=a,this._from.on("drop",this._collectionDroppedWrap),this._io=new j(this._from,this,function(a){return c._handleChainIO.call(this,a,c)}),this._data.primaryKey(a.primaryKey());var d=a.find(this._querySettings.query,this._querySettings.options);return this._data.setData(d,{},b),this._querySettings.options&&this._querySettings.options.$orderBy?this.rebuildActiveBucket(this._querySettings.options.$orderBy):this.rebuildActiveBucket(),this}return this._from},o.prototype._chainHandler=function(a){var b,c,d,e,f,g,h,i;switch(this.debug()&&console.log(this.logIdentifier()+" Received chain reactor data: "+a.type),a.type){case"setData":this.debug()&&console.log(this.logIdentifier()+' Setting data in underlying (internal) view collection "'+this._data.name()+'"');var j=this._from.find(this._querySettings.query,this._querySettings.options);this._data.setData(j),this.rebuildActiveBucket(this._querySettings.options);break;case"insert":if(this.debug()&&console.log(this.logIdentifier()+' Inserting some data into underlying (internal) view collection "'+this._data.name()+'"'),a.data.dataSet=this.decouple(a.data.dataSet),a.data.dataSet instanceof Array||(a.data.dataSet=[a.data.dataSet]),this._querySettings.options&&this._querySettings.options.$orderBy)for(b=a.data.dataSet,c=b.length,d=0;d<c;d++)e=this._activeBucket.insert(b[d]),this._data._insertHandle(b[d],e);else e=this._data._data.length,this._data._insertHandle(a.data.dataSet,e);break;case"update":if(this.debug()&&console.log(this.logIdentifier()+' Updating some data in underlying (internal) view collection "'+this._data.name()+'"'),g=this._data.primaryKey(),f=this._data._handleUpdate(a.data.query,a.data.update,a.data.options),this._querySettings.options&&this._querySettings.options.$orderBy)for(c=f.length,d=0;d<c;d++)h=f[d],i=this._activeBucket.remove(h),e=this._activeBucket.insert(h),i!==e&&this._data._updateSpliceMove(this._data._data,i,e);break;case"remove":if(this.debug()&&console.log(this.logIdentifier()+' Removing some data from underlying (internal) view collection "'+this._data.name()+'"'),this._data.remove(a.data.query,a.options),this._querySettings.options&&this._querySettings.options.$orderBy)for(b=a.data.dataSet,c=b.length,d=0;d<c;d++)this._activeBucket.remove(b[d])}},o.prototype._collectionDropped=function(a){a&&delete this._from},o.prototype.ensureIndex=function(){return this._data.ensureIndex.apply(this._data,arguments)},o.prototype.on=function(){return this._data.on.apply(this._data,arguments)},o.prototype.off=function(){return this._data.off.apply(this._data,arguments)},o.prototype.emit=function(){return this._data.emit.apply(this._data,arguments)},o.prototype.deferEmit=function(){return this._data.deferEmit.apply(this._data,arguments)},o.prototype.distinct=function(a,b,c){return this._data.distinct(a,b,c)},o.prototype.primaryKey=function(){return this._data.primaryKey()},o.prototype.addTrigger=function(){return this._data.addTrigger.apply(this._data,arguments)},o.prototype.removeTrigger=function(){return this._data.removeTrigger.apply(this._data,arguments)},o.prototype.ignoreTriggers=function(){return this._data.ignoreTriggers.apply(this._data,arguments)},o.prototype.addLinkIO=function(){return this._data.addLinkIO.apply(this._data,arguments)},o.prototype.removeLinkIO=function(){return this._data.removeLinkIO.apply(this._data,arguments)},o.prototype.willTrigger=function(){return this._data.willTrigger.apply(this._data,arguments)},o.prototype.processTrigger=function(){return this._data.processTrigger.apply(this._data,arguments);
},o.prototype._triggerIndexOf=function(){return this._data._triggerIndexOf.apply(this._data,arguments)},o.prototype.drop=function(a){return!this.isDropped()&&(this._from&&(this._from.off("drop",this._collectionDroppedWrap),this._from._removeView(this)),(this.debug()||this._db&&this._db.debug())&&console.log(this.logIdentifier()+" Dropping"),this._state="dropped",this._io&&this._io.drop(),this._data&&this._data.drop(),this._db&&this._name&&delete this._db._view[this._name],this.emit("drop",this),a&&a(!1,!0),delete this._chain,delete this._from,delete this._data,delete this._io,delete this._listeners,delete this._querySettings,delete this._db,!0)},o.prototype.queryData=function(a,b,c){return void 0!==a&&(this._querySettings.query=a,a.$findSub&&!a.$findSub.$from&&(a.$findSub.$from=this._data.name()),a.$findSubOne&&!a.$findSubOne.$from&&(a.$findSubOne.$from=this._data.name())),void 0!==b&&(this._querySettings.options=b),void 0===a&&void 0===b||void 0!==c&&c!==!0||this.refresh(),void 0!==a&&this.emit("queryChange",a),void 0!==b&&this.emit("queryOptionsChange",b),void 0!==a||void 0!==b?this:this.decouple(this._querySettings)},o.prototype.queryAdd=function(a,b,c){this._querySettings.query=this._querySettings.query||{};var d,e=this._querySettings.query;if(void 0!==a)for(d in a)a.hasOwnProperty(d)&&(void 0===e[d]||void 0!==e[d]&&b!==!1)&&(e[d]=a[d]);void 0!==c&&c!==!0||this.refresh(),void 0!==e&&this.emit("queryChange",e)},o.prototype.queryRemove=function(a,b){var c,d=this._querySettings.query;if(d){if(void 0!==a)for(c in a)a.hasOwnProperty(c)&&delete d[c];void 0!==b&&b!==!0||this.refresh(),void 0!==d&&this.emit("queryChange",d)}},o.prototype.query=new n({"":function(){return this.decouple(this._querySettings.query)},object:function(a){return this.$main.call(this,a,void 0,!0)},"*, boolean":function(a,b){return this.$main.call(this,a,void 0,b)},"object, object":function(a,b){return this.$main.call(this,a,b,!0)},"*, *, boolean":function(a,b,c){return this.$main.call(this,a,b,c)},$main:function(a,b,c){return void 0!==a&&(this._querySettings.query=a,a.$findSub&&!a.$findSub.$from&&(a.$findSub.$from=this._data.name()),a.$findSubOne&&!a.$findSubOne.$from&&(a.$findSubOne.$from=this._data.name())),void 0!==b&&(this._querySettings.options=b),void 0===a&&void 0===b||void 0!==c&&c!==!0||this.refresh(),void 0!==a&&this.emit("queryChange",a),void 0!==b&&this.emit("queryOptionsChange",b),void 0!==a||void 0!==b?this:this.decouple(this._querySettings)}}),o.prototype.orderBy=function(a){if(void 0!==a){var b=this.queryOptions()||{};return b.$orderBy=a,this.queryOptions(b),this}return(this.queryOptions()||{}).$orderBy},o.prototype.page=function(a){if(void 0!==a){var b=this.queryOptions()||{};return a!==b.$page&&(b.$page=a,this.queryOptions(b)),this}return(this.queryOptions()||{}).$page},o.prototype.pageFirst=function(){return this.page(0)},o.prototype.pageLast=function(){var a=this.cursor().pages,b=void 0!==a?a:0;return this.page(b-1)},o.prototype.pageScan=function(a){if(void 0!==a){var b=this.cursor().pages,c=this.queryOptions()||{},d=void 0!==c.$page?c.$page:0;return d+=a,d<0&&(d=0),d>=b&&(d=b-1),this.page(d)}},o.prototype.queryOptions=function(a,b){return void 0!==a?(this._querySettings.options=a,void 0===a.$decouple&&(a.$decouple=!0),void 0===b||b===!0?this.refresh():this.rebuildActiveBucket(a.$orderBy),void 0!==a&&this.emit("queryOptionsChange",a),this):this._querySettings.options},o.prototype.rebuildActiveBucket=function(a){if(a){var b=this._data._data,c=b.length;this._activeBucket=new k(a),this._activeBucket.primaryKey(this._data.primaryKey());for(var d=0;d<c;d++)this._activeBucket.insert(b[d])}else delete this._activeBucket},o.prototype.refresh=function(){var a,b,c,d,e=this;if(this._from&&(this._data.remove(),a=this._from.find(this._querySettings.query,this._querySettings.options),this.cursor(a.$cursor),this._data.insert(a),this._data._data.$cursor=a.$cursor),this._querySettings&&this._querySettings.options&&this._querySettings.options.$join&&this._querySettings.options.$join.length){if(e.__joinChange=e.__joinChange||function(){e._joinChange()},this._joinCollections&&this._joinCollections.length)for(c=0;c<this._joinCollections.length;c++)this._db.collection(this._joinCollections[c]).off("immediateChange",e.__joinChange);for(b=this._querySettings.options.$join,this._joinCollections=[],c=0;c<b.length;c++)for(d in b[c])b[c].hasOwnProperty(d)&&this._joinCollections.push(d);if(this._joinCollections.length)for(c=0;c<this._joinCollections.length;c++)this._db.collection(this._joinCollections[c]).on("immediateChange",e.__joinChange)}return this._querySettings.options&&this._querySettings.options.$orderBy?this.rebuildActiveBucket(this._querySettings.options.$orderBy):this.rebuildActiveBucket(),this},o.prototype._joinChange=function(a,b){this.emit("joinChange"),this.refresh()},o.prototype.count=function(){return this._data.count.apply(this._data,arguments)},o.prototype.subset=function(){return this._data.subset.apply(this._data,arguments)},o.prototype.transform=function(a){var b,c;return b=this._data.transform(),this._data.transform(a),c=this._data.transform(),c.enabled&&c.dataIn&&(b.enabled!==c.enabled||b.dataIn!==c.dataIn)&&this.refresh(),c},o.prototype.filter=function(a,b,c){return this._data.filter(a,b,c)},o.prototype.data=function(){return this._data},o.prototype.indexOf=function(){return this._data.indexOf.apply(this._data,arguments)},d.synthesize(o.prototype,"db",function(a){return a&&(this._data.db(a),this.debug(a.debug()),this._data.debug(a.debug())),this.$super.apply(this,arguments)}),d.synthesize(o.prototype,"state"),d.synthesize(o.prototype,"name"),d.synthesize(o.prototype,"cursor",function(a){return void 0===a?this._cursor||{}:void this.$super.apply(this,arguments)}),f.prototype.init=function(){this._view=[],h.apply(this,arguments)},f.prototype.view=function(a,b,c){if(this._db&&this._db._view){if(this._db._view[a])throw this.logIdentifier()+" Cannot create a view using this collection because a view with this name already exists: "+a;var d=new o(a,b,c).db(this._db).from(this);return this._view=this._view||[],this._view.push(d),d}},f.prototype._addView=g.prototype._addView=function(a){return void 0!==a&&this._view.push(a),this},f.prototype._removeView=g.prototype._removeView=function(a){if(void 0!==a){var b=this._view.indexOf(a);b>-1&&this._view.splice(b,1)}return this},e.prototype.init=function(){this._view={},i.apply(this,arguments)},e.prototype.view=function(a){var b=this;return a instanceof o?a:this._view[a]?this._view[a]:((this.debug()||this._db&&this._db.debug())&&console.log(this.logIdentifier()+" Creating view "+a),this._view[a]=new o(a).db(this),b.deferEmit("create",b._view[a],"view",a),this._view[a])},e.prototype.viewExists=function(a){return Boolean(this._view[a])},e.prototype.views=function(){var a,b,c=[];for(b in this._view)this._view.hasOwnProperty(b)&&(a=this._view[b],c.push({name:b,count:a.count(),linked:void 0!==a.isLinked&&a.isLinked()}));return c},d.finishModule("View"),b.exports=o},{"./ActiveBucket":3,"./Collection":6,"./CollectionGroup":7,"./Overload":32,"./ReactorIO":38,"./Shared":40}],43:[function(a,b,c){(function(a,d){!function(a,d){"object"==typeof c&&"undefined"!=typeof b?d(c):"function"==typeof define&&define.amd?define(["exports"],d):d(a.async=a.async||{})}(this,function(c){"use strict";function e(a){return a}function f(a,b,c){switch(c.length){case 0:return a.call(b);case 1:return a.call(b,c[0]);case 2:return a.call(b,c[0],c[1]);case 3:return a.call(b,c[0],c[1],c[2])}return a.apply(b,c)}function g(a,b,c){return b=hb(void 0===b?a.length-1:b,0),function(){for(var d=arguments,e=-1,g=hb(d.length-b,0),h=Array(g);++e<g;)h[e]=d[b+e];e=-1;for(var i=Array(b+1);++e<b;)i[e]=d[e];return i[b]=c(h),f(a,this,i)}}function h(a){return function(){return a}}function i(a){var b=typeof a;return null!=a&&("object"==b||"function"==b)}function j(a){var b=i(a)?mb.call(a):"";return b==ib||b==jb||b==kb}function k(a){return!!rb&&rb in a}function l(a){if(null!=a){try{return tb.call(a)}catch(a){}try{return a+""}catch(a){}}return""}function m(a){if(!i(a)||k(a))return!1;var b=j(a)?Ab:vb;return b.test(l(a))}function n(a,b){return null==a?void 0:a[b]}function o(a,b){var c=n(a,b);return m(c)?c:void 0}function p(a){var b=0,c=0;return function(){var d=Fb(),e=Eb-(d-c);if(c=d,e>0){if(++b>=Db)return arguments[0]}else b=0;return a.apply(void 0,arguments)}}function q(a,b){return Gb(g(a,b,e),a+"")}function r(a){return q(function(b,c){var d=Hb(function(c,d){var e=this;return a(b,function(a,b){a.apply(e,c.concat([b]))},d)});return c.length?d.apply(this,c):d})}function s(a){return"number"==typeof a&&a>-1&&a%1==0&&a<=Ib}function t(a){return null!=a&&s(a.length)&&!j(a)}function u(){}function v(a){return function(){if(null!==a){var b=a;a=null,b.apply(this,arguments)}}}function w(a,b){for(var c=-1,d=Array(a);++c<a;)d[c]=b(c);return d}function x(a){return null!=a&&"object"==typeof a}function y(a){return x(a)&&Nb.call(a)==Lb}function z(){return!1}function A(a,b){return b=null==b?Zb:b,!!b&&("number"==typeof a||$b.test(a))&&a>-1&&a%1==0&&a<b}function B(a){return x(a)&&s(a.length)&&!!xc[Ac.call(a)]}function C(a){return function(b){return a(b)}}function D(a,b){var c=Sb(a),d=!c&&Rb(a),e=!c&&!d&&Yb(a),f=!c&&!d&&!e&&Hc(a),g=c||d||e||f,h=g?w(a.length,String):[],i=h.length;for(var j in a)!b&&!Jc.call(a,j)||g&&("length"==j||e&&("offset"==j||"parent"==j)||f&&("buffer"==j||"byteLength"==j||"byteOffset"==j)||A(j,i))||h.push(j);return h}function E(a){var b=a&&a.constructor,c="function"==typeof b&&b.prototype||Kc;return a===c}function F(a,b){return function(c){return a(b(c))}}function G(a){if(!E(a))return Lc(a);var b=[];for(var c in Object(a))Nc.call(a,c)&&"constructor"!=c&&b.push(c);return b}function H(a){return t(a)?D(a):G(a)}function I(a){var b=-1,c=a.length;return function(){return++b<c?{value:a[b],key:b}:null}}function J(a){var b=-1;return function(){var c=a.next();return c.done?null:(b++,{value:c.value,key:b})}}function K(a){var b=H(a),c=-1,d=b.length;return function(){var e=b[++c];return c<d?{value:a[e],key:e}:null}}function L(a){if(t(a))return I(a);var b=Kb(a);return b?J(b):K(a)}function M(a){return function(){if(null===a)throw new Error("Callback was already called.");var b=a;a=null,b.apply(this,arguments)}}function N(a){return function(b,c,d){function e(a,b){if(i-=1,a)h=!0,d(a);else{if(b===Oc||h&&i<=0)return h=!0,d(null);f()}}function f(){for(;i<a&&!h;){var b=g();if(null===b)return h=!0,void(i<=0&&d(null));i+=1,c(b.value,b.key,M(e))}}if(d=v(d||u),a<=0||!b)return d(null);var g=L(b),h=!1,i=0;f()}}function O(a,b,c,d){N(b)(a,c,d)}function P(a,b){return function(c,d,e){return a(c,b,d,e)}}function Q(a,b,c){function d(a){a?c(a):++f===g&&c(null)}c=v(c||u);var e=0,f=0,g=a.length;for(0===g&&c(null);e<g;e++)b(a[e],e,M(d))}function R(a){return function(b,c,d){return a(Qc,b,c,d)}}function S(a,b,c,d){d=v(d||u),b=b||[];var e=[],f=0;a(b,function(a,b,d){var g=f++;c(a,function(a,b){e[g]=b,d(a)})},function(a){d(a,e)})}function T(a){return function(b,c,d,e){return a(N(c),b,d,e)}}function U(a){return Hb(function(b,c){var d;try{d=a.apply(this,b)}catch(a){return c(a)}i(d)&&"function"==typeof d.then?d.then(function(a){c(null,a)},function(a){c(a.message?a:new Error(a))}):c(null,d)})}function V(a,b){for(var c=-1,d=a?a.length:0;++c<d&&b(a[c],c,a)!==!1;);return a}function W(a){return function(b,c,d){for(var e=-1,f=Object(b),g=d(b),h=g.length;h--;){var i=g[a?h:++e];if(c(f[i],i,f)===!1)break}return b}}function X(a,b){return a&&Xc(a,b,H)}function Y(a,b,c,d){for(var e=a.length,f=c+(d?1:-1);d?f--:++f<e;)if(b(a[f],f,a))return f;return-1}function Z(a){return a!==a}function $(a,b,c){for(var d=c-1,e=a.length;++d<e;)if(a[d]===b)return d;return-1}function _(a,b,c){return b===b?$(a,b,c):Y(a,Z,c)}function aa(a,b){for(var c=-1,d=a?a.length:0,e=Array(d);++c<d;)e[c]=b(a[c],c,a);return e}function ba(a,b){var c=-1,d=a.length;for(b||(b=Array(d));++c<d;)b[c]=a[c];return b}function ca(a){return"symbol"==typeof a||x(a)&&ad.call(a)==$c}function da(a){if("string"==typeof a)return a;if(Sb(a))return aa(a,da)+"";if(ca(a))return dd?dd.call(a):"";var b=a+"";return"0"==b&&1/a==-bd?"-0":b}function ea(a,b,c){var d=-1,e=a.length;b<0&&(b=-b>e?0:e+b),c=c>e?e:c,c<0&&(c+=e),e=b>c?0:c-b>>>0,b>>>=0;for(var f=Array(e);++d<e;)f[d]=a[d+b];return f}function fa(a,b,c){var d=a.length;return c=void 0===c?d:c,!b&&c>=d?a:ea(a,b,c)}function ga(a,b){for(var c=a.length;c--&&_(b,a[c],0)>-1;);return c}function ha(a,b){for(var c=-1,d=a.length;++c<d&&_(b,a[c],0)>-1;);return c}function ia(a){return a.split("")}function ja(a){return jd.test(a)}function ka(a){return a.match(Bd)||[]}function la(a){return ja(a)?ka(a):ia(a)}function ma(a){return null==a?"":da(a)}function na(a,b,c){if(a=ma(a),a&&(c||void 0===b))return a.replace(Cd,"");if(!a||!(b=da(b)))return a;var d=la(a),e=la(b),f=ha(d,e),g=ga(d,e)+1;return fa(d,f,g).join("")}function oa(a){return a=a.toString().replace(Gd,""),a=a.match(Dd)[2].replace(" ",""),a=a?a.split(Ed):[],a=a.map(function(a){return na(a.replace(Fd,""))})}function pa(a,b){var c={};X(a,function(a,b){function d(b,c){var d=aa(e,function(a){return b[a]});d.push(c),a.apply(null,d)}var e;if(Sb(a))e=ba(a),a=e.pop(),c[b]=e.concat(e.length>0?d:a);else if(1===a.length)c[b]=a;else{if(e=oa(a),0===a.length&&0===e.length)throw new Error("autoInject task functions require explicit parameters.");e.pop(),c[b]=e.concat(d)}}),Yc(c,b)}function qa(a){setTimeout(a,0)}function ra(a){return q(function(b,c){a(function(){b.apply(null,c)})})}function sa(){this.head=this.tail=null,this.length=0}function ta(a,b){a.length=1,a.head=a.tail=b}function ua(a,b,c){function d(a,b,c){if(null!=c&&"function"!=typeof c)throw new Error("task callback must be a function");if(h.started=!0,Sb(a)||(a=[a]),0===a.length&&h.idle())return Jd(function(){h.drain()});for(var d=0,e=a.length;d<e;d++){var f={data:a[d],callback:c||u};b?h._tasks.unshift(f):h._tasks.push(f)}Jd(h.process)}function e(a){return q(function(b){f-=1;for(var c=0,d=a.length;c<d;c++){var e=a[c],i=_(g,e,0);i>=0&&g.splice(i),e.callback.apply(e,b),null!=b[0]&&h.error(b[0],e.data)}f<=h.concurrency-h.buffer&&h.unsaturated(),h.idle()&&h.drain(),h.process()})}if(null==b)b=1;else if(0===b)throw new Error("Concurrency must not be zero");var f=0,g=[],h={_tasks:new sa,concurrency:b,payload:c,saturated:u,unsaturated:u,buffer:b/4,empty:u,drain:u,error:u,started:!1,paused:!1,push:function(a,b){d(a,!1,b)},kill:function(){h.drain=u,h._tasks.empty()},unshift:function(a,b){d(a,!0,b)},process:function(){for(;!h.paused&&f<h.concurrency&&h._tasks.length;){var b=[],c=[],d=h._tasks.length;h.payload&&(d=Math.min(d,h.payload));for(var i=0;i<d;i++){var j=h._tasks.shift();b.push(j),c.push(j.data)}0===h._tasks.length&&h.empty(),f+=1,g.push(b[0]),f===h.concurrency&&h.saturated();var k=M(e(b));a(c,k)}},length:function(){return h._tasks.length},running:function(){return f},workersList:function(){return g},idle:function(){return h._tasks.length+f===0},pause:function(){h.paused=!0},resume:function(){if(h.paused!==!1){h.paused=!1;for(var a=Math.min(h.concurrency,h._tasks.length),b=1;b<=a;b++)Jd(h.process)}}};return h}function va(a,b){return ua(a,1,b)}function wa(a,b,c,d){d=v(d||u),Ld(a,function(a,d,e){c(b,a,function(a,c){b=c,e(a)})},function(a){d(a,b)})}function xa(a,b,c,d){var e=[];a(b,function(a,b,d){c(a,function(a,b){e=e.concat(b||[]),d(a)})},function(a){d(a,e)})}function ya(a){return function(b,c,d){return a(Ld,b,c,d)}}function za(a,b,c){return function(d,e,f,g){function h(){g&&g(null,c(!1))}function i(a,d,e){return g?void f(a,function(d,h){g&&(d||b(h))?(d?g(d):g(d,c(!0,a)),g=f=!1,e(d,Oc)):e()}):e()}arguments.length>3?(g=g||u,a(d,e,i,h)):(g=f,g=g||u,f=e,a(d,i,h))}}function Aa(a,b){return b}function Ba(a){return q(function(b,c){b.apply(null,c.concat([q(function(b,c){"object"==typeof console&&(b?console.error&&console.error(b):console[a]&&V(c,function(b){console[a](b)}))})]))})}function Ca(a,b,c){function d(b,d){return b?c(b):d?void a(e):c(null)}c=M(c||u);var e=q(function(a,e){return a?c(a):(e.push(d),void b.apply(this,e))});d(null,!0)}function Da(a,b,c){c=M(c||u);var d=q(function(e,f){return e?c(e):b.apply(this,f)?a(d):void c.apply(null,[null].concat(f))});a(d)}function Ea(a,b,c){Da(a,function(){return!b.apply(this,arguments)},c)}function Fa(a,b,c){function d(b){return b?c(b):void a(e)}function e(a,e){return a?c(a):e?void b(d):c(null)}c=M(c||u),a(e)}function Ga(a){return function(b,c,d){return a(b,d)}}function Ha(a,b,c){Qc(a,Ga(b),c)}function Ia(a,b,c,d){N(b)(a,Ga(c),d)}function Ja(a){return Hb(function(b,c){var d=!0;b.push(function(){var a=arguments;d?Jd(function(){c.apply(null,a)}):c.apply(null,a)}),a.apply(this,b),d=!1})}function Ka(a){return!a}function La(a){return function(b){return null==b?void 0:b[a]}}function Ma(a,b,c,d){d=v(d||u);var e=[];a(b,function(a,b,d){c(a,function(c,f){c?d(c):(f&&e.push({index:b,value:a}),d())})},function(a){a?d(a):d(null,aa(e.sort(function(a,b){return a.index-b.index}),La("value")))})}function Na(a,b){function c(a){return a?d(a):void e(c)}var d=M(b||u),e=Ja(a);c()}function Oa(a,b,c,d){d=v(d||u);var e={};O(a,b,function(a,b,d){c(a,b,function(a,c){return a?d(a):(e[b]=c,void d())})},function(a){d(a,e)})}function Pa(a,b){return b in a}function Qa(a,b){var c=Object.create(null),d=Object.create(null);b=b||e;var f=Hb(function(e,f){var g=b.apply(null,e);Pa(c,g)?Jd(function(){f.apply(null,c[g])}):Pa(d,g)?d[g].push(f):(d[g]=[f],a.apply(null,e.concat([q(function(a){c[g]=a;var b=d[g];delete d[g];for(var e=0,f=b.length;e<f;e++)b[e].apply(null,a)})])))});return f.memo=c,f.unmemoized=a,f}function Ra(a,b,c){c=c||u;var d=t(b)?[]:{};a(b,function(a,b,c){a(q(function(a,e){e.length<=1&&(e=e[0]),d[b]=e,c(a)}))},function(a){c(a,d)})}function Sa(a,b){Ra(Qc,a,b)}function Ta(a,b,c){Ra(N(b),a,c)}function Ua(a,b){if(b=v(b||u),!Sb(a))return b(new TypeError("First argument to race must be an array of functions"));if(!a.length)return b();for(var c=0,d=a.length;c<d;c++)a[c](b)}function Va(a,b,c,d){var e=ge.call(a).reverse();wa(e,b,c,d)}function Wa(a){return Hb(function(b,c){return b.push(q(function(a,b){if(a)c(null,{error:a});else{var d=null;1===b.length?d=b[0]:b.length>1&&(d=b),c(null,{value:d})}})),a.apply(this,b)})}function Xa(a,b,c,d){Ma(a,b,function(a,b){c(a,function(a,c){a?b(a):b(null,!c)})},d)}function Ya(a){var b;return Sb(a)?b=aa(a,Wa):(b={},X(a,function(a,c){b[c]=Wa.call(this,a)})),b}function Za(a,b,c){function d(a,b){if("object"==typeof b)a.times=+b.times||f,a.intervalFunc="function"==typeof b.interval?b.interval:h(+b.interval||g),a.errorFilter=b.errorFilter;else{if("number"!=typeof b&&"string"!=typeof b)throw new Error("Invalid arguments for async.retry");a.times=+b||f}}function e(){b(function(a){a&&j++<i.times&&("function"!=typeof i.errorFilter||i.errorFilter(a))?setTimeout(e,i.intervalFunc(j)):c.apply(null,arguments)})}var f=5,g=0,i={times:f,intervalFunc:h(g)};if(arguments.length<3&&"function"==typeof a?(c=b||u,b=a):(d(i,a),c=c||u),"function"!=typeof b)throw new Error("Invalid arguments for async.retry");var j=1;e()}function $a(a,b){Ra(Ld,a,b)}function _a(a,b,c){function d(a,b){var c=a.criteria,d=b.criteria;return c<d?-1:c>d?1:0}Rc(a,function(a,c){b(a,function(b,d){return b?c(b):void c(null,{value:a,criteria:d})})},function(a,b){return a?c(a):void c(null,aa(b.sort(d),La("value")))})}function ab(a,b,c){function d(){h||(f.apply(null,arguments),clearTimeout(g))}function e(){var b=a.name||"anonymous",d=new Error('Callback function "'+b+'" timed out.');d.code="ETIMEDOUT",c&&(d.info=c),h=!0,f(d)}var f,g,h=!1;return Hb(function(c,h){f=h,g=setTimeout(e,b),a.apply(null,c.concat(d))})}function bb(a,b,c,d){for(var e=-1,f=pe(oe((b-a)/(c||1)),0),g=Array(f);f--;)g[d?f:++e]=a,a+=c;return g}function cb(a,b,c,d){Tc(bb(0,a,1),b,c,d)}function db(a,b,c,d){3===arguments.length&&(d=c,c=b,b=Sb(a)?[]:{}),d=v(d||u),Qc(a,function(a,d,e){c(b,a,d,e)},function(a){d(a,b)})}function eb(a){return function(){return(a.unmemoized||a).apply(null,arguments)}}function fb(a,b,c){if(c=M(c||u),!a())return c(null);var d=q(function(e,f){return e?c(e):a()?b(d):void c.apply(null,[null].concat(f))});b(d)}function gb(a,b,c){fb(function(){return!a.apply(this,arguments)},b,c)}var hb=Math.max,ib="[object Function]",jb="[object GeneratorFunction]",kb="[object Proxy]",lb=Object.prototype,mb=lb.toString,nb="object"==typeof d&&d&&d.Object===Object&&d,ob="object"==typeof self&&self&&self.Object===Object&&self,pb=nb||ob||Function("return this")(),qb=pb["__core-js_shared__"],rb=function(){var a=/[^.]+$/.exec(qb&&qb.keys&&qb.keys.IE_PROTO||"");return a?"Symbol(src)_1."+a:""}(),sb=Function.prototype,tb=sb.toString,ub=/[\\^$.*+?()[\]{}|]/g,vb=/^\[object .+?Constructor\]$/,wb=Function.prototype,xb=Object.prototype,yb=wb.toString,zb=xb.hasOwnProperty,Ab=RegExp("^"+yb.call(zb).replace(ub,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),Bb=function(){try{var a=o(Object,"defineProperty");return a({},"",{}),a}catch(a){}}(),Cb=Bb?function(a,b){return Bb(a,"toString",{configurable:!0,enumerable:!1,value:h(b),writable:!0})}:e,Db=500,Eb=16,Fb=Date.now,Gb=p(Cb),Hb=function(a){return q(function(b){var c=b.pop();a.call(this,b,c)})},Ib=9007199254740991,Jb="function"==typeof Symbol&&Symbol.iterator,Kb=function(a){return Jb&&a[Jb]&&a[Jb]()},Lb="[object Arguments]",Mb=Object.prototype,Nb=Mb.toString,Ob=Object.prototype,Pb=Ob.hasOwnProperty,Qb=Ob.propertyIsEnumerable,Rb=y(function(){return arguments}())?y:function(a){return x(a)&&Pb.call(a,"callee")&&!Qb.call(a,"callee")},Sb=Array.isArray,Tb="object"==typeof c&&c&&!c.nodeType&&c,Ub=Tb&&"object"==typeof b&&b&&!b.nodeType&&b,Vb=Ub&&Ub.exports===Tb,Wb=Vb?pb.Buffer:void 0,Xb=Wb?Wb.isBuffer:void 0,Yb=Xb||z,Zb=9007199254740991,$b=/^(?:0|[1-9]\d*)$/,_b="[object Arguments]",ac="[object Array]",bc="[object Boolean]",cc="[object Date]",dc="[object Error]",ec="[object Function]",fc="[object Map]",gc="[object Number]",hc="[object Object]",ic="[object RegExp]",jc="[object Set]",kc="[object String]",lc="[object WeakMap]",mc="[object ArrayBuffer]",nc="[object DataView]",oc="[object Float32Array]",pc="[object Float64Array]",qc="[object Int8Array]",rc="[object Int16Array]",sc="[object Int32Array]",tc="[object Uint8Array]",uc="[object Uint8ClampedArray]",vc="[object Uint16Array]",wc="[object Uint32Array]",xc={};xc[oc]=xc[pc]=xc[qc]=xc[rc]=xc[sc]=xc[tc]=xc[uc]=xc[vc]=xc[wc]=!0,xc[_b]=xc[ac]=xc[mc]=xc[bc]=xc[nc]=xc[cc]=xc[dc]=xc[ec]=xc[fc]=xc[gc]=xc[hc]=xc[ic]=xc[jc]=xc[kc]=xc[lc]=!1;var yc,zc=Object.prototype,Ac=zc.toString,Bc="object"==typeof c&&c&&!c.nodeType&&c,Cc=Bc&&"object"==typeof b&&b&&!b.nodeType&&b,Dc=Cc&&Cc.exports===Bc,Ec=Dc&&nb.process,Fc=function(){try{return Ec&&Ec.binding("util")}catch(a){}}(),Gc=Fc&&Fc.isTypedArray,Hc=Gc?C(Gc):B,Ic=Object.prototype,Jc=Ic.hasOwnProperty,Kc=Object.prototype,Lc=F(Object.keys,Object),Mc=Object.prototype,Nc=Mc.hasOwnProperty,Oc={},Pc=P(O,1/0),Qc=function(a,b,c){var d=t(a)?Q:Pc;d(a,b,c)},Rc=R(S),Sc=r(Rc),Tc=T(S),Uc=P(Tc,1),Vc=r(Uc),Wc=q(function(a,b){return q(function(c){return a.apply(null,b.concat(c))})}),Xc=W(),Yc=function(a,b,c){function d(a,b){r.push(function(){h(a,b)})}function e(){if(0===r.length&&0===n)return c(null,m);for(;r.length&&n<b;){var a=r.shift();a()}}function f(a,b){var c=p[a];c||(c=p[a]=[]),c.push(b)}function g(a){var b=p[a]||[];V(b,function(a){a()}),e()}function h(a,b){if(!o){var d=M(q(function(b,d){if(n--,d.length<=1&&(d=d[0]),b){var e={};X(m,function(a,b){e[b]=a}),e[a]=d,o=!0,p=[],c(b,e)}else m[a]=d,g(a)}));n++;var e=b[b.length-1];b.length>1?e(m,d):e(d)}}function i(){for(var a,b=0;s.length;)a=s.pop(),b++,V(j(a),function(a){0===--t[a]&&s.push(a)});if(b!==l)throw new Error("async.auto cannot execute tasks due to a recursive dependency")}function j(b){var c=[];return X(a,function(a,d){Sb(a)&&_(a,b,0)>=0&&c.push(d)}),c}"function"==typeof b&&(c=b,b=null),c=v(c||u);var k=H(a),l=k.length;if(!l)return c(null);b||(b=l);var m={},n=0,o=!1,p={},r=[],s=[],t={};X(a,function(b,c){if(!Sb(b))return d(c,[b]),void s.push(c);var e=b.slice(0,b.length-1),g=e.length;return 0===g?(d(c,b),void s.push(c)):(t[c]=g,void V(e,function(h){if(!a[h])throw new Error("async.auto task `"+c+"` has a non-existent dependency in "+e.join(", "));f(h,function(){g--,0===g&&d(c,b)})}))}),i(),e()},Zc=pb.Symbol,$c="[object Symbol]",_c=Object.prototype,ad=_c.toString,bd=1/0,cd=Zc?Zc.prototype:void 0,dd=cd?cd.toString:void 0,ed="\\ud800-\\udfff",fd="\\u0300-\\u036f\\ufe20-\\ufe23",gd="\\u20d0-\\u20f0",hd="\\ufe0e\\ufe0f",id="\\u200d",jd=RegExp("["+id+ed+fd+gd+hd+"]"),kd="\\ud800-\\udfff",ld="\\u0300-\\u036f\\ufe20-\\ufe23",md="\\u20d0-\\u20f0",nd="\\ufe0e\\ufe0f",od="["+kd+"]",pd="["+ld+md+"]",qd="\\ud83c[\\udffb-\\udfff]",rd="(?:"+pd+"|"+qd+")",sd="[^"+kd+"]",td="(?:\\ud83c[\\udde6-\\uddff]){2}",ud="[\\ud800-\\udbff][\\udc00-\\udfff]",vd="\\u200d",wd=rd+"?",xd="["+nd+"]?",yd="(?:"+vd+"(?:"+[sd,td,ud].join("|")+")"+xd+wd+")*",zd=xd+wd+yd,Ad="(?:"+[sd+pd+"?",pd,td,ud,od].join("|")+")",Bd=RegExp(qd+"(?="+qd+")|"+Ad+zd,"g"),Cd=/^\s+|\s+$/g,Dd=/^(function)?\s*[^\(]*\(\s*([^\)]*)\)/m,Ed=/,/,Fd=/(=.+)?(\s*)$/,Gd=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm,Hd="function"==typeof setImmediate&&setImmediate,Id="object"==typeof a&&"function"==typeof a.nextTick;yc=Hd?setImmediate:Id?a.nextTick:qa;var Jd=ra(yc);sa.prototype.removeLink=function(a){return a.prev?a.prev.next=a.next:this.head=a.next,a.next?a.next.prev=a.prev:this.tail=a.prev,a.prev=a.next=null,this.length-=1,a},sa.prototype.empty=sa,sa.prototype.insertAfter=function(a,b){b.prev=a,b.next=a.next,a.next?a.next.prev=b:this.tail=b,a.next=b,this.length+=1},sa.prototype.insertBefore=function(a,b){b.prev=a.prev,b.next=a,a.prev?a.prev.next=b:this.head=b,a.prev=b,this.length+=1},sa.prototype.unshift=function(a){this.head?this.insertBefore(this.head,a):ta(this,a)},sa.prototype.push=function(a){this.tail?this.insertAfter(this.tail,a):ta(this,a)},sa.prototype.shift=function(){return this.head&&this.removeLink(this.head)},sa.prototype.pop=function(){return this.tail&&this.removeLink(this.tail)};var Kd,Ld=P(O,1),Md=q(function(a){return q(function(b){var c=this,d=b[b.length-1];"function"==typeof d?b.pop():d=u,wa(a,b,function(a,b,d){b.apply(c,a.concat([q(function(a,b){d(a,b)})]))},function(a,b){d.apply(c,[a].concat(b))})})}),Nd=q(function(a){return Md.apply(null,a.reverse())}),Od=R(xa),Pd=ya(xa),Qd=q(function(a){var b=[null].concat(a);return Hb(function(a,c){return c.apply(this,b)})}),Rd=za(Qc,e,Aa),Sd=za(O,e,Aa),Td=za(Ld,e,Aa),Ud=Ba("dir"),Vd=P(Ia,1),Wd=za(Qc,Ka,Ka),Xd=za(O,Ka,Ka),Yd=P(Xd,1),Zd=R(Ma),$d=T(Ma),_d=P($d,1),ae=Ba("log"),be=P(Oa,1/0),ce=P(Oa,1);Kd=Id?a.nextTick:Hd?setImmediate:qa;var de=ra(Kd),ee=function(a,b){return ua(function(b,c){a(b[0],c)},b,1)},fe=function(a,b){var c=ee(a,b);return c.push=function(a,b,d){if(null==d&&(d=u),"function"!=typeof d)throw new Error("task callback must be a function");if(c.started=!0,Sb(a)||(a=[a]),0===a.length)return Jd(function(){c.drain()});b=b||0;for(var e=c._tasks.head;e&&b>=e.priority;)e=e.next;for(var f=0,g=a.length;f<g;f++){var h={data:a[f],priority:b,callback:d};e?c._tasks.insertBefore(e,h):c._tasks.push(h)}Jd(c.process)},delete c.unshift,c},ge=Array.prototype.slice,he=R(Xa),ie=T(Xa),je=P(ie,1),ke=function(a,b){return b||(b=a,a=null),Hb(function(c,d){function e(a){b.apply(null,c.concat([a]))}a?Za(a,e,d):Za(e,d)})},le=za(Qc,Boolean,e),me=za(O,Boolean,e),ne=P(me,1),oe=Math.ceil,pe=Math.max,qe=P(cb,1/0),re=P(cb,1),se=function(a,b){function c(e){if(d===a.length)return b.apply(null,[null].concat(e));var f=M(q(function(a,d){return a?b.apply(null,[a].concat(d)):void c(d)}));e.push(f);var g=a[d++];g.apply(null,e)}if(b=v(b||u),!Sb(a))return b(new Error("First argument to waterfall must be an array of functions"));if(!a.length)return b();var d=0;c([])},te={applyEach:Sc,applyEachSeries:Vc,apply:Wc,asyncify:U,auto:Yc,autoInject:pa,cargo:va,compose:Nd,concat:Od,concatSeries:Pd,constant:Qd,detect:Rd,detectLimit:Sd,detectSeries:Td,dir:Ud,doDuring:Ca,doUntil:Ea,doWhilst:Da,during:Fa,each:Ha,eachLimit:Ia,eachOf:Qc,eachOfLimit:O,eachOfSeries:Ld,eachSeries:Vd,ensureAsync:Ja,every:Wd,everyLimit:Xd,everySeries:Yd,filter:Zd,filterLimit:$d,filterSeries:_d,forever:Na,log:ae,map:Rc,mapLimit:Tc,mapSeries:Uc,mapValues:be,mapValuesLimit:Oa,mapValuesSeries:ce,memoize:Qa,nextTick:de,parallel:Sa,parallelLimit:Ta,priorityQueue:fe,queue:ee,race:Ua,reduce:wa,reduceRight:Va,reflect:Wa,reflectAll:Ya,reject:he,rejectLimit:ie,rejectSeries:je,retry:Za,retryable:ke,seq:Md,series:$a,setImmediate:Jd,some:le,someLimit:me,someSeries:ne,sortBy:_a,timeout:ab,times:qe,timesLimit:cb,timesSeries:re,transform:db,unmemoize:eb,until:gb,waterfall:se,whilst:fb,all:Wd,any:le,forEach:Ha,forEachSeries:Vd,forEachLimit:Ia,forEachOf:Qc,forEachOfSeries:Ld,forEachOfLimit:O,inject:wa,foldl:wa,foldr:Va,select:Zd,selectLimit:$d,selectSeries:_d,wrapSync:U};c.default=te,c.applyEach=Sc,c.applyEachSeries=Vc,c.apply=Wc,c.asyncify=U,c.auto=Yc,c.autoInject=pa,c.cargo=va,c.compose=Nd,c.concat=Od,c.concatSeries=Pd,c.constant=Qd,c.detect=Rd,c.detectLimit=Sd,c.detectSeries=Td,c.dir=Ud,c.doDuring=Ca,c.doUntil=Ea,c.doWhilst=Da,c.during=Fa,c.each=Ha,c.eachLimit=Ia,c.eachOf=Qc,c.eachOfLimit=O,c.eachOfSeries=Ld,c.eachSeries=Vd,c.ensureAsync=Ja,c.every=Wd,c.everyLimit=Xd,c.everySeries=Yd,c.filter=Zd,c.filterLimit=$d,c.filterSeries=_d,c.forever=Na,c.log=ae,c.map=Rc,c.mapLimit=Tc,c.mapSeries=Uc,c.mapValues=be,c.mapValuesLimit=Oa,c.mapValuesSeries=ce,c.memoize=Qa,c.nextTick=de,c.parallel=Sa,c.parallelLimit=Ta,c.priorityQueue=fe,c.queue=ee,c.race=Ua,c.reduce=wa,c.reduceRight=Va,c.reflect=Wa,c.reflectAll=Ya,c.reject=he,c.rejectLimit=ie,c.rejectSeries=je,c.retry=Za,c.retryable=ke,c.seq=Md,c.series=$a,c.setImmediate=Jd,c.some=le,c.someLimit=me,c.someSeries=ne,c.sortBy=_a,c.timeout=ab,c.times=qe,c.timesLimit=cb,c.timesSeries=re,c.transform=db,c.unmemoize=eb,c.until=gb,c.waterfall=se,c.whilst=fb,c.all=Wd,c.allLimit=Xd,c.allSeries=Yd,c.any=le,c.anyLimit=me,c.anySeries=ne,c.find=Rd,c.findLimit=Sd,c.findSeries=Td,c.forEach=Ha,c.forEachSeries=Vd,c.forEachLimit=Ia,c.forEachOf=Qc,c.forEachOfSeries=Ld,c.forEachOfLimit=O,c.inject=wa,c.foldl=wa,c.foldr=Va,c.select=Zd,c.selectLimit=$d,c.selectSeries=_d,c.wrapSync=U,Object.defineProperty(c,"__esModule",{value:!0})})}).call(this,a("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{_process:78}],44:[function(a,b,c){!function(d,e,f){"object"==typeof c?b.exports=c=e(a("./core"),a("./enc-base64"),a("./md5"),a("./evpkdf"),a("./cipher-core")):"function"==typeof define&&define.amd?define(["./core","./enc-base64","./md5","./evpkdf","./cipher-core"],e):e(d.CryptoJS)}(this,function(a){return function(){var b=a,c=b.lib,d=c.BlockCipher,e=b.algo,f=[],g=[],h=[],i=[],j=[],k=[],l=[],m=[],n=[],o=[];!function(){for(var a=[],b=0;b<256;b++)b<128?a[b]=b<<1:a[b]=b<<1^283;for(var c=0,d=0,b=0;b<256;b++){var e=d^d<<1^d<<2^d<<3^d<<4;e=e>>>8^255&e^99,f[c]=e,g[e]=c;var p=a[c],q=a[p],r=a[q],s=257*a[e]^16843008*e;h[c]=s<<24|s>>>8,i[c]=s<<16|s>>>16,j[c]=s<<8|s>>>24,k[c]=s;var s=16843009*r^65537*q^257*p^16843008*c;l[e]=s<<24|s>>>8,m[e]=s<<16|s>>>16,n[e]=s<<8|s>>>24,o[e]=s,c?(c=p^a[a[a[r^p]]],d^=a[a[d]]):c=d=1}}();var p=[0,1,2,4,8,16,32,64,128,27,54],q=e.AES=d.extend({_doReset:function(){if(!this._nRounds||this._keyPriorReset!==this._key){for(var a=this._keyPriorReset=this._key,b=a.words,c=a.sigBytes/4,d=this._nRounds=c+6,e=4*(d+1),g=this._keySchedule=[],h=0;h<e;h++)if(h<c)g[h]=b[h];else{var i=g[h-1];h%c?c>6&&h%c==4&&(i=f[i>>>24]<<24|f[i>>>16&255]<<16|f[i>>>8&255]<<8|f[255&i]):(i=i<<8|i>>>24,i=f[i>>>24]<<24|f[i>>>16&255]<<16|f[i>>>8&255]<<8|f[255&i],i^=p[h/c|0]<<24),g[h]=g[h-c]^i}for(var j=this._invKeySchedule=[],k=0;k<e;k++){var h=e-k;if(k%4)var i=g[h];else var i=g[h-4];k<4||h<=4?j[k]=i:j[k]=l[f[i>>>24]]^m[f[i>>>16&255]]^n[f[i>>>8&255]]^o[f[255&i]]}}},encryptBlock:function(a,b){this._doCryptBlock(a,b,this._keySchedule,h,i,j,k,f)},decryptBlock:function(a,b){var c=a[b+1];a[b+1]=a[b+3],a[b+3]=c,this._doCryptBlock(a,b,this._invKeySchedule,l,m,n,o,g);var c=a[b+1];a[b+1]=a[b+3],a[b+3]=c},_doCryptBlock:function(a,b,c,d,e,f,g,h){
for(var i=this._nRounds,j=a[b]^c[0],k=a[b+1]^c[1],l=a[b+2]^c[2],m=a[b+3]^c[3],n=4,o=1;o<i;o++){var p=d[j>>>24]^e[k>>>16&255]^f[l>>>8&255]^g[255&m]^c[n++],q=d[k>>>24]^e[l>>>16&255]^f[m>>>8&255]^g[255&j]^c[n++],r=d[l>>>24]^e[m>>>16&255]^f[j>>>8&255]^g[255&k]^c[n++],s=d[m>>>24]^e[j>>>16&255]^f[k>>>8&255]^g[255&l]^c[n++];j=p,k=q,l=r,m=s}var p=(h[j>>>24]<<24|h[k>>>16&255]<<16|h[l>>>8&255]<<8|h[255&m])^c[n++],q=(h[k>>>24]<<24|h[l>>>16&255]<<16|h[m>>>8&255]<<8|h[255&j])^c[n++],r=(h[l>>>24]<<24|h[m>>>16&255]<<16|h[j>>>8&255]<<8|h[255&k])^c[n++],s=(h[m>>>24]<<24|h[j>>>16&255]<<16|h[k>>>8&255]<<8|h[255&l])^c[n++];a[b]=p,a[b+1]=q,a[b+2]=r,a[b+3]=s},keySize:8});b.AES=d._createHelper(q)}(),a.AES})},{"./cipher-core":45,"./core":46,"./enc-base64":47,"./evpkdf":49,"./md5":54}],45:[function(a,b,c){!function(d,e){"object"==typeof c?b.exports=c=e(a("./core")):"function"==typeof define&&define.amd?define(["./core"],e):e(d.CryptoJS)}(this,function(a){a.lib.Cipher||function(b){var c=a,d=c.lib,e=d.Base,f=d.WordArray,g=d.BufferedBlockAlgorithm,h=c.enc,i=(h.Utf8,h.Base64),j=c.algo,k=j.EvpKDF,l=d.Cipher=g.extend({cfg:e.extend(),createEncryptor:function(a,b){return this.create(this._ENC_XFORM_MODE,a,b)},createDecryptor:function(a,b){return this.create(this._DEC_XFORM_MODE,a,b)},init:function(a,b,c){this.cfg=this.cfg.extend(c),this._xformMode=a,this._key=b,this.reset()},reset:function(){g.reset.call(this),this._doReset()},process:function(a){return this._append(a),this._process()},finalize:function(a){a&&this._append(a);var b=this._doFinalize();return b},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(){function a(a){return"string"==typeof a?x:u}return function(b){return{encrypt:function(c,d,e){return a(d).encrypt(b,c,d,e)},decrypt:function(c,d,e){return a(d).decrypt(b,c,d,e)}}}}()}),m=(d.StreamCipher=l.extend({_doFinalize:function(){var a=this._process(!0);return a},blockSize:1}),c.mode={}),n=d.BlockCipherMode=e.extend({createEncryptor:function(a,b){return this.Encryptor.create(a,b)},createDecryptor:function(a,b){return this.Decryptor.create(a,b)},init:function(a,b){this._cipher=a,this._iv=b}}),o=m.CBC=function(){function a(a,c,d){var e=this._iv;if(e){var f=e;this._iv=b}else var f=this._prevBlock;for(var g=0;g<d;g++)a[c+g]^=f[g]}var c=n.extend();return c.Encryptor=c.extend({processBlock:function(b,c){var d=this._cipher,e=d.blockSize;a.call(this,b,c,e),d.encryptBlock(b,c),this._prevBlock=b.slice(c,c+e)}}),c.Decryptor=c.extend({processBlock:function(b,c){var d=this._cipher,e=d.blockSize,f=b.slice(c,c+e);d.decryptBlock(b,c),a.call(this,b,c,e),this._prevBlock=f}}),c}(),p=c.pad={},q=p.Pkcs7={pad:function(a,b){for(var c=4*b,d=c-a.sigBytes%c,e=d<<24|d<<16|d<<8|d,g=[],h=0;h<d;h+=4)g.push(e);var i=f.create(g,d);a.concat(i)},unpad:function(a){var b=255&a.words[a.sigBytes-1>>>2];a.sigBytes-=b}},r=(d.BlockCipher=l.extend({cfg:l.cfg.extend({mode:o,padding:q}),reset:function(){l.reset.call(this);var a=this.cfg,b=a.iv,c=a.mode;if(this._xformMode==this._ENC_XFORM_MODE)var d=c.createEncryptor;else{var d=c.createDecryptor;this._minBufferSize=1}this._mode=d.call(c,this,b&&b.words)},_doProcessBlock:function(a,b){this._mode.processBlock(a,b)},_doFinalize:function(){var a=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){a.pad(this._data,this.blockSize);var b=this._process(!0)}else{var b=this._process(!0);a.unpad(b)}return b},blockSize:4}),d.CipherParams=e.extend({init:function(a){this.mixIn(a)},toString:function(a){return(a||this.formatter).stringify(this)}})),s=c.format={},t=s.OpenSSL={stringify:function(a){var b=a.ciphertext,c=a.salt;if(c)var d=f.create([1398893684,1701076831]).concat(c).concat(b);else var d=b;return d.toString(i)},parse:function(a){var b=i.parse(a),c=b.words;if(1398893684==c[0]&&1701076831==c[1]){var d=f.create(c.slice(2,4));c.splice(0,4),b.sigBytes-=16}return r.create({ciphertext:b,salt:d})}},u=d.SerializableCipher=e.extend({cfg:e.extend({format:t}),encrypt:function(a,b,c,d){d=this.cfg.extend(d);var e=a.createEncryptor(c,d),f=e.finalize(b),g=e.cfg;return r.create({ciphertext:f,key:c,iv:g.iv,algorithm:a,mode:g.mode,padding:g.padding,blockSize:a.blockSize,formatter:d.format})},decrypt:function(a,b,c,d){d=this.cfg.extend(d),b=this._parse(b,d.format);var e=a.createDecryptor(c,d).finalize(b.ciphertext);return e},_parse:function(a,b){return"string"==typeof a?b.parse(a,this):a}}),v=c.kdf={},w=v.OpenSSL={execute:function(a,b,c,d){d||(d=f.random(8));var e=k.create({keySize:b+c}).compute(a,d),g=f.create(e.words.slice(b),4*c);return e.sigBytes=4*b,r.create({key:e,iv:g,salt:d})}},x=d.PasswordBasedCipher=u.extend({cfg:u.cfg.extend({kdf:w}),encrypt:function(a,b,c,d){d=this.cfg.extend(d);var e=d.kdf.execute(c,a.keySize,a.ivSize);d.iv=e.iv;var f=u.encrypt.call(this,a,b,e.key,d);return f.mixIn(e),f},decrypt:function(a,b,c,d){d=this.cfg.extend(d),b=this._parse(b,d.format);var e=d.kdf.execute(c,a.keySize,a.ivSize,b.salt);d.iv=e.iv;var f=u.decrypt.call(this,a,b,e.key,d);return f}})}()})},{"./core":46}],46:[function(a,b,c){!function(a,d){"object"==typeof c?b.exports=c=d():"function"==typeof define&&define.amd?define([],d):a.CryptoJS=d()}(this,function(){var a=a||function(a,b){var c=Object.create||function(){function a(){}return function(b){var c;return a.prototype=b,c=new a,a.prototype=null,c}}(),d={},e=d.lib={},f=e.Base=function(){return{extend:function(a){var b=c(this);return a&&b.mixIn(a),b.hasOwnProperty("init")&&this.init!==b.init||(b.init=function(){b.$super.init.apply(this,arguments)}),b.init.prototype=b,b.$super=this,b},create:function(){var a=this.extend();return a.init.apply(a,arguments),a},init:function(){},mixIn:function(a){for(var b in a)a.hasOwnProperty(b)&&(this[b]=a[b]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}}}(),g=e.WordArray=f.extend({init:function(a,c){a=this.words=a||[],c!=b?this.sigBytes=c:this.sigBytes=4*a.length},toString:function(a){return(a||i).stringify(this)},concat:function(a){var b=this.words,c=a.words,d=this.sigBytes,e=a.sigBytes;if(this.clamp(),d%4)for(var f=0;f<e;f++){var g=c[f>>>2]>>>24-f%4*8&255;b[d+f>>>2]|=g<<24-(d+f)%4*8}else for(var f=0;f<e;f+=4)b[d+f>>>2]=c[f>>>2];return this.sigBytes+=e,this},clamp:function(){var b=this.words,c=this.sigBytes;b[c>>>2]&=4294967295<<32-c%4*8,b.length=a.ceil(c/4)},clone:function(){var a=f.clone.call(this);return a.words=this.words.slice(0),a},random:function(b){for(var c,d=[],e=function(b){var b=b,c=987654321,d=4294967295;return function(){c=36969*(65535&c)+(c>>16)&d,b=18e3*(65535&b)+(b>>16)&d;var e=(c<<16)+b&d;return e/=4294967296,e+=.5,e*(a.random()>.5?1:-1)}},f=0;f<b;f+=4){var h=e(4294967296*(c||a.random()));c=987654071*h(),d.push(4294967296*h()|0)}return new g.init(d,b)}}),h=d.enc={},i=h.Hex={stringify:function(a){for(var b=a.words,c=a.sigBytes,d=[],e=0;e<c;e++){var f=b[e>>>2]>>>24-e%4*8&255;d.push((f>>>4).toString(16)),d.push((15&f).toString(16))}return d.join("")},parse:function(a){for(var b=a.length,c=[],d=0;d<b;d+=2)c[d>>>3]|=parseInt(a.substr(d,2),16)<<24-d%8*4;return new g.init(c,b/2)}},j=h.Latin1={stringify:function(a){for(var b=a.words,c=a.sigBytes,d=[],e=0;e<c;e++){var f=b[e>>>2]>>>24-e%4*8&255;d.push(String.fromCharCode(f))}return d.join("")},parse:function(a){for(var b=a.length,c=[],d=0;d<b;d++)c[d>>>2]|=(255&a.charCodeAt(d))<<24-d%4*8;return new g.init(c,b)}},k=h.Utf8={stringify:function(a){try{return decodeURIComponent(escape(j.stringify(a)))}catch(a){throw new Error("Malformed UTF-8 data")}},parse:function(a){return j.parse(unescape(encodeURIComponent(a)))}},l=e.BufferedBlockAlgorithm=f.extend({reset:function(){this._data=new g.init,this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=k.parse(a)),this._data.concat(a),this._nDataBytes+=a.sigBytes},_process:function(b){var c=this._data,d=c.words,e=c.sigBytes,f=this.blockSize,h=4*f,i=e/h;i=b?a.ceil(i):a.max((0|i)-this._minBufferSize,0);var j=i*f,k=a.min(4*j,e);if(j){for(var l=0;l<j;l+=f)this._doProcessBlock(d,l);var m=d.splice(0,j);c.sigBytes-=k}return new g.init(m,k)},clone:function(){var a=f.clone.call(this);return a._data=this._data.clone(),a},_minBufferSize:0}),m=(e.Hasher=l.extend({cfg:f.extend(),init:function(a){this.cfg=this.cfg.extend(a),this.reset()},reset:function(){l.reset.call(this),this._doReset()},update:function(a){return this._append(a),this._process(),this},finalize:function(a){a&&this._append(a);var b=this._doFinalize();return b},blockSize:16,_createHelper:function(a){return function(b,c){return new a.init(c).finalize(b)}},_createHmacHelper:function(a){return function(b,c){return new m.HMAC.init(a,c).finalize(b)}}}),d.algo={});return d}(Math);return a})},{}],47:[function(a,b,c){!function(d,e){"object"==typeof c?b.exports=c=e(a("./core")):"function"==typeof define&&define.amd?define(["./core"],e):e(d.CryptoJS)}(this,function(a){return function(){function b(a,b,c){for(var d=[],f=0,g=0;g<b;g++)if(g%4){var h=c[a.charCodeAt(g-1)]<<g%4*2,i=c[a.charCodeAt(g)]>>>6-g%4*2;d[f>>>2]|=(h|i)<<24-f%4*8,f++}return e.create(d,f)}var c=a,d=c.lib,e=d.WordArray,f=c.enc;f.Base64={stringify:function(a){var b=a.words,c=a.sigBytes,d=this._map;a.clamp();for(var e=[],f=0;f<c;f+=3)for(var g=b[f>>>2]>>>24-f%4*8&255,h=b[f+1>>>2]>>>24-(f+1)%4*8&255,i=b[f+2>>>2]>>>24-(f+2)%4*8&255,j=g<<16|h<<8|i,k=0;k<4&&f+.75*k<c;k++)e.push(d.charAt(j>>>6*(3-k)&63));var l=d.charAt(64);if(l)for(;e.length%4;)e.push(l);return e.join("")},parse:function(a){var c=a.length,d=this._map,e=this._reverseMap;if(!e){e=this._reverseMap=[];for(var f=0;f<d.length;f++)e[d.charCodeAt(f)]=f}var g=d.charAt(64);if(g){var h=a.indexOf(g);h!==-1&&(c=h)}return b(a,c,e)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}}(),a.enc.Base64})},{"./core":46}],48:[function(a,b,c){!function(d,e){"object"==typeof c?b.exports=c=e(a("./core")):"function"==typeof define&&define.amd?define(["./core"],e):e(d.CryptoJS)}(this,function(a){return function(){function b(a){return a<<8&4278255360|a>>>8&16711935}var c=a,d=c.lib,e=d.WordArray,f=c.enc;f.Utf16=f.Utf16BE={stringify:function(a){for(var b=a.words,c=a.sigBytes,d=[],e=0;e<c;e+=2){var f=b[e>>>2]>>>16-e%4*8&65535;d.push(String.fromCharCode(f))}return d.join("")},parse:function(a){for(var b=a.length,c=[],d=0;d<b;d++)c[d>>>1]|=a.charCodeAt(d)<<16-d%2*16;return e.create(c,2*b)}};f.Utf16LE={stringify:function(a){for(var c=a.words,d=a.sigBytes,e=[],f=0;f<d;f+=2){var g=b(c[f>>>2]>>>16-f%4*8&65535);e.push(String.fromCharCode(g))}return e.join("")},parse:function(a){for(var c=a.length,d=[],f=0;f<c;f++)d[f>>>1]|=b(a.charCodeAt(f)<<16-f%2*16);return e.create(d,2*c)}}}(),a.enc.Utf16})},{"./core":46}],49:[function(a,b,c){!function(d,e,f){"object"==typeof c?b.exports=c=e(a("./core"),a("./sha1"),a("./hmac")):"function"==typeof define&&define.amd?define(["./core","./sha1","./hmac"],e):e(d.CryptoJS)}(this,function(a){return function(){var b=a,c=b.lib,d=c.Base,e=c.WordArray,f=b.algo,g=f.MD5,h=f.EvpKDF=d.extend({cfg:d.extend({keySize:4,hasher:g,iterations:1}),init:function(a){this.cfg=this.cfg.extend(a)},compute:function(a,b){for(var c=this.cfg,d=c.hasher.create(),f=e.create(),g=f.words,h=c.keySize,i=c.iterations;g.length<h;){j&&d.update(j);var j=d.update(a).finalize(b);d.reset();for(var k=1;k<i;k++)j=d.finalize(j),d.reset();f.concat(j)}return f.sigBytes=4*h,f}});b.EvpKDF=function(a,b,c){return h.create(c).compute(a,b)}}(),a.EvpKDF})},{"./core":46,"./hmac":51,"./sha1":70}],50:[function(a,b,c){!function(d,e,f){"object"==typeof c?b.exports=c=e(a("./core"),a("./cipher-core")):"function"==typeof define&&define.amd?define(["./core","./cipher-core"],e):e(d.CryptoJS)}(this,function(a){return function(b){var c=a,d=c.lib,e=d.CipherParams,f=c.enc,g=f.Hex,h=c.format;h.Hex={stringify:function(a){return a.ciphertext.toString(g)},parse:function(a){var b=g.parse(a);return e.create({ciphertext:b})}}}(),a.format.Hex})},{"./cipher-core":45,"./core":46}],51:[function(a,b,c){!function(d,e){"object"==typeof c?b.exports=c=e(a("./core")):"function"==typeof define&&define.amd?define(["./core"],e):e(d.CryptoJS)}(this,function(a){!function(){var b=a,c=b.lib,d=c.Base,e=b.enc,f=e.Utf8,g=b.algo;g.HMAC=d.extend({init:function(a,b){a=this._hasher=new a.init,"string"==typeof b&&(b=f.parse(b));var c=a.blockSize,d=4*c;b.sigBytes>d&&(b=a.finalize(b)),b.clamp();for(var e=this._oKey=b.clone(),g=this._iKey=b.clone(),h=e.words,i=g.words,j=0;j<c;j++)h[j]^=1549556828,i[j]^=909522486;e.sigBytes=g.sigBytes=d,this.reset()},reset:function(){var a=this._hasher;a.reset(),a.update(this._iKey)},update:function(a){return this._hasher.update(a),this},finalize:function(a){var b=this._hasher,c=b.finalize(a);b.reset();var d=b.finalize(this._oKey.clone().concat(c));return d}})}()})},{"./core":46}],52:[function(a,b,c){!function(d,e,f){"object"==typeof c?b.exports=c=e(a("./core"),a("./x64-core"),a("./lib-typedarrays"),a("./enc-utf16"),a("./enc-base64"),a("./md5"),a("./sha1"),a("./sha256"),a("./sha224"),a("./sha512"),a("./sha384"),a("./sha3"),a("./ripemd160"),a("./hmac"),a("./pbkdf2"),a("./evpkdf"),a("./cipher-core"),a("./mode-cfb"),a("./mode-ctr"),a("./mode-ctr-gladman"),a("./mode-ofb"),a("./mode-ecb"),a("./pad-ansix923"),a("./pad-iso10126"),a("./pad-iso97971"),a("./pad-zeropadding"),a("./pad-nopadding"),a("./format-hex"),a("./aes"),a("./tripledes"),a("./rc4"),a("./rabbit"),a("./rabbit-legacy")):"function"==typeof define&&define.amd?define(["./core","./x64-core","./lib-typedarrays","./enc-utf16","./enc-base64","./md5","./sha1","./sha256","./sha224","./sha512","./sha384","./sha3","./ripemd160","./hmac","./pbkdf2","./evpkdf","./cipher-core","./mode-cfb","./mode-ctr","./mode-ctr-gladman","./mode-ofb","./mode-ecb","./pad-ansix923","./pad-iso10126","./pad-iso97971","./pad-zeropadding","./pad-nopadding","./format-hex","./aes","./tripledes","./rc4","./rabbit","./rabbit-legacy"],e):d.CryptoJS=e(d.CryptoJS)}(this,function(a){return a})},{"./aes":44,"./cipher-core":45,"./core":46,"./enc-base64":47,"./enc-utf16":48,"./evpkdf":49,"./format-hex":50,"./hmac":51,"./lib-typedarrays":53,"./md5":54,"./mode-cfb":55,"./mode-ctr":57,"./mode-ctr-gladman":56,"./mode-ecb":58,"./mode-ofb":59,"./pad-ansix923":60,"./pad-iso10126":61,"./pad-iso97971":62,"./pad-nopadding":63,"./pad-zeropadding":64,"./pbkdf2":65,"./rabbit":67,"./rabbit-legacy":66,"./rc4":68,"./ripemd160":69,"./sha1":70,"./sha224":71,"./sha256":72,"./sha3":73,"./sha384":74,"./sha512":75,"./tripledes":76,"./x64-core":77}],53:[function(a,b,c){!function(d,e){"object"==typeof c?b.exports=c=e(a("./core")):"function"==typeof define&&define.amd?define(["./core"],e):e(d.CryptoJS)}(this,function(a){return function(){if("function"==typeof ArrayBuffer){var b=a,c=b.lib,d=c.WordArray,e=d.init,f=d.init=function(a){if(a instanceof ArrayBuffer&&(a=new Uint8Array(a)),(a instanceof Int8Array||"undefined"!=typeof Uint8ClampedArray&&a instanceof Uint8ClampedArray||a instanceof Int16Array||a instanceof Uint16Array||a instanceof Int32Array||a instanceof Uint32Array||a instanceof Float32Array||a instanceof Float64Array)&&(a=new Uint8Array(a.buffer,a.byteOffset,a.byteLength)),a instanceof Uint8Array){for(var b=a.byteLength,c=[],d=0;d<b;d++)c[d>>>2]|=a[d]<<24-d%4*8;e.call(this,c,b)}else e.apply(this,arguments)};f.prototype=d}}(),a.lib.WordArray})},{"./core":46}],54:[function(a,b,c){!function(d,e){"object"==typeof c?b.exports=c=e(a("./core")):"function"==typeof define&&define.amd?define(["./core"],e):e(d.CryptoJS)}(this,function(a){return function(b){function c(a,b,c,d,e,f,g){var h=a+(b&c|~b&d)+e+g;return(h<<f|h>>>32-f)+b}function d(a,b,c,d,e,f,g){var h=a+(b&d|c&~d)+e+g;return(h<<f|h>>>32-f)+b}function e(a,b,c,d,e,f,g){var h=a+(b^c^d)+e+g;return(h<<f|h>>>32-f)+b}function f(a,b,c,d,e,f,g){var h=a+(c^(b|~d))+e+g;return(h<<f|h>>>32-f)+b}var g=a,h=g.lib,i=h.WordArray,j=h.Hasher,k=g.algo,l=[];!function(){for(var a=0;a<64;a++)l[a]=4294967296*b.abs(b.sin(a+1))|0}();var m=k.MD5=j.extend({_doReset:function(){this._hash=new i.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(a,b){for(var g=0;g<16;g++){var h=b+g,i=a[h];a[h]=16711935&(i<<8|i>>>24)|4278255360&(i<<24|i>>>8)}var j=this._hash.words,k=a[b+0],m=a[b+1],n=a[b+2],o=a[b+3],p=a[b+4],q=a[b+5],r=a[b+6],s=a[b+7],t=a[b+8],u=a[b+9],v=a[b+10],w=a[b+11],x=a[b+12],y=a[b+13],z=a[b+14],A=a[b+15],B=j[0],C=j[1],D=j[2],E=j[3];B=c(B,C,D,E,k,7,l[0]),E=c(E,B,C,D,m,12,l[1]),D=c(D,E,B,C,n,17,l[2]),C=c(C,D,E,B,o,22,l[3]),B=c(B,C,D,E,p,7,l[4]),E=c(E,B,C,D,q,12,l[5]),D=c(D,E,B,C,r,17,l[6]),C=c(C,D,E,B,s,22,l[7]),B=c(B,C,D,E,t,7,l[8]),E=c(E,B,C,D,u,12,l[9]),D=c(D,E,B,C,v,17,l[10]),C=c(C,D,E,B,w,22,l[11]),B=c(B,C,D,E,x,7,l[12]),E=c(E,B,C,D,y,12,l[13]),D=c(D,E,B,C,z,17,l[14]),C=c(C,D,E,B,A,22,l[15]),B=d(B,C,D,E,m,5,l[16]),E=d(E,B,C,D,r,9,l[17]),D=d(D,E,B,C,w,14,l[18]),C=d(C,D,E,B,k,20,l[19]),B=d(B,C,D,E,q,5,l[20]),E=d(E,B,C,D,v,9,l[21]),D=d(D,E,B,C,A,14,l[22]),C=d(C,D,E,B,p,20,l[23]),B=d(B,C,D,E,u,5,l[24]),E=d(E,B,C,D,z,9,l[25]),D=d(D,E,B,C,o,14,l[26]),C=d(C,D,E,B,t,20,l[27]),B=d(B,C,D,E,y,5,l[28]),E=d(E,B,C,D,n,9,l[29]),D=d(D,E,B,C,s,14,l[30]),C=d(C,D,E,B,x,20,l[31]),B=e(B,C,D,E,q,4,l[32]),E=e(E,B,C,D,t,11,l[33]),D=e(D,E,B,C,w,16,l[34]),C=e(C,D,E,B,z,23,l[35]),B=e(B,C,D,E,m,4,l[36]),E=e(E,B,C,D,p,11,l[37]),D=e(D,E,B,C,s,16,l[38]),C=e(C,D,E,B,v,23,l[39]),B=e(B,C,D,E,y,4,l[40]),E=e(E,B,C,D,k,11,l[41]),D=e(D,E,B,C,o,16,l[42]),C=e(C,D,E,B,r,23,l[43]),B=e(B,C,D,E,u,4,l[44]),E=e(E,B,C,D,x,11,l[45]),D=e(D,E,B,C,A,16,l[46]),C=e(C,D,E,B,n,23,l[47]),B=f(B,C,D,E,k,6,l[48]),E=f(E,B,C,D,s,10,l[49]),D=f(D,E,B,C,z,15,l[50]),C=f(C,D,E,B,q,21,l[51]),B=f(B,C,D,E,x,6,l[52]),E=f(E,B,C,D,o,10,l[53]),D=f(D,E,B,C,v,15,l[54]),C=f(C,D,E,B,m,21,l[55]),B=f(B,C,D,E,t,6,l[56]),E=f(E,B,C,D,A,10,l[57]),D=f(D,E,B,C,r,15,l[58]),C=f(C,D,E,B,y,21,l[59]),B=f(B,C,D,E,p,6,l[60]),E=f(E,B,C,D,w,10,l[61]),D=f(D,E,B,C,n,15,l[62]),C=f(C,D,E,B,u,21,l[63]),j[0]=j[0]+B|0,j[1]=j[1]+C|0,j[2]=j[2]+D|0,j[3]=j[3]+E|0},_doFinalize:function(){var a=this._data,c=a.words,d=8*this._nDataBytes,e=8*a.sigBytes;c[e>>>5]|=128<<24-e%32;var f=b.floor(d/4294967296),g=d;c[(e+64>>>9<<4)+15]=16711935&(f<<8|f>>>24)|4278255360&(f<<24|f>>>8),c[(e+64>>>9<<4)+14]=16711935&(g<<8|g>>>24)|4278255360&(g<<24|g>>>8),a.sigBytes=4*(c.length+1),this._process();for(var h=this._hash,i=h.words,j=0;j<4;j++){var k=i[j];i[j]=16711935&(k<<8|k>>>24)|4278255360&(k<<24|k>>>8)}return h},clone:function(){var a=j.clone.call(this);return a._hash=this._hash.clone(),a}});g.MD5=j._createHelper(m),g.HmacMD5=j._createHmacHelper(m)}(Math),a.MD5})},{"./core":46}],55:[function(a,b,c){!function(d,e,f){"object"==typeof c?b.exports=c=e(a("./core"),a("./cipher-core")):"function"==typeof define&&define.amd?define(["./core","./cipher-core"],e):e(d.CryptoJS)}(this,function(a){return a.mode.CFB=function(){function b(a,b,c,d){var e=this._iv;if(e){var f=e.slice(0);this._iv=void 0}else var f=this._prevBlock;d.encryptBlock(f,0);for(var g=0;g<c;g++)a[b+g]^=f[g]}var c=a.lib.BlockCipherMode.extend();return c.Encryptor=c.extend({processBlock:function(a,c){var d=this._cipher,e=d.blockSize;b.call(this,a,c,e,d),this._prevBlock=a.slice(c,c+e)}}),c.Decryptor=c.extend({processBlock:function(a,c){var d=this._cipher,e=d.blockSize,f=a.slice(c,c+e);b.call(this,a,c,e,d),this._prevBlock=f}}),c}(),a.mode.CFB})},{"./cipher-core":45,"./core":46}],56:[function(a,b,c){!function(d,e,f){"object"==typeof c?b.exports=c=e(a("./core"),a("./cipher-core")):"function"==typeof define&&define.amd?define(["./core","./cipher-core"],e):e(d.CryptoJS)}(this,function(a){return a.mode.CTRGladman=function(){function b(a){if(255===(a>>24&255)){var b=a>>16&255,c=a>>8&255,d=255&a;255===b?(b=0,255===c?(c=0,255===d?d=0:++d):++c):++b,a=0,a+=b<<16,a+=c<<8,a+=d}else a+=1<<24;return a}function c(a){return 0===(a[0]=b(a[0]))&&(a[1]=b(a[1])),a}var d=a.lib.BlockCipherMode.extend(),e=d.Encryptor=d.extend({processBlock:function(a,b){var d=this._cipher,e=d.blockSize,f=this._iv,g=this._counter;f&&(g=this._counter=f.slice(0),this._iv=void 0),c(g);var h=g.slice(0);d.encryptBlock(h,0);for(var i=0;i<e;i++)a[b+i]^=h[i]}});return d.Decryptor=e,d}(),a.mode.CTRGladman})},{"./cipher-core":45,"./core":46}],57:[function(a,b,c){!function(d,e,f){"object"==typeof c?b.exports=c=e(a("./core"),a("./cipher-core")):"function"==typeof define&&define.amd?define(["./core","./cipher-core"],e):e(d.CryptoJS)}(this,function(a){return a.mode.CTR=function(){var b=a.lib.BlockCipherMode.extend(),c=b.Encryptor=b.extend({processBlock:function(a,b){var c=this._cipher,d=c.blockSize,e=this._iv,f=this._counter;e&&(f=this._counter=e.slice(0),this._iv=void 0);var g=f.slice(0);c.encryptBlock(g,0),f[d-1]=f[d-1]+1|0;for(var h=0;h<d;h++)a[b+h]^=g[h]}});return b.Decryptor=c,b}(),a.mode.CTR})},{"./cipher-core":45,"./core":46}],58:[function(a,b,c){!function(d,e,f){"object"==typeof c?b.exports=c=e(a("./core"),a("./cipher-core")):"function"==typeof define&&define.amd?define(["./core","./cipher-core"],e):e(d.CryptoJS)}(this,function(a){return a.mode.ECB=function(){var b=a.lib.BlockCipherMode.extend();return b.Encryptor=b.extend({processBlock:function(a,b){this._cipher.encryptBlock(a,b)}}),b.Decryptor=b.extend({processBlock:function(a,b){this._cipher.decryptBlock(a,b)}}),b}(),a.mode.ECB})},{"./cipher-core":45,"./core":46}],59:[function(a,b,c){!function(d,e,f){"object"==typeof c?b.exports=c=e(a("./core"),a("./cipher-core")):"function"==typeof define&&define.amd?define(["./core","./cipher-core"],e):e(d.CryptoJS)}(this,function(a){return a.mode.OFB=function(){var b=a.lib.BlockCipherMode.extend(),c=b.Encryptor=b.extend({processBlock:function(a,b){var c=this._cipher,d=c.blockSize,e=this._iv,f=this._keystream;e&&(f=this._keystream=e.slice(0),this._iv=void 0),c.encryptBlock(f,0);for(var g=0;g<d;g++)a[b+g]^=f[g]}});return b.Decryptor=c,b}(),a.mode.OFB})},{"./cipher-core":45,"./core":46}],60:[function(a,b,c){!function(d,e,f){"object"==typeof c?b.exports=c=e(a("./core"),a("./cipher-core")):"function"==typeof define&&define.amd?define(["./core","./cipher-core"],e):e(d.CryptoJS)}(this,function(a){return a.pad.AnsiX923={pad:function(a,b){var c=a.sigBytes,d=4*b,e=d-c%d,f=c+e-1;a.clamp(),a.words[f>>>2]|=e<<24-f%4*8,a.sigBytes+=e},unpad:function(a){var b=255&a.words[a.sigBytes-1>>>2];a.sigBytes-=b}},a.pad.Ansix923})},{"./cipher-core":45,"./core":46}],61:[function(a,b,c){!function(d,e,f){"object"==typeof c?b.exports=c=e(a("./core"),a("./cipher-core")):"function"==typeof define&&define.amd?define(["./core","./cipher-core"],e):e(d.CryptoJS)}(this,function(a){return a.pad.Iso10126={pad:function(b,c){var d=4*c,e=d-b.sigBytes%d;b.concat(a.lib.WordArray.random(e-1)).concat(a.lib.WordArray.create([e<<24],1))},unpad:function(a){var b=255&a.words[a.sigBytes-1>>>2];a.sigBytes-=b}},a.pad.Iso10126})},{"./cipher-core":45,"./core":46}],62:[function(a,b,c){!function(d,e,f){"object"==typeof c?b.exports=c=e(a("./core"),a("./cipher-core")):"function"==typeof define&&define.amd?define(["./core","./cipher-core"],e):e(d.CryptoJS)}(this,function(a){return a.pad.Iso97971={pad:function(b,c){b.concat(a.lib.WordArray.create([2147483648],1)),a.pad.ZeroPadding.pad(b,c)},unpad:function(b){a.pad.ZeroPadding.unpad(b),b.sigBytes--}},a.pad.Iso97971})},{"./cipher-core":45,"./core":46}],63:[function(a,b,c){!function(d,e,f){"object"==typeof c?b.exports=c=e(a("./core"),a("./cipher-core")):"function"==typeof define&&define.amd?define(["./core","./cipher-core"],e):e(d.CryptoJS)}(this,function(a){return a.pad.NoPadding={pad:function(){},unpad:function(){}},a.pad.NoPadding})},{"./cipher-core":45,"./core":46}],64:[function(a,b,c){!function(d,e,f){"object"==typeof c?b.exports=c=e(a("./core"),a("./cipher-core")):"function"==typeof define&&define.amd?define(["./core","./cipher-core"],e):e(d.CryptoJS)}(this,function(a){return a.pad.ZeroPadding={pad:function(a,b){var c=4*b;a.clamp(),a.sigBytes+=c-(a.sigBytes%c||c)},unpad:function(a){for(var b=a.words,c=a.sigBytes-1;!(b[c>>>2]>>>24-c%4*8&255);)c--;a.sigBytes=c+1}},a.pad.ZeroPadding})},{"./cipher-core":45,"./core":46}],65:[function(a,b,c){!function(d,e,f){"object"==typeof c?b.exports=c=e(a("./core"),a("./sha1"),a("./hmac")):"function"==typeof define&&define.amd?define(["./core","./sha1","./hmac"],e):e(d.CryptoJS)}(this,function(a){return function(){var b=a,c=b.lib,d=c.Base,e=c.WordArray,f=b.algo,g=f.SHA1,h=f.HMAC,i=f.PBKDF2=d.extend({cfg:d.extend({keySize:4,hasher:g,iterations:1}),init:function(a){this.cfg=this.cfg.extend(a)},compute:function(a,b){for(var c=this.cfg,d=h.create(c.hasher,a),f=e.create(),g=e.create([1]),i=f.words,j=g.words,k=c.keySize,l=c.iterations;i.length<k;){var m=d.update(b).finalize(g);d.reset();for(var n=m.words,o=n.length,p=m,q=1;q<l;q++){p=d.finalize(p),d.reset();for(var r=p.words,s=0;s<o;s++)n[s]^=r[s]}f.concat(m),j[0]++}return f.sigBytes=4*k,f}});b.PBKDF2=function(a,b,c){return i.create(c).compute(a,b)}}(),a.PBKDF2})},{"./core":46,"./hmac":51,"./sha1":70}],66:[function(a,b,c){!function(d,e,f){"object"==typeof c?b.exports=c=e(a("./core"),a("./enc-base64"),a("./md5"),a("./evpkdf"),a("./cipher-core")):"function"==typeof define&&define.amd?define(["./core","./enc-base64","./md5","./evpkdf","./cipher-core"],e):e(d.CryptoJS)}(this,function(a){return function(){function b(){for(var a=this._X,b=this._C,c=0;c<8;c++)h[c]=b[c];b[0]=b[0]+1295307597+this._b|0,b[1]=b[1]+3545052371+(b[0]>>>0<h[0]>>>0?1:0)|0,b[2]=b[2]+886263092+(b[1]>>>0<h[1]>>>0?1:0)|0,b[3]=b[3]+1295307597+(b[2]>>>0<h[2]>>>0?1:0)|0,b[4]=b[4]+3545052371+(b[3]>>>0<h[3]>>>0?1:0)|0,b[5]=b[5]+886263092+(b[4]>>>0<h[4]>>>0?1:0)|0,b[6]=b[6]+1295307597+(b[5]>>>0<h[5]>>>0?1:0)|0,b[7]=b[7]+3545052371+(b[6]>>>0<h[6]>>>0?1:0)|0,this._b=b[7]>>>0<h[7]>>>0?1:0;for(var c=0;c<8;c++){var d=a[c]+b[c],e=65535&d,f=d>>>16,g=((e*e>>>17)+e*f>>>15)+f*f,j=((4294901760&d)*d|0)+((65535&d)*d|0);i[c]=g^j}a[0]=i[0]+(i[7]<<16|i[7]>>>16)+(i[6]<<16|i[6]>>>16)|0,a[1]=i[1]+(i[0]<<8|i[0]>>>24)+i[7]|0,a[2]=i[2]+(i[1]<<16|i[1]>>>16)+(i[0]<<16|i[0]>>>16)|0,a[3]=i[3]+(i[2]<<8|i[2]>>>24)+i[1]|0,a[4]=i[4]+(i[3]<<16|i[3]>>>16)+(i[2]<<16|i[2]>>>16)|0,a[5]=i[5]+(i[4]<<8|i[4]>>>24)+i[3]|0,a[6]=i[6]+(i[5]<<16|i[5]>>>16)+(i[4]<<16|i[4]>>>16)|0,a[7]=i[7]+(i[6]<<8|i[6]>>>24)+i[5]|0}var c=a,d=c.lib,e=d.StreamCipher,f=c.algo,g=[],h=[],i=[],j=f.RabbitLegacy=e.extend({_doReset:function(){var a=this._key.words,c=this.cfg.iv,d=this._X=[a[0],a[3]<<16|a[2]>>>16,a[1],a[0]<<16|a[3]>>>16,a[2],a[1]<<16|a[0]>>>16,a[3],a[2]<<16|a[1]>>>16],e=this._C=[a[2]<<16|a[2]>>>16,4294901760&a[0]|65535&a[1],a[3]<<16|a[3]>>>16,4294901760&a[1]|65535&a[2],a[0]<<16|a[0]>>>16,4294901760&a[2]|65535&a[3],a[1]<<16|a[1]>>>16,4294901760&a[3]|65535&a[0]];this._b=0;for(var f=0;f<4;f++)b.call(this);for(var f=0;f<8;f++)e[f]^=d[f+4&7];if(c){var g=c.words,h=g[0],i=g[1],j=16711935&(h<<8|h>>>24)|4278255360&(h<<24|h>>>8),k=16711935&(i<<8|i>>>24)|4278255360&(i<<24|i>>>8),l=j>>>16|4294901760&k,m=k<<16|65535&j;e[0]^=j,e[1]^=l,e[2]^=k,e[3]^=m,e[4]^=j,e[5]^=l,e[6]^=k,e[7]^=m;for(var f=0;f<4;f++)b.call(this)}},_doProcessBlock:function(a,c){var d=this._X;b.call(this),g[0]=d[0]^d[5]>>>16^d[3]<<16,g[1]=d[2]^d[7]>>>16^d[5]<<16,g[2]=d[4]^d[1]>>>16^d[7]<<16,g[3]=d[6]^d[3]>>>16^d[1]<<16;for(var e=0;e<4;e++)g[e]=16711935&(g[e]<<8|g[e]>>>24)|4278255360&(g[e]<<24|g[e]>>>8),a[c+e]^=g[e]},blockSize:4,ivSize:2});c.RabbitLegacy=e._createHelper(j)}(),a.RabbitLegacy})},{"./cipher-core":45,"./core":46,"./enc-base64":47,"./evpkdf":49,"./md5":54}],67:[function(a,b,c){!function(d,e,f){"object"==typeof c?b.exports=c=e(a("./core"),a("./enc-base64"),a("./md5"),a("./evpkdf"),a("./cipher-core")):"function"==typeof define&&define.amd?define(["./core","./enc-base64","./md5","./evpkdf","./cipher-core"],e):e(d.CryptoJS)}(this,function(a){return function(){function b(){for(var a=this._X,b=this._C,c=0;c<8;c++)h[c]=b[c];b[0]=b[0]+1295307597+this._b|0,b[1]=b[1]+3545052371+(b[0]>>>0<h[0]>>>0?1:0)|0,b[2]=b[2]+886263092+(b[1]>>>0<h[1]>>>0?1:0)|0,b[3]=b[3]+1295307597+(b[2]>>>0<h[2]>>>0?1:0)|0,b[4]=b[4]+3545052371+(b[3]>>>0<h[3]>>>0?1:0)|0,b[5]=b[5]+886263092+(b[4]>>>0<h[4]>>>0?1:0)|0,b[6]=b[6]+1295307597+(b[5]>>>0<h[5]>>>0?1:0)|0,b[7]=b[7]+3545052371+(b[6]>>>0<h[6]>>>0?1:0)|0,this._b=b[7]>>>0<h[7]>>>0?1:0;for(var c=0;c<8;c++){var d=a[c]+b[c],e=65535&d,f=d>>>16,g=((e*e>>>17)+e*f>>>15)+f*f,j=((4294901760&d)*d|0)+((65535&d)*d|0);i[c]=g^j}a[0]=i[0]+(i[7]<<16|i[7]>>>16)+(i[6]<<16|i[6]>>>16)|0,a[1]=i[1]+(i[0]<<8|i[0]>>>24)+i[7]|0,a[2]=i[2]+(i[1]<<16|i[1]>>>16)+(i[0]<<16|i[0]>>>16)|0,a[3]=i[3]+(i[2]<<8|i[2]>>>24)+i[1]|0,a[4]=i[4]+(i[3]<<16|i[3]>>>16)+(i[2]<<16|i[2]>>>16)|0,a[5]=i[5]+(i[4]<<8|i[4]>>>24)+i[3]|0,a[6]=i[6]+(i[5]<<16|i[5]>>>16)+(i[4]<<16|i[4]>>>16)|0,a[7]=i[7]+(i[6]<<8|i[6]>>>24)+i[5]|0}var c=a,d=c.lib,e=d.StreamCipher,f=c.algo,g=[],h=[],i=[],j=f.Rabbit=e.extend({_doReset:function(){for(var a=this._key.words,c=this.cfg.iv,d=0;d<4;d++)a[d]=16711935&(a[d]<<8|a[d]>>>24)|4278255360&(a[d]<<24|a[d]>>>8);var e=this._X=[a[0],a[3]<<16|a[2]>>>16,a[1],a[0]<<16|a[3]>>>16,a[2],a[1]<<16|a[0]>>>16,a[3],a[2]<<16|a[1]>>>16],f=this._C=[a[2]<<16|a[2]>>>16,4294901760&a[0]|65535&a[1],a[3]<<16|a[3]>>>16,4294901760&a[1]|65535&a[2],a[0]<<16|a[0]>>>16,4294901760&a[2]|65535&a[3],a[1]<<16|a[1]>>>16,4294901760&a[3]|65535&a[0]];this._b=0;for(var d=0;d<4;d++)b.call(this);for(var d=0;d<8;d++)f[d]^=e[d+4&7];if(c){var g=c.words,h=g[0],i=g[1],j=16711935&(h<<8|h>>>24)|4278255360&(h<<24|h>>>8),k=16711935&(i<<8|i>>>24)|4278255360&(i<<24|i>>>8),l=j>>>16|4294901760&k,m=k<<16|65535&j;f[0]^=j,f[1]^=l,f[2]^=k,f[3]^=m,f[4]^=j,f[5]^=l,f[6]^=k,f[7]^=m;for(var d=0;d<4;d++)b.call(this)}},_doProcessBlock:function(a,c){var d=this._X;b.call(this),g[0]=d[0]^d[5]>>>16^d[3]<<16,g[1]=d[2]^d[7]>>>16^d[5]<<16,g[2]=d[4]^d[1]>>>16^d[7]<<16,g[3]=d[6]^d[3]>>>16^d[1]<<16;for(var e=0;e<4;e++)g[e]=16711935&(g[e]<<8|g[e]>>>24)|4278255360&(g[e]<<24|g[e]>>>8),a[c+e]^=g[e]},blockSize:4,ivSize:2});c.Rabbit=e._createHelper(j)}(),a.Rabbit})},{"./cipher-core":45,"./core":46,"./enc-base64":47,"./evpkdf":49,"./md5":54}],68:[function(a,b,c){!function(d,e,f){"object"==typeof c?b.exports=c=e(a("./core"),a("./enc-base64"),a("./md5"),a("./evpkdf"),a("./cipher-core")):"function"==typeof define&&define.amd?define(["./core","./enc-base64","./md5","./evpkdf","./cipher-core"],e):e(d.CryptoJS)}(this,function(a){return function(){function b(){for(var a=this._S,b=this._i,c=this._j,d=0,e=0;e<4;e++){b=(b+1)%256,c=(c+a[b])%256;var f=a[b];a[b]=a[c],a[c]=f,d|=a[(a[b]+a[c])%256]<<24-8*e}return this._i=b,this._j=c,d}var c=a,d=c.lib,e=d.StreamCipher,f=c.algo,g=f.RC4=e.extend({_doReset:function(){for(var a=this._key,b=a.words,c=a.sigBytes,d=this._S=[],e=0;e<256;e++)d[e]=e;for(var e=0,f=0;e<256;e++){var g=e%c,h=b[g>>>2]>>>24-g%4*8&255;f=(f+d[e]+h)%256;var i=d[e];d[e]=d[f],d[f]=i}this._i=this._j=0},_doProcessBlock:function(a,c){a[c]^=b.call(this)},keySize:8,ivSize:0});c.RC4=e._createHelper(g);var h=f.RC4Drop=g.extend({cfg:g.cfg.extend({drop:192}),_doReset:function(){g._doReset.call(this);for(var a=this.cfg.drop;a>0;a--)b.call(this)}});c.RC4Drop=e._createHelper(h)}(),a.RC4})},{"./cipher-core":45,"./core":46,"./enc-base64":47,"./evpkdf":49,"./md5":54}],69:[function(a,b,c){!function(d,e){"object"==typeof c?b.exports=c=e(a("./core")):"function"==typeof define&&define.amd?define(["./core"],e):e(d.CryptoJS)}(this,function(a){return function(b){function c(a,b,c){return a^b^c}function d(a,b,c){return a&b|~a&c}function e(a,b,c){return(a|~b)^c}function f(a,b,c){return a&c|b&~c}function g(a,b,c){return a^(b|~c)}function h(a,b){return a<<b|a>>>32-b}var i=a,j=i.lib,k=j.WordArray,l=j.Hasher,m=i.algo,n=k.create([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13]),o=k.create([5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11]),p=k.create([11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6]),q=k.create([8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11]),r=k.create([0,1518500249,1859775393,2400959708,2840853838]),s=k.create([1352829926,1548603684,1836072691,2053994217,0]),t=m.RIPEMD160=l.extend({
_doReset:function(){this._hash=k.create([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(a,b){for(var i=0;i<16;i++){var j=b+i,k=a[j];a[j]=16711935&(k<<8|k>>>24)|4278255360&(k<<24|k>>>8)}var l,m,t,u,v,w,x,y,z,A,B=this._hash.words,C=r.words,D=s.words,E=n.words,F=o.words,G=p.words,H=q.words;w=l=B[0],x=m=B[1],y=t=B[2],z=u=B[3],A=v=B[4];for(var I,i=0;i<80;i+=1)I=l+a[b+E[i]]|0,I+=i<16?c(m,t,u)+C[0]:i<32?d(m,t,u)+C[1]:i<48?e(m,t,u)+C[2]:i<64?f(m,t,u)+C[3]:g(m,t,u)+C[4],I|=0,I=h(I,G[i]),I=I+v|0,l=v,v=u,u=h(t,10),t=m,m=I,I=w+a[b+F[i]]|0,I+=i<16?g(x,y,z)+D[0]:i<32?f(x,y,z)+D[1]:i<48?e(x,y,z)+D[2]:i<64?d(x,y,z)+D[3]:c(x,y,z)+D[4],I|=0,I=h(I,H[i]),I=I+A|0,w=A,A=z,z=h(y,10),y=x,x=I;I=B[1]+t+z|0,B[1]=B[2]+u+A|0,B[2]=B[3]+v+w|0,B[3]=B[4]+l+x|0,B[4]=B[0]+m+y|0,B[0]=I},_doFinalize:function(){var a=this._data,b=a.words,c=8*this._nDataBytes,d=8*a.sigBytes;b[d>>>5]|=128<<24-d%32,b[(d+64>>>9<<4)+14]=16711935&(c<<8|c>>>24)|4278255360&(c<<24|c>>>8),a.sigBytes=4*(b.length+1),this._process();for(var e=this._hash,f=e.words,g=0;g<5;g++){var h=f[g];f[g]=16711935&(h<<8|h>>>24)|4278255360&(h<<24|h>>>8)}return e},clone:function(){var a=l.clone.call(this);return a._hash=this._hash.clone(),a}});i.RIPEMD160=l._createHelper(t),i.HmacRIPEMD160=l._createHmacHelper(t)}(Math),a.RIPEMD160})},{"./core":46}],70:[function(a,b,c){!function(d,e){"object"==typeof c?b.exports=c=e(a("./core")):"function"==typeof define&&define.amd?define(["./core"],e):e(d.CryptoJS)}(this,function(a){return function(){var b=a,c=b.lib,d=c.WordArray,e=c.Hasher,f=b.algo,g=[],h=f.SHA1=e.extend({_doReset:function(){this._hash=new d.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(a,b){for(var c=this._hash.words,d=c[0],e=c[1],f=c[2],h=c[3],i=c[4],j=0;j<80;j++){if(j<16)g[j]=0|a[b+j];else{var k=g[j-3]^g[j-8]^g[j-14]^g[j-16];g[j]=k<<1|k>>>31}var l=(d<<5|d>>>27)+i+g[j];l+=j<20?(e&f|~e&h)+1518500249:j<40?(e^f^h)+1859775393:j<60?(e&f|e&h|f&h)-1894007588:(e^f^h)-899497514,i=h,h=f,f=e<<30|e>>>2,e=d,d=l}c[0]=c[0]+d|0,c[1]=c[1]+e|0,c[2]=c[2]+f|0,c[3]=c[3]+h|0,c[4]=c[4]+i|0},_doFinalize:function(){var a=this._data,b=a.words,c=8*this._nDataBytes,d=8*a.sigBytes;return b[d>>>5]|=128<<24-d%32,b[(d+64>>>9<<4)+14]=Math.floor(c/4294967296),b[(d+64>>>9<<4)+15]=c,a.sigBytes=4*b.length,this._process(),this._hash},clone:function(){var a=e.clone.call(this);return a._hash=this._hash.clone(),a}});b.SHA1=e._createHelper(h),b.HmacSHA1=e._createHmacHelper(h)}(),a.SHA1})},{"./core":46}],71:[function(a,b,c){!function(d,e,f){"object"==typeof c?b.exports=c=e(a("./core"),a("./sha256")):"function"==typeof define&&define.amd?define(["./core","./sha256"],e):e(d.CryptoJS)}(this,function(a){return function(){var b=a,c=b.lib,d=c.WordArray,e=b.algo,f=e.SHA256,g=e.SHA224=f.extend({_doReset:function(){this._hash=new d.init([3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428])},_doFinalize:function(){var a=f._doFinalize.call(this);return a.sigBytes-=4,a}});b.SHA224=f._createHelper(g),b.HmacSHA224=f._createHmacHelper(g)}(),a.SHA224})},{"./core":46,"./sha256":72}],72:[function(a,b,c){!function(d,e){"object"==typeof c?b.exports=c=e(a("./core")):"function"==typeof define&&define.amd?define(["./core"],e):e(d.CryptoJS)}(this,function(a){return function(b){var c=a,d=c.lib,e=d.WordArray,f=d.Hasher,g=c.algo,h=[],i=[];!function(){function a(a){for(var c=b.sqrt(a),d=2;d<=c;d++)if(!(a%d))return!1;return!0}function c(a){return 4294967296*(a-(0|a))|0}for(var d=2,e=0;e<64;)a(d)&&(e<8&&(h[e]=c(b.pow(d,.5))),i[e]=c(b.pow(d,1/3)),e++),d++}();var j=[],k=g.SHA256=f.extend({_doReset:function(){this._hash=new e.init(h.slice(0))},_doProcessBlock:function(a,b){for(var c=this._hash.words,d=c[0],e=c[1],f=c[2],g=c[3],h=c[4],k=c[5],l=c[6],m=c[7],n=0;n<64;n++){if(n<16)j[n]=0|a[b+n];else{var o=j[n-15],p=(o<<25|o>>>7)^(o<<14|o>>>18)^o>>>3,q=j[n-2],r=(q<<15|q>>>17)^(q<<13|q>>>19)^q>>>10;j[n]=p+j[n-7]+r+j[n-16]}var s=h&k^~h&l,t=d&e^d&f^e&f,u=(d<<30|d>>>2)^(d<<19|d>>>13)^(d<<10|d>>>22),v=(h<<26|h>>>6)^(h<<21|h>>>11)^(h<<7|h>>>25),w=m+v+s+i[n]+j[n],x=u+t;m=l,l=k,k=h,h=g+w|0,g=f,f=e,e=d,d=w+x|0}c[0]=c[0]+d|0,c[1]=c[1]+e|0,c[2]=c[2]+f|0,c[3]=c[3]+g|0,c[4]=c[4]+h|0,c[5]=c[5]+k|0,c[6]=c[6]+l|0,c[7]=c[7]+m|0},_doFinalize:function(){var a=this._data,c=a.words,d=8*this._nDataBytes,e=8*a.sigBytes;return c[e>>>5]|=128<<24-e%32,c[(e+64>>>9<<4)+14]=b.floor(d/4294967296),c[(e+64>>>9<<4)+15]=d,a.sigBytes=4*c.length,this._process(),this._hash},clone:function(){var a=f.clone.call(this);return a._hash=this._hash.clone(),a}});c.SHA256=f._createHelper(k),c.HmacSHA256=f._createHmacHelper(k)}(Math),a.SHA256})},{"./core":46}],73:[function(a,b,c){!function(d,e,f){"object"==typeof c?b.exports=c=e(a("./core"),a("./x64-core")):"function"==typeof define&&define.amd?define(["./core","./x64-core"],e):e(d.CryptoJS)}(this,function(a){return function(b){var c=a,d=c.lib,e=d.WordArray,f=d.Hasher,g=c.x64,h=g.Word,i=c.algo,j=[],k=[],l=[];!function(){for(var a=1,b=0,c=0;c<24;c++){j[a+5*b]=(c+1)*(c+2)/2%64;var d=b%5,e=(2*a+3*b)%5;a=d,b=e}for(var a=0;a<5;a++)for(var b=0;b<5;b++)k[a+5*b]=b+(2*a+3*b)%5*5;for(var f=1,g=0;g<24;g++){for(var i=0,m=0,n=0;n<7;n++){if(1&f){var o=(1<<n)-1;o<32?m^=1<<o:i^=1<<o-32}128&f?f=f<<1^113:f<<=1}l[g]=h.create(i,m)}}();var m=[];!function(){for(var a=0;a<25;a++)m[a]=h.create()}();var n=i.SHA3=f.extend({cfg:f.cfg.extend({outputLength:512}),_doReset:function(){for(var a=this._state=[],b=0;b<25;b++)a[b]=new h.init;this.blockSize=(1600-2*this.cfg.outputLength)/32},_doProcessBlock:function(a,b){for(var c=this._state,d=this.blockSize/2,e=0;e<d;e++){var f=a[b+2*e],g=a[b+2*e+1];f=16711935&(f<<8|f>>>24)|4278255360&(f<<24|f>>>8),g=16711935&(g<<8|g>>>24)|4278255360&(g<<24|g>>>8);var h=c[e];h.high^=g,h.low^=f}for(var i=0;i<24;i++){for(var n=0;n<5;n++){for(var o=0,p=0,q=0;q<5;q++){var h=c[n+5*q];o^=h.high,p^=h.low}var r=m[n];r.high=o,r.low=p}for(var n=0;n<5;n++)for(var s=m[(n+4)%5],t=m[(n+1)%5],u=t.high,v=t.low,o=s.high^(u<<1|v>>>31),p=s.low^(v<<1|u>>>31),q=0;q<5;q++){var h=c[n+5*q];h.high^=o,h.low^=p}for(var w=1;w<25;w++){var h=c[w],x=h.high,y=h.low,z=j[w];if(z<32)var o=x<<z|y>>>32-z,p=y<<z|x>>>32-z;else var o=y<<z-32|x>>>64-z,p=x<<z-32|y>>>64-z;var A=m[k[w]];A.high=o,A.low=p}var B=m[0],C=c[0];B.high=C.high,B.low=C.low;for(var n=0;n<5;n++)for(var q=0;q<5;q++){var w=n+5*q,h=c[w],D=m[w],E=m[(n+1)%5+5*q],F=m[(n+2)%5+5*q];h.high=D.high^~E.high&F.high,h.low=D.low^~E.low&F.low}var h=c[0],G=l[i];h.high^=G.high,h.low^=G.low}},_doFinalize:function(){var a=this._data,c=a.words,d=(8*this._nDataBytes,8*a.sigBytes),f=32*this.blockSize;c[d>>>5]|=1<<24-d%32,c[(b.ceil((d+1)/f)*f>>>5)-1]|=128,a.sigBytes=4*c.length,this._process();for(var g=this._state,h=this.cfg.outputLength/8,i=h/8,j=[],k=0;k<i;k++){var l=g[k],m=l.high,n=l.low;m=16711935&(m<<8|m>>>24)|4278255360&(m<<24|m>>>8),n=16711935&(n<<8|n>>>24)|4278255360&(n<<24|n>>>8),j.push(n),j.push(m)}return new e.init(j,h)},clone:function(){for(var a=f.clone.call(this),b=a._state=this._state.slice(0),c=0;c<25;c++)b[c]=b[c].clone();return a}});c.SHA3=f._createHelper(n),c.HmacSHA3=f._createHmacHelper(n)}(Math),a.SHA3})},{"./core":46,"./x64-core":77}],74:[function(a,b,c){!function(d,e,f){"object"==typeof c?b.exports=c=e(a("./core"),a("./x64-core"),a("./sha512")):"function"==typeof define&&define.amd?define(["./core","./x64-core","./sha512"],e):e(d.CryptoJS)}(this,function(a){return function(){var b=a,c=b.x64,d=c.Word,e=c.WordArray,f=b.algo,g=f.SHA512,h=f.SHA384=g.extend({_doReset:function(){this._hash=new e.init([new d.init(3418070365,3238371032),new d.init(1654270250,914150663),new d.init(2438529370,812702999),new d.init(355462360,4144912697),new d.init(1731405415,4290775857),new d.init(2394180231,1750603025),new d.init(3675008525,1694076839),new d.init(1203062813,3204075428)])},_doFinalize:function(){var a=g._doFinalize.call(this);return a.sigBytes-=16,a}});b.SHA384=g._createHelper(h),b.HmacSHA384=g._createHmacHelper(h)}(),a.SHA384})},{"./core":46,"./sha512":75,"./x64-core":77}],75:[function(a,b,c){!function(d,e,f){"object"==typeof c?b.exports=c=e(a("./core"),a("./x64-core")):"function"==typeof define&&define.amd?define(["./core","./x64-core"],e):e(d.CryptoJS)}(this,function(a){return function(){function b(){return g.create.apply(g,arguments)}var c=a,d=c.lib,e=d.Hasher,f=c.x64,g=f.Word,h=f.WordArray,i=c.algo,j=[b(1116352408,3609767458),b(1899447441,602891725),b(3049323471,3964484399),b(3921009573,2173295548),b(961987163,4081628472),b(1508970993,3053834265),b(2453635748,2937671579),b(2870763221,3664609560),b(3624381080,2734883394),b(310598401,1164996542),b(607225278,1323610764),b(1426881987,3590304994),b(1925078388,4068182383),b(2162078206,991336113),b(2614888103,633803317),b(3248222580,3479774868),b(3835390401,2666613458),b(4022224774,944711139),b(264347078,2341262773),b(604807628,2007800933),b(770255983,1495990901),b(1249150122,1856431235),b(1555081692,3175218132),b(1996064986,2198950837),b(2554220882,3999719339),b(2821834349,766784016),b(2952996808,2566594879),b(3210313671,3203337956),b(3336571891,1034457026),b(3584528711,2466948901),b(113926993,3758326383),b(338241895,168717936),b(666307205,1188179964),b(773529912,1546045734),b(1294757372,1522805485),b(1396182291,2643833823),b(1695183700,2343527390),b(1986661051,1014477480),b(2177026350,1206759142),b(2456956037,344077627),b(2730485921,1290863460),b(2820302411,3158454273),b(3259730800,3505952657),b(3345764771,106217008),b(3516065817,3606008344),b(3600352804,1432725776),b(4094571909,1467031594),b(275423344,851169720),b(430227734,3100823752),b(506948616,1363258195),b(659060556,3750685593),b(883997877,3785050280),b(958139571,3318307427),b(1322822218,3812723403),b(1537002063,2003034995),b(1747873779,3602036899),b(1955562222,1575990012),b(2024104815,1125592928),b(2227730452,2716904306),b(2361852424,442776044),b(2428436474,593698344),b(2756734187,3733110249),b(3204031479,2999351573),b(3329325298,3815920427),b(3391569614,3928383900),b(3515267271,566280711),b(3940187606,3454069534),b(4118630271,4000239992),b(116418474,1914138554),b(174292421,2731055270),b(289380356,3203993006),b(460393269,320620315),b(685471733,587496836),b(852142971,1086792851),b(1017036298,365543100),b(1126000580,2618297676),b(1288033470,3409855158),b(1501505948,4234509866),b(1607167915,987167468),b(1816402316,1246189591)],k=[];!function(){for(var a=0;a<80;a++)k[a]=b()}();var l=i.SHA512=e.extend({_doReset:function(){this._hash=new h.init([new g.init(1779033703,4089235720),new g.init(3144134277,2227873595),new g.init(1013904242,4271175723),new g.init(2773480762,1595750129),new g.init(1359893119,2917565137),new g.init(2600822924,725511199),new g.init(528734635,4215389547),new g.init(1541459225,327033209)])},_doProcessBlock:function(a,b){for(var c=this._hash.words,d=c[0],e=c[1],f=c[2],g=c[3],h=c[4],i=c[5],l=c[6],m=c[7],n=d.high,o=d.low,p=e.high,q=e.low,r=f.high,s=f.low,t=g.high,u=g.low,v=h.high,w=h.low,x=i.high,y=i.low,z=l.high,A=l.low,B=m.high,C=m.low,D=n,E=o,F=p,G=q,H=r,I=s,J=t,K=u,L=v,M=w,N=x,O=y,P=z,Q=A,R=B,S=C,T=0;T<80;T++){var U=k[T];if(T<16)var V=U.high=0|a[b+2*T],W=U.low=0|a[b+2*T+1];else{var X=k[T-15],Y=X.high,Z=X.low,$=(Y>>>1|Z<<31)^(Y>>>8|Z<<24)^Y>>>7,_=(Z>>>1|Y<<31)^(Z>>>8|Y<<24)^(Z>>>7|Y<<25),aa=k[T-2],ba=aa.high,ca=aa.low,da=(ba>>>19|ca<<13)^(ba<<3|ca>>>29)^ba>>>6,ea=(ca>>>19|ba<<13)^(ca<<3|ba>>>29)^(ca>>>6|ba<<26),fa=k[T-7],ga=fa.high,ha=fa.low,ia=k[T-16],ja=ia.high,ka=ia.low,W=_+ha,V=$+ga+(W>>>0<_>>>0?1:0),W=W+ea,V=V+da+(W>>>0<ea>>>0?1:0),W=W+ka,V=V+ja+(W>>>0<ka>>>0?1:0);U.high=V,U.low=W}var la=L&N^~L&P,ma=M&O^~M&Q,na=D&F^D&H^F&H,oa=E&G^E&I^G&I,pa=(D>>>28|E<<4)^(D<<30|E>>>2)^(D<<25|E>>>7),qa=(E>>>28|D<<4)^(E<<30|D>>>2)^(E<<25|D>>>7),ra=(L>>>14|M<<18)^(L>>>18|M<<14)^(L<<23|M>>>9),sa=(M>>>14|L<<18)^(M>>>18|L<<14)^(M<<23|L>>>9),ta=j[T],ua=ta.high,va=ta.low,wa=S+sa,xa=R+ra+(wa>>>0<S>>>0?1:0),wa=wa+ma,xa=xa+la+(wa>>>0<ma>>>0?1:0),wa=wa+va,xa=xa+ua+(wa>>>0<va>>>0?1:0),wa=wa+W,xa=xa+V+(wa>>>0<W>>>0?1:0),ya=qa+oa,za=pa+na+(ya>>>0<qa>>>0?1:0);R=P,S=Q,P=N,Q=O,N=L,O=M,M=K+wa|0,L=J+xa+(M>>>0<K>>>0?1:0)|0,J=H,K=I,H=F,I=G,F=D,G=E,E=wa+ya|0,D=xa+za+(E>>>0<wa>>>0?1:0)|0}o=d.low=o+E,d.high=n+D+(o>>>0<E>>>0?1:0),q=e.low=q+G,e.high=p+F+(q>>>0<G>>>0?1:0),s=f.low=s+I,f.high=r+H+(s>>>0<I>>>0?1:0),u=g.low=u+K,g.high=t+J+(u>>>0<K>>>0?1:0),w=h.low=w+M,h.high=v+L+(w>>>0<M>>>0?1:0),y=i.low=y+O,i.high=x+N+(y>>>0<O>>>0?1:0),A=l.low=A+Q,l.high=z+P+(A>>>0<Q>>>0?1:0),C=m.low=C+S,m.high=B+R+(C>>>0<S>>>0?1:0)},_doFinalize:function(){var a=this._data,b=a.words,c=8*this._nDataBytes,d=8*a.sigBytes;b[d>>>5]|=128<<24-d%32,b[(d+128>>>10<<5)+30]=Math.floor(c/4294967296),b[(d+128>>>10<<5)+31]=c,a.sigBytes=4*b.length,this._process();var e=this._hash.toX32();return e},clone:function(){var a=e.clone.call(this);return a._hash=this._hash.clone(),a},blockSize:32});c.SHA512=e._createHelper(l),c.HmacSHA512=e._createHmacHelper(l)}(),a.SHA512})},{"./core":46,"./x64-core":77}],76:[function(a,b,c){!function(d,e,f){"object"==typeof c?b.exports=c=e(a("./core"),a("./enc-base64"),a("./md5"),a("./evpkdf"),a("./cipher-core")):"function"==typeof define&&define.amd?define(["./core","./enc-base64","./md5","./evpkdf","./cipher-core"],e):e(d.CryptoJS)}(this,function(a){return function(){function b(a,b){var c=(this._lBlock>>>a^this._rBlock)&b;this._rBlock^=c,this._lBlock^=c<<a}function c(a,b){var c=(this._rBlock>>>a^this._lBlock)&b;this._lBlock^=c,this._rBlock^=c<<a}var d=a,e=d.lib,f=e.WordArray,g=e.BlockCipher,h=d.algo,i=[57,49,41,33,25,17,9,1,58,50,42,34,26,18,10,2,59,51,43,35,27,19,11,3,60,52,44,36,63,55,47,39,31,23,15,7,62,54,46,38,30,22,14,6,61,53,45,37,29,21,13,5,28,20,12,4],j=[14,17,11,24,1,5,3,28,15,6,21,10,23,19,12,4,26,8,16,7,27,20,13,2,41,52,31,37,47,55,30,40,51,45,33,48,44,49,39,56,34,53,46,42,50,36,29,32],k=[1,2,4,6,8,10,12,14,15,17,19,21,23,25,27,28],l=[{0:8421888,268435456:32768,536870912:8421378,805306368:2,1073741824:512,1342177280:8421890,1610612736:8389122,1879048192:8388608,2147483648:514,2415919104:8389120,2684354560:33280,2952790016:8421376,3221225472:32770,3489660928:8388610,3758096384:0,4026531840:33282,134217728:0,402653184:8421890,671088640:33282,939524096:32768,1207959552:8421888,1476395008:512,1744830464:8421378,2013265920:2,2281701376:8389120,2550136832:33280,2818572288:8421376,3087007744:8389122,3355443200:8388610,3623878656:32770,3892314112:514,4160749568:8388608,1:32768,268435457:2,536870913:8421888,805306369:8388608,1073741825:8421378,1342177281:33280,1610612737:512,1879048193:8389122,2147483649:8421890,2415919105:8421376,2684354561:8388610,2952790017:33282,3221225473:514,3489660929:8389120,3758096385:32770,4026531841:0,134217729:8421890,402653185:8421376,671088641:8388608,939524097:512,1207959553:32768,1476395009:8388610,1744830465:2,2013265921:33282,2281701377:32770,2550136833:8389122,2818572289:514,3087007745:8421888,3355443201:8389120,3623878657:0,3892314113:33280,4160749569:8421378},{0:1074282512,16777216:16384,33554432:524288,50331648:1074266128,67108864:1073741840,83886080:1074282496,100663296:1073758208,117440512:16,134217728:540672,150994944:1073758224,167772160:1073741824,184549376:540688,201326592:524304,218103808:0,234881024:16400,251658240:1074266112,8388608:1073758208,25165824:540688,41943040:16,58720256:1073758224,75497472:1074282512,92274688:1073741824,109051904:524288,125829120:1074266128,142606336:524304,159383552:0,176160768:16384,192937984:1074266112,209715200:1073741840,226492416:540672,243269632:1074282496,260046848:16400,268435456:0,285212672:1074266128,301989888:1073758224,318767104:1074282496,335544320:1074266112,352321536:16,369098752:540688,385875968:16384,402653184:16400,419430400:524288,436207616:524304,452984832:1073741840,469762048:540672,486539264:1073758208,503316480:1073741824,520093696:1074282512,276824064:540688,293601280:524288,310378496:1074266112,327155712:16384,343932928:1073758208,360710144:1074282512,377487360:16,394264576:1073741824,411041792:1074282496,427819008:1073741840,444596224:1073758224,461373440:524304,478150656:0,494927872:16400,511705088:1074266128,528482304:540672},{0:260,1048576:0,2097152:67109120,3145728:65796,4194304:65540,5242880:67108868,6291456:67174660,7340032:67174400,8388608:67108864,9437184:67174656,10485760:65792,11534336:67174404,12582912:67109124,13631488:65536,14680064:4,15728640:256,524288:67174656,1572864:67174404,2621440:0,3670016:67109120,4718592:67108868,5767168:65536,6815744:65540,7864320:260,8912896:4,9961472:256,11010048:67174400,12058624:65796,13107200:65792,14155776:67109124,15204352:67174660,16252928:67108864,16777216:67174656,17825792:65540,18874368:65536,19922944:67109120,20971520:256,22020096:67174660,23068672:67108868,24117248:0,25165824:67109124,26214400:67108864,27262976:4,28311552:65792,29360128:67174400,30408704:260,31457280:65796,32505856:67174404,17301504:67108864,18350080:260,19398656:67174656,20447232:0,21495808:65540,22544384:67109120,23592960:256,24641536:67174404,25690112:65536,26738688:67174660,27787264:65796,28835840:67108868,29884416:67109124,30932992:67174400,31981568:4,33030144:65792},{0:2151682048,65536:2147487808,131072:4198464,196608:2151677952,262144:0,327680:4198400,393216:2147483712,458752:4194368,524288:2147483648,589824:4194304,655360:64,720896:2147487744,786432:2151678016,851968:4160,917504:4096,983040:2151682112,32768:2147487808,98304:64,163840:2151678016,229376:2147487744,294912:4198400,360448:2151682112,425984:0,491520:2151677952,557056:4096,622592:2151682048,688128:4194304,753664:4160,819200:2147483648,884736:4194368,950272:4198464,1015808:2147483712,1048576:4194368,1114112:4198400,1179648:2147483712,1245184:0,1310720:4160,1376256:2151678016,1441792:2151682048,1507328:2147487808,1572864:2151682112,1638400:2147483648,1703936:2151677952,1769472:4198464,1835008:2147487744,1900544:4194304,1966080:64,2031616:4096,1081344:2151677952,1146880:2151682112,1212416:0,1277952:4198400,1343488:4194368,1409024:2147483648,1474560:2147487808,1540096:64,1605632:2147483712,1671168:4096,1736704:2147487744,1802240:2151678016,1867776:4160,1933312:2151682048,1998848:4194304,2064384:4198464},{0:128,4096:17039360,8192:262144,12288:536870912,16384:537133184,20480:16777344,24576:553648256,28672:262272,32768:16777216,36864:537133056,40960:536871040,45056:553910400,49152:553910272,53248:0,57344:17039488,61440:553648128,2048:17039488,6144:553648256,10240:128,14336:17039360,18432:262144,22528:537133184,26624:553910272,30720:536870912,34816:537133056,38912:0,43008:553910400,47104:16777344,51200:536871040,55296:553648128,59392:16777216,63488:262272,65536:262144,69632:128,73728:536870912,77824:553648256,81920:16777344,86016:553910272,90112:537133184,94208:16777216,98304:553910400,102400:553648128,106496:17039360,110592:537133056,114688:262272,118784:536871040,122880:0,126976:17039488,67584:553648256,71680:16777216,75776:17039360,79872:537133184,83968:536870912,88064:17039488,92160:128,96256:553910272,100352:262272,104448:553910400,108544:0,112640:553648128,116736:16777344,120832:262144,124928:537133056,129024:536871040},{0:268435464,256:8192,512:270532608,768:270540808,1024:268443648,1280:2097152,1536:2097160,1792:268435456,2048:0,2304:268443656,2560:2105344,2816:8,3072:270532616,3328:2105352,3584:8200,3840:270540800,128:270532608,384:270540808,640:8,896:2097152,1152:2105352,1408:268435464,1664:268443648,1920:8200,2176:2097160,2432:8192,2688:268443656,2944:270532616,3200:0,3456:270540800,3712:2105344,3968:268435456,4096:268443648,4352:270532616,4608:270540808,4864:8200,5120:2097152,5376:268435456,5632:268435464,5888:2105344,6144:2105352,6400:0,6656:8,6912:270532608,7168:8192,7424:268443656,7680:270540800,7936:2097160,4224:8,4480:2105344,4736:2097152,4992:268435464,5248:268443648,5504:8200,5760:270540808,6016:270532608,6272:270540800,6528:270532616,6784:8192,7040:2105352,7296:2097160,7552:0,7808:268435456,8064:268443656},{0:1048576,16:33555457,32:1024,48:1049601,64:34604033,80:0,96:1,112:34603009,128:33555456,144:1048577,160:33554433,176:34604032,192:34603008,208:1025,224:1049600,240:33554432,8:34603009,24:0,40:33555457,56:34604032,72:1048576,88:33554433,104:33554432,120:1025,136:1049601,152:33555456,168:34603008,184:1048577,200:1024,216:34604033,232:1,248:1049600,256:33554432,272:1048576,288:33555457,304:34603009,320:1048577,336:33555456,352:34604032,368:1049601,384:1025,400:34604033,416:1049600,432:1,448:0,464:34603008,480:33554433,496:1024,264:1049600,280:33555457,296:34603009,312:1,328:33554432,344:1048576,360:1025,376:34604032,392:33554433,408:34603008,424:0,440:34604033,456:1049601,472:1024,488:33555456,504:1048577},{0:134219808,1:131072,2:134217728,3:32,4:131104,5:134350880,6:134350848,7:2048,8:134348800,9:134219776,10:133120,11:134348832,12:2080,13:0,14:134217760,15:133152,2147483648:2048,2147483649:134350880,2147483650:134219808,2147483651:134217728,2147483652:134348800,2147483653:133120,2147483654:133152,2147483655:32,2147483656:134217760,2147483657:2080,2147483658:131104,2147483659:134350848,2147483660:0,2147483661:134348832,2147483662:134219776,2147483663:131072,16:133152,17:134350848,18:32,19:2048,20:134219776,21:134217760,22:134348832,23:131072,24:0,25:131104,26:134348800,27:134219808,28:134350880,29:133120,30:2080,31:134217728,2147483664:131072,2147483665:2048,2147483666:134348832,2147483667:133152,2147483668:32,2147483669:134348800,2147483670:134217728,2147483671:134219808,2147483672:134350880,2147483673:134217760,2147483674:134219776,2147483675:0,2147483676:133120,2147483677:2080,2147483678:131104,2147483679:134350848}],m=[4160749569,528482304,33030144,2064384,129024,8064,504,2147483679],n=h.DES=g.extend({_doReset:function(){for(var a=this._key,b=a.words,c=[],d=0;d<56;d++){var e=i[d]-1;c[d]=b[e>>>5]>>>31-e%32&1}for(var f=this._subKeys=[],g=0;g<16;g++){for(var h=f[g]=[],l=k[g],d=0;d<24;d++)h[d/6|0]|=c[(j[d]-1+l)%28]<<31-d%6,h[4+(d/6|0)]|=c[28+(j[d+24]-1+l)%28]<<31-d%6;h[0]=h[0]<<1|h[0]>>>31;for(var d=1;d<7;d++)h[d]=h[d]>>>4*(d-1)+3;h[7]=h[7]<<5|h[7]>>>27}for(var m=this._invSubKeys=[],d=0;d<16;d++)m[d]=f[15-d]},encryptBlock:function(a,b){this._doCryptBlock(a,b,this._subKeys)},decryptBlock:function(a,b){this._doCryptBlock(a,b,this._invSubKeys)},_doCryptBlock:function(a,d,e){this._lBlock=a[d],this._rBlock=a[d+1],b.call(this,4,252645135),b.call(this,16,65535),c.call(this,2,858993459),c.call(this,8,16711935),b.call(this,1,1431655765);for(var f=0;f<16;f++){for(var g=e[f],h=this._lBlock,i=this._rBlock,j=0,k=0;k<8;k++)j|=l[k][((i^g[k])&m[k])>>>0];this._lBlock=i,this._rBlock=h^j}var n=this._lBlock;this._lBlock=this._rBlock,this._rBlock=n,b.call(this,1,1431655765),c.call(this,8,16711935),c.call(this,2,858993459),b.call(this,16,65535),b.call(this,4,252645135),a[d]=this._lBlock,a[d+1]=this._rBlock},keySize:2,ivSize:2,blockSize:2});d.DES=g._createHelper(n);var o=h.TripleDES=g.extend({_doReset:function(){var a=this._key,b=a.words;this._des1=n.createEncryptor(f.create(b.slice(0,2))),this._des2=n.createEncryptor(f.create(b.slice(2,4))),this._des3=n.createEncryptor(f.create(b.slice(4,6)))},encryptBlock:function(a,b){this._des1.encryptBlock(a,b),this._des2.decryptBlock(a,b),this._des3.encryptBlock(a,b)},decryptBlock:function(a,b){this._des3.decryptBlock(a,b),this._des2.encryptBlock(a,b),this._des1.decryptBlock(a,b)},keySize:6,ivSize:2,blockSize:2});d.TripleDES=g._createHelper(o)}(),a.TripleDES})},{"./cipher-core":45,"./core":46,"./enc-base64":47,"./evpkdf":49,"./md5":54}],77:[function(a,b,c){!function(d,e){"object"==typeof c?b.exports=c=e(a("./core")):"function"==typeof define&&define.amd?define(["./core"],e):e(d.CryptoJS)}(this,function(a){return function(b){var c=a,d=c.lib,e=d.Base,f=d.WordArray,g=c.x64={};g.Word=e.extend({init:function(a,b){this.high=a,this.low=b}}),g.WordArray=e.extend({init:function(a,c){a=this.words=a||[],c!=b?this.sigBytes=c:this.sigBytes=8*a.length},toX32:function(){for(var a=this.words,b=a.length,c=[],d=0;d<b;d++){var e=a[d];c.push(e.high),c.push(e.low)}return f.create(c,this.sigBytes)},clone:function(){for(var a=e.clone.call(this),b=a.words=this.words.slice(0),c=b.length,d=0;d<c;d++)b[d]=b[d].clone();return a}})}(),a})},{"./core":46}],78:[function(a,b,c){function d(){throw new Error("setTimeout has not been defined")}function e(){throw new Error("clearTimeout has not been defined")}function f(a){if(l===setTimeout)return setTimeout(a,0);if((l===d||!l)&&setTimeout)return l=setTimeout,setTimeout(a,0);try{return l(a,0)}catch(b){try{return l.call(null,a,0)}catch(b){return l.call(this,a,0)}}}function g(a){if(m===clearTimeout)return clearTimeout(a);if((m===e||!m)&&clearTimeout)return m=clearTimeout,clearTimeout(a);try{return m(a)}catch(b){try{return m.call(null,a)}catch(b){return m.call(this,a)}}}function h(){q&&o&&(q=!1,o.length?p=o.concat(p):r=-1,p.length&&i())}function i(){if(!q){var a=f(h);q=!0;for(var b=p.length;b;){for(o=p,p=[];++r<b;)o&&o[r].run();r=-1,b=p.length}o=null,q=!1,g(a)}}function j(a,b){this.fun=a,this.array=b}function k(){}var l,m,n=b.exports={};!function(){try{l="function"==typeof setTimeout?setTimeout:d}catch(a){l=d}try{m="function"==typeof clearTimeout?clearTimeout:e}catch(a){m=e}}();var o,p=[],q=!1,r=-1;n.nextTick=function(a){var b=new Array(arguments.length-1);if(arguments.length>1)for(var c=1;c<arguments.length;c++)b[c-1]=arguments[c];p.push(new j(a,b)),1!==p.length||q||f(i)},j.prototype.run=function(){this.fun.apply(null,this.array)},n.title="browser",n.browser=!0,n.env={},n.argv=[],n.version="",n.versions={},n.on=k,n.addListener=k,n.once=k,n.off=k,n.removeListener=k,n.removeAllListeners=k,n.emit=k,n.binding=function(a){throw new Error("process.binding is not supported")},n.cwd=function(){return"/"},n.chdir=function(a){throw new Error("process.chdir is not supported")},n.umask=function(){return 0}},{}],79:[function(a,b,c){(function(d){!function(a){if("object"==typeof c&&"undefined"!=typeof b)b.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof d?d:"undefined"!=typeof self?self:this,e.localforage=a()}}(function(){return function b(c,d,e){function f(h,i){if(!d[h]){if(!c[h]){var j="function"==typeof a&&a;if(!i&&j)return j(h,!0);if(g)return g(h,!0);var k=new Error("Cannot find module '"+h+"'");throw k.code="MODULE_NOT_FOUND",k}var l=d[h]={exports:{}};c[h][0].call(l.exports,function(a){var b=c[h][1][a];return f(b?b:a)},l,l.exports,b,c,d,e)}return d[h].exports}for(var g="function"==typeof a&&a,h=0;h<e.length;h++)f(e[h]);return f}({1:[function(a,b,c){"use strict";function d(){}function e(a){if("function"!=typeof a)throw new TypeError("resolver must be a function");this.state=s,this.queue=[],this.outcome=void 0,a!==d&&i(this,a)}function f(a,b,c){this.promise=a,"function"==typeof b&&(this.onFulfilled=b,this.callFulfilled=this.otherCallFulfilled),"function"==typeof c&&(this.onRejected=c,this.callRejected=this.otherCallRejected)}function g(a,b,c){o(function(){var d;try{d=b(c)}catch(b){return p.reject(a,b)}d===a?p.reject(a,new TypeError("Cannot resolve promise with itself")):p.resolve(a,d)})}function h(a){var b=a&&a.then;if(a&&"object"==typeof a&&"function"==typeof b)return function(){b.apply(a,arguments)}}function i(a,b){function c(b){f||(f=!0,p.reject(a,b))}function d(b){f||(f=!0,p.resolve(a,b))}function e(){b(d,c)}var f=!1,g=j(e);"error"===g.status&&c(g.value)}function j(a,b){var c={};try{c.value=a(b),c.status="success"}catch(a){c.status="error",c.value=a}return c}function k(a){return a instanceof this?a:p.resolve(new this(d),a)}function l(a){var b=new this(d);return p.reject(b,a)}function m(a){function b(a,b){function d(a){g[b]=a,++h!==e||f||(f=!0,p.resolve(j,g))}c.resolve(a).then(d,function(a){f||(f=!0,p.reject(j,a))})}var c=this;if("[object Array]"!==Object.prototype.toString.call(a))return this.reject(new TypeError("must be an array"));var e=a.length,f=!1;if(!e)return this.resolve([]);for(var g=new Array(e),h=0,i=-1,j=new this(d);++i<e;)b(a[i],i);return j}function n(a){function b(a){c.resolve(a).then(function(a){f||(f=!0,p.resolve(h,a))},function(a){f||(f=!0,p.reject(h,a))})}var c=this;if("[object Array]"!==Object.prototype.toString.call(a))return this.reject(new TypeError("must be an array"));var e=a.length,f=!1;if(!e)return this.resolve([]);for(var g=-1,h=new this(d);++g<e;)b(a[g]);return h}var o=a(2),p={},q=["REJECTED"],r=["FULFILLED"],s=["PENDING"];b.exports=c=e,e.prototype.catch=function(a){return this.then(null,a)},e.prototype.then=function(a,b){if("function"!=typeof a&&this.state===r||"function"!=typeof b&&this.state===q)return this;var c=new this.constructor(d);if(this.state!==s){var e=this.state===r?a:b;g(c,e,this.outcome)}else this.queue.push(new f(c,a,b));return c},f.prototype.callFulfilled=function(a){p.resolve(this.promise,a)},f.prototype.otherCallFulfilled=function(a){g(this.promise,this.onFulfilled,a)},f.prototype.callRejected=function(a){p.reject(this.promise,a)},f.prototype.otherCallRejected=function(a){g(this.promise,this.onRejected,a)},p.resolve=function(a,b){var c=j(h,b);if("error"===c.status)return p.reject(a,c.value);var d=c.value;if(d)i(a,d);else{a.state=r,a.outcome=b;for(var e=-1,f=a.queue.length;++e<f;)a.queue[e].callFulfilled(b)}return a},p.reject=function(a,b){a.state=q,a.outcome=b;for(var c=-1,d=a.queue.length;++c<d;)a.queue[c].callRejected(b);return a},c.resolve=k,c.reject=l,c.all=m,c.race=n},{2:2}],2:[function(a,b,c){(function(a){"use strict";function c(){k=!0;for(var a,b,c=l.length;c;){for(b=l,l=[],a=-1;++a<c;)b[a]();c=l.length}k=!1}function d(a){1!==l.push(a)||k||e()}var e,f=a.MutationObserver||a.WebKitMutationObserver;if(f){var g=0,h=new f(c),i=a.document.createTextNode("");h.observe(i,{characterData:!0}),e=function(){i.data=g=++g%2}}else if(a.setImmediate||"undefined"==typeof a.MessageChannel)e="document"in a&&"onreadystatechange"in a.document.createElement("script")?function(){var b=a.document.createElement("script");b.onreadystatechange=function(){c(),b.onreadystatechange=null,b.parentNode.removeChild(b),b=null},a.document.documentElement.appendChild(b)}:function(){setTimeout(c,0)};else{var j=new a.MessageChannel;j.port1.onmessage=c,e=function(){j.port2.postMessage(0)}}var k,l=[];b.exports=d}).call(this,"undefined"!=typeof d?d:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],3:[function(a,b,c){(function(b){"use strict";"function"!=typeof b.Promise&&(b.Promise=a(1))}).call(this,"undefined"!=typeof d?d:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{1:1}],4:[function(a,b,c){"use strict";function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function e(){try{if("undefined"!=typeof indexedDB)return indexedDB;if("undefined"!=typeof webkitIndexedDB)return webkitIndexedDB;if("undefined"!=typeof mozIndexedDB)return mozIndexedDB;if("undefined"!=typeof OIndexedDB)return OIndexedDB;if("undefined"!=typeof msIndexedDB)return msIndexedDB}catch(a){}}function f(){try{return!!fa&&(!("undefined"!=typeof openDatabase&&"undefined"!=typeof navigator&&navigator.userAgent&&/Safari/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent))&&(fa&&"function"==typeof fa.open&&"undefined"!=typeof IDBKeyRange))}catch(a){return!1}}function g(){return"function"==typeof openDatabase}function h(){try{return"undefined"!=typeof localStorage&&"setItem"in localStorage&&localStorage.setItem}catch(a){return!1}}function i(a,b){a=a||[],b=b||{};try{return new Blob(a,b)}catch(f){if("TypeError"!==f.name)throw f;for(var c="undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof MSBlobBuilder?MSBlobBuilder:"undefined"!=typeof MozBlobBuilder?MozBlobBuilder:WebKitBlobBuilder,d=new c,e=0;e<a.length;e+=1)d.append(a[e]);return d.getBlob(b.type)}}function j(a,b){b&&a.then(function(a){b(null,a)},function(a){b(a)})}function k(a,b,c){"function"==typeof b&&a.then(b),"function"==typeof c&&a.catch(c)}function l(a){for(var b=a.length,c=new ArrayBuffer(b),d=new Uint8Array(c),e=0;e<b;e++)d[e]=a.charCodeAt(e);return c}function m(a){return new ia(function(b){var c=i([""]);a.objectStore(ja).put(c,"key"),a.onabort=function(a){a.preventDefault(),a.stopPropagation(),b(!1)},a.oncomplete=function(){var a=navigator.userAgent.match(/Chrome\/(\d+)/),c=navigator.userAgent.match(/Edge\//);
b(c||!a||parseInt(a[1],10)>=43)}}).catch(function(){return!1})}function n(a){return"boolean"==typeof ga?ia.resolve(ga):m(a).then(function(a){return ga=a})}function o(a){var b=ha[a.name],c={};c.promise=new ia(function(a){c.resolve=a}),b.deferredOperations.push(c),b.dbReady?b.dbReady=b.dbReady.then(function(){return c.promise}):b.dbReady=c.promise}function p(a){var b=ha[a.name],c=b.deferredOperations.pop();c&&c.resolve()}function q(a,b){return new ia(function(c,d){if(a.db){if(!b)return c(a.db);o(a),a.db.close()}var e=[a.name];b&&e.push(a.version);var f=fa.open.apply(fa,e);b&&(f.onupgradeneeded=function(b){var c=f.result;try{c.createObjectStore(a.storeName),b.oldVersion<=1&&c.createObjectStore(ja)}catch(c){if("ConstraintError"!==c.name)throw c;console.warn('The database "'+a.name+'" has been upgraded from version '+b.oldVersion+" to version "+b.newVersion+', but the storage "'+a.storeName+'" already exists.')}}),f.onerror=function(){d(f.error)},f.onsuccess=function(){c(f.result),p(a)}})}function r(a){return q(a,!1)}function s(a){return q(a,!0)}function t(a,b){if(!a.db)return!0;var c=!a.db.objectStoreNames.contains(a.storeName),d=a.version<a.db.version,e=a.version>a.db.version;if(d&&(a.version!==b&&console.warn('The database "'+a.name+"\" can't be downgraded from version "+a.db.version+" to version "+a.version+"."),a.version=a.db.version),e||c){if(c){var f=a.db.version+1;f>a.version&&(a.version=f)}return!0}return!1}function u(a){return new ia(function(b,c){var d=new FileReader;d.onerror=c,d.onloadend=function(c){var d=btoa(c.target.result||"");b({__local_forage_encoded_blob:!0,data:d,type:a.type})},d.readAsBinaryString(a)})}function v(a){var b=l(atob(a.data));return i([b],{type:a.type})}function w(a){return a&&a.__local_forage_encoded_blob}function x(a){var b=this,c=b._initReady().then(function(){var a=ha[b._dbInfo.name];if(a&&a.dbReady)return a.dbReady});return k(c,a,a),c}function y(a){function b(){return ia.resolve()}var c=this,d={db:null};if(a)for(var e in a)d[e]=a[e];ha||(ha={});var f=ha[d.name];f||(f={forages:[],db:null,dbReady:null,deferredOperations:[]},ha[d.name]=f),f.forages.push(c),c._initReady||(c._initReady=c.ready,c.ready=x);for(var g=[],h=0;h<f.forages.length;h++){var i=f.forages[h];i!==c&&g.push(i._initReady().catch(b))}var j=f.forages.slice(0);return ia.all(g).then(function(){return d.db=f.db,r(d)}).then(function(a){return d.db=a,t(d,c._defaultConfig.version)?s(d):a}).then(function(a){d.db=f.db=a,c._dbInfo=d;for(var b=0;b<j.length;b++){var e=j[b];e!==c&&(e._dbInfo.db=d.db,e._dbInfo.version=d.version)}})}function z(a,b){var c=this;"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a));var d=new ia(function(b,d){c.ready().then(function(){var e=c._dbInfo,f=e.db.transaction(e.storeName,"readonly").objectStore(e.storeName),g=f.get(a);g.onsuccess=function(){var a=g.result;void 0===a&&(a=null),w(a)&&(a=v(a)),b(a)},g.onerror=function(){d(g.error)}}).catch(d)});return j(d,b),d}function A(a,b){var c=this,d=new ia(function(b,d){c.ready().then(function(){var e=c._dbInfo,f=e.db.transaction(e.storeName,"readonly").objectStore(e.storeName),g=f.openCursor(),h=1;g.onsuccess=function(){var c=g.result;if(c){var d=c.value;w(d)&&(d=v(d));var e=a(d,c.key,h++);void 0!==e?b(e):c.continue()}else b()},g.onerror=function(){d(g.error)}}).catch(d)});return j(d,b),d}function B(a,b,c){var d=this;"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a));var e=new ia(function(c,e){var f;d.ready().then(function(){return f=d._dbInfo,"[object Blob]"===ka.call(b)?n(f.db).then(function(a){return a?b:u(b)}):b}).then(function(b){var d=f.db.transaction(f.storeName,"readwrite"),g=d.objectStore(f.storeName);null===b&&(b=void 0),d.oncomplete=function(){void 0===b&&(b=null),c(b)},d.onabort=d.onerror=function(){var a=h.error?h.error:h.transaction.error;e(a)};var h=g.put(b,a)}).catch(e)});return j(e,c),e}function C(a,b){var c=this;"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a));var d=new ia(function(b,d){c.ready().then(function(){var e=c._dbInfo,f=e.db.transaction(e.storeName,"readwrite"),g=f.objectStore(e.storeName),h=g.delete(a);f.oncomplete=function(){b()},f.onerror=function(){d(h.error)},f.onabort=function(){var a=h.error?h.error:h.transaction.error;d(a)}}).catch(d)});return j(d,b),d}function D(a){var b=this,c=new ia(function(a,c){b.ready().then(function(){var d=b._dbInfo,e=d.db.transaction(d.storeName,"readwrite"),f=e.objectStore(d.storeName),g=f.clear();e.oncomplete=function(){a()},e.onabort=e.onerror=function(){var a=g.error?g.error:g.transaction.error;c(a)}}).catch(c)});return j(c,a),c}function E(a){var b=this,c=new ia(function(a,c){b.ready().then(function(){var d=b._dbInfo,e=d.db.transaction(d.storeName,"readonly").objectStore(d.storeName),f=e.count();f.onsuccess=function(){a(f.result)},f.onerror=function(){c(f.error)}}).catch(c)});return j(c,a),c}function F(a,b){var c=this,d=new ia(function(b,d){return a<0?void b(null):void c.ready().then(function(){var e=c._dbInfo,f=e.db.transaction(e.storeName,"readonly").objectStore(e.storeName),g=!1,h=f.openCursor();h.onsuccess=function(){var c=h.result;return c?void(0===a?b(c.key):g?b(c.key):(g=!0,c.advance(a))):void b(null)},h.onerror=function(){d(h.error)}}).catch(d)});return j(d,b),d}function G(a){var b=this,c=new ia(function(a,c){b.ready().then(function(){var d=b._dbInfo,e=d.db.transaction(d.storeName,"readonly").objectStore(d.storeName),f=e.openCursor(),g=[];f.onsuccess=function(){var b=f.result;return b?(g.push(b.key),void b.continue()):void a(g)},f.onerror=function(){c(f.error)}}).catch(c)});return j(c,a),c}function H(a){var b,c,d,e,f,g=.75*a.length,h=a.length,i=0;"="===a[a.length-1]&&(g--,"="===a[a.length-2]&&g--);var j=new ArrayBuffer(g),k=new Uint8Array(j);for(b=0;b<h;b+=4)c=ma.indexOf(a[b]),d=ma.indexOf(a[b+1]),e=ma.indexOf(a[b+2]),f=ma.indexOf(a[b+3]),k[i++]=c<<2|d>>4,k[i++]=(15&d)<<4|e>>2,k[i++]=(3&e)<<6|63&f;return j}function I(a){var b,c=new Uint8Array(a),d="";for(b=0;b<c.length;b+=3)d+=ma[c[b]>>2],d+=ma[(3&c[b])<<4|c[b+1]>>4],d+=ma[(15&c[b+1])<<2|c[b+2]>>6],d+=ma[63&c[b+2]];return c.length%3===2?d=d.substring(0,d.length-1)+"=":c.length%3===1&&(d=d.substring(0,d.length-2)+"=="),d}function J(a,b){var c="";if(a&&(c=Da.call(a)),a&&("[object ArrayBuffer]"===c||a.buffer&&"[object ArrayBuffer]"===Da.call(a.buffer))){var d,e=pa;a instanceof ArrayBuffer?(d=a,e+=ra):(d=a.buffer,"[object Int8Array]"===c?e+=ta:"[object Uint8Array]"===c?e+=ua:"[object Uint8ClampedArray]"===c?e+=va:"[object Int16Array]"===c?e+=wa:"[object Uint16Array]"===c?e+=ya:"[object Int32Array]"===c?e+=xa:"[object Uint32Array]"===c?e+=za:"[object Float32Array]"===c?e+=Aa:"[object Float64Array]"===c?e+=Ba:b(new Error("Failed to get type for BinaryArray"))),b(e+I(d))}else if("[object Blob]"===c){var f=new FileReader;f.onload=function(){var c=na+a.type+"~"+I(this.result);b(pa+sa+c)},f.readAsArrayBuffer(a)}else try{b(JSON.stringify(a))}catch(c){console.error("Couldn't convert value into a JSON string: ",a),b(null,c)}}function K(a){if(a.substring(0,qa)!==pa)return JSON.parse(a);var b,c=a.substring(Ca),d=a.substring(qa,Ca);if(d===sa&&oa.test(c)){var e=c.match(oa);b=e[1],c=c.substring(e[0].length)}var f=H(c);switch(d){case ra:return f;case sa:return i([f],{type:b});case ta:return new Int8Array(f);case ua:return new Uint8Array(f);case va:return new Uint8ClampedArray(f);case wa:return new Int16Array(f);case ya:return new Uint16Array(f);case xa:return new Int32Array(f);case za:return new Uint32Array(f);case Aa:return new Float32Array(f);case Ba:return new Float64Array(f);default:throw new Error("Unkown type: "+d)}}function L(a){var b=this,c={db:null};if(a)for(var d in a)c[d]="string"!=typeof a[d]?a[d].toString():a[d];var e=new ia(function(a,d){try{c.db=openDatabase(c.name,String(c.version),c.description,c.size)}catch(a){return d(a)}c.db.transaction(function(e){e.executeSql("CREATE TABLE IF NOT EXISTS "+c.storeName+" (id INTEGER PRIMARY KEY, key unique, value)",[],function(){b._dbInfo=c,a()},function(a,b){d(b)})})});return c.serializer=Ea,e}function M(a,b){var c=this;"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a));var d=new ia(function(b,d){c.ready().then(function(){var e=c._dbInfo;e.db.transaction(function(c){c.executeSql("SELECT * FROM "+e.storeName+" WHERE key = ? LIMIT 1",[a],function(a,c){var d=c.rows.length?c.rows.item(0).value:null;d&&(d=e.serializer.deserialize(d)),b(d)},function(a,b){d(b)})})}).catch(d)});return j(d,b),d}function N(a,b){var c=this,d=new ia(function(b,d){c.ready().then(function(){var e=c._dbInfo;e.db.transaction(function(c){c.executeSql("SELECT * FROM "+e.storeName,[],function(c,d){for(var f=d.rows,g=f.length,h=0;h<g;h++){var i=f.item(h),j=i.value;if(j&&(j=e.serializer.deserialize(j)),j=a(j,i.key,h+1),void 0!==j)return void b(j)}b()},function(a,b){d(b)})})}).catch(d)});return j(d,b),d}function O(a,b,c){var d=this;"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a));var e=new ia(function(c,e){d.ready().then(function(){void 0===b&&(b=null);var f=b,g=d._dbInfo;g.serializer.serialize(b,function(b,d){d?e(d):g.db.transaction(function(d){d.executeSql("INSERT OR REPLACE INTO "+g.storeName+" (key, value) VALUES (?, ?)",[a,b],function(){c(f)},function(a,b){e(b)})},function(a){a.code===a.QUOTA_ERR&&e(a)})})}).catch(e)});return j(e,c),e}function P(a,b){var c=this;"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a));var d=new ia(function(b,d){c.ready().then(function(){var e=c._dbInfo;e.db.transaction(function(c){c.executeSql("DELETE FROM "+e.storeName+" WHERE key = ?",[a],function(){b()},function(a,b){d(b)})})}).catch(d)});return j(d,b),d}function Q(a){var b=this,c=new ia(function(a,c){b.ready().then(function(){var d=b._dbInfo;d.db.transaction(function(b){b.executeSql("DELETE FROM "+d.storeName,[],function(){a()},function(a,b){c(b)})})}).catch(c)});return j(c,a),c}function R(a){var b=this,c=new ia(function(a,c){b.ready().then(function(){var d=b._dbInfo;d.db.transaction(function(b){b.executeSql("SELECT COUNT(key) as c FROM "+d.storeName,[],function(b,c){var d=c.rows.item(0).c;a(d)},function(a,b){c(b)})})}).catch(c)});return j(c,a),c}function S(a,b){var c=this,d=new ia(function(b,d){c.ready().then(function(){var e=c._dbInfo;e.db.transaction(function(c){c.executeSql("SELECT key FROM "+e.storeName+" WHERE id = ? LIMIT 1",[a+1],function(a,c){var d=c.rows.length?c.rows.item(0).key:null;b(d)},function(a,b){d(b)})})}).catch(d)});return j(d,b),d}function T(a){var b=this,c=new ia(function(a,c){b.ready().then(function(){var d=b._dbInfo;d.db.transaction(function(b){b.executeSql("SELECT key FROM "+d.storeName,[],function(b,c){for(var d=[],e=0;e<c.rows.length;e++)d.push(c.rows.item(e).key);a(d)},function(a,b){c(b)})})}).catch(c)});return j(c,a),c}function U(a){var b=this,c={};if(a)for(var d in a)c[d]=a[d];return c.keyPrefix=c.name+"/",c.storeName!==b._defaultConfig.storeName&&(c.keyPrefix+=c.storeName+"/"),b._dbInfo=c,c.serializer=Ea,ia.resolve()}function V(a){var b=this,c=b.ready().then(function(){for(var a=b._dbInfo.keyPrefix,c=localStorage.length-1;c>=0;c--){var d=localStorage.key(c);0===d.indexOf(a)&&localStorage.removeItem(d)}});return j(c,a),c}function W(a,b){var c=this;"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a));var d=c.ready().then(function(){var b=c._dbInfo,d=localStorage.getItem(b.keyPrefix+a);return d&&(d=b.serializer.deserialize(d)),d});return j(d,b),d}function X(a,b){var c=this,d=c.ready().then(function(){for(var b=c._dbInfo,d=b.keyPrefix,e=d.length,f=localStorage.length,g=1,h=0;h<f;h++){var i=localStorage.key(h);if(0===i.indexOf(d)){var j=localStorage.getItem(i);if(j&&(j=b.serializer.deserialize(j)),j=a(j,i.substring(e),g++),void 0!==j)return j}}});return j(d,b),d}function Y(a,b){var c=this,d=c.ready().then(function(){var b,d=c._dbInfo;try{b=localStorage.key(a)}catch(a){b=null}return b&&(b=b.substring(d.keyPrefix.length)),b});return j(d,b),d}function Z(a){var b=this,c=b.ready().then(function(){for(var a=b._dbInfo,c=localStorage.length,d=[],e=0;e<c;e++)0===localStorage.key(e).indexOf(a.keyPrefix)&&d.push(localStorage.key(e).substring(a.keyPrefix.length));return d});return j(c,a),c}function $(a){var b=this,c=b.keys().then(function(a){return a.length});return j(c,a),c}function _(a,b){var c=this;"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a));var d=c.ready().then(function(){var b=c._dbInfo;localStorage.removeItem(b.keyPrefix+a)});return j(d,b),d}function aa(a,b,c){var d=this;"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a));var e=d.ready().then(function(){void 0===b&&(b=null);var c=b;return new ia(function(e,f){var g=d._dbInfo;g.serializer.serialize(b,function(b,d){if(d)f(d);else try{localStorage.setItem(g.keyPrefix+a,b),e(c)}catch(a){"QuotaExceededError"!==a.name&&"NS_ERROR_DOM_QUOTA_REACHED"!==a.name||f(a),f(a)}})})});return j(e,c),e}function ba(a,b){a[b]=function(){var c=arguments;return a.ready().then(function(){return a[b].apply(a,c)})}}function ca(){for(var a=1;a<arguments.length;a++){var b=arguments[a];if(b)for(var c in b)b.hasOwnProperty(c)&&(Na(b[c])?arguments[0][c]=b[c].slice():arguments[0][c]=b[c])}return arguments[0]}function da(a){for(var b in Ia)if(Ia.hasOwnProperty(b)&&Ia[b]===a)return!0;return!1}var ea="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},fa=e();"undefined"==typeof Promise&&"undefined"!=typeof a&&a(3);var ga,ha,ia=Promise,ja="local-forage-detect-blob-support",ka=Object.prototype.toString,la={_driver:"asyncStorage",_initStorage:y,iterate:A,getItem:z,setItem:B,removeItem:C,clear:D,length:E,key:F,keys:G},ma="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",na="~~local_forage_type~",oa=/^~~local_forage_type~([^~]+)~/,pa="__lfsc__:",qa=pa.length,ra="arbf",sa="blob",ta="si08",ua="ui08",va="uic8",wa="si16",xa="si32",ya="ur16",za="ui32",Aa="fl32",Ba="fl64",Ca=qa+ra.length,Da=Object.prototype.toString,Ea={serialize:J,deserialize:K,stringToBuffer:H,bufferToString:I},Fa={_driver:"webSQLStorage",_initStorage:L,iterate:N,getItem:M,setItem:O,removeItem:P,clear:Q,length:R,key:S,keys:T},Ga={_driver:"localStorageWrapper",_initStorage:U,iterate:X,getItem:W,setItem:aa,removeItem:_,clear:V,length:$,key:Y,keys:Z},Ha={},Ia={INDEXEDDB:"asyncStorage",LOCALSTORAGE:"localStorageWrapper",WEBSQL:"webSQLStorage"},Ja=[Ia.INDEXEDDB,Ia.WEBSQL,Ia.LOCALSTORAGE],Ka=["clear","getItem","iterate","key","keys","length","removeItem","setItem"],La={description:"",driver:Ja.slice(),name:"localforage",size:4980736,storeName:"keyvaluepairs",version:1},Ma={};Ma[Ia.INDEXEDDB]=f(),Ma[Ia.WEBSQL]=g(),Ma[Ia.LOCALSTORAGE]=h();var Na=Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)},Oa=function(){function a(b){d(this,a),this.INDEXEDDB=Ia.INDEXEDDB,this.LOCALSTORAGE=Ia.LOCALSTORAGE,this.WEBSQL=Ia.WEBSQL,this._defaultConfig=ca({},La),this._config=ca({},this._defaultConfig,b),this._driverSet=null,this._initDriver=null,this._ready=!1,this._dbInfo=null,this._wrapLibraryMethodsWithReady(),this.setDriver(this._config.driver)}return a.prototype.config=function(a){if("object"===("undefined"==typeof a?"undefined":ea(a))){if(this._ready)return new Error("Can't call config() after localforage has been used.");for(var b in a)"storeName"===b&&(a[b]=a[b].replace(/\W/g,"_")),this._config[b]=a[b];return"driver"in a&&a.driver&&this.setDriver(this._config.driver),!0}return"string"==typeof a?this._config[a]:this._config},a.prototype.defineDriver=function(a,b,c){var d=new ia(function(b,c){try{var d=a._driver,e=new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver"),f=new Error("Custom driver name already in use: "+a._driver);if(!a._driver)return void c(e);if(da(a._driver))return void c(f);for(var g=Ka.concat("_initStorage"),h=0;h<g.length;h++){var i=g[h];if(!i||!a[i]||"function"!=typeof a[i])return void c(e)}var j=ia.resolve(!0);"_support"in a&&(j=a._support&&"function"==typeof a._support?a._support():ia.resolve(!!a._support)),j.then(function(c){Ma[d]=c,Ha[d]=a,b()},c)}catch(a){c(a)}});return k(d,b,c),d},a.prototype.driver=function(){return this._driver||null},a.prototype.getDriver=function(a,b,c){var d=this,e=ia.resolve().then(function(){if(!da(a)){if(Ha[a])return Ha[a];throw new Error("Driver not found.")}switch(a){case d.INDEXEDDB:return la;case d.LOCALSTORAGE:return Ga;case d.WEBSQL:return Fa}});return k(e,b,c),e},a.prototype.getSerializer=function(a){var b=ia.resolve(Ea);return k(b,a),b},a.prototype.ready=function(a){var b=this,c=b._driverSet.then(function(){return null===b._ready&&(b._ready=b._initDriver()),b._ready});return k(c,a,a),c},a.prototype.setDriver=function(a,b,c){function d(){f._config.driver=f.driver()}function e(a){return function(){function b(){for(;c<a.length;){var e=a[c];return c++,f._dbInfo=null,f._ready=null,f.getDriver(e).then(function(a){return f._extend(a),d(),f._ready=f._initStorage(f._config),f._ready}).catch(b)}d();var g=new Error("No available storage method found.");return f._driverSet=ia.reject(g),f._driverSet}var c=0;return b()}}var f=this;Na(a)||(a=[a]);var g=this._getSupportedDrivers(a),h=null!==this._driverSet?this._driverSet.catch(function(){return ia.resolve()}):ia.resolve();return this._driverSet=h.then(function(){var a=g[0];return f._dbInfo=null,f._ready=null,f.getDriver(a).then(function(a){f._driver=a._driver,d(),f._wrapLibraryMethodsWithReady(),f._initDriver=e(g)})}).catch(function(){d();var a=new Error("No available storage method found.");return f._driverSet=ia.reject(a),f._driverSet}),k(this._driverSet,b,c),this._driverSet},a.prototype.supports=function(a){return!!Ma[a]},a.prototype._extend=function(a){ca(this,a)},a.prototype._getSupportedDrivers=function(a){for(var b=[],c=0,d=a.length;c<d;c++){var e=a[c];this.supports(e)&&b.push(e)}return b},a.prototype._wrapLibraryMethodsWithReady=function(){for(var a=0;a<Ka.length;a++)ba(this,Ka[a])},a.prototype.createInstance=function(b){return new a(b)},a}(),Pa=new Oa;b.exports=Pa},{3:3}]},{},[4])(4)})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],80:[function(a,b,c){"use strict";var d=a("./lib/utils/common").assign,e=a("./lib/deflate"),f=a("./lib/inflate"),g=a("./lib/zlib/constants"),h={};d(h,e,f,g),b.exports=h},{"./lib/deflate":81,"./lib/inflate":82,"./lib/utils/common":83,"./lib/zlib/constants":86}],81:[function(a,b,c){"use strict";function d(a){if(!(this instanceof d))return new d(a);this.options=i.assign({level:s,method:u,chunkSize:16384,windowBits:15,memLevel:8,strategy:t,to:""},a||{});var b=this.options;b.raw&&b.windowBits>0?b.windowBits=-b.windowBits:b.gzip&&b.windowBits>0&&b.windowBits<16&&(b.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new l,this.strm.avail_out=0;var c=h.deflateInit2(this.strm,b.level,b.method,b.windowBits,b.memLevel,b.strategy);if(c!==p)throw new Error(k[c]);if(b.header&&h.deflateSetHeader(this.strm,b.header),b.dictionary){var e;if(e="string"==typeof b.dictionary?j.string2buf(b.dictionary):"[object ArrayBuffer]"===m.call(b.dictionary)?new Uint8Array(b.dictionary):b.dictionary,c=h.deflateSetDictionary(this.strm,e),c!==p)throw new Error(k[c]);this._dict_set=!0}}function e(a,b){var c=new d(b);if(c.push(a,!0),c.err)throw c.msg;return c.result}function f(a,b){return b=b||{},b.raw=!0,e(a,b)}function g(a,b){return b=b||{},b.gzip=!0,e(a,b)}var h=a("./zlib/deflate"),i=a("./utils/common"),j=a("./utils/strings"),k=a("./zlib/messages"),l=a("./zlib/zstream"),m=Object.prototype.toString,n=0,o=4,p=0,q=1,r=2,s=-1,t=0,u=8;d.prototype.push=function(a,b){var c,d,e=this.strm,f=this.options.chunkSize;if(this.ended)return!1;d=b===~~b?b:b===!0?o:n,"string"==typeof a?e.input=j.string2buf(a):"[object ArrayBuffer]"===m.call(a)?e.input=new Uint8Array(a):e.input=a,e.next_in=0,e.avail_in=e.input.length;do{if(0===e.avail_out&&(e.output=new i.Buf8(f),e.next_out=0,e.avail_out=f),c=h.deflate(e,d),c!==q&&c!==p)return this.onEnd(c),this.ended=!0,!1;0!==e.avail_out&&(0!==e.avail_in||d!==o&&d!==r)||("string"===this.options.to?this.onData(j.buf2binstring(i.shrinkBuf(e.output,e.next_out))):this.onData(i.shrinkBuf(e.output,e.next_out)))}while((e.avail_in>0||0===e.avail_out)&&c!==q);return d===o?(c=h.deflateEnd(this.strm),this.onEnd(c),this.ended=!0,c===p):d!==r||(this.onEnd(p),e.avail_out=0,!0)},d.prototype.onData=function(a){this.chunks.push(a)},d.prototype.onEnd=function(a){a===p&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=i.flattenChunks(this.chunks)),this.chunks=[],this.err=a,this.msg=this.strm.msg},c.Deflate=d,c.deflate=e,c.deflateRaw=f,c.gzip=g},{"./utils/common":83,"./utils/strings":84,"./zlib/deflate":88,"./zlib/messages":93,"./zlib/zstream":95}],82:[function(a,b,c){"use strict";function d(a){if(!(this instanceof d))return new d(a);this.options=h.assign({chunkSize:16384,windowBits:0,to:""},a||{});var b=this.options;b.raw&&b.windowBits>=0&&b.windowBits<16&&(b.windowBits=-b.windowBits,0===b.windowBits&&(b.windowBits=-15)),!(b.windowBits>=0&&b.windowBits<16)||a&&a.windowBits||(b.windowBits+=32),b.windowBits>15&&b.windowBits<48&&0===(15&b.windowBits)&&(b.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new l,this.strm.avail_out=0;var c=g.inflateInit2(this.strm,b.windowBits);if(c!==j.Z_OK)throw new Error(k[c]);this.header=new m,g.inflateGetHeader(this.strm,this.header)}function e(a,b){var c=new d(b);if(c.push(a,!0),c.err)throw c.msg;return c.result}function f(a,b){return b=b||{},b.raw=!0,e(a,b)}var g=a("./zlib/inflate"),h=a("./utils/common"),i=a("./utils/strings"),j=a("./zlib/constants"),k=a("./zlib/messages"),l=a("./zlib/zstream"),m=a("./zlib/gzheader"),n=Object.prototype.toString;d.prototype.push=function(a,b){var c,d,e,f,k,l,m=this.strm,o=this.options.chunkSize,p=this.options.dictionary,q=!1;if(this.ended)return!1;d=b===~~b?b:b===!0?j.Z_FINISH:j.Z_NO_FLUSH,"string"==typeof a?m.input=i.binstring2buf(a):"[object ArrayBuffer]"===n.call(a)?m.input=new Uint8Array(a):m.input=a,m.next_in=0,m.avail_in=m.input.length;do{if(0===m.avail_out&&(m.output=new h.Buf8(o),m.next_out=0,m.avail_out=o),c=g.inflate(m,j.Z_NO_FLUSH),c===j.Z_NEED_DICT&&p&&(l="string"==typeof p?i.string2buf(p):"[object ArrayBuffer]"===n.call(p)?new Uint8Array(p):p,c=g.inflateSetDictionary(this.strm,l)),c===j.Z_BUF_ERROR&&q===!0&&(c=j.Z_OK,q=!1),c!==j.Z_STREAM_END&&c!==j.Z_OK)return this.onEnd(c),this.ended=!0,!1;m.next_out&&(0!==m.avail_out&&c!==j.Z_STREAM_END&&(0!==m.avail_in||d!==j.Z_FINISH&&d!==j.Z_SYNC_FLUSH)||("string"===this.options.to?(e=i.utf8border(m.output,m.next_out),f=m.next_out-e,k=i.buf2string(m.output,e),m.next_out=f,m.avail_out=o-f,f&&h.arraySet(m.output,m.output,e,f,0),this.onData(k)):this.onData(h.shrinkBuf(m.output,m.next_out)))),0===m.avail_in&&0===m.avail_out&&(q=!0)}while((m.avail_in>0||0===m.avail_out)&&c!==j.Z_STREAM_END);return c===j.Z_STREAM_END&&(d=j.Z_FINISH),d===j.Z_FINISH?(c=g.inflateEnd(this.strm),this.onEnd(c),this.ended=!0,c===j.Z_OK):d!==j.Z_SYNC_FLUSH||(this.onEnd(j.Z_OK),m.avail_out=0,!0)},d.prototype.onData=function(a){this.chunks.push(a)},d.prototype.onEnd=function(a){a===j.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=h.flattenChunks(this.chunks)),this.chunks=[],this.err=a,this.msg=this.strm.msg},c.Inflate=d,c.inflate=e,c.inflateRaw=f,c.ungzip=e},{"./utils/common":83,"./utils/strings":84,"./zlib/constants":86,"./zlib/gzheader":89,"./zlib/inflate":91,"./zlib/messages":93,"./zlib/zstream":95}],83:[function(a,b,c){"use strict";var d="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;c.assign=function(a){for(var b=Array.prototype.slice.call(arguments,1);b.length;){var c=b.shift();if(c){if("object"!=typeof c)throw new TypeError(c+"must be non-object");for(var d in c)c.hasOwnProperty(d)&&(a[d]=c[d])}}return a},c.shrinkBuf=function(a,b){return a.length===b?a:a.subarray?a.subarray(0,b):(a.length=b,a)};var e={arraySet:function(a,b,c,d,e){if(b.subarray&&a.subarray)return void a.set(b.subarray(c,c+d),e);for(var f=0;f<d;f++)a[e+f]=b[c+f]},flattenChunks:function(a){var b,c,d,e,f,g;for(d=0,b=0,c=a.length;b<c;b++)d+=a[b].length;for(g=new Uint8Array(d),e=0,b=0,c=a.length;b<c;b++)f=a[b],g.set(f,e),e+=f.length;return g}},f={arraySet:function(a,b,c,d,e){for(var f=0;f<d;f++)a[e+f]=b[c+f]},flattenChunks:function(a){return[].concat.apply([],a)}};c.setTyped=function(a){a?(c.Buf8=Uint8Array,c.Buf16=Uint16Array,c.Buf32=Int32Array,c.assign(c,e)):(c.Buf8=Array,c.Buf16=Array,c.Buf32=Array,c.assign(c,f))},c.setTyped(d)},{}],84:[function(a,b,c){"use strict";function d(a,b){if(b<65537&&(a.subarray&&g||!a.subarray&&f))return String.fromCharCode.apply(null,e.shrinkBuf(a,b));for(var c="",d=0;d<b;d++)c+=String.fromCharCode(a[d]);return c}var e=a("./common"),f=!0,g=!0;try{String.fromCharCode.apply(null,[0])}catch(a){f=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(a){g=!1}for(var h=new e.Buf8(256),i=0;i<256;i++)h[i]=i>=252?6:i>=248?5:i>=240?4:i>=224?3:i>=192?2:1;h[254]=h[254]=1,c.string2buf=function(a){var b,c,d,f,g,h=a.length,i=0;for(f=0;f<h;f++)c=a.charCodeAt(f),55296===(64512&c)&&f+1<h&&(d=a.charCodeAt(f+1),56320===(64512&d)&&(c=65536+(c-55296<<10)+(d-56320),f++)),i+=c<128?1:c<2048?2:c<65536?3:4;for(b=new e.Buf8(i),g=0,f=0;g<i;f++)c=a.charCodeAt(f),55296===(64512&c)&&f+1<h&&(d=a.charCodeAt(f+1),56320===(64512&d)&&(c=65536+(c-55296<<10)+(d-56320),f++)),c<128?b[g++]=c:c<2048?(b[g++]=192|c>>>6,b[g++]=128|63&c):c<65536?(b[g++]=224|c>>>12,b[g++]=128|c>>>6&63,b[g++]=128|63&c):(b[g++]=240|c>>>18,b[g++]=128|c>>>12&63,b[g++]=128|c>>>6&63,b[g++]=128|63&c);return b},c.buf2binstring=function(a){return d(a,a.length)},c.binstring2buf=function(a){for(var b=new e.Buf8(a.length),c=0,d=b.length;c<d;c++)b[c]=a.charCodeAt(c);return b},c.buf2string=function(a,b){var c,e,f,g,i=b||a.length,j=new Array(2*i);for(e=0,c=0;c<i;)if(f=a[c++],f<128)j[e++]=f;else if(g=h[f],g>4)j[e++]=65533,c+=g-1;else{for(f&=2===g?31:3===g?15:7;g>1&&c<i;)f=f<<6|63&a[c++],g--;g>1?j[e++]=65533:f<65536?j[e++]=f:(f-=65536,j[e++]=55296|f>>10&1023,j[e++]=56320|1023&f)}return d(j,e)},c.utf8border=function(a,b){var c;for(b=b||a.length,b>a.length&&(b=a.length),c=b-1;c>=0&&128===(192&a[c]);)c--;return c<0?b:0===c?b:c+h[a[c]]>b?c:b}},{"./common":83}],85:[function(a,b,c){"use strict";function d(a,b,c,d){for(var e=65535&a|0,f=a>>>16&65535|0,g=0;0!==c;){g=c>2e3?2e3:c,c-=g;do e=e+b[d++]|0,f=f+e|0;while(--g);e%=65521,f%=65521}return e|f<<16|0}b.exports=d},{}],86:[function(a,b,c){"use strict";b.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],87:[function(a,b,c){"use strict";function d(){for(var a,b=[],c=0;c<256;c++){a=c;for(var d=0;d<8;d++)a=1&a?3988292384^a>>>1:a>>>1;b[c]=a}return b}function e(a,b,c,d){var e=f,g=d+c;a^=-1;for(var h=d;h<g;h++)a=a>>>8^e[255&(a^b[h])];return a^-1}var f=d();b.exports=e},{}],88:[function(a,b,c){"use strict";function d(a,b){return a.msg=I[b],b}function e(a){return(a<<1)-(a>4?9:0)}function f(a){for(var b=a.length;--b>=0;)a[b]=0}function g(a){var b=a.state,c=b.pending;c>a.avail_out&&(c=a.avail_out),0!==c&&(E.arraySet(a.output,b.pending_buf,b.pending_out,c,a.next_out),a.next_out+=c,b.pending_out+=c,a.total_out+=c,a.avail_out-=c,b.pending-=c,0===b.pending&&(b.pending_out=0))}function h(a,b){F._tr_flush_block(a,a.block_start>=0?a.block_start:-1,a.strstart-a.block_start,b),a.block_start=a.strstart,g(a.strm)}function i(a,b){a.pending_buf[a.pending++]=b}function j(a,b){a.pending_buf[a.pending++]=b>>>8&255,a.pending_buf[a.pending++]=255&b}function k(a,b,c,d){var e=a.avail_in;return e>d&&(e=d),0===e?0:(a.avail_in-=e,E.arraySet(b,a.input,a.next_in,e,c),1===a.state.wrap?a.adler=G(a.adler,b,e,c):2===a.state.wrap&&(a.adler=H(a.adler,b,e,c)),a.next_in+=e,a.total_in+=e,e)}function l(a,b){var c,d,e=a.max_chain_length,f=a.strstart,g=a.prev_length,h=a.nice_match,i=a.strstart>a.w_size-la?a.strstart-(a.w_size-la):0,j=a.window,k=a.w_mask,l=a.prev,m=a.strstart+ka,n=j[f+g-1],o=j[f+g];a.prev_length>=a.good_match&&(e>>=2),h>a.lookahead&&(h=a.lookahead);do if(c=b,j[c+g]===o&&j[c+g-1]===n&&j[c]===j[f]&&j[++c]===j[f+1]){f+=2,c++;do;while(j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&f<m);if(d=ka-(m-f),f=m-ka,d>g){if(a.match_start=b,g=d,d>=h)break;n=j[f+g-1],o=j[f+g]}}while((b=l[b&k])>i&&0!==--e);return g<=a.lookahead?g:a.lookahead}function m(a){var b,c,d,e,f,g=a.w_size;do{if(e=a.window_size-a.lookahead-a.strstart,a.strstart>=g+(g-la)){E.arraySet(a.window,a.window,g,g,0),a.match_start-=g,a.strstart-=g,a.block_start-=g,c=a.hash_size,b=c;do d=a.head[--b],a.head[b]=d>=g?d-g:0;while(--c);c=g,b=c;do d=a.prev[--b],a.prev[b]=d>=g?d-g:0;while(--c);e+=g}if(0===a.strm.avail_in)break;if(c=k(a.strm,a.window,a.strstart+a.lookahead,e),a.lookahead+=c,a.lookahead+a.insert>=ja)for(f=a.strstart-a.insert,a.ins_h=a.window[f],a.ins_h=(a.ins_h<<a.hash_shift^a.window[f+1])&a.hash_mask;a.insert&&(a.ins_h=(a.ins_h<<a.hash_shift^a.window[f+ja-1])&a.hash_mask,a.prev[f&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=f,f++,a.insert--,!(a.lookahead+a.insert<ja)););}while(a.lookahead<la&&0!==a.strm.avail_in)}function n(a,b){var c=65535;for(c>a.pending_buf_size-5&&(c=a.pending_buf_size-5);;){if(a.lookahead<=1){if(m(a),0===a.lookahead&&b===J)return ua;if(0===a.lookahead)break}a.strstart+=a.lookahead,a.lookahead=0;var d=a.block_start+c;if((0===a.strstart||a.strstart>=d)&&(a.lookahead=a.strstart-d,a.strstart=d,h(a,!1),0===a.strm.avail_out))return ua;if(a.strstart-a.block_start>=a.w_size-la&&(h(a,!1),0===a.strm.avail_out))return ua}return a.insert=0,b===M?(h(a,!0),0===a.strm.avail_out?wa:xa):a.strstart>a.block_start&&(h(a,!1),0===a.strm.avail_out)?ua:ua}function o(a,b){for(var c,d;;){if(a.lookahead<la){if(m(a),a.lookahead<la&&b===J)return ua;if(0===a.lookahead)break}if(c=0,a.lookahead>=ja&&(a.ins_h=(a.ins_h<<a.hash_shift^a.window[a.strstart+ja-1])&a.hash_mask,c=a.prev[a.strstart&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=a.strstart),0!==c&&a.strstart-c<=a.w_size-la&&(a.match_length=l(a,c)),a.match_length>=ja)if(d=F._tr_tally(a,a.strstart-a.match_start,a.match_length-ja),a.lookahead-=a.match_length,a.match_length<=a.max_lazy_match&&a.lookahead>=ja){a.match_length--;do a.strstart++,a.ins_h=(a.ins_h<<a.hash_shift^a.window[a.strstart+ja-1])&a.hash_mask,c=a.prev[a.strstart&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=a.strstart;while(0!==--a.match_length);a.strstart++}else a.strstart+=a.match_length,a.match_length=0,a.ins_h=a.window[a.strstart],a.ins_h=(a.ins_h<<a.hash_shift^a.window[a.strstart+1])&a.hash_mask;else d=F._tr_tally(a,0,a.window[a.strstart]),a.lookahead--,a.strstart++;if(d&&(h(a,!1),0===a.strm.avail_out))return ua}return a.insert=a.strstart<ja-1?a.strstart:ja-1,b===M?(h(a,!0),0===a.strm.avail_out?wa:xa):a.last_lit&&(h(a,!1),0===a.strm.avail_out)?ua:va}function p(a,b){for(var c,d,e;;){if(a.lookahead<la){if(m(a),a.lookahead<la&&b===J)return ua;if(0===a.lookahead)break}if(c=0,a.lookahead>=ja&&(a.ins_h=(a.ins_h<<a.hash_shift^a.window[a.strstart+ja-1])&a.hash_mask,c=a.prev[a.strstart&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=a.strstart),a.prev_length=a.match_length,a.prev_match=a.match_start,a.match_length=ja-1,0!==c&&a.prev_length<a.max_lazy_match&&a.strstart-c<=a.w_size-la&&(a.match_length=l(a,c),a.match_length<=5&&(a.strategy===U||a.match_length===ja&&a.strstart-a.match_start>4096)&&(a.match_length=ja-1)),a.prev_length>=ja&&a.match_length<=a.prev_length){
e=a.strstart+a.lookahead-ja,d=F._tr_tally(a,a.strstart-1-a.prev_match,a.prev_length-ja),a.lookahead-=a.prev_length-1,a.prev_length-=2;do++a.strstart<=e&&(a.ins_h=(a.ins_h<<a.hash_shift^a.window[a.strstart+ja-1])&a.hash_mask,c=a.prev[a.strstart&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=a.strstart);while(0!==--a.prev_length);if(a.match_available=0,a.match_length=ja-1,a.strstart++,d&&(h(a,!1),0===a.strm.avail_out))return ua}else if(a.match_available){if(d=F._tr_tally(a,0,a.window[a.strstart-1]),d&&h(a,!1),a.strstart++,a.lookahead--,0===a.strm.avail_out)return ua}else a.match_available=1,a.strstart++,a.lookahead--}return a.match_available&&(d=F._tr_tally(a,0,a.window[a.strstart-1]),a.match_available=0),a.insert=a.strstart<ja-1?a.strstart:ja-1,b===M?(h(a,!0),0===a.strm.avail_out?wa:xa):a.last_lit&&(h(a,!1),0===a.strm.avail_out)?ua:va}function q(a,b){for(var c,d,e,f,g=a.window;;){if(a.lookahead<=ka){if(m(a),a.lookahead<=ka&&b===J)return ua;if(0===a.lookahead)break}if(a.match_length=0,a.lookahead>=ja&&a.strstart>0&&(e=a.strstart-1,d=g[e],d===g[++e]&&d===g[++e]&&d===g[++e])){f=a.strstart+ka;do;while(d===g[++e]&&d===g[++e]&&d===g[++e]&&d===g[++e]&&d===g[++e]&&d===g[++e]&&d===g[++e]&&d===g[++e]&&e<f);a.match_length=ka-(f-e),a.match_length>a.lookahead&&(a.match_length=a.lookahead)}if(a.match_length>=ja?(c=F._tr_tally(a,1,a.match_length-ja),a.lookahead-=a.match_length,a.strstart+=a.match_length,a.match_length=0):(c=F._tr_tally(a,0,a.window[a.strstart]),a.lookahead--,a.strstart++),c&&(h(a,!1),0===a.strm.avail_out))return ua}return a.insert=0,b===M?(h(a,!0),0===a.strm.avail_out?wa:xa):a.last_lit&&(h(a,!1),0===a.strm.avail_out)?ua:va}function r(a,b){for(var c;;){if(0===a.lookahead&&(m(a),0===a.lookahead)){if(b===J)return ua;break}if(a.match_length=0,c=F._tr_tally(a,0,a.window[a.strstart]),a.lookahead--,a.strstart++,c&&(h(a,!1),0===a.strm.avail_out))return ua}return a.insert=0,b===M?(h(a,!0),0===a.strm.avail_out?wa:xa):a.last_lit&&(h(a,!1),0===a.strm.avail_out)?ua:va}function s(a,b,c,d,e){this.good_length=a,this.max_lazy=b,this.nice_length=c,this.max_chain=d,this.func=e}function t(a){a.window_size=2*a.w_size,f(a.head),a.max_lazy_match=D[a.level].max_lazy,a.good_match=D[a.level].good_length,a.nice_match=D[a.level].nice_length,a.max_chain_length=D[a.level].max_chain,a.strstart=0,a.block_start=0,a.lookahead=0,a.insert=0,a.match_length=a.prev_length=ja-1,a.match_available=0,a.ins_h=0}function u(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=$,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new E.Buf16(2*ha),this.dyn_dtree=new E.Buf16(2*(2*fa+1)),this.bl_tree=new E.Buf16(2*(2*ga+1)),f(this.dyn_ltree),f(this.dyn_dtree),f(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new E.Buf16(ia+1),this.heap=new E.Buf16(2*ea+1),f(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new E.Buf16(2*ea+1),f(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function v(a){var b;return a&&a.state?(a.total_in=a.total_out=0,a.data_type=Z,b=a.state,b.pending=0,b.pending_out=0,b.wrap<0&&(b.wrap=-b.wrap),b.status=b.wrap?na:sa,a.adler=2===b.wrap?0:1,b.last_flush=J,F._tr_init(b),O):d(a,Q)}function w(a){var b=v(a);return b===O&&t(a.state),b}function x(a,b){return a&&a.state?2!==a.state.wrap?Q:(a.state.gzhead=b,O):Q}function y(a,b,c,e,f,g){if(!a)return Q;var h=1;if(b===T&&(b=6),e<0?(h=0,e=-e):e>15&&(h=2,e-=16),f<1||f>_||c!==$||e<8||e>15||b<0||b>9||g<0||g>X)return d(a,Q);8===e&&(e=9);var i=new u;return a.state=i,i.strm=a,i.wrap=h,i.gzhead=null,i.w_bits=e,i.w_size=1<<i.w_bits,i.w_mask=i.w_size-1,i.hash_bits=f+7,i.hash_size=1<<i.hash_bits,i.hash_mask=i.hash_size-1,i.hash_shift=~~((i.hash_bits+ja-1)/ja),i.window=new E.Buf8(2*i.w_size),i.head=new E.Buf16(i.hash_size),i.prev=new E.Buf16(i.w_size),i.lit_bufsize=1<<f+6,i.pending_buf_size=4*i.lit_bufsize,i.pending_buf=new E.Buf8(i.pending_buf_size),i.d_buf=1*i.lit_bufsize,i.l_buf=3*i.lit_bufsize,i.level=b,i.strategy=g,i.method=c,w(a)}function z(a,b){return y(a,b,$,aa,ba,Y)}function A(a,b){var c,h,k,l;if(!a||!a.state||b>N||b<0)return a?d(a,Q):Q;if(h=a.state,!a.output||!a.input&&0!==a.avail_in||h.status===ta&&b!==M)return d(a,0===a.avail_out?S:Q);if(h.strm=a,c=h.last_flush,h.last_flush=b,h.status===na)if(2===h.wrap)a.adler=0,i(h,31),i(h,139),i(h,8),h.gzhead?(i(h,(h.gzhead.text?1:0)+(h.gzhead.hcrc?2:0)+(h.gzhead.extra?4:0)+(h.gzhead.name?8:0)+(h.gzhead.comment?16:0)),i(h,255&h.gzhead.time),i(h,h.gzhead.time>>8&255),i(h,h.gzhead.time>>16&255),i(h,h.gzhead.time>>24&255),i(h,9===h.level?2:h.strategy>=V||h.level<2?4:0),i(h,255&h.gzhead.os),h.gzhead.extra&&h.gzhead.extra.length&&(i(h,255&h.gzhead.extra.length),i(h,h.gzhead.extra.length>>8&255)),h.gzhead.hcrc&&(a.adler=H(a.adler,h.pending_buf,h.pending,0)),h.gzindex=0,h.status=oa):(i(h,0),i(h,0),i(h,0),i(h,0),i(h,0),i(h,9===h.level?2:h.strategy>=V||h.level<2?4:0),i(h,ya),h.status=sa);else{var m=$+(h.w_bits-8<<4)<<8,n=-1;n=h.strategy>=V||h.level<2?0:h.level<6?1:6===h.level?2:3,m|=n<<6,0!==h.strstart&&(m|=ma),m+=31-m%31,h.status=sa,j(h,m),0!==h.strstart&&(j(h,a.adler>>>16),j(h,65535&a.adler)),a.adler=1}if(h.status===oa)if(h.gzhead.extra){for(k=h.pending;h.gzindex<(65535&h.gzhead.extra.length)&&(h.pending!==h.pending_buf_size||(h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),g(a),k=h.pending,h.pending!==h.pending_buf_size));)i(h,255&h.gzhead.extra[h.gzindex]),h.gzindex++;h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),h.gzindex===h.gzhead.extra.length&&(h.gzindex=0,h.status=pa)}else h.status=pa;if(h.status===pa)if(h.gzhead.name){k=h.pending;do{if(h.pending===h.pending_buf_size&&(h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),g(a),k=h.pending,h.pending===h.pending_buf_size)){l=1;break}l=h.gzindex<h.gzhead.name.length?255&h.gzhead.name.charCodeAt(h.gzindex++):0,i(h,l)}while(0!==l);h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),0===l&&(h.gzindex=0,h.status=qa)}else h.status=qa;if(h.status===qa)if(h.gzhead.comment){k=h.pending;do{if(h.pending===h.pending_buf_size&&(h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),g(a),k=h.pending,h.pending===h.pending_buf_size)){l=1;break}l=h.gzindex<h.gzhead.comment.length?255&h.gzhead.comment.charCodeAt(h.gzindex++):0,i(h,l)}while(0!==l);h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),0===l&&(h.status=ra)}else h.status=ra;if(h.status===ra&&(h.gzhead.hcrc?(h.pending+2>h.pending_buf_size&&g(a),h.pending+2<=h.pending_buf_size&&(i(h,255&a.adler),i(h,a.adler>>8&255),a.adler=0,h.status=sa)):h.status=sa),0!==h.pending){if(g(a),0===a.avail_out)return h.last_flush=-1,O}else if(0===a.avail_in&&e(b)<=e(c)&&b!==M)return d(a,S);if(h.status===ta&&0!==a.avail_in)return d(a,S);if(0!==a.avail_in||0!==h.lookahead||b!==J&&h.status!==ta){var o=h.strategy===V?r(h,b):h.strategy===W?q(h,b):D[h.level].func(h,b);if(o!==wa&&o!==xa||(h.status=ta),o===ua||o===wa)return 0===a.avail_out&&(h.last_flush=-1),O;if(o===va&&(b===K?F._tr_align(h):b!==N&&(F._tr_stored_block(h,0,0,!1),b===L&&(f(h.head),0===h.lookahead&&(h.strstart=0,h.block_start=0,h.insert=0))),g(a),0===a.avail_out))return h.last_flush=-1,O}return b!==M?O:h.wrap<=0?P:(2===h.wrap?(i(h,255&a.adler),i(h,a.adler>>8&255),i(h,a.adler>>16&255),i(h,a.adler>>24&255),i(h,255&a.total_in),i(h,a.total_in>>8&255),i(h,a.total_in>>16&255),i(h,a.total_in>>24&255)):(j(h,a.adler>>>16),j(h,65535&a.adler)),g(a),h.wrap>0&&(h.wrap=-h.wrap),0!==h.pending?O:P)}function B(a){var b;return a&&a.state?(b=a.state.status,b!==na&&b!==oa&&b!==pa&&b!==qa&&b!==ra&&b!==sa&&b!==ta?d(a,Q):(a.state=null,b===sa?d(a,R):O)):Q}function C(a,b){var c,d,e,g,h,i,j,k,l=b.length;if(!a||!a.state)return Q;if(c=a.state,g=c.wrap,2===g||1===g&&c.status!==na||c.lookahead)return Q;for(1===g&&(a.adler=G(a.adler,b,l,0)),c.wrap=0,l>=c.w_size&&(0===g&&(f(c.head),c.strstart=0,c.block_start=0,c.insert=0),k=new E.Buf8(c.w_size),E.arraySet(k,b,l-c.w_size,c.w_size,0),b=k,l=c.w_size),h=a.avail_in,i=a.next_in,j=a.input,a.avail_in=l,a.next_in=0,a.input=b,m(c);c.lookahead>=ja;){d=c.strstart,e=c.lookahead-(ja-1);do c.ins_h=(c.ins_h<<c.hash_shift^c.window[d+ja-1])&c.hash_mask,c.prev[d&c.w_mask]=c.head[c.ins_h],c.head[c.ins_h]=d,d++;while(--e);c.strstart=d,c.lookahead=ja-1,m(c)}return c.strstart+=c.lookahead,c.block_start=c.strstart,c.insert=c.lookahead,c.lookahead=0,c.match_length=c.prev_length=ja-1,c.match_available=0,a.next_in=i,a.input=j,a.avail_in=h,c.wrap=g,O}var D,E=a("../utils/common"),F=a("./trees"),G=a("./adler32"),H=a("./crc32"),I=a("./messages"),J=0,K=1,L=3,M=4,N=5,O=0,P=1,Q=-2,R=-3,S=-5,T=-1,U=1,V=2,W=3,X=4,Y=0,Z=2,$=8,_=9,aa=15,ba=8,ca=29,da=256,ea=da+1+ca,fa=30,ga=19,ha=2*ea+1,ia=15,ja=3,ka=258,la=ka+ja+1,ma=32,na=42,oa=69,pa=73,qa=91,ra=103,sa=113,ta=666,ua=1,va=2,wa=3,xa=4,ya=3;D=[new s(0,0,0,0,n),new s(4,4,8,4,o),new s(4,5,16,8,o),new s(4,6,32,32,o),new s(4,4,16,16,p),new s(8,16,32,32,p),new s(8,16,128,128,p),new s(8,32,128,256,p),new s(32,128,258,1024,p),new s(32,258,258,4096,p)],c.deflateInit=z,c.deflateInit2=y,c.deflateReset=w,c.deflateResetKeep=v,c.deflateSetHeader=x,c.deflate=A,c.deflateEnd=B,c.deflateSetDictionary=C,c.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":83,"./adler32":85,"./crc32":87,"./messages":93,"./trees":94}],89:[function(a,b,c){"use strict";function d(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}b.exports=d},{}],90:[function(a,b,c){"use strict";var d=30,e=12;b.exports=function(a,b){var c,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C;c=a.state,f=a.next_in,B=a.input,g=f+(a.avail_in-5),h=a.next_out,C=a.output,i=h-(b-a.avail_out),j=h+(a.avail_out-257),k=c.dmax,l=c.wsize,m=c.whave,n=c.wnext,o=c.window,p=c.hold,q=c.bits,r=c.lencode,s=c.distcode,t=(1<<c.lenbits)-1,u=(1<<c.distbits)-1;a:do{q<15&&(p+=B[f++]<<q,q+=8,p+=B[f++]<<q,q+=8),v=r[p&t];b:for(;;){if(w=v>>>24,p>>>=w,q-=w,w=v>>>16&255,0===w)C[h++]=65535&v;else{if(!(16&w)){if(0===(64&w)){v=r[(65535&v)+(p&(1<<w)-1)];continue b}if(32&w){c.mode=e;break a}a.msg="invalid literal/length code",c.mode=d;break a}x=65535&v,w&=15,w&&(q<w&&(p+=B[f++]<<q,q+=8),x+=p&(1<<w)-1,p>>>=w,q-=w),q<15&&(p+=B[f++]<<q,q+=8,p+=B[f++]<<q,q+=8),v=s[p&u];c:for(;;){if(w=v>>>24,p>>>=w,q-=w,w=v>>>16&255,!(16&w)){if(0===(64&w)){v=s[(65535&v)+(p&(1<<w)-1)];continue c}a.msg="invalid distance code",c.mode=d;break a}if(y=65535&v,w&=15,q<w&&(p+=B[f++]<<q,q+=8,q<w&&(p+=B[f++]<<q,q+=8)),y+=p&(1<<w)-1,y>k){a.msg="invalid distance too far back",c.mode=d;break a}if(p>>>=w,q-=w,w=h-i,y>w){if(w=y-w,w>m&&c.sane){a.msg="invalid distance too far back",c.mode=d;break a}if(z=0,A=o,0===n){if(z+=l-w,w<x){x-=w;do C[h++]=o[z++];while(--w);z=h-y,A=C}}else if(n<w){if(z+=l+n-w,w-=n,w<x){x-=w;do C[h++]=o[z++];while(--w);if(z=0,n<x){w=n,x-=w;do C[h++]=o[z++];while(--w);z=h-y,A=C}}}else if(z+=n-w,w<x){x-=w;do C[h++]=o[z++];while(--w);z=h-y,A=C}for(;x>2;)C[h++]=A[z++],C[h++]=A[z++],C[h++]=A[z++],x-=3;x&&(C[h++]=A[z++],x>1&&(C[h++]=A[z++]))}else{z=h-y;do C[h++]=C[z++],C[h++]=C[z++],C[h++]=C[z++],x-=3;while(x>2);x&&(C[h++]=C[z++],x>1&&(C[h++]=C[z++]))}break}}break}}while(f<g&&h<j);x=q>>3,f-=x,q-=x<<3,p&=(1<<q)-1,a.next_in=f,a.next_out=h,a.avail_in=f<g?5+(g-f):5-(f-g),a.avail_out=h<j?257+(j-h):257-(h-j),c.hold=p,c.bits=q}},{}],91:[function(a,b,c){"use strict";function d(a){return(a>>>24&255)+(a>>>8&65280)+((65280&a)<<8)+((255&a)<<24)}function e(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new s.Buf16(320),this.work=new s.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function f(a){var b;return a&&a.state?(b=a.state,a.total_in=a.total_out=b.total=0,a.msg="",b.wrap&&(a.adler=1&b.wrap),b.mode=L,b.last=0,b.havedict=0,b.dmax=32768,b.head=null,b.hold=0,b.bits=0,b.lencode=b.lendyn=new s.Buf32(pa),b.distcode=b.distdyn=new s.Buf32(qa),b.sane=1,b.back=-1,D):G}function g(a){var b;return a&&a.state?(b=a.state,b.wsize=0,b.whave=0,b.wnext=0,f(a)):G}function h(a,b){var c,d;return a&&a.state?(d=a.state,b<0?(c=0,b=-b):(c=(b>>4)+1,b<48&&(b&=15)),b&&(b<8||b>15)?G:(null!==d.window&&d.wbits!==b&&(d.window=null),d.wrap=c,d.wbits=b,g(a))):G}function i(a,b){var c,d;return a?(d=new e,a.state=d,d.window=null,c=h(a,b),c!==D&&(a.state=null),c):G}function j(a){return i(a,sa)}function k(a){if(ta){var b;for(q=new s.Buf32(512),r=new s.Buf32(32),b=0;b<144;)a.lens[b++]=8;for(;b<256;)a.lens[b++]=9;for(;b<280;)a.lens[b++]=7;for(;b<288;)a.lens[b++]=8;for(w(y,a.lens,0,288,q,0,a.work,{bits:9}),b=0;b<32;)a.lens[b++]=5;w(z,a.lens,0,32,r,0,a.work,{bits:5}),ta=!1}a.lencode=q,a.lenbits=9,a.distcode=r,a.distbits=5}function l(a,b,c,d){var e,f=a.state;return null===f.window&&(f.wsize=1<<f.wbits,f.wnext=0,f.whave=0,f.window=new s.Buf8(f.wsize)),d>=f.wsize?(s.arraySet(f.window,b,c-f.wsize,f.wsize,0),f.wnext=0,f.whave=f.wsize):(e=f.wsize-f.wnext,e>d&&(e=d),s.arraySet(f.window,b,c-d,e,f.wnext),d-=e,d?(s.arraySet(f.window,b,c-d,d,0),f.wnext=d,f.whave=f.wsize):(f.wnext+=e,f.wnext===f.wsize&&(f.wnext=0),f.whave<f.wsize&&(f.whave+=e))),0}function m(a,b){var c,e,f,g,h,i,j,m,n,o,p,q,r,pa,qa,ra,sa,ta,ua,va,wa,xa,ya,za,Aa=0,Ba=new s.Buf8(4),Ca=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!a||!a.state||!a.output||!a.input&&0!==a.avail_in)return G;c=a.state,c.mode===W&&(c.mode=X),h=a.next_out,f=a.output,j=a.avail_out,g=a.next_in,e=a.input,i=a.avail_in,m=c.hold,n=c.bits,o=i,p=j,xa=D;a:for(;;)switch(c.mode){case L:if(0===c.wrap){c.mode=X;break}for(;n<16;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(2&c.wrap&&35615===m){c.check=0,Ba[0]=255&m,Ba[1]=m>>>8&255,c.check=u(c.check,Ba,2,0),m=0,n=0,c.mode=M;break}if(c.flags=0,c.head&&(c.head.done=!1),!(1&c.wrap)||(((255&m)<<8)+(m>>8))%31){a.msg="incorrect header check",c.mode=ma;break}if((15&m)!==K){a.msg="unknown compression method",c.mode=ma;break}if(m>>>=4,n-=4,wa=(15&m)+8,0===c.wbits)c.wbits=wa;else if(wa>c.wbits){a.msg="invalid window size",c.mode=ma;break}c.dmax=1<<wa,a.adler=c.check=1,c.mode=512&m?U:W,m=0,n=0;break;case M:for(;n<16;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(c.flags=m,(255&c.flags)!==K){a.msg="unknown compression method",c.mode=ma;break}if(57344&c.flags){a.msg="unknown header flags set",c.mode=ma;break}c.head&&(c.head.text=m>>8&1),512&c.flags&&(Ba[0]=255&m,Ba[1]=m>>>8&255,c.check=u(c.check,Ba,2,0)),m=0,n=0,c.mode=N;case N:for(;n<32;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.head&&(c.head.time=m),512&c.flags&&(Ba[0]=255&m,Ba[1]=m>>>8&255,Ba[2]=m>>>16&255,Ba[3]=m>>>24&255,c.check=u(c.check,Ba,4,0)),m=0,n=0,c.mode=O;case O:for(;n<16;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.head&&(c.head.xflags=255&m,c.head.os=m>>8),512&c.flags&&(Ba[0]=255&m,Ba[1]=m>>>8&255,c.check=u(c.check,Ba,2,0)),m=0,n=0,c.mode=P;case P:if(1024&c.flags){for(;n<16;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.length=m,c.head&&(c.head.extra_len=m),512&c.flags&&(Ba[0]=255&m,Ba[1]=m>>>8&255,c.check=u(c.check,Ba,2,0)),m=0,n=0}else c.head&&(c.head.extra=null);c.mode=Q;case Q:if(1024&c.flags&&(q=c.length,q>i&&(q=i),q&&(c.head&&(wa=c.head.extra_len-c.length,c.head.extra||(c.head.extra=new Array(c.head.extra_len)),s.arraySet(c.head.extra,e,g,q,wa)),512&c.flags&&(c.check=u(c.check,e,q,g)),i-=q,g+=q,c.length-=q),c.length))break a;c.length=0,c.mode=R;case R:if(2048&c.flags){if(0===i)break a;q=0;do wa=e[g+q++],c.head&&wa&&c.length<65536&&(c.head.name+=String.fromCharCode(wa));while(wa&&q<i);if(512&c.flags&&(c.check=u(c.check,e,q,g)),i-=q,g+=q,wa)break a}else c.head&&(c.head.name=null);c.length=0,c.mode=S;case S:if(4096&c.flags){if(0===i)break a;q=0;do wa=e[g+q++],c.head&&wa&&c.length<65536&&(c.head.comment+=String.fromCharCode(wa));while(wa&&q<i);if(512&c.flags&&(c.check=u(c.check,e,q,g)),i-=q,g+=q,wa)break a}else c.head&&(c.head.comment=null);c.mode=T;case T:if(512&c.flags){for(;n<16;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(m!==(65535&c.check)){a.msg="header crc mismatch",c.mode=ma;break}m=0,n=0}c.head&&(c.head.hcrc=c.flags>>9&1,c.head.done=!0),a.adler=c.check=0,c.mode=W;break;case U:for(;n<32;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}a.adler=c.check=d(m),m=0,n=0,c.mode=V;case V:if(0===c.havedict)return a.next_out=h,a.avail_out=j,a.next_in=g,a.avail_in=i,c.hold=m,c.bits=n,F;a.adler=c.check=1,c.mode=W;case W:if(b===B||b===C)break a;case X:if(c.last){m>>>=7&n,n-=7&n,c.mode=ja;break}for(;n<3;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}switch(c.last=1&m,m>>>=1,n-=1,3&m){case 0:c.mode=Y;break;case 1:if(k(c),c.mode=ca,b===C){m>>>=2,n-=2;break a}break;case 2:c.mode=_;break;case 3:a.msg="invalid block type",c.mode=ma}m>>>=2,n-=2;break;case Y:for(m>>>=7&n,n-=7&n;n<32;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if((65535&m)!==(m>>>16^65535)){a.msg="invalid stored block lengths",c.mode=ma;break}if(c.length=65535&m,m=0,n=0,c.mode=Z,b===C)break a;case Z:c.mode=$;case $:if(q=c.length){if(q>i&&(q=i),q>j&&(q=j),0===q)break a;s.arraySet(f,e,g,q,h),i-=q,g+=q,j-=q,h+=q,c.length-=q;break}c.mode=W;break;case _:for(;n<14;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(c.nlen=(31&m)+257,m>>>=5,n-=5,c.ndist=(31&m)+1,m>>>=5,n-=5,c.ncode=(15&m)+4,m>>>=4,n-=4,c.nlen>286||c.ndist>30){a.msg="too many length or distance symbols",c.mode=ma;break}c.have=0,c.mode=aa;case aa:for(;c.have<c.ncode;){for(;n<3;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.lens[Ca[c.have++]]=7&m,m>>>=3,n-=3}for(;c.have<19;)c.lens[Ca[c.have++]]=0;if(c.lencode=c.lendyn,c.lenbits=7,ya={bits:c.lenbits},xa=w(x,c.lens,0,19,c.lencode,0,c.work,ya),c.lenbits=ya.bits,xa){a.msg="invalid code lengths set",c.mode=ma;break}c.have=0,c.mode=ba;case ba:for(;c.have<c.nlen+c.ndist;){for(;Aa=c.lencode[m&(1<<c.lenbits)-1],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(qa<=n);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(sa<16)m>>>=qa,n-=qa,c.lens[c.have++]=sa;else{if(16===sa){for(za=qa+2;n<za;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(m>>>=qa,n-=qa,0===c.have){a.msg="invalid bit length repeat",c.mode=ma;break}wa=c.lens[c.have-1],q=3+(3&m),m>>>=2,n-=2}else if(17===sa){for(za=qa+3;n<za;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}m>>>=qa,n-=qa,wa=0,q=3+(7&m),m>>>=3,n-=3}else{for(za=qa+7;n<za;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}m>>>=qa,n-=qa,wa=0,q=11+(127&m),m>>>=7,n-=7}if(c.have+q>c.nlen+c.ndist){a.msg="invalid bit length repeat",c.mode=ma;break}for(;q--;)c.lens[c.have++]=wa}}if(c.mode===ma)break;if(0===c.lens[256]){a.msg="invalid code -- missing end-of-block",c.mode=ma;break}if(c.lenbits=9,ya={bits:c.lenbits},xa=w(y,c.lens,0,c.nlen,c.lencode,0,c.work,ya),c.lenbits=ya.bits,xa){a.msg="invalid literal/lengths set",c.mode=ma;break}if(c.distbits=6,c.distcode=c.distdyn,ya={bits:c.distbits},xa=w(z,c.lens,c.nlen,c.ndist,c.distcode,0,c.work,ya),c.distbits=ya.bits,xa){a.msg="invalid distances set",c.mode=ma;break}if(c.mode=ca,b===C)break a;case ca:c.mode=da;case da:if(i>=6&&j>=258){a.next_out=h,a.avail_out=j,a.next_in=g,a.avail_in=i,c.hold=m,c.bits=n,v(a,p),h=a.next_out,f=a.output,j=a.avail_out,g=a.next_in,e=a.input,i=a.avail_in,m=c.hold,n=c.bits,c.mode===W&&(c.back=-1);break}for(c.back=0;Aa=c.lencode[m&(1<<c.lenbits)-1],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(qa<=n);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(ra&&0===(240&ra)){for(ta=qa,ua=ra,va=sa;Aa=c.lencode[va+((m&(1<<ta+ua)-1)>>ta)],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(ta+qa<=n);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}m>>>=ta,n-=ta,c.back+=ta}if(m>>>=qa,n-=qa,c.back+=qa,c.length=sa,0===ra){c.mode=ia;break}if(32&ra){c.back=-1,c.mode=W;break}if(64&ra){a.msg="invalid literal/length code",c.mode=ma;break}c.extra=15&ra,c.mode=ea;case ea:if(c.extra){for(za=c.extra;n<za;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.length+=m&(1<<c.extra)-1,m>>>=c.extra,n-=c.extra,c.back+=c.extra}c.was=c.length,c.mode=fa;case fa:for(;Aa=c.distcode[m&(1<<c.distbits)-1],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(qa<=n);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(0===(240&ra)){for(ta=qa,ua=ra,va=sa;Aa=c.distcode[va+((m&(1<<ta+ua)-1)>>ta)],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(ta+qa<=n);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}m>>>=ta,n-=ta,c.back+=ta}if(m>>>=qa,n-=qa,c.back+=qa,64&ra){a.msg="invalid distance code",c.mode=ma;break}c.offset=sa,c.extra=15&ra,c.mode=ga;case ga:if(c.extra){for(za=c.extra;n<za;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.offset+=m&(1<<c.extra)-1,m>>>=c.extra,n-=c.extra,c.back+=c.extra}if(c.offset>c.dmax){a.msg="invalid distance too far back",c.mode=ma;break}c.mode=ha;case ha:if(0===j)break a;if(q=p-j,c.offset>q){if(q=c.offset-q,q>c.whave&&c.sane){a.msg="invalid distance too far back",c.mode=ma;break}q>c.wnext?(q-=c.wnext,r=c.wsize-q):r=c.wnext-q,q>c.length&&(q=c.length),pa=c.window}else pa=f,r=h-c.offset,q=c.length;q>j&&(q=j),j-=q,c.length-=q;do f[h++]=pa[r++];while(--q);0===c.length&&(c.mode=da);break;case ia:if(0===j)break a;f[h++]=c.length,j--,c.mode=da;break;case ja:if(c.wrap){for(;n<32;){if(0===i)break a;i--,m|=e[g++]<<n,n+=8}if(p-=j,a.total_out+=p,c.total+=p,p&&(a.adler=c.check=c.flags?u(c.check,f,p,h-p):t(c.check,f,p,h-p)),p=j,(c.flags?m:d(m))!==c.check){a.msg="incorrect data check",c.mode=ma;break}m=0,n=0}c.mode=ka;case ka:if(c.wrap&&c.flags){for(;n<32;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(m!==(4294967295&c.total)){a.msg="incorrect length check",c.mode=ma;break}m=0,n=0}c.mode=la;case la:xa=E;break a;case ma:xa=H;break a;case na:return I;case oa:default:return G}return a.next_out=h,a.avail_out=j,a.next_in=g,a.avail_in=i,c.hold=m,c.bits=n,(c.wsize||p!==a.avail_out&&c.mode<ma&&(c.mode<ja||b!==A))&&l(a,a.output,a.next_out,p-a.avail_out)?(c.mode=na,I):(o-=a.avail_in,p-=a.avail_out,a.total_in+=o,a.total_out+=p,c.total+=p,c.wrap&&p&&(a.adler=c.check=c.flags?u(c.check,f,p,a.next_out-p):t(c.check,f,p,a.next_out-p)),a.data_type=c.bits+(c.last?64:0)+(c.mode===W?128:0)+(c.mode===ca||c.mode===Z?256:0),(0===o&&0===p||b===A)&&xa===D&&(xa=J),xa)}function n(a){if(!a||!a.state)return G;var b=a.state;return b.window&&(b.window=null),a.state=null,D}function o(a,b){var c;return a&&a.state?(c=a.state,0===(2&c.wrap)?G:(c.head=b,b.done=!1,D)):G}function p(a,b){var c,d,e,f=b.length;return a&&a.state?(c=a.state,0!==c.wrap&&c.mode!==V?G:c.mode===V&&(d=1,d=t(d,b,f,0),d!==c.check)?H:(e=l(a,b,f,f))?(c.mode=na,I):(c.havedict=1,D)):G}var q,r,s=a("../utils/common"),t=a("./adler32"),u=a("./crc32"),v=a("./inffast"),w=a("./inftrees"),x=0,y=1,z=2,A=4,B=5,C=6,D=0,E=1,F=2,G=-2,H=-3,I=-4,J=-5,K=8,L=1,M=2,N=3,O=4,P=5,Q=6,R=7,S=8,T=9,U=10,V=11,W=12,X=13,Y=14,Z=15,$=16,_=17,aa=18,ba=19,ca=20,da=21,ea=22,fa=23,ga=24,ha=25,ia=26,ja=27,ka=28,la=29,ma=30,na=31,oa=32,pa=852,qa=592,ra=15,sa=ra,ta=!0;c.inflateReset=g,c.inflateReset2=h,c.inflateResetKeep=f,c.inflateInit=j,c.inflateInit2=i,c.inflate=m,c.inflateEnd=n,c.inflateGetHeader=o,c.inflateSetDictionary=p,c.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":83,"./adler32":85,"./crc32":87,"./inffast":90,"./inftrees":92}],92:[function(a,b,c){"use strict";var d=a("../utils/common"),e=15,f=852,g=592,h=0,i=1,j=2,k=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],l=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],m=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],n=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];b.exports=function(a,b,c,o,p,q,r,s){var t,u,v,w,x,y,z,A,B,C=s.bits,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=null,O=0,P=new d.Buf16(e+1),Q=new d.Buf16(e+1),R=null,S=0;for(D=0;D<=e;D++)P[D]=0;for(E=0;E<o;E++)P[b[c+E]]++;for(H=C,G=e;G>=1&&0===P[G];G--);if(H>G&&(H=G),0===G)return p[q++]=20971520,p[q++]=20971520,s.bits=1,0;for(F=1;F<G&&0===P[F];F++);for(H<F&&(H=F),K=1,D=1;D<=e;D++)if(K<<=1,K-=P[D],K<0)return-1;if(K>0&&(a===h||1!==G))return-1;for(Q[1]=0,D=1;D<e;D++)Q[D+1]=Q[D]+P[D];for(E=0;E<o;E++)0!==b[c+E]&&(r[Q[b[c+E]]++]=E);if(a===h?(N=R=r,y=19):a===i?(N=k,O-=257,R=l,S-=257,y=256):(N=m,R=n,y=-1),M=0,E=0,D=F,x=q,I=H,J=0,v=-1,L=1<<H,w=L-1,a===i&&L>f||a===j&&L>g)return 1;for(var T=0;;){T++,z=D-J,r[E]<y?(A=0,B=r[E]):r[E]>y?(A=R[S+r[E]],B=N[O+r[E]]):(A=96,B=0),t=1<<D-J,u=1<<I,F=u;do u-=t,p[x+(M>>J)+u]=z<<24|A<<16|B|0;while(0!==u);for(t=1<<D-1;M&t;)t>>=1;if(0!==t?(M&=t-1,M+=t):M=0,E++,0===--P[D]){if(D===G)break;D=b[c+r[E]]}if(D>H&&(M&w)!==v){for(0===J&&(J=H),x+=F,I=D-J,K=1<<I;I+J<G&&(K-=P[I+J],!(K<=0));)I++,K<<=1;if(L+=1<<I,a===i&&L>f||a===j&&L>g)return 1;v=M&w,p[v]=H<<24|I<<16|x-q|0}}return 0!==M&&(p[x+M]=D-J<<24|64<<16|0),s.bits=H,0}},{"../utils/common":83}],93:[function(a,b,c){"use strict";b.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],94:[function(a,b,c){"use strict";function d(a){for(var b=a.length;--b>=0;)a[b]=0}function e(a,b,c,d,e){this.static_tree=a,this.extra_bits=b,this.extra_base=c,this.elems=d,this.max_length=e,this.has_stree=a&&a.length}function f(a,b){this.dyn_tree=a,this.max_code=0,this.stat_desc=b}function g(a){return a<256?ia[a]:ia[256+(a>>>7)]}function h(a,b){a.pending_buf[a.pending++]=255&b,a.pending_buf[a.pending++]=b>>>8&255}function i(a,b,c){a.bi_valid>X-c?(a.bi_buf|=b<<a.bi_valid&65535,h(a,a.bi_buf),a.bi_buf=b>>X-a.bi_valid,a.bi_valid+=c-X):(a.bi_buf|=b<<a.bi_valid&65535,a.bi_valid+=c)}function j(a,b,c){i(a,c[2*b],c[2*b+1])}function k(a,b){var c=0;do c|=1&a,a>>>=1,c<<=1;while(--b>0);return c>>>1}function l(a){16===a.bi_valid?(h(a,a.bi_buf),a.bi_buf=0,a.bi_valid=0):a.bi_valid>=8&&(a.pending_buf[a.pending++]=255&a.bi_buf,a.bi_buf>>=8,a.bi_valid-=8)}function m(a,b){var c,d,e,f,g,h,i=b.dyn_tree,j=b.max_code,k=b.stat_desc.static_tree,l=b.stat_desc.has_stree,m=b.stat_desc.extra_bits,n=b.stat_desc.extra_base,o=b.stat_desc.max_length,p=0;for(f=0;f<=W;f++)a.bl_count[f]=0;for(i[2*a.heap[a.heap_max]+1]=0,c=a.heap_max+1;c<V;c++)d=a.heap[c],f=i[2*i[2*d+1]+1]+1,f>o&&(f=o,p++),i[2*d+1]=f,d>j||(a.bl_count[f]++,g=0,d>=n&&(g=m[d-n]),h=i[2*d],a.opt_len+=h*(f+g),l&&(a.static_len+=h*(k[2*d+1]+g)));if(0!==p){do{for(f=o-1;0===a.bl_count[f];)f--;a.bl_count[f]--,a.bl_count[f+1]+=2,a.bl_count[o]--,p-=2}while(p>0);for(f=o;0!==f;f--)for(d=a.bl_count[f];0!==d;)e=a.heap[--c],e>j||(i[2*e+1]!==f&&(a.opt_len+=(f-i[2*e+1])*i[2*e],i[2*e+1]=f),d--)}}function n(a,b,c){var d,e,f=new Array(W+1),g=0;for(d=1;d<=W;d++)f[d]=g=g+c[d-1]<<1;for(e=0;e<=b;e++){var h=a[2*e+1];0!==h&&(a[2*e]=k(f[h]++,h))}}function o(){var a,b,c,d,f,g=new Array(W+1);for(c=0,d=0;d<Q-1;d++)for(ka[d]=c,a=0;a<1<<ba[d];a++)ja[c++]=d;for(ja[c-1]=d,f=0,d=0;d<16;d++)for(la[d]=f,a=0;a<1<<ca[d];a++)ia[f++]=d;for(f>>=7;d<T;d++)for(la[d]=f<<7,a=0;a<1<<ca[d]-7;a++)ia[256+f++]=d;for(b=0;b<=W;b++)g[b]=0;for(a=0;a<=143;)ga[2*a+1]=8,a++,g[8]++;for(;a<=255;)ga[2*a+1]=9,a++,g[9]++;for(;a<=279;)ga[2*a+1]=7,a++,g[7]++;for(;a<=287;)ga[2*a+1]=8,a++,g[8]++;for(n(ga,S+1,g),a=0;a<T;a++)ha[2*a+1]=5,ha[2*a]=k(a,5);ma=new e(ga,ba,R+1,S,W),na=new e(ha,ca,0,T,W),oa=new e(new Array(0),da,0,U,Y)}function p(a){var b;for(b=0;b<S;b++)a.dyn_ltree[2*b]=0;for(b=0;b<T;b++)a.dyn_dtree[2*b]=0;for(b=0;b<U;b++)a.bl_tree[2*b]=0;a.dyn_ltree[2*Z]=1,a.opt_len=a.static_len=0,a.last_lit=a.matches=0}function q(a){a.bi_valid>8?h(a,a.bi_buf):a.bi_valid>0&&(a.pending_buf[a.pending++]=a.bi_buf),a.bi_buf=0,a.bi_valid=0}function r(a,b,c,d){q(a),d&&(h(a,c),h(a,~c)),G.arraySet(a.pending_buf,a.window,b,c,a.pending),a.pending+=c}function s(a,b,c,d){var e=2*b,f=2*c;return a[e]<a[f]||a[e]===a[f]&&d[b]<=d[c]}function t(a,b,c){for(var d=a.heap[c],e=c<<1;e<=a.heap_len&&(e<a.heap_len&&s(b,a.heap[e+1],a.heap[e],a.depth)&&e++,!s(b,d,a.heap[e],a.depth));)a.heap[c]=a.heap[e],c=e,e<<=1;a.heap[c]=d}function u(a,b,c){var d,e,f,h,k=0;if(0!==a.last_lit)do d=a.pending_buf[a.d_buf+2*k]<<8|a.pending_buf[a.d_buf+2*k+1],e=a.pending_buf[a.l_buf+k],k++,0===d?j(a,e,b):(f=ja[e],j(a,f+R+1,b),h=ba[f],0!==h&&(e-=ka[f],i(a,e,h)),d--,f=g(d),j(a,f,c),h=ca[f],0!==h&&(d-=la[f],i(a,d,h)));while(k<a.last_lit);j(a,Z,b)}function v(a,b){var c,d,e,f=b.dyn_tree,g=b.stat_desc.static_tree,h=b.stat_desc.has_stree,i=b.stat_desc.elems,j=-1;for(a.heap_len=0,a.heap_max=V,c=0;c<i;c++)0!==f[2*c]?(a.heap[++a.heap_len]=j=c,a.depth[c]=0):f[2*c+1]=0;for(;a.heap_len<2;)e=a.heap[++a.heap_len]=j<2?++j:0,f[2*e]=1,a.depth[e]=0,a.opt_len--,h&&(a.static_len-=g[2*e+1]);for(b.max_code=j,c=a.heap_len>>1;c>=1;c--)t(a,f,c);e=i;do c=a.heap[1],a.heap[1]=a.heap[a.heap_len--],t(a,f,1),d=a.heap[1],a.heap[--a.heap_max]=c,a.heap[--a.heap_max]=d,f[2*e]=f[2*c]+f[2*d],a.depth[e]=(a.depth[c]>=a.depth[d]?a.depth[c]:a.depth[d])+1,f[2*c+1]=f[2*d+1]=e,a.heap[1]=e++,t(a,f,1);while(a.heap_len>=2);a.heap[--a.heap_max]=a.heap[1],m(a,b),n(f,j,a.bl_count)}function w(a,b,c){var d,e,f=-1,g=b[1],h=0,i=7,j=4;for(0===g&&(i=138,j=3),b[2*(c+1)+1]=65535,d=0;d<=c;d++)e=g,g=b[2*(d+1)+1],++h<i&&e===g||(h<j?a.bl_tree[2*e]+=h:0!==e?(e!==f&&a.bl_tree[2*e]++,a.bl_tree[2*$]++):h<=10?a.bl_tree[2*_]++:a.bl_tree[2*aa]++,h=0,f=e,0===g?(i=138,j=3):e===g?(i=6,j=3):(i=7,j=4))}function x(a,b,c){var d,e,f=-1,g=b[1],h=0,k=7,l=4;for(0===g&&(k=138,l=3),d=0;d<=c;d++)if(e=g,g=b[2*(d+1)+1],!(++h<k&&e===g)){if(h<l){do j(a,e,a.bl_tree);while(0!==--h)}else 0!==e?(e!==f&&(j(a,e,a.bl_tree),h--),j(a,$,a.bl_tree),i(a,h-3,2)):h<=10?(j(a,_,a.bl_tree),i(a,h-3,3)):(j(a,aa,a.bl_tree),i(a,h-11,7));h=0,f=e,0===g?(k=138,l=3):e===g?(k=6,l=3):(k=7,l=4)}}function y(a){var b;for(w(a,a.dyn_ltree,a.l_desc.max_code),w(a,a.dyn_dtree,a.d_desc.max_code),v(a,a.bl_desc),b=U-1;b>=3&&0===a.bl_tree[2*ea[b]+1];b--);return a.opt_len+=3*(b+1)+5+5+4,b}function z(a,b,c,d){var e;for(i(a,b-257,5),i(a,c-1,5),i(a,d-4,4),e=0;e<d;e++)i(a,a.bl_tree[2*ea[e]+1],3);x(a,a.dyn_ltree,b-1),x(a,a.dyn_dtree,c-1)}function A(a){var b,c=4093624447;for(b=0;b<=31;b++,c>>>=1)if(1&c&&0!==a.dyn_ltree[2*b])return I;if(0!==a.dyn_ltree[18]||0!==a.dyn_ltree[20]||0!==a.dyn_ltree[26])return J;for(b=32;b<R;b++)if(0!==a.dyn_ltree[2*b])return J;return I}function B(a){pa||(o(),pa=!0),a.l_desc=new f(a.dyn_ltree,ma),a.d_desc=new f(a.dyn_dtree,na),a.bl_desc=new f(a.bl_tree,oa),a.bi_buf=0,a.bi_valid=0,p(a)}function C(a,b,c,d){i(a,(L<<1)+(d?1:0),3),r(a,b,c,!0)}function D(a){i(a,M<<1,3),j(a,Z,ga),l(a)}function E(a,b,c,d){var e,f,g=0;a.level>0?(a.strm.data_type===K&&(a.strm.data_type=A(a)),v(a,a.l_desc),v(a,a.d_desc),g=y(a),e=a.opt_len+3+7>>>3,f=a.static_len+3+7>>>3,f<=e&&(e=f)):e=f=c+5,c+4<=e&&b!==-1?C(a,b,c,d):a.strategy===H||f===e?(i(a,(M<<1)+(d?1:0),3),u(a,ga,ha)):(i(a,(N<<1)+(d?1:0),3),z(a,a.l_desc.max_code+1,a.d_desc.max_code+1,g+1),u(a,a.dyn_ltree,a.dyn_dtree)),p(a),d&&q(a)}function F(a,b,c){return a.pending_buf[a.d_buf+2*a.last_lit]=b>>>8&255,a.pending_buf[a.d_buf+2*a.last_lit+1]=255&b,a.pending_buf[a.l_buf+a.last_lit]=255&c,a.last_lit++,0===b?a.dyn_ltree[2*c]++:(a.matches++,b--,a.dyn_ltree[2*(ja[c]+R+1)]++,a.dyn_dtree[2*g(b)]++),a.last_lit===a.lit_bufsize-1}var G=a("../utils/common"),H=4,I=0,J=1,K=2,L=0,M=1,N=2,O=3,P=258,Q=29,R=256,S=R+1+Q,T=30,U=19,V=2*S+1,W=15,X=16,Y=7,Z=256,$=16,_=17,aa=18,ba=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],ca=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],da=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],ea=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],fa=512,ga=new Array(2*(S+2));
d(ga);var ha=new Array(2*T);d(ha);var ia=new Array(fa);d(ia);var ja=new Array(P-O+1);d(ja);var ka=new Array(Q);d(ka);var la=new Array(T);d(la);var ma,na,oa,pa=!1;c._tr_init=B,c._tr_stored_block=C,c._tr_flush_block=E,c._tr_tally=F,c._tr_align=D},{"../utils/common":83}],95:[function(a,b,c){"use strict";function d(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}b.exports=d},{}]},{},[1]);
/*! Table of Contents jQuery Plugin - jquery.toc * Copyright 2013 Nikhil Dabas * http://www.apache.org/licenses/LICENSE-2.0 */
(function(t){"use strict";var n=function(n){return this.each(function(){var i,e,a=t(this),c=a.data(),o=[a],h=this.tagName,r=0;i=t.extend({content:"body",headings:"h1,h2,h3"},{content:c.toc||void 0,headings:c.tocHeadings||void 0},n),e=i.headings.split(","),t(i.content).find(i.headings).attr("id",function(n,i){return i||t(this).text().replace(/^[^A-Za-z]*/,"").replace(/[^A-Za-z0-9]+/g,"_")}).each(function(){var n=t(this),i=t.map(e,function(t,i){return n.is(t)?i:void 0})[0];if(i>r){var a=o[0].children("li:last")[0];a&&o.unshift(t("<"+h+"/>").appendTo(a))}else o.splice(0,Math.min(r-i,Math.max(o.length-1,0)));t("<li/>").appendTo(o[0]).append(t("<a/>").text(n.text()).attr("href","#"+n.attr("id"))),r=i})})},i=t.fn.toc;t.fn.toc=n,t.fn.toc.noConflict=function(){return t.fn.toc=i,this},t(function(){n.call(t("[data-toc]"))})})(window.jQuery);
(function app_data(data, $) {

var force_update = false;

/**
 * loads the database from local
 * sets up a Promise on all data loading/updating
 * @memberOf data
 */
data.load = function load() {
	
	data.isLoaded = false;

	var fdb = new ForerunnerDB();
	data.db = fdb.db('mydb');
	console.log('hallo app.data.js')
	console.log(data.db)
	// seems that indexedDB is failing in chrome, so switching to localstorage for now
	data.db.persist.driver("LocalStorage");

	data.masters = {
		packs: data.db.collection('master_pack', {primaryKey:'code', changeTimestamp: true}),
		cards: data.db.collection('master_card', {primaryKey:'code', changeTimestamp: true}),
		taboos: data.db.collection('master_taboo', {primaryKey:'code', changeTimestamp: true})
	};

	data.dfd = {
		packs: new $.Deferred(),
		cards: new $.Deferred(),
		taboos: new $.Deferred()
	};

	$.when(data.dfd.packs, data.dfd.cards, data.dfd.taboos).done(data.update_done).fail(data.update_fail);

		// load pack data 
	data.masters.taboos.load(function (err) {
		if(err) {
			console.log('error when loading taboos', err);
			force_update = true;
		}
		// load pack data 
		data.masters.packs.load(function (err) {
			if(err) {
				console.log('error when loading packs', err);
				force_update = true;
			}
			// loading cards
			data.masters.cards.load(function (err) {
				if(err) {
					console.log('error when loading cards', err);
					force_update = true;
				}

				/*
				 * data has been fetched from local store
				 */

				/*
				 * if database is older than 10 days, we assume it's obsolete and delete it
				 */
				var age_of_database = new Date() - new Date(data.masters.cards.metaData().lastChange);
				if(age_of_database > 864000000) {
					console.log('database is older than 10 days => refresh it');
					force_update = true;
				}

				/*
				 * if database is empty, we will wait for the new data
				 */
				if(data.masters.packs.count() === 0 || data.masters.cards.count() === 0 || data.masters.taboos.count() === 0) {
					console.log('database is empty => load it', data.masters.packs.count(), data.masters.cards.count(), data.masters.taboos.count());
					force_update = true;
				}

				/*
				 * triggering event that data is loaded
				 */
				if(!force_update) {
					data.release();
				}

				/*
				 * then we ask the server if new data is available
				 */
				data.query();
			});
		});
	});
}

/**
 * release the data for consumption by other modules
 * @memberOf data
 */
data.release = function release() {
	data.packs = data.db.collection('pack', {primaryKey:'code', changeTimestamp: false});
	data.packs.setData(data.masters.packs.find());

	data.cards = data.db.collection('card', {primaryKey:'code', changeTimestamp: false});
	data.cards.setData(data.masters.cards.find());

	data.taboos = data.db.collection('taboo', {primaryKey:'code', changeTimestamp: false});
	data.taboos.setData(data.masters.taboos.find());

	data.isLoaded = true;
	
	$(document).trigger('data.app');
}

/**
 * triggers a forced update of the database
 * @memberOf data
 */
data.update = function update() {
	_.each(data.masters, function (collection) {
		collection.drop();
	});
	data.load();
}

/**
 * queries the server to update data
 * @memberOf data
 */
data.query = function query() {
	$.ajax({
		url: Routing.generate('api_packs'),
		success: data.parse_packs,
		error: function (jqXHR, textStatus, errorThrown) {
			console.log('error when requesting packs', errorThrown);
			data.dfd.packs.reject(false);
		}
	});

	$.ajax({
		url: Routing.generate('api_taboos'),
		success: data.parse_taboos,
		error: function (jqXHR, textStatus, errorThrown) {
			console.log('error when requesting taboos', errorThrown);
			data.dfd.taboos.reject(false);
		}
	});

	$.ajax({
		url: Routing.generate('api_cards')+"?encounter=1",
		success: data.parse_cards,
		error: function (jqXHR, textStatus, errorThrown) {
			console.log('error when requesting cards', errorThrown);
			data.dfd.cards.reject(false);
		}
	});
};

/**
 * called if all operations (load+update) succeed (resolve)
 * deferred returns true if data has been updated
 * @memberOf data
 */
data.update_done = function update_done(packs_updated, cards_updated, taboos_updated) {
	if(force_update) {
		data.release();
		return;
	}

	if(packs_updated === true || cards_updated === true) {
		/*
		 * we display a message informing the user that they can reload their page to use the updated data
		 * except if we are on the front page, because data is not essential on the front page
		 */
		if($('.site-title').size() === 0) {
			var message = "A new version of the data is available. Click <a href=\"javascript:window.location.reload(true)\">here</a> to reload your page.";
			app.ui.insert_alert_message('warning', message);
		}
	}
};

/**
 * called if an operation (load+update) fails (reject)
 * deferred returns true if data has been loaded
 * @memberOf data
 */
data.update_fail = function update_fail(packs_loaded, cards_loaded) {
	if(packs_loaded === false || cards_loaded === false) {
		var message = "Unable to load the data. Click <a href=\"javascript:window.location.reload(true)\">here</a> to reload your page.";
		app.ui.insert_alert_message('danger', message);
	} else {
		/*
		 * since data hasn't been persisted, we will have to do the query next time as well
		 * -- not much we can do about it
		 * but since data has been loaded, we call the promise
		 */
		data.release();
	}
};

/**
 * updates the database if necessary, from fetched data
 * @memberOf data
 */
data.update_collection = function update_collection(data, collection, lastModifiedData, deferred) {
	var lastChangeDatabase = new Date(collection.metaData().lastChange)
	var isCollectionUpdated = false;

	/*
	 * if we decided to force the update,
	 * or if the database is fresh,
	 * or if the database is older than the data,
	 * then we update the database
	 */
	if(force_update || !lastChangeDatabase || lastChangeDatabase < lastModifiedData) {
		console.log('data is newer than database or update forced => update the database')
		collection.setData(data);
		isCollectionUpdated = true;
	}

	collection.save(function (err) {
		if(err) {
			console.log('error when saving '+collection.name(), err, collection);
			deferred.reject(true)
		} else {
			deferred.resolve(isCollectionUpdated);
		}
	});
}

data.apply_taboos = function apply_taboos(taboo_id){
	// reset previous taboo changes
	app.data.cards.find({'taboo':true}).forEach(function (card){
		var update = {};
		update.taboo = false;
		if (card.taboo_exceptional){
			update.exceptional = false;
			update.taboo_exceptional = false;
		}
		update.taboo_xp = 0;
		update.taboo_text = "";
		app.data.cards.updateById(card.code, update);
	});
	
	//console.log("taboos", taboo_id);
	var taboo = app.data.taboos.findOne({'id':parseInt(taboo_id)});
	if (taboo){
		var parsed_taboo = JSON.parse(taboo.cards);
		parsed_taboo.forEach(function (taboo_card){
			//console.log(taboo_card);
			
			var card = app.data.cards.findOne({'code':taboo_card.code});
			var update = {'taboo': true};
			if (taboo_card.exceptional){
				update.exceptional = true;
				update.taboo_exceptional = true;
			}
			if (taboo_card.xp){
				update.taboo_xp = taboo_card.xp;
			}
			if (taboo_card.text){
				update.taboo_text = taboo_card.text;
			}
			app.data.cards.updateById(card.code, update);
		});
	}
}

/**
 * handles the response to the ajax query for packs data
 * @memberOf data
 */
data.parse_packs = function parse_packs(response, textStatus, jqXHR) {
	var lastModified = new Date(jqXHR.getResponseHeader('Last-Modified'));
	data.update_collection(response, data.masters.packs, lastModified, data.dfd.packs);
};

/**
 * handles the response to the ajax query for the cards data
 * @memberOf data
 */
data.parse_cards = function parse_cards(response, textStatus, jqXHR) {
	var lastModified = new Date(jqXHR.getResponseHeader('Last-Modified'));
	data.update_collection(response, data.masters.cards, lastModified, data.dfd.cards);
};

/**
 * handles the response to the ajax query for the cards data
 * @memberOf data
 */
data.parse_taboos = function parse_taboos(response, textStatus, jqXHR) {
	var lastModified = new Date(jqXHR.getResponseHeader('Last-Modified'));
	data.update_collection(response, data.masters.taboos, lastModified, data.dfd.taboos);
};

$(function() {
	data.load();
});

})(app.data = {}, jQuery);

(function app_format(format, $) {

/**
 * @memberOf format
 */
format.traits = function traits(card) {
	return card.traits || '';
};



format.xp = function xp(xp, in_deck, css) {
	var string = "";
	if (xp && xp > 0)
	{
 		string += ' <span class="card-xp xp-'+xp+'';
 		if (css){
 			string += ' '+css;
 		}
 		string += '">'+("••••••".slice(-xp))+"</span>";
	}
	return string;
};



/**
 * @memberOf format
 */
format.fancy_int = function traits(num) {
	var string = (num != null ? (num < 0 ? "X" : num) : '&ndash;')
	return string;
};

/**
 * @memberOf format
 */
format.name = function name(card) {
	var name = (card.is_unique ? '<span class="icon-unique"></span> ' : "") + card.name;
	if (card.subname){
		name += '<div class="card-subname small">'+card.subname+'</div>';
	}
	return name;
}

format.faction = function faction(card) {
	var text = '<span class="fg-'+card.faction_code+' icon-'+card.faction_code+'"></span> '+ card.faction_name + '. ';
	if (card.faction2_code) {
		text += '<span class="fg-'+card.faction2_code+' icon-'+card.faction2_code+'"></span> '+ card.faction2_name + '. ';
	}
	return text;
}

/**
 * @memberOf format
 */
format.pack = function pack(card) {
	var text = card.pack_name + ' #' + card.position + '. ';
	if (card.encounter_name){
		text += card.encounter_name;
		if (card.encounter_position){
			text += " #"+card.encounter_position;
			if (card.quantity > 1){
				text += "-";
				text += (card.encounter_position+card.quantity-1);
			}
		}
	}
	return text;
}

/**
 * @memberOf format
 */
format.info = function info(card) {
	var text = '';
	switch(card.type_code) {
		case 'agenda':
			text += '<div>Doom: '+format.fancy_int(card.doom)+'.</div>';
			break;
		case 'act':
			text += '<div>Clues: '+format.fancy_int(card.clues)+'.</div>';
			break;
		case 'location':
			if (card.clues_fixed || card.clues == 0){
				text += '<div>Shroud: '+format.fancy_int(card.shroud)+'. Clues: '+format.fancy_int(card.clues)+'.</div>';
			} else {
				text += '<div>Shroud: '+format.fancy_int(card.shroud)+'. Clues: '+format.fancy_int(card.clues)+'<span class="icon icon-per_investigator"></span>.</div>';
			}
			break;
		case 'enemy':
			text += '<div>Fight: '+format.fancy_int(card.enemy_fight)+'. Health: '+format.fancy_int(card.health)+'';
			if (card.health_per_investigator){
				text += '<span class="icon icon-per_investigator"></span>';
			}
			text += '. Evade: '+format.fancy_int(card.enemy_evade)+'.</div>';
			text += '<div>Damage: '+format.fancy_int(card.enemy_damage)+'. Horror: '+format.fancy_int(card.enemy_horror)+'.</div>';
			break;
		case 'investigator':
			text += '<div>Willpower: '+card.skill_willpower+'. Intellect: '+card.skill_intellect+'. Combat: '+card.skill_combat+'. Agility: '+card.skill_agility+'.</div>';
			text += '<div>Health: '+card.health+'. Sanity: '+card.sanity+'.</div>'
			break;	
		case 'asset':
		case 'event':
			text += '<div>Cost: '+format.fancy_int(card.cost)+'. '+(card.xp ? "XP: "+card.xp+"." : "")+'</div>';

			if (card.skill_willpower || card.skill_intellect || card.skill_combat || card.skill_agility || card.skill_wild){
				text += '<div>Test Icons: ';
				if (card.skill_willpower){
					text += Array(card.skill_willpower+1).join('<span class="icon icon-willpower color-willpower"></span>');
				}
				if (card.skill_intellect){
					text += Array(card.skill_intellect+1).join('<span class="icon icon-intellect color-intellect"></span>');
				}
				if (card.skill_combat){
					text += Array(card.skill_combat+1).join('<span class="icon icon-combat color-combat"></span>');
				}
				if (card.skill_agility){
					text += Array(card.skill_agility+1).join('<span class="icon icon-agility color-agility"></span>');
				}
				if (card.skill_wild){
					text += Array(card.skill_wild+1).join('<span class="icon icon-wild color-wild"></span>');
				}
				text += '</div>';
			}
			if (card.health || card.sanity){
				text += '<div>Health: '+format.fancy_int(card.health)+'. Sanity: '+format.fancy_int(card.sanity)+'.</div>';
			}
			break;
		case 'skill':
			if (card.xp){
				text += '<div>'+(card.xp ? "XP: "+card.xp+"." : "")+'</div>';
			}
			if (card.skill_willpower || card.skill_intellect || card.skill_combat || card.skill_agility || card.skill_wild){
				text += '<div>Test Icons: ';
				if (card.skill_willpower){
					text += Array(card.skill_willpower+1).join('<span class="icon icon-willpower color-willpower"></span>');
				}
				if (card.skill_intellect){
					text += Array(card.skill_intellect+1).join('<span class="icon icon-intellect color-intellect"></span>');
				}
				if (card.skill_combat){
					text += Array(card.skill_combat+1).join('<span class="icon icon-combat color-combat"></span>');
				}
				if (card.skill_agility){
					text += Array(card.skill_agility+1).join('<span class="icon icon-agility color-agility"></span>');
				}
				if (card.skill_wild){
					text += Array(card.skill_wild+1).join('<span class="icon icon-wild color-wild"></span>');
				}
				text += '</div>';
			}
			break;
	}
	return text;
};

/**
 * @memberOf format
 */
format.text = function text(card, alternate) {
	var text = card.text || '';
	if (alternate){
		text = card[alternate];
	}
	text = text.replace(/\[\[([^\]]+)\]\]/g, '<b><i>$1</i></b>');
	text = text.replace(/\[(\w+)\]/g, '<span title="$1" class="icon-$1"></span>');
	text = text.split("\n").join('</p><p>');
	return '<p>'+text+'</p>';
};

/**
 * @memberOf format
 */
format.back_text = function back_text(card) {
	var text = card.back_text || '';
	text = text.replace(/\[\[([^\]]+)\]\]/g, '<b><i>$1</i></b>');
	text = text.replace(/\[(\w+)\]/g, '<span title="$1" class="icon-$1"></span>')
	text = text.split("\n").join('</p><p>');
	return '<p>'+text+'</p>';
};

/**
 * @memberOf format
 */
format.html_page = function back_text(element) {
	var curInnerHTML = element.innerHTML;
	curInnerHTML = curInnerHTML.replace(/\[\[([^\]]+)\]\]/g, '<b><i>$1</i></b>');
	curInnerHTML = curInnerHTML.replace(/\[(\w+)\]/g, '<span title="$1" class="icon-$1"></span>');
	element.innerHTML = curInnerHTML;
};


})(app.format = {}, jQuery);

(function app_tip(tip, $) {

var cards_zoom_regexp = /card\/(\d\d\d\d\d)$/,
	mode = 'text',
	hide_event = 'mouseout';

function display_card_on_element(card, element, event) {
	var content;
	var back_only = false;
	var front_only = false;
	if ($(element).data('back')) {
		back_only = $(element).data('back');
	}
	if ($(element).data('front')) {
		front_only = $(element).data('front');
	}
	if(mode == 'text') {
		var image = card.imagesrc ? '<div class="card-thumbnail card-thumbnail-3x card-thumbnail-'+card.type_code+'" style="background-image:url('+card.imagesrc+')"></div>' : "";		
		content = image	+ '<h4 class="card-name">' + app.format.name(card) + '</h4>';
		if (!back_only) {
			content = content + '<div class="card-faction">' + app.format.faction(card) + '</div>';
			content = content + '<div><span class="card-type">'+card.type_name+((card.type_code == "agenda" || card.type_code == "act") ? '. Stage '+card.stage : '')+(card.slot ? '. '+card.slot : "")+(card.subtype_name ? '. '+card.subtype_name : "")+'</span></div>';
			content = content + '<div class="card-traits">' + app.format.traits(card) + '</div>';
		}
		
		if (card.type_code == "agenda" || card.type_code == "act"){
			content += '<div class="card-info">' + app.format.info(card) + '</div>';
			content += '<div class="card-flavor">' + card.flavor + '</div><div class="card-text border-'+card.faction_code+'">' + app.format.text(card) + '</div>' 
		} else if (card.type_code == "location"){			
			if (card.back_text){
				content += '<div class="card-text">' + app.format.back_text(card) + '</div>';
			}
			if (card.back_flavor){
				content += '<div class="card-flavor">' + card.back_flavor + '</div>';
			}
			content += '<hr />';
			content += '<div class="card-info">' + app.format.info(card) + '</div>';
			content += '<div class="card-text border-'+card.faction_code+'">' + app.format.text(card) + '</div>';
		}else {
			if (!back_only) {
				content += '<div class="card-info">' + app.format.info(card) + '</div>';
				content += '<div class="card-text border-'+card.faction_code+'">' + app.format.text(card) + '</div>';
				if (card.taboo_text){
					content += '<div class="card-text-taboo border-'+card.faction_code+'">' + app.format.text(card, "taboo_text") + '</div>'
				}
				if (card.taboo_xp){
					content += '<div class="card-text-taboo border-'+card.faction_code+'">This card costs ' + card.taboo_xp + ' additional experience</div>'
				}
			}
			if (!front_only) {
				if (card.double_sided){
					content += '<hr />';
					if (card.back_flavor){
						//content += '<div class="card-flavor">' + card.back_flavor + '</div>';
					}
					if (card.back_text){
						content += '<div class="card-text border-'+card.faction_code+'">' + app.format.back_text(card) + '</div>';
					}
				}
			}
		}
		
		if (card.victory){
			content += '<div class="card-type">Victory ' + card.victory + '.</div>'
		}

		if (card.vengeance){
			content += '<div class="card-type">Vengeance ' + card.vengeance + '.</div>'
		}
		
		content += '<div class="card-pack">' + app.format.pack(card) + '</div>';
	
	}
	else {
		content = card.imagesrc ? '<img src="'+card.imagesrc+'">' : "";
	}

	var qtip = {
		content : {
			text : content
		},
		style : {
			classes : 'card-content qtip-bootstrap qtip-thronesdb qtip-thronesdb-' + mode
		},
		position : {
			my : mode == 'text' ? 'center left' : 'top left',
			at : mode == 'text' ? 'center right' : 'bottom right',
			viewport : $(window)
		},
		show : {
			event : event.type,
			ready : true,
			solo : true
		},
		hide: {
			event: hide_event
		}
	};
	
	$(element).qtip(qtip, event);
}

/**
 * @memberOf tip
 * @param event
 */
tip.display = function display(event) {	
	var code = $(this).data('code');
	var card = app.data.cards.findById(code);
	if (!card) return;
	if ($(this).hasClass('spoiler')){
		var card = {
			"name": "Encounter Spoiler",
			"text": "Encounter cards are hidden by default, click to reveal this card.\n You can also turn off spoiler protection for this session or change the setting in your user preferences\n <i>\"The oldest and strongest emotion of mankind is fear, and the oldest and strongest kind of fear is fear of the unknown\"</i>",
			"traits": "",
			"faction_name": "Spoiler",
			"type_name": "Hidden",
			"pack_name": "Unseen Horrors",
			"flavour": "",
			"position": "???"
		};
		display_card_on_element(card, this, event);
		return
	}
	display_card_on_element(card, this, event);
};

/**
 * @memberOf tip
 * @param event
 */
tip.reveal = function reveal(event) {	
	if ($(this).hasClass('spoiler')){
		$(this).removeClass('spoiler');
		$('.spoiler', this.parentNode.parentNode).removeClass('spoiler');
		event.preventDefault();
	}
};

/**
 * @memberOf tip
 * @param event
 */
tip.update_spoiler_cookie = function update_spoiler_cookie(event) {	
	if ($(this).is(':checked')){
		createCookie("spoilers", "hide");
		window.location.reload(false);
	} else {
		createCookie("spoilers", "show");
		window.location.reload(false);
	}
};

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        var expires = "; expires=" + date.toUTCString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

/**
 * @memberOf tip
 * @param event
 */
tip.guess = function guess(event) {
	if($(this).hasClass('no-popup')) return;
	var href = $(this).get(0).href;
	if(href && href.match(cards_zoom_regexp)) {
		var code = RegExp.$1;
		var generated_url = Routing.generate('cards_zoom', {card_code:code}, true);
		var card = app.data.cards.findById(code);
		if(card && href === generated_url) {
			display_card_on_element(card, this, event);
		}
	}
}

tip.set_mode = function set_mode(opt_mode) {
	if(opt_mode == 'text' || opt_mode == 'image') {
		mode = opt_mode;
	}
}

tip.set_hide_event = function set_hide_event(opt_hide_event) {
	if(opt_hide_event == 'mouseout' || opt_hide_event == 'unfocus') {
		hide_event = opt_hide_event;
	}
}

$(document).on('start.app', function () {
	$('body').on({
		mouseover : tip.display,
		click : tip.reveal
	}, 'a.card-tip');
	
	$('body').on({
		click : tip.reveal
	}, '.spoiler');

	$('body').on({
		mouseover : tip.guess
	}, 'a:not(.card-tip)');
	
	$('body').on({
		change : tip.update_spoiler_cookie
	}, '#spoilers');

});
$(document).ready(function () {
	if (readCookie("spoilers") == "show"){
		$('#spoilers').prop('checked', false);
	}
});

})(app.tip = {}, jQuery);

(function app_card_modal(card_modal, $) {

var modal = null;

/**
 * @memberOf card_modal
 */
card_modal.display_modal = function display_modal(event, element) {
	event.preventDefault();
	$(element).qtip('destroy', true);
	fill_modal($(element).data('code'));
};

/**
 * @memberOf card_modal
 */
card_modal.typeahead = function typeahead(event, card) {
	fill_modal(card.code);
	$('#cardModal').modal('show');
};

function fill_modal (code) {
	var card = app.data.cards.findById(code),
		modal = $('#cardModal');

	if(!card) return;

	modal.data('code', code);
	modal.find('.card-modal-link').attr('href', card.url);
	modal.find('h3.modal-title').html(app.format.name(card));
	modal.find('.modal-image').html('<img class="img-responsive" src="'+card.imagesrc+'">');
	modal.find('.modal-info').html(
			'<div class="card-faction">' + app.format.faction(card) + '</div>'
			+ '<div class="card-info">' + app.format.info(card) + '</div>'
			+ '<div class="card-traits">' + app.format.traits(card) + '</div>'
			+ '<div class="card-text border-'+card.faction_code+'">' + app.format.text(card) + '</div>'
			+ (card.taboo_text ? '<div class="card-text-taboo border-'+card.faction_code+'">' + app.format.text(card, "taboo_text") + '</div>' : '')
			+ (card.taboo_xp ? '<div class="card-text-taboo border-'+card.faction_code+'">This card costs ' + card.taboo_xp + ' additional experience</div>' : '')
			+ '<div class="card-pack">' + app.format.pack(card) + '</div>'
	);
	
	var qtyelt = modal.find('.modal-qty');
	if(qtyelt && card.maxqty) {
		var qty = '';
	  	for(var i=0; i<=card.maxqty; i++) {
	  		qty += '<label class="btn btn-sm btn-default"><input type="radio" name="qty" value="'+i+'">'+i+'</label>';
	  	}
	  	qtyelt.html(qty);

	  	qtyelt.find('label').each(function (index, element) {
			if(index == card.indeck) $(element).addClass('active');
			else $(element).removeClass('active');
		});

	} else {
		if(qtyelt) qtyelt.closest('.row').remove();
	}
	var qtyelt = modal.find('.modal-ignore');
	
	if(qtyelt && card.maxqty && (card.code == "05040" || card.real_traits.indexOf('Fortune.') !== -1 || card.real_traits.indexOf('Gambit.') !== -1 ) ) {
		qtyelt.closest('.modal-deck-ignore').show();
		var qty = '';
		for(var i=0; i<=card.maxqty; i++) {
			if (card.ignore == i) {
				qty += '<label class="btn btn-sm btn-default active"><input type="radio" name="ignoreqty" value="'+i+'">'+i+'</label>';
			} else {
				qty += '<label class="btn btn-sm btn-default"><input type="radio" name="ignoreqty" value="'+i+'">'+i+'</label>';
			}
		}
		qtyelt.html(qty);
	} else {
		if(qtyelt) qtyelt.closest('.modal-deck-ignore').hide();
	}
}

$(function () {

	$('body').on({click: function (event) {
		var element = $(this);
		if(event.shiftKey || event.altKey || event.ctrlKey || event.metaKey) {
			event.stopPropagation();
			return;
		}
		card_modal.display_modal(event, element);
	}}, '.card');

})

})(app.card_modal = {}, jQuery);

(function app_user(user, $) {
console.log('app.user.js')
console.log(user)
user.params = {};

/**
 * Deferred Object. The handlers are defined at the end of the module, once the functions are declared
 * resolve: the User is logged in (authenticated session)
 * reject: the User is not logged in (anonymous session)
 */
user.loaded = $.Deferred();

/**
 * @memberOf user
 */
user.query = function query() {
	$.ajax(Routing.generate('user_info', user.params), {
		cache: false,
		dataType: 'json',
		success: function(data, textStatus, jqXHR) {
			user.data = data;
			if(user.data) {
				user.loaded.resolve();
			} else {
				user.loaded.reject();
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('['+moment().format('YYYY-MM-DD HH:mm:ss')+'] Error on '+this.url, textStatus, errorThrown);
			user.loaded.reject();
		}
	});
};

/**
 * @memberOf user
 */
user.retrieve = function retrieve() {
	if(localStorage) {
		var timestamp = new Date(parseInt(localStorage.getItem('user_timestamp'),10));
		var now = new Date();
		if(now - timestamp < 3600000) {
			var storedData = localStorage.getItem('user');
			if(storedData) {
				user.data = JSON.parse(storedData);
				if(user.data) {
					user.loaded.resolve();
				} else {
					user.loaded.reject();
				}
				return;
			}
		}
	}
	user.query();
};

/**
 * @memberOf user
 */
user.wipe = function wipe() {
	localStorage.removeItem('user');
	localStorage.removeItem('user_timestamp');
};

/**
 * @memberOf user
 */
user.store = function store() {
	localStorage.setItem('user', JSON.stringify(user.data));
	localStorage.setItem('user_timestamp', new Date().getTime());
};

/**
 * @memberOf user
 */
user.anonymous = function anonymous() {
	user.wipe();
	user.dropdown('<ul class="dropdown-menu"><li><a href="'+Routing.generate('fos_user_security_login')+'">Login or Register</a></li></ul>');
};

/**
 * @memberOf user
 */
user.update = function update() {
	user.store();
	user.dropdown('<ul class="dropdown-menu"><li><a href="'
			+ Routing.generate('collection_packs')
			+ '">My Collection</a></li><li><a href="'
			+ Routing.generate('user_profile_edit')
			+ '">Edit account</a></li><li><a href="'
			+ user.data.public_profile_url
			+ '">Public profile</a></li><li><a href="'
			+ Routing.generate('fos_user_security_logout')
			+ '" onclick="app.user.wipe()">Log out</a></li></ul>');
};

user.dropdown = function dropdown(list) {
	$('#login a').append('<span class="caret"></span>').removeClass('disabled').addClass('dropdown-toggle').attr('data-toggle', 'dropdown').after(list);
}

/**
 * @memberOf user
 */
user.display_ads = function display_ads() {
	// show ads if not donator
	if(user.data && user.data.donation > 0) return;

	adsbygoogle = window.adsbygoogle || [];

	$('div.ad').each(function (index, element) {
		$(element).show();
		adsbygoogle.push({});
	});
/*
	if($('ins.adsbygoogle').filter(':visible').length === 0) {
		$('div.ad').each(function (index, element) {
			$(element).addClass('ad-blocked').html("Please whitelist us<br>or <a href=\""+Routing.generate('donators')+"\">donate</a>.");
		});
	}
*/
}

user.loaded.done(user.update).fail(user.anonymous).always(user.display_ads);

$(function() {
	if($.isEmptyObject(user.params) && !user.forceReload) {
		user.retrieve();
	} else {
		user.query();
	}
});

})(app.user = {}, jQuery);

/**
 * binomial coefficient module, shamelessly ripped from https://github.com/pboyer/binomial.js
 */
(function app_binomial(binomial, $) {
	
	var memo = [];
	
	/**
	 * @memberOf binomial
	 */
	binomial.get = function(n, k) {
		if (k === 0) {
			return 1;
		}
		if (n === 0 || k > n) {
			return 0;
		}
		if (k > n - k) {
        	k = n - k;
        }
		if ( memo_exists(n,k) ) {
			return get_memo(n,k);
		}
	    var r = 1,
	    	n_o = n;
	    for (var d=1; d <= k; d++) {
	    	if ( memo_exists(n_o, d) ) {
	    		n--;
	    		r = get_memo(n_o, d);
	    		continue;
	    	}
			r *= n--;
	  		r /= d;
	  		memoize(n_o, d, r);
	    }
	    return r;
	};
	
	function memo_exists(n, k) {
		return ( memo[n] != undefined && memo[n][k] != undefined );
	}
	
	function get_memo(n, k) {
		return memo[n][k];
	}
	
	function memoize(n, k, val) {
		if ( memo[n] === undefined ) {
			memo[n] = [];
		}
		memo[n][k] = val;
	}
	
})(app.binomial = {}, jQuery);

/**
 * hypergeometric distribution module, homemade
 */ 
(function app_hypergeometric(hypergeometric, $) {
	
	var memo = [];
	
	/**
	 * @memberOf hypergeometric
	 */
	hypergeometric.get = function(k, N, K, n) {
		if ( !k || !N || !K || !n ) return 0;
		if ( memo_exists(k, N, K, n) ) {
			return get_memo(k, N, K, n);
		}
		if ( memo_exists(n - k, N, N - K, n) ) {
			return get_memo(n - k, N, N - K, n);
		}
		if ( memo_exists(K - k, N, K, N - n) ) {
			return get_memo(K - k, N, K, N - n);
		}
		if ( memo_exists(k, N, n, K) ) {
			return get_memo(k, N, n, K);
		}
		var d = app.binomial.get(N, n);
		if(d === 0) return 0;
		var r = app.binomial.get(K, k) * app.binomial.get(N - K, n - k) / d;
		memoize(k, N, K, n, r);
		return r;
	}
	
	/**
	 * @memberOf hypergeometric
	 */
	hypergeometric.get_cumul = function(k, N, K, n) {
		var r = 0;
		for(; k <= n; k++) {
			r += hypergeometric.get(k, N, K, n);
		}
		return r;
	}
	
	/**
	 * @memberOf hypergeometric
	 */
	function memo_exists(k, N, K, n) {
		return ( memo[k] != undefined && memo[k][N] != undefined && memo[k][N][K] != undefined && memo[k][N][K][n] != undefined );
	}
	
	/**
	 * @memberOf hypergeometric
	 */
	function get_memo(k, N, K, n) {
		return memo[k][N][K][n];
	}
	
	/**
	 * @memberOf hypergeometric
	 */
	function memoize(k, N, K, n, val) {
		if ( memo[k] === undefined ) {
			memo[k] = [];
		}
		if ( memo[k][N] === undefined ) {
			memo[k][N] = [];
		}
		if ( memo[k][N][K] === undefined ) {
			memo[k][N][K] = [];
		}
		memo[k][N][K][n] = val;
	}
	
})(app.hypergeometric = {}, jQuery);

(function app_draw_simulator(draw_simulator, $) {

var deck = [],
	hand = [],
	initial_size = 0,
	draw_count = 0,
	container = null;


/**
 * @memberOf draw_simulator
 */
draw_simulator.on_data_loaded = function on_data_loaded() {
	draw_simulator.init();
}

/**
 * @memberOf draw_simulator
 */
draw_simulator.on_dom_loaded = function on_dom_loaded() {
	container = $('#table-draw-simulator-content');
	$('#table-draw-simulator').on('click', 'button.btn', draw_simulator.handle_click);
	$('#table-draw-simulator').on('click', 'div.simulator-hand-card', draw_simulator.select_card);
	$('#oddsModal').on({change: draw_simulator.compute_odds}, 'input');
}

draw_simulator.select_card = function select_card(event) {
	var index = $(this).attr('data-hand-id');
	if (hand[index]){
		if (hand[index].selected){
			hand[index].selected = false;
		} else {
			hand[index].selected = true;
		}
	}
	draw_simulator.render();
}

/**
 * @memberOf draw_simulator
 */
draw_simulator.init = function init() {
	deck = [];
	hand = [];
	draw_count = 0;
	var cards = app.deck.get_real_draw_deck();
	cards.forEach(function (card) {
		for(var ex = 0; ex < card.indeck; ex++) {
			if (card.name == "Duke" || card.permanent){
				return;
			}
			var new_card = {};
			new_card.data = card;
			deck.push(new_card);
		}
	});
	initial_size = deck.length;
	draw_simulator.render();
}


// store the deck and hand in an object, and just use this to draw the cards
draw_simulator.render = function() {
	$(container).empty();
	$.each(hand, function(key, card){
		if (card.data){
			var card_element = $('<div class="simulator-hand-card" data-hand-id="'+(key)+'" data-type="'+card.data.type_code+'" data-subtype="'+card.data.subtype_code+'"></div>');
			if (card.selected){
				card_element.css('opacity', 0.6);
				$('[data-command=redraw]').prop('disabled', false);
				$('[data-command=reshuffle]').prop('disabled', false);
			}
			if(card.data.imagesrc) {
				card_element.append('<img src="'+card.data.imagesrc+'">');
			} else {
				card_element.append('<div>'+card.data.name+'</div>');
			}
			container.append(card_element);
			if (card.data.subtype_code && (card.data.subtype_code == "weakness" || card.data.subtype_code == "basicweakness") ){
				//$('[data-command=redraw]').prop('disabled', false);
			}
		}
	});
	draw_simulator.update_odds();
}

/**
 * @memberOf draw_simulator
 * @param draw integer
 */
draw_simulator.draw = function draw(qty) {
	for(var pick = 0; pick < qty && deck.length > 0; pick++) {
		var rand = Math.floor(Math.random() * deck.length);
		var spliced = deck.splice(rand, 1);
		var card = spliced[0];
		hand.push(card);
		draw_count++;
	}
	draw_simulator.render();
}


/**
 * @memberOf draw_simulator
 */
draw_simulator.reset = function reset() {
	draw_simulator.init();
};


/**
 * @memberOf draw_simulator
 */
draw_simulator.reshuffle = function reshuffle(redraw) {
	$('[data-command=redraw]').prop('disabled', true);
	$('[data-command=reshuffle]').prop('disabled', true);
	
	var count = 0;
	var keys_to_clear = [];
	$.each(hand, function(key, value){
		//if (value && (value.subtype_code == "weakness" || value.subtype_code == "basicweakness")){
		if (value.selected){
			value.selected = false;
			deck.push(value);
			keys_to_clear.push(key);
			count++;
			draw_count--;
		}
	});
	keys_to_clear = keys_to_clear.reverse();
	$.each(keys_to_clear, function(key, value){
		var spliced = hand.splice(value, 1);
	});
	draw_simulator.shuffle_deck(deck);
	if (redraw) {
		draw_simulator.draw(count);
	} else {
		draw_simulator.render();
	}
};


/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
draw_simulator.shuffle_deck = function(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


/**
 * @memberOf draw_simulator
 */
draw_simulator.compute_odds = function compute_odds() {
	var inputs = {};
	$.each(['N','K','n','k'], function (i, key) {
		inputs[key] = parseInt($('#odds-calculator-'+key).val(), 10) || 0;
	});
	$('#odds-calculator-p').text( Math.round( 100 * app.hypergeometric.get_cumul(inputs.k, inputs.N, inputs.K, inputs.n) ) );
}



/**
 * @memberOf draw_simulator
 */
draw_simulator.update_odds = function update_odds() {
	for(var i=1; i<=3; i++) {
		var odd = app.hypergeometric.get_cumul(1, initial_size, i, draw_count);
		$('#draw-simulator-odds-'+i).text(Math.round(100*odd));
	}
}



/**
 * @memberOf draw_simulator
 */
draw_simulator.handle_click = function handle_click(event) {

	event.preventDefault();

	var command = $(this).data('command');
	if(command === 'redraw') {
		draw_simulator.reshuffle(true);
		return;
	}
	
	if(command === 'reshuffle') {
		draw_simulator.reshuffle(false);
		return;
	}
	
	$('[data-command=clear]').prop('disabled', false);
	if(command === 'clear') {
		draw_simulator.reset();
		return;
	}
	
	if(event.shiftKey) {
		draw_simulator.reset();
	}
	var draw;
	if(command === 'all') {
		draw = deck.length;
	} else {
		draw = command;
	}

	if(isNaN(draw)) return;
	draw_simulator.draw(draw);

};

})(app.draw_simulator = {}, jQuery);

(function app_textcomplete(textcomplete, $) {

var icons = 'guardian survivor rogue mystic seeker action reaction fast free unique per_investigator null elder_sign elder_thing auto_fail skull cultist lightning tablet willpower intellect combat agility wild'.split(' ');

var rules = [
	{key:"Intro", value:"The Thing That Should Not Be..."},
	{key:"The_Golden_Rules", value:"The Golden Rules"},
	{key:"The_Grim_Rule", value:"The Grim Rule"},
	{key:"Glossary", value:"Glossary"},
	{key:"A_An", value:"A, An"},
	{key:"Ability", value:"Ability"},
	{key:"Abilities_Constant", value:"Constant Abilities"},
	{key:"Abilities_Forced", value:"Forced Abilities"},
	{key:"Abilities_Revelation", value:"Revelation Abilities"},
	{key:"Abilities_Triggered", value:"Triggered Abilities"},
	{key:"Abilities_Keywords", value:"Keywords"},
	{key:"Spawn_Instructions_and_Prey_Instructions", value:"Spawn Instructions and Prey Instructions"},
	{key:"Action_Designators", value:"Action Designators"},
	{key:"Act_Deck_and_Agenda_Deck", value:"Act Deck and Agenda Deck"},
	{key:"Action", value:"Action"},
	{key:"Activate_Action", value:"Activate Action"},
	{key:"Active_Player", value:"Active Player"},
	{key:"Additional_Costs", value:"Additional Costs"},
	{key:"After", value:"After"},
	{key:"Agenda_Deck", value:"Agenda Deck"},
	{key:"Alert", value:"Alert"},
	{key:"Aloof", value:"Aloof"},
	{key:"Asset_Cards", value:"Asset Cards"},
	{key:"At", value:"At"},
	{key:"Attach_To", value:"Attach To"},
	{key:"Attacker_Attacked", value:"Attacker, Attacked"},
	{key:"Attack_of_Opportunity", value:"Attack of Opportunity"},
	{key:"Automatic_Failure_Success", value:"Automatic Failure/Success"},
	{key:"Base_Value", value:"Base Value"},
	{key:"Bearer", value:"Bearer"},
	{key:"Blank", value:"Blank"},
	{key:"Campaign_Play", value:"Campaign Play"},
	{key:"Defeat_by_Card_Ability", value:"Defeat by Card Ability"},
	{key:"Advancing_to_Next_Scenario", value:"Advancing to Next Scenario"},
	{key:"Joining_or_Leaving_a_Campaign", value:"Joining or Leaving a Campaign"},
	{key:"Cancel", value:"Cancel"},
	{key:"Cannot", value:"Cannot"},
	{key:"Cardtypes", value:"Cardtypes"},
	{key:"Chaos_Tokens", value:"Chaos Tokens"},
	{key:"Choices_and_the_Grim_Rule", value:"Choices, and the Grim Rule"},
	{key:"Clues", value:"Clues"},
	{key:"Collection", value:"Collection"},
	{key:"Constant_Abilities", value:"Constant Abilities"},
	{key:"Control", value:"Control"},
	{key:"Copy", value:"Copy"},
	{key:"Costs", value:"Costs"},
	{key:"Dealing_Damage_Horror", value:"Dealing Damage/Horror"},
	{key:"Deck", value:"Deck"},
	{key:"Deckbuilding", value:"Deckbuilding"},
	{key:"Classes", value:"Classes"},
	{key:"Defeat", value:"Defeat"},
	{key:"Delayed_Effects", value:"Delayed Effects"},
	{key:"Difficulty_level", value:"Difficulty (level)"},
	{key:"Difficulty_skill_tests", value:"Difficulty (skill tests)"},
	{key:"Direct_Damage_Direct_Horror", value:"Direct Damage, Direct Horror"},
	{key:"Discard_Piles", value:"Discard Piles"},
	{key:"Doom", value:"Doom"},
	{key:"Draw_Action", value:"Draw Action"},
	{key:"Drawing_Cards", value:"Drawing Cards"},
	{key:"Effects", value:"Effects"},
	{key:"Elimination", value:"Elimination"},
	{key:"Empty_Location", value:"Empty Location"},
	{key:"Encounter_Deck", value:"Encounter Deck"},
	{key:"Encounter_Set", value:"Encounter Set"},
	{key:"Enemy_Cards", value:"Enemy Cards"},
	{key:"Enemy_Engagement", value:"Enemy Engagement"},
	{key:"Engage_Action", value:"Engage Action"},
	{key:"Enters_Play", value:"Enters Play"},
	{key:"Evade_Action", value:"Evade, Evade Action"},
	{key:"Event_Cards", value:"Event Cards"},
	{key:"Exceptional", value:"Exceptional"},
	{key:"Exhaust", value:"Exhaust, Exhausted"},
	{key:"Exile", value:"Exile"},
	{key:"Experience", value:"Experience"},
	{key:"Fast", value:"Fast"},
	{key:"Fight_Action", value:"Fight Action"},
	{key:"Flavor_Text", value:"Flavor Text"},
	{key:"Forced_Abilities", value:"Forced Abilities"},
	{key:"Gains", value:"Gains"},
	{key:"Game", value:"Game"},
	{key:"Hand_Size", value:"Hand Size"},
	{key:"Haunted", value:"Haunted"},
	{key:"Heal", value:"Heal"},
	{key:"Health_and_Damage", value:"Health and Damage"},
	{key:"Hidden", value:"Hidden"},
	{key:"Hunter", value:"Hunter"},
	{key:"If", value:"If"},
	{key:"Immune", value:"Immune"},
	{key:"In_Play_and_Out_of_Play", value:"In Play and Out of Play"},
	{key:"In_Player_Order", value:"In Player Order"},
	{key:"Instead", value:"Instead"},
	{key:"Investigate_Action", value:"Investigate Action"},
	{key:"Investigation_Phase", value:"Investigation Phase"},
	{key:"Investigator_Deck", value:"Investigator Deck"},
	{key:"Keywords", value:"Keywords"},
	{key:"Killed_Insane_Investigators", value:"Killed/Insane Investigators"},
	{key:"Lasting_Effects", value:"Lasting Effects"},
	{key:"Lead_Investigator", value:"Lead Investigator"},
	{key:"Leaves_Play", value:"Leaves Play"},
	{key:"Limits_and_Maximums", value:"Limits and Maximums"},
	{key:"Location_Cards", value:"Location Cards"},
	{key:"Massive", value:"Massive"},
	{key:"May", value:"May"},
	{key:"Modifiers", value:"Modifiers"},
	{key:"Move", value:"Move"},
	{key:"Move_Action", value:"Move Action"},
	{key:"Mulligan", value:"Mulligan"},
	{key:"Must", value:"Must"},
	{key:"Nearest", value:"Nearest"},
	{key:"Nested_Sequences", value:"Nested Sequences"},
	{key:"Ownership_and_Control", value:"Ownership and Control"},
	{key:"Parley", value:"Parley"},
	{key:"Per_Investigator", value:"Per Investigator"},
	{key:"Peril", value:"Peril"},
	{key:"Permanent", value:"Permanent"},
	{key:"Play", value:"Play"},
	{key:"Play_Action", value:"Play Action"},
	{key:"Play_Restrictions_Permissions_and_Instructions", value:"Play Restrictions, Permissions, and Instructions"},
	{key:"Prey", value:"Prey"},
	{key:"Printed", value:"Printed"},
	{key:"Priority_of_Simultaneous_Resolution", value:"Priority of Simultaneous Resolution"},
	{key:"Put_into_Play", value:"Put into Play"},
	{key:"Qualifiers", value:"Qualifiers"},
	{key:"Reaction_Opportunities", value:"Reaction Opportunities"},
	{key:"Ready", value:"Ready"},
	{key:"Record_in_your_Campaign Log", value:"Record in your Campaign Log..."},
	{key:"Remember_that", value:"Remember that..."},
	{key:"Removed_from_Game", value:"Removed from Game"},
	{key:"Resign", value:"Resign"},
	{key:"Resource_Action", value:"Resource Action"},
	{key:"Resources", value:"Resources"},
	{key:"Retaliate", value:"Retaliate"},
	{key:"Revelation", value:"Revelation"},
	{key:"Sanity_and_Horror", value:"Sanity and Horror"},
	{key:"Set_Aside", value:"Set Aside"},
	{key:"Seal", value:"Seal"},
	{key:"Search", value:"Search"},
	{key:"Self_Referential_Text", value:"Self-Referential Text"},
	{key:"Signature_Cards", value:"Signature Cards"},
	{key:"Skill_Cards", value:"Skill Cards"},
	{key:"Skill_Tests", value:"Skill Tests"},
	{key:"Slots", value:"Slots"},
	{key:"Spawn", value:"Spawn"},
	{key:"Standalone_Mode", value:"Standalone Mode"},
	{key:"Supplies", value:"Supplies"},
	{key:"Surge", value:"Surge"},
	{key:"Taking_Damage_Horror", value:"Taking Damage/Horror"},
	{key:"Target", value:"Target"},
	{key:"Then", value:"Then"},
	{key:"Threat_Area", value:"Threat Area"},
	{key:"Tokens", value:"Tokens, Running out of"},
	{key:"Traits", value:"Traits"},
	{key:"Trauma", value:"Trauma"},
	{key:"Treachery_Cards", value:"Treachery Cards"},
	{key:"Triggered_Abilities", value:"Triggered Abilities"},
	{key:"Triggering_Condition", value:"Triggering Condition"},
	{key:"Unique", value:"Unique"},
	{key:"Upkeep_Phase", value:"Upkeep Phase"},
	{key:"Uses", value:"Uses (X 'type')"},
	{key:"Vengeance_Points", value:"Vengeance Points"},
	{key:"Victory_Display_Victory_Points", value:"Victory Display, Victory Points"},
	{key:"Weakness", value:"Weakness"},
	{key:"When", value:"When"},
	{key:"Winning_and_Losing", value:"Winning and Losing"},
	{key:"The_letter_X", value:"The letter X"},
	{key:"You_Your", value:"You/Your"},
	{key:"Appendix_I_Initiation_Sequence", value:"Initiation Sequence"},
	{key:"Appendix_II_Timing_and_Gameplay", value:"Timing and Gameplay"},
	{key:"Phase_Sequence_Timing", value:"Phase Sequence Timing"},
	{key:"Framework_Event_Details", value:"Framework Event Details"},
	{key:"Mythos_Phase", value:"Mythos phase"},
	{key:"Enemy_Phase", value:"Enemy phase"},
	{key:"Skill_Test_Timing", value:"Skill Test Timing"},
	{key:"Appendix_III_Setting_Up_The_Game", value:"Setting Up The Game"},
	{key:"Appendix_IV_Card_Anatomy", value:"Card Anatomy"},
	{key:"Scenario_Card_Anatomy_Key", value:"Scenario Card Anatomy Key"},
	{key:"Player_Card_Anatomy_Key", value:"Player Card Anatomy Key"}
];

/**
 * options: cards, icons, users
 */
textcomplete.setup = function setup(textarea, options) {

	options = _.extend({cards: true, icons: true, users: false, rules: true}, options);

	var actions = [];

	if(options.cards) {
		actions.push({
			match : /\B#([\-+\w]*)$/,
			search : function(term, callback) {
				var regexp = new RegExp('\\b' + term, 'i');
				callback(app.data.cards.find({
					name : regexp
				}));
			},
			template : function(value) {
				return value.name;
			},
			replace : function(value) {
				return '[' + value.name + ']('
						+ Routing.generate('cards_zoom', {card_code:value.code})
						+ ')';
			},
			index : 1
		})
	}

	if(options.icons) {
		actions.push({
			match : /\$([\-+\w]*)$/,
			search : function(term, callback) {
				var regexp = new RegExp('^' + term, 'i');
				callback(_.filter(icons,
					function(symbol) { return regexp.test(symbol); }
				));
			},
			template : function(value) {
				return value;
			},
			replace : function(value) {
				return '<span class="icon-' + value + '"></span>';
			},
			index : 1
		});
	}
	
	if(options.rules) {
		actions.push({
			match : /\^([\-+\w]*)$/,
			search : function(term, callback) {
				var regexp = new RegExp('^' + term, 'i');
				callback(_.filter(rules,
					function(rule) { return regexp.test(rule.value); }
				));
			},
			template : function(value) {
				return value.value;
			},
			replace : function(value) {
				return '[' + value.value + ']('
						+ Routing.generate('rules') + '#'+value.key
						+ ')';
			},
			index : 1
		});
	}

	if(options.users) {
		actions.push({
			match : /\B@([\-+\w]*)$/,
			search : function(term, callback) {
				var regexp = new RegExp('^' + term, 'i');
				callback($.grep(options.users, function(user) {
					return regexp.test(user);
				}));
			},
			template : function(value) {
				return value;
			},
			replace : function(value) {
				return '`@' + value + '`';
			},
			index : 1
		});
	}

	$(textarea).textcomplete(actions);

}

})(app.textcomplete = {}, jQuery);

(function app_markdown(markdown, $) {

	markdown.setup = function setup(textarea, preview) 
	{
		$(textarea).on('change keyup', function() {
			$(preview).html(marked($(textarea).val()))
		});
		$(textarea).trigger('change');
	}

	markdown.refresh = function refresh(textarea, preview) 
	{
		$(preview).html(marked($(textarea).val()))
	}

	markdown.update = function update(text_markdown, preview) 
	{
		$(preview).html(marked(text_markdown))
	}

})(app.markdown = {}, jQuery);

(function app_smart_filter(smart_filter, $) {

var SmartFilterQuery = [];

var configuration = {
	v: [ add_string_sf, 'flavor', "Flavor text" ],
	y: [ add_string_sf, 'cycle_code', "Cycle name" ],
	e: [ add_string_sf, 'pack_code', "Pack" ],
	f: [ add_string_sf, 'faction_code', "Class" ],
	l: [ add_string_sf, 'illustrator', "Illustrator" ],
	k: [ add_string_sf, 'traits', "Traits" ],
	o: [ add_integer_sf, 'cost', "Cost" ],
	w: [ add_integer_sf, 'skill_willpower', "Willpower" ],
	c: [ add_integer_sf, 'skill_combat', "Combat" ],
	i: [ add_integer_sf, 'skill_intellect', "Intellect" ],
	a: [ add_integer_sf, 'skill_agility', "Agility" ],
	d: [ add_integer_sf, 'skill_wild', "Wild" ],
	t: [ add_string_sf, 'type_code', "Type" ],
	b: [ add_string_sf, 'subtype_code', "Subtype" ],
	u: [ add_boolean_sf, 'is_unique', "Uniqueness" ],
	h: [ add_integer_sf, 'health', "Health" ],
	s: [ add_integer_sf, 'sanity', "Sanity" ],
	x: [ add_string_sf, 'text', "Text" ],
	p: [ add_integer_sf, 'xp', "Experience" ],
	qt: [ add_integer_sf, 'quantity', "Quantity in pack" ],
	z: [ add_string_sf, 'slot', "Slot" ],
	j: [ add_integer_sf, 'victory', "Victory" ]
};

/**
 * called when the list is refreshed
 * @memberOf smart_filter
 */
smart_filter.get_query =  function get_query(query) {
	return _.extend(query, SmartFilterQuery);
};

/**
 * called when the filter input is modified
 * @memberOf smart_filter
 */
smart_filter.update =  function update(value) {
	var conditions = filterSyntax(value);
	SmartFilterQuery = {};

	for (var i = 0; i < conditions.length; i++) {
		var condition = conditions[i];
		var type = condition.shift();
		var operator = condition.shift();
		var values = condition;

		var tools = configuration[type];
		if(tools) {
			tools[0].call(this, tools[1], operator, values);
		}
	}
};

smart_filter.get_help = function get_help() {
	var items = _.map(configuration, function (value, key) {
		return '<li><tt>'+key+'</tt> &ndash; '+value[2]+'</li>';
	});
	return '<ul>'+items.join('')+'</ul><p>Example: <tt>a:1 c>1</tt> Shows all cards with 1 Agility icon or 1 Agility and more than 1 Combat icon or 1 Combat</p>';
}

function add_integer_sf(key, operator, values) {
	for (var j = 0; j < values.length; j++) {
		values[j] = parseInt(values[j], 10);
	}
	switch (operator) {
	case ":":
		SmartFilterQuery[key] = {
			'$in' : values
		};
		break;
	case "<":
		SmartFilterQuery[key] = {
			'$lt' : values[0]
		};
		break;
	case ">":
		SmartFilterQuery[key] = {
			'$gt' : values[0]
		};
		break;
	case "!":
		SmartFilterQuery[key] = {
			'$nin' : values
		};
		break;
	}
}
function add_string_sf(key, operator, values) {
	for (var j = 0; j < values.length; j++) {
		values[j] = new RegExp(values[j], 'i');
	}
	switch (operator) {
	case ":":
		SmartFilterQuery[key] = {
			'$in' : values
		};
		break;
	case "!":
		SmartFilterQuery[key] = {
			'$nin' : values
		};
		break;
	}
}
function add_boolean_sf(key, operator, values) {
	var value = parseInt(values.shift()), target = !!value;
	switch (operator) {
	case ":":
		SmartFilterQuery[key] = target;
		break;
	case "!":
		SmartFilterQuery[key] = {
			'$ne': target
		};
		break;
	}
}
function filterSyntax(query) {
	// renvoie une liste de conditions (array)
	// chaque condition est un tableau à n>1 éléments
	// le premier est le type de condition (0 ou 1 caractère)
	// les suivants sont les arguments, en OR

	query = query.replace(/^\s*(.*?)\s*$/, "$1").replace('/\s+/', ' ');

	var list = [];
	var cond = null;
	// l'automate a 3 états :
	// 1:recherche de type
	// 2:recherche d'argument principal
	// 3:recherche d'argument supplémentaire
	// 4:erreur de parsing, on recherche la prochaine condition
	// s'il tombe sur un argument alors qu'il est en recherche de type, alors le
	// type est vide
	var etat = 1;
	while (query != "") {
		if (etat == 1) {
			if (cond !== null && etat !== 4 && cond.length > 2) {
				list.push(cond);
			}
			// on commence par rechercher un type de condition
			if (query.match(/^(\w)([:<>!])(.*)/)) { // jeton "condition:"
				cond = [ RegExp.$1.toLowerCase(), RegExp.$2 ];
				query = RegExp.$3;
			} else {
				cond = [ "", ":" ];
			}
			etat = 2;
		} else {
			if (   query.match(/^"([^"]*)"(.*)/) // jeton "texte libre entre guillements"
				|| query.match(/^([^\s]+)(.*)/) // jeton "texte autorisé sans guillements"
			) {
				if ((etat === 2 && cond.length === 2) || etat === 3) {
					cond.push(RegExp.$1);
					query = RegExp.$2;
					etat = 2;
				} else {
					// erreur
					query = RegExp.$2;
					etat = 4;
				}
			} else if (query.match(/^\|(.*)/)) { // jeton "|"
				if ((cond[1] === ':' || cond[1] === '!')
						&& ((etat === 2 && cond.length > 2) || etat === 3)) {
					query = RegExp.$1;
					etat = 3;
				} else {
					// erreur
					query = RegExp.$1;
					etat = 4;
				}
			} else if (query.match(/^ (.*)/)) { // jeton " "
				query = RegExp.$1;
				etat = 1;
			} else {
				// erreur
				query = query.substr(1);
				etat = 4;
			}
		}
	}
	if (cond !== null && etat !== 4 && cond.length > 2) {
		list.push(cond);
	}
	return list;
}

$(function() {
	$('.smart-filter-help').tooltip({
		container: 'body',
		delay: 1000,
		html: true,
		placement: 'bottom',
		title: smart_filter.get_help(),
		trigger: 'hover'
	});
})

})(app.smart_filter = {}, jQuery);


(function app_smart_filter2(smart_filter, $) {

var SmartFilterQuery = [];

var configuration = {
	v: [ add_string_sf, 'flavor', "Flavor text" ],
	y: [ add_string_sf, 'cycle_code', "Cycle name" ],
	e: [ add_string_sf, 'pack_code', "Pack" ],
	f: [ add_string_sf, 'faction_code', "Class" ],
	l: [ add_string_sf, 'illustrator', "Illustrator" ],
	k: [ add_string_sf, 'traits', "Traits" ],
	o: [ add_integer_sf, 'cost', "Cost" ],
	w: [ add_integer_sf, 'skill_willpower', "Willpower" ],
	c: [ add_integer_sf, 'skill_combat', "Combat" ],
	i: [ add_integer_sf, 'skill_intellect', "Intellect" ],
	a: [ add_integer_sf, 'skill_agility', "Agility" ],
	d: [ add_integer_sf, 'skill_wild', "Wild" ],
	t: [ add_string_sf, 'type_code', "Type" ],
	b: [ add_string_sf, 'subtype_code', "Subtype" ],
	u: [ add_boolean_sf, 'is_unique', "Uniqueness" ],
	h: [ add_integer_sf, 'health', "Health" ],
	s: [ add_integer_sf, 'sanity', "Sanity" ],
	x: [ add_string_sf, 'text', "Text" ],
	p: [ add_integer_sf, 'xp', "Experience" ],
	q: [ add_integer_sf, 'quantity', "Quantity in pack" ],
	z: [ add_string_sf, 'slot', "Slot" ],
	j: [ add_integer_sf, 'victory', "Victory" ]
};

/**
 * called when the list is refreshed
 * @memberOf smart_filter
 */
smart_filter.get_query =  function get_query(query) {
	return _.extend(query, SmartFilterQuery);
};

/**
 * called when the filter input is modified
 * @memberOf smart_filter
 */
smart_filter.update =  function update(value) {
	var conditions = filterSyntax(value);
	SmartFilterQuery = {};

	for (var i = 0; i < conditions.length; i++) {
		var condition = conditions[i];
		var type = condition.shift();
		var operator = condition.shift();
		var values = condition;

		var tools = configuration[type];
		if(tools) {
			tools[0].call(this, tools[1], operator, values);
		}
	}
};

smart_filter.get_help = function get_help() {
	var items = _.map(configuration, function (value, key) {
		return '<li><tt>'+key+'</tt> &ndash; '+value[2]+'</li>';
	});
	return '<ul>'+items.join('')+'</ul><p>Example: <tt>a:1 c>1</tt> Shows all cards with 1 Agility icon or 1 Agility and more than 1 Combat icon or 1 Combat</p>';
}

function add_integer_sf(key, operator, values) {
	for (var j = 0; j < values.length; j++) {
		values[j] = parseInt(values[j], 10);
	}
	switch (operator) {
	case ":":
		SmartFilterQuery[key] = {
			'$in' : values
		};
		break;
	case "<":
		SmartFilterQuery[key] = {
			'$lt' : values[0]
		};
		break;
	case ">":
		SmartFilterQuery[key] = {
			'$gt' : values[0]
		};
		break;
	case "!":
		SmartFilterQuery[key] = {
			'$nin' : values
		};
		break;
	}
}
function add_string_sf(key, operator, values) {
	for (var j = 0; j < values.length; j++) {
		values[j] = new RegExp(values[j], 'i');
	}
	switch (operator) {
	case ":":
		SmartFilterQuery[key] = {
			'$in' : values
		};
		break;
	case "!":
		SmartFilterQuery[key] = {
			'$nin' : values
		};
		break;
	}
}
function add_boolean_sf(key, operator, values) {
	var value = parseInt(values.shift()), target = !!value;
	switch (operator) {
	case ":":
		SmartFilterQuery[key] = target;
		break;
	case "!":
		SmartFilterQuery[key] = {
			'$ne': target
		};
		break;
	}
}
function filterSyntax(query) {
	// renvoie une liste de conditions (array)
	// chaque condition est un tableau à n>1 éléments
	// le premier est le type de condition (0 ou 1 caractère)
	// les suivants sont les arguments, en OR

	query = query.replace(/^\s*(.*?)\s*$/, "$1").replace('/\s+/', ' ');

	var list = [];
	var cond = null;
	// l'automate a 3 états :
	// 1:recherche de type
	// 2:recherche d'argument principal
	// 3:recherche d'argument supplémentaire
	// 4:erreur de parsing, on recherche la prochaine condition
	// s'il tombe sur un argument alors qu'il est en recherche de type, alors le
	// type est vide
	var etat = 1;
	while (query != "") {
		if (etat == 1) {
			if (cond !== null && etat !== 4 && cond.length > 2) {
				list.push(cond);
			}
			// on commence par rechercher un type de condition
			if (query.match(/^(\w)([:<>!])(.*)/)) { // jeton "condition:"
				cond = [ RegExp.$1.toLowerCase(), RegExp.$2 ];
				query = RegExp.$3;
			} else {
				cond = [ "", ":" ];
			}
			etat = 2;
		} else {
			if (   query.match(/^"([^"]*)"(.*)/) // jeton "texte libre entre guillements"
				|| query.match(/^([^\s]+)(.*)/) // jeton "texte autorisé sans guillements"
			) {
				if ((etat === 2 && cond.length === 2) || etat === 3) {
					cond.push(RegExp.$1);
					query = RegExp.$2;
					etat = 2;
				} else {
					// erreur
					query = RegExp.$2;
					etat = 4;
				}
			} else if (query.match(/^\|(.*)/)) { // jeton "|"
				if ((cond[1] === ':' || cond[1] === '!')
						&& ((etat === 2 && cond.length > 2) || etat === 3)) {
					query = RegExp.$1;
					etat = 3;
				} else {
					// erreur
					query = RegExp.$1;
					etat = 4;
				}
			} else if (query.match(/^ (.*)/)) { // jeton " "
				query = RegExp.$1;
				etat = 1;
			} else {
				// erreur
				query = query.substr(1);
				etat = 4;
			}
		}
	}
	if (cond !== null && etat !== 4 && cond.length > 2) {
		list.push(cond);
	}
	return list;
}

$(function() {
	$('.smart-filter-help').tooltip({
		container: 'body',
		delay: 1000,
		html: true,
		placement: 'bottom',
		title: smart_filter.get_help(),
		trigger: 'hover'
	});
})

})(app.smart_filter2 = {}, jQuery);

(function app_deck(deck, $) {

var date_creation,
	date_update,
	description_md,
	id,
	name,
	tags,
	meta,
	choices,
	xp,
	xp_spent = 0, 
	exile_string = "",
	exiles = [],
	investigator_code,
	investigator_name,
	investigator,
	deck_options,
	unsaved,
	user_id,
	taboo_id, 
	sort_type = "default",
	sort_dir = 1,
	problem_list = [],
	no_collection = true,
	collection = {},
	problem_labels = {
		too_few_cards: "Contains too few cards",
		too_many_cards: "Contains too many cards",
		deck_options_limit: "Contains too many limited cards", 
		too_many_copies: "Contains too many copies of a card (by title)",
		invalid_cards: "Contains forbidden cards (cards not permitted by Investigator)",
		investigator: "Doesn't comply with the Investigator requirements"
	},
	header_tpl = _.template('<h5><span class="icon icon-<%= code %>"></span> <%= name %> (<%= quantity %>)</h5>'),
	card_line_tpl = _.template('<span class="icon icon-<%= card.type_code %> icon-<%= card.faction_code %>"></span><% if (typeof(card.faction2_code) !== "undefined") { %><span class="icon icon-<%= card.faction2_code %>"></span> <% } %> <a href="<%= card.url %>" class="card card-tip fg-<%= card.faction_code %> <% if (typeof(card.faction2_code) !== "undefined") { %> fg-dual <% } %>" data-toggle="modal" data-remote="false" data-target="#cardModal" data-code="<%= card.code %>"><%= card.name %></a>'),
	layouts = {},
	layout_data = {};
	

/*
 * Templates for the different deck layouts, see deck.get_layout_data
 */
// one block view
layouts[1] = _.template('<div class="deck-content"><div class="row"><div class="col-sm-5 col-print-6"><%= images %></div><div class="col-sm-7 col-print-6"><%= meta %></div></div><div class="row"><h4 class="deck-section">Deck</h4><div class="col-sm-10 col-print-10"><%= cards %></div></div> <div id="upgrade_changes"></div> </div>'); 
// two colum view
layouts[2] = _.template('<div class="deck-content"><div class="row"><div class="col-sm-5 col-print-6"><%= images %></div><div class="col-sm-7 col-print-6"><%= meta %></div></div><h4 class="deck-section">Deck</h4><div class="row"><div class="col-sm-6 col-print-6"><%= assets %> <%= permanent %> <%= bonded %></div><div class="col-sm-6 col-print-6"><%= events %> <%= skills %> <%= treachery %> <%= enemy %> <%= hunches %></div></div> <div id="upgrade_changes"></div></div>');
layouts[3] = _.template('<div class="deck-content"><div class="row"><div class="col-sm-4"><%= images %><%= meta %></div><h4 class="deck-section">Deck</h4><div class="col-sm-4"><%= assets %><%= skills %></div><div class="col-sm-4"><%= events %><%= treachery %></div></div></div>');
// single column view
layouts[4] = _.template('<div class="deck-content"><div class="row"><%= images %></div><div class="row"><div class="col-sm-7 col-print-6"><%= meta %></div></div><div class="row"><h4 class="deck-section">Deck</h4><div class="col-sm-12 col-print-12"><%= assets %> <%= permanent %> <%= bonded %> <%= events %> <%= skills %> <%= treachery %> <%= enemy %></div></div> <div id="upgrade_changes"></div></div>');
/**
 * @memberOf deck
 */
deck.init = function init(data) {
	date_creation = data.date_creation;
	date_update = data.date_update;
	description_md = data.description_md;
	id = data.id;
	name = data.name;
	tags = data.tags;
	meta = data.meta;
	choices = [];
	investigator_code = data.investigator_code;
	investigator_name = data.investigator_name;
	investigator = false;
	unsaved = data.unsaved;
	user_id = data.user_id;
	exile_string = data.exile_string;
	taboo_id = null;
	if (exile_string){
		exiles = exile_string.split(",");
	}
	xp = data.xp;
	xp_adjustment = data.xp_adjustment;
	next_deck = data.next_deck;
	previous_deck = data.previous_deck;
	if (localStorage && localStorage.getItem('ui.deck.sort')) {
		deck.sort_type = localStorage.getItem('ui.deck.sort');
	}
	deck.choices = [];
	// parse pack owner string
	collection = {};
	no_collection = true;
	
	if(app.data.isLoaded) {
		deck.onloaded(data);
	} else {
		$(document).on('data.app', function () { 
			deck.onloaded(data);
		});
	}
}

deck.onloaded = function(data){
	deck.set_slots(data.slots, data.ignoreDeckLimitSlots);
	investigator = app.data.cards.findById(investigator_code);
	
	if (data.meta){
		deck.meta = JSON.parse(data.meta);
	}
	if (!deck.meta){
		deck.meta = {};
	}
	// check for special deck building rules
	// selecting a class for deck building options
	// selecting front and back for investigator options
	if (investigator && investigator.deck_options && investigator.deck_options.length) {	
		deck.deck_options = investigator.deck_options;
		var alternates = app.data.cards.find({'alternate_of_code': investigator.code});
		if (alternates && alternates.length > 0) {
			var alternate_choices = [];
			for (var i = 0; i < alternates.length; i++){
				alternate_choices.push(alternates[i].code)
			}
			deck.choices.push({'back_select': alternate_choices});
			deck.choices.push({'front_select': alternate_choices});
		}
		for (var i = 0; i < investigator.deck_options.length; i++){
			var option = investigator.deck_options[i];
			if (option.faction_select){
				deck.choices.push(option);
				if (!deck.meta || !deck.meta.faction_selected){
					deck.meta.faction_selected = option.faction_select[0];
				} 
			}
			if (option.deck_size_select){
				deck.choices.push(option);
				if (!deck.meta || !deck.meta.deck_size_selected){
					deck.meta.deck_size_selected = option.deck_size_select[0];
				} 
			}
		}
	}
	// if they user has selected different deck building options, point deck_options to the alternate one
	if (deck.meta && deck.meta.alternate_back) {
		var alternate = app.data.cards.findById(deck.meta.alternate_back);
		if (alternate && alternate.deck_options && alternate.deck_options.length) {
			deck.deck_options = alternate.deck_options;
		}
	}
	if (data.taboo_id){
		deck.taboo_id = data.taboo_id;
	}

	if (app.user.data && app.user.data.owned_packs) {
		var packs = app.user.data.owned_packs.split(',');
		_.forEach(packs, function(str) {
			collection[str] = 1;
			no_collection = false;
		});
	}
}

/**
 * Sets the slots of the deck
 * @memberOf deck
 */
deck.set_slots = function set_slots(slots, ignoreSlots) {
	app.data.cards.update({}, {
		indeck: 0,
		ignore: 0
	});

	for(code in slots) {
		if(slots.hasOwnProperty(code)) {
			app.data.cards.updateById(code, {indeck: slots[code]});			
		}
	}
	for(code in ignoreSlots) {
		if(ignoreSlots.hasOwnProperty(code)) {
			app.data.cards.updateById(code, {ignore: ignoreSlots[code]});			
		}
	}
}

/**
 * @memberOf deck
 * @returns string
 */
deck.get_id = function get_id() {
	return id;
}

/**
 * @memberOf deck
 * @returns string
 */
deck.get_name = function get_name() {
	return name;
}


/**
 * @memberOf deck
 * @returns string
 */
deck.get_tags = function get_tags() {
	return tags;
}

/**
 * @memberOf deck
 * @returns integer
 */
deck.get_next_deck = function get_next_deck() {
	return next_deck;
}

/**
 * @memberOf deck
 * @returns integer
 */
deck.get_previous_deck = function get_previous_deck() {
	return previous_deck;
}


/**
 * @memberOf deck
 * @returns integer
 */
deck.get_xp = function get_xp() {
	if (xp_adjustment) {
		return xp + xp_adjustment;
		
	} else {
		return xp;
	}
}

/**
 * @memberOf deck
 * @returns integer
 */
deck.get_xp_spent = function get_xp_spent() {
	return xp_spent;
}

/**
 * @memberOf deck
 * @returns integer
 */
deck.set_xp_spent = function set_xp_spent(spent_xp) {
	xp_spent = spent_xp;
}


/**
 * @memberOf deck
 * @returns integer
 */
deck.get_xp_adjustment = function get_xp_adjustment() {
	if (!xp_adjustment) {
		xp_adjustment = 0;
	}
	return xp_adjustment;
}

/**
 * @memberOf deck
 * @returns integer
 */
deck.set_xp_adjustment = function set_xp_adjustment(xp_adj) {
	if (!xp_adjustment) {
		xp_adjustment = 0;
	}
	
	xp_adjustment = xp_adj;
}

/**
 * @memberOf deck
 * @returns string
 */
deck.get_investigator_code = function get_investigator_code() {
	return investigator_code;
}

/**
 * @memberOf deck
 * @returns string
 */
deck.get_exiles = function get_exiles() {
	return exiles;
}

/**
 * @memberOf deck
 * @returns string
 */
deck.get_exile_string = function get_exile_string() {
	return exile_string;
}

/**
 * @memberOf deck
 * @returns string
 */
deck.get_description_md = function get_description_md() {
	return description_md;
}

/**
 * @memberOf deck
 */
deck.get_cards = function get_cards(sort, query, group) {
	sort = sort || {};
	sort['code'] = 1;
	
	query = query || {};
	query.indeck = {
		'$gt': 0
	};
	
	var options = {
		'$orderBy': sort
	};
	if (group){
		options.$groupBy = group;
	}
	return app.data.cards.find(query, options);
}

/**
 * @memberOf deck
 */
deck.get_draw_deck = function get_draw_deck(sort) {
	return deck.get_cards(sort, {
		type_code: {
			'$nin' : []
		},
		xp: {
			'$exists': true
		},
		permanent: false
	});
}

/**
 * @memberOf deck
 */
deck.get_real_draw_deck = function get_real_draw_deck(sort) {
	return deck.get_cards(sort, {
		type_code: {
			'$nin' : []
		}
	});
}

/**
 * @memberOf deck
 * get the actual deck used in the game, which excludes permanents
 */
deck.get_physical_draw_deck = function get_physical_draw_deck(sort) {
	return deck.get_cards(sort, {
		type_code: {
			'$nin' : []
		},
		permanent: false
	});
}

/**
 * @memberOf deck
 */
deck.get_draw_deck_size = function get_draw_deck_size(sort) {
	var draw_deck = deck.get_draw_deck();
	return deck.get_nb_cards(draw_deck);
}

/**
 * @memberOf deck
 */
deck.get_real_draw_deck_size = function get_real_draw_deck_size(sort) {
	var draw_deck = deck.get_real_draw_deck();
	return deck.get_nb_cards(draw_deck);
}

/**
 * @memberOf deck
 */
deck.get_xp_usage = function get_xp_usage(sort) {
	var xp = 0;
	var myriad_madness = {};
	deck.get_real_draw_deck().forEach(function (card) {
		if (card && (card.xp || card.taboo_xp) && card.ignore < card.indeck) {
			var qty = card.indeck;
			if (typeof card.real_text !== 'undefined' && card.real_text.indexOf('Myriad.') !== -1) {
				qty = 1;
				if (myriad_madness[card.real_name]) {
					qty = 0;
				}
				myriad_madness[card.real_name] = 1;
			}
			xp += (card.xp + (card.taboo_xp ? card.taboo_xp : 0)) * (qty - card.ignore) * (card.exceptional ? 2: 1);
		}
	});
	return xp;
	
}


deck.get_nb_cards = function get_nb_cards(cards) {
	if(!cards) cards = deck.get_cards();
	var quantities = _.pluck(cards, 'indeck');
	var ignores = _.pluck(cards, 'ignore');
	var total = _.reduce(quantities, function(memo, num) { return memo + num; }, 0);
	total -= _.reduce(ignores, function(memo, num) { return memo + num; }, 0);
	return total;
}




/**
 * @memberOf deck
 */
deck.get_included_packs = function get_included_packs() {
	var cards = deck.get_cards();
	var nb_packs = {};
	cards.forEach(function (card) {
		nb_packs[card.pack_code] = Math.max(nb_packs[card.pack_code] || 0, card.indeck / card.quantity);
	});
	var pack_codes = _.uniq(_.pluck(cards, 'pack_code'));
	var packs = app.data.packs.find({
		'code': {
			'$in': pack_codes
		}
	}, {
		'$orderBy': {
			'available': 1
		}
	});
	packs.forEach(function (pack) {
		pack.quantity = nb_packs[pack.code] || 0;
	})
	return packs;
}


deck.change_sort = function(sort_type){
	if (localStorage) {
		localStorage.setItem('ui.deck.sort', sort_type);
	}
	deck.sort_type = sort_type;
	if ($("#deck")){
		deck.display('#deck');
	}

	if ($("#deck-content")){
		deck.display('#deck-content');
	}
	
	if ($("#decklist")){
		deck.display('#decklist');
	}
	
}

/**
 * @memberOf deck
 */
deck.display = function display(container, options) {
	// XXX fetch the selected sort here
	// default is 2 it seems
	// before displaying a deck, apply the currently active taboo list
	app.data.apply_taboos(deck.taboo_id);
	options = _.extend({sort: 'type', cols: 2}, options);

	var deck_content = deck.get_layout_data(options);

	$(container)
		.removeClass('deck-loading')
		.empty();

	$(container).append(deck_content);
	if (app.deck_history){
		app.deck_history.setup('#history');
	} 

}

deck.get_layout_data = function get_layout_data(options) {
	
	var data = {
			images: '',
			meta: '',
			assets: '',
			events: '',
			skills: '',
			treachery: '',
			enemy: '',
			permanent: '',
			bonded: '',
			hunches: '',
			cards: ''
	};
	
	//var investigator = deck.get_investigator();
	var problem = deck.get_problem();
	$("input[name=problem]").val(problem);
	
	var card = app.data.cards.findById(this.get_investigator_code());
	var size = 30;
	var req_count = 0;
	var req_met_count = 0;
	
	if (card && card.deck_requirements){
		if (card.deck_requirements.size){
			size = card.deck_requirements.size;
		}
		if (deck.meta && deck.meta.alternate_back) {
			var alternate = app.data.cards.findById(deck.meta.alternate_back);
			if (alternate && alternate.deck_requirements.size) {
				size = alternate.deck_requirements.size;
			}
		}
		if (deck.meta && deck.meta.deck_size_selected){
			size = parseInt(deck.meta.deck_size_selected, 10);
		}
		var versatile = app.data.cards.findById("06167");
		if (versatile && versatile.indeck) {
			size = size + 5;
			if (versatile.indeck > 1) {
				size = size + 5;
			}
		}
		// must have the required cards
		if (card.deck_requirements.card){
			$.each(card.deck_requirements.card, function (key, value){
				req_count++;
				var req = app.data.cards.findById(value);
				if (req && req.indeck){
					req_met_count++;
				}
			});
			if (req_met_count < req_count){
				//return "investigator";
			}
		}
	}

	deck.update_layout_section(data, 'images', $('<div style="margin-bottom:10px"><img src="/bundles/cards/'+deck.get_investigator_code()+'.png" class="img-responsive">'));
	deck.update_layout_section(data, 'meta', $('<h4 style="font-weight:bold"><a class="card card-tip" data-toggle="modal" data-remote="false" data-target="#cardModal" data-code="'+deck.get_investigator_code()+'">'+investigator_name+'</a></h4>'));
	if (app.deck.meta && app.deck.meta.alternate_back) {
		var alternate = app.data.cards.findById(app.deck.meta.alternate_back);
		deck.update_layout_section(data, 'meta', $('<div>Alternate back: <a class="card card-tip" data-toggle="modal" data-back="true" data-remote="false" data-target="#cardModal" data-code="'+alternate.code+'">'+investigator_name+' ('+alternate.pack_name+')</a></div>'));
	}
	if (app.deck.meta && app.deck.meta.alternate_front) {
		var alternate = app.data.cards.findById(app.deck.meta.alternate_front);
		deck.update_layout_section(data, 'meta', $('<div>Alternate front: <a class="card card-tip" data-toggle="modal" data-front="true" data-remote="false" data-target="#cardModal" data-code="'+alternate.code+'">'+investigator_name+' ('+alternate.pack_name+')</a></div>'));
	}
	deck.update_layout_section(data, 'meta', $('<div>'+deck.get_draw_deck_size()+' cards ('+deck.get_real_draw_deck_size()+' total)</div>').addClass(deck.get_draw_deck_size() < size ? 'text-danger': ''));
	deck.update_layout_section(data, 'meta', $('<div>'+deck.get_xp_usage()+' experience required.</div>'));
	var pack_string = _.map(deck.get_included_packs(), function (pack) { return pack.name+(pack.quantity > 1 ? ' ('+pack.quantity+')' : ''); }).join(', ');
	deck.update_layout_section(data, 'meta', $('<div><span onclick="$(\'#packs_required\').toggle()" style="border-bottom: 1px dashed #cfcfcf;" title="' + pack_string + '">' + deck.get_included_packs().length + ' packs required </span>' + ' <div style="display:none;" id="packs_required">'+pack_string+'</div> </div>'));
	if(deck.get_tags && deck.get_tags() ) {
		deck.update_layout_section(data, 'meta', $('<div>'+deck.get_tags().replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})+'</div>'));
	}
	if(deck.taboo_id && app.data.taboos.findOne({'id':deck.taboo_id})) {
		var taboo = app.data.taboos.findOne({'id':deck.taboo_id});
		deck.update_layout_section(data, 'meta', $('<div>'+taboo.name+' ('+taboo.date_start+')</div>'));
	}
	if(problem) {
		if (deck.problem_list && deck.problem_list.length > 0){
			deck.update_layout_section(data, 'meta', $('<div class="text-danger small"><span class="fa fa-exclamation-triangle"></span> '+deck.problem_list.join(', ')+'</div>'));
		} else {
			deck.update_layout_section(data, 'meta', $('<div class="text-danger small"><span class="fa fa-exclamation-triangle"></span> '+problem_labels[problem]+'</div>'));
		}
		
	}
	//deck.update_layout_section(data, 'meta', $('<div class="text-danger small"><span class="fa fa-exclamation-triangle"></span> '+problem_labels[problem]+'</div>'));
	
	//var sort = "default";
	//sort = $("#sort_deck_view").val();
	var layout_template = 2;
	if (deck.sort_type == "name"){
		deck.update_layout_section(data, "cards", deck.get_layout_section({'name': 1}, null, null));
		//deck.update_layout_section(data, "cards", deck.get_layout_section({'name': 1}, {"type_name":1}, null));
		layout_template = 1;
	} else if (deck.sort_type == "set"){
		deck.update_layout_section(data, "cards", deck.get_layout_section({'pack_code': 1, "name": 1}, {'pack_name':1}, null));
		layout_template = 1;
	} else if (deck.sort_type == "setnumber"){
		deck.update_layout_section(data, "cards", deck.get_layout_section({'code': 1, "position": 1}, {'pack_name':1}, null));
		layout_template = 1;
	} else if (deck.sort_type == "faction"){
		deck.update_layout_section(data, "cards", deck.get_layout_section({'faction_code': 1, "name":1}, {'faction_name': 1}, null));
		layout_template = 1;
	} else if (deck.sort_type == "factionnumber"){
		deck.update_layout_section(data, "cards", deck.get_layout_section({'faction_code': 1, "code": 1, "position": 1}, {'faction_name': 1}, null));
		layout_template = 1;
	} else if (deck.sort_type == "factionxp"){
		deck.update_layout_section(data, "cards", deck.get_layout_section({'faction_code': 1, "xp":1, "name": 1}, {'faction_name': 1}, null));
		layout_template = 1;
	} else if (deck.sort_type == "number"){
		deck.update_layout_section(data, "cards", deck.get_layout_section({'code': 1}, null, null));
		layout_template = 1;
	} else if (deck.sort_type == "xp"){
		deck.update_layout_section(data, "cards", deck.get_layout_section({'xp': -1, 'name': 1}, {xp: 1}, null));
		layout_template = 1;
	} else if (deck.sort_type == "cost"){
		deck.update_layout_section(data, "cards", deck.get_layout_section({'cost': 1, 'name': 1}, {'cost':1}, null));
		layout_template = 1;
	} else {
		layout_template = 2;
		deck.update_layout_section(data, 'assets', deck.get_layout_data_one_section({'type_code':'asset', permanent: false}, 'type_name'));
		
		if (investigator_name == "Joe Diamond") {
			deck.update_layout_section(data, 'events', deck.get_layout_data_one_section({'type_code': 'event', '$not': {'traits':/Insight./}, permanent: false }, 'type_name'));
			deck.update_layout_section(data, 'hunches', deck.get_layout_data_one_section({'type_code': 'event', 'traits':/Insight./, permanent: false}, 'hunches'));
		} else {
			deck.update_layout_section(data, 'events', deck.get_layout_data_one_section({'type_code': 'event', permanent: false}, 'type_name'));	
		}
		deck.update_layout_section(data, 'skills', deck.get_layout_data_one_section({'type_code': 'skill', permanent: false}, 'type_name'));
		deck.update_layout_section(data, 'treachery', deck.get_layout_data_one_section({'type_code': 'treachery', permanent: false}, 'type_name'));
		deck.update_layout_section(data, 'enemy', deck.get_layout_data_one_section({'type_code': 'enemy', permanent: false}, 'type_name'));
		deck.update_layout_section(data, 'permanent', deck.get_layout_data_one_section({permanent: true}, 'type_name'));
	}
	if (options && options.layout) {
		layout_template = options.layout;
	}
	
	return layouts[layout_template](data);
}

deck.get_layout_section = function(sort, group, filter){
	var section = $('<div>');
	var query = {};
	var groups = {};
	var context = "";
	if (sort && sort.code){
		context = "number";
	}
	if (sort && sort.position){
		context = "number";
	}
	// if we have a group, then send the group by to the query
	if (group){
		var cards = deck.get_cards(sort, query, group);	
	} else {
		var cards = deck.get_cards(sort, query);
	}
	
	if(cards.length) {
		
		//$(header_tpl({code: "Cards", name: "Cards", quantity: deck.get_nb_cards(cards)})).appendTo(section);
		//'<h5><span class="icon icon-<%= code %>"></span> <%= name %> (<%= quantity %>)</h5>'
		// run through each card and display display it
		deck.create_card_group(cards, context).appendTo(section);
			
	} else if (cards.constructor !== Array){		
		$.each(cards, function (index, group_cards) {
		//cards.forEach(function (group_cards) {			
			if (group_cards.constructor === Array){
				$(header_tpl({code: index, name: index == "undefined" ? "Null" : index, quantity: group_cards.reduce(function(a,b){ return a + b.indeck}, 0) })).appendTo(section);
				deck.create_card_group(group_cards, context).appendTo(section);
			}
		});
	}
	return section;
}


deck.update_layout_section = function update_layout_section(data, section, element) {
	data[section] = data[section] + element[0].outerHTML;
}

deck.get_layout_data_one_section = function get_layout_data_one_section(query, displayLabel) {
	var section = $('<div>');

	var cards = deck.get_cards({ name: 1 }, query);
	if(cards.length) {
		var name = "";
		if (displayLabel == "hunches") {
			name = "Hunches";
		} else {
			name = cards[0][displayLabel];
		}
		
		if (query.type_code == "asset"){
			$(header_tpl({code: name, name: name, quantity: deck.get_nb_cards(cards)})).appendTo(section);
			var slots = {
				'Hand': [],
				'Hand x2': [],
				'Arcane': [],
				'Arcane x2': [],
				'Accessory': [],
				'Accessory': [],
				'Body': [],
				'Ally': [],
				'Tarot': [],
				'Other': []
			};
			
			cards.forEach(function (card) {
				var $div = deck.create_card(card);


				if (card.real_slot && slots[card.real_slot]){
					slots[card.real_slot].push($div);
				} else {
					slots["Other"].push($div);
				}
			});
			$.each(slots,function (index, slot) {
				if(slot.length > 0){
					$('<div class="slot-header small">'+index+'</div>').appendTo(section);
					$.each(slot,function (index, div) {
						div.appendTo(section);
					});
				}
			});
		} else {
			if (query.permanent) {
				$(header_tpl({code: "Permanent", name: "Permanent", quantity: deck.get_nb_cards(cards)})).appendTo(section);
			} else {
				$(header_tpl({code: name, name: name, quantity: deck.get_nb_cards(cards)})).appendTo(section);
			}
			cards.forEach(function (card) {
				var div = deck.create_card(card);
				div.appendTo(section);
			});
		}
	}
	return section;
}


deck.create_card_group = function(cards, context){
	var section = $('<div>');
	cards.forEach(function (card) {
		var $div = deck.create_card(card);
		$div.appendTo(section);
	});
	return section;
}

deck.create_card = function create_card(card){
	var $div = $('<div>').addClass(deck.can_include_card(card) ? '' : 'invalid-card');

	$div.append($(card_line_tpl({card:card})));
	
	$div.prepend(card.indeck+'x ');
	if(card.xp && card.xp > 0) {
		$div.append(app.format.xp(card.xp, card.indeck));
	}
	if(card.taboo_xp && card.taboo_xp > 0) {
		$div.append(app.format.xp(card.taboo_xp, card.indeck, "taboo"));
	}
	if(card.xp === undefined) {
		$div.append(' <span class="fa fa-star" title="Does not count towards deck size"></span>');
	}
	if(card.ignore) {
		$div.append(' <span class="fa fa-star" style="color:green;" title="'+card.ignore+' of these do not count towards deck size"></span>');
	}
	if(card.taboo === true) {
		$div.append(' <span class="icon-tablet" style="color:purple;" title="Is mutated by the current taboo list"></span>');
	}
	if(card.exceptional === true) {
		$div.append(' <span class="icon-eldersign" style="color:orange;" title="Exceptional. Double xp cost and limit one per deck."></span>');
	}
	
	if (!no_collection){
		var pack = app.data.packs.findById(card.pack_code);
		if (!collection[pack.id]) {
			$div.append(' <span class="fa fa-question" title="This card is not part of your collection"></span>');
		}
	}
	
	if (card.code == "01000" && $("#special-collection").length > 0 ){
		$div.append(' <a class="fa fa-random" title="Replace with randomly selected weakness from currently selected packs" data-random="'+card.code+'"> <span ></span></a> ');
	}
	return $div;
}

/**
 * @memberOf deck
 * @return boolean true if at least one other card quantity was updated
 */
deck.set_card_copies = function set_card_copies(card_code, nb_copies) {
	var card = app.data.cards.findById(card_code);
	if(!card) return false;

	var updated_other_card = false;

	app.data.cards.updateById(card_code, {
		indeck: nb_copies
	});
	app.deck_history && app.deck_history.notify_change();

	return updated_other_card;
}

/**
 * @memberOf deck
 * @return boolean true if at least one other card quantity was updated
 */
deck.set_card_ignores = function set_card_ignores(card_code, nb_copies) {
	var card = app.data.cards.findById(card_code);
	if(!card) return false;

	var updated_other_card = false;

	app.data.cards.updateById(card_code, {
		ignore: nb_copies
	});

	return updated_other_card;
}

/**
 * @memberOf deck
 */
deck.get_content = function get_content() {
	var cards = deck.get_cards();
	var content = {};
	cards.forEach(function (card) {
		content[card.code] = card.indeck;
	});
	return content;
}

/**
 * @memberOf deck
 */
deck.get_ignored_cards = function get_ignored_cards() {
	var cards = deck.get_cards();
	var ignored = {};
	cards.forEach(function (card) {
		if (card.ignore > 0){
			ignored[card.code] = card.ignore;
		}
	});
	return ignored;
}

/**
 * @memberOf deck
 */
deck.get_json = function get_json() {
	return JSON.stringify(deck.get_content());
}
/**
 * @memberOf deck
 */
deck.get_ignored_json = function get_ignored_json() {
	return JSON.stringify(deck.get_ignored_cards());
}
/**
 * @memberOf deck
 */
deck.get_meta_json = function get_meta_json() {
	return JSON.stringify(deck.meta);
}

/**
 * @memberOf deck
 */
deck.get_export = function get_export(format) {

}

/**
 * @memberOf deck
 */
deck.get_copies_and_deck_limit = function get_copies_and_deck_limit() {
	var copies_and_deck_limit = {};
	deck.get_draw_deck().forEach(function (card) {
		var value = copies_and_deck_limit[card.real_name];
		if(!value) {
			copies_and_deck_limit[card.real_name] = {
					nb_copies: card.indeck - card.ignore,
					deck_limit: card.deck_limit
			};
			if (typeof card.real_text !== 'undefined' && card.real_text.indexOf('Myriad.') !== -1) {
				copies_and_deck_limit[card.real_name].deck_limit = 3;
			}
		} else {
			value.nb_copies += card.indeck - card.ignore;
			value.deck_limit = Math.min(card.deck_limit, value.deck_limit);
			if (typeof card.real_text !== 'undefined' && card.real_text.indexOf('Myriad.') !== -1) {
				value.deck_limit = 3;
			}
		}
	})
	return copies_and_deck_limit;
}

/**
 * @memberOf deck
 */
deck.get_problem = function get_problem() {
	
	// get investigator data
	var card = app.data.cards.findById(this.get_investigator_code());
	var size = 30;
	// store list of all problems 
	deck.problem_list = [];
	if (card && card.deck_requirements){
		if (card.deck_requirements.size){
			size = card.deck_requirements.size;
		}
		if (deck.meta && deck.meta.alternate_back) {
			var alternate = app.data.cards.findById(deck.meta.alternate_back);
			if (alternate && alternate.deck_requirements.size) {
				size = alternate.deck_requirements.size;
			}
		}
		if (deck.meta && deck.meta.deck_size_selected){
			size = parseInt(deck.meta.deck_size_selected, 10);
		}
		var versatile = app.data.cards.findById("06167");
		if (versatile && versatile.indeck) {
			size = size + 5;
			if (versatile.indeck > 1) {
				size = size + 5;
			}
		}
		// must have the required cards
		if (card.deck_requirements.card){
			var req_count = 0;
			var req_met_count = 0;
			$.each(card.deck_requirements.card, function (key, possible){
				req_count++;
				var found_match = false;
				$.each(possible, function (code, code2){
					var req = app.data.cards.findById(code);
					if (req && req.indeck){
						found_match = true;
					}
				});
				if (found_match){
					req_met_count++;
				}
			});
			if (req_met_count < req_count){
				return "investigator";
			}
		}
	} else {
		
	}

	// too many copies of one card
	if(_.findKey(deck.get_copies_and_deck_limit(), function(value) {
		return value.nb_copies > value.deck_limit;
	}) != null) return 'too_many_copies';

	// no invalid card
	if(deck.get_invalid_cards().length > 0) {
		return 'invalid_cards';
	}
		

	for (var i = 0; i < deck.deck_options.length; i++){

		if (deck.deck_options[i].limit_count && deck.deck_options[i].limit){
			if (deck.deck_options[i].limit_count > deck.deck_options[i].limit){
				if (deck.deck_options[i].error){
					deck.problem_list.push(deck.deck_options[i].error);
				}
				return 'investigator';
			}
		}
		
		if (deck.deck_options[i].atleast_count && deck.deck_options[i].atleast){
			if (deck.deck_options[i].atleast.factions && deck.deck_options[i].atleast.min){
				var faction_count = 0;
				$.each(deck.deck_options[i].atleast_count, function(key, value){
					if (value >= deck.deck_options[i].atleast.min){
						faction_count++;
					}
				})
				if (faction_count < deck.deck_options[i].atleast.factions){
					if (deck.deck_options[i].error){
						deck.problem_list.push(deck.deck_options[i].error);
					}
					return 'investigator';
				}
			}
		}
	}
	
		// at least 60 others cards
	if(deck.get_draw_deck_size() < size) {
		return 'too_few_cards';
	}
	
	// at least 60 others cards
	if(deck.get_draw_deck_size() > size) {
		return 'too_many_cards';
	}
	
}

deck.reset_limit_count = function (){
	if (investigator){
		var versatile = app.data.cards.findById("06167");//06167
		var on_your_own = app.data.cards.findById("53010");
		// if they user has selected different deck building options, point deck_options to the alternate one
		if (deck.meta && deck.meta.alternate_back) {
			var alternate = app.data.cards.findById(deck.meta.alternate_back);
			if (alternate && alternate.deck_options && alternate.deck_options.length) {
				deck.deck_options = alternate.deck_options;
			} else {
				deck.deck_options = investigator.deck_options;
			}
		} else {
			deck.deck_options = investigator.deck_options;
		}
		for (var i = deck.deck_options.length - 1; i >= 0 ; i--) {
			if (deck.deck_options[i] && deck.deck_options[i].dynamic) {
				deck.deck_options.splice(i, 1);
			} else {
				deck.deck_options[i].limit_count = 0;
				deck.deck_options[i].atleast_count = {};
			}
		}
		if (on_your_own && on_your_own.indeck) {
			// We put it at the front of the requirements since it is a negated one.
			var new_option = {name: "on_your_own", dynamic: true, not: true, slot: ['Ally']};
			deck.deck_options.unshift(new_option);
		}
		if (versatile && versatile.indeck) {
			var new_option = {name: "versatile", dynamic: true, faction:["guardian", "seeker", "survivor", "mystic", "rogue"], limit: 1, limit_count: 0, level:{"min":0, "max":0} };
			deck.deck_options.push(new_option);
			if (versatile.indeck > 1) {
				new_option = {name: "versatile", dynamic: true, faction:["guardian", "seeker", "survivor", "mystic", "rogue"], limit: 1, limit_count: 0, level:{"min":0, "max":0} };
				deck.deck_options.push(new_option);
			}
		}
	}
}

deck.get_invalid_cards = function get_invalid_cards() {
	//var investigator = app.data.cards.findById(investigator_code);
	deck.reset_limit_count();
	return _.filter(deck.get_cards({'xp': -1}), function (card) {
		return ! deck.can_include_card(card, true);
	});
}

/**
 * returns true if the deck can include the card as parameter
 * @memberOf deck
 */
deck.can_include_card = function can_include_card(card, limit_count, hard_count) {
	// hide investigators
	if (card.type_code === "investigator") {
		return false;
	}
	if (card.faction_code === "mythos") {
		return false;
	}

	// reject cards restricted
	if (card.restrictions && card.restrictions.investigator && !card.restrictions.investigator[investigator_code]) {
			return false;
	}
	
	//var investigator = app.data.cards.findById(investigator_code);
	// store the overflow from one rule to another for deck limit counting
	var overflow = 0; 
	if (deck.deck_options && deck.deck_options.length) {
		
		for (var i = 0; i < deck.deck_options.length; i++){
			var option = deck.deck_options[i];
			
			var valid = false;

			if (option.faction_select && app.deck.meta && app.deck.meta.faction_selected){
				// if the user has selected a faction, update this option with the correct choice
				option.faction = [];
				option.faction.push(app.deck.meta.faction_selected);
			}
			
			if (option.faction){
				// needs to match at least one faction
				var faction_valid = false;
				for(var j = 0; j < option.faction.length; j++){
					var faction = option.faction[j];
					if (card.faction_code == faction || card.faction2_code == faction){
						faction_valid = true;
					}
				}
				
				if (!faction_valid){
					continue;
				}
			}
			
			if (option.type){
				// needs to match at least one faction
				var type_valid = false;
				for(var j = 0; j < option.type.length; j++){
					var type = option.type[j];
					if (card.type_code == type){
						type_valid = true;
					}
				}
				
				if (!type_valid){
					continue;
				}
			}
			
			if (option.slot){
				// needs to match at least one slot
				var slot_valid = false;
				
				for(var j = 0; j < option.slot.length; j++){
					var slot = option.slot[j];
					
					if (card.real_slot && card.real_slot.toUpperCase().indexOf(slot.toUpperCase()) !== -1){
						slot_valid = true;
					}
				}
				
				if (!slot_valid){
					continue;
				}
			}
			
			if (option.trait){
				// needs to match at least one trait				
				var trait_valid = false;				
				
				for(var j = 0; j < option.trait.length; j++){
					var trait = option.trait[j];
					
					if (card.real_traits && card.real_traits.toUpperCase().indexOf(trait.toUpperCase()+".") !== -1){
						trait_valid = true;
					}
				}
				
				if (!trait_valid){
					continue;
				}
			}
			
			if (option.uses){
				// needs to match at least one trait	
				var uses_valid = false;
				
				for(var j = 0; j < option.uses.length; j++){
					var uses = option.uses[j];
					
					if (card.real_text && card.real_text.toUpperCase().indexOf(""+uses.toUpperCase()+").") !== -1){
						uses_valid = true;
					}
				}
				
				if (!uses_valid){
					continue;
				}

			}
			
			if (option.text){
				// match a regular custom expression on the text
				var text_valid = false;
				
				for(var j = 0; j < option.text.length; j++){
					var text = option.text[j];
					
					if (card.real_text && card.real_text.toLowerCase().match(text)){
						text_valid = true;
					}
				}
				
				if (!text_valid){
					continue;
				}

			}
			
			if (option.level){
				// needs to match at least one faction
				var level_valid = false;
				
				if (typeof card.xp !== 'undefined' && option.level){
					if (card.xp >= option.level.min && card.xp <= option.level.max){
						level_valid = true;
					}else {
						continue;	
					}
				}
			}
			
			
			if (option.not){
				return false;
			}else {
				if (limit_count && option.limit){
					if (option.limit_count >= option.limit) {
						continue;
					} 
					if (hard_count){
						option.limit_count += 1;
					} else {
						// if we have left over from previous options, use that value instead of the qty
						if (overflow) {
							option.limit_count += overflow;
						} else {
							option.limit_count += card.indeck;
						}
						
					}
					if (option.limit_count > option.limit) {
						overflow = option.limit_count - option.limit;
						option.limit_count = option.limit;
						continue;
					}
					
				}
				if (limit_count && option.atleast){
					if (!option.atleast_count[card.faction_code]){
						option.atleast_count[card.faction_code] = 0;
					}
					option.atleast_count[card.faction_code] += card.indeck;
					if (card.faction2_code) {
						if (!option.atleast_count[card.faction2_code]) {
							option.atleast_count[card.faction2_code] = 0;
						}
						option.atleast_count[card.faction2_code] += card.indeck;
					}
				}
				
				return true;
			}
			
		}
	}
	
	return false;
}

})(app.deck = {}, jQuery);

(function app_diff(diff, $) {

// takes an array of strings and returns an object where each string of the array
// is a key of the object and the value is the number of occurences of the string in the array
function array_count(list) {
	var obj = {};
	var list = list.sort();
	for(var i=0; i<list.length; ) {
		for(var j=i+1; j<list.length; j++) {
			if(list[i] !== list[j]) break;
		}
		obj[list[i]] = (j-i);
		i=j;
	}
	return obj;
}

/**
 * contents is an array of content
 * content is a hash of pairs code-qty
 * @memberOf diff
 */
diff.compute_simple = function compute_simple(contents) {
	
	var ensembles = [];
	for(var decknum=0; decknum<contents.length; decknum++) {
		var cards = [];
		$.each(contents[decknum], function (code, qty) {
			for(var copynum=0; copynum<qty; copynum++) {
				cards.push(code);
			}
		});
		ensembles.push(cards);
	}
	
	var conjunction = [];
	for(var i=0; i<ensembles[0].length; i++) {
		var code = ensembles[0][i];
		var indexes = [ i ];
		for(var j=1; j<ensembles.length; j++) {
			var index = ensembles[j].indexOf(code);
			if(index > -1) indexes.push(index);
			else break;
		}
		if(indexes.length === ensembles.length) {
			conjunction.push(code);
			for(var j=0; j<indexes.length; j++) {
				ensembles[j].splice(indexes[j], 1);
			}
			i--;
		}
	}
	
	var listings = [];
	for(var i=0; i<ensembles.length; i++) {
		listings[i] = array_count(ensembles[i]);
	}
	var intersect = array_count(conjunction);
	
	return [ listings, intersect ];
};

})(app.diff = {}, jQuery);

(function app_deck_history(deck_history, $) {

var tbody,
	clock,
	snapshots_init = [],
	snapshots = [],
	base = {},
	xp_spent = 0,
	progressbar,
	timer,
	ajax_in_process = false,
	period = 60,
	changed_since_last_autosave = false;


/**
 * @memberOf deck_history
 */
deck_history.all_changes = function all_changes() {
	//console.log("ch ch changes", app.deck.get_content());
	if (snapshots.length <= 0){
		//console.log("boo");
		return;
	}

	// compute diff between last snapshot and current deck
	var last_snapshot = deck_history.base.content;
	var current_deck = app.deck.get_content();

	var result = app.diff.compute_simple([current_deck, last_snapshot]);
	if(!result) return;

	var diff = result[0];
	//console.log("DIFFF ", diff);

	var free_0_cards = 0;
	var removed_0_cards = 0;
	var cards_removed = [];
	var cards_added = [];
	var cards_exiled = {};
	var cost = 0;
	_.each(diff[1], function (qty, code) {
		var card = app.data.cards.findById(code);
		if(!card) return;
		var card_change = {
			"qty": qty,
			"code": code,
			"card": card
		};
		cards_removed.push(card_change);
	});

	_.each(diff[0], function (qty, code) {
		var card = app.data.cards.findById(code);
		if(!card) return;
		var card_change = {
			"qty": qty,
			"code": code,
			"card": card
		};
		cards_added.push(card_change);
		if (card_change.code == "06167") {
			free_0_cards += card_change.qty * 5;
			removed_0_cards += card_change.qty * 5;
		}
	});

	// find deja vu
	var deja_vu = app.data.cards.findById("60531");
	var deja_vu_exiled = {};
	// There's a limit on how many discounts per card, and a limit on how
	// many uses overall.
	var deja_vu_max_discount = 0;
	var deja_vu_discounts = 0;
	if (deja_vu && deja_vu.indeck) {
		// You get a discount of 1 XP per exile card, per deja vu.
		deja_vu_max_discount += deja_vu.indeck;
		deja_vu_discounts += deja_vu_max_discount * 3;
	}

	// find arcane research
	var arcane_research = app.data.cards.findById("04109");
	var spell_upgrade_discounts = 0;
	if (arcane_research && arcane_research.indeck) {
		spell_upgrade_discounts += arcane_research.indeck;
	}

	// find adaptable
	var adaptable = app.data.cards.findById("02110");
	if (adaptable && adaptable.indeck){
		free_0_cards += 2 * adaptable.indeck;
	}
	if (app.deck.get_exiles() && app.deck.get_exiles().length > 0){
		free_0_cards += app.deck.get_exiles().length;
		removed_0_cards = app.deck.get_exiles().length;
		_.each(app.deck.get_exiles(), function (code, id) {
			if (cards_exiled[code]){
				cards_exiled[code] = 2;
				deja_vu_exiled[code] = 2;
			} else {
				cards_exiled[code] = 1;
				deja_vu_exiled[code] = 1;
			}
		});
	}

	var myriad_madness = {};
	// first check for same named cards
	_.each(cards_added, function (addition) {
		_.each(cards_removed, function (removal) {
			var addition_xp = addition.card.xp;
			var removal_xp = removal.card.xp;
			if (typeof addition.card.real_text !== 'undefined' && addition.card.real_text.indexOf('Myriad.') !== -1) {
				addition.qty = 1;
				if (myriad_madness[addition.card.real_name]) {
					addition.qty = 0;
				}
				myriad_madness[addition.card.real_name] = 1;
			}
			if (typeof removal.card.real_text !== 'undefined' && removal.card.real_text.indexOf('Myriad.') !== -1) {
				removal.qty = 1;
			}
			if (addition.card.taboo_xp){
				addition_xp += addition.card.taboo_xp;
			}
			if (removal.card.taboo_xp){
				removal_xp += removal_xp.card.taboo_xp;
			}
			if (addition.qty > 0 && removal.qty > 0 && addition_xp >= 0 && addition.card.real_name == removal.card.real_name && addition_xp > removal_xp){
				addition.qty = addition.qty - removal.qty;
				if (spell_upgrade_discounts > 0 && removal.card.real_traits && removal.card.real_traits.indexOf('Spell.') !== -1 && addition.card.real_traits && addition.card.real_traits.indexOf('Spell.') !== -1) {
					// It's a spell card, and we have arcane research discounts remaining.
					var upgradeCost = ((addition_xp - removal_xp) * removal.qty)
					while (spell_upgrade_discounts > 0 && upgradeCost > 0) {
						upgradeCost--;
						spell_upgrade_discounts--;
					}
					cost = cost + upgradeCost;
				} else {
					cost = cost + ((addition_xp - removal_xp) * removal.qty);
				}
				removal.qty = Math.abs(addition.qty);
			}
		});
	});

	_.each(cards_removed, function (removal) {
		if (!app.deck.can_include_card(removal.card)){
			// Even though its not technically a L0 card, any 'invalid' card that was removed,
			// by our updated deck rules, can be replaced with an L0 for free.
			free_0_cards += removal.qty;
			removed_0_cards += removal.qty;
		} else if (removal.card.xp === 0){
			removed_0_cards += removal.qty;
		}
  });
  //console.log({ removed_0_cards, free_0_cards });

	myriad_madness = {};
	//console.log(removed_0_cards);
	// then pay for all changes
	_.each(cards_added, function (addition) {
		var addition_xp = addition.card.xp;
		if (typeof addition.card.real_text !== 'undefined' && addition.card.real_text.indexOf('Myriad.') !== -1) {
			addition.qty = 1;
			if (myriad_madness[addition.card.real_name]) {
				addition.qty = 0;
			}
			myriad_madness[addition.card.real_name] = 1;
		}
		if (addition.card.exceptional){
			addition_xp *= 2;
		}
		if (addition.card.taboo_xp){
			addition_xp += addition.card.taboo_xp;
		}
		if (deja_vu_exiled[addition.card.code] && deja_vu_discounts > 0){
			var discount_per_card = Math.min(
				addition_xp,
				deja_vu_max_discount
			);
			let deja_vu_cost = 0;
			// Handle cards one at a time, since each one needs to have a corresponding
			// exile and we still need to have 'uses' left.
			for (var i = 0; i < addition.qty; i++){
				if (deja_vu_exiled[addition.card.code]){
					deja_vu_exiled[addition.card.code]--;
					discount = Math.min(discount_per_card, deja_vu_discounts);
					deja_vu_discounts -= discount;
					deja_vu_cost += addition_xp - discount;
				} else {
					// Only get discount if we replaced something, and have uses left.
					deja_vu_cost += addition_xp;
				}
			}
			cost = cost + deja_vu_cost;
			addition.qty = 0;
		} else if (addition_xp >= 0){
			if (addition.card.xp === 0 && removed_0_cards > 0 && free_0_cards > 0){
				free_0_cards -= addition.qty;
				removed_0_cards -= addition.qty;
				if (removed_0_cards < 0 || free_0_cards < 0){
					addition.qty = 1;
				} else {
					addition.qty = 0;
				}
			}
			if (addition.card.indeck - addition.qty > 0 && addition.card.ignore) {
				addition.card.ignore = addition.card.ignore - (addition.card.indeck - addition.qty);
			}
			cost = cost + (Math.max(addition_xp, 1) * (addition.qty - addition.card.ignore) );
			addition.qty = 0;
		}
	});


	var add_list = [];
	var remove_list = [];
	var exile_list = [];
	// run through the changes and show them
	_.each(diff[0], function (qty, code) {
		var card = app.data.cards.findById(code);
		if(!card) return;
		add_list.push('+'+qty+' '+'<a href="'+card.url+'" class="card card-tip fg-'+card.faction_code+'" data-toggle="modal" data-remote="false" data-target="#cardModal" data-code="'+card.code+'">'+card.name+'</a>'+app.format.xp(card.xp)+'</a>');
		//add_list.push('+'+qty+' '+'<a href="'+Routing.generate('cards_zoom',{card_code:code})+'" class="card-tip" data-code="'+code+'">'+card.name+''+(card.xp >= 0 ? ' ('+card.xp+')' : '')+'</a>');
	});
	_.each(diff[1], function (qty, code) {
		var card = app.data.cards.findById(code);
		if(!card) return;
		remove_list.push('&minus;'+qty+' '+'<a href="'+card.url+'" class="card card-tip fg-'+card.faction_code+'" data-toggle="modal" data-remote="false" data-target="#cardModal" data-code="'+card.code+'">'+card.name+'</a>'+app.format.xp(card.xp)+'</a>');
		//remove_list.push('&minus;'+qty+' '+'<a href="'+Routing.generate('cards_zoom',{card_code:code})+'" class="card-tip" data-code="'+code+'">'+card.name+'</a>');
	});
	_.each(cards_exiled, function (qty, code) {
		var card = app.data.cards.findById(code);
		if(!card) return;
		exile_list.push('&minus;'+qty+' '+'<a href="'+card.url+'" class="card card-tip fg-'+card.faction_code+'" data-toggle="modal" data-remote="false" data-target="#cardModal" data-code="'+card.code+'">'+card.name+'</a>'+app.format.xp(card.xp)+'</a>');
		//remove_list.push('&minus;'+qty+' '+'<a href="'+Routing.generate('cards_zoom',{card_code:code})+'" class="card-tip" data-code="'+code+'">'+card.name+'</a>');
	});
	if (cost && app.deck.get_previous_deck()){
		app.deck.set_xp_spent(cost)
	}
	if(app.deck.get_previous_deck()){
		$("#upgrade_changes").empty();
		$("#upgrade_changes").append('<h4 class="deck-section">Progress</h4>');

		if (app.deck.get_xp_adjustment()){
			$("#upgrade_changes").append('<div>Available experience: <span id="xp_up" class="fa fa-plus-circle xp_up"></span> '+app.deck.get_xp()+' <span id="xp_down" class="fa fa-minus-circle xp_down"></span> ('+app.deck.get_xp_adjustment()+')</div>');
		} else {
			$("#upgrade_changes").append('<div>Available experience: <span id="xp_up" class="fa fa-plus-circle xp_up"></span> '+app.deck.get_xp()+' <span id="xp_down" class="fa fa-minus-circle xp_down"></span></div>');
		}

		$("#upgrade_changes").append('<div>Spent experience: '+cost+'</div>');
		if (app.deck.get_previous_deck() && $('#save_form').length <= 0){
			$("#upgrade_changes").append('<div><a href="'+Routing.generate('deck_view', {deck_id:app.deck.get_previous_deck()})+'">View Previous Deck</a></div>');
		}
		if (app.deck.get_next_deck()){
			$("#upgrade_changes").append('<div><a href="'+Routing.generate('deck_view', {deck_id:app.deck.get_next_deck()})+'">View Next Deck</a></div>');
		}
		$("#upgrade_changes").append('<h4 class="deck-section">Changes</h4>');
		if (add_list.length <= 0 && remove_list.length <= 0){
			$("#upgrade_changes").append('<div class="deck-content">No Changes</div>');
		}else {
			$("#upgrade_changes").append('<div class="deck-content"><div class="row"><div class="col-sm-6 col-print-6">'+add_list.join('<br>')+'</div><div class="col-sm-6 col-print-6">'+remove_list.join('<br>')+'</div></div></div>');
		}
		if (exile_list.length > 0){
			$("#upgrade_changes").append('<b>Exiled Cards</b>');
			$("#upgrade_changes").append('<div class="deck-content"><div class="row"><div class="col-sm-6 col-print-6">'+exile_list.join('<br>')+'</div></div></div>');
		}
	} else if (app.deck.get_next_deck()){
		if (app.deck.get_next_deck()){
			$("#upgrade_changes").empty();
			$("#upgrade_changes").append('<h4 class="deck-section">Progress</h4>');
			$("#upgrade_changes").append('<div><a href="'+Routing.generate('deck_view', {deck_id:app.deck.get_next_deck()})+'">View Next Deck</a></div>');
		}
	}
	//console.log(result[1])
}

/**
 * @memberOf deck_history
 */
deck_history.autosave = function autosave() {

	// check if deck has been modified since last autosave
	if(!changed_since_last_autosave) return;

	// compute diff between last snapshot and current deck
	var last_snapshot = snapshots[snapshots.length-1].content;
	var current_deck = app.deck.get_content();

	changed_since_last_autosave = false;

	var result = app.diff.compute_simple([current_deck, last_snapshot]);
	if(!result) return;

	var diff = result[0];
	var diff_json = JSON.stringify(diff);
	if(diff_json == '[{},{}]') return;

	// send diff to autosave
	$('#tab-header-history').html("Autosave...");
	ajax_in_process = true;

	$.ajax(Routing.generate('deck_autosave'), {
		data: {
			diff: diff_json,
			deck_id: app.deck.get_id()
		},
		type: 'POST',
		success: function(data, textStatus, jqXHR) {
			deck_history.add_snapshot({datecreation: data, variation: diff, content: current_deck, is_saved: false});
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('['+moment().format('YYYY-MM-DD HH:mm:ss')+'] Error on '+this.url, textStatus, errorThrown);
			changed_since_last_autosave = true;
		},
		complete: function () {
			$('#tab-header-history').html("History");
			ajax_in_process = false;
		}
	});

}

/**
 * @memberOf deck_history
 */
deck_history.autosave_interval = function autosave_interval() {
	// if we are in the process of an ajax autosave request, do nothing now
	if(ajax_in_process) return;

	// making sure we don't go into negatives
	if(timer < 0) timer = period;

	// update progressbar
	$(progressbar).css('width', (timer*100/period)+'%').attr('aria-valuenow', timer).find('span').text(timer+' seconds remaining.');

	// timer action
	if(timer === 0) {
		deck_history.autosave();
	}

	timer--;
}

/**
 * @memberOf deck_history
 */
deck_history.add_snapshot = function add_snapshot(snapshot) {

	snapshot.date_creation = snapshot.date_creation ? moment(snapshot.date_creation) : moment();
	snapshots.push(snapshot);

	var list = [];
	if(snapshot.variation) {
		_.each(snapshot.variation[0], function (qty, code) {
			var card = app.data.cards.findById(code);
			if(!card) return;
			list.push('+'+qty+' '+'<a href="'+Routing.generate('cards_zoom',{card_code:code})+'" class="card-tip" data-code="'+code+'">'+card.name+'</a>');
		});
		_.each(snapshot.variation[1], function (qty, code) {
			var card = app.data.cards.findById(code);
			if(!card) return;
			list.push('&minus;'+qty+' '+'<a href="'+Routing.generate('cards_zoom',{card_code:code})+'" class="card-tip" data-code="'+code+'">'+card.name+'</a>');
		});
	} else {
		list.push("First version");
	}

	tbody.prepend('<tr'+(snapshot.is_saved ? '' : ' class="warning"')+'><td>'+snapshot.date_creation.calendar()+(snapshot.is_saved ? '' : ' (unsaved)')+'</td><td>'+(snapshot.version || '')+'</td><td>'+list.join('<br>')+'</td><td><a role="button" href="#" data-index="'+(snapshots.length-1)+'"">Revert</a></td></tr>');

	timer = -1; // start autosave timer

}

/**
 * @memberOf deck_history
 */
deck_history.load_snapshot = function load_snapshot(event) {

	var index = $(this).data('index');
	var snapshot = snapshots[index];
	if(!snapshot) return;

	app.data.cards.find({}).forEach(function(card) {
		var indeck = 0;
		if (snapshot.content[card.code]) {
			indeck = snapshot.content[card.code];
		}
		app.data.cards.updateById(card.code, {
			indeck : indeck
		});
	});

	app.ui.on_deck_modified();
	changed_since_last_autosave = true;

	// cancel event
	return false;

}

/**
 * @memberOf deck_history
 */
deck_history.notify_change = function notify_change() {
	changed_since_last_autosave = true;
}

deck_history.get_unsaved_edits = function get_unsaved_edits() {
	return _.filter(snapshots, function (snapshot) {
		return snapshot.is_saved === false;
	}).sort(function (a, b) {
		return a.date_creation - b.datecreation;
	});
}

deck_history.is_changed_since_last_autosave = function is_changed_since_last_autosave() {
	return changed_since_last_autosave;
}

deck_history.init = function init(data)
{
	// console.log("ch ch changes", app.deck.get_content());
	snapshots_init = data;
}

/**
 * @memberOf deck_history
 * @param container
 */
deck_history.setup = function setup_history(container)
{
	tbody = $(container).find('tbody').on('click', 'a[role=button]', deck_history.load_snapshot);
	progressbar = $(container).find('.progress-bar');

	clock = setInterval(deck_history.autosave_interval, 1000);

	snapshots_init.forEach(function (snapshot) {
		if (!deck_history.base){
			deck_history.base = snapshot;
		}
		deck_history.add_snapshot(snapshot);
	});

	deck_history.all_changes();
}

})(app.deck_history = {}, jQuery);

(function app_deck_charts(deck_charts, $) {

var charts = [],
	faction_colors = {

		seeker :
			'#e3d852',

		neutral :
			'#cfcfcf',

		guardian :
			'#1d7a99',

		survivor :
			'#c00106',

		rogue :
			'#509f16',

		mystic :
			'#ae1eae'

	};

deck_charts.chart_faction = function chart_faction() {
	var factions = {};
	var draw_deck = app.deck.get_physical_draw_deck();
	draw_deck.forEach(function (card) {
		if(!factions[card.faction_code]) factions[card.faction_code] = { code: card.faction_code, name: card.faction_name, count: 0};
		factions[card.faction_code].count += card.indeck;
	})

	var data = [];
	_.each(_.values(factions), function (faction) {
		data.push({
			name: faction.name,
			label: '<span class="icon icon-'+faction.code+'"></span>',
			color: faction_colors[faction.code],
			y: faction.count
		});
	})

	$("#deck-chart-faction").highcharts({
		chart: {
            type: 'column'
        },
		title: {
            text: "Card Factions"
        },
		subtitle: {
            text: "Draw deck only"
        },
		xAxis: {
			categories: _.pluck(data, 'label'),
			labels: {
				useHTML: true
			},
            title: {
                text: null
            }
        },
		yAxis: {
            min: 0,
			allowDecimals: false,
			tickInterval: 3,
            title: null,
            labels: {
                overflow: 'justify'
            }
        },
        series: [{
			type: "column",
			animation: false,
            name: '# cards',
			showInLegend: false,
            data: data
        }],
		plotOptions: {
			column: {
			    borderWidth: 0,
			    groupPadding: 0,
			    shadow: false
			}
		}
    });
}


deck_charts.chart_cost = function chart_cost() {

	var data = [];

	var draw_deck = app.deck.get_physical_draw_deck();
	draw_deck.forEach(function (card) {
		if(typeof card.cost === 'number') {
			data[card.cost] = data[card.cost] || 0;
			data[card.cost] += card.indeck;
		}
	})
	data = _.flatten(data).map(function (value) { return value || 0; });

	$("#deck-chart-cost").highcharts({
		chart: {
			type: 'line'
		},
		title: {
			text: "Card Cost"
		},
		subtitle: {
			text: "Cost X ignored"
		},
		xAxis: {
			allowDecimals: false,
			tickInterval: 1,
			title: {
				text: null
			}
		},
		yAxis: {
			min: 0,
			allowDecimals: false,
			tickInterval: 1,
			title: null,
			labels: {
				overflow: 'justify'
			}
		},
		tooltip: {
			headerFormat: '<span style="font-size: 10px">Cost {point.key}</span><br/>'
		},
		series: [{
			animation: false,
			name: '# cards',
			showInLegend: false,
			data: data
		}]
	});
}


deck_charts.chart_skill = function chart_skill() {

	var icons = {};
	icons['willpower'] = {code: "willpower", "name": "Willpower", count: 0};
	icons['intellect'] = {code: "intellect", "name": "Intellect", count: 0};
	icons['combat'] = {code: "combat", "name": "Combat", count: 0};
	icons['agility'] = {code: "agility", "name": "Agility", count: 0};
	icons['wild'] = {code: "wild", "name": "Wild", count: 0};
	var draw_deck = app.deck.get_physical_draw_deck();
	draw_deck.forEach(function (card) {
		if (card.skill_willpower && card.skill_willpower > 0){
			icons['willpower'].count += card.indeck * card.skill_willpower;
		}
		if (card.skill_intellect && card.skill_intellect > 0){
			icons['intellect'].count += card.indeck * card.skill_intellect;
		}
		if (card.skill_combat && card.skill_combat > 0){
			icons['combat'].count += card.indeck * card.skill_combat;
		}
		if (card.skill_agility && card.skill_agility > 0){
			icons['agility'].count += card.indeck * card.skill_agility;
		}
		if (card.skill_wild && card.skill_wild > 0){
			icons['wild'].count += card.indeck * card.skill_wild;
		}
	})

	var data = [];
	_.each(_.values(icons), function (icon) {
		data.push({
			name: icon.name,
			label: '<span class="icon icon-'+icon.code+'"></span>',
			//color: faction_colors[faction.code],
			y: icon.count
		});
	})
	data = _.flatten(data).map(function (value) { return value || 0; });
		
	$("#deck-chart-skill").highcharts({
		chart: {
			type: 'column'
		},
		title: {
			text: "Card Skill Icons"
		},
		subtitle: {
			text: ""
		},
		xAxis: {
			categories: _.pluck(data, 'label'),
			labels: {
				useHTML: true
			},
			title: {
				text: null
			}
		},
		yAxis: {
			min: 0,
			allowDecimals: false,
			tickInterval: 3,
			title: null,
			labels: {
				overflow: 'justify'
			}
		},
		series: [{
			type: "column",
			animation: false,
			name: '# of skill icons',
			showInLegend: false,
			data: data
		}],
		plotOptions: {
			column: {
				borderWidth: 0,
				groupPadding: 0,
				shadow: false
			}
		}
	});
}


deck_charts.chart_slot = function chart_slot() {

	var slots = {};
	var draw_deck = app.deck.get_physical_draw_deck();
	draw_deck.forEach(function (card) {
		if (card.type_code != "asset"){
			return;
		}
		var card_slot = "Other";
		if (card.slot){
			card_slot = card.slot;
		}
		if(!slots[card_slot]) slots[card_slot] = { name: card_slot, count: 0};
		slots[card_slot].count += card.indeck;
	})

	var data = [];
	_.each(_.values(slots), function (slot) {
		data.push({
			name: slot.name,
			label: slot.name,
			//color: faction_colors[faction.code],
			y: slot.count
		});
	})
	data = _.flatten(data).map(function (value) { return value || 0; });
		
	$("#deck-chart-slot").highcharts({
		chart: {
			type: 'column'
		},
		title: {
			text: "Asset Slots"
		},
		subtitle: {
			text: ""
		},
		xAxis: {
			categories: _.pluck(data, 'label'),
			labels: {
				useHTML: true
			},
			title: {
				text: null
			}
		},
		yAxis: {
			min: 0,
			allowDecimals: false,
			tickInterval: 3,
			title: null,
			labels: {
				overflow: 'justify'
			}
		},
		series: [{
			type: "column",
			animation: false,
			name: '# of cards',
			showInLegend: false,
			data: data
		}],
		plotOptions: {
			column: {
				borderWidth: 0,
				groupPadding: 0,
				shadow: false
			}
		}
	});
}

deck_charts.setup = function setup(options) {
	deck_charts.chart_faction();
	deck_charts.chart_cost();
	deck_charts.chart_skill();
	deck_charts.chart_slot();
}

$(document).on('shown.bs.tab', 'a[data-toggle=tab]', function (e) {
	deck_charts.setup();
});

})(app.deck_charts = {}, jQuery);

(function ui_deck(ui, $) {

var dom_loaded = new $.Deferred(),
	data_loaded = new $.Deferred();

/**
 * called when the DOM is loaded
 * @memberOf ui
 */
ui.on_dom_loaded = function on_dom_loaded() {};

/**
 * called when the app data is loaded
 * @memberOf ui
 */
ui.on_data_loaded = function on_data_loaded() {};

/**
 * called when both the DOM and the app data have finished loading
 * @memberOf ui
 */
ui.on_all_loaded = function on_all_loaded() {};

ui.insert_alert_message = function ui_insert_alert_message(type, message) {
	var alert = $('<div class="alert" role="alert"></div>').addClass('alert-'+type).append(message);
	$('#wrapper>div.container').first().prepend(alert);
}

$(document).ready(function () {
	$('[data-toggle="tooltip"]').tooltip();
	$('time').each(function (index, element) {
		var datetime = moment($(element).attr('datetime'));
		$(element).html(datetime.fromNow());
		$(element).attr('title', datetime.format('LLLL'));
	});
	if(typeof ui.on_dom_loaded === 'function') ui.on_dom_loaded();
	dom_loaded.resolve();
});
$(document).on('data.app', function () {
	if(typeof ui.on_data_loaded === 'function') ui.on_data_loaded();
	data_loaded.resolve();
});
$(document).on('start.app', function () {
	if(typeof ui.on_all_loaded === 'function') ui.on_all_loaded();
	
	// try to update packs to set owned
	app.user.loaded.always(function() {
	  app.data.packs.update({}, {
	      owned: true
	  });
	
	  
	});

	
	/*
	$('abbr').each(function (index, element) {
		var title;
		switch($(element).text().toLowerCase()) {
		case 'renown': 
			title = "After you win a challenge in which this character is participating, he may gain 1 power.";
			break;		
		}
		if(title) $(element).attr('title', title).tooltip();
	})
	*/
});
$.when(dom_loaded, data_loaded).done(function () {
	setTimeout(function () {
		$(document).trigger('start.app');
	}, 0);
});

})(app.ui = {}, jQuery);

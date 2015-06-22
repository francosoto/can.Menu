steal(
	'can/control'
,	'can/construct/super'
,	'can/control/plugin'
,	'can/observe'
,	'can/event'
,	'can/view'
,	function()
	{
		/**
		 * @module {function} lib/menu/ <menu>
		 * @parent can
		 * @inherits can.Control 
		 */
		can.Menu = can.Control.extend(
			{
				/**
			 	 * @signature `<$input.menu(options={})>`
				 * Creates a Menu control.
				*/
				pluginName:	'menu'
			,	defaults:
				{
				/**
				 * @param {{}} params A parameter object with the following options:
				 * @option {Number} [minLength] The minimum character length needed before suggestions start getting rendered. Defaults to 3.
				 * @option {String} [displayKey] The Item key to display. Defaults to name.
				 * @option {Number} [timeout] The number of miliseconds to wait before requesting a suggestion. Defaults to 400.
				 * @option {EJS|Mustache|Stache} [view] Typeahead view.
				 * @option {Array|Object|function(query)} [source] Source data. Array of Objects, Array of Strings. Ajax Object or a function that shoudld return a deferred. 
				 * @option {Object} [query] Extra query to perfom on the request of suggestions.
				*/
				// 	minLength:	3
				// ,	displayKey:	'name'
				// ,	timeout:	400
					view:		undefined
				,	content: 	undefined
				// ,	source:		undefined
				// ,	query:		{}
				}
			}
		,	{
				/**
				 * Initilalize the menu plugin.
				 * @param {node} HTML node element where the menu plugin will be initialized.
				 * @param {object} Typeahead plugin options. 
				 */
				init: function(element, options)
				{
					/* Create observables menu's options */
					
					this.options_menu
					=	new can.Map({items: []})
					

					can.append(
						this.$menu
						=	can.$('<div>')
								// .css('position','relative')
								.appendTo(
									this.element.parent()
								)
					,	can.view(
							this.options.view
						,	this.options_menu
						)
					)

					this.$menu.find('.submenu').hide()

					console.log(this.$menu)
				
					// this.$menu.on(
					// 	{
					// 		mouseenter:	can.proxy(this.mouseenter,this)
					// 	,	mouseleave:	can.proxy(this.mouseleave,this)
					// 	}
					// )
				}

			,	'.menu > .navegable:not(".active") click': function(el,ev)
				{
					console.log(ev)
					ev.preventDefault()
					ev.stopPropagation()

					this.change_link(el,ev)
					
					/*this.newRoute(
						can.$(el).attr('data-route')
					)*/
				}

			,	'.menu > .navegable.active click': function(el,ev)
				{
					ev.preventDefault()
					ev.stopPropagation()

					this.toggleSubmenu(can.$(el).attr('data-route'))

					this.newRoute(
						can.$(el).attr('data-route')
					)
				}

			,	change_link: function(el,ev)
				{
					this.newRoute(
						can.$(el).attr('data-route')
					)
				}

			,	'enable_modal.sigma.menu': function(el,ev)
				{
					this.disable_modal
					=	true
				}

			,	'disable_modal.sigma.menu': function(el,ev)
				{
					this.disable_modal
					=	false
				}

			,	'.submenu > .navegable:not(".active") click': function(el,ev)
				{
					ev.preventDefault()
					ev.stopPropagation()

					this.newRoute(
						can.$(el).attr('data-route')
					)
				}

			,	toggleSubmenu: function(route)
				{
					this.element
						.find('.submenu[data-parent="'+route+'"]')
							.slideToggle('slow')
							.find('.active')
								.removeClass('active')
				}

			,	setActive: function(element_route)
				{
					var	$element
					=	this.element
							.find('.navegable[data-route="'+element_route+'"]')

					if	(!$element.hasClass('active'))
					{
						if	($element.parent().hasClass('menu'))	{
							this.element
									.find('.menu > .navegable.active')
										.removeClass('active')

							this.element
									.find('.menu > .submenu')
										.slideUp()

							this.toggleSubmenu(element_route)
						}	else	{
							this.element
									.find('.submenu > .navegable.active')
										.removeClass('active')
						}

						$element
							.addClass('active')
					}
				}

			}
		)
	}
)
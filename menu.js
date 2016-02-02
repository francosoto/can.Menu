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
				 * @option {EJS|Mustache|Stache} [view] Menu view.
				 * @option {Array|Object|function(query)} [source] Source data. Array of Objects, Array of Strings. Ajax Object or a function that shoudld return a deferred.
				 * @option {Object} [query] Extra query to perfom on the request of suggestions.
				*/
				// 	minLength:	3
				// ,	displayKey:	'name'
				// ,	timeout:	400
					view:			undefined
				,	mustache: 		undefined
				,	content: 		undefined
				,	routes: 		undefined
				,	options_menu:	undefined
				// ,	source:		undefined
				// ,	query:		{}
				}
			}
		,	{
				/**
				 * Initilalize the menu plugin.
				 * @param {node} HTML node element where the menu plugin will be initialized.
				 * @param {object} Menu plugin options.
				 */
				init: function(element, options)
				{
					// this.options_menu
					// =	new can.Map({items: []})

					/* Create observables menu's options */
					this.options_menu
					=	new can.Map(
							options.options_menu
							?	options.options_menu
							: 	{
									items:[]
								}
						)

					if(options.view && options.mustache)
						this._apply_template()

					this.$menu.find('.submenu').hide()

					console.log(this.$menu)
				}
			,	_apply_template: function()
				{
					/* View the template / mustache */

					can.append(
						this.$menu
						=	can.$('<div>')
								.appendTo(
									this.element.parent()
								)
					,	can.view(
							options.view
						,	options.options_menu
						)
					)
				}

			,	_apply_dropdown: function()
				{

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

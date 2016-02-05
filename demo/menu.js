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
					view:				undefined
				,	mustache: 			undefined
				,	routes: 			undefined
				,	source:				undefined
				,	dropdownFunction: 	undefined
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

					this.$menu
					=	can.$('<div>')
							.appendTo(
								this.element
							)

					if(options.mustache)
						this.template 
						= 	can.mustache(can.$(options.mustache).html())
					else if(options.view)
						can.append(
							this.$menu
						,	can.view(options.view)
						)
					
					/* Create observables menu's options */
					this._set_options_data()
				}

			,	_set_view: function() {
					if(this.template)
						can.append(
							this.$menu
						,	this.template(
								this.options_menu
							)
						)
				}

			,	_apply_dropdown: function($liElement,dropdown)
				{
					$liElement
						.addClass('dropdown')

					$liElement
						.find('a')
							.addClass('dropdown-toggle')

					if(this.options.dropdownFunction)
						this.options.dropdownFunction($liElement)
					else
					{
						$liElement
							.append(
								can.stache(
									'<ul class="dropdown-menu">{{#dropdown}}'
									+	'<li>'
									+		'<a href="{{href}}">{{tag}}</a>'
									+	'</li>'
									+ '{{/dropdown}}</ul>'
								)(dropdown)
							)
						
					}
				}

			, 	_set_options_data: function() 
				{
					if	(
						can.isPlainObject(this.options.source) 
						&& 	this.options.source.url
						&&	this.options.source.type
					)
						this._set_options_ajax(this.options.source)
					else if	(can.isPlainObject(this.options.source))
						this._set_options_array(this.options.source)
					else
						this.model(this.options.source)
				}

			,	_set_options_ajax: function(ajaxObject) 
				{
					can.ajax(
						ajaxObject
					).then(
						can.proxy(this._set_options_array,this)
					)
				}

			,	_set_options_array: function(options_menu) 
				{
					this.options_menu
					=	new can.Map(
							options_menu
							?	options_menu
							: 	{
									items:[]
								}
						)

					this._set_view()
				}

				/**
				 * 
				 * @param {Function(query)} Function to be evaluated.
				 */
			,	model: function(Model)
				{
					Model(this.options.source?this.options.source.data:{})
						.then(
							can.proxy(this.render,this)	
						)
				}

			,	_set_actived: function($liActived) {
					// active
					$liActived
						.addClass('active')
				}

			,	'.dropdown-toggle click': function() {
					$liElement
						.find('a')
							.click(
								function()
								{
									can.$("ul.dropdown-menu")
										.toggle()
								}
							)
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

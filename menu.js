steal(
	'can/control'
,	'can/construct/super'
,	'can/control/plugin'
,	'can/observe'
,	'can/event'
,	'can/route'
,	'can/view/stache'
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
						= 	can.stache(can.$(options.mustache).html())
					else if(options.view)
						can.append(
							this.$menu
						,	can.view(options.view)
						)
					else
						this._render_all()

					this._initialize_routes()

					/* Create observables menu's options */
					this._set_options_data()

					this._apply_dropdown()
				}

				// i have a little routing system!! 
			,	_initialize_routes: function() {
					can.each(this.options.routes,function(item){
						if(can.isPlainObject(item))
							can.route("",item)
						else if(typeof item == "string")
							can.route(item)
					});

					can.route.ready();
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

				//TODO - render all basic menu
			// ,	_render_all: function() {
					
			// 	}

			,	_apply_dropdown: function() {
					var self
					=	this

					this.element
						.find('li')
							.each(
								function(index,item) {
									if(	$(item).data('item')
										&&	$(item).data('item').attr('dropdown')
										&&	$(item).data('item').dropdown.length > 0
									)
										self._apply_dropdown_li(
											$(item)
										,	$(item).data('item').attr('dropdown')
										);
								}
							)
				}

			,	_apply_dropdown_li: function($liElement,dropdown)
				{
					$liElement
						.addClass('dropdown')

					if(this.options.dropdownFunction)
						this.options.dropdownFunction($liElement)
					else //Basic dropdown menu
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
							: 	{}
						)

					this._set_view()
				}

				/**
				 *
				 * @param {Function(query)} Function to be evaluated.
				 */

			,	model: function(Model) {
					Model()
						.then(
							can.proxy(this._set_options_array,this)
						)
				}

			,	_set_actived: function($liActived) {
					var	$element
					=	this.element
							.find('.active .navegable')

					if($element.data('route') != $liActived.data('route')) {
						$element
							.parent()
							.removeClass('active')

						$liActived
							.parent()
							.addClass('active') 
					}
				}

			,	'a.dropdown-toggle click': function(el,ev) {
					console.log(el,ev)
					if(!this.options.dropdownFunction)
						el.find("ul.dropdown-menu")
							.slideToggle('slow')
							// .toggle()
				}

			,	'.navegable:not(.active) click': function(el,ev) {
			 		ev.preventDefault()
			 		ev.stopPropagation()

			 		this.change_link(el)
					this._set_actived(el)
				}

				// dropdown-menu -> defino los navegables así le meto la funcionalidad del route
			,	'.dropdown-menu .navegable:not(".active") click': function(el,ev) {
					ev.preventDefault()
			 		ev.stopPropagation()

			 		this.change_link(el)
				}

			,	change_link: function(el)
			 	{
			 		// console.log(el,can.$(el).attr('data-route'))
				 	this.selectPatternRoute(can.$(el).attr('data-route'))
					// if(this.options.routes)
				 // 		can.route(
				 // 		,	can.$(el).attr('data-route')
				 // 		)
			 	}

			,	selectPatternRoute: function(dataRoute) {
					var self = this

					can.map(
						dataRoute.split('/')
					,	function(item,index){
							console.log(item, index, self.options.routes)
							return {page:self.options.routes[index], item: item}
						}
					)

					// return dataRoute.split('/')
				}

			,	'{can.route} change': function(el,attr)
			 	{
			 		this.element
			 			.trigger("changeRoute",attr)
			 	}

			// ,	'enable_modal.sigma.menu': function(el,ev)
			// 	{
			// 		this.disable_modal
			// 		=	true
			// 	}

			// ,	'disable_modal.sigma.menu': function(el,ev)
			// 	{
			// 		this.disable_modal
			// 		=	false
			// 	}

			// ,	toggleSubmenu: function(route)
			// 	{
			// 		this.element
			// 			.find('.submenu[data-parent="'+route+'"]')
			// 				.slideToggle('slow')
			// 				.find('.active')
			// 					.removeClass('active')
			// 	}

			// ,	setActive: function(element_route)
			// 	{
			// 		var	$element
			// 		=	this.element
			// 				.find('.navegable[data-route="'+element_route+'"]')

			// 		if	(!$element.hasClass('active'))
			// 		{
			// 			if	($element.parent().hasClass('menu'))	{
			// 				this.element
			// 						.find('.menu > .navegable.active')
			// 							.removeClass('active')

			// 				this.element
			// 					.find('.menu > .submenu')
			// 						.slideUp()

			// 				this.toggleSubmenu(element_route)
			// 			}	else	{
			// 				this.element
			// 						.find('.submenu > .navegable.active')
			// 							.removeClass('active')
			// 			}

			// 			$element
			// 				.addClass('active')
			// 		}
			// 	}

			}
		)
	}
)

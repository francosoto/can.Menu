steal(
	'can/model'
,	'can/util/fixture'
,	'can/view/mustache'
,	'bower_components/bootstrap/js/dropdown.js'
,	'menu.js'
,	function()
	{
		var	dropdown1 =	[
				{
					tag: 	'Argentina'
				,	href: 	'argentina'
				,	icon: 	''
				}
			, 	{
					tag: 	'Uruguay'
				,	href: 	'uruguay'
				,	icon: 	''
				}
			, 	{
					tag: 	'Colombia'
				,	href: 	'colombia'
				,	icon: 	''
				}
			, 	{
					tag: 	'Brasil'
				,	href: 	'brasil'
				,	icon: 	''
				}
			]
		, 	dropdown2 =	[
				{
					tag: 	'Config'
				,	href: 	'config'
				,	icon: 	''
				}
			, 	{
					tag: 	'Config2'
				,	href: 	'config2'
				,	icon: 	''
				}
			, 	{
					role: 'separator'
				, 	'class':'divider'
				}
			, 	{
					tag: 	'Config3'
				,	href: 	'config3'
				,	icon: 	''
				}
			,	{
					role: 'separator'
				, 	'class':'divider'
				}
			, 	{
					tag: 	'Logout'
				,	href: 	'logout'
				,	icon: 	''
				}
			]
		,	menuArray =	{
				brand: [
					{
						tag: 		'Home'
					,	actived: 	true
					,	href: 		'#'
					}
				]
			,	left: [
					{
						tag: 		'Second Option'
					,	href: 		'second_option'
					}
				,	{
						tag: 		'Countries'
					,	dropdown: 	dropdown1
					}
				]
			,	right: [
					{
						tag: 		'Fourth Option'
					,	href: 		'other_option'
					}
				,	{
						tag: 		'User X'
					,	dropdown: 	dropdown2
					}
				]
			}

		can.fixture(
			'GET /menus'
		,	function(req,res)
			{
				return 	res(
							200
						,	'success'
						,	menuArray
						)
			}
		)

		Menu = can.Model.extend(
			{
				get: function(query)
				{
					return	can.ajax(
								{
									url: '/menus'
								,	method: 'GET'
								,	data: query
								}
							)
				}
			}
		,	{	}
		)

		function dropdownFunc($element) {
			//if($element.find('a.dropdown-toggle'))
				$element.find('a.dropdown-toggle')
					.dropdown()
		}

		can.stache.registerHelper(
			'dropdownTrue'
		,	function(dropdown, options) {
				if(dropdown() instanceof can.Map)
					return options.fn(this)

			}
		);

		$("#menuWithArray").menu(
			{
				source: 	menuArray
			,	mustache: 	"#menu_template"
			,	dropdownFunction: dropdownFunc
			}
		)

		$("#menuWithFixtures").menu(
			{
				mustache: 	"#menu_template"
			,	source:
				{
					url:	'/menus'
				,	type:	'GET'
				}
			,	dropdownFunction: dropdownFunc
			}
		)

		$("#menuWithoutBoot").menu(
			{
				mustache: 	"#menu_template"
			,	source:
				{
					url:	'/menus'
				,	type:	'GET'
				}
			}
		)

		$("#menuWithModel").menu(
			{
				mustache: 	"#menu_template"
			,	source: 	Menu.get
			,	dropdownFunction: dropdownFunc
			}
		)
	}
)

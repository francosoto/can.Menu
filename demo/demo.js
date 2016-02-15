steal(
	'can/model'
,	'can/util/fixture'
,	'can/view/mustache'
,	'menu.js'
,	function()
	{
		var	dropdown1 =	[
				{
					tag: 	'Argentina'
				,	href: 	'#/argentina'
				,	icon: 	''
				}
			, 	{
					tag: 	'Uruguay'
				,	href: 	'#/uruguay'
				,	icon: 	''
				}
			, 	{
					tag: 	'Colombia'
				,	href: 	'#/colombia'
				,	icon: 	''
				}
			, 	{
					tag: 	'Brasil'
				,	href: 	'#/brasil'
				,	icon: 	''
				}
			]
		, 	dropdown2 =	[
				{
					tag: 	'Config'
				,	href: 	'#'
				,	icon: 	''
				}
			, 	{
					tag: 	'Config'
				,	href: 	'#'
				,	icon: 	''
				}
			, 	{
					role: 'separator'
				, 	'class':'divider'
				}
			, 	{
					tag: 	'Config'
				,	href: 	'#'
				,	icon: 	''
				}
			,	{
					role: 'separator'
				, 	'class':'divider'
				}
			, 	{
					tag: 	'Config'
				,	href: 	'#'
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
					,	href: 		'#/second_option'
					}
				,	{
						tag: 		'Countries'
					,	dropdown: 	dropdown1
					}
				]
			,	right: [
					{
						tag: 		'Fourth Option'
					,	href: 		'#/other_option'
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
					console.log(query)
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

		function dropdown($element) {
			$element.find('.dropdown-toggle')
				.dropdown()
		}

		can.stache.registerHelper(
			'dropdownLink'
		,	function(dropdown, options) {
				return 	can.isArray(dropdown)
						?	'data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"'
						: 	''
			}
		);

		can.stache.registerHelper(
			'dropdownCaret'
		,	function(dropdown, options) {
				return 	can.isArray(dropdown)
						?	'<span class="caret"></span>'
						: 	''
			}
		);

		$("#menuWithArray").menu(
			{
				source: 	menuArray
			,	mustache: 	"#menu_template"
			,	dropdownFunction: dropdown
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
			,	dropdownFunction: dropdown
			}
		)

		$("#menuWithModel").menu(
			{
				mustache: 	"#menu_template"
			,	source: 	Menu.get
			,	dropdownFunction: dropdown
			}
		)
	}
)

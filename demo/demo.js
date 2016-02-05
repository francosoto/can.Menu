steal(
	'can/model'
,	'can/util/fixture'
,	'can/view/mustache'
,	'menu.js'
,	function()
	{
		var	menuArray =	{
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
		, 	dropdown1 =	[
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

		function dropdown($element) {
			$element.find('.dropdown-toggle')
				.dropdown()
		}

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
			,	source: 	Menu
			,	dropdownFunction: dropdown
			}
		)
	}
)

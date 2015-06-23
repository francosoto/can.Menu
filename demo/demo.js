steal(
	'can/model'
,	'can/util/fixture'
,	'can/view/mustache'
,	'typeahead.js'
,	function()
	{
		// var	menuArray
		// =	[
		// 		{
		// 			tag:'Home'
		// 		,	selected: true
		// 		}
		// 	,	{
		// 			tag:'Second Option'
		// 		,	href: '#'
		// 		}
		// 	,	{
		// 			tag:'Dropdown'
		// 		,	dropdown: dropdown1
		// 		}
		// 	,	{
		// 			tag:'Fourth Option'
		// 		}
		// 	]
		var	menuArray
		=	{
				brand:
				[
					{
						tag:'Home'
					,	selected: true
					}
				]
			,	left:
				[
					{
						tag:'Second Option'
					,	href: '#'
					}
				,	{
						tag:'Dropdown'
					,	dropdown: dropdown1
					}
				]
			,	right:
				[
					{
						tag:'Fourth Option'
					}
				]
			}
		, 	dropdown1
		=	[
				'Action'
			, 	'Another action'
			, 	'Something else here'
			, 	{
					role: 'separator'
				, 	'class':'divider'
				}
			, 	'Separated link'
			,	{
					role: 'separator'
				, 	'class':'divider'
				}
			, 	'One more separated link'
			]
		
		// function filterMenu(query)
		// {
		// 	console.log(query)
		// 	return	can.map(
		// 				can.grep(
		// 					menuArray
		// 				,	function(option)
		// 					{
		// 						console.log(option)
		// 						return	option.toLowerCase().indexOf(query.toLowerCase()) != -1
		// 					}
		// 				)
		// 			,	function(option)
		// 				{
		// 					console.log(option)
		// 					return	{nombre: option}
		// 				}
		// 			)
		// }

		// can.fixture(
		// 	'POST /menus'
		// ,	function(req,res)
		// 	{
		// 		return	res(
		// 					200
		// 				,	'success'
		// 				,	filterMenu(req.data.query)
		// 				)
		// 	}
		// )

		can.fixture(
			'GET /menus'
		,	function(req,res)
			{
				return	res(
							200
						,	'success'
						// ,	filterMenu(req.data.query)
						,	menuArray
						)
			}
		)
	}
)
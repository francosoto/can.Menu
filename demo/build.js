var	stealTools
=	require('steal-tools')
console.log(__dirname)
stealTools
	.build(
		{
			main:[
				'demo'
			]
		,	config:	__dirname+'/stealconfig.js'
		}
	,	{
			minify: true
		,	debug: true
		,	quiet: false
		}
	)

const express = require('express');
const swaggerConfig = require('./config/swagger');

const { errorHandler, notFoundError } = require('./middlewares/error');
const { getAllFilesFromFolder, getFullPath, getFileExtension } = require('./utils/file')

const app = express();

swaggerConfig(app, { basedir: __dirname, filedir: './routes' })


// const swaggerUi = require('swagger-ui-express');
// const openapi = require('openapi-comment-parser');

// const spec = openapi({
// 	include: [ './test/Comments.js' ]
// });
// console.log("spec : ", spec)

// app.use('/api-docs-comments', swaggerUi.serve, swaggerUi.setup(spec));

// const openApiDocumentation = require('./test/openApiDocumentation');
// app.use('/api-doc-list', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

// const openApiDocumentationTemp = require('./test/openApiDocumentationTemp');
// app.use('/api-doc-list', swaggerUi.serve, swaggerUi.setup(openApiDocumentationTemp));


// swaggerConfig(app, { files: [ getFullPath(__dirname, './test/swaggerDoc.js') ], url: '/test-apis' })

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ limit: '50mb', extended: false, parameterLimit: 1000000 }));

// parse application/json
app.use(express.json({ limit: '50mb' }));
app.use(function (req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,token,authorization');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});

// All index route will be hanlded here
const fullPath = getFullPath(__dirname, './routes');
const files = getAllFilesFromFolder(fullPath)
	.map(e => e.replace(fullPath, ''))
	.filter(e => getFileExtension(e) == '.js');
files.forEach(file => {
	let routeName = file.replace(file.includes('/index.js') ? '/index.js' : '.js', '')
	app.use(routeName, require(`./routes/${routeName}`));
});

// send back a 404 error for any unknown api request
app.use(notFoundError);

app.use(errorHandler)

module.exports = app;
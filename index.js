const https   = require('https');
const http   = require('http');
const fs     = require('graceful-fs');

const app    = require('./app');
const config = require('./config/config');

let server;
if(fs.existsSync('certificate/test.key') && fs.existsSync('certificate/test.crt')) {
    const httpsOptions = {  key: fs.readFileSync('certificate/test.key'), cert: fs.readFileSync('certificate/test.crt') };
    server = https.createServer(httpsOptions, app);
} else {
    server = http.createServer(app);
}

server.listen(config.port, function() {
    console.log(`Server listening to the port ${config.port}`);
});
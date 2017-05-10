const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const templating = require('./templating');

const app = new Koa();

const https = require('https');

const isProduction = process.env.NODE_ENV === 'production';

const fs = require('fs');

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});


// static file support:
if (! isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

// parse request body:
app.use(bodyParser());

// add nunjucks as view:
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

// add controller:
app.use(controller());


/*https ca config file */ 
var options = {
    key: fs.readFileSync('/home/lighting/nodejs/httpsCA/214090097510805.key'),
    cert: fs.readFileSync('/home/lighting/nodejs/httpsCA/214090097510805.pem')
}


https.createServer( options, app.callback()).listen(433);


console.log('app started at port 433');

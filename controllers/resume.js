// index:
var fs = require('mz/fs');
var path = require('path');

module.exports = {
    'GET /resume': async (ctx, next) => {
         var fp = path.join(__dirname,'..','static', 'resume', 'resume.html');
        ctx.response.type = 'text/html';
        if (await fs.exists(fp)){
            ctx.response.type = 'text/html';
            // var test = await fs.readFile(fp);
            // var text = test.toString('utf8');
            ctx.response.body = await fs.readFile(fp);
        }
    }
}

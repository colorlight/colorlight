// login:

module.exports = {
    'GET /login': async (ctx, next) => {
         ctx.render('index.html', {
         title: 'Welcome'
        });
    }
}

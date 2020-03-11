const Koa = require('koa');
const app = new Koa();

module.exports.init = async function() {
  app.use(async ctx => {
    ctx.body = 'Hello World';
  });
  
  app.listen(1337);
}
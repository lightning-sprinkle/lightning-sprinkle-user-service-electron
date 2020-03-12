const Koa = require("koa");
const Router = require("koa-router");
const app = new Koa();
const router = new Router();

module.exports.init = async function() {
  router.get("/deposit", (ctx, next) => {
    ctx.body = "deposit";
    next();
  });

  app
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(28373);
};

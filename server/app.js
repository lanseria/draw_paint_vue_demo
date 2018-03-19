const Koa = require('koa');
const jsonp = require('koa-jsonp');
const app = new Koa();
const gotData = require('./gotData')

// use middleware
app.use(jsonp());

app.use(async ctx => {
  const request = ctx.request
  const res = await gotData(request.querystring)
  let returnData = {
    success: true,
    data: {
      words: res.body,
      time: Date.now()
    }
  };
  ctx.body = returnData;
})

app.listen(7999, () => {
  console.log('jsonp is starting at port 7999.');
})

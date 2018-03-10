/* eslint-disable */
var qs = require('qs');
var got = require('got');
var express = require('express');
var bodyParser = require('body-parser');

var port = 7999;
var app = express();
var apiRouters = express.Router();
app.use(bodyParser.json());

apiRouters.post('/one', function (req, res) {
  var url = 'http://www.yibizi.com/html5/hd8.php'
  console.log(req.body)
  got.post(url, {
    headers: {
      'Host': 'www.yibizi.com',
      'Connection': 'keep-alive',
      'Accept': '*/*',
      'Origin': 'http://www.yibizi.com',
      'X-Requested-With': 'XMLHttpRequest',
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1',
      'X-DevTools-Emulate-Network-Conditions-Client-Id': '(10954F5817FE8E4787E42891F4F61524)',
      'Content-Type': 'application/x-www-form-urlencoded',
      'DNT': '1',
      'Referer': 'http://www.yibizi.com/html5/',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'zh-CN,zh;q=0.9',
      'Cookie': 'bdshare_firstime=1520491425080; cck_lasttime=1520491425990; cck_count=0; netbei=1; Hm_lvt_5a01e7efb58f3593053ded683ad004fd=1520491425,1520491863; Hm_lvt_f6d4708d5f4f9ba8ecdb2dd004c2623e=1520491426,1520491864; Hm_lpvt_f6d4708d5f4f9ba8ecdb2dd004c2623e=1520491864; Hm_lpvt_5a01e7efb58f3593053ded683ad004fd=1520491916'
    },
    body: qs.stringify(req.body)
  }).then((response) => {
    console.log(response.body)
    res.send(response.body)
  }).catch(e => {
    console.log(e)
  })
})
app.use('/api', apiRouters);

module.exports = app;

app.listen(port, function () {
  console.log(`app is listening at port ${port}\nAPI转发服务已开启`);
});

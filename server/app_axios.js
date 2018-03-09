/* eslint-disable */
var qs = require('qs');
var axios = require('axios');
var express = require('express');
var bodyParser = require('body-parser');

var port = 7999;
var app = express();
var apiRouters = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));

apiRouters.post('/one', function (req, res) {
  var url = 'http://www.yibizi.com/html5/hd8.php'
  axios.post(url, qs.stringify({...req.body}), {
    headers: {
      referer: 'http://www.yibizi.com/html5/',
      'X-DevTools-Emulate-Network-Conditions-Client-Id': '(10954F5817FE8E4787E42891F4F61524)',
      'Origin': 'http://www.yibizi.com',
      'Accept': '*/*',
      'X-Requested-With': 'XMLHttpRequest',
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1',
      'Content-Type': 'application/x-www-form-urlencoded',
      'DNT': '1',
      'Cookie': 'bdshare_firstime=1520491425080; cck_lasttime=1520491425990; cck_count=0; netbei=1; Hm_lvt_5a01e7efb58f3593053ded683ad004fd=1520491425,1520491863; Hm_lvt_f6d4708d5f4f9ba8ecdb2dd004c2623e=1520491426,1520491864; Hm_lpvt_f6d4708d5f4f9ba8ecdb2dd004c2623e=1520491864; Hm_lpvt_5a01e7efb58f3593053ded683ad004fd=1520491916'
    }
  }).then((response) => {
    console.log(response);
    res.send(response.data);
    // res.send(req.query.jsonpCallback + '(' + JSON.stringify(response.data) + ')')
  }).catch(e => {
    console.log(e);
  })
})
app.use('/api', apiRouters);

module.exports = app;

app.listen(port, function () {
  console.log(`app is listening at port ${port}\nAPI转发服务已开启`);
});

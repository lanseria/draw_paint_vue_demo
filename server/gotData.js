const got = require('got');

exports = module.exports = function gotData (postData) {
  const url = 'http://www.yibizi.com/html5/hd8.php'
  return got.post(url, {
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
    body: postData
  })
}

module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        import: []
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: false
    }
  },
  configureWebpack: {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:3001/',
          changeOrigin: true,
          pathRewrite: {}
        }
      }
      //   before(app) {
      //     //中间件
      //     app.use((req, res, next) => {
      //       //检查token
      //       if (/^\/api/.test(req.path)) {
      //         //不需要验证是否登录的api请求（login及首页的请求banners和goods）
      //         const noCheckApi = ['/api/login', '/api/banners', '/api/goods'];
      //         //只校验/api开头的请求
      //         if (noCheckApi.includes(req.path) || req.headers.token) {
      //           next();
      //         } else {
      //           res.sendStatus(401); //错误状态提示用户需要登录
      //         }
      //       } else {
      //         next();
      //       }
      //     });
      //     //get方式
      //     app.get('/api/login', (req, res) => {
      //       const { username, password } = req.query;
      //       if (username === 'wxl' && password === '123') {
      //         res.json({
      //           code: 0,
      //           token: 'token header token body hash value'
      //         });
      //       } else {
      //         res.json({
      //           code: 1,
      //           message: '用户名或密码错误'
      //         });
      //       }
      //     });
      //     //post方式
      //     app.post('/api/login', (req, res) => {
      //       let body = [];
      //       req
      //         .on('data', chunk => {
      //           //接收到一部分 数据 ，chunk是Buffer数据
      //           body.push(chunk);
      //         })
      //         .on('end', () => {
      //           body = Buffer.concat(body).toString();
      //           const { username, password } = JSON.parse(body);
      //           if (username === 'wxl' && password === '123') {
      //             res.json({
      //               code: 0,
      //               token: 'token header token body hash value'
      //             });
      //           } else {
      //             res.json({
      //               code: 1,
      //               message: '用户名或密码错误'
      //             });
      //           }
      //         });
      //     });
      //     app.get('/api/logout', (req, res) => {
      //       res.json({
      //         code: -1
      //       });
      //     });
      //     app.get('/api/banners', (req, res) => {
      //       res.json({
      //         code: 0,
      //         list: [
      //           {
      //             id: 1,
      //             img:
      //               '//img11.360buyimg.com/babel/s1580x800_jfs/t1/55310/11/10658/92262/5d7a2a26Ea3d62b4f/7c7c8c94d9138f2d.jpg!q60!cc_1580x800.webp'
      //           },
      //           {
      //             id: 2,
      //             img:
      //               '//img12.360buyimg.com/babel/s1580x800_jfs/t1/80454/14/10115/170562/5d790aaaE438a88c1/c5a0f315ccc9bbe2.jpg!q60!cc_1580x800.webp'
      //           },
      //           {
      //             id: 3,
      //             img:
      //               '//img10.360buyimg.com/babel/s1580x800_jfs/t1/60942/7/9246/174045/5d6f4d41E01525161/21e8411b486656d9.jpg!q60!cc_1580x800.webp'
      //           }
      //         ]
      //       });
      //     });
      //     app.get('/api/goods', (req, res) => {
      //       res.json({
      //         code: 0,
      //         list: {
      //           dior: [
      //             {
      //               id: 1,
      //               title: '迪奥888哑光',
      //               price: 305,
      //               img:
      //                 'https://img12.360buyimg.com/n1/jfs/t1/63107/36/10869/159213/5d834233E8b0d7083/e33fe3adf6a2bdc7.jpg',
      //               count: 100
      //             },
      //             {
      //               id: 2,
      //               title: '迪奥520粉红色',
      //               price: 305,
      //               img:
      //                 'https://img13.360buyimg.com/n1/jfs/t1/44968/15/11208/142448/5d8341b8E2f88eac5/93842be76397c8ce.jpg',
      //               count: 100
      //             },
      //             {
      //               id: 3,
      //               title: '迪奥028珊瑚红',
      //               price: 305,
      //               img:
      //                 'https://img12.360buyimg.com/n1/jfs/t1/75133/24/10726/148639/5d834128Ecb4b683e/f0c724b5facca376.jpg',
      //               count: 100
      //             },
      //             {
      //               id: 4,
      //               title: '迪奥999传奇红',
      //               price: 305,
      //               img:
      //                 'https://img12.360buyimg.com/n1/jfs/t1/75133/24/10726/148639/5d834128Ecb4b683e/f0c724b5facca376.jpg',
      //               count: 100
      //             }
      //           ],
      //           chanel: [
      //             {
      //               id: 11,
      //               title: '香奈儿43珊瑚红',
      //               price: 278,
      //               img:
      //                 'https://img11.360buyimg.com/n1/jfs/t1/73779/34/693/41268/5cee1e24E1ec0ddb5/8b00f9d9afe64235.jpg',
      //               count: 100
      //             },
      //             {
      //               id: 12,
      //               title: '香奈儿52豆沙红',
      //               price: 278,
      //               img:
      //                 'https://img12.360buyimg.com/n1/jfs/t1/35389/1/13364/103857/5d1476adE53877034/30614a01b0d5aa67.jpg',
      //               count: 100
      //             },
      //             {
      //               id: 13,
      //               title: '香奈儿99正红色',
      //               price: 278,
      //               img:
      //                 'https://img12.360buyimg.com/n1/jfs/t1/42637/7/8417/98444/5d1eb36aEd3ca32f5/50375fb15242f8c3.jpg',
      //               count: 100
      //             },
      //             {
      //               id: 14,
      //               title: '香奈儿96亮橘色',
      //               price: 278,
      //               img:
      //                 'https://img12.360buyimg.com/n1/jfs/t1/66080/26/2999/104102/5d147738E947dbbf4/8bef388d2dea3095.jpg',
      //               count: 100
      //             }
      //           ],
      //           armani: [
      //             {
      //               id: 21,
      //               title: '阿玛尼405蕃茄红',
      //               price: 278,
      //               img:
      //                 'https://img13.360buyimg.com/n1/jfs/t1/54577/1/10007/71536/5d71b99eE5713a379/8d66538a76f58635.jpg',
      //               count: 100
      //             },
      //             {
      //               id: 22,
      //               title: '阿玛尼200红棕色',
      //               price: 278,
      //               img:
      //                 'https://img14.360buyimg.com/n1/jfs/t1/74992/28/9090/70977/5d71ba40Ee336e205/4a9c5458e4b4c9b2.jpg',
      //               count: 100
      //             },
      //             {
      //               id: 23,
      //               title: '阿玛尼401橘红色',
      //               price: 278,
      //               img:
      //                 'https://img14.360buyimg.com/n1/jfs/t29008/99/1382800313/39473/74c2a01c/5cdec79bN1321f238.jpg',
      //               count: 100
      //             },
      //             {
      //               id: 24,
      //               title: '阿玛尼500豆沙色',
      //               price: 278,
      //               img:
      //                 'https://img13.360buyimg.com/n1/jfs/t29149/205/1430370744/40584/ee9254be/5cdeca9aNb67d98b9.jpg',
      //               count: 100
      //             }
      //           ],
      //           ysl: [
      //             {
      //               id: 31,
      //               title: '圣罗兰1正红色',
      //               price: 320,
      //               img:
      //                 'https://img14.360buyimg.com/n1/jfs/t7198/163/412206933/160938/e18b1d4f/598031abN1c831ffa.jpg',
      //               count: 100
      //             },
      //             {
      //               id: 32,
      //               title: '圣罗兰17嫣粉色',
      //               price: 320,
      //               img:
      //                 'https://img14.360buyimg.com/n1/jfs/t15070/261/2632741975/142443/207f5c46/5aaf62feN34159e80.jpg',
      //               count: 100
      //             },
      //             {
      //               id: 33,
      //               title: '圣罗兰52星星色',
      //               price: 320,
      //               img:
      //                 'https://img11.360buyimg.com/n1/jfs/t6034/22/7629492554/154114/7b075f83/598033beN59973534.jpg',
      //               count: 100
      //             },
      //             {
      //               id: 34,
      //               title: '圣罗兰57裸唇色',
      //               price: 320,
      //               img:
      //                 'https://img10.360buyimg.com/n1/jfs/t18424/91/2440264546/120539/cd099ee3/5af39e1aN8bd37dfc.jpg',
      //               count: 100
      //             }
      //           ]
      //         },
      //         keys: ['dior', 'armani', 'chanel', 'ysl']
      //       });
      //     });
      //   }
    }
  }
};

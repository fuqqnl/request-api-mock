/**
 * @file 模拟api请求中间件
 * @author fuqqnl
 * @param {string} relativePath mock目录地址
 * 用法：
 *  请求api的路径与mock目录的路径要相同。比如请求的api是: api/work/getList,那么与之对应的目录是mock/api/work/getList.json
 *
 */
 var path = require('path');

 module.exports = function(relativePath) {
    return function (req, res, next) {
        const moduleName = req.path.replace(/(\/|\\)$/i, '');
        const mockPath = path.resolve(__dirname, relativePath);
        try {
            const proxy = require.resolve(mockPath + moduleName);
            try {
                const api = require(proxy);
                delete require.cache[proxy];
                if (typeof api === 'function') {
                    Promise.resolve(api(req, res, next))
                    .then(data => {
                        response(data);
                    })
                    .catch(err => {
                        console.error(`Function api: ${req.path} error ${err}`);
                        next();
                    })
                }
                else {
                    response(api);
                }
            } catch(e) {
                console.warn(`get mock path error: ${proxy}, please check this path!`);
                next();
            }
        } catch(err) {
            console.warn('request path error, please check it');
            next();
        }

        function response(data) {
            if (data.fallback) {
                return next();
            }
            return res.json({
                from: 'mock',
                ts: +new Date(),
                ...data
            });
        }
    }
 };


 

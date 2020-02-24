let express = require('express')
let app = express();
let whiteList = ['http://localhost:3000']
app.use(function (req, res, next) {
    let origin = req.headers.origin;
    if (whiteList.includes(origin)) {
        //设置哪个源可以访问我
        res.setHeader('Access-Control-Allow-Origin', origin)
        //准许携带哪个头访问我
        res.setHeader('Access-Control-Allow-Headers', 'name')
        res.setHeader('Access-Control-Allow-Methods', 'PUT')
        //准许携带cookie
        res.setHeader('Access-Control-Allow-withCredentials', true)
        //预检的存活时间
        res.setHeader('Access-Control-Max-Age', 6);
        //允许返回的头
        res.setHeader('Access-Control-Expose-Headers', 'name');
        if(req.method === 'OPTIONS'){
            res.end()
        }
    }
    next()
})
app.get('/getData', function (req, res) {
    console.log(req.headers)
    res.end('i love you')
})
app.use(express.static(__dirname))
app.listen('4000')
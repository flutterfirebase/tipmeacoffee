const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

const requestIp = require('request-ip');
const RateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

const main = require('./src/routes/main');
const post = require('./src/routes/post');
const accountRouter = require('./src/routes/accounts')
const publish = require('./src/routes/publish')
const app = express();

app.use(requestIp.mw());
var limiter = RateLimit({windowMs: 1*60*1000,max: 18,message:'Too many requests'});
app.use(limiter);
app.use(mongoSanitize());

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/uploads', express.static(__dirname + 'public/uploads'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }))
app.use(fileUpload());

app.set('views', './src/views')
app.set('view engine', 'ejs')
app.use(cookieParser())

app.use('/post/:name/:link', post.page);
app.use('/sharelinks',publish.share)
app.use('/postlinks',publish.post)
app.use('/loginuser',accountRouter.login)
app.use('/logout',accountRouter.logout)
app.use('/signup',accountRouter.signup)
app.use('/keygen',accountRouter.keygen)
app.use('/verify/:token',accountRouter.verify)
app.use('', main)

module.exports = app;
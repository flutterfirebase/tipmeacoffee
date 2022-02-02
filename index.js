var express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const main = require('./src/routes/main');
const post = require('./src/routes/post');
const accountRouter = require('./src/routes/accounts')

const app = express();

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))
app.use('/js', express.static(__dirname + 'public/js'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }))

app.set('views', './src/views')
app.set('view engine', 'ejs')
app.use(cookieParser())

app.use('/post/:name/:link', post.page);
app.use('/loginuser',accountRouter.login)
app.use('/logout',accountRouter.logout)
app.use('/signup',accountRouter.signup)
app.use('/keygen',accountRouter.keygen)
app.use('/verify/:token',accountRouter.verify)
app.use('', main)

module.exports = app;
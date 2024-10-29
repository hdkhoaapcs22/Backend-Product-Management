const express = require('express')
const route = require('./routes/client/index_route');
const routeAdmin = require('./routes/admin/index_route');
const database = require('./config/database');
const systemConfig = require('./config/system');
const  methodOverride = require('method-override');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');

require('dotenv').config()

const app = express()
const port = process.env.PORT
app.locals.prefixAdmin = systemConfig.prefixAdmin;
database.connect();


app.set('views', './views')
app.set('view engine', 'pug')
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

// route
route(app);
routeAdmin(app);

app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`)
}) 

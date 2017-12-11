'use strict';

/** Imports */
const express =  require('express');
const app = express();
const ip = require('ip');
const path = require('path');
/** end Imports */

/** Variables */
var port = process.env.PORT || 3355;
/** end Variables */

/** ExpressJS block */
var server = app.listen(port, function(){
    console.log(`listening at port : ${port}`);
    // console.log(ip.address());
});
/** end ExpressJS block */

/** Register Static Routes */
app.use(express.static(path.join(__dirname, '../public')));
app.use('/css', express.static(path.join(__dirname, '../public/css')));
app.use('/js', express.static(path.join(__dirname, '../public/js')));
app.use('/jquery', express.static(path.join(__dirname, '../node_modules/jquery/dist')));
/** end Static Routes */

/** Routes */
require('./server/scripts/socketio')(server);
/** end Routes */

const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const bodyparser = require('koa-bodyparser');
const onerror = require('koa-onerror');
const logger = require('koa-logger');

const index = require('./routes/index')

onerror(app);
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json());
app.use(logger());

// routes
app.use(index.routes(), index.allowedMethods())

module.exports = app
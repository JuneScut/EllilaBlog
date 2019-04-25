const ArticleController = require('../controllers/Article');
const CategoryController = require("../controllers/Category");
const Router = require('koa-router');

const router = Router({
    prefix: '/api/v1'
});

// 创建文章接口（路由）
router.post('/article', ArticleController.create);
// 获取文章详情接口（路由）
router.get('/article/:id', ArticleController.detail);


// 创建分类借口
router.post('/category', CategoryController.create);

module.exports = router;
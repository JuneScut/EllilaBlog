const ArticleModel = require('../models/ArticleModel');
const CategoryModel = require('../models/CategoryModel');

class Article {
    /**
     * 创建文章
     * @params ctx title 文章标题
     * @params ctx author 文章作者
     * @params ctx categoryId 文章分类Id
     * @params ctx introduction 文章简介
     * @params ctx tag 文章标签
     * @params ctx cover 文章封面
     * @params ctx content 文章内容
     * 
     * @return 成功创建的话返回文章详情，否则返回错误信息
     */
    static async create(ctx){
        let {title, author, categoryId, introduction, tag, cover, content} = ctx.request.body;
        let params = {title, author, categoryId, introduction, tag, cover, content};
        // 检查参数是否为空
        let errors = [];
        for(let item in params){
            if(params[item] === undefined){
                let index = errors.length + 1;
                errors.push("错误"+ index + ': ' + "参数" + item + "不能为空");
            }
        }
        if(errors.length>0){
            ctx.response.status = 422;
            ctx.body = {
                code: 422,
                message: errors
            }
        }

        // 检查分类是否存在
        try {
            let detail = await CategoryModel.detail(categoryId);
            if(!detail){
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    message: `分类ID${categoryId}不存在!`
                }
                return false;
            }
            // 创建文章
            let {id} = await ArticleModel.create(params);
            let data = await ArticleModel.detail(id);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: '创建成功',
                data
            }
        } catch (err){
            ctx.response.data = 500;
            ctx.body = {
                code: 500,
                message: '创建文章失败',
                data: err
            }
        }
    }
    /**
     * 获取文章列表 get
     * @params ctx 
     * 
     * @returns 文章列表数据
     */
    static async list(ctx){
        // query 获取解析的查询字符串, 当没有查询字符串时，返回一个空对象
        let params = ctx.query;
        try{
            let ret = await ArticleModel.list(params);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: '查询文章列表成功',
                data:ret
            }
        } catch(err){
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: '查询文章列表失败',
                data: err
            }
        }
    }

    /**
     * 查询文章详情
     * @params ctx id
     * @returns 文章详情
     */
    static async detail(ctx){
        let id = parseInt(ctx.params.id);
        if(!id){
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                message: '查询文章传入Id为空'
            }
            return false;
        }
        if(isNaN(id)){
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                message: '查询文章传入Id为空'
            }
            return false;
        }
        try {
            let data = await ArticleModel.detail(id);
            if(data !== null){
                let browser = data.browser+1;
                await ArticleModel.update(id, {
                    browser
                })
            }
            
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: '查询文章详情成功',
                data: data
            }
        } catch (err){
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: '查询文章详情失败',
                data: err
            }
            return false;
        }
    }
}
module.exports = Article;
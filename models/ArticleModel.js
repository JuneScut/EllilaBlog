const db = require('../config/db');
const Sequelize = db.sequelize;
const Op = Sequelize.Op;

const Article = Sequelize.import('../schema/article');
const Category = Sequelize.import('../schema/category');


Category.hasMany(Article); //// 将会添加 categoryId 到 ArticleModel 模型
Article.belongsTo(Category, {foreignKey:'categoryId'});
Article.sync({force: false}) //If force is true, each Model will run DROP TABLE IF EXISTS, before it tries to create its own table

class ArticleModel {
    /**
     * 创建文章
     * @params data 创建文章的参数
     * @return {Promise<void>}
     */
    static async create(data){
        return await Article.create(data);
    }
    /**
     * 更新文章
     * @params id 文章的id
     * @params data 文章更新需要的属性参数
     * @return {Promise<void>}
     */
    static async update(id, data){
        return await Article.update(data,{
            where: {
                id: id
            },
            fields: ['title', 'browser', 'author', 'introduction', 'categoryId', 'is_del', 'tag', 'cover', 'content']
        })
    }
      /**
     * 搜索文章
     * @params keyword 关键字
     * @return data文章标题匹配的文章列表数据
     */
    static async search(params) {
        let {page=1, keyword} = params;
        // findAndCountAll
        // return  Promise<{count: number, rows: Model[]}>
        let ret = await Article.findAndCountAll({
            limit: 10,
            offset: (page-1)*10,
            where: {
                title: {
                    // 模糊查询
                    [Op.like]: '%'+keyword+'%'
                }
            },
            include: {
                model: Category,
                where: {
                    // public static col(col: string): col
                    // Creates an object which represents a column in the DB, this allows referencing another column in your query. 
                    CategoryId: Sequelize.col('article.categoryId')
                }
            },
            'order': [
                ['id', 'DESC']
            ],
            attributes: {
                exclude: ['content']
            }
        });
        return {
            code: 200,
            data: ret.rows,
            meta: {
                current_page: parseInt(page),
                per_page: 10,
                count: ret.count,
                total: ret.count,
                total_page: Math.ceil(ret.count/10)
            }
        }
    }

     /**
     * 获取文章列表
     * @params 
     * @return {Promise<*>}
     */
    static async list(params) {
        let ret = null;
        let {page, category_id, title} = params;
        if(category_id){
            ret = await Article.findAndCountAll({
                limit: 10,
                offset: (page-1)*10,
                where: {
                    categoryId: category_id
                },
                include: [{
                    model: Category,
                    where: {
                        categoryId: Sequelize.col('article.categoryId')
                    }
                }],
                order: ['id', 'DESC']
            })
        } else if (title){
            ret = await Article.findAndCountAll({
                limit: 10,
                offset: (page-1)*10,
                where: {
                    title: title
                },
                include: [{
                    model: Category,
                    where: {
                        categoryId: Sequelize.col('article.categoryId')
                    }
                }],
                order: ['id', 'DESC']
            })
        } else {
            ret = await Article.findAndCountAll({
                limit: 10,
                offset: (page-1)*10,
                include: [{
                    model: Category,
                    where: {
                        categoryId: Sequelize.col('article.categoryId')
                    }
                }],
                order: ['id', 'DESC']
            })
        }
        return {
            code: 200,
            data: ret.rows,
            meta: {
                current_page: parseInt(page),
                per_page: 10,
                count: ret.count,
                total: ret.count,
                total_page: Math.ceil(ret.count/10)
            }
        }
    }


      /**
     * 获取文章详情
     * @params id 文章id
     * @return {Promise<Model>}
     */
    static async detail(id){
        let ret = await Article.findOne({
            where: {
                id
            },
            include: [{
                model: Category,
                where: {
                    categoryId: Sequelize.col('article.categoryId')
                }
            }]
        })
        return ret;
    }

}
module.exports = ArticleModel;
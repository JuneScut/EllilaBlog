const db = require('../config/db');
const Sequelize = db.sequelize;
const Article = Sequelize.import('../schema/article');
const Category = Sequelize.import('../schema/category');

Category.sync({force: false});

class CategoryModel {
    /**
     * 创建分类
     * @params data 创建分类的参数
     * @return {Promise<void>}
     */
    static async create(data){
        return await Category.create(data);
    }
    /**
     * 更新分类数据
     * @params id 分类ID
     * @params data 分类更改的属性
     * @return {Promise<Boolean>}
     */
    static async update(id, data){
        await Category.update(data, {
            where: {
                id
            },
            fields: ['name', 'parent_id', 'icon']
        });
        return true;
    }
    /**
     * 获取分类列表
     * @return {Promise<*>}
     */
    static async list(){
        return await Category.findAll({
            attributes: ['id', 'name', 'parent_id', 'icon']
        })
    }
    /**
     * 查询分类Id下的所有文章
     * @params id 分类ID
     * @return {Promise<*>}
     */
    static async article(id){
        return await Category.findAll({
            where: {
                id
            },
            include: [{
                model: Article
            }]
        })
    }
    /**
     * 获取分类详情数据
     * @params id 分类Id
     * @return {Promise<Model>}
     */
    static async detail(id){
        return await Category.findOne({
            where: {
                id
            }
        })
    }
    /**
     * 删除分类
     * @params id 分类Id
     * @return {Promise<Boolean>}
     */
    static async delete(id){
        await Category.destroy({
            where: {
                id
            }
        })
    }

}

module.exports = CategoryModel;
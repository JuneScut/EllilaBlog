const CategoryModel = require('../models/CategoryModel');

class Category {
    /**
     * 创建分类
     * @params ctx name 
     * @params ctx icon 图标
     * @params ctx parent_id 父分类ID
     */
    static async create (ctx){
        let {name, icon, parent_id} = ctx.request.body;
        let params = {name, icon, parent_id};
        params.parent_id = parent_id || 0;
        // 检测参数是否为空
        let errors = [];
        for (let item in params){
            if(params[item] === undefined){
                let index = errors.length + 1;
                errors.push("错误"+index+"参数"+item+"不能为空");
            }
        }
        if(errors.length>0){
            ctx.response.status = 412;
            ctx.response.body = {
                code: 412,
                message: errors
            }
            return false;
        }
        try {
            params.parent_id = parent_id || 0;
            let {id} = await CategoryModel.create(params);
            let data = await CategoryModel.detail(id);

            ctx.response.status = 200;
            ctx.response.body = {
                code: 200,
                message: '创建分类成功',
                data
            }
        } catch (err) {
            ctx.response.status = 500;
            ctx.response.body = {
                code: 500,
                message: '创建分类失败',
                err
            }
        }
    }
}
module.exports = Category;
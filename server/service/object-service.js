const ObjModel = require('../models/obj-model')

class ObjectService{
    async createOld(obj){
        try{
            const createdObj = Obj.create(obj)
            return createdObj
        }catch(e){
            res.status(500).json(e)
        }
    }

    async create(id, body){
        try {
            const obj = await ObjModel.findOne({userId: id})
            if(!obj){
                const createdObj = ObjModel.create(
                    {
                        userId: id,
                        objects: [body]
                    }
                )
                return createdObj
            }
            obj.objects.push(body)
            const objects = await ObjModel.findOneAndUpdate({userId: id}, obj)
            return objects
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAllOld(){
        const objects = await Obj.find()
        return objects
    }

    async getAll(id){
        const objects = await ObjModel.findOne({userId: id})
        return objects.objects
    }

    async getOne(id){
        const obj = await Obj.findById(id)
        return obj
    }

    async deleteOld(id){
        const obj = await Obj.findByIdAndDelete(id)
        return obj
    }

    async update(id, body){
        try {
            const obj = await ObjModel.findOne({userId: id})
            obj.objects = body
            const objects = await ObjModel.findOneAndUpdate({userId: id}, obj)
            return objects
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async updateOld(obj){
        const updatedObj = await Obj.findByIdAndUpdate(obj._id, obj, {new: true})
        return updatedObj
    }
}

module.exports = new ObjectService()
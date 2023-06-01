const ObjModel = require('../models/obj-model')
const ObjectService = require('../service/object-service')

class ObjectController{
    async createOld(req, res){
        try{
            const obj = await ObjectService.create(req.body)
            res.json(obj)
        }catch(e){
            res.status(500).json(e)
        }
    }

    //Add new object
    async create(req, res){
        try {
            const obj = await ObjectService.create(req.params.id, req.body)
            res.json(obj)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAllOld(req,res){
        try {
            const objects = await ObjectService.getAll()
            return res.json(objects)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res){
        try {
            const objects = await ObjModel.findOne({userId: req.params.id})
            if(!objects){
                return res.json([])
            }
            return res.json(objects.objects)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getOne(req,res){
        try {
            const obj = await ObjectService.getOne(req.params.id)
            res.json(obj)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async deleteOld(req,res){
        try {
            const obj = await ObjectService.delete(req.params.id)
            return res.json(obj)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async update(req,res){
        try {
            const obj = await ObjectService.update(req.params.id, req.body)
            return res.json(obj)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async updateOld(req,res){
        try {
            const updatedObj = await ObjectService.update(req.body)
            return res.json(updatedObj)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

module.exports = new ObjectController
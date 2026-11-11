const {Room}= require('../models');

const createRoom=async (req,res)=>{
    try{
        const {name,description,price,guest,bedRoom,bath,locationId,image}=req.body;
        const newRoom=await Room.create({name,description,price,guest,bedRoom,bath,locationId,image});
        res.status(201).json(newRoom);
    }catch(err){
        res.status(500).json({error:'Lỗi khi tạo phòng', details: err.message});
    }
}

const getAllRooms=async (req,res)=>{
    try{
        const rooms=await Room.findAll();
        res.status(200).json(rooms);
    }catch(err){
        res.status(500).json({error:'Lỗi khi lấy danh sách phòng', details: err.message});
    }
}

const getRoomById=async (req,res)=>{
    try{
        const {id}=req.params;
        const room=await Room.findByPk(id);
        if(!room){
            return res.status(404).json({error:'Phòng không tồn tại'});
        }
        res.status(200).json(room);
    }catch(err){
        res.status(500).json({error:'Lỗi khi lấy thông tin phòng', details: err.message});
    }
}

const updateRoom=async (req,res)=>{
    try{
        const {id}=req.params;
        const {name,description,price,guest,bedRoom,bath,locationId,image}=req.body;
        const room=await Room.findByPk(id);
        if(!room){
            return res.status(404).json({error:'Phòng không tồn tại'});
        }
        await room.update({name,description,price,guest,bedRoom,bath,locationId,image});
        res.status(200).json(room);
    }catch(err){
        res.status(500).json({error:'Lỗi khi cập nhật thông tin phòng', details: err.message});
    }
}

const deleteRoom=async (req,res)=>{
    try{
        const {id}=req.params;
        const room=await Room.findByPk(id);
        if(!room){
            return res.status(404).json({error:'Phòng không tồn tại'});
        }  
        await room.destroy();
        res.status(200).json({message:'Phòng đã được xóa thành công'});
    }catch(err){
        res.status(500).json({error:'Lỗi khi xóa phòng', details: err.message});
    }
}

module.exports={
    createRoom,
    getAllRooms,
    getRoomById,
    updateRoom,
    deleteRoom
}
const {Room}= require('../models');

// 1. Hàm tạo phòng mới
const createRoom = async (req, res) => {
  try {
    // Lấy link ảnh từ Cloudinary (nếu có upload)
    const image = req.file ? req.file.path : "";

    // Gộp toàn bộ trường text từ req.body kèm link ảnh thật
    const newRoom = await Room.create({
      ...req.body,
      image,
    });

    res.status(201).json(newRoom);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi tạo phòng", error: error.message });
  }
};

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

// 2. Hàm cập nhật phòng (giữ nguyên ảnh cũ nếu không gửi ảnh mới)
const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findByPk(id);

    if (!room) {
      return res.status(404).json({ message: "Không tìm thấy phòng!" });
    }

    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = req.file.path; // Chỉ ghi đè link ảnh nếu có upload file mới
    }

    await room.update(updateData);
    res.status(200).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi cập nhật phòng", error: error.message });
  }
};
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
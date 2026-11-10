const {User} = require('../models');

//1 tạo người dùng mới
const createUser=async (req, res) => {
    try{
        const {name,email,password,phone, birthday, gender,type,address} = req.body;
        const newUser = await User.create({name,email,password,phone, birthday, gender,type,address});
        res.status(201).json(newUser);
    }catch(err){
        res.status(500).json({error: 'Lỗi khi tạo người dùng', details: err.message});
    }
}

//2.lay danh sach nguoi dung (co phan trang)
const getPaginationUsers=async (req, res) => {
    try{
        const {skip=0, limit=10} = req.query;
        const users = await User.findAll({
            offset: Number(skip),
            limit: Number(limit)
        });
        res.status(200).json(users);
    }catch(err){
        res.status(500).json({error: 'Lỗi khi lấy danh sách người dùng', details: err.message});
    }
}

//3. lay chi tiet 1 nguoi dung theo id
const getUserById=async (req, res) => {
    try{
        const {id} = req.params;
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({error: 'Người dùng không tồn tại'});   
        }
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({error: 'Lỗi khi lấy chi tiết người dùng', details: err.message});
    }
}

//4. cap nhat nguoi dung
const updateUser=async (req, res) => {
    try{
        const {id} = req.params;
        const {name,email,password,phone, birthday, gender,type,address} = req.body;
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({error: 'Người dùng không tồn tại'});   
        }
        await user.update({name,email,password,phone, birthday, gender,type,address});
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({error: 'Lỗi khi cập nhật người dùng', details: err.message});
    }
}
//5. xoa nguoi dung
const deleteUser=async (req, res) => {
    try{
        const {id} = req.params;
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({error: 'Người dùng không tồn tại'});
        }
        await user.destroy();
        res.status(200).json({message: 'Người dùng đã được xóa thành công'});
    }catch(err){
        res.status(500).json({error: 'Lỗi khi xóa người dùng', details: err.message});
    }
}

module.exports = {
    createUser,
    getPaginationUsers,
    getUserById,
    updateUser,
    deleteUser
}
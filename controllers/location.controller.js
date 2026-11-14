const {
    Location
} = require('../models');

const createLocation = async (req, res) => {
    try {
        // 1. Nhận các thông tin text bình thường
        const {
            name,
            province,
            country,
            valueate
        } = req.body;

        // 2. Lấy đường link ảnh đã được tải lên mây (nếu có)
        const image = req.file ? req.file.path : "";

        // 3. Lưu vào Database
        const newLocation = await Location.create({
            name,
            province,
            country,
            valueate,
            image
        });
        res.status(201).json(newLocation);
    } catch (err) {
        res.status(500).json({
            error: 'Lỗi khi tạo địa điểm',
            details: err.message
        });
    }
}

const getAllLocations = async (req, res) => {
    try {
        const locations = await Location.findAll();
        res.status(200).json(locations);
    } catch (err) {
        res.status(500).json({
            error: 'Lỗi khi lấy danh sách địa điểm',
            details: err.message
        });
    }
}

const getLocationById = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const location = await Location.findByPk(id);
        if (!location) {
            return res.status(404).json({
                error: 'Địa điểm không tồn tại'
            });
        }
        res.status(200).json(location);
    } catch (err) {
        res.status(500).json({
            error: 'Lỗi khi lấy thông tin địa điểm',
            details: err.message
        });
    }
}

const updateLocation = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            name,
            province,
            country,
            valueate,
            image
        } = req.body;
        const location = await Location.findByPk(id);
        if (!location) {
            return res.status(404).json({
                error: 'Địa điểm không tồn tại'
            });
        }
        await location.update({
            name,
            province,
            country,
            valueate,
            image
        });
        res.status(200).json(location);
    } catch (err) {
        res.status(500).json({
            error: 'Lỗi khi cập nhật địa điểm',
            details: err.message
        });
    }
}

const deleteLocation = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const location = await Location.findByPk(id);
        if (!location) {
            return res.status(404).json({
                error: 'Địa điểm không tồn tại'
            });
        }
        await location.destroy();
        res.status(200).json({
            message: 'Địa điểm đã được xóa thành công'
        });
    } catch (err) {
        res.status(500).json({
            error: 'Lỗi khi xóa địa điểm',
            details: err.message
        });
    }
}

module.exports = {
    createLocation,
    getAllLocations,
    getLocationById,
    updateLocation,
    deleteLocation
}
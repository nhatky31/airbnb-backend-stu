const express = require('express');
const {
createLocation, getAllLocations, getLocationById, updateLocation, deleteLocation} = require('../controllers/location.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

const uploadCloud= require('../middlewares/upload.middleware');
const locationRouter = express.Router();

locationRouter.post('/', authenticate, authorize(['ADMIN']), uploadCloud.single('image'), createLocation);
locationRouter.get('/', getAllLocations);
locationRouter.get('/:id', getLocationById);
locationRouter.put('/:id', authenticate, authorize(['ADMIN']), updateLocation);
locationRouter.delete('/:id', authenticate, authorize(['ADMIN']), deleteLocation);


module.exports = locationRouter;
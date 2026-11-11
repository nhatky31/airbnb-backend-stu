const express = require('express');
const {
createLocation, getAllLocations, getLocationById, updateLocation, deleteLocation} = require('../controllers/location.controller');

const locationRouter = express.Router();

locationRouter.post('/', createLocation);
locationRouter.get('/', getAllLocations);
locationRouter.get('/:id', getLocationById);
locationRouter.put('/:id', updateLocation);
locationRouter.delete('/:id', deleteLocation);


module.exports = locationRouter;
const express= require('express');
const {createUser,getPaginationUsers,getUserById,updateUser,deleteUser} = require('../controllers/user.controller');
const userRouter = express.Router();

userRouter.post('/', createUser); // POST /api/users
userRouter.get('/', getPaginationUsers); // GET /api/users
userRouter.get('/:id', getUserById); // GET /api/users/:id
userRouter.put('/:id', updateUser); // PUT /api/users/:id
userRouter.delete('/:id', deleteUser); // DELETE /api/users/:id

module.exports = userRouter;
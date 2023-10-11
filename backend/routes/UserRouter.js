import express from 'express';
import { LikedMovies, addLikedMOvies, changeUserPassword, deleteLikedMovies, deleteUser, deleteUserProfile, getUsers, loginUser, registerUser, updateUserProfile, loginUserAdmin } from '../controllers/userController.js';
import { protect, admin } from '../middleware/Auth.js';

const router = express.Router();

router.post("/", registerUser)
router.post("/login", loginUser)

router.post("/loginadmin", loginUserAdmin)

//route protejée

router.get("/", protect, admin, getUsers);

router.put("/", protect, updateUserProfile)

router.delete("/", protect, deleteUserProfile)

router.put("/password", protect, changeUserPassword)

router.get("/favorites", protect, LikedMovies)

router.post("/favorites", protect, addLikedMOvies)

router.delete("/favorites", protect, deleteLikedMovies)

router.delete("/:id", protect, deleteUser);

export default router
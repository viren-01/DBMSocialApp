import express from "express";
import indexController from '../controllers/index';

const router = express.Router();

router.post('/createUser', indexController.createUser);
router.post('/getAllPosts',indexController.getAllPosts)
router.post('/login', indexController.login)
router.post('/getUserById', indexController.getUserById)
router.post('/updateLikes', indexController.updateLikes)
router.post('/createPost', indexController.createPost);

export = router;
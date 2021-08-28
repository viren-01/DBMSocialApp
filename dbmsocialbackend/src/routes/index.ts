import express from "express";
import indexController from '../controllers/index';

const router = express.Router();

router.post('/createUser', indexController.createUser);
router.post('/getAllPosts',indexController.getAllPosts)

export = router;
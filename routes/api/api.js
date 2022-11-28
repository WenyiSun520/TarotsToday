import express from 'express'
var router = express.Router()

// import routers from controllers
import readingRouter from "./controllers/readings.js"
import userRouter from "./controllers/users.js";

router.use('/readings', readingRouter);
router.use('/users', userRouter);

export default router



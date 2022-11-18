import express from 'express'
var router = express.Router()

// import routers from controllers
import readingRouter from "./controllers/readings.js"
import userRouter from "./controllers/users.js";
//import cardRouter from "./controllers/card.js"

router.use('/readings', readingRouter);
router.use('/users', userRouter);
//router.use('/card', cardRouter)

export default router



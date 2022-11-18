import express from 'express'
var router = express.Router()

// import routers from controllers
import readingRouter from "./controllers/readings.js"
import userRouter from "./controllers/users.js";
<<<<<<< HEAD
import cardRouter from "./controllers/card.js"

router.use('/readings', readingRouter);
router.use('/users', userRouter);
router.use('/card', cardRouter)
=======
//import cardRouter from "./controllers/card.js"

router.use('/readings', readingRouter);
router.use('/users', userRouter);
//router.use('/card', cardRouter)
>>>>>>> 344d84126123fcca3d6a952878181aa9fd7a246c

export default router



import express from 'express'
var router = express.Router()

// import routers from controllers
import readingRouter from "./controllers/readings.js"
import userRouter from "./controllers/users.js";
import publicEntryRouter from './controllers/publicEntry.js'

router.use('/readings', readingRouter);
router.use('/users', userRouter);
router.use('/forum', publicEntryRouter);

export default router



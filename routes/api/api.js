import express from 'express'
var router = express.Router()

// import routers from controllers
import readingRouter from "./controllers/readings.js"

router.use('/readings', readingRouter)

export default router



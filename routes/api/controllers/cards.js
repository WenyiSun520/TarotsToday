import express from "express";
var router = express.Router();

router.get("/", async (req, res) => {
    let randNum = Math.floor(Math.random() * 77);
    let oneCard = await req.models.TarotCard.findOne({ id: randNum });

    res.send(oneCard)
})

export default router;
import mongoose from 'mongoose'

let models = {}

main()
async function main(){
    console.log('connecting to mongodb')

    await mongoose.connect('mongodb+srv://WenyiEmiriGisele:WenyiEmiriGisele@tarottoday.vrffuyq.mongodb.net/data?retryWrites=true&w=majority')

    console.log("successfully connected to mongodb!")

    const tarotCardSchema = new mongoose.Schema({
        name: String,
        id: Number,
        number: String,
        arcana: String,
        suit: String,
        img: String,
        description: String
    })
    
    models.TarotCard = mongoose.model('TarotCard', tarotCardSchema)

    const userSchema = new mongoose.Schema({
        username: String,
        drawnCard : [{
            card_id : Number,
            date: Date
        }]
    })
    models.Users = mongoose.model("Users", userSchema);

    console.log('mongoose models created')
}

export default models
import mongoose from 'mongoose'

let models = {}

main()
async function main(){
  console.log('connecting to mongodb')

  await mongoose.connect('mongodb+srv://WenyiEmiriGisele:WenyiEmiriGisele@tarottoday.vrffuyq.mongodb.net/data?retryWrites=true&w=majority')

  console.log("successfully connected to mongodb!")

  // WE MIGHT NOT NEED USERSCHEMA IF WE USE req.sessions.account.username
  // const userSchema = new mongoose.Schema({
  //   username: String,
  //   // drawnCard: [
  //   //   {
  //   //     card_id: Number,
  //   //     created_date: Date,
  //   //   },
  //   // ],
  // });
  // models.Users = mongoose.model("Users", userSchema);

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

  // const journalEntrySchema = new mongoose.Schema({
  //   username: String, // username of the user who pulled the reading
  //   tarot_reading: {type: mongoose.Schema.Types.ObjectId, ref: "Reading"}
  // })
  // models.JournalEntry = mongoose.model("JournalEntry", journalEntrySchema);

  const userSchema = new mongoose.Schema({
      username: String,
      readings: [{
        typeOfReading: String,
        cards: [String], // array of card ids
        journalEntry: String, // journal entry associated with the reading
        date: Date
      }]
  })
  models.Users = mongoose.model("Users", userSchema);

  console.log('mongoose models created')
}

export default models



 
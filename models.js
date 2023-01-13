import mongoose from 'mongoose'

let models = {}

main()
async function main(){
  // Connect to mongodb
  console.log("connecting to mongodb");

  await mongoose.connect(
    "mongodb+srv://WenyiEmiriGisele:WenyiEmiriGisele@tarottoday.vrffuyq.mongodb.net/data?retryWrites=true&w=majority"
  );

  console.log("successfully connected to mongodb!");

  // Tarot cards
  const tarotCardSchema = new mongoose.Schema({
    name: String,
    id: Number,
    number: String,
    arcana: String,
    suit: String,
    img: String,
    description: String,
  });
  models.TarotCard = mongoose.model("TarotCard", tarotCardSchema);

  // Users - includes readings
  const userSchema = new mongoose.Schema({
    username: String,
    readings: [
      {
        typeOfReading: String,
        cards: [String], // array of card ids
        journalEntry: String, // journal entry associated with the reading
        date: Date,
      },
    ],
  });
  models.Users = mongoose.model("Users", userSchema);
  // Public Entry 
  const publicEntrySchema = new mongoose.Schema({
    username: String,
    title: String,
    description: String,
    content: { type: mongoose.Schema.Types.ObjectId, ref: "readings" },
    like: [String],
    dislike: [String],
    created_date:Date
  });
  models.PublicEntry = mongoose.model("PublicEntry", publicEntrySchema);

  const commentSchema = new mongoose.Schema({
    username: String,
    comment: String,
    post: { type: mongoose.Schema.Types.ObjectId, ref: "PublicEntry" },
    created_date: Date,
  });
  models.Comment = mongoose.model("Comment", commentSchema);

  console.log("mongoose models created");
}

export default models



 
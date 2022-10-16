import { Schema, model, Collection } from 'mongoose';

const songSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    year: {
        type: Number,
        required: true,
      },
      
    artists: {
        type: [String],
        required: true,
      },
  },
  {collection: "songs2"}
)

module.exports = model("Song", songSchema)
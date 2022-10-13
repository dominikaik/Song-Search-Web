import { Schema, model } from 'mongoose';

const songSchema = new Schema(
  {
    artist: {
      type: String,
      required: true,
    },

    song: {
      type: String,
      required: true,
    },

    year: {
        type: Number,
        required: true,
      },
  }
)

module.exports = model("Song", songSchema)
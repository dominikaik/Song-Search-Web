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
    energy: {
        type: Number,
        required: true,
      },
    popularity: {
        type: Number,
        required: true,
      },
    tempo: {
        type: Number,
        required: true,
      },
    duration_ms: {
        type: Number,
        required: true,
      },
    danceability: {
        type: Number,
        required: true,
      },
    explicit: {
        type: Boolean,
        required: true,
      },
    acousticness: {
        type: Number,
        required: true,
    },
    key: {
      type: Number,
      required: true,
  },
  },
  {collection: "songs2"}
)

module.exports = model("Song", songSchema)
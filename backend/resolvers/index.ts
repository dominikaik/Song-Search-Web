const Song = require("../models/song")

module.exports = {
  songs: async (args) => {
    try {
      const songsFetched = await Song.find()
        return songsFetched.map(song => {
          return {
            ...song._doc,
            _id: song.id,
          }
        })
    } catch (error) {
      throw error
    }
  },

  createSong: async args => {
    try {
      const { artist, song, year } = args.song
      const Nsong = new Song({
        artist,
        song,
        year,
      })
      const newSong = await Nsong.save()
      return { ...newSong._doc, _id: newSong.id }
    } catch (error) {
      throw error
    }
  },
}
const Song = require("../models/song")

module.exports = {
  getSongs: async (args: { page: number; limit: number, search: string, year: number }) => {
    try {
      /*  Default values for page and page size if not set,
          to prevent sending all data by accident*/
      const page = args.page || 1
      const limit = args.limit || 10
      //Search for string if there is any, else return regex to match all.
      const search: string | RegExp = args.search || /.*/

      const searchQuery:{name: RegExp, year?: number} = {
        name: new RegExp(search, 'i'),
      };
      //Add year if requested
      (args.year) ? (searchQuery["year"] = args.year) : (null)

      //Fetch from DB
      const songsFetched = await Song.find(searchQuery).limit(limit).skip((page-1)*limit)
      const count = await Song.find(searchQuery).count();
      const totalPages = Math.ceil(count / limit)
  
      //Return data by format defined in schema
      return {
        songs: songsFetched,
        page: page,
        totalPages: totalPages
      }
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
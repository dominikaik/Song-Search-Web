import { getSongsArgs, searchQueryType } from "../types/resolvers"
const Song = require("../models/song")

module.exports = {
  getSongs: async (args: getSongsArgs) => {
    try {
      /*  Default values for page and page size if not set,
          to prevent sending all data by accident*/
      const page = args.page || 1
      const limit = args.pageSize || 10
      const orderBy = args.orderBy || {}
      //Search for string if there is any, else return regex to match all.
      const search: string | RegExp = args.search || /.*/

      const searchQuery: searchQueryType = {
        $or:[
          {name: new RegExp(search, 'i')},
          {artists: new RegExp(search, 'i')}
        ],
      };
      //Add year if requested
      (args.year) ? (searchQuery["year"] = args.year) : (null)

      //Fetch from DB
      const songsFetched = await Song.find(searchQuery).limit(limit).skip((page-1)*limit).sort(orderBy)
      const count: number = await Song.find(searchQuery).count();
      const totalPages: number = Math.ceil(count / limit)
  
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


  //Not currently in use, needs more arguments to work if it's going to be used
  createSong: async (args: { song: { artist: string[]; song: string; year: Number; }; }) => {
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
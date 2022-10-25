import { SortBy, SortTypes } from "../enums/order";

export type getSongsInputs = {
    search?: string, 
    page: number, 
    pageSize?: number, 
    orderBy?: {[key in SortBy]?: SortTypes}
}

export type songsType = {
    songs: {
        _id: string,
        name: string,
        artists: string[],
        danceability: number,
        year: number,
        key: number,
        popularity: number,
        rating: number | null
    }[],
    page: number,
    totalPages: number
}
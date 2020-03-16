// ["Title", "Year", 
// "Rated", "Released",
//  "Runtime", 
//  "Genre", 
//  "Director", 
//  "Writer", 
//  "Actors", "Plot", "Language", "Country", "Awards", "Poster", "Ratings", 
//  "Metascore", "imdbRating", "imdbVotes", "imdbID", "Type", "DVD", "BoxOffice", 
//  "Production", "Website", "Response"]

export const MOVIE_DETAILS_FIELDS = [
    { name: 'Title', type: 'text' },
    { name: 'Year', type: 'text' },
    { name: 'Released', type: 'text' },
    { name: 'Director', type: 'text' },
    { name: 'Actors', type: 'array' },
    { name: 'imdbRating', type: 'star' },
    { name: 'Plot', type: 'textarea' },
];
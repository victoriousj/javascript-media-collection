const API_SERVER = process.env.REACT_APP_API || 'http://localhost:3001';
const IMDB_API_KEY = process.env.REACT_APP_IMDB_APIKEY;
const OMDB_API_KEY = process.env.REACT_APP_OMDB_APIKEY;

export async function getData(method, endpoint, body) {
  try {
    const response = await fetch(`${API_SERVER}/${endpoint}`, {
      method,
      body: body && JSON.stringify(body),
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function getMovieData(title, year) {
  if (!title) return;
  try {
    const movieDBID = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURI(title)}&year=${year}&api_key=${IMDB_API_KEY}`)
      .then(response => response.json())
      .then(data => data.results[0].id);


    const movieDBJSON = await fetch(`https://api.themoviedb.org/3/movie/${movieDBID}?api_key=${IMDB_API_KEY}`)
      .then(response => response.json())
      .then(data => data);

    const movieDBImages = await fetch(`https://api.themoviedb.org/3/movie/${movieDBID}/images?api_key=${IMDB_API_KEY}`)
      .then(response => response.json())
      .then(data => data.backdrops);

    const otherImages = movieDBImages.map(x => 'https://image.tmdb.org/t/p/original' + x.file_path);

    const omdbJson = await fetch(`http://www.omdbapi.com/?i=${movieDBJSON.imdb_id}&apikey=${OMDB_API_KEY}`)
      .then(response => response.json())
      .then(data => data);


    const movieDetails = {
      backdropImage: 'https://image.tmdb.org/t/p/original' + movieDBJSON.backdrop_path,
      posterURI: 'https://image.tmdb.org/t/p/w500' + movieDBJSON.poster_path,
      imdbLink: 'https://www.imdb.com/title/' + movieDBJSON.imdb_id,
      releaseDate: new Date(movieDBJSON.release_date),
      genres: movieDBJSON.genres.map(x => x.name),
      description: movieDBJSON.overview,
      rating: movieDBJSON.vote_average,
      runtime: movieDBJSON.runtime,
      tagline: movieDBJSON.tagline,

      rated: omdbJson.Rated,
      writer: omdbJson.Writer,
      actors: omdbJson.Actors,
      ratings: omdbJson.Ratings,
      country: omdbJson.Country,
      language: omdbJson.Language,
      director: omdbJson.Director,
      released: omdbJson.Released,

      otherImages: otherImages,
    }


    return movieDetails;
  } catch (ex) {

  }
}
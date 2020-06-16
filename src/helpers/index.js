const API_SERVER = process.env.REACT_APP_API || 'http://localhost:3001';
const API_KEY = process.env.REACT_APP_APIKEY

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

export async function getMovieDBData(title, year) {
  if (!title) return;
  try {
    const movieDBID = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURI(title)}&year=${year}&api_key=${API_KEY}`)
      .then(response => response.json())
      .then(data => data.results[0].id);

    const detailedJson = await fetch(`https://api.themoviedb.org/3/movie/${movieDBID}?api_key=${API_KEY}`)
      .then(response => response.json())
      .then(data => data);

    const movieResult = detailedJson;
    const movieDetails = {
      backdropImage: 'https://image.tmdb.org/t/p/original' + movieResult.backdrop_path,
      posterURI: 'https://image.tmdb.org/t/p/w500' + movieResult.poster_path,
      imdbLink: 'https://www.imdb.com/title/' + movieResult.imdb_id,
      genres: (() => movieResult.genres.map(x => x.name))(),
      releaseDate: new Date(movieResult.release_date),
      description: movieResult.overview,
      rating: movieResult.vote_average,
      runtime: movieResult.runtime,
      tagline: movieResult.tagline,
    }
    return movieDetails;
  } catch (ex) {

  }
}
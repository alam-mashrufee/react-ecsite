import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { deleteMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import Genre from "./common/genre";
import { filter } from "../utils/filter";

class Movies extends Component {
  state = {
    movieList: [],
    genreList: [],
    currentPage: 1,
    currentGenre: "All Genre",
    pageSize: 4,
  };

  componentDidMount() {
    this.setState({ movieList: getMovies(), genreList: getGenres() });
  }

  handleDelete = (movie_id) => {
    let deletedMovie = deleteMovie(movie_id);
    this.setState({ movieList: getMovies() });
  };

  handleLiked = (movie) => {
    const movies = [...this.state.movieList];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movieList: movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    console.log(genre);
    this.setState({ currentGenre: genre });
  };

  render() {
    const {
      length: count, // object distructuring
    } = this.state.movieList;
    const { pageSize, currentPage, movieList } = this.state;

    if (count === 0) return <p>There are no movies in database.</p>;

    const movies = paginate(movieList, currentPage, pageSize);

    // const filteredMovies = filter(movieList, currentGenre);

    return (
      <main className="container">
        <div className="row">
          <div className="col-3 order-md-1 mt-4">
            <Genre
              genreList={this.state.genreList}
              textProperty="name"
              valueProperty="_id"
              currentGenre={this.state.currentGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col order-md-2 mt-4">
            <p>There are {count} movies in database.</p>
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Genre</th>
                  <th>Stock</th>
                  <th>Rate</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie) => (
                  <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td>
                      <Like
                        liked={movie.liked}
                        onClick={() => this.handleLiked(movie)}
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => this.handleDelete(movie._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default Movies;

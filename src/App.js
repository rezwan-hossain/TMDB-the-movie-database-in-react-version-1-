import React, { Component } from "react";
import "./App.css";
import Bloodhound from "bloodhound-js";
import $ from "jquery";
import typeahead from "typeahead.js";
import axios from "axios";

import Search from "./Search";
import Card from "./Card";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      undefined
    };
    console.log(this.state);
  }

  fetchApi(url) {
    console.log(url);
    axios.get(url).then(response => {
      const data = response.data;
      this.setState({
        movieID: data.id,
        original_title: data.original_title,
        overview: data.overview,
        homepage: data.homepage,
        poster: data.poster_path,
        backdrop: data.backdrop_path,
        production: data.production_companies,
        production_countries: data.production_countries,
        genre: data.genres,
        release: data.release_date,
        vote: data.vote_average,
        runtime: data.runtime,
        tagline: data.tagline,
        revenue: data.revenue,
        budget: data.budget
      });
      console.log(this.state);
    });
  }
  fetchMovieID(movieID) {
    let url = `https://api.themoviedb.org/3/movie/${movieID}?api_key=0d38ccd2376364df6ce3bc2e9f443b9f&language=en-US
  `;
    this.fetchApi(url);
  }

  componentDidMount() {
    let url = `https://api.themoviedb.org/3/movie/157336?api_key=0d38ccd2376364df6ce3bc2e9f443b9f&language=en-US
    `;
    this.fetchApi(url);

    let movie = new Bloodhound({
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      datumTokenizer: datum => {
        return Bloodhound.tokenizers.whitespace(datum);
      },
      remote: {
        wildcard: "%QUERY",
        url:
          "http://api.themoviedb.org/3/search/movie?query=%QUERY&api_key=0d38ccd2376364df6ce3bc2e9f443b9f",
        transform: response => {
          console.log(response.results);
          return response.results.map(movie => {
            return {
              value: movie.title,
              id: movie.id
            };
          });
        }
      }
    });
    movie.initialize();
    console.log($(".typeahead"));
    $(".ty")
      .typeahead(
        {
          highlight: true,

          minLength: 2
        },
        {
          display: "value",
          source: movie
        }
      )
      .on(
        "typeahead:selected",
        function(obj, datum) {
          console.log(datum.value);
          this.fetchMovieID(datum.id);
        }.bind(this)
      );
  }
  render() {
    console.log(this.state);
    return (
      <div className="App">
        <Search />
        {this.state == undefined ? (
          console.log("null null null")
        ) : (
          <Card data={this.state} />
        )}
      </div>
    );
  }
}

export default App;

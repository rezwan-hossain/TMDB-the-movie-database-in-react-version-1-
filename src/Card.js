import React, { Component } from "react";
import "./App.css";
import numeral from "numeral";
import { Container, Row, Col } from "react-grid-system";

let backdropIMG;
class Card extends Component {
  componentDidUpdate() {
    document.body.style.backgroundImage = "url(" + backdropIMG + ")";
  }

  render() {
    if (this.props.data) {
      var data = this.props.data;
      var posterIMG = "https://image.tmdb.org/t/p/w500" + data.poster,
        production = data.production,
        productionCountries = data.production_countries,
        genres = data.genre,
        totalRevenue = data.revenue,
        budget = data.budget,
        productionList = nestedDataToString(production),
        productionCountriesList = nestedDataToString(productionCountries),
        noData = "-",
        genresList = nestedDataToString(genres);
      backdropIMG = "https://image.tmdb.org/t/p/original" + data.backdrop;
      console.log(data);
      if (data.vote === "undefined" || data.vote === 0) {
        data.vote = noData;
      } else {
        data.vote = data.vote + " / 10";
        console.log(data.vote);
      }

      if (totalRevenue === "undefined" || totalRevenue === 0) {
        totalRevenue = noData;
      } else {
        totalRevenue = numeral(data.revenue).format("($0,0)");
        console.log(totalRevenue);
      }

      if (budget === "undefined" || budget === 0) {
        totalRevenue = noData;
      } else {
        budget = numeral(data.budget).format("($0,0)");
        console.log(budget);
      }

      if (data.poster == null) {
        posterIMG =
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSols5HZxlQWyS9JY5d3_L9imbk0LiziHiyDtMZLHt_UNzoYUXs2g";
      }
    }

    function nestedDataToString(nestedData) {
      let nestedArray = [],
        resultString;

      if (nestedData) {
        nestedData.map((item, i) => {
          nestedArray.push(item.name);
        });
      }
      resultString = nestedArray.join(", ");
      console.log(resultString);
    }
    return (
      <Container>
        <Row>
          <Col xs={6} md={4} debug>
            <img id="postertest" src={posterIMG} />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6} md={8} debug>
            <h1>{data.original_title}</h1>
            <span>{data.tagline}</span>
            <p>{data.overview}</p>
            <div>
              <span>{genresList}</span>
              <span>{productionList}</span>
              <div>
                <div>
                  {" "}
                  Original Release: <span>{data.release}</span>
                </div>
                <div>
                  {" "}
                  Running Time: <span>{data.runtime} mins</span>{" "}
                </div>
                <div>
                  {" "}
                  Box Office: <span>{totalRevenue}</span>
                </div>
                <div>
                  {" "}
                  Budget: <span>{budget}</span>
                </div>
                <div>
                  {" "}
                  Vote Average: <span>{data.vote}</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Card;

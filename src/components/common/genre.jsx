import React, { Component } from "react";
import PropTypes from "prop-types";
import { PureComponent } from "react";

const Genre = (props) => {
  const {
    genreList,
    currentGenre,
    onItemSelect,
    textProperty,
    valueProperty,
  } = props;

  return (
    <ul className="list-group">
      {genreList.map((genre) => (
        <a
          className={
            genre[textProperty] === currentGenre
              ? "list-group-item list-group-item-action active"
              : "list-group-item list-group-item-action"
          }
          onClick={() => onItemSelect(genre[textProperty])}
        >
          {genre[textProperty]}
        </a>
      ))}
    </ul>
  );
};

Genre.propTypes = {
  genreList: PropTypes.array.isRequired,
  currentGenre: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func.isRequired,
};

export default Genre;

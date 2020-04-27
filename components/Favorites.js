import React from "react";
import { StyleSheet, View } from "react-native";
import FilmList from "./FilmList";
import { connect } from "react-redux";

class Favorites extends React.Component {
  render() {
    return (
      <View style={styles.filmListContainer}>
        <FilmList
          films={this.props.favoritesFilm}
          navigation={this.props.navigation}
          favoriteList={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  filmListContainer: {
    flex: 1,
    margin: 5,
  },
});

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm,
  };
};

export default connect(mapStateToProps)(Favorites);

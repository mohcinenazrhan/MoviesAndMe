import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native";
import FilmList from "./FilmList";
import { getFilmsFromApiWithSearchedText } from "../API/TMDBApi";

class Search extends React.PureComponent {
  constructor(props) {
    super(props);
    this.searchedText = "";
    this.page = 0;
    this.totalPages = 0;
    this.state = {
      films: [],
      isLoading: false,
    };
  }

  _loadFilms = () => {
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true });
      getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(
        (data) => {
          this.page = data.page;
          this.totalPages = data.total_pages;
          this.setState({
            films: [...this.state.films, ...data.results],
            isLoading: false,
          });
        }
      );
    }
  };

  _searchTextInputChanged(text) {
    this.searchedText = text;
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  }

  _searchFilms() {
    this.page = 0;
    this.totalPages = 0;
    this.setState(
      {
        films: [],
      },
      () => {
        console.log(
          "Page : " +
            this.page +
            " / TotalPages : " +
            this.totalPages +
            " / Nombre de films : " +
            this.state.films.length
        );
        this._loadFilms();
      }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="Movie title..."
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._searchFilms()}
        />

        <View style={styles.searchBtnContainer}>
          <Button
            style={styles.searchBtn}
            title="Search"
            onPress={() => this._searchFilms()}
          />
        </View>

        <View style={styles.filmListContainer}>
          <FilmList
            films={this.state.films}
            navigation={this.props.navigation}
            loadFilms={() => this._loadFilms()}
            page={this.page}
            totalPages={this.totalPages}
          />
        </View>

        {this._displayLoading()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
  searchBtnContainer: {
    margin: 5,
  },
  textInput: {
    height: 50,
    borderColor: "#eaeaea",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    margin: 5,
    paddingLeft: 5,
  },
  filmListContainer: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Search;

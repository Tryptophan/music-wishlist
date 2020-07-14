// Packages
import React, { Component } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {

  constructor() {
    super();
    this.state = {
      albums: [],
      allChecked: false
    };
  }

  async componentDidMount() {
    try {
      // Build json of response
      const response = (await axios.get(`${process.env.REACT_APP_API_SERVER_URL}/wanted`)).data;
      let i = 0;
      let albums = response.map(album => {
        album.id = i++;
        album.checked = false;
        return album;
      });
      this.setState({
        albums: albums
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {

    const albums = this.state.albums.map(album => {
      const {Artist, Album, Year} = album;
      return (
        <tr key={album.id}>
          <td><input
                type="checkbox"
                checked={this.state.allChecked || album.checked}
                onChange={() => this.onOneChecked(album.id)}
                /></td>
          <td>{Artist}</td>
          <td>{Album}</td>
          <td>{Year}</td>
        </tr>
      );
    });

    return (
      <div className="App">
        <Table striped bordered hover>
          <thead className="TableHeader">
            <tr>
              <th><input
                    type="checkbox"
                    checked={this.state.allChecked}
                    onChange={this.onAllChecked}/> Already Own</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {albums}
          </tbody>
        </Table>
      </div>
    );
  }

  onAllChecked = () => {
    this.setState({
      allChecked: !this.state.allChecked
    });
  }

  onOneChecked = (id) => {
    for (let i = 0; i < this.state.albums.length; i++) {
      if (this.state.albums[i].id === id) {
        let newAlbums = this.state.albums;
        newAlbums[i].checked = !this.state.albums[i].checked;
        this.setState({
          albums: newAlbums
        });
      }
    }
  }

  // TODO:
  deleteAlbums = () => {
  }
}

export default App;

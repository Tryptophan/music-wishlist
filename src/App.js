// Packages
import React, { Component } from "react";
import axios from "axios";
import { Card, Button, Container, Col, Row } from "react-bootstrap";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Images
import NoArt from "./no_art.jpg";
import Loading from "./loading.gif";

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
        album.cover = Loading;
        return album;
      });
      this.setState({
        albums: albums
      }, this.getCoverArt);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const albums = this.state.albums.map(album => {
      const { Artist, Album, Year, id, cover, checked } = album;
      return (
        <Col lg="3" md="3" sm="4" xs="4" className="column">
          <Card key={id} className="AlbumCard" onClick={() => this.onSelectAlbum(id)}>
            {/* Get album art from backend */}
            <Card.Img variant="top" src={cover.length ? cover : NoArt} />
            <Card.Body>
              <Card.Title>{Album}</Card.Title>
              <Card.Text>{Artist} • {Year}</Card.Text>
            </Card.Body>
            <input type="checkbox" readOnly checked={checked} />
          </Card>
        </Col>
      );
    });

    return (
      <div className="App">
        <div className="FixedHeader">
          <h2>Michael's Music Wishlist</h2>
          <Button variant="danger" onClick={this.deleteAlbums}>Delete Selected</Button>
        </div>
        <Container fluid={true}>
          <Row>
            {albums}
          </Row>
        </Container>
      </div>
    );
  }

  onSelectAlbum = (id) => {
    for (let i in this.state.albums) {
      if (this.state.albums[i].id === id) {
        let newAlbums = this.state.albums;
        newAlbums[i].checked = !this.state.albums[i].checked;
        this.setState({
          albums: newAlbums
        });
      }
    }
  }

  getCoverArt = async () => {
    for (let album of this.state.albums) {
      const { Artist, Album } = album;
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_SERVER_URL}/cover?artist=${Artist}&album=${Album}`);
        const albums = this.state.albums.map(newAlbum => {
          if (newAlbum.id === album.id) {
            newAlbum.cover = response.data.cover;
          }
          return newAlbum;
        });
        this.setState({
          albums: albums
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  deleteAlbums = async () => {
    let deleted = [];
    let kept = [];
    for (let album of this.state.albums) {
      if (album.checked) {
        deleted.push(album.Album);
      } else {
        kept.push(album);
      }
    }
    console.log(deleted);
    // Send request
    await axios.delete(`${process.env.REACT_APP_API_SERVER_URL}/delete`, {
      data: {
        albums: deleted
      }
    });

    // Remove locally
    this.setState({
      albums: kept
    });
  }
}

export default App;

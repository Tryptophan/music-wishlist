// Packages
import React, { Component } from "react";
import axios from "axios";
import { Card, Button, Container, Col, Row } from "react-bootstrap";

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
        album.cover = "https://media0.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif";
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
      const { Artist, Album, Year, id, cover } = album;
      return (
        <Col md="3">
          <Card key={id} className="AlbumCard">
            {/* Get album art from backend */}
            <Card.Img variant="top" src={cover} />
            <Card.Body>
              <Card.Title>{Album}</Card.Title>
              <Card.Text>{Artist} • {Year}</Card.Text>
              <Button variant="primary">Already Own</Button>
            </Card.Body>
          </Card>
        </Col>
      );
    });

    return (
      <div className="App">
        <Container fluid={true}>
          <Row>
            {albums}
          </Row>
        </Container>
      </div>
    );
  }

  getCoverArt = async () => {
    for (let album of this.state.albums) {
      const { Artist, Album } = album;
      const response = await axios.get(`${process.env.REACT_APP_API_SERVER_URL}/cover?artist=${Artist}&album=${Album}`);
      const albums = this.state.albums.map(newAlbum => {
        if (newAlbum.id === album.id) {
          newAlbum.cover = response.data.cover;
        }
        return newAlbum;
      });
      this.setState({
        albums: albums
      }, () => {
        console.log(this.state.albums);
      });
    }
  }

  // TODO:
  deleteAlbum = () => {
  }
}

export default App;

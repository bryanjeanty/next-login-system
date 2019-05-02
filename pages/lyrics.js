import React, { Component, Fragment } from "react";
import axios from "axios";
import getConfig from "next/config";
import MySpinner from "../components/Spinner";
import Link from "next/link";
import Router from "next/router";
import { format } from "date-fns";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardText,
  ListGroup,
  ListGroupItem
} from "reactstrap";

const { publicRuntimeConfig } = getConfig();
const { MM_KEY } = publicRuntimeConfig;

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {}
  };

  static getInitialProps({ query: { id } }) {
    console.log(id);
    return { trackId: id };
  }

  async componentDidMount() {
    try {
      const { trackId } = this.props;
      const proxyUrl = "https://damp-cove-73616.herokuapp.com/";
      const mmUrlLyrics = `https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${trackId}&apikey=${MM_KEY}`;
      const mmUrlTrack = `https://api.musixmatch.com/ws/1.1/track.get?track_id=${trackId}&apikey=${MM_KEY}`;
      const responseLyrics = await axios.get(proxyUrl + mmUrlLyrics, {
        withCredentials: false
      });
      await this.setState({ lyrics: responseLyrics.data.message.body.lyrics });
      const responseTrack = await axios.get(proxyUrl + mmUrlTrack, {
        withCredentials: false
      });
      this.setState({ track: responseTrack.data.message.body.track });
    } catch (error) {
      console.error("my error", error);
    }
  }

  handleClick = () => {
    Router.replace("/");
  };

  render() {
    const { track, lyrics } = this.state;
    console.log(track);
    if (
      track === undefined ||
      Object.keys(track).length === 0 ||
      (lyrics === undefined || Object.keys(lyrics).length === 0)
    ) {
      return <MySpinner />;
    } else {
      return (
        <Fragment>
          <Button onClick={this.handleClick} className="btn-dark btn-sm mb-4">
            <Link href="/">
              <a className="back-button">Back</a>
            </Link>
          </Button>
          <Card>
            <CardHeader>
              {track.track_name} by{" "}
              <span className="text-secondary">{track.artist_name}</span>
            </CardHeader>
            <CardBody>
              <CardText>{lyrics.lyrics_body}</CardText>
            </CardBody>
          </Card>
          <ListGroup className="mt-3">
            <ListGroupItem>
              <strong>Album ID</strong>: {track.album_id}
            </ListGroupItem>
            <ListGroupItem>
              <strong>Genre</strong>:{" "}
              {track.primary_genres.music_genre_list.length === 0
                ? "Unknown"
                : track.primary_genres.music_genre_list[0].music_genre
                    .music_genre_name}
            </ListGroupItem>
            <ListGroupItem>
              <strong>Explicit</strong>: {track.explicit === 0 ? "No" : "Yes"}
            </ListGroupItem>
            <ListGroupItem>
              <strong>Release Date</strong>:{" "}
              {format(track.updated_time, "MM/DD/YYYY")}
            </ListGroupItem>
          </ListGroup>
          <style jsx>{`
            .back-button {
              color: #fff;
            }
            .back-button:hover {
              text-decoration: none;
            }
          `}</style>
        </Fragment>
      );
    }
  }
}

export default Lyrics;

import React, { Component, Fragment } from "react";
import { Col, Card, CardBody, CardText, Button } from "reactstrap";
import Link from "next/link";
import Router from "next/router";
import axios from "axios";
import Bottleneck from "bottleneck";
import getConfig from "next/config";

class TrackItem extends Component {
  state = {
     album_url: '',
     message: ''
  }

  componentDidMount() {
     this.getAlbumImg();
  }

  handleClick = () => {
    Router.replace(`/lyrics/track/${track.track_id}`);
  };

  getAlbumImg = async () => {
     const { album_name, artist_name } = this.props.track;
     const proxyUrl = "https://damp-cove-73616.herokuapp.com/";
     const bingImgUrlEndpoint = 'https://api.cognitive.microsoft.com/bing/v7.0/images/search';
     const { publicRuntimeConfig } = getConfig();
     const { BING_IMG_KEY } = publicRuntimeConfig;
     const axiosOptions = {
        withCredentials: false,
        headers: {
           'Ocp-Apim-Subscription-Key': BING_IMG_KEY
        }
     };
     const limiter = new Bottleneck({ maxConcurrent: 1, minTime: 1000 });
     const wrapped = limiter.wrap(axios.get);
     try{
        const { data } = await wrapped(proxyUrl + bingImgUrlEndpoint + '?q=' + album_name + ' ' + artist_name, axiosOptions);
        if (data) {
           this.setState({ album_url: data.value[0].contentUrl, message: "Successfully fetched album img" });
        }
     } catch (error) {
        if (error) {
           this.setState({ message: "Album image was not successfully fetched" });
        }
     }
  }

  render() {
  const { track } = this.props;
  const { album_url, message } = this.state;

  return (
    <Fragment>
      <Col md="6">
        <Card className="mb-4 shadow-sm track-card">
        <div className="track-container">
          <div className="card-img-container">
             <img className="card-img" src={album_url ? album_url : '/static/images/default_album_img.jpg'} alt={album_url} />
          </div>
          <div className="track-body">
          <CardBody>
            <h5>{track.artist_name.length > 25 ? `${String(track.artist_name).substring(0, 24)}...` : track.artist_name}</h5>
            <CardText>
              <strong>
                <i className="fas fa-play" /> Track
              </strong>
              : {track.track_name} <br />
              <strong>
                <i className="fas fa-compact-disc" /> Album
              </strong>
              : {track.album_name.length > 20 ? `${String(track.album_name).substring(0, 19)}...` : track.album_name}
            </CardText>
            <Button onClick={() => handleClick()} className="btn-dark" block>
              <Link href={`/lyrics/track/${track.track_id}`}>
                <a className="track-link">
                  <i className="fas fa-chevron-right" /> View Lyrics
                </a>
              </Link>
            </Button>
          </CardBody>
          </div>
        </div>
        </Card>
      </Col>
      <style jsx>{`
        .track-card {
           border-radius: 0;
        }
        .track-container {
           display: flex;
           flex-direction: row;
        }
        .card-img-container {
           width: 30%;
        }
        .card-img {
           width: 100%;
           height: 100%;
           object-fit: cover;
        }
        .track-body {
           width: 70%;
        }
        .track-link {
          color: #fff;
        }
        .track-link:hover {
          text-decoration: none;
        }
      `}</style>
    </Fragment>
  );
 }
};

export default TrackItem;

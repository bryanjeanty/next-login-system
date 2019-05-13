import React, { Component, Fragment } from "react";
import axios from "axios";
import getConfig from "next/config";
import Layout from "../components/Layout";
import MySpinner from "../components/Spinner";
import Link from "next/link";
import Router from "next/router";
import { format } from "date-fns";
import Bottleneck from 'bottleneck';
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
const { MM_KEY, BING_IMG_KEY } = publicRuntimeConfig;

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {},
    album_url: ''
  };

  static getInitialProps({ query: { id } }) {
    return { trackId: id };
  }

  async componentDidMount() {
    try {
      const { trackId } = this.props;
      const proxyUrl = "https://damp-cove-73616.herokuapp.com/";
      const mmUrlLyrics = `https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${trackId}&apikey=${MM_KEY}`;
      const mmUrlTrack = `https://api.musixmatch.com/ws/1.1/track.get?track_id=${trackId}&apikey=${MM_KEY}`;
      const mmAxiosOpts = { withCredentials: false };

      const bingImgUrl = "https://api.cognitive.microsoft.com/bing/v7.0/images/search";
      const bingAxiosOpts = { withCredentials: false, headers: { 'Ocp-Apim-Subscription-Key': BING_IMG_KEY } };
      const bingLimiter = new Bottleneck({ maxConcurrent: 1, minTime: 1000 });

      const responseLyrics = await axios.get(proxyUrl + mmUrlLyrics, mmAxiosOpts);
      await this.setState({ lyrics: responseLyrics.data.message.body.lyrics });

      const responseTrack = await axios.get(proxyUrl + mmUrlTrack, mmAxiosOpts);
      await this.setState({ track: responseTrack.data.message.body.track });

      const { album_name, artist_name } = this.state.track;
      const responseImg = await bingLimiter.schedule(() => axios.get(`${proxyUrl}${bingImgUrl}?q=${album_name} ${artist_name}`, bingAxiosOpts));
      this.setState({ album_url: responseImg.data.value[1].contentUrl })
    } catch (error) {
      console.error("my error", error);
    }
  }

  render() {
    const { track, lyrics, album_url } = this.state;

    if (
      track === undefined ||
      Object.keys(track).length === 0 ||
      (lyrics === undefined || Object.keys(lyrics).length === 0)
    ) {
      return <Layout page="lyrics"><MySpinner /></Layout>;
    } else {
      return (
        <Layout page="lyrics">
        <div className="lyrics-page-container">
          <div className="artist-track-card-container">
          <div className="card lyrics-page-boxes">
             <div className="card-header">
                <h5 className="card-subtitle text-muted">Track</h5>
                <span className="card-subtitle text-muted card-small-text">{`  ${format(track.updated_time, "MMM, Do YYYY")}`}</span>
             </div>
             <div className="card-body">
                <div className="artist-track-body">
                   <div className="artist-track-album-img-container">
                      <img className="artist-track-album-img" src={album_url ? album_url : '/static/images/default_album_img.jpg'} alt={album_url} />
                   </div>
                   <div className="artist-track-content-container">
                      <h2 className="artist-track-name card-title">{track.track_name}</h2>
                      <p className="artist-name card-text">By {track.artist_name}</p>
                      <div className="genre-bias-container">
                         <p className="artist-track-genre card-text text-muted">
                            {track.primary_genres.music_genre_list.length === 0
                               ? "Unknown"
                               : track.primary_genres.music_genre_list[0].music_genre.music_genre_name}
                         </p>
                         <div className="user-track-bias">
                            <button className="btn btn-success like-btn"><i className="fas fa-thumbs-up"></i></button>
                            <button className="btn btn-danger dislike-btn"><i className="fas fa-thumbs-down"></i></button>
                         </div>
                      </div>
                      <div className="artist-track-audio">
                         <audio controls>
                            <source src="horse.mp3" type="audio/mpeg" />
                         </audio>
                      </div>
                   </div>
                </div>
             </div>
          </div>
         </div>
          <div className="card lyrics-page-boxes">
            <div className="card-header">
              <h5 className="card-subtitle text-muted">Lyrics</h5>
              <span className="card-subtitle text-muted card-small-text">{`  ${track.explicit === 0 ? "Non-Explicit" : "Explicit"}`}</span>
            </div>
            <div className="card-body">
               <div className="artist-track-lyrics-container">
                  <div className="artist-track-lyrics-text-container">
                     <p className="card-text lyrics-text">
                        {`${lyrics.lyrics_body.split('*******')[0]}`}
                     </p>
                  </div>
                  <div className="artist-track-lyrics-btn-container">
                     <div className="artist-track-lyrics-btn-box">
                     <button className="btn btn-primary">
                        <Link href={String(lyrics.backlink_url)}>
                           <a>View Full Lyrics</a>
                        </Link>
                     </button>
                     </div>
                  </div>
               </div>
            </div>
          </div>
          <style jsx>{`
            .lyrics-page-container {
               padding: 6rem 0;
            }
            .card-header {
               display: flex;
            }
            .card-small-text {
               margin: auto;
               font-size: 0.75rem;
               font-weight: 300;
            }
            .artist-track-body {
               display: flex;
               flex-direction: rows;
               margin: 0;
            }
            .artist-track-card-container {
               margin-bottom: 1.5rem;
            }
            .lyrics-page-boxes {
               border-radius: 0;
            }
            .artist-track-album-img-container {
               width: 30%;
            }
            .artist-track-album-img {
               height: 100%;
               width: 100%;
               object-fit: cover;
               border: 1px solid #eee;
               box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.15);
            }
            .artist-track-content-container {
               width: 70%;
               padding-left: 2rem;
               display: flex;
               flex-direction: column;
            }
            .artist-track-name {
               font-size: 3.5rem;
               font-weight: 650;
            }
            .artist-name {
               font-size: 1.25rem;
               font-weight: 350;
            }
            .genre-bias-container {
               display: flex;
               width: 90%;
            }
            .user-track-bias {
               margin-left: auto;
               margin-right: 0;
            }
            .like-btn, .dislike-btn {
               border-radius: 50%;
               margin-left: 10px;
            }
            .artist-track-audio {
               margin-top: auto;
               margin-bottom: 0;
            }
            .artist-track-audio audio {
               margin-top: 50px;
               width: 90%;
               border-radius: 50px;
               box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.15);
            }
            .artist-track-lyrics-container {
               display: flex;
               flex-direction: rows
            }
            .artist-track-lyrics-text-container {
               width: 80%;
            }
            .artist-track-lyrics-btn-container {
               width: 20%;
               display: flex;
            }
            .artist-track-lyrics-btn-box {
               margin: auto;
            }
            .artist-track-lyrics-btn-box button {
               border-radius: 0;
            }
            .artist-track-lyrics-btn-box button a {
               color: #eee;
               font-weight: 450;
            }
          `}</style>
        </div>
        </Layout>
      );
    }
  }
}

export default Lyrics;

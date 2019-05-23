import React, { Component } from "react";
import axios from "axios";
import getConfig from "next/config";
import { connect } from "react-redux";
import { Button, Card, CardBody, Form, FormGroup, Input } from "reactstrap";
import { searchTracks } from "../redux/actions/track";

const { publicRuntimeConfig } = getConfig();
const { MM_KEY } = publicRuntimeConfig;

class Search extends Component {
  state = {
    trackTitle: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleClick = async event => {
    event.preventDefault();
    try {
      const { trackTitle } = this.state;
      await this.props.searchTracks(trackTitle);
      this.setState({ trackTitle: "" });
    } catch (error) {
      console.error("my error", error);
    }
  };

  render() {
    const { trackTitle } = this.state;

    return (
      <div className="search-container">
        <div className="search-card card mb-4 p-4">
          <div className="card-body">
            <h1 className="display-4 text-center">
              <i className="fas fa-music"> Find Your Music</i>
            </h1>
            <p className="lead text-center">Lyrics and audio for any song</p>
            <div className="form-container">
              <form className="form-inline">
                <Input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search songs..."
                  name="trackTitle"
                  autocomplete="off"
                  value={trackTitle}
                  onChange={this.handleChange}
                />
                <button
                  onClick={this.handleClick}
                  className="btn btn-outline-primary my-2 my-sm-0"
                  type="submit"
                >
                  <i className="fas fa-search" />
                </button>
              </form>
            </div>
          </div>
        </div>
        <style jsx>{`
          .search-card {
            border-radius: 0;
          }
        `}</style>
      </div>
    );
  }
}

export default connect(
  null,
  { searchTracks }
)(Search);

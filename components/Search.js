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
      <div>
        <Card className="mb-4 p-4">
          <CardBody>
            <h1 className="display-4 text-center">
              <i className="fas fa-music" /> Search For A Song
            </h1>
            <p className="lead text-center">Get the lyrics for any song</p>
            <Form className="search-form">
              <FormGroup>
                <Input
                  type="text"
                  placeholder="Song title..."
                  name="trackTitle"
                  value={trackTitle}
                  onChange={this.handleChange}
                />
                <Button
                  onClick={this.handleClick}
                  color="primary"
                  block
                  className="mt-2"
                  type="submit"
                >
                  Get Track Lyrics
                </Button>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default connect(
  null,
  { searchTracks }
)(Search);

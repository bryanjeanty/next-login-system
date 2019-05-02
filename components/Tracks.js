import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getTracks } from "../redux/actions/track";
import MySpinner from "./Spinner";
import TrackItem from "./TrackItem";
import { Container, Row } from "reactstrap";

class Tracks extends Component {
  componentDidMount() {
    this.props.getTracks();
  }

  render() {
    const { isFetching, heading, trackList } = this.props.track;
    if (isFetching) {
      return <MySpinner />;
    } else {
      return (
        <Container>
          <h3 className="text-center mb-4">{heading}</h3>
          <Row>
            {trackList.map(trackItem => {
              return (
                <TrackItem
                  key={trackItem.track.track_id}
                  track={trackItem.track}
                />
              );
            })}
          </Row>
        </Container>
      );
    }
  }
}

export default connect(
  ({ track }) => ({ track }),
  { getTracks }
)(Tracks);

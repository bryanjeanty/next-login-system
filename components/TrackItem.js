import React, { Fragment } from "react";
import { Col, Card, CardBody, CardText, Button } from "reactstrap";
import Link from "next/link";
import Router from "next/router";

const TrackItem = ({ track }) => {
  const handleClick = () => {
    Router.replace(`/lyrics/track/${track.track_id}`);
  };

  return (
    <Fragment>
      <Col md="6">
        <Card className="mb-4 shadow-sm">
          <CardBody>
            <h5>{track.artist_name}</h5>
            <CardText>
              <strong>
                <i className="fas fa-play" /> Track
              </strong>
              : {track.track_name} <br />
              <strong>
                <i className="fas fa-compact-disc" /> Album
              </strong>
              : {track.album_name}
            </CardText>
            <Button onClick={() => handleClick()} className="btn-dark" block>
              <Link href={`/lyrics/track/${track.track_id}`}>
                <a className="track-link">
                  <i className="fas fa-chevron-right" /> View Lyrics
                </a>
              </Link>
            </Button>
          </CardBody>
        </Card>
      </Col>
      <style jsx>{`
        .track-link {
          color: #fff;
        }
        .track-link:hover {
          text-decoration: none;
        }
      `}</style>
    </Fragment>
  );
};

export default TrackItem;

import React from "react";
import { Spinner } from "reactstrap";

const MySpinner = () => {
  return (
    <div>
      <Spinner className="spinner" />
      <style jsx>{`
            .spinner {
                width: 4rem,
                height: 4rem,
                margin: 40px auto,
                display: 'block'
            }
        `}</style>
    </div>
  );
};

export default MySpinner;

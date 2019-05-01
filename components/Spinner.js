import React from "react";

export default () => {
  return (
    <div>
      <img src="/static/spinner.gif" alt="Loading..." className="spinner" />
      <style jsx>{`
            .spinner {
                width: 200px,
                margin: 40px auto,
                display: 'block'
            }
        `}</style>
    </div>
  );
};

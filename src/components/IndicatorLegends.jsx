import React from "react";
// import ListGroup from "react-bootstrap/ListGroup";

import * as Icons from "./Icons";

// const div = ({ children }) => <div className="text-secondary">{children}</div>;

export default () => (
  <ul>
    <li>
      <Icons.Verified active={true} />
      <div className="text-secondary">{Icons.description.verified}</div>
    </li>
    <li>
      <Icons.Useful />
      <div className="text-secondary">{Icons.description.useful}</div>
    </li>
    <li>
      <Icons.Rumor />
      <div className="text-secondary">{Icons.description.rumor}</div>
    </li>
    <style jsx>{`
      ul {
        list-style-type: none;
        padding: 0;
        margin: 0 0 5px;
        display: flex;
      }
      li {
        display: flex;
        align-items: center;
        margin: 0 10px;
      }
      div {
        font-size: 14px;
        margin-left: 5px;
      }
    `}</style>
  </ul>
);

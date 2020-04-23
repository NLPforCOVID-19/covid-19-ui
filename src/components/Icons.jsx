import React from 'react';

export const description = {
  verified: "人手で検証済みの記事",
  useful: "役立つ記事",
  rumor: "デマに関する記事"
}

export const Verified = ({size, active}) => (
  <>
    <i className="material-icons" title={active ? description.verified : ""}>check_circle</i>
    <style jsx>{`
      .material-icons {
        vertical-align: middle;
        color: ${active ? "green" : "#ccc"};
        font-size: ${size || "1em"};
      }
    `}</style>
  </>
);


export const Useful = ({size}) => (
  <>
    <i className="material-icons" title={description.useful}>star</i>
    <style jsx>{`
      .material-icons {
        vertical-align: middle;
        color: #ffca18;
        font-size: ${size || "1em"};
      }
    `}</style>
  </>
);


export const Rumor = ({size}) => (
  <>
    <i className="material-icons" title={description.rumor}>error</i>
    <style jsx>{`
      .material-icons {
        vertical-align: middle;
        color: orange;
        font-size: ${size || "1em"};
      }
    `}</style>
  </>
);

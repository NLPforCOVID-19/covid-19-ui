import React from 'react';

export const description = {
  verified: "人手でカテゴリを検証済みの記事",
  useful: "役立つ記事（かつ人手でカテゴリを検証済み）",
  rumor: "デマに関する記事（かつ人手でカテゴリを検証済み）"
};

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
    <i className="material-icons" title={description.useful}>check_circle</i>
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
    <i className="material-icons" title={description.rumor}>check_circle</i>
    <style jsx>{`
      .material-icons {
        vertical-align: middle;
        color: #0079c1;
        font-size: ${size || "1em"};
      }
    `}</style>
  </>
);

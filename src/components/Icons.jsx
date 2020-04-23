import React from 'react';

export const description = {
  verified: "クラウドソーシングでカテゴリを検証済",
  useful: "クラウドソーシングで役に立つとマークされました",
  rumor: "クラウドソーシングでデマに関する情報であるとマークされました"
}

export const Verified = ({size, color}) => (
  <>
    <i className="material-icons" title={description.verified}>check_circle</i>
    <style jsx>{`
      .material-icons {
        vertical-align: middle;
        color: ${color || "green"};
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

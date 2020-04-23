import React from 'react';

export const Verified = ({size, color}) => (
  <>
    <i className="material-icons" title="クラウドソーシングでカテゴリを検証済">check_circle</i>
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
    <i className="material-icons" title="クラウドソーシングで役に立つとマークされました">star</i>
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
    <i className="material-icons" title="クラウドソーシングでデマに関する情報であるとマークされました">check_circle</i>
    <style jsx>{`
      .material-icons {
        vertical-align: middle;
        color: orange;
        font-size: ${size || "1em"};
      }
    `}</style>
  </>
);

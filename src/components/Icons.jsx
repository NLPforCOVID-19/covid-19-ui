import React from 'react';

export const description = {
  useful: "役立つ記事",
  rumor: "デマに関する記事",
  notVerified: "カテゴリ未検証の記事"
};

const BaseIcon = ({title, color, size}) => (
  <>
    <i className="material-icons" title={title || ""}>check_circle</i>
    <style jsx>{`
      .material-icons {
        vertical-align: middle;
        color: ${color || "#ccc"};
        font-size: ${size || "1em"};
      }
    `}</style>
  </>
)

export const NotVerified = ({size}) => (
  <BaseIcon title={description.notVerified} size={size} />
);


export const Useful = ({size}) => (
  <BaseIcon title={description.useful} size={size} color="#ffca18" />
);


export const Rumor = ({size}) => (
  <BaseIcon title={description.rumor} size={size} color="#0079c1" />
);

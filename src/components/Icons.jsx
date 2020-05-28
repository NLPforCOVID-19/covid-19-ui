import React from 'react';

export const description = {
  useful: "役立つ記事",
  verified: "カテゴリ検証済みの記事",
  notVerified: "カテゴリ未検証の記事"
};

const BaseIcon = ({title, color, size, iconId}) => (
  <>
    <i className="material-icons" title={title || ""}>{iconId}</i>
    <style jsx>{`
      .material-icons {
        vertical-align: middle;
        color: ${color || "#aaa"};
        font-size: ${size || "1em"};
      }
    `}</style>
  </>
)

export const NotVerified = ({size}) => (
  <BaseIcon title={description.notVerified} size={size} iconId="help_outline" />
);


export const Useful = ({size}) => (
  <BaseIcon title={description.useful} size={size} color="#ffca18" iconId="check_circle" />
);

export const Verified = ({size}) => (
  <BaseIcon title={description.useful} size={size} color="#70bf00" iconId="check_circle" />
)

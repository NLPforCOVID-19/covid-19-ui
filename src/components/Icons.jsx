import React from 'react'

export const description = {
  useful: '役立つ記事',
  verified: '人手で検証済みの記事',
  notVerified: 'カテゴリ未検証の記事'
}

const BaseIcon = ({ title, color, size, iconId }) => (
  <>
    <i className="material-icons" title={title || ''}>
      {iconId}
    </i>
    <style jsx>{`
      .material-icons {
        vertical-align: middle;
        color: ${color || 'var(--gray)'};
        font-size: ${size || '1em'};
      }
    `}</style>
  </>
)

export const NotVerified = ({ size }) => <BaseIcon title={description.notVerified} size={size} iconId="help_outline" />

export const Useful = ({ size }) => (
  <BaseIcon title={description.useful} size={size} color="var(--yellow)" iconId="check_circle" />
)

export const Verified = ({ size }) => (
  <BaseIcon title={description.useful} size={size} color="#b4e063" iconId="check_circle" />
)

export const Edit = ({ size }) => <BaseIcon size={size} iconId="edit" />

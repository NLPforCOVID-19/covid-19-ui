import React from 'react'

export const InfoWindowContent: React.FC<{ title: string }> = ({ title }) => (
  <div>
    <div className="title">{title}</div>
    <style jsx>{`
      .title {
        max-width: 100px;
      }
    `}</style>
  </div>
)

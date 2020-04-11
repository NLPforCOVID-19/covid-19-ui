import React from 'react';
import Button from 'react-bootstrap/Button';

export default ({ selectedTopic, topics, changeTopic }) => (
  <div className="mb-2">
    <Button variant="outline-info" onClick={() => changeTopic('all')} size="sm" active={selectedTopic === 'all'}>
      すべて表示
    </Button>
    {topics.map((topic, i) => (
      <span key={i}>
      {' '}
        <Button variant="outline-info" size="sm" active={selectedTopic === topic} onClick={() => changeTopic(topic)}>
        {topic}
      </Button>
    </span>
    ))}
  </div>
);

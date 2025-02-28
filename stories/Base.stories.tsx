import React from 'react';
import { Container } from '../src';

import '../src/style.css';

const renderLongList = () => {
  return Array.from({ length: 1000 }, (_, index) => (
    <li
      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
      key={`item-${index}`}
      style={{
        width: '600px',
      }}
    >
      item-{index}
    </li>
  ));
};

const Example = () => {
  return (
    <div>
      <Container
        style={{ height: '500px', width: '300px', border: '1px solid red' }}
        onXReachEnd={() => console.log('onXReachEnd')}
        onXReachStart={() => console.log('onXReachStart')}
        onYReachEnd={() => console.log('onYReachEnd')}
        onYReachStart={() => console.log('onYReachStart')}
      >
        <ul>{renderLongList()}</ul>
      </Container>
    </div>
  );
};

const meta = {
  title: 'Example/Base',
  component: Example,
};

export default meta;

export const Base = {
  args: {},
};

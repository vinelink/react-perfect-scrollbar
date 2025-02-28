import React, { useRef } from 'react';
import { Container, type ContainerRef, useContainer } from '../src';

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
  const ref = useRef<ContainerRef>(null);
  const { getPsInstance, getContainer } = useContainer(ref);

  return (
    <div>
      <Container
        ref={ref}
        style={{ height: '500px', width: '300px', border: '1px solid red' }}
        onXReachEnd={() => console.log('onXReachEnd')}
        onXReachStart={() => console.log('onXReachStart')}
        onYReachEnd={() => console.log('onYReachEnd')}
        onYReachStart={() => console.log('onYReachStart')}
      >
        <ul>{renderLongList()}</ul>
      </Container>

      <button onClick={() => console.log(getPsInstance())} type="button">
        getPsInstance
      </button>
      <button onClick={() => console.log(getContainer())} type="button">
        getContainer
      </button>
    </div>
  );
};

const meta = {
  title: 'Example/Hook',
  component: Example,
};

export default meta;

export const Hook = {
  args: {},
};

# SuperReact

`SuperReact` is a collection of handy React hooks designed to simplify and enhance your React development experience. Below are the use cases for each hook provided in this package.

## Installation

You can install `SuperReact` from npm:

```bash
npm install super-react-hooks
```

## Hooks and Their Use Cases

### `useRemount`

A hook to force a component to remount whenever its dependencies change.

#### Usage

```javascript
import React from 'react';
import { useRemount } from 'super-react-hooks';

const MyComponent = () => {
  const { key, remount } = useRemount([/* dependencies */]);

  return (
    <div key={key}>
      <p>This component will remount when dependencies change.</p>
      <button onClick={remount}>Remount Now</button>
    </div>
  );
};
```

### `usePrevious`

A hook to keep track of the previous value of a state or prop.

#### Usage

```javascript
import React, { useState, useEffect } from 'react';
import { usePrevious } from 'super-react-hooks';

const Counter = () => {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  useEffect(() => {
    if (prevCount !== undefined) {
      console.log(`Previous count: ${prevCount}`);
    }
  }, [count]);

  return (
    <div>
      <p>Current count: {count}</p>
      <p>Previous count: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
```

### `useTimeout`

A hook to handle timeouts in a declarative way.

#### Usage

```javascript
import React, { useState } from 'react';
import { useTimeout } from 'super-react-hooks';

const TimeoutComponent = () => {
  const [isTimeout, setIsTimeout] = useState(false);

  useTimeout(() => {
    setIsTimeout(true);
  }, 5000);

  return (
    <div>
      {isTimeout ? <p>Timeout reached!</p> : <p>Waiting for timeout...</p>}
    </div>
  );
};
```

### `useInterval`

A hook to handle intervals in a declarative way.

#### Usage

```javascript
import React, { useState } from 'react';
import { useInterval } from 'super-react-hooks';

const IntervalComponent = () => {
  const [count, setCount] = useState(0);

  useInterval(() => {
    setCount(count + 1);
  }, 1000);

  return (
    <div>
      <p>Count: {count}</p>
    </div>
  );
};
```

### `useRequest`

A hook to handle asynchronous requests in a declarative way.

#### Usage

```javascript
import React from 'react';
import { useRequest } from 'super-react-hooks';

const fetchData = async () => {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  return data;
};

const DataFetchingComponent = () => {
  const { data, error, loading, retry } = useRequest(fetchData, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={retry}>Retry</button>
    </div>
  );
};
```

## Exporting All Hooks

To use all the hooks provided by `SuperReact`, you can import the default export:

```javascript
import SuperReact from 'super-react-hooks';

const { useRemount, usePrevious, useTimeout, useInterval, useRequest } = SuperReact;
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
```
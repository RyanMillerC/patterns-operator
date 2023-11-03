/*

This module provides the capability to get and set query (search)
string parameters. Query parameters in this application act as a
simple state management solution for tracking things like a searched
term, an active modal, etc.

Because components from this application are loaded into the OpenShift
Console's React UI, normal React single-page app routing does not work
as expected. The OpenShift console is running react-router-dom. If you
try use react-router-dom in an OpenShift console dynamic plugin, it
will not route correctly. (This is Ryan's experience with it as of
2023-10-26.)

In order to get and set query parameters in the OpenShift console
dynamic plugin, I'm using standard JS capabilities to read and set
the URL in the browser address bar. To refresh components when new
parameters are set, React Context is used. A copy of parameters from
the browser URL are stored a context state. On a hard refresh, the
state is loaded from the URL. On each parameter update, both the
context state and URL are updated.

Example usage:

```
import { useQueryParams } from '../UseQueryParams';

const MyComponent = () => {
  // Get and set query parameters in the URL
  const { queryParams, setQueryParam } = useQueryParams();

  setQueryParam('someParam', 'value');
  console.log(queryParams.someParam);

  // ...
};
```

To set up useQueryParams, you must wrap your top level component
in QueryParamsProvider:

```
import { QueryParamsProvider } from '../UseQueryParams';

const TopLevelComponent = () => {
  return (
    <QueryParamsProvider>
      // ...
    </QueryParamsProvider>
  )
};
```

*/

import * as React from 'react';

interface QueryParamsContextValue {
  queryParams: Record<string, any>;
  setQueryParam: (key: string, value: any) => void;
}

const QueryParamsContext = React.createContext<QueryParamsContextValue | undefined>(
  undefined
);

const getParamsFromURL = (): Record<string, any> => {
  const url = new URL(window.location.href);
  const queryParams = Object.fromEntries(url.searchParams.entries());
  const arrayfiedQueryParams = Object.fromEntries(
    Object.entries(queryParams).map(([key, value]) => {
      return [key, JSON.parse(value)]; // This seems like it's working
    })
  );
  return arrayfiedQueryParams;
};

// Wrap top level component in this to provide context
export const QueryParamsProvider: React.FC<React.PropsWithChildren<any>> = (props) => {
  const [queryParams, setQueryParams] = React.useState<Record<string, any>>(getParamsFromURL);

  // Set a single query parameter.
  // If set to null, the parameter will be deleted.
  const setQueryParam = React.useCallback(
    (key: string, value: any) => {
      setQueryParams((p) => {
        const newParams = { ...p };
        if (!value || value.length <= 0) {
          delete newParams[key];
        } else {
          newParams[key] = value;
        }
        return newParams;
      });
    },
    [setQueryParams]
  );

  // Update query string in the URL
  React.useEffect(() => {
    const stringifiedQueryParams = Object.fromEntries(
      Object.entries(queryParams).map(([key, value]) => {
        return [key, JSON.stringify(value)];
      })
    );
    const url = new URL(window.location.href);
    url.search = new URLSearchParams(stringifiedQueryParams).toString();
    window.history.pushState({}, "", url.toString());
  }, [queryParams]);

  const value = {
    queryParams,
    setQueryParam,
  };

  return (
    <QueryParamsContext.Provider value={value}>
      {props.children}
    </QueryParamsContext.Provider>
  );
};

// Import this to get and set query parameters.
//
// Usage:
//   const { queryParams, setQueryParam } = useQueryParams();
//
// !! IMPORTANT !!
//   You must wrap your top level component in QueryParamsProvider or
//   useQueryParams will not work!!
export const useQueryParams = (): QueryParamsContextValue => {
  const context = React.useContext(QueryParamsContext);
  if (context === undefined) {
    throw new Error("You must wrap this component in a QueryParamsProvider");
  }
  return context;
};

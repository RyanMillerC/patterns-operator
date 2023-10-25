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
  return Object.fromEntries(url.searchParams.entries());
};

/* Wrap main component in this to provide context */
export const QueryParamsProvider: React.FC<React.PropsWithChildren<any>> = (props) => {
  const [queryParams, setQueryParams] = React.useState<Record<string, any>>(getParamsFromURL);

  const setQueryParam = React.useCallback(
    (key: string, value: any) => {
      setQueryParams((p) => {
        const newParams = { ...p };
        if (!value) {
          delete newParams[key];
        } else {
          newParams[key] = value;
        }
        return newParams;
      });
    },
    [setQueryParams]
  );

  // Update query params in URL
  React.useEffect(() => {
    const url = new URL(window.location.href);
    url.search = new URLSearchParams(queryParams).toString();
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

export const useQueryParams = (): QueryParamsContextValue => {
  const context = React.useContext(QueryParamsContext);
  if (context === undefined) {
    throw new Error("You must wrap this component in a QueryParamsProvider");
  }
  return context;
};

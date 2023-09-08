// Convert a query parameter value to a proper name for filtering
export const queryParamToString = (queryParam: string) => {
  return queryParam.replaceAll("_", " ");
};

// Convert a query parameter value from a CSV to an array with proper names for filtering
export const queryParamToArray = (queryParam: string) => {
  let response = queryParam.split(",");
  response = response.map((item) => {
    return queryParamToString(item);
  });
  return response
}

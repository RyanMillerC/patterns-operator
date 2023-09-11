// Future Functions
//
// String Values:
// * Get
// * Set
// * Delete
//
// Array Values:
// * List // Get array
// * Push // Add to array
// * Pop  // Delete from array
//
// Helper Functions:
// * ToString
// * FromString
// * ToArray
// * FromArray

// URL for getting and setting search (query) parameters
export const getUrl = () => {
  new URL(location.toString());
}

// Get a query parameter from the URL
export const getParam = (name: string) => {
  const url = new URL(location.toString());
  const queryParam = url.searchParams.get(name);
  if (queryParam) {
    return queryParamToString(url.searchParams.get(name));
  }
  return null
}

// Set a query parameter in the URL. If the parameter already exists, overwrite it.
export const setParam = (name: string, value: string) => {
  const url = new URL(location.toString());
  url.searchParams.delete(name);
  url.searchParams.set(name, value);
  window.history.pushState('', '', url.toString());
}

// Delete a query parameter from the URL
export const deleteParam = (name: string) => {
  const url = new URL(location.toString());
  url.searchParams.delete(name);
  window.history.pushState('', '', url.toString());
}

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

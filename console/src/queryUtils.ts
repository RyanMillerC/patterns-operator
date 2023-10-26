/*

!!! Don't use this file, it will be deleted! UseQueryParams instead! !!!

*/

// Future Functions
//
// String Values:
// * get
// * set
// * delete
//
// Array Values:
// * list // Get array
// * push // Add to array
// * drop  // Delete from array
//
// Helper Functions:
// * getUrl
// * toString
// * fromString
// * toArray
// * fromArray

// ------------------------
// --- String Functions ---
// ------------------------

// Get a string query parameter. Will return null if query parameter isn't set.
export const get = (name: string) => {
  const url = getUrl();
  const queryParam = url.searchParams.get(name);
  if (queryParam) {
    return toString(queryParam);
  }
  return null; // Query parameter isn't set
};

// Set a string query parameter. If the parameter already exists, overwrite it with a new value.
export const set = (name: string, value: string) => {
  const url = getUrl();
  url.searchParams.delete(name);
  url.searchParams.set(name, value);
  window.history.pushState('', '', url.toString());
};

// Remove (delete) a query parameter. This will delete the entire query parameter. If you instead want to drop an item from an array (CSV) query parameter, use drop().
export const remove = (name: string) => {
  const url = getUrl();
  url.searchParams.delete(name);
  window.history.pushState('', '', url.toString());
};

// -----------------------
// --- Array Functions ---
// -----------------------

// Get an array (CSV) query parameter. Will return null if query parameter isn't set.
export const list = (name: string) => {
  const response = get(name);
  if (response) {
    return toArray(response);
  }
  return null;
};

// Add an item to an array (CSV) query parameter. This will add the item while keeping all existing items in the array.
export const push = (name: string, value: string) => {
  let param = list(name);
  if (!param) {
    set(name, value);
  } else {
    param.push(value);
    const paramStr = fromArray(param);
    const url = getUrl();
    url.searchParams.delete(name);
    url.searchParams.set(name, paramStr);
    window.history.pushState('', '', url.toString());
  }
};

// Remove (delete) an item from an array (CSV) query parameter. This will only remove the given item. If the given item is the only item in the array, the query parameter will be deleted.
export const pop = (name: string, value: string) => {
  let param = list(name);
  if (param) {
    param = param.filter((item) => item !== value); // Remove item from array
    const paramStr = fromArray(param);
    const url = getUrl();
    url.searchParams.delete(name);
    // If the last remaining item in the array was deleted, there's no reason to write the parameter with an empty value
    if (paramStr) {
      url.searchParams.set(name, paramStr);
    }
    window.history.pushState('', '', url.toString());
  }
};

// ------------------------
// --- Helper Functions ---
// ------------------------

// URL for getting and setting search (query) parameters.
// This shouldn't be needed outside of this file.
const getUrl = () => {
  return new URL(location.toString());
}

// Convert a query parameter value to a proper name for filtering
const toString = (value: string) => {
  return value.replaceAll("+", " ");
};

// Convert a string with spaces into a query parameter
const fromString = (value: string) => {
  return value.replaceAll(" ", "+");
};

// Convert a query parameter value from a CSV to an array with proper names for filtering
const toArray = (value: string) => {
  let response = value.split(",");
  response = response.map((item) => {
    return toString(item);
  });
  return response;
}

// Convert an array of strings into a query parameter CSV with proper names encoded
const fromArray = (value: string[]) => {
  const param = value.map((item) => {
    return fromString(item);
  });
  return param.toString();
}


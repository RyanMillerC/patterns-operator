import * as React from 'react';

// TODO: This is hacky! Fix it!
// https://stackoverflow.com/questions/46240647/how-to-force-a-functional-react-component-to-render
//create your forceUpdate hook
export const useForceUpdate = () => {
    const [value, setValue] = React.useState(0); // integer state
    return () => setValue(() => value + 1); // update state to force render
    // A function that increment 👆🏻 the previous state like he
    // is better than directly setting `setValue(value + 1)`
};

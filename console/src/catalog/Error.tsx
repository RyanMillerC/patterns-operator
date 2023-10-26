import * as React from 'react';
import {
  PageSection,
  Title,
} from '@patternfly/react-core';
import ExclamationCircle from '@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon';

// TODO: This should probably be a danger banner or something else printed in red from Patternfly
const Error = (props: any) => {
  const { error } = props;
  return (
    <>
      <PageSection>
        <Title headingLevel="h4" size="lg">
          <ExclamationCircle /> Error: {error}
        </Title>
      </PageSection>
    </>
  );
}

export default Error;

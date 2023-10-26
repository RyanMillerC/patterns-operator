import * as React from 'react';
import {
  PageSection,
  Title,
} from '@patternfly/react-core';

const Loading = () => {
  // TODO: This should be styled better. Maybe a skeleton page or loading GIF?
  return (
    <>
      <PageSection>
        <Title headingLevel="h4" size="lg">
          Loading...
        </Title>
      </PageSection>
    </>
  );
}

export default Loading;

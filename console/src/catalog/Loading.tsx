import * as React from 'react';
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Title,
} from '@patternfly/react-core';
import CubesIcon from '@patternfly/react-icons/dist/esm/icons/cubes-icon';

const Loading = () => {
  return (
    <>
      <EmptyState>
        <EmptyStateIcon icon={CubesIcon} />
        <Title headingLevel="h4" size="lg">
          No Matching PatternManifests found
        </Title>
        <EmptyStateBody>
          No matching PatternManifests exist in the <code>patterns-operator</code>
          namespace. Import the default catalog.yaml or create a PatternCatalogSource
          and point to and point to your own catalog.yaml.
        </EmptyStateBody>
      </EmptyState>
    </>
  );
}

export default Loading;

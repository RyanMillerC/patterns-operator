import * as React from 'react';
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Title,
} from '@patternfly/react-core';
import { CatalogTile } from '@patternfly/react-catalog-view-extension';
import CubesIcon from '@patternfly/react-icons/dist/esm/icons/cubes-icon';
import CardBadge from './CardBadge';
import { useQueryParams } from '../UseQueryParams';
import Logo from '../img/hcp-logo.png';


// TODO: Type this
const CatalogItems = (props: any) => {
  const { setQueryParam } = useQueryParams();
  const { catalogItems, loading } = props;

  if (loading === true) {
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

  if (catalogItems.length === 0) {
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

  return (
    <>
      {catalogItems.map((item: any) => {
        return (
          <CatalogTile
            className="patterns-console-plugin__card"
            key={item.metadata.name}
            id={item.metadata.name}
            iconImg={Logo}
            iconAlt="Hybrid Cloud Patterns Logo"
            badges={[
              <CardBadge
                key={0}
                text={item.spec.pattern.type}
              />,
            ]}
            title={item.spec.pattern.name}
            vendor={item.spec.organization.name}
            description={item.spec.pattern.description}
            onClick={() => {
              setQueryParam('detailsItem', item.metadata.name);
            }}
          />
        );
      })}
    </>
  );
}
export default CatalogItems;

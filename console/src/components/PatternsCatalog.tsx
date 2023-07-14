import * as React from 'react';
import {
  PageSection,
  Title,
  EmptyState,
  EmptyStateIcon,
  EmptyStateBody,
} from '@patternfly/react-core';
import { CatalogTile } from '@patternfly/react-catalog-view-extension';
import { PatternManifest, patternManifestKind } from '../data/model';
//import { PatternManifest, patternManifestKind, PatternManifestModel } from '../data/model';
import { useK8sWatchResource } from '@openshift-console/dynamic-plugin-sdk';
// import { k8sCreate } from '@openshift-console/dynamic-plugin-sdk';
import CubesIcon from '@patternfly/react-icons/dist/esm/icons/cubes-icon';
import '../main.css';
import PatternsCatalogModal from './PatternsCatalogModal';
import PatternsCatalogItemBadge from './PatternsCatalogItemBadge';

export default function PatternsCatalog() {
  const [patternManifests, loaded, loadError] = useK8sWatchResource<PatternManifest[]>({
    groupVersionKind: patternManifestKind,
    isList: true,
    namespace: 'default',
    namespaced: true,
  });

  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  if (loaded === false) {
    return (
      <>
        <PageSection variant="light">Loading...</PageSection>
      </>
    );
  }

  if (loadError) {
    return (
      <>
        <PageSection variant="light">ERROR: {loadError}</PageSection>
      </>
    );
  }

  if (loaded === true && patternManifests.length === 0) {
    return (
      <>
        <PageSection variant="light">
          <EmptyState>
            <EmptyStateIcon icon={CubesIcon} />
            <Title headingLevel="h4" size="lg">
              No PatternManifests found
            </Title>
            <EmptyStateBody>
              No PatternManifests exist in the <code>default</code> namespace.
              Import the default catalog.yaml or create a PatternCatalogSource
              and point to and point to your own catalog.yaml.
            </EmptyStateBody>
          </EmptyState>
        </PageSection>
      </>
    );
  }

  // https://www.patternfly.org/v4/extensions/catalog-view/catalog-tile
  return (
    <>
      <PageSection className="patterns-console-plugin__cards" variant="light">
        {patternManifests.map((item) => {
          return (
            <CatalogTile
              className="patterns-console-plugin__card"
              key={item.metadata.name}
              id={item.metadata.name}
              // TODO: If we want an image, here's where it goes!
              // iconImg={pfLogo2}
              iconAlt="PatternFly logo"
              badges={[
                <PatternsCatalogItemBadge
                  key={0}
                  text={item.spec.pattern.type}
                />,
              ]}
              title={item.spec.pattern.name}
              vendor={item.spec.organization.name}
              description={item.spec.pattern.description}
              onClick={() => {
                setModalData(item);
                setModalVisible(true);
              }}
            />
          );
        })}
      </PageSection>

      {/* Modal is only visible when a user clicks on a catalog item */}
      <PatternsCatalogModal
        data={modalData}
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}

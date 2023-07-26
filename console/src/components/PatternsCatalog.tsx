import * as React from 'react';
// import { useHistory, useLocation } from 'react-router';
// import { useHistory } from 'react-router';
import {
  SearchInput,
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
import PatternsCatalogFilter from './PatternsCatalogFilter';

import Logo from '../img/hcp-logo.png';

export default function PatternsCatalog() {
  const [patternManifests, loaded, loadError] = useK8sWatchResource<PatternManifest[]>({
    groupVersionKind: patternManifestKind,
    isList: true,
    namespace: 'patterns-operator',
    namespaced: true,
  });

  // TODO: Use this state object for filtering the catalog view
  // const [displayedPatternManifests, setDisplayedPatternManifests] = React.useState<PatternManifest[]>();

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
              No PatternManifests exist in the <code>patterns-operator</code> namespace.
              Import the default catalog.yaml or create a PatternCatalogSource
              and point to and point to your own catalog.yaml.
            </EmptyStateBody>
          </EmptyState>
        </PageSection>
      </>
    );
  }

  // Query parameters are used for filtering and showing a specific Pattern in a modal
  const url = new URL(location.toString());

  // If detailsItem is set and matches a PatternManifest name, show the modal with data
  // for the given pattern.
  const detailsItem = url.searchParams.get('details-item');
  console.log({detailsItem})
  if (detailsItem && detailsItem !== modalData?.metadata?.name) {
    patternManifests.map((item) => {
      if (item.metadata.name === detailsItem) {
        setModalData(item);
        setModalVisible(true);
      }
    });
  }

  // TODO: Use this function to wire up catalog filtering
  //
  // const filterCatalog = () => {
  //   let filteredPatternManifests = patternManifests;
  //   const typeParam = url.searchParams.get('type');
  //   if (typeParam) {
  //     filteredPatternManifests.filter((item) => {
  //       return item.spec.pattern.type === typeParam
  //     });
  //   }
  //   setDisplayedPatternManifests(filteredPatternManifests);
  // }

  return (
    <>
      <PageSection
        className="patterns-console-plugin__catalog_flex_container"
        variant="light"
      >
        <div className="patterns-console-plugin__catalog_side_panel">
          <PatternsCatalogFilter />
        </div>
        <div className="patterns-console-plugin__catalog_content">
          <SearchInput
            className="patterns-console-plugin__catalog_search"
            placeholder="Filter by keyword..."
          />
          <div className="patterns-console-plugin__cards">
            {patternManifests.map((item) => {
              return (
                <CatalogTile
                  className="patterns-console-plugin__card"
                  key={item.metadata.name}
                  id={item.metadata.name}
                  // TODO: If we want an image, here's where it goes!
                  iconImg={Logo}
                  iconAlt="Hybrid Cloud Patterns Logo"
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
                    url.searchParams.set('details-item', item.metadata.name);
                    window.history.pushState('', '', url.toString());
                    // TODO: Can probably take these out and have the logic looking at query parameters set this
                    setModalData(item);
                    setModalVisible(true);
                  }}
                />
              );
            })}
          </div>
        </div>
      </PageSection>

      {/* Modal is only visible when a user clicks on a catalog item */}
      <PatternsCatalogModal
        data={modalData}
        isOpen={modalVisible}
        onClose={() => {
          url.searchParams.delete('details-item');
          window.history.pushState('', '', url.toString());
          setModalVisible(false);
        }}
      />
    </>
  );
}

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
  // Get all PatternManifests through React hook
  const [patternManifests, loaded, loadError] = useK8sWatchResource<PatternManifest[]>({
    groupVersionKind: patternManifestKind,
    isList: true,
    namespace: 'patterns-operator',
    namespaced: true,
  });

  // Used by search box and sidebar filters
  const [filteredPatternManifests, setFilteredPatternManifests] = React.useState<PatternManifest[]>();

  // Used by modal view when a card is clicked
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  const [url, setUrl] = React.useState(new URL(location.toString()));

  // Query parameters are used for filtering and showing a specific Pattern in a modal
  const [queryParams, setQueryParams] = React.useState(url.searchParams);

  console.log("test");

  const filterCatalog = () => {
    // Create a new array with values from patternManifests that will be filtered
    let newFilteredManifests = [];
    newFilteredManifests.push(...patternManifests);

    console.log({newFilteredManifests});

    // Filter by type
    if (queryParams.get('type')) {
      newFilteredManifests.filter((item) => {
        return item.spec.pattern.type === queryParams.get('type')
      });
    }
    setFilteredPatternManifests(newFilteredManifests);
  };

  // Update queryParams if the query parameters in the URL have changed
  const newUrl = new URL(location.toString());
  if (newUrl.toJSON() !== url.toJSON()) {
    setUrl(newUrl);
    setQueryParams(newUrl.searchParams);
    filterCatalog();
  }

  // If detailsItem is set and matches a PatternManifest name, show the modal with data
  // for the given pattern.
  const detailsItem = queryParams.get('details-item');
  if (detailsItem && detailsItem !== modalData?.metadata?.name) {
    patternManifests.map((item) => {
      if (item.metadata.name === detailsItem) {
        setModalData(item);
        setModalVisible(true);
      }
    });
  }

  // TODO: This should return something better
  if (loaded === false) {
    console.log("Loading content");
    return (
      <>
        <PageSection variant="light">Loading...</PageSection>
      </>
    );
  }

  // TODO: This should return something better
  if (loadError) {
    console.error(loadError);
    return (
      <>
        <PageSection variant="light">ERROR: {loadError}</PageSection>
      </>
    );
  }

  // TODO: This is good; Let's move it to another file
  if (loaded === true && filteredPatternManifests && filteredPatternManifests.length === 0) {
    return (
      <>
        <PageSection variant="light">
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
        </PageSection>
      </>
    );
  }

  console.log("This should appear only once");

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
            {filteredPatternManifests.map((item) => {
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

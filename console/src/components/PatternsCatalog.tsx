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
import * as queryUtils from '../queryUtils';

export default function PatternsCatalog() {
  // Get all PatternManifests through React hook
  const [patternManifests, loaded, loadError] = useK8sWatchResource<PatternManifest[]>({
    groupVersionKind: patternManifestKind,
    isList: true,
    namespace: 'patterns-operator',
    namespaced: true,
  });

  // Used by search box and sidebar filters
  // const [filteredPatternManifests, setFilteredPatternManifests] = React.useState<PatternManifest[]>();

  // Used by modal view when a card is clicked
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  // URL for getting and setting search (query) parameters
  const url = new URL(location.toString());

  // Create a new array with values from patternManifests. This array will be
  // filtered and remaining objects in the array will be displayed.
  let filteredPatternManifests = [];
  filteredPatternManifests.push(...patternManifests);

  // Filter by type
  if (url.searchParams.get('type')) {
    filteredPatternManifests = filteredPatternManifests.filter((item) => {
      return item.spec.pattern.type === url.searchParams.get('type')
    });
  }

  // Filter by Products
  if (url.searchParams.get('products')) {
    filteredPatternManifests = filteredPatternManifests.filter((item) => {
      const queryProducts = queryUtils.queryParamToArray(url.searchParams.get('products'))
      const itemProducts = item.spec.pattern.products
      for (const queryProduct of queryProducts) {
        if (itemProducts.indexOf(queryProduct) <= 0) {
          console.log(`${queryProduct} is not in ${itemProducts}`);
          console.log({itemProducts});
          return false
        }
      }
      return true
    });
  }

  // Filter by Search
  if (url.searchParams.get('search')) {
    filteredPatternManifests = filteredPatternManifests.filter((item) => {
      const lowercasePatternName = item.spec.pattern.name.toLowerCase();
      const lowercaseSearchParam = url.searchParams.get('search').toLowerCase();
      return lowercasePatternName.includes(lowercaseSearchParam);
    });
  }

  // If detailsItem is set and matches a PatternManifest name, show the modal with data
  // for the given pattern.
  const detailsItem = url.searchParams.get('details-item');
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
                    queryUtils.setParam('details-item', item.metadata.name);
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
          queryUtils.deleteParam('details-item');
          setModalVisible(false);
        }}
      />
    </>
  );
}

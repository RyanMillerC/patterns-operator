import * as React from 'react';
import {
  PageSection,
  SearchInput,
} from '@patternfly/react-core';
import { PatternManifest, patternManifestKind } from '../data/model';
//import { PatternManifest, patternManifestKind, PatternManifestModel } from '../data/model';
import { useK8sWatchResource } from '@openshift-console/dynamic-plugin-sdk';
// import { k8sCreate } from '@openshift-console/dynamic-plugin-sdk';
import Modal from './Modal';
import Filter from './Filter';
import Loading from './Loading';
import Error from './Error';

import CatalogItems from './CatalogItems';

import { useQueryParams } from '../UseQueryParams';


export default function PatternsCatalog() {
  // Get and set query parameters in the URL
  const { queryParams, setQueryParam } = useQueryParams();

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

  // Create a new array with values from patternManifests. This array will be
  // filtered and remaining objects in the array will be displayed.
  let filteredPatternManifests = [];
  filteredPatternManifests.push(...patternManifests);

  // Filter by type
  if ('type' in queryParams) {
    filteredPatternManifests = filteredPatternManifests.filter((item) => {
      return item.spec.pattern.type === queryParams.type
    });
  }

  // Filter by Products
  // if (url.searchParams.get('products')) {
  //   filteredPatternManifests = filteredPatternManifests.filter((item) => {
  //     const queryProducts = queryUtils.queryParamToArray(url.searchParams.get('products'))
  //     const itemProducts = item.spec.pattern.products
  //     for (const queryProduct of queryProducts) {
  //       if (itemProducts.indexOf(queryProduct) <= 0) {
  //         console.log(`${queryProduct} is not in ${itemProducts}`);
  //         console.log({itemProducts});
  //         return false
  //       }
  //     }
  //     return true
  //   });
  // }

  // Filter by Search
  if ('search' in queryParams) {
    filteredPatternManifests = filteredPatternManifests.filter((item) => {
      const lowercasePatternName = item.spec.pattern.name.toLowerCase();
      const lowercaseSearchParam = queryParams.search.toLowerCase();
      return lowercasePatternName.includes(lowercaseSearchParam);
    });
  }

  console.log(queryParams)

  // If detailsItem is set, show the modal with data from the matching PatternManifest
  if ('detailsItem' in queryParams) {
    if (queryParams.detailsItem !== modalData?.metadata?.name) {
      console.log('detailsItem');
      patternManifests.map((item) => {
        if (item.metadata.name === queryParams.detailsItem) {
          setModalData(item);
          setModalVisible(true);
        }
      });
    }
  } else {
    if (modalVisible === true) {
      setModalData(null);
      setModalVisible(false);
    }
  }

  // Called when search box is typed into
  // TODO: Type this
  const onSearch = (event: any) => {
    setQueryParam('search', event.target.value);
  }

  // Show loading page instead of catalog while loading PatternManifests from OCP API
  if (loaded === false) {
    return (
      <Loading />
    );
  }

  // Show error message instead of catalog if an error loading PatternManifests occurred
  if (loadError) {
    console.error(loadError);
    return (
      <Error error={loadError} />
    );
  }

  return (
    <>
      <PageSection
        className="patterns-console-plugin__catalog_flex_container"
        variant="light"
      >
        <div className="patterns-console-plugin__catalog_side_panel">
          <Filter items={patternManifests} />
        </div>
        <div className="patterns-console-plugin__catalog_content">
          <SearchInput
            className="patterns-console-plugin__catalog_search"
            onChange={onSearch}
            placeholder="Filter by keyword..."
          />
          <div className="patterns-console-plugin__cards">
            <CatalogItems catalogItems={filteredPatternManifests} />
          </div>
        </div>
      </PageSection>

      {/* Modal is only visible when a user clicks on a catalog item */}
      <Modal
        data={modalData}
        isOpen={modalVisible}
        onClose={() => {
          setQueryParam('detailsItem', null);
        }}
      />
    </>
  );
}

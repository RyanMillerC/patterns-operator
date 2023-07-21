import * as React from 'react';
import { FilterSidePanel, FilterSidePanelCategory, FilterSidePanelCategoryItem } from '@patternfly/react-catalog-view-extension';
//import { TextInput } from '@patternfly/react-core';

export default function PatternsCatalogFilter() {
  // TODO: Wire up filtering. At the moment this just looks nice and doesn't actually do anything
  return (
    <FilterSidePanel>
      <FilterSidePanelCategory key="type" title="Type">
        <FilterSidePanelCategoryItem
          key="community"
          count={2}
          checked={false}
        >
          Community
        </FilterSidePanelCategoryItem>
        <FilterSidePanelCategoryItem
          key="validated"
          count={3}
          checked={false}
        >
          Validated
        </FilterSidePanelCategoryItem>
      </FilterSidePanelCategory>
      <FilterSidePanelCategory key="type" title="Industries">
        <FilterSidePanelCategoryItem
          key="chemical"
          count={2}
          checked={false}
        >
          Chemical
        </FilterSidePanelCategoryItem>
        <FilterSidePanelCategoryItem
          key="general"
          count={3}
          checked={false}
        >
          General
        </FilterSidePanelCategoryItem>
        <FilterSidePanelCategoryItem
          key="industrial"
          count={3}
          checked={false}
        >
          Industrial
        </FilterSidePanelCategoryItem>
        <FilterSidePanelCategoryItem
          key="manufacturing"
          count={3}
          checked={false}
        >
          Manufacturing
        </FilterSidePanelCategoryItem>
        <FilterSidePanelCategoryItem
          key="medical"
          count={3}
          checked={false}
        >
          Medical
        </FilterSidePanelCategoryItem>
        <FilterSidePanelCategoryItem
          key="retail"
          count={3}
          checked={false}
        >
          Retail
        </FilterSidePanelCategoryItem>
      </FilterSidePanelCategory>
      <FilterSidePanelCategory key="type" title="Products">
        <FilterSidePanelCategoryItem
          key="red-hat-aap"
          count={3}
          checked={false}
        >
          Red Hat Ansible Automation Platform
        </FilterSidePanelCategoryItem>
        <FilterSidePanelCategoryItem
          key="red-hat-acm"
          count={2}
          checked={false}
        >
          Red Hat Advanced Cluster Management
        </FilterSidePanelCategoryItem>
        <FilterSidePanelCategoryItem
          key="red-hat-acs"
          count={2}
          checked={false}
        >
          Red Hat Advanced Cluster Security
        </FilterSidePanelCategoryItem>
        <FilterSidePanelCategoryItem
          key="red-hat-quay"
          count={2}
          checked={false}
        >
          Red Hat Quay
        </FilterSidePanelCategoryItem>
      </FilterSidePanelCategory>
    </FilterSidePanel>
  )
}

import * as React from 'react';
import { FilterSidePanel, FilterSidePanelCategory, FilterSidePanelCategoryItem } from '@patternfly/react-catalog-view-extension';
//import { TextInput } from '@patternfly/react-core';

export default function PatternsCatalogFilter() {
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
    </FilterSidePanel>
  )
}

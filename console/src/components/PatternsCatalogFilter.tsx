import * as React from 'react';
import { FilterSidePanel, FilterSidePanelCategory, FilterSidePanelCategoryItem } from '@patternfly/react-catalog-view-extension';
//import { TextInput } from '@patternfly/react-core';
//

import * as queryUtils from '../queryUtils';

export default function PatternsCatalogFilter() {
  const toggleCheckbox = (event: any) => {
    const title = event.target.title
    const [queryParam, value] = title.split('.')
    queryUtils.set(queryParam, value);
  }

  const filters = [
    {
      "key": "type",
      "title": "Type",
      "options": [
        "Community",
        "Validated"
      ]
    },
    {
      "key": "industries",
      "title": "Industries",
      "options": [
        "Chemical",
        "General",
        "Industrial",
        "Manufacturing",
        "Medical",
        "Retail"
      ]
    }
  ]

  return (
    <FilterSidePanel>
      {filters.map((filter) => {
        return (
          <FilterSidePanelCategory key={filter.key} title={filter.title}>
            {filter.options.map((item) => {
              return (
                <FilterSidePanelCategoryItem
                  key={item}
                  count={2}
                  checked={false}
                  title={`${filter.key}.${item}`}
                  onClick={toggleCheckbox}
                >
                  {item}
                </FilterSidePanelCategoryItem>
              );
            })}
          </FilterSidePanelCategory>
        );
      })}
    </FilterSidePanel>
  );
  /*
      <FilterSidePanelCategory key="type" title="Type">
        <FilterSidePanelCategoryItem
          key="community"
          count={2}
          checked={false}
          title="Community"
          onClick={toggleCheckbox}
        >
          Community
        </FilterSidePanelCategoryItem>
        <FilterSidePanelCategoryItem
          key="validated"
          count={3}
          checked={false}
          onClick={toggleCheckbox}
        >
          Validated
        </FilterSidePanelCategoryItem>
      </FilterSidePanelCategory>
      <FilterSidePanelCategory key="type" title="Industries">
        <FilterSidePanelCategoryItem
          count={2}
          checked={false}
        >
          Chemical
        </FilterSidePanelCategoryItem>
        <FilterSidePanelCategoryItem
          count={3}
          checked={false}
        >
          General
        </FilterSidePanelCategoryItem>
        <FilterSidePanelCategoryItem
          count={3}
          checked={false}
        >
          Industrial
        </FilterSidePanelCategoryItem>
        <FilterSidePanelCategoryItem
          count={3}
          checked={false}
        >
          Manufacturing
        </FilterSidePanelCategoryItem>
        <FilterSidePanelCategoryItem
          count={3}
          checked={false}
        >
          Medical
        </FilterSidePanelCategoryItem>
        <FilterSidePanelCategoryItem
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
  */
}

import * as React from 'react';
import { FilterSidePanel, FilterSidePanelCategory, FilterSidePanelCategoryItem } from '@patternfly/react-catalog-view-extension';

import * as queryUtils from '../queryUtils';
import { useForceUpdate } from '../forceUpdate';

const Filter = () => {
  const forceUpdate = useForceUpdate();

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
  ];

  const toggleCheckbox = (event: any) => {
    const title = event.target.title;
    const [name, value] = title.split('.');
    const queryParam = queryUtils.list(name);
    if (queryParam && queryParam.includes(value)) {
      console.log(`Popping ${value} from ${queryParam}`);
      queryUtils.pop(name, value);
    } else {
      console.log(`Pushing ${value} to ${queryParam}`);
      queryUtils.push(name, value);
    }
    forceUpdate();
  };

  const checked = (title: string) => {
    const [name, value] = title.split('.');
    const queryParam = queryUtils.list(name);
    if (queryParam && queryParam.includes(value)) {
      return true;
    }
    return false;
  };

  return (
    <FilterSidePanel>
      {filters.map((filter) => {
        return (
          <FilterSidePanelCategory key={filter.key} title={filter.title}>
            {filter.options.map((item) => {
              const title = `${filter.key}.${item}`
              return (
                <FilterSidePanelCategoryItem
                  key={item}
                  count={2}
                  checked={checked(title)}
                  title={title}
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
}

export default Filter;

import * as React from 'react';
import { FilterSidePanel, FilterSidePanelCategory, FilterSidePanelCategoryItem } from '@patternfly/react-catalog-view-extension';

import * as queryUtils from '../queryUtils';
import { useForceUpdate } from '../forceUpdate';
import { PatternManifest } from 'src/data/model';

// TODO: Type this
const Filter = (props: any) => {
  const { items } = props;

  const forceUpdate = useForceUpdate();

  const filters = [
    {
      "key": "type",
      "title": "Type",
      "options": []
    },
    /*
    {
      "key": "industries",
      "title": "Industries",
      "options": []
    }
    */
  ];

  filters.forEach((filter, index) => {
    items.forEach((item: PatternManifest) => {
      // Type
      if (!filter.options.includes(item.spec.pattern.type)) {
        filters[index].options.push(item.spec.pattern.type);
      }
    });
  });

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

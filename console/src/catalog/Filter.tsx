import * as React from 'react';
import { FilterSidePanel, FilterSidePanelCategory, FilterSidePanelCategoryItem } from '@patternfly/react-catalog-view-extension';

import * as queryUtils from '../queryUtils';
import { PatternManifest } from 'src/data/model';
import { useQueryParams } from '../UseQueryParams';

// TODO: Type this
const Filter = (props: any) => {
  const { items } = props;

  const { queryParams, setQueryParam } = useQueryParams();

  // Filters on the sidebar will be displayed in the order they appear in this object
  // TODO: Not sure about JS but in other languages objects aren't guaranteed to
  // remain ordered. This might need adjusted.
  const filters = {
    "type": {
      "title": "Type",
      "options": [],
    },
    "product": {
      "title": "Product",
      "options": [],
    },
  };

  items.forEach((item: PatternManifest) => {
    // Product
    item.spec.pattern.products.forEach((product) => {
      if (!filters.product.options.includes(product)) {
        filters.product.options.push(product);
      }
    });

    // Type
    if (!filters.type.options.includes(item.spec.pattern.type)) {
      filters.type.options.push(item.spec.pattern.type);
    }
  });

  const toggleCheckbox = (event: any) => {
    const title = event.target.title;
    const [name, value] = title.split('.');
    const queryParam = queryParams[name];

    console.log("Look at me!");
    console.log(queryParam[0]);

    if (!queryParam) {
      const newQueryParam = [value];
      setQueryParam(name, newQueryParam);
    } else if (queryParam.includes(value)) {
      const newQueryParam = queryParam.filter((item: string) => item !== value)
      setQueryParam(name, newQueryParam);
    } else {
      const newQueryParam = queryParam.push(value);
      setQueryParam(name, newQueryParam);
    }
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
      {Object.entries(filters).map(([key, value]) => {
        return (
          <FilterSidePanelCategory key={key} title={value.title}>
            {value.options.map((item) => {
              const title = `${key}.${item}`
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

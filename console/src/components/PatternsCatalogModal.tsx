import * as React from 'react';
import { Button, Modal, PageSection } from '@patternfly/react-core';
import { PropertiesSidePanel, PropertyItem } from '@patternfly/react-catalog-view-extension';
import { PatternManifest } from '../data/model';
import '../main.css';

interface PatternsCatalogModelProps {
  data?: PatternManifest;
  isOpen: boolean;
  onClose: any; // TODO: This is function; Maybe tell TypeScript that?
};

export default function PatternsCatalogModel(props: PatternsCatalogModelProps) {
  // TODO: Find a better way to check/validate that data comes in
  if (!props.data) {
    return null;
  }

  const data = props.data

  const onClick = () => {
    // TODO: This should be refactored. What's here works, but it refreshes the page,
    // which reloads React. Tried using Redirect from react-router-dom unsuccessfully.
    window.location.href = `/patterns/deploy?name=${props.data.metadata.name}`;
  }

  const maintainersToString = () => {
    /*
    let maintainers = new Array<string>();
    data.spec.pattern.maintainers.map((item) => {
      maintainers.push(`${item.name} <${item.email}>`);
    });
    return maintainers.join(', ');
    */
    // TODO: The controller is not populating the maintainers field on PatternManifests. Once that is fixed, this hack can be removed.
    return "Validated Patterns Team <team-validated-patterns@redhat.com>"
  }

  return (
    <Modal
      isOpen={props.isOpen}
      //hasNoBodyWrapper={true}
      onClose={props.onClose}
      title={data.spec.pattern.name}
      // variant={ModalVariant.medium}
      className="patterns-console-plugin__catalog_modal"
    >
      <PageSection>
        <Button
          className="patterns-console-plugin__catalog_modal_button"
          key="deploy"
          onClick={onClick}
          variant="primary"
          isDisabled
        >
          Deploy Pattern (Not yet implemented)
        </Button>
        <Button
          className="patterns-console-plugin__catalog_modal_button"
          key="deploycustom"
          onClick={onClick}
          variant="secondary"
        >
          Deploy with Customizations
        </Button>
      </PageSection>
      {/* TODO: This shouldn't be a div */}
      <div className="patterns-console-plugin__catalog_modal_flex_container">
        <PageSection>
          <PropertiesSidePanel className="patterns-console-plugin__catalog_modal_properties_side_panel">
            <PropertyItem label="Provider" value={data.spec.organization.name} />
            <PropertyItem label="Type" value={data.spec.pattern.type} />
            <PropertyItem
              label="URL"
              value={
                <a
                  href={data.spec.pattern.url}
                  rel="noopener"
                  target="_blank"
                >
                  {data.spec.pattern.url}
                </a>
              }
            />
            <PropertyItem
              label="Git Repo"
              value={
                <a
                  href={data.spec.pattern.gitRepo}
                  rel="noopener"
                  target="_blank"
                >
                  {data.spec.pattern.gitRepo}
                </a>
              }
            />
            <PropertyItem label="Git Branch" value={data.spec.pattern.branch} />
            <PropertyItem label="Maintainers" value={maintainersToString()} />
          </PropertiesSidePanel>
        </PageSection>

        <br /> {/* TODO: Replace this hack */}

        {/* TODO: Not sure PageSection is being used right */}
        <PageSection className="patterns-console-plugin__catalog_modal_content">
          <h2>Description</h2>
          <p>{data.spec.pattern.longDescription}</p>
          <br />
          <h2>Products</h2>
          <ul>
            {
              data.spec.pattern.products.map((item) => {
                return (
                  <li>{item}</li>
                );
              })
            }
          </ul>
        </PageSection>

        {/*
          <p><b>Branch:</b> {data.spec.pattern.branch}</p>
          <p><b>Type:</b> {data.spec.pattern.type}</p>
          <p><b>URL:</b> <a href={data.spec.pattern.url}>{data.spec.pattern.url}</a></p>
          <p>
            <b>Products:</b>
            <ul>
              {data.spec.pattern.products.map((item) => {
                return <li key={item}>{item}</li>;
              })}
            </ul>
          </p>
        </div>
        */}
      </div>
    </Modal>
  );
}

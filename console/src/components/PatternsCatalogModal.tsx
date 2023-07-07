import * as React from 'react';
import { Button, Modal, ModalVariant } from '@patternfly/react-core';
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
    window.location.href = `/patterns-catalog/deploy?name=${props.data.metadata.name}`;
  }

  return (
    <>
      <Modal
        actions={[
          <Button onClick={onClick} key="confirm" variant="primary">
            Deploy Pattern
          </Button>,
        ]}
        isOpen={props.isOpen}
        onClose={props.onClose}
        title={data.spec.pattern.name}
        variant={ModalVariant.medium}
      >
        <h2>Organization</h2>
        <p><b>Name:</b> {data.spec.organization.name}</p>
        <p><b>Description:</b> {data.spec.organization.description}</p>
        <p><b>URL:</b> <a href={data.spec.organization.url}>{data.spec.organization.url}</a></p>
        {/* <p><b>Maintainers:</b> {data.spec.organization.maintainers}</p> /*}
        <br /> {/* TODO: Replace this hack */}
        <h2>Pattern</h2>
        <p><b>Name:</b> {data.spec.pattern.name}</p>
        <p><b>Description:</b> {data.spec.pattern.longDescription}</p>
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
      </Modal>
    </>
  );
}

import * as React from 'react';
import Helmet from 'react-helmet';
import { Page, PageSection, TextContent, Text, Title } from '@patternfly/react-core';
import '../main.css';

export default function PatternsDeployPage() {
  return (
    <>
      <Helmet>
        <title>Deploy Pattern</title>
      </Helmet>
      <Page>
        <PageSection variant="light">
          <Title headingLevel="h1">Deploy Pattern</Title>
        </PageSection>
        <PageSection variant="light">
          <TextContent>
            <Text component="p">
              Deploy a Hybrid Cloud Pattern from this page.
            </Text>
          </TextContent>
        </PageSection>
      </Page>
    </>
  );
}

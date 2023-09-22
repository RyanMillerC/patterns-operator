import * as React from 'react';
import Helmet from 'react-helmet';
import { Page, PageSection, TextContent, Text, Title } from '@patternfly/react-core';
import YAMLEditor from './YAMLEditor';
import '../main.css';

const DeployPage = () => {
  const searchParams = new URLSearchParams(document.location.search)
  const name = searchParams.get('name');
  return (
    <>
      <Helmet>
        <title>Deploy Pattern</title>
      </Helmet>
      <Page>
        <PageSection variant="light">
          <Title headingLevel="h1">Deploy Pattern</Title>
          <TextContent>
            <Text component="p">
              Deploy a Hybrid Cloud Pattern from this page.
            </Text>
          </TextContent>
        </PageSection>

        {/* Don't put DeployYAMLEditor inside a PageSection, it will make the height crazy short */}
        <YAMLEditor patternName={name} />
      </Page>
    </>
  );
}

export default DeployPage;

import * as React from 'react';
import Helmet from 'react-helmet';
import { Page, PageSection, TextContent, Text, Title } from '@patternfly/react-core';
import Catalog from './Catalog';
import '../main.css';
import { QueryParamsProvider } from '../UseQueryParams';

const CatalogPage = () => {
  return (
    <div> {/* TODO: div probably isn't needed */}
      <QueryParamsProvider>
        <Helmet>
          <title data-test="example-page-title">Patterns Catalog</title>
        </Helmet>
        <Page>
          <PageSection variant="light">
            <Title headingLevel="h1">Patterns Catalog</Title>
          </PageSection>
          <PageSection variant="light">
            <TextContent>
              <Text component="p">
                <a
                  href="https://hybrid-cloud-patterns.io/"
                  rel="noopener"
                  target="_blank"
                >
                  Hybrid Cloud Patterns{' '} {/* Force space between words */}
                </a>
                are an evolution of how you deploy applications in
                a hybrid cloud. With a pattern, you can automatically deploy a
                full application stack through a GitOps-based framework. With this
                framework, you can create business-centric solutions while
                maintaining a level of Continuous Integration (CI) over your
                application.
              </Text>
            </TextContent>
          </PageSection>
          <Catalog />
        </Page>
      </QueryParamsProvider>
    </div>
  );
}

export default CatalogPage;

import * as React from 'react';
// import Helmet from 'react-helmet';
// import { Page, PageSection, TextContent, Text, Title } from '@patternfly/react-core';
// import { Text } from '@patternfly/react-core';
// import { DeployYAMLEditor } from '../components/DeployYAMLEditor';

import { k8sGet, ResourceYAMLEditor } from '@openshift-console/dynamic-plugin-sdk';
import { PatternManifest, PatternManifestModel } from '../data/model';
// import { PatternManifest, patternManifestKind } from '../data/model';
export default function PatternsDeployPage(props: any) {
  // const [patternManifest, setPatternManifest] = React.useState(null);
  const [patternManifest, setPatternManifest] = React.useState<PatternManifest>();
  const [error, setError] = React.useState<String>();

  React.useEffect(() => {
    const fetchPatternManifest = async () => {
      console.log('================START================')
      try {
        const fetchedPatternManifest: PatternManifest = await k8sGet({
          model: PatternManifestModel,
          ns: 'default',
          name: props.patternName
        });
        setPatternManifest(fetchedPatternManifest);
      } catch (e) {
        console.error(e.message);
        setError(e.message);
      }
      console.log('================END================')
    };
    fetchPatternManifest();
  }, []);

  if (error) {
    // TODO: Style this error
    return (
      <p>ERROR: {error}</p>
    )
  }

  if (!patternManifest) {
    // TODO: Style this loading message
    return (
      <p>Loading...</p>
    );
  }

  const initialPatternResource: any = {
    apiVersion: 'gitops.hybrid-cloud-patterns.io/v1alpha1',
    kind: 'Pattern',
    metadata: {
      name: 'pattern-sample',
      namespace: 'default'
    },
    spec: {
      clusterGroupName: 'hub',
      gitSpec: {
        targetRepo: patternManifest.spec.pattern.gitRepo,
        targetRevision: 'main'
      }
    }
  };

//   const initialResource = `apiVersion: gitops.hybrid-cloud-patterns.io/v1alpha1
// kind: Pattern
// metadata:
//   name: ${}
//   namespace: openshift-operators
// spec:
//   gitSpec:
//     targetRepo: 'https://github.com/hybrid-cloud-patterns/multicloud-gitops'
//     targetRevision: main
//   clusterGroupName: hub
// `;

  console.log(patternManifest);

  // return (
  //   <React.Suspense fallback={<Text>Loading</Text>}>
  //     <ResourceYAMLEditor
  //       initialResource={initialResource}
  //       header={`Deploy ${props.patternName}`}
  //       {/* onSave={(content) => updateResource(content)} */}
  //     />
  //   </React.Suspense>
  // );
  return (
    <React.Suspense fallback={<ResourceYAMLEditorLoading />}>
      <ResourceYAMLEditor
        initialResource={initialPatternResource}
        header="Deploy Pattern"
      />
    </React.Suspense>
  );
}

// Shown while YAML editor is loading
function ResourceYAMLEditorLoading() {
  return (
    <p>Loading...</p>
  );
}

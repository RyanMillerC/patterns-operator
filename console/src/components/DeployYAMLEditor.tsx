import * as React from 'react';
// import Helmet from 'react-helmet';
// import { Page, PageSection, TextContent, Text, Title } from '@patternfly/react-core';
import { Alert } from '@patternfly/react-core';
// import { Text } from '@patternfly/react-core';
// import { DeployYAMLEditor } from '../components/DeployYAMLEditor';

import {  k8sCreate, k8sGet, ResourceYAMLEditor } from '@openshift-console/dynamic-plugin-sdk';
import { PatternManifest, PatternManifestModel } from '../data/model';
import { Pattern, PatternModel } from '../data/pattern';
// import { PatternManifest, patternManifestKind } from '../data/model';

import yaml from 'js-yaml';

export default function PatternsDeployPage(props: any) {
  const [patternManifest, setPatternManifest] = React.useState<PatternManifest>();
  const [error, setError] = React.useState<string>();

  React.useEffect(() => {
    const fetchPatternManifest = async () => {
      try {
        const fetchedPatternManifest: PatternManifest = await k8sGet({
          model: PatternManifestModel,
          ns: 'patterns-operator', // TODO: Maybe look at all namespaces?
          name: props.patternName
        });
        setPatternManifest(fetchedPatternManifest);
      } catch (e) {
        console.error(e.message);
        setError(e.message);
      }
    };
    fetchPatternManifest();
  }, []);

  /*
  if (error) {
    // TODO: Style this error
    return (
      <p>ERROR: {error}</p>
    )
  }
  */

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
      name: patternManifest.metadata.name,
      namespace: 'patterns-operator'
    },
    spec: {
      clusterGroupName: 'hub', // TODO: Is this needed?
      gitSpec: {
        targetRepo: patternManifest.spec.pattern.gitRepo,
        targetRevision: patternManifest.spec.pattern.branch
      }
    }
  };

  // We have to use our own onSave function to create a Pattern. The
  // default onSave behavior of ResourceYAMLEditor won't create new
  // resources, it will only update existing resources.
  //
  // TODO: Type content
  const createPattern = async (content: any) => {
    // TODO: There's probably a better way to catch specific errors instead of two generic try/catches
    let jsonContent: Pattern;
    try {
      jsonContent = yaml.load(content);
    } catch (e) {
      console.error(e.message);
      setError(`Invalid YAML syntax: ${e.message}`);
      return
    }

    try {
      await k8sCreate({
        model: PatternModel,
        ns: jsonContent.metadata.namespace,
        data: jsonContent
      });

      // If successful, redirect to the new Pattern resource
      window.location.href = `/k8s/ns/patterns-operator/clusterserviceversions/patterns-operator.v0.0.17/gitops.hybrid-cloud-patterns.io~v1alpha1~Pattern/${jsonContent.metadata.name}`
    } catch (e) {
      console.error(e.message);
      setError(e.message);
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
    <>
      <React.Suspense fallback={<ResourceYAMLEditorLoading />}>
        <ResourceYAMLEditor
          initialResource={initialPatternResource}
          header="Deploy Pattern"
          onSave={(content) => createPattern(content)}
        />
      </React.Suspense>
      {error &&
        // The dynamic plugin SDK includes an ErrorStatus component. It
        // only includes the danger symbol and text, not the actual alert
        // border. It's easier to use PatternFly's Alert.
        //
        // This will display the alert under the Save/Reload/Cancel buttons,
        // this is different from the way OpenShift displays alerts.
        // There's no way to move the alert above the buttons, since
        // ResourceYAMLEditor is a single component.
        //
        // If you use a PageSection for anything after the ResourceYAMLEditor,
        // it will shrink the editor height. It's easier to add margin with
        // a CSS class.
        <Alert
          className="patterns-console-plugin__deploy_yaml_alert"
          title={error}
          variant="danger"
        />
      }
    </>
  );
}

// Shown while YAML editor is loading
function ResourceYAMLEditorLoading() {
  return (
    <p>Loading...</p>
  );
}

import {
  K8sGroupVersionKind,
  K8sResourceCommon,
} from '@openshift-console/dynamic-plugin-sdk';
import { K8sModel } from '@openshift-console/dynamic-plugin-sdk/lib/api/common-types';

export const patternKind: K8sGroupVersionKind = {
  version: 'v1alpha1',
  group: 'gitops.hybrid-cloud-patterns.io',
  kind: 'Pattern',
};

// TODO: Add spec and status properties
export type Pattern = {
  spec: any,
  status: any
} & K8sResourceCommon;

export const PatternModel: K8sModel = {
  apiVersion: patternKind.version,
  apiGroup: patternKind.group,
  label: patternKind.kind,
  labelKey: patternKind.kind,
  plural: 'patterns',
  abbr: '',
  namespaced: true,
  crd: true,
  kind: patternKind.kind,
  id: 'pattern',
  labelPlural: 'Patterns',
  labelPluralKey: 'Pattern',
};

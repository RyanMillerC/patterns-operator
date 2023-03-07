//go:build !ignore_autogenerated
// +build !ignore_autogenerated

/*
Copyright 2022.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// Code generated by controller-gen. DO NOT EDIT.

package v1alpha1

import (
	runtime "k8s.io/apimachinery/pkg/runtime"
)

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *GitConfig) DeepCopyInto(out *GitConfig) {
	*out = *in
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new GitConfig.
func (in *GitConfig) DeepCopy() *GitConfig {
	if in == nil {
		return nil
	}
	out := new(GitConfig)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *GitOpsConfig) DeepCopyInto(out *GitOpsConfig) {
	*out = *in
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new GitOpsConfig.
func (in *GitOpsConfig) DeepCopy() *GitOpsConfig {
	if in == nil {
		return nil
	}
	out := new(GitOpsConfig)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *Pattern) DeepCopyInto(out *Pattern) {
	*out = *in
	out.TypeMeta = in.TypeMeta
	in.ObjectMeta.DeepCopyInto(&out.ObjectMeta)
	in.Spec.DeepCopyInto(&out.Spec)
	in.Status.DeepCopyInto(&out.Status)
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new Pattern.
func (in *Pattern) DeepCopy() *Pattern {
	if in == nil {
		return nil
	}
	out := new(Pattern)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyObject is an autogenerated deepcopy function, copying the receiver, creating a new runtime.Object.
func (in *Pattern) DeepCopyObject() runtime.Object {
	if c := in.DeepCopy(); c != nil {
		return c
	}
	return nil
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *PatternCatalogSource) DeepCopyInto(out *PatternCatalogSource) {
	*out = *in
	out.TypeMeta = in.TypeMeta
	in.ObjectMeta.DeepCopyInto(&out.ObjectMeta)
	out.Spec = in.Spec
	in.Status.DeepCopyInto(&out.Status)
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new PatternCatalogSource.
func (in *PatternCatalogSource) DeepCopy() *PatternCatalogSource {
	if in == nil {
		return nil
	}
	out := new(PatternCatalogSource)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyObject is an autogenerated deepcopy function, copying the receiver, creating a new runtime.Object.
func (in *PatternCatalogSource) DeepCopyObject() runtime.Object {
	if c := in.DeepCopy(); c != nil {
		return c
	}
	return nil
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *PatternCatalogSourceList) DeepCopyInto(out *PatternCatalogSourceList) {
	*out = *in
	out.TypeMeta = in.TypeMeta
	in.ListMeta.DeepCopyInto(&out.ListMeta)
	if in.Items != nil {
		in, out := &in.Items, &out.Items
		*out = make([]PatternCatalogSource, len(*in))
		for i := range *in {
			(*in)[i].DeepCopyInto(&(*out)[i])
		}
	}
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new PatternCatalogSourceList.
func (in *PatternCatalogSourceList) DeepCopy() *PatternCatalogSourceList {
	if in == nil {
		return nil
	}
	out := new(PatternCatalogSourceList)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyObject is an autogenerated deepcopy function, copying the receiver, creating a new runtime.Object.
func (in *PatternCatalogSourceList) DeepCopyObject() runtime.Object {
	if c := in.DeepCopy(); c != nil {
		return c
	}
	return nil
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *PatternCatalogSourceSpec) DeepCopyInto(out *PatternCatalogSourceSpec) {
	*out = *in
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new PatternCatalogSourceSpec.
func (in *PatternCatalogSourceSpec) DeepCopy() *PatternCatalogSourceSpec {
	if in == nil {
		return nil
	}
	out := new(PatternCatalogSourceSpec)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *PatternCatalogSourceStatus) DeepCopyInto(out *PatternCatalogSourceStatus) {
	*out = *in
	in.LastUpdateTime.DeepCopyInto(&out.LastUpdateTime)
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new PatternCatalogSourceStatus.
func (in *PatternCatalogSourceStatus) DeepCopy() *PatternCatalogSourceStatus {
	if in == nil {
		return nil
	}
	out := new(PatternCatalogSourceStatus)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *PatternCondition) DeepCopyInto(out *PatternCondition) {
	*out = *in
	in.LastUpdateTime.DeepCopyInto(&out.LastUpdateTime)
	in.LastTransitionTime.DeepCopyInto(&out.LastTransitionTime)
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new PatternCondition.
func (in *PatternCondition) DeepCopy() *PatternCondition {
	if in == nil {
		return nil
	}
	out := new(PatternCondition)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *PatternList) DeepCopyInto(out *PatternList) {
	*out = *in
	out.TypeMeta = in.TypeMeta
	in.ListMeta.DeepCopyInto(&out.ListMeta)
	if in.Items != nil {
		in, out := &in.Items, &out.Items
		*out = make([]Pattern, len(*in))
		for i := range *in {
			(*in)[i].DeepCopyInto(&(*out)[i])
		}
	}
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new PatternList.
func (in *PatternList) DeepCopy() *PatternList {
	if in == nil {
		return nil
	}
	out := new(PatternList)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyObject is an autogenerated deepcopy function, copying the receiver, creating a new runtime.Object.
func (in *PatternList) DeepCopyObject() runtime.Object {
	if c := in.DeepCopy(); c != nil {
		return c
	}
	return nil
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *PatternManifest) DeepCopyInto(out *PatternManifest) {
	*out = *in
	out.TypeMeta = in.TypeMeta
	in.ObjectMeta.DeepCopyInto(&out.ObjectMeta)
	out.Spec = in.Spec
	out.Status = in.Status
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new PatternManifest.
func (in *PatternManifest) DeepCopy() *PatternManifest {
	if in == nil {
		return nil
	}
	out := new(PatternManifest)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyObject is an autogenerated deepcopy function, copying the receiver, creating a new runtime.Object.
func (in *PatternManifest) DeepCopyObject() runtime.Object {
	if c := in.DeepCopy(); c != nil {
		return c
	}
	return nil
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *PatternManifestList) DeepCopyInto(out *PatternManifestList) {
	*out = *in
	out.TypeMeta = in.TypeMeta
	in.ListMeta.DeepCopyInto(&out.ListMeta)
	if in.Items != nil {
		in, out := &in.Items, &out.Items
		*out = make([]PatternManifest, len(*in))
		for i := range *in {
			(*in)[i].DeepCopyInto(&(*out)[i])
		}
	}
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new PatternManifestList.
func (in *PatternManifestList) DeepCopy() *PatternManifestList {
	if in == nil {
		return nil
	}
	out := new(PatternManifestList)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyObject is an autogenerated deepcopy function, copying the receiver, creating a new runtime.Object.
func (in *PatternManifestList) DeepCopyObject() runtime.Object {
	if c := in.DeepCopy(); c != nil {
		return c
	}
	return nil
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *PatternManifestSpec) DeepCopyInto(out *PatternManifestSpec) {
	*out = *in
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new PatternManifestSpec.
func (in *PatternManifestSpec) DeepCopy() *PatternManifestSpec {
	if in == nil {
		return nil
	}
	out := new(PatternManifestSpec)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *PatternManifestStatus) DeepCopyInto(out *PatternManifestStatus) {
	*out = *in
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new PatternManifestStatus.
func (in *PatternManifestStatus) DeepCopy() *PatternManifestStatus {
	if in == nil {
		return nil
	}
	out := new(PatternManifestStatus)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *PatternParameter) DeepCopyInto(out *PatternParameter) {
	*out = *in
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new PatternParameter.
func (in *PatternParameter) DeepCopy() *PatternParameter {
	if in == nil {
		return nil
	}
	out := new(PatternParameter)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *PatternSpec) DeepCopyInto(out *PatternSpec) {
	*out = *in
	out.GitConfig = in.GitConfig
	if in.GitOpsConfig != nil {
		in, out := &in.GitOpsConfig, &out.GitOpsConfig
		*out = new(GitOpsConfig)
		**out = **in
	}
	if in.ExtraParameters != nil {
		in, out := &in.ExtraParameters, &out.ExtraParameters
		*out = make([]PatternParameter, len(*in))
		copy(*out, *in)
	}
	if in.ExtraValueFiles != nil {
		in, out := &in.ExtraValueFiles, &out.ExtraValueFiles
		*out = make([]string, len(*in))
		copy(*out, *in)
	}
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new PatternSpec.
func (in *PatternSpec) DeepCopy() *PatternSpec {
	if in == nil {
		return nil
	}
	out := new(PatternSpec)
	in.DeepCopyInto(out)
	return out
}

// DeepCopyInto is an autogenerated deepcopy function, copying the receiver, writing into out. in must be non-nil.
func (in *PatternStatus) DeepCopyInto(out *PatternStatus) {
	*out = *in
	if in.Conditions != nil {
		in, out := &in.Conditions, &out.Conditions
		*out = make([]PatternCondition, len(*in))
		for i := range *in {
			(*in)[i].DeepCopyInto(&(*out)[i])
		}
	}
}

// DeepCopy is an autogenerated deepcopy function, copying the receiver, creating a new PatternStatus.
func (in *PatternStatus) DeepCopy() *PatternStatus {
	if in == nil {
		return nil
	}
	out := new(PatternStatus)
	in.DeepCopyInto(out)
	return out
}

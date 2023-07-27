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

package v1alpha1

import (
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// EDIT THIS FILE!  THIS IS SCAFFOLDING FOR YOU TO OWN!
// NOTE: json tags are required.  Any new fields you add must have json tags for the fields to be serialized.

// !!!
// IMPORTANT: Run "make" to regenerate code after modifying this file
// !!!

type PatternManifestSpecMaintainer struct {
	// Name of the maintainer
	Name string `json:"name,omitempty"`

	// Email address of the maintainer
	Email string `json:"email,omitempty"`
}

type PatternManifestSpecOrganization struct {
	// Name of the organization that provides this pattern
	Name string `json:"name,omitempty"`

	// Description of the organization that provides this pattern
	Description string `json:"description,omitempty"`

	// List of organization maintainers.  NOTE: This can be a different than the
	// maintainers of the pattern itself.
	Maintainers []PatternManifestSpecMaintainer `json:"maintainers,omitempty"`

	// URL of the organization that provides this pattern
	URL string `json:"url,omitempty"`
}

type PatternManifestSpecPattern struct {
	// Display name of the pattern. This should have spaces and capitalization.
	Name string `json:"name,omitempty"`

	// Short description of the pattern. Will be used in the catalog on the card
	// for this pattern. If it's too long, the catalog will truncate the text.
	Description string `json:"description,omitempty"`

	// Longer description of the pattern. Will be used in the catalog when a
	// user clicks on the card to see detauls for this pattern.
	LongDescription string `json:"longDescription,omitempty"`

	// Git Branch to use for the pattern
	Branch string `json:"branch,omitempty"`

	// URL to the Git repo for the pattern. This should start with "http://" or
	// "https://" and end with ".git".
	GitRepo string `json:"gitRepo,omitempty"`

	// List of pattern maintainers
	Maintainers []PatternManifestSpecMaintainer `json:"maintainers,omitempty"`

	// List of products used by the pattern
	Products []string `json:"products,omitempty"`

	// Type of pattern. For example, "Community" or "Validated".
	Type string `json:"type,omitempty"`

	// URL to the Git repo for the pattern
	URL string `json:"url,omitempty"`
}

// PatternManifestSpec defines the desired state of PatternManifest
type PatternManifestSpec struct {
	// Information about the organization that provides this pattern
	Organization PatternManifestSpecOrganization `json:"organization,omitempty"`

	// Information about the pattern
	Pattern PatternManifestSpecPattern `json:"pattern,omitempty"`
}

// PatternManifestStatus defines the observed state of PatternManifest
type PatternManifestStatus struct {
	// LastUpdateTime is the last time the YAML catalog file was synced
	LastUpdateTime metav1.Time `json:"lastUpdateTime,omitempty"`
}

//+kubebuilder:object:root=true
//+kubebuilder:subresource:status

// PatternManifest contains organization and pattern metadata for a single pattern
type PatternManifest struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   PatternManifestSpec   `json:"spec,omitempty"`
	Status PatternManifestStatus `json:"status,omitempty"`
}

//+kubebuilder:object:root=true

// PatternManifestList contains a list of PatternManifest
type PatternManifestList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []PatternManifest `json:"items"`
}

func init() {
	SchemeBuilder.Register(&PatternManifest{}, &PatternManifestList{})
}

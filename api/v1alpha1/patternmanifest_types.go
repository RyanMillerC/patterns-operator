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

type PatternManifestSpecOrganization struct {
	// Name of the organization that provides this pattern
	Name string `json:"name,omitempty"`

	// Description of the organization that provides this pattern
	Description string `json:"description,omitempty"`

	// Email address of the maintainers of the organization that provides this
	// pattern. NOTE: this can be a different than the maintainers of the pattern
	// itself.
	Maintainers string `json:"maintainers,omitempty"`

	// URL of the organization that provides this pattern
	URL string `json:"url,omitempty"`
}

type PatternManifestSpecPattern struct {
	// Badge text to display in the catalog view
	Badge string `json:"badge,omitempty"`

	// Git Branch to use for the pattern
	Branch string `json:"branch,omitempty"`

	// Short description of the pattern. Will be used in the catalog on the card
	// for this pattern. If it's too long, the catalog will truncate the text.
	ShortDescription string `json:"shortDescription,omitempty"`

	// Longer description of the pattern. Will be used in the catalog when a
	// user clicks on the card to see detauls for this pattern.
	LongDescription string `json:"longDescription,omitempty"`

	// Email address of the maintainers of the pattern
	Maintainers string `json:"maintainers,omitempty"`

	// Display name of the pattern. This should have spaces and capitalization.
	Name string `json:"name,omitempty"`

	// Products used by the pattern
	Products []PatternManifestProduct `json:"products,omitempty"`

	// URL to the Git repo for the pattern
	URL string `json:"url,omitempty"`
}

type PatternManifestProduct struct {
	// Name of the product
	Name string `json:"name,omitempty"`

	// Version of the product. Try to stick to major/minor release versions
	// instead of specific patch versions.
	Version string `json:"version,omitempty"`
}

// PatternManifestSpec defines the desired state of PatternManifest
type PatternManifestSpec struct {
	// INSERT ADDITIONAL SPEC FIELDS - desired state of cluster
	// Important: Run "make" to regenerate code after modifying this file

	// Information about the organization that provides this pattern
	Organization PatternManifestSpecOrganization `json:"organization,omitempty"`

	// Information about the pattern
	Pattern PatternManifestSpecPattern `json:"pattern,omitempty"`
}

// PatternManifestStatus defines the observed state of PatternManifest
type PatternManifestStatus struct {
	// INSERT ADDITIONAL STATUS FIELD - define observed state of cluster
	// Important: Run "make" to regenerate code after modifying this file
}

//+kubebuilder:object:root=true
//+kubebuilder:subresource:status

// PatternManifest is the Schema for the patternmanifests API
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

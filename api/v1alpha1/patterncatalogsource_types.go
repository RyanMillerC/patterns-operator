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

// PatternCatalogSourceSpec defines the desired state of PatternCatalogSource
type PatternCatalogSourceSpec struct {
	// INSERT ADDITIONAL SPEC FIELDS - desired state of cluster
	// Important: Run "make" to regenerate code after modifying this file

	// Source is a URL to a YAML catalog file. This should start with http/https
	Source string `json:"source,omitempty"`

	// Pull catalog updates from the source on this interval. Default is "10m"
	UpdateInterval string `json:"updateInterval,omitempty"`
}

// PatternCatalogSourceStatus defines the observed state of PatternCatalogSource
type PatternCatalogSourceStatus struct {
	// INSERT ADDITIONAL STATUS FIELD - define observed state of cluster
	// Important: Run "make" to regenerate code after modifying this file

	// LastUpdateTime is the last time the YAML catalog file was synced
	LastUpdateTime metav1.Time `json:"lastUpdateTime,omitempty"`
}

//+kubebuilder:object:root=true
//+kubebuilder:subresource:status

// PatternCatalogSource points to a remote Catalog YAML manifest that contains metadata about available patterns
type PatternCatalogSource struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   PatternCatalogSourceSpec   `json:"spec,omitempty"`
	Status PatternCatalogSourceStatus `json:"status,omitempty"`
}

//+kubebuilder:object:root=true

// PatternCatalogSourceList contains a list of PatternCatalogSource
type PatternCatalogSourceList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []PatternCatalogSource `json:"items"`
}

func init() {
	SchemeBuilder.Register(&PatternCatalogSource{}, &PatternCatalogSourceList{})
}
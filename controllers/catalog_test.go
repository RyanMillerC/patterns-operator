package controllers

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestGetPatternCatalogYAML(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		// The whitespace is important on the following lines. This YAML block
		// uses leading space characters, NOT tabs like the rest of this file.
		w.Write([]byte(`version: alpha
organization:
  name: Hybrid Cloud Patterns
  description: >
    Open source repository of cloud native solution patterns. This repository
    is maintained by Red Hat with contributions from customers and partners.
  maintainers:
    - name: Validated Patterns Team
      email: team-validated-patterns@redhat.com
  url: https://github.com/hybrid-cloud-patterns
patterns:
  - name: Multi-cloud GitOps
    description: A simple architecture for managing multiple clusters using GitOps
    longDescription: >
      This pattern demonstrates a simple architecture for managing multiple
      clusters using GitOps. It can be used as a good starting point for
      experimenting with other products in a multi-cluster architecture.
    branch: main
    gitRepo: https://github.com/hybrid-cloud-patterns/multicloud-gitops.git
    maintainers:
      - name: Validated Patterns Team
        email: team-validated-patterns@redhat.com
    products:
      - Red Hat Advanced Cluster Management
      - Red Hat OpenShift GitOps
      - Hashicorp Vault
    type: Validated
    url: https://hybrid-cloud-patterns.io/patterns/multicloud-gitops/`))
	}))
	defer server.Close()

	catalog, err := getPatternCatalogYAML(server.URL)
	if err != nil {
		t.Error(err)
		t.FailNow() // Prevent potential crash since there was an error
	}

	// Check some random data. Probably not worth it to check everything
	if catalog.Version != "alpha" {
		t.Errorf("Expected catalog.Version to be 'alpha', got %s", catalog.Version)
	}
	if catalog.Organization.Name != "Hybrid Cloud Patterns" {
		t.Errorf("Expected catalog.Organization.Name to be 'Hybrid Cloud Patterns', got %s", catalog.Organization.Name)
	}
	if len(catalog.Patterns) != 1 {
		t.Errorf("Expected length of catalog.patterns to be 1, got %d", len(catalog.Patterns))
	}
}

/*
func TestGetPatternManifestsOwnedByUs(t *testing.T) {
	// TODO: Find a good way to test this
}
*/

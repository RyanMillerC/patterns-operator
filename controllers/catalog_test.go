package controllers

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestGetCatalogYAML(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		// The whitespace is important on the following lines. This YAML block
		// uses leading space characters, NOT tabs like the rest of this file.
		w.Write([]byte(`version: alpha
organization:
  name: Hybrid Cloud Patterns
  org-url: https://github.com/hybrid-cloud-patterns
  description: |
    Open source repository of cloud native solution patterns.
    This repository is maintained by Red Hat with contributions from customers and partners.
  maintainers: team-validated-patterns@redhat.com
patterns:
  - name: Multi-cloud GitOps
    description: |
       This pattern demonstrates a simple architecture for managing multiple clusters using GitOps.
       It can be used as a good starting point for experimenting with other products in a multi-cluster architecture.
    pattern-url: https://github.com/hybrid-cloud-patterns/multicloud-gitops
    products:
  - name: Red Hat Advanced Cluster Management
    branch: main
    maintainers: team-validated-patterns@redhat.com
  - name: Multicluster DevSecOps
    description: |
        This pattern demonstrates a horizontal solution for multicluster DevSecOps use cases.
        It is derived from the multi-cloud GitOps pattern with added products to provide a complete DevSecOps workflow.
        This includes CI/CD pipelines with security gates; image scanning, signing and storage in a secure registry; deployment
        to secured clusters that provide advanced security monitoring and alerting.
    pattern-url: https://github.com/hybrid-cloud-patterns/multicluster-devsecops
    products:
        - name: Red Hat Advanced Cluster Management
        - name: Red Hat OpenShift GitOps
    branch: main
    maintainers: team-validated-patterns@redhat.com`))
	}))
	defer server.Close()

	catalog, _ := getCatalogYAML(server.URL)
	// Check some random data. Probably not worth it to check everything
	if catalog.Version != "alpha" {
		t.Errorf("Expected catalog.Version to be 'alpha', got %s", catalog.Version)
	}
	if catalog.Organization.Name != "Hybrid Cloud Patterns" {
		t.Errorf("Expected catalog.Organization.Name to be 'Hybrid Cloud Patterns', got %s", catalog.Organization.Name)
	}
	if len(catalog.Patterns) != 3 {
		t.Errorf("Expected length of catalog.patterns to be 3, got %d", len(catalog.Patterns))
	}
}

func TestGetPatternManifestsOwnedByUs(t *testing.T) {
	// TODO: Find a good way to test this
}

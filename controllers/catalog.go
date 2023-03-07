/*

# What does catalog.go do?

On new PatternCatalogSource...

* Get YAML from URL
* Convert YAML to native type
* For each pattern identified in catalog YAML
	* Check if PatternManifest exists
    * Create PatternManifest
* Check for PatternManifests that exist which are not present in Catalog YAML
* Schedule process to repeat on interval

*/

package controllers

import (
	"context"
	"io"
	"net/http"

	"gopkg.in/yaml.v3"
	"k8s.io/apimachinery/pkg/labels"
	"sigs.k8s.io/controller-runtime/pkg/client"

	api "github.com/hybrid-cloud-patterns/patterns-operator/api/v1alpha1"
)

// Generated using https://zhwt.github.io/yaml-to-go/
type PatternCatalog struct {
	Version      string `yaml:"version"`
	Organization struct {
		Name        string `yaml:"name"`
		OrgURL      string `yaml:"org-url"`
		Description string `yaml:"description"`
		Maintainers string `yaml:"maintainers"`
	} `yaml:"organization"`
	Patterns []struct {
		Name        string `yaml:"name"`
		Description string `yaml:"description"`
		PatternURL  string `yaml:"pattern-url"`
		Products    []struct {
			Name string `yaml:"name"`
		} `yaml:"products"`
		Branch      string `yaml:"branch"`
		Maintainers string `yaml:"maintainers"`
	} `yaml:"patterns"`
}

// Given a URL to a catalog.yaml file, fetch that file, and return a object of
// type CatalogYAML.
func getCatalogYAML(url string) (*PatternCatalog, error) {
	res, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close() // Wait for response

	body, err := io.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}

	var catalog PatternCatalog
	if err := yaml.Unmarshal(body, &catalog); err != nil {
		return nil, err
	}

	return &catalog, nil
}

// Called by the PatternCatalogSource reconciler on each catalog source action
// func processCatalogSource(pcs *api.PatternCatalogSource) error {
// }

// Given a PatternCatalogSource instance pointer and an empty
// PatternManifestList pointer, find PatternManifests that are owned by the
// PatternCatalogSource and add them to the PatternManifestList.
func getPatternManifestsOwnedByUs(r *PatternCatalogSourceReconciler, pcs *api.PatternCatalogSource, pms *api.PatternManifestList) error {
	lbs := map[string]string{
		"gitops.hybrid-cloud-patterns.io/source": pcs.Name,
	}
	labelSelector := labels.SelectorFromSet(lbs)
	listOps := &client.ListOptions{Namespace: pcs.Namespace, LabelSelector: labelSelector}
	if err := r.List(context.TODO(), pms, listOps); err != nil {
		return err
	}
	return nil
}
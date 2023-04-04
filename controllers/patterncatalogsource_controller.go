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

package controllers

import (
	"context"
	"fmt"
	"strings"
	"time"

	kerrors "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/controller/controllerutil"
	klog "sigs.k8s.io/controller-runtime/pkg/log"
	"sigs.k8s.io/controller-runtime/pkg/reconcile"

	"github.com/go-logr/logr"
	api "github.com/hybrid-cloud-patterns/patterns-operator/api/v1alpha1"
)

// PatternCatalogSourceReconciler reconciles a PatternCatalogSource object
type PatternCatalogSourceReconciler struct {
	client.Client
	Scheme *runtime.Scheme

	logger logr.Logger
}

//+kubebuilder:rbac:groups=gitops.hybrid-cloud-patterns.io,resources=patterncatalogsources,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=gitops.hybrid-cloud-patterns.io,resources=patterncatalogsources/status,verbs=get;update;patch
//+kubebuilder:rbac:groups=gitops.hybrid-cloud-patterns.io,resources=patterncatalogsources/finalizers,verbs=update

// Reconcile is part of the main kubernetes reconciliation loop which aims to
// move the current state of the cluster closer to the desired state.
// TODO(user): Modify the Reconcile function to compare the state specified by
// the PatternCatalogSource object against the actual cluster state, and then
// perform operations to make the cluster state reflect the state specified by
// the user.
//
// For more details, check Reconcile and its Result here:
// - https://pkg.go.dev/sigs.k8s.io/controller-runtime@v0.13.0/pkg/reconcile
func (r *PatternCatalogSourceReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	r.logger = klog.FromContext(ctx)

	r.logger.Info("Reconciling PatternCatalogSource")

	// Logger includes name and namespace
	// Its also wants arguments in pairs, eg.
	// r.logger.Error(err, fmt.Sprintf("[%s/%s] %s", p.Name, p.ObjectMeta.Namespace, reason))
	// Or r.logger.Error(err, "message", "name", p.Name, "namespace", p.ObjectMeta.Namespace, "reason", reason))

	// Fetch the PatternCatalogSource instance
	instance := &api.PatternCatalogSource{}
	err := r.Client.Get(context.TODO(), req.NamespacedName, instance)
	if err != nil {
		if kerrors.IsNotFound(err) {
			// Request object not found, could have been deleted after reconcile request.
			// Owned objects are automatically garbage collected. For additional cleanup logic use finalizers.
			// Return and don't requeue
			r.logger.Info("PatternCatalogSource not found")
			return reconcile.Result{}, nil
		}
		// Error reading the object - requeue the request.
		r.logger.Info("Error reading the request object, requeuing.")
		return reconcile.Result{}, err
	}

	// TODO: Should validate object here

	// Set UpdateInternal to default if it's not set
	if instance.Spec.UpdateInterval == "" {
		instance.Spec.UpdateInterval = "10m"
		r.Update(context.TODO(), instance, &client.UpdateOptions{})
		return reconcile.Result{Requeue: true}, nil
	}

	url := instance.Spec.Source
	if url == "" {
		err = fmt.Errorf("unable to pull YAML catalog because spec.source is not set on %s", instance.Name)
		return ctrl.Result{}, err
	}
	r.logger.Info("Attempting to pull YAML catalog", "url", url)
	catalog, err := getPatternCatalogYAML(url)
	if err != nil {
		r.logger.Error(err, "error pulling YAML catalog from source")
		return ctrl.Result{}, err
	}
	r.logger.Info("Successfully pulled YAML catalog", "url", url, "num of patterns", len(catalog.Patterns))

	// This will be used to set LastUpdated status on PatternCatalogSource and
	// PatternManifest objects.
	now := time.Now()

	// Delete PatternManifests owned by us that no longer exist in the catalog
	patternManfiestsOwnedByUs := &api.PatternManifestList{}
	err = getPatternManifestsOwnedByUs(r, instance, patternManfiestsOwnedByUs)
	if err != nil {
		return ctrl.Result{}, err
	}
	for _, patternManifest := range patternManfiestsOwnedByUs.Items {
		shouldDelete := true
		for _, pattern := range catalog.Patterns {
			// TODO: This should be a function
			patternName := strings.ReplaceAll(pattern.Name, " ", "-")
			patternName = strings.ToLower(patternName)
			if patternManifest.Name == patternName {
				shouldDelete = false
				break
			}
		}
		if shouldDelete {
			r.logger.Info("Pruning PatternManifest removed from catalog", "PatternManifest", patternManifest.Name)
			r.Delete(context.TODO(), &patternManifest, &client.DeleteOptions{})
		}
	}

	// Create or update PatternManifests for each pattern provided in the catalog
	for _, pattern := range catalog.Patterns {
		// TODO: This should be a function
		patternName := strings.ReplaceAll(pattern.Name, " ", "-")
		patternName = strings.ToLower(patternName)
		var patternManifest api.PatternManifest
		for _, pm := range patternManfiestsOwnedByUs.Items {
			if pm.Name == patternName {
				patternManifest = pm
				break
			}
		}
		newObj := false // Use to determine if object should be created or updated
		if patternManifest.Name == "" {
			// No existing PatternManifest was found since the name is empty
			newObj = true
			patternManifest.ObjectMeta = metav1.ObjectMeta{
				Name:      patternName,
				Namespace: instance.Namespace,
				Labels: map[string]string{
					"gitops.hybrid-cloud-patterns.io/source": instance.Name,
				},
			}
		}
		patternManifest.Spec = api.PatternManifestSpec{
			Organization: api.PatternManifestSpecOrganization{
				Name:        catalog.Organization.Name,
				Description: catalog.Organization.Description,
				// TODO: Figure out how to get Maintainers working
				Maintainers: []api.PatternManifestSpecMaintainer{},
				URL:         catalog.Organization.URL,
			},
			Pattern: api.PatternManifestSpecPattern{
				Name:            pattern.Name,
				Description:     pattern.Description,
				LongDescription: pattern.LongDescription,
				Branch:          pattern.Branch,
				GitRepo:         pattern.GitRepo,
				// TODO: Figure out how to get Maintainers working
				Maintainers: []api.PatternManifestSpecMaintainer{},
				Products:    pattern.Products,
				Type:        pattern.Type,
				URL:         pattern.URL,
			},
		}
		// Set owner reference for PatternManifest object so it's cleaned up if
		// the PatternCatalogSource owner object is deleted.
		err := controllerutil.SetControllerReference(instance, &patternManifest, r.Scheme)
		if err != nil {
			return ctrl.Result{}, err
		}

		// TODO: There might be an UpdateOption for create if doesn't exist (or something like that)
		if newObj {
			r.Create(context.TODO(), &patternManifest, &client.CreateOptions{})
		} else {
			r.Update(context.TODO(), &patternManifest, &client.UpdateOptions{})
		}

		// Set status
		patternManifest.Status.LastUpdateTime = metav1.NewTime(now)
		r.Status().Update(context.TODO(), &patternManifest)
	}

	// Set status
	instance.Status.LastUpdateTime = metav1.NewTime(now)
	r.Status().Update(context.TODO(), instance)

	// Requeue on on the PatternCatalogSource's UpdateInterval
	updateInterval, err := time.ParseDuration(instance.Spec.UpdateInterval)
	if err != nil {
		return ctrl.Result{}, err
	}
	return ctrl.Result{RequeueAfter: updateInterval}, nil
}

// SetupWithManager sets up the controller with the Manager.
func (r *PatternCatalogSourceReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&api.PatternCatalogSource{}).
		Complete(r)
}

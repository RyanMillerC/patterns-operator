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

	kerrors "k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
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
			r.logger.Info("Pattern not found")
			return reconcile.Result{}, nil
		}
		// Error reading the object - requeue the request.
		r.logger.Info("Error reading the request object, requeuing.")
		return reconcile.Result{}, err
	}

	url := instance.Spec.Source
	if url == "" {
		err = fmt.Errorf("unable to pull YAML catalog because spec.source is not set on %s", instance.Name)
		return ctrl.Result{}, err
	}
	r.logger.Info("Pulling YAML catalog from", "url", url)
	catalog, err := getPatternCatalogYAML(url)
	if err != nil {
		r.logger.Error(err, "Error pulling YAML catalog from source")
		return ctrl.Result{}, err
	}

	r.logger.Info("-", "catalog", catalog)

	//for _, pattern := range catalog.Patterns {
	patternManfiestsOwnedByUs := &api.PatternManifestList{}
	err = getPatternManifestsOwnedByUs(r, instance, patternManfiestsOwnedByUs)
	if err != nil {
		return ctrl.Result{}, err
	}

	if len(patternManfiestsOwnedByUs.Items) > 0 {
		r.logger.Info("-", "patternManifestsOwnedByUs", patternManfiestsOwnedByUs)
	} else {
		r.logger.Info("No PatternManifests owned by us")
	}

	// Check if PatternManifest exists
	// If it doesn't, create it
	// Check if PatternManifest needs updates
	// If it does, update it

	// For PatternManifest that is owned by us
	// If Don't exist in the Catalog YAML
	// - Determine this by looking at the name of the pattern

	//needsUpdated := checkIfPatternManfestNeedsUpdated
	// }

	// &client.ListOptions{}

	return ctrl.Result{}, nil
}

// SetupWithManager sets up the controller with the Manager.
func (r *PatternCatalogSourceReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&api.PatternCatalogSource{}).
		Complete(r)
}

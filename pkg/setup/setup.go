/*
Copyright 2023.

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

package setup

import (
	"context"

	corev1 "k8s.io/api/core/v1"
	kerrors "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
)

var (
	setupLog = ctrl.Log.WithName("setup")
)

// TODO: There are several repeated functions similar to this. Maybe they can be abstracted?
func CreatePatternsOperatorNamespace() error {
	scheme := runtime.NewScheme()
	corev1.AddToScheme(scheme)
	config := ctrl.GetConfigOrDie()
	kclient, err := client.New(config, client.Options{Scheme: scheme})
	if err != nil {
		return err
	}

	namespace := &corev1.Namespace{
		ObjectMeta: metav1.ObjectMeta{
			Name: "patterns-operator",
		},
		Spec: corev1.NamespaceSpec{},
	}

	// Check if the resource already exists
	var found corev1.Namespace
	key := client.ObjectKeyFromObject(namespace)
	err = kclient.Get(context.TODO(), key, &found)
	create := false
	if err != nil {
		if kerrors.IsNotFound(err) {
			create = true
		} else {
			return err
		}
	}

	if create {
		setupLog.Info("Creating patterns-operator Namespace")
		err := kclient.Create(context.TODO(), namespace, &client.CreateOptions{})
		if err != nil {
			return err
		}
	} else {
		setupLog.Info("patterns-operator Namespace exists")
	}

	return nil
}

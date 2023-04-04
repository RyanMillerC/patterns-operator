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
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/go-errors/errors"
	api "github.com/hybrid-cloud-patterns/patterns-operator/api/v1alpha1"
	v1 "k8s.io/api/core/v1"
)

var (
	logKeys = map[string]bool{}
)

func logOnce(message string) {
	if _, ok := logKeys[message]; ok {
		return
	}
	logKeys[message] = true
	log.Println(message)
}

// ContainsString checks if the string array contains the given string.
func ContainsString(slice []string, s string) bool {
	for _, item := range slice {
		if item == s {
			return true
		}
	}
	return false
}

// RemoveString removes the given string from the string array if exists.
func RemoveString(slice []string, s string) (result []string) {
	for _, item := range slice {
		if item == s {
			continue
		}
		result = append(result, item)
	}
	return result
}

func ParametersToMap(parameters []api.PatternParameter) map[string]interface{} {
	output := map[string]interface{}{}
	for _, p := range parameters {
		keys := strings.Split(p.Name, ".")
		max := len(keys) - 1
		current := output

		for i, key := range keys {
			fmt.Printf("Step %d %s\n", i, key)
			if i == max {
				current[key] = p.Value
			} else {
				if val, ok := current[key]; ok {
					fmt.Printf("Using %q\n", key)
					current = val.(map[string]interface{})
				} else if i < len(key) {
					fmt.Printf("Adding %q\n", key)
					current[key] = map[string]interface{}{}
					current = current[key].(map[string]interface{})
				}

			}
		}
	}

	return output
}

// Return the namespace of the running controller
//
// There's not an easy way to do this so here's a link to the pattern being
// used: https://github.com/kubernetes/kubernetes/pull/63707
//
// This will error when running the controller outside of Kubernetes. To prevent
// errors when running outside of Kubernetes, set the CONTROLLER_NAMESPACE
// environment variable to whatever namespace you would deploy the controller
// into if deploying on a cluster.
func GetControllerNamespace() (string, error) {
	// This way assumes you've set the POD_NAMESPACE environment variable using the downward API.
	// This check has to be done first for backwards compatibility with the way InClusterConfig was originally set up
	if ns, ok := os.LookupEnv("CONTROLLER_NAMESPACE"); ok {
		return ns, nil
	}

	// Fall back to the namespace associated with the service account token, if available
	if data, err := os.ReadFile("/var/run/secrets/kubernetes.io/serviceaccount/namespace"); err == nil {
		if ns := strings.TrimSpace(string(data)); len(ns) > 0 {
			return ns, nil
		}
	}

	return "", errors.New("could not determine controller namespace. Set CONTROLLER_NAMESPACE environment variable if running controller outside of cluster")
}

// getPatternConditionByStatus returns a copy of the pattern condition defined by the status and the index in the slice if it exists, otherwise -1 and nil
func getPatternConditionByStatus(conditions []api.PatternCondition, conditionStatus v1.ConditionStatus) (int, *api.PatternCondition) {
	if conditions == nil {
		return -1, nil
	}
	for i := range conditions {
		if conditions[i].Status == conditionStatus {
			return i, &conditions[i]
		}
	}
	return -1, nil
}

// getPatternConditionByType returns a copy of the pattern condition defined by the type and the index in the slice if it exists, otherwise -1 and nil
func getPatternConditionByType(conditions []api.PatternCondition, conditionType api.PatternConditionType) (int, *api.PatternCondition) {
	if conditions == nil {
		return -1, nil
	}
	for i := range conditions {
		if conditions[i].Type == conditionType {
			return i, &conditions[i]
		}
	}
	return -1, nil
}

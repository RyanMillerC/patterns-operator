module github.com/hybrid-cloud-patterns/patterns-operator

go 1.16

require (
	github.com/ghodss/yaml v1.0.0
	github.com/go-errors/errors v1.4.2
	github.com/go-logr/logr v1.2.2
	github.com/google/uuid v1.3.0 // indirect
	github.com/onsi/ginkgo v1.16.5
	github.com/onsi/gomega v1.17.0
	github.com/openshift/api v0.0.0-20211028023115-7224b732cc14 // indirect
	github.com/openshift/client-go v0.0.0-20210831095141-e19a065e79f7
	github.com/operator-framework/api v0.12.0
	github.com/operator-framework/operator-lifecycle-manager v0.20.0
	k8s.io/apimachinery v0.23.0
	k8s.io/cli-runtime v0.23.0
	k8s.io/client-go v0.23.0
	k8s.io/kubectl v0.23.0
	sigs.k8s.io/controller-runtime v0.11.0
)

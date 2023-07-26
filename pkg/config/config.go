/*
Configuration for patterns-operator
*/
package config

const (
	// Minimum version of OpenShift that supports console dynamic plugins.
	// Console plugin install will not be attempted on versions less than this.
	MinConsolePluginOCPVer string = "4.10"

	// Name of operator. Console plugin resources will be prefixed with this.
	OperatorName string = "patterns-operator"
)

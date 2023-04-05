/*
Configuration for patterns-operator
*/
package config

const (
	// Minimum version of OpenShift that supports console dynamic plugins.
	// Console plugin install will not be attempted on versions less than this.
	MinConsolePluginOCPVer string = "4.10"

	// Container image path for the console plugin. DO NOT INCLUDE A TAG!
	// config.Version will be used as the tag.
	ConsolePluginImage string = "quay.io/rymiller/patterns-operator-console-plugin"

	// Name of operator. Console plugin resources will be prefixed with this.
	OperatorName string = "patterns-operator"

	// Override the container image tag for the OpenShift console dynamic
	// plugin. This is normally set to version.Version (from version package).
	// When installed through OLM, version.Version is set to the operator
	// version (ex. 0.0.11). When testing locally, version.Version has additonal
	// information appended (ex. 0.0.11-60-g281207). This variable allows you to
	// set a static tag (ex. latest) for local testing. Set to an empty string
	// to use the default (version.Version) tag.
	//
	// Example: OverridePluginImageTag string = "latest"
	OverrideConsolePluginImageTag string = ""
)

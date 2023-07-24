# Patterns Operator

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

The Patterns Operator does things.

TODO: Update description

The Validated Patterns Operator 

## Installing the Operator

You need to have an OpenShift cluster up and running to install the operator.
Once you have a cluster up:

* Navigate to *Operators > OperatorHub* on the sidebar
* Search for "Validated Patterns Operator"
    * Validated Patterns Operator is a community operator. This will cause
    OpenShift to display a message describing community operators. Select
    *Continue* if you agree.
* Select *Install*
* At the bottom of the Install Operator page, under *Console Plugin*, select
*Enable*
    * Because Validated Patterns Operator is a community operator, OpenShift
    disables console plugins for security. If you trust the operator, you are
    safe to check the box.
* Leave the other settings as their defaults and at the bottom of the page
select *Install*
* A few moments after the operator installs, a prompt will appear in the
top-right corner of the OpenShift console asking you to refresh the page.

## Using the Patterns Catalog

Validated Patterns Operator includes a catalog of available patterns from the
Hybrid Cloud Patterns GitHub repositories. These can be deployed as-is for demo
and testing purposes.

If you have custom patterns, you can import those into the catalog.

TODO: Describe how to do that ^^

To use the catalog:

* Navigate to *Patterns > PatternCatalogSource*
* Select the pattern you want to deploy
* In the pop up modal, read through the description of the pattern
    * Some patterns have additional requirements. Make sure you understand the
    requirements for the pattern you are deploying to avoid issues with the
    deployment.
* If you meet the requirements for the pattern, select *Install*
* Optionally, edit the YAML manifest to include any extra parameters
* Once the manifest looks good, select *Save*

## Monitoring deployment

After creating a Pattern manifest, the Validated Patterns Operator will deploy
the resources specified by the pattern. This can take considerable time for
complex patterns.

You can monitor progress by periodically checking the *Status* of the Pattern
resource you created.

Additionally, you can check the application status with:

```
$ oc get applications -A -w
```

And check pod logs with:

```
$ oc logs -n patterns-operator-system `oc get -n patterns-operator-system pods -o name --field-selector status.phase=Running | grep patterns` -c manager -f
```

**NOTE:** Older versions of the Validated Patterns Operator used the namespace
`openshift-operators` and not `patterns-operator-system`.

## Load secrets into the vault

TODO: Idk what we are doing here yet

In order to load the secrets out of band into the vault you can copy the
`values-secret.yaml.template` inside the pattern's git repo to
`~/values-secret.yaml`, edit the secrets at your discretion and then run `make
load-secrets`. Otherwise you can access the vault via its network route, login
via the root token (contained in the `imperative` namespace in the `vaultkeys`
secret and then add the secrets via the UI (this approach is a bit more work)

## Deleting a pattern

Deleting a pattern isn't a good idea. If you absolutely need to delete a
pattern, you should delete the Pattern resource you created.

**This will only remove the top-level application. The subscription and anything
created by Argo will not be removed and must be removed manually. Removing the
top-level application ensures that Argo won't try to put back anything you
delete.**

## Operator Development

See [DEVELOPEMENT.md](DEVELOPEMENT.md) for instructions on developing the
Validated Patterns Operator.

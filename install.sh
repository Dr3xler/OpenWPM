#!/bin/bash

# This script automates the creation and installation
# of the conda environmnet. It's useful for working
# in the docker file and on travis, but it's not
# necessary for individual users to use it.

# Developers are encourage to only run scripts
# that they fully understand, and may prefer to
# run aspects of this script manually to set-up
# openwpm.

# This script will remove an existing openwpm
# conda environment if it exists.

set -e

# Make conda available to shell script
eval "$(conda shell.bash hook)"

echo 'Creating / Overwriting openwpm conda environment.'
conda env create --force -q -f environment.yaml

echo 'Activating environment.'
conda activate openwpm

echo 'Installing firefox.'
./scripts/install-firefox.sh

echo 'Building extension.'
./scripts/build-extension.sh

echo 'Installation complete, activate your new environment by running:'
echo 'conda activate openwpm'

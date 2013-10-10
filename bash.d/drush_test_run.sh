#!/bin/bash

# All praise and gratitude to sonnym for https://drupal.org/project/travis_ci_drupal_module_example
PROJECT_NAME="bootstrap_dss_islandora_dev"

# This installs Drush
cd ../..
pear channel-discover pear.drush.org
pear install drush/drush
phpenv rehash

# This installs the database fixtures for the Drupal unit tests
mysql -e "create database $PROJECT_NAME"

# This creates the new Drupal testing installation
php -d sendmail_path=`which true` `pear config-get php_dir`/drush/drush.php --yes core-quick-drupal --profile=testing --no-server --db-url=mysql://root:@127.0.0.1/$PROJECT_NAME --enable=simpletest $PROJECT_NAME

# Create the necessary symbolic links...
ln -s $(readlink -e $(cd -)) $PROJECT_NAME/drupal/sites/all/modules/travis_ci_drupal_module_example

# ...and change into the environment for executing the unit tests
cd $PROJECT_NAME/drupal

# Enable the testing module
drush --yes pm-enable $PROJECT_NAME

# Execute the unit tests
drush test-run "$PROJECT_NAME"

# Prepare the environment for headless Selenium/Cucumber testing...
#bash env.sh

#!/bin/bash

cd tests
bundle install

# Configuration for headless Selenium/Cucumber tests
# http://about.travis-ci.org/docs/user/gui-and-headless-browsers/

export DISPLAY=:99.0
sh -e /etc/init.d/xvfb start
rake jasmine:ci # Execute the Jasmine tests
bundle exec cucumber # Execute the Cucumber tests

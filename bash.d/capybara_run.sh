#!/bin/bash

cd tests
bundle install
bundle exec evergreen # Execute the Jasmine tests

# Configuration for headless Selenium/Cucumber tests
# http://about.travis-ci.org/docs/user/gui-and-headless-browsers/

export DISPLAY=:99.0
sh -e /etc/init.d/xvfb start
bundle exec cucumber # Execute the Cucumber tests

#!/bin/bash

cd tests
bundle install
bundle exec jasmine # Execute the Jasmine tests
bundle exec cucumber # Execute the Cucumber tests

require 'rubygems'
require 'bundler/setup'
require 'rspec'
require 'capybara'
require 'capybara/rspec'
require 'support/features/session_helpers'
require 'capybara/dsl'

# We're running selenium headless
require 'headless'

headless = Headless.new
headless.start

# Taken from the following location:
# (http://www.tecnobrat.com/blog/2012/03/24/headless-continuous-integration-with-rspec-capybara-cruisecontrol-rb/)
at_exit do

  exit_status = $!.status if $!.is_a?(SystemExit)
  headless.destroy
  exit exit_status if exit_status
end

Capybara.default_driver = :selenium
Capybara.app_host = 'http://localhost'

RSpec.configure do |config|

  config.include Features::SessionHelpers, type: :feature
end

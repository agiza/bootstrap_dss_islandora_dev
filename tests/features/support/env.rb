
require 'capybara/cucumber'
require 'capybara/rspec'
require 'capybara/dsl'

# We're running selenium headless
require 'headless'
headless = Headless.new
headless.start

Capybara.default_driver = :selenium
Capybara.default_wait_time = 45
Capybara.app_host = 'http://localhost'
Capybara.current_session.driver.browser.manage.window.resize_to(1280, 1024)

World(Capybara)

# (http://www.tecnobrat.com/blog/2012/03/24/headless-continuous-integration-with-rspec-capybara-cruisecontrol-rb/)
at_exit do

  exit_status = $!.status if $!.is_a?(SystemExit)
  headless.destroy if headless
  exit exit_status if exit_status
end

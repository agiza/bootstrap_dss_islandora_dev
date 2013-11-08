<?php

/**
 * @file template.php
 * @author griffinj@lafayette.edu
 * This file contains the primary theme hooks found within any given Drupal 7.x theme
 * 
 * @todo Implement some Drupal theming hooks
 */

  // Includes functions to create Islandora Solr blocks.
require_once dirname(__FILE__) . '/includes/blocks.inc';
require_once dirname(__FILE__) . '/includes/forms.inc';
require_once dirname(__FILE__) . '/includes/menus.inc';

/**
 * Preprocess variables for page.tpl.php
 *
 * @see page.tpl.php
 */

function bootstrap_dss_islandora_dev_preprocess_page(&$variables) {

  // Add information about the number of sidebars.
  if (!empty($variables['page']['sidebar_first']) && !empty($variables['page']['sidebar_second'])) {
    $variables['columns'] = 3;

  }
  elseif (!empty($variables['page']['sidebar_first'])) {
    $variables['columns'] = 2;
  }
  elseif (!empty($variables['page']['sidebar_second'])) {
    $variables['columns'] = 2;
  }
  else {
    $variables['columns'] = 1;
  }

  // Primary nav
  $variables['primary_nav'] = FALSE;
  if ($variables['main_menu']) {
    // Build links
    $variables['primary_nav'] = menu_tree(variable_get('menu_main_links_source', 'main-menu'));
    // Provide default theme wrapper function
    $variables['primary_nav']['#theme_wrappers'] = array('menu_tree__primary');
  }

  // Secondary nav
  $variables['secondary_nav'] = FALSE;
  if ($variables['secondary_menu']) {
    // Build links
    $variables['secondary_nav'] = menu_tree(variable_get('menu_secondary_links_source', 'user-menu'));
    // Provide default theme wrapper function
    $variables['secondary_nav']['#theme_wrappers'] = array('menu_tree__secondary');
  }

  // The "Contact Us" link
  //$variables['contact_us'] = l('Contact Us', 'contact');
  $variables['contact_us'] = '<a data-toggle="lafayette-dss-modal" href="#contact-modal">' . t('Contact Us') . '</a>';

  if(user_is_logged_in()) {

    // For the user thumbnail
    global $user;
    $user_view = user_view($user);
    $variables['user_picture'] = drupal_render($user_view['user_picture']);
  } else {

    $variables['user_picture'] = '<span class="icon-large icon-user"></span>';
  }
}

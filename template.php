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

require_once dirname(__FILE__) . '/includes/menu.inc';

  /**
   * @author griffinj
   * Implements hook_theme()
   *
   */
function bootstrap_dss_islandora_dev_theme() {

  // This is called from drupal_form_alter() in order to modify the form using a PHPTemplate template (.tpl.php files, typically stored within the templates/ directory)
  return array('bootstrap_dss_islandora_dev_islandora_solr_advanced_search_form' => array('render element' => 'form',
											  'template' => 'templates/forms/islandora-solr-advanced-search-form',
											  ),
	       );
  }

/**
 * griffinj
 * Implements hook_form_alter()
 *
 * Theming for the advanced search form must be implemented using a hook which does not conflict with the actual form implementation within the global context
 *
 */
function bootstrap_dss_islandora_dev_form_alter(&$form, $form_state, $form_id) {

  switch($form_id) {

  case 'islandora_solr_advanced_search_form':

    // Push/append a theming callback on to the array of theming callbacks for the individual form element
    $form['#theme'] = array('bootstrap_dss_islandora_dev_islandora_solr_advanced_search_form');
    break;

  case 'islandora_solr_simple_search_form':

    // Increase the size of the text box
    $form['simple']['islandora_simple_search_query']['#size'] = 21;
    $form['simple']['islandora_simple_search_query']['#value'] = 'Search...';
    $form['simple']['islandora_simple_search_query']['#default_value'] = 'Search...';

    // Insert the glyphicon for searching
    $form['simple']['submit']['#value'] = '<i class="icon-large icon-search"></i>';
    //$form['simple']['submit']['#class'][] = 'icon-search';

    /*
    $form['simple']['#suffix'] = l('Advanced Search', '/', array('attributes' => array('data-toggle' => 'modal'),
								 'class' => array('btn', 'btn-primary', 'btn-lg'),
								 'fragment' => 'advanced-search-modal'));
    */
    $form['simple']['#suffix'] = '<a href="#advanced-search-modal" data-toggle="lafayette-dss-modal">Advanced Search</a>';
    
    break;
  }
}

/**
 * Preprocess variables for 
 *
 * @see islandora-solr-advanced-search-form.tpl.php
 */
function bootstrap_dss_islandora_dev_preprocess_bootstrap_dss_islandora_dev_islandora_solr_advanced_search_form(&$variables) {

  //$form = $variables['form'];

  //foreach($form['terms'] as $key => &$value) {
  foreach($variables['form']['terms'] as $key => &$value) {

    if(is_numeric($key)) {

      $value['add']['#value'] = '<i class="icon-large icon-plus-sign"></i>';
      /*
	$value['add']['#value'] = '<i class="icon-large icon-plus-sign"></i>';
	$value['add']['#ajax']['callback'] = '_bootstrap_dss_islandora_dev_islandora_solr_advanced_search_terms';

	$value['search']['#value'] = '';
	//dpm($value);
	*/
    }
  }

  dpm($variables);
}

/**
 * Preprocess variables for region--auth.tpl.php
 *
 * @see region--auth.tpl.php
 */
function bootstrap_dss_islandora_dev_preprocess_region__auth(&$variables) {

  dpm('trace3');
  dpm($variables);
}

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

}

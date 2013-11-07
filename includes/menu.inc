<?php

/**
 * @file
 * Theming for menu trees, menu items, and menu links
 */

/**
 * Overrides theme_menu_link for the "primary" menu
 *
 * @see bootstrap_menu_link
 */

function bootstrap_dss_islandora_dev_menu_link(&$variables) {

  $element = $variables['element'];
  $sub_menu = '';

  if ($element['#below']) {

    // Prevent dropdown functions from being added to management menu as to not affect navbar module.
    if (($element['#original_link']['menu_name'] == 'management') && (module_exists('navbar'))) {
      $sub_menu = drupal_render($element['#below']);
    }

    else {
      // Add our own wrapper
      unset($element['#below']['#theme_wrappers']);
      $sub_menu = '<ul class="dropdown-menu">' . drupal_render($element['#below']) . '</ul>';
      $element['#localized_options']['attributes']['class'][] = 'dropdown-toggle';
      $element['#localized_options']['attributes']['data-toggle'] = 'dropdown';

      // Check if this element is nested within another
      if ((!empty($element['#original_link']['depth'])) && ($element['#original_link']['depth'] > 1)) {
        // Generate as dropdown submenu
        $element['#attributes']['class'][] = 'dropdown-submenu';
      }
      else {
        // Generate as standard dropdown
        $element['#attributes']['class'][] = 'dropdown';
        $element['#localized_options']['html'] = TRUE;
        $element['#title'] .= ' <span class="caret"></span>';
      }

      // Set dropdown trigger element to # to prevent inadvertant page loading with submenu click
      $element['#localized_options']['attributes']['data-target'] = '#';
    }
  }
 // Issue #1896674 - On primary navigation menu, class 'active' is not set on active menu item.
 // @see http://drupal.org/node/1896674
 if (($element['#href'] == $_GET['q'] || ($element['#href'] == '<front>' && drupal_is_front_page())) && (empty($element['#localized_options']['language']) || $element['#localized_options']['language']->language == $language_url->language)) {
   $element['#attributes']['class'][] = 'active';
 }
  $output = l($element['#title'], $element['#href'], $element['#localized_options']);

  // Ensure that buttons are only created for the top-level list
  // This must be menu specific!
  if($element['#below'] || empty($element['#original_link']['depth']) || $element['#original_link']['depth'] == 1) {

    $element['#attributes']['class'][] = 'btn';
  }

  return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n";
  }

  /*
function bootstrap_dss_islandora_dev_preprocess_menu_tree(&$variables) {

  dpm($variables);

  switch($variables['#element']) {

  case 'menu_link__main_menu':

    dpm($variables);
    break;
  }
}
  */
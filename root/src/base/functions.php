<?php
/**
 * Theme functions and definitions.
 *
 * @package {%= name %} 
 * @author  {%= author_name %} ({%= author_email %})
 * @since   {%= version %} 
 */

function add_theme_scripts() {
  wp_enqueue_style( 'style', get_template_directory_uri() . '/assets/css/style.css' );
  wp_enqueue_script( 'script', get_template_directory_uri() . '/assets/js/button.js' , '', '0.1.0', true);
}

add_action( 'wp_enqueue_scripts', 'add_theme_scripts' );

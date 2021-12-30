<?php
/**
 * The header of the theme
 *
 * @package {%= name %} 
 * @author  {%= author_name %} ({%= author_email %}) 
 * @since   {%= version %} 
 */
?>

<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
        <meta charset="<?php bloginfo( 'charset' ); ?>">
        <meta name="viewport" content="width=device-width, shrink-to-fit=no, initial-scale=1.0">
        <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

<?php wp_body_open(); ?>

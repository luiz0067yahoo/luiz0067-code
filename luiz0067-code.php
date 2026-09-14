<?php
/**
 * Plugin Name:       Luiz0067 Code
 * Plugin URI:        https://github.com/luiz0067yahoo/luiz0067-code
 * Description:       Native Gutenberg code editor block with authorial syntax highlighting, multi-language, and theming support.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            Luiz
 * Author URI:        https://profiles.wordpress.org/luiz0067/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       luiz0067-code
 * Domain Path:       /languages
 *
 * @package           Luiz0067Code
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function luiz0067_code_init() {
	// Register the block from metadata
	register_block_type( __DIR__ );

	// Set script translations for Gutenberg i18n
	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations(
			'luiz0067-code-editor-script',
			'luiz0067-code',
			plugin_dir_path( __FILE__ ) . 'languages'
		);
	}
}
add_action( 'init', 'luiz0067_code_init' );

/**
 * Load plugin textdomain for internationalization.
 */
function luiz0067_code_load_textdomain() {
	load_plugin_textdomain(
		'luiz0067-code',
		false,
		dirname( plugin_basename( __FILE__ ) ) . '/languages'
	);
}
add_action( 'plugins_loaded', 'luiz0067_code_load_textdomain' );

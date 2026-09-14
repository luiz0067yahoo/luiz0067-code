<?php
/**
 * Plugin Name:       CodeMirror Editor Pro
 * Plugin URI:        https://github.com/luiz0067yahoo/luiz0067-code
 * Description:       A native, modern WordPress Gutenberg block for source code editing powered by CodeMirror with multi-language and theming support.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            Luiz
 * Author URI:        https://profiles.wordpress.org/luiz0067/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wp-codemirror-block
 * Domain Path:       /languages
 *
 * @package           WPCodeMirrorBlock
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
function wp_codemirror_block_init() {
	// Register the block from metadata
	register_block_type( __DIR__ );

	// Set script translations for Gutenberg i18n
	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations(
			'custom-codemirror-block-editor-script',
			'wp-codemirror-block',
			plugin_dir_path( __FILE__ ) . 'languages'
		);
	}
}
add_action( 'init', 'wp_codemirror_block_init' );

/**
 * Load plugin textdomain for internationalization.
 */
function wp_codemirror_block_load_textdomain() {
	load_plugin_textdomain(
		'wp-codemirror-block',
		false,
		dirname( plugin_basename( __FILE__ ) ) . '/languages'
	);
}
add_action( 'plugins_loaded', 'wp_codemirror_block_load_textdomain' );

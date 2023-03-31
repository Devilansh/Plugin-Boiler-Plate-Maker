<?php
/**
 * Plugin's bootstrap file to launch the plugin
 *
 * @package     Cg_Blocks
 * @author      Capgemini
 *
 * @wordpress-plugin
 * Plugin Name: $$name_of_block
 * Plugin URI:  https://capgemini.com
 * Description: $$name_of_block
 * Version:     1.0.0
 * Author:      Capgemini
 * Author URI:  https://capgemini.com
 * Text Domain: cg-blocks
 * Domain Path: /languages
 */

namespace CG\CG_Blocks\$$class;

/**
 * Gets this plugin's absolute directory path
 *
 * @since  2.1.0
 * @ignore
 * @access private
 *
 * @return string
 */
function _get_plugin_directory() {
    return __DIR__;
}

/**
 * Gets this plugin's URL
 *
 * @since  2.1.0
 * @ignore
 * @access private
 *
 * @return string
 */
function _get_plugin_url() {
    static $plugin_url;

    if ( empty( $plugin_url ) ) {
        $plugin_url = plugins_url( null, __FILE__ );
    }

    return $plugin_url;
}

// Enqueue JS and CSS
require __DIR__ . '/lib/enqueue-scripts.php';
require __DIR__ . '/lib/block-categories.php';


//add_action( 'plugins_loaded', function() {
//    load_plugin_textdomain( 'cg-blocks', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
//});

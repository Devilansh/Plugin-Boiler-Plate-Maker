<?php

namespace CG\CG_Blocks\$$class;

add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\enqueue_block_editor_assets' );

/**
 * Enqueue block editor only JavaScript and CSS
 */
function enqueue_block_editor_assets() {

	// Register external libs
//	wp_register_script( 'masonry-js', plugins_url( 'cg-blocks/assets/js/vendor/masonry.pkgd.min.js' ), [], '4.4.2', false );

//	wp_register_script( 'fb-sdk-js', 'https://connect.facebook.net/en_US/sdk.js', [], 'v9.0', false );

	// Make paths variables so we don't write em twice ;)
	$editor_js_path    = '/build/blocks-$$name_dash-editor.production.bundle.min.js';
	$editor_style_path = '/build/editor.css';
	$style_path        = '/build/style.css';

	$pathName = '';
//	$currentSiteDetails = get_blog_details();
//	if ( isset($currentSiteDetails->path) ) {
//	  $pathName = str_replace("/", "", $currentSiteDetails->path);
//	}

	// Enqueue the bundled block JS file
	wp_enqueue_script(
		'cg-blocks-$$name_dash-js',
		_get_plugin_url() . $editor_js_path,
		[ 'wp-plugins', 'wp-element', 'wp-edit-post', 'wp-i18n', 'wp-api-request', 'wp-data', 'wp-components', 'wp-blocks', 'wp-editor', 'wp-compose', 'wp-api-fetch' ],
		filemtime( _get_plugin_directory() . $editor_js_path ),
		false
	);

	wp_localize_script('cg-blocks-$$name_dash-js', 'js_var', array(
      'nonce' => wp_create_nonce('job-search-nonce'),
			 'pathName' => $pathName,
			 'default_img_url' => get_template_directory_uri() . "/assets/images/mockup.png"
  ));

    wp_set_script_translations( 'cg-blocks-$$name_dash-js', 'cg-blocks', _get_plugin_directory() . '/languages' );

	// Enqueue optional editor only styles
	wp_enqueue_style(
		'cg-blocks-$$name_dash-editor-css',
		_get_plugin_url() . $editor_style_path,
		[],
		filemtime( _get_plugin_directory() . $editor_style_path ),
		false
	);

	// Enqueue front end and editor JavaScript and CSS assets
	wp_enqueue_style(
		'cg-blocks-$$name_dash-css',
		_get_plugin_url() . $style_path,
		null,
		filemtime( _get_plugin_directory() . $style_path ),
		false
	);
}
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\enqueue_frontend_assets' );

/**
 * Enqueue frontend JavaScript and CSS assets
 */
function enqueue_frontend_assets() {

	// If in the backend, bail out
	if ( is_admin() ) {
		return;
	}

	$frontend_js_path = '/build/blocks-$$name_dash-frontend.production.bundle.min.js';
	$style_path        = '/build/style.css';

//	// Register external libs
//	wp_register_script( 'masonry-js', plugins_url( 'cg-blocks/assets/js/vendor/masonry.pkgd.min.js' ), [], '4.4.2', false );
//
//	wp_register_script( 'fb-sdk-js', 'https://connect.facebook.net/en_US/sdk.js', [], 'v9.0', false );
//

	wp_enqueue_script(
		'cg-blocks-$$name_dash-frontend-js',
		_get_plugin_url() . $frontend_js_path,
		['lodash','jquery'],
		filemtime( _get_plugin_directory() . $frontend_js_path ),
		true
	);

	wp_enqueue_style(
		'cg-blocks-$$name_dash-css',
		_get_plugin_url() . $style_path,
		null,
		filemtime( _get_plugin_directory() . $style_path ),
		false
	);

}
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue_block_editor_assets' );



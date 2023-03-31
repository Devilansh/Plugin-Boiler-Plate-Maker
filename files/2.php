<?php

namespace CG\CG_Blocks\$$class;

/**
 * Custom block category
 */

function my_blocks_plugin_block_categories( $categories, $post ) {
	return array_merge(
		$categories,
		[
			[
				'slug'  => 'capgemini',
				'title' => __( 'Capgemini', 'cg-blocks' ),
			],
		]
	);
}
add_filter( 'block_categories', __NAMESPACE__ . '\my_blocks_plugin_block_categories', 10, 2 );

export const ApiFeature = {
  ANALYZE_PRODUCT: 'analyze_product',
  ANALYZE_PRODUCT_STREAM: 'analyze_product_stream',
  GENERATE_BACKGROUND: 'generate_background',
  REFINE_COPY: 'refine_copy',
  EXPORT_LAUNCH_BUNDLE: 'export_launch_bundle',
  GENESIS_RENDER_QUEUE: 'genesis_render_queue',
} as const

export type ApiFeatureId = (typeof ApiFeature)[keyof typeof ApiFeature]

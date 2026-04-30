-- ============================================================
-- Supabase Storage: 화장품 이미지용 버킷 + 권한
-- SQL Editor에서 한 번 실행하세요. (성공 후 대시보드 Storage에서 확인)
-- ============================================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true,
  10485760,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[]
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "product_images_public_read" ON storage.objects;
CREATE POLICY "product_images_public_read"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'product-images');

-- 로그인 없이 업로드 허용 (학습·데모용). 실서비스에서는 로그인한 사용자만 insert 하도록 바꾸는 것이 안전합니다.
DROP POLICY IF EXISTS "product_images_anon_insert" ON storage.objects;
CREATE POLICY "product_images_anon_insert"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'product-images');

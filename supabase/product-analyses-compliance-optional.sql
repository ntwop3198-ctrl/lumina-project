-- Optional: 감사 추적용 스냅샷 (API에서 insert 시 컬럼이 있으면 활용 가능)
-- 현재 기본 경로는 analysis_text 에 정제본+Legal Trace 푸터만 저장합니다.

-- ALTER TABLE product_analyses
--   ADD COLUMN IF NOT EXISTS compliance_snapshot jsonb;

-- 예시 업데이트 (애플리케이션에서 별도 로직으로 채움):
-- UPDATE product_analyses SET compliance_snapshot = '{"safetyScore":100}'::jsonb WHERE id = '...';

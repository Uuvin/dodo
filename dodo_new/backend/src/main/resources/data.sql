-- 샘플 메모 데이터
INSERT INTO memo (content, color, created_at, updated_at)
VALUES
  ('<p>오늘 해야 할 일 목록 작성하기</p>', 'bg-yellow-50 border-yellow-200', NOW(), NOW()),
  ('<p>팀 미팅 준비 자료 검토</p>', 'bg-blue-50 border-blue-200', NOW(), NOW());

-- 샘플 일정 데이터
INSERT INTO schedule (title, schedule_date, schedule_time, completed, created_at)
VALUES
  ('팀 미팅', CURDATE(), '10:00:00', false, NOW()),
  ('클라이언트 미팅', CURDATE(), '14:00:00', false, NOW());

-- 샘플 루틴 데이터
INSERT INTO routine (name, routine_time, completed, created_at)
VALUES
  ('아침 운동', '07:00:00', true, NOW()),
  ('업무 정리', '18:00:00', false, NOW());

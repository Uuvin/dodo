package com.pcwk.ehr.calendar.repository;

import com.pcwk.ehr.calendar.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;


public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    
    // 💡 특정 회원의 모든 일정 조회
    List<Schedule> findByUserNo(Long userNo);
    
    // 💡 캘린더 화면용: 특정 유저의 시작일과 종료일 사이에 걸쳐 있는 일정만 쏙 뽑아오기
    List<Schedule> findByUserNoAndSchdlBgngBetween(Long userNo, LocalDateTime start, LocalDateTime end);
}
package com.pcwk.ehr.calendar.repository;

import com.pcwk.ehr.calendar.entity.Routine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface RoutineRepository extends JpaRepository<Routine, Long> {
    
    // 💡 특정 회원의 전체 루틴 목록을 조회하는 메서드
    List<Routine> findByUserNo(Long userNo);
    
    // 🛠️ 수정: RoutineActvYn -> RutnActvtnYn (엔티티의 private String rutnActvtnYn 변수명과 일치)
    List<Routine> findByUserNoAndRutnActvtnYn(Long userNo, String rutnActvtnYn);
}
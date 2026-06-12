package com.pcwk.ehr.calendar.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pcwk.ehr.calendar.entity.Todo;

import java.util.List;


public interface TodoRepository extends JpaRepository<Todo, Long> {
    
    /**
     * 로그인한 특정 유저의 할 일 목록만 달력에 띄워야 하므로,
     * USER_NO를 기준으로 데이터를 조회하는 메서드를 추가합니다.
     * 호출 시: SELECT * FROM TODOS WHERE USER_NO = ? 쿼리가 실행됨
     */
    List<Todo> findByUserNo(Long userNo);
}

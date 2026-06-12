package com.pcwk.ehr.calendar;

import com.pcwk.ehr.calendar.entity.Schedule;
import com.pcwk.ehr.calendar.repository.ScheduleRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@SpringBootTest
@Transactional // 💡 테스트 실행 후 데이터를 깔끔하게 자동 롤백해 줍니다.
class ScheduleTest {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Test
    @DisplayName("일정 등록 기능이 정상적으로 작동하며, 세부 정보가 올바르게 매칭되어야 한다.")
    void saveScheduleTest() {
        // 1. Given (테스트용 일정 데이터 준비)
        Schedule schedule = new Schedule();
        schedule.setUserNo(1L);               // DB에 심어둔 테스트 유저 1번 사용
        schedule.setSchdlClsf("SCHEDULE");    // ENUM 타입 매칭 (SCHEDULE, TODO, PERIOD)
        schedule.setSchdlTtl("해봄 트립 프로젝트 최종 회의");
        schedule.setSchdlCn("달력 및 루틴 모듈 JPA 전환 상태 최종 점검 및 마일스톤 확인");
        schedule.setSchdlBgng(LocalDateTime.of(2026, 6, 15, 14, 0)); // 2026년 6월 15일 14시
        schedule.setSchdlEnd(LocalDateTime.of(2026, 6, 15, 16, 0));  // 2026년 6월 15일 16시
        schedule.setSchdlAllDay("N");
        
        // 💡 만약 SCHDL_RUTN_NO 가 외래키 제약조건 때문에 에러가 난다면 
        // 일단 세팅하지 않거나(Null), 실제 DB에 존재하는 루틴 PK 번호를 넣어야 합니다.
        // 여기서는 안전하게 생략(Null)하고 진행합니다.

        // 2. When (JPA 저장 실행)
        Schedule savedSchedule = scheduleRepository.save(schedule);

        // 3. Then (결과 검증)
        // 검증 1: 자동 증가 PK가 제대로 생성되었는지 확인
        Assertions.assertThat(savedSchedule.getSchdlNo()).isNotNull();
        
        // 검증 2: 입력한 일정 제목이 똑바로 들어갔는지 확인
        Assertions.assertThat(savedSchedule.getSchdlTtl()).isEqualTo("해봄 트립 프로젝트 최종 회의");
        
        // 검증 3: 분류가 제대로 저장되었는지 확인
        Assertions.assertThat(savedSchedule.getSchdlClsf()).isEqualTo("SCHEDULE");

        // 🚀 이쁘게 인코딩되어 나올 콘솔 출력로그
        System.out.println("=========================================");
        System.out.println("실제 저장된 일정 번호(PK): " + savedSchedule.getSchdlNo());
        System.out.println("실제 저장된 일정 제목: " + savedSchedule.getSchdlTtl());
        System.out.println("일정 시작 시간: " + savedSchedule.getSchdlBgng());
        System.out.println("=========================================");
    }
}
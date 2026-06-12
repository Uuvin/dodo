package com.pcwk.ehr.calendar;

import com.pcwk.ehr.calendar.entity.Routine;
import com.pcwk.ehr.calendar.repository.RoutineRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@SpringBootTest
@Transactional
class RoutineTest {

    @Autowired
    private RoutineRepository routineRepository;

    @Test
    @DisplayName("루틴 등록 기능이 정상적으로 작동하며, 실제 DB 컬럼명과 매칭되어야 한다.")
    void saveRoutineTest() {
        // 1. Given
        Routine routine = new Routine();
        routine.setUserNo(1L); 
        routine.setRutnTtl("매일 영양제 먹기");
        routine.setRutnCn("아침 식사 후 종합비타민과 오메가3 챙겨 먹기");
        routine.setRutnReptDow("1111111"); // 월~일 전부 반복 예시
        routine.setRutnColorId(1);
        routine.setRutnBgngDt(LocalDate.now()); // 오늘부터 시작
        routine.setRutnEndDt(LocalDate.now().plusMonths(3)); // 3개월 뒤 종료

        // 2. When
        Routine savedRoutine = routineRepository.save(routine);

        // 3. Then
        Assertions.assertThat(savedRoutine.getRutnNo()).isNotNull();
        Assertions.assertThat(savedRoutine.getRutnTtl()).isEqualTo("매일 영양제 먹기");
        Assertions.assertThat(savedRoutine.getRutnActvtnYn()).isEqualTo("Y");

        System.out.println("=========================================");
        System.out.println("실제 저장된 루틴 번호(PK): " + savedRoutine.getRutnNo());
        System.out.println("실제 저장된 루틴 제목: " + savedRoutine.getRutnTtl());
        System.out.println("=========================================");
    }
}
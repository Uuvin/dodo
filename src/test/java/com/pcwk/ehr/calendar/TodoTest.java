package com.pcwk.ehr.calendar;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.pcwk.ehr.calendar.entity.Todo;
import com.pcwk.ehr.calendar.repository.TodoRepository;

//import java.time.LocalDate;

@SpringBootTest
class TodoTest {

    @Autowired
    private TodoRepository todoRepository;

    @Test
    @DisplayName("할 일 등록 기능이 정상적으로 작동하며, 기본키(PK)가 자동 증가해야 한다.")
    void saveTodoTest() {
        // 1. Given (테스트를 위한 준비 단계)
        Todo todo = new Todo();
        todo.setUserNo(1L); // 요청하신 user_no = 1 설정
        todo.setTodoTtl("JPA 환경에서 첫 할 일 등록하기");
        todo.setTodoCn("엔티티와 레퍼지토리 설정이 정상인지 테스트 코드로 확인하는 중입니다.");
        // todoCmptnYn은 엔티티에서 기본값 "N"으로 설정되어 있으므로 생략해도 됩니다.

        // 2. When (실제로 기능을 실행하는 단계)
        Todo savedTodo = todoRepository.save(todo);

        // 3. Then (결과가 내가 예상한 대로 나왔는지 검증하는 단계)
        // 검증 1: DB에 들어갔다 나오면서 AUTO_INCREMENT에 의해 TODO_NO(PK)가 자동으로 생성되었는지 확인
        Assertions.assertThat(savedTodo.getTodoNo()).isNotNull();
        
        // 검증 2: 입력한 제목이 손상 없이 그대로 잘 저장되었는지 확인
        Assertions.assertThat(savedTodo.getTodoTtl()).isEqualTo("JPA 환경에서 첫 할 일 등록하기");
        
        // 검증 3: 엔티티에 지정해 둔 완료 여부 기본값 "N"이 잘 박혀있는지 확인
        Assertions.assertThat(savedTodo.getTodoCmptnYn()).isEqualTo("N");
        
        // 로그로 확인하고 싶을 때 출력용 (테스트 완료 후 지워도 무방합니다)
        System.out.println("=========================================");
        System.out.println("저장된 할 일 번호: " + savedTodo.getTodoNo());
        System.out.println("저장된 할 일 제목: " + savedTodo.getTodoTtl());
        System.out.println("=========================================");
    }
}
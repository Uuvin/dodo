package com.pcwk.ehr.calendar.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
//import java.time.LocalDate;

@Entity
@Table(name = "TODOS") // MySQL의 TODOS 테이블과 매핑
@Getter @Setter
@NoArgsConstructor // JPA 엔티티에 필수인 기본 생성자 자동 생성
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // AUTO_INCREMENT (기본키 자동 증가)
    @Column(name = "TODO_NO")
    private Long todoNo;

    // 회원 고유 번호 (FK 역할, NN 조건 반영)
    @Column(name = "USER_NO", nullable = false)
    private Long userNo;

    // 할 일 제목 (varchar(255), NN 조건 반영)
    @Column(name = "TODO_TTL", length = 255, nullable = false)
    private String todoTtl;

    // 할 일 내용 (text 타입 반영)
    @Column(name = "TODO_CN", columnDefinition = "TEXT")
    private String todoCn;

    // 완료 여부 (char(1), 기본값 'N' 세팅)
    @Column(name = "TODO_CMPTN_YN", length = 1, nullable = false)
    private String todoCmptnYn = "N";

    /**
     * [추후 확장 고려 컬럼]
     * 화면단 달력에서 날짜를 클릭했을 때, 해당 일자가 디비에 저장되도록 매핑한 필드입니다.
     * MySQL에는 TODO_DATE (DATE 타입) 컬럼으로 반영됩니다.
     */
   // @Column(name = "TODO_DATE")
   // private LocalDate todoDate;
}

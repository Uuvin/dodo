package com.pcwk.ehr.calendar.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "SCHEDULES")
@Getter
@Setter
@NoArgsConstructor
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SCHDL_NO")
    private Long schdlNo; // 일정 번호 (PK, 자동 증가)

    @Column(name = "USER_NO", nullable = false)
    private Long userNo; // 유저 번호 (FK)

    @Column(name = "SCHDL_CLSF", length = 20)
    private String schdlClsf; // 일정 분류 (SCHEDULE, TODO, PERIOD)

    @Column(name = "SCHDL_RUTN_NO")
    private Long schdlRutnNo; // 연관 루틴 번호 (FK, Null 허용)

    @Column(name = "SCHDL_TTL", nullable = false, length = 255)
    private String schdlTtl; // 일정 제목

    @Column(name = "SCHDL_CN", columnDefinition = "TEXT")
    private String schdlCn; // 일정 내용

    @Column(name = "SCHDL_BGNG")
    private LocalDateTime schdlBgng; // 일정 시작일시

    @Column(name = "SCHDL_END")
    private LocalDateTime schdlEnd; // 일정 종료일시

    @Column(name = "SCHDL_ALL_DAY", length = 1)
    private String schdlAllDay = "N"; // 하루 종일 여부 (Y/N, 기본값 N)

    @Column(name = "STR_ITEM_NO")
    private Integer strItemNo; // 여행지 아이템 번호 (연동용)

    @Column(name = "REPT_NO")
    private Long reptNo; // 반복 번호 (FK)
}
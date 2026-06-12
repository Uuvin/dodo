package com.pcwk.ehr.calendar.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "ROUTINES")
@Getter
@Setter
@NoArgsConstructor
public class Routine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RUTN_NO") // 💡 수정: ROUTINE_NO -> RUTN_NO
    private Long rutnNo;

    @Column(name = "USER_NO", nullable = false)
    private Long userNo;

    @Column(name = "RUTN_TTL", nullable = false, length = 100) // 💡 수정: ROUTINE_TTL -> RUTN_TTL
    private String rutnTtl;

    @Column(name = "RUTN_CN", length = 500) // 💡 수정: ROUTINE_CN -> RUTN_CN
    private String rutnCn;

    @Column(name = "RUTN_REPT_DOW", length = 7) // 반복 요일
    private String rutnReptDow;

    @Column(name = "RUTN_COLOR_ID") // 루틴 색상 ID
    private Integer rutnColorId;

    @Column(name = "RUTN_ACTVTN_YN", length = 1) // 💡 수정: ROUTINE_ACTV_YN -> RUTN_ACTVTN_YN
    private String rutnActvtnYn = "Y";

    @Column(name = "RUTN_BGNG_DT") // 루틴 시작일 (java.time.LocalDate)
    private LocalDate rutnBgngDt;

    @Column(name = "RUTN_END_DT") // 루틴 종료일 (java.time.LocalDate)
    private LocalDate rutnEndDt;
}
package com.dodo.home.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TodayScheduleDto {
    private Long id;
    private String time;
    private String title;
    private String type;
    private boolean completed;
}

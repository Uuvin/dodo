package com.dodo.home.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RoutineDto {
    private Long id;
    private String name;
    private String time;
    private boolean completed;
}

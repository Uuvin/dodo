package com.dodo.routine.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Getter
@NoArgsConstructor
public class RoutineRequestDto {
    private String name;
    private LocalTime routineTime;
}

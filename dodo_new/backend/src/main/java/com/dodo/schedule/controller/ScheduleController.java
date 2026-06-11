package com.dodo.schedule.controller;

import com.dodo.global.response.ApiResponse;
import com.dodo.schedule.dto.ScheduleRequestDto;
import com.dodo.schedule.dto.ScheduleResponseDto;
import com.dodo.schedule.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/schedules")
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService scheduleService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ScheduleResponseDto>>> getSchedulesByDate(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(ApiResponse.ok(scheduleService.getSchedulesByDate(date)));
    }

    @GetMapping("/upcoming")
    public ResponseEntity<ApiResponse<List<ScheduleResponseDto>>> getUpcoming(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        return ResponseEntity.ok(ApiResponse.ok(scheduleService.getUpcomingSchedules(from, to)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ScheduleResponseDto>> createSchedule(@RequestBody ScheduleRequestDto request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("일정이 생성되었습니다.", scheduleService.createSchedule(request)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ScheduleResponseDto>> updateSchedule(
            @PathVariable Long id, @RequestBody ScheduleRequestDto request) {
        return ResponseEntity.ok(ApiResponse.ok("일정이 수정되었습니다.", scheduleService.updateSchedule(id, request)));
    }

    @PatchMapping("/{id}/complete")
    public ResponseEntity<ApiResponse<ScheduleResponseDto>> toggleComplete(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(scheduleService.toggleComplete(id)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteSchedule(@PathVariable Long id) {
        scheduleService.deleteSchedule(id);
        return ResponseEntity.ok(ApiResponse.ok("일정이 삭제되었습니다.", null));
    }
}

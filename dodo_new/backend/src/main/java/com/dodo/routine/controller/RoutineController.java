package com.dodo.routine.controller;

import com.dodo.global.response.ApiResponse;
import com.dodo.routine.dto.RoutineRequestDto;
import com.dodo.routine.dto.RoutineResponseDto;
import com.dodo.routine.service.RoutineService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/routines")
@RequiredArgsConstructor
public class RoutineController {

    private final RoutineService routineService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<RoutineResponseDto>>> getAllRoutines() {
        return ResponseEntity.ok(ApiResponse.ok(routineService.getAllRoutines()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<RoutineResponseDto>> createRoutine(@RequestBody RoutineRequestDto request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("루틴이 생성되었습니다.", routineService.createRoutine(request)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<RoutineResponseDto>> updateRoutine(
            @PathVariable Long id, @RequestBody RoutineRequestDto request) {
        return ResponseEntity.ok(ApiResponse.ok("루틴이 수정되었습니다.", routineService.updateRoutine(id, request)));
    }

    @PatchMapping("/{id}/complete")
    public ResponseEntity<ApiResponse<RoutineResponseDto>> toggleComplete(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(routineService.toggleComplete(id)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteRoutine(@PathVariable Long id) {
        routineService.deleteRoutine(id);
        return ResponseEntity.ok(ApiResponse.ok("루틴이 삭제되었습니다.", null));
    }
}

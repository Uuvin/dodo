package com.dodo.memo.controller;

import com.dodo.global.response.ApiResponse;
import com.dodo.memo.dto.MemoRequestDto;
import com.dodo.memo.dto.MemoResponseDto;
import com.dodo.memo.service.MemoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/memos")
@RequiredArgsConstructor
public class MemoController {

    private final MemoService memoService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<MemoResponseDto>>> getAllMemos() {
        return ResponseEntity.ok(ApiResponse.ok(memoService.getAllMemos()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<MemoResponseDto>> createMemo(@RequestBody MemoRequestDto request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("메모가 생성되었습니다.", memoService.createMemo(request)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<MemoResponseDto>> updateMemo(
            @PathVariable Long id, @RequestBody MemoRequestDto request) {
        return ResponseEntity.ok(ApiResponse.ok("메모가 수정되었습니다.", memoService.updateMemo(id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteMemo(@PathVariable Long id) {
        memoService.deleteMemo(id);
        return ResponseEntity.ok(ApiResponse.ok("메모가 삭제되었습니다.", null));
    }
}

package com.dodo.memo.service;

import com.dodo.memo.dto.MemoRequestDto;
import com.dodo.memo.dto.MemoResponseDto;

import java.util.List;

public interface MemoService {
    List<MemoResponseDto> getAllMemos();
    MemoResponseDto createMemo(MemoRequestDto request);
    MemoResponseDto updateMemo(Long id, MemoRequestDto request);
    void deleteMemo(Long id);
}

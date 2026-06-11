package com.dodo.memo.service;

import com.dodo.global.exception.NotFoundException;
import com.dodo.memo.dto.MemoRequestDto;
import com.dodo.memo.dto.MemoResponseDto;
import com.dodo.memo.entity.Memo;
import com.dodo.memo.repository.MemoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemoServiceImpl implements MemoService {

    private final MemoRepository memoRepository;

    @Override
    public List<MemoResponseDto> getAllMemos() {
        return memoRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(MemoResponseDto::new)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public MemoResponseDto createMemo(MemoRequestDto request) {
        Memo memo = Memo.builder()
                .content(request.getContent())
                .color(request.getColor())
                .build();
        return new MemoResponseDto(memoRepository.save(memo));
    }

    @Override
    @Transactional
    public MemoResponseDto updateMemo(Long id, MemoRequestDto request) {
        Memo memo = memoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("메모를 찾을 수 없습니다."));
        memo.update(request.getContent(), request.getColor());
        return new MemoResponseDto(memo);
    }

    @Override
    @Transactional
    public void deleteMemo(Long id) {
        if (!memoRepository.existsById(id)) {
            throw new NotFoundException("메모를 찾을 수 없습니다.");
        }
        memoRepository.deleteById(id);
    }
}

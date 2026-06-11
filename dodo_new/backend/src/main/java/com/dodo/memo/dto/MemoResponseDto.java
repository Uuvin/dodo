package com.dodo.memo.dto;

import com.dodo.memo.entity.Memo;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class MemoResponseDto {
    private Long id;
    private String content;
    private String color;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public MemoResponseDto(Memo memo) {
        this.id = memo.getId();
        this.content = memo.getContent();
        this.color = memo.getColor();
        this.createdAt = memo.getCreatedAt();
        this.updatedAt = memo.getUpdatedAt();
    }
}

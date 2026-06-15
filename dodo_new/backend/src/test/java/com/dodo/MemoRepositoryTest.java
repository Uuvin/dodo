package com.dodo;

import com.dodo.memo.entity.Memo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import com.dodo.memo.repository.MemoRepository;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
class MemoRepositoryTest {

    @Autowired
    private MemoRepository memoRepository;

    @BeforeEach
    void setUp() {
        memoRepository.deleteAll();
    }

    // -------------------------------------------------------
    // 1. 저장
    // -------------------------------------------------------
    @Test
    @DisplayName("메모를 저장하면 ID가 자동 생성된다")
    void save_success() {
        // given
        Memo memo = Memo.builder()
                .content("테스트 메모 내용")
                .color("bg-yellow-50 border-yellow-200")
                .build();

        // when
        Memo saved = memoRepository.save(memo);

        // then
        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getContent()).isEqualTo("테스트 메모 내용");
        assertThat(saved.getColor()).isEqualTo("bg-yellow-50 border-yellow-200");
    }

    @Test
    @DisplayName("메모를 저장하면 createdAt, updatedAt이 자동 설정된다")
    void save_auditing() {
        // given
        Memo memo = Memo.builder()
                .content("Auditing 테스트")
                .color("bg-blue-50 border-blue-200")
                .build();

        // when
        Memo saved = memoRepository.save(memo);

        // then
        assertThat(saved.getCreatedAt()).isNotNull();
        assertThat(saved.getUpdatedAt()).isNotNull();
    }

    // -------------------------------------------------------
    // 2. 단건 조회
    // -------------------------------------------------------
    @Test
    @DisplayName("존재하는 ID로 조회하면 메모가 반환된다")
    void findById_exists() {
        // given
        Memo saved = memoRepository.save(Memo.builder()
                .content("조회 테스트")
                .color("bg-pink-50 border-pink-200")
                .build());

        // when
        Optional<Memo> result = memoRepository.findById(saved.getId());

        // then
        assertThat(result).isPresent();
        assertThat(result.get().getContent()).isEqualTo("조회 테스트");
    }

    @Test
    @DisplayName("존재하지 않는 ID로 조회하면 empty가 반환된다")
    void findById_notFound() {
        // when
        Optional<Memo> result = memoRepository.findById(999L);

        // then
        assertThat(result).isEmpty();
    }

    // -------------------------------------------------------
    // 3. 전체 조회 (최신순 정렬)
    // -------------------------------------------------------
    @Test
    @DisplayName("메모가 없으면 빈 리스트가 반환된다")
    void findAllByOrderByCreatedAtDesc_empty() {
        // when
        List<Memo> result = memoRepository.findAllByOrderByCreatedAtDesc();

        // then
        assertThat(result).isEmpty();
    }

    @Test
    @DisplayName("여러 메모를 저장하면 최신순으로 정렬되어 반환된다")
    void findAllByOrderByCreatedAtDesc_sorted() throws InterruptedException {
        // given - 시간 차이를 두고 저장
        Memo first = memoRepository.save(Memo.builder()
                .content("첫 번째 메모")
                .color("bg-yellow-50 border-yellow-200")
                .build());

        Thread.sleep(10); // createdAt 차이 보장

        Memo second = memoRepository.save(Memo.builder()
                .content("두 번째 메모")
                .color("bg-blue-50 border-blue-200")
                .build());

        Thread.sleep(10);

        Memo third = memoRepository.save(Memo.builder()
                .content("세 번째 메모")
                .color("bg-pink-50 border-pink-200")
                .build());

        // when
        List<Memo> result = memoRepository.findAllByOrderByCreatedAtDesc();

        // then - 최신(세 번째)이 맨 앞
        assertThat(result).hasSize(3);
        assertThat(result.get(0).getContent()).isEqualTo("세 번째 메모");
        assertThat(result.get(1).getContent()).isEqualTo("두 번째 메모");
        assertThat(result.get(2).getContent()).isEqualTo("첫 번째 메모");
    }

    // -------------------------------------------------------
    // 4. 수정 (Dirty Checking)
    // -------------------------------------------------------
    @Test
    @DisplayName("update() 호출 후 다시 조회하면 변경된 내용이 반영된다")
    void update_dirtyChecking() {
        // given
        Memo saved = memoRepository.save(Memo.builder()
                .content("원본 내용")
                .color("bg-yellow-50 border-yellow-200")
                .build());

        // when - 엔티티 메서드로 수정 (save() 없이 Dirty Checking)
        saved.update("수정된 내용", "bg-blue-50 border-blue-200");
        memoRepository.flush(); // DB 반영 강제

        // then
        Memo found = memoRepository.findById(saved.getId()).get();
        assertThat(found.getContent()).isEqualTo("수정된 내용");
        assertThat(found.getColor()).isEqualTo("bg-blue-50 border-blue-200");
    }

    // -------------------------------------------------------
    // 5. 삭제
    // -------------------------------------------------------
    @Test
    @DisplayName("ID로 삭제하면 조회 시 empty가 반환된다")
    void deleteById_success() {
        // given
        Memo saved = memoRepository.save(Memo.builder()
                .content("삭제 테스트")
                .color("bg-gray-100 border-gray-200")
                .build());

        // when
        memoRepository.deleteById(saved.getId());

        // then
        assertThat(memoRepository.findById(saved.getId())).isEmpty();
    }

    @Test
    @DisplayName("존재하는 ID는 existsById가 true를 반환한다")
    void existsById_true() {
        // given
        Memo saved = memoRepository.save(Memo.builder()
                .content("존재 확인 테스트")
                .color("bg-purple-50 border-purple-200")
                .build());

        // when & then
        assertThat(memoRepository.existsById(saved.getId())).isTrue();
    }

    @Test
    @DisplayName("존재하지 않는 ID는 existsById가 false를 반환한다")
    void existsById_false() {
        // when & then
        assertThat(memoRepository.existsById(999L)).isFalse();
    }
}

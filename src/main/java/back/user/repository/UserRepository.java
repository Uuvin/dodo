package back.user.repository; // 1. 새로 만든 폴더 위치에 맞게 패키지 주소 수정

import back.user.entity.User; // 2. 중요! 다른 폴더(entity)로 이동한 User 클래스를 불러옴

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    
    // 1. 일반 로그인 검증: 이메일로 유저 정보 찾기
    Optional<User> findByUserEml(String userEml);
    
    // 2. 소셜 로그인 검증: 제공자 플랫폼 이름(GOOGLE 등)과 소셜 고유 ID 세트로 유저 정보 찾기
    Optional<User> findByUserProviderAndUserProviderId(String userProvider, String userProviderId);

    // 3. 회원가입 전 이메일 중복 체크용
    boolean existsByUserEml(String userEml);

    // 4. 회원가입 전 닉네임 중복 체크용
    boolean existsByUserNick(String userNick);
}
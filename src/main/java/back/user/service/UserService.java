package back.user.service;

import back.user.entity.User;
import back.user.repository.UserRepository;
import back.user.mapper.UserMapper; // 1. 추가: MyBatis 매퍼 인터페이스 import

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper; // 2. 추가: 의존성 주입

    @Transactional
    public void register(String email, String password, String name, String nickname, String telno) {
        if (userRepository.existsByUserEml(email)) {
            throw new IllegalArgumentException("이미 존재하는 이메일입니다.");
        }
        if (userRepository.existsByUserNick(nickname)) {
            throw new IllegalArgumentException("이미 존재하는 닉네임입니다.");
        }

        User user = User.builder()
                .userEml(email)
                .userPswd(password)
                .userNm(name)
                .userNick(nickname)
                .userTelno(telno)
                .userProvider("LOCAL")
                .build();

        // 3. 변경: MyBatis를 사용하여 순차적 INSERT 수행

        // 생성된 userNo를 가진 user 정보를 USERS에 넣음
        userMapper.insertUser(user);

        // 먼저 SETTINGS를 넣어서 USER_NO를 생성하고 user 객체에 채움
        userMapper.insertSettings(user); 
        
    }

    // [추가] 2. 일반 로그인 로직
    @Transactional(readOnly = true)
    public User login(String email, String password) {
        // 1. 이메일로 유저 조회
        User user = userRepository.findByUserEml(email)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이메일입니다."));

        // 2. 소셜 가입 계정이 일반 로그인을 시도하는지 방지
        if ("LOCAL".equals(user.getUserProvider()) && user.getUserPswd() == null) {
            throw new IllegalArgumentException("잘못된 접근입니다.");
        }

        // 3. 비밀번호 일치 확인 (실무에서는 passwordEncoder.matches() 사용)
        if (!user.getUserPswd().equals(password)) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        // 4. 탈퇴 여부 등 추가 검증 (필요시)
        if ("Y".equals(user.getUserWhdwlYn())) {
            throw new IllegalArgumentException("탈퇴한 회원입니다.");
        }

        return user;
    }

    // 3. 소셜 로그인 및 자동 회원가입 로직
    @Transactional
    public User processSocialLogin(String email, String name, String provider, String providerId) {
        return userRepository.findByUserProviderAndUserProviderId(provider, providerId)
                .orElseGet(() -> {
                    User newUser = User.builder()
                            .userEml(email)
                            .userNm(name)
                            .userNick(name + "_소셜" + System.currentTimeMillis() % 1000)
                            .userProvider(provider)
                            .userProviderId(providerId)
                            .build();
                    return userRepository.save(newUser);
                });
    }
}
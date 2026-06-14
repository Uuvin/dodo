package back.user.controller;

import back.user.service.UserService;
import back.user.entity.User;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // 일반 회원가입 API 관문
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody Map<String, String> request) {
        try {
            userService.register(
                request.get("userEml"),
                request.get("userPswd"),
                request.get("userNm"),
                request.get("userNick"),
                request.get("userTelno")
            );
            return ResponseEntity.ok("회원가입 성공");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // [추가] 일반 로그인 API 관문
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            User user = userService.login(request.getUserEml(), request.getUserPswd());
            // 성공 시 리액트단에 인증된 유저 정보를 반환 (보안상 비밀번호 필드는 제외하고 주는 것이 좋습니다)
            return ResponseEntity.ok(user);
        } catch (IllegalArgumentException e) {
            // 이메일 없음, 비밀번호 불일치 등의 에러 메시지를 리액트로 전송
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 소셜 로그인 API 관문
    @PostMapping("/social-login")
    public ResponseEntity<User> socialLogin(@RequestBody Map<String, String> request) {
        User user = userService.processSocialLogin(
            request.get("userEml"),
            request.get("userNm"),
            request.get("userProvider"),
            request.get("userProviderId")
        );
        return ResponseEntity.ok(user);
    }

    // 로그인 요청을 위한 DTO (Controller 내부 혹은 별도 파일로 분리 가능)
    @Getter
    @NoArgsConstructor
    public static class LoginRequest {
        private String userEml;
        private String userPswd;
    }
}
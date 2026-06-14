package back.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // 1. 리액트에서 오는 CORS 요청을 허용합니다 (아래 corsConfigurationSource 세팅 적용)
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            
            // 2. 리액트에서 데이터 주고받을 때 에러 안 나게 CSRF 보안 해제
            .csrf(csrf -> csrf.disable())
            
            // 3. 특정 주소 허용 규칙 정하기
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/user/signup", "/api/user/login", "/api/user/social-login").permitAll()
                .anyRequest().authenticated()
            )
            
            // 4. 소셜 로그인 기능 활성화
            .oauth2Login(oauth2 -> oauth2
                .defaultSuccessUrl("http://localhost:3000/main", true)
            );

        return http.build();
    }

    // ★ 리액트(5173 포트)의 접근을 전면 허용해주는 자격증 발급소 설정
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        configuration.setAllowedOrigins(List.of("http://localhost:5173")); // 리액트 주소 허용
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); // 모든 요청 메서드 허용
        configuration.setAllowedHeaders(List.of("*")); // 모든 헤더 허용
        configuration.setAllowCredentials(true); // 쿠키나 로그인 세션도 주고받을 수 있게 허용

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // 모든 주소에 이 CORS 설정 적용
        return source;
    }
}
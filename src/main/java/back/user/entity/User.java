package back.user.entity; 

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor; // 1. 필수 추가
import java.time.LocalDateTime;

@Entity
@Table(name = "USERS")
@Getter
@NoArgsConstructor // JPA 전용 기본 생성자
@AllArgsConstructor // 2. @Builder.Default를 쓰기 위해 무조건 필요한 생성자
@Builder // 3. 클래스 레벨로 빌더를 올려서 @Builder.Default가 완벽히 작동하게 만듭니다.
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_NO")
    private Integer userNo;

    @Column(name = "USER_EML", unique = true, nullable = false)
    private String userEml;

    @Column(name = "USER_PSWD")
    private String userPswd;

    @Column(name = "USER_NM")
    private String userNm;

    @Column(name = "USER_NICK", unique = true)
    private String userNick;

    @Column(name = "USER_TELNO")
    private String userTelno;

    @Builder.Default 
    @Column(name = "USER_MNGR_AUTHRT_YN")
    private String userMngrAuthrtYn = "Y";

    @Builder.Default
    @Column(name = "USER_SUB_YN")
    private String userSubYn = "N";

    @Builder.Default
    @Column(name = "USER_JOIN_DT")
    private LocalDateTime userJoinDt = LocalDateTime.now();

    @Column(name = "USER_MOD_HR")
    private LocalDateTime userModHr;

    @Builder.Default
    @Column(name = "USER_WHDWL_YN")
    private String userWhdwlYn = "N";

    @Column(name = "USER_WHDWL_DT")
    private java.time.LocalDate userWhdwlDt;

    @Builder.Default
    @Column(name = "USER_DRM_YN")
    private String userDrmYn = "N";

    @Column(name = "USER_DRM_DT")
    private java.time.LocalDate userDrmDt;

    @Builder.Default
    @Column(name = "USER_PROVIDER")
    private String userProvider = "LOCAL";

    @Column(name = "USER_PROVIDER_ID")
    private String userProviderId;

    // 4. 맨 밑에 수동으로 만드셨던 생성자(@Builder public User(...))는 
    // 클래스 레벨의 @Builder가 완벽하게 대체해주므로 중복 방지를 위해 삭제해도 무방하며, 
    // 이 완전판 코드로 덮어쓰시면 깔끔하게 해결됩니다!
}
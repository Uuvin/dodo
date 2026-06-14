package back.user.mapper;

import back.user.entity.User; // User 엔티티 경로 확인하세요!
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    
    // 이 메서드 이름들이 UserMapper.xml의 id와 똑같아야 합니다.
    void insertSettings(User user);
    void insertUser(User user);
}
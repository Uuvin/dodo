package com.dodo.user.service;

import com.dodo.global.exception.BadRequestException;
import com.dodo.global.exception.NotFoundException;
import com.dodo.user.dto.UserRequestDto;
import com.dodo.user.dto.UserResponseDto;
import com.dodo.user.entity.User;
import com.dodo.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    public UserResponseDto register(UserRequestDto request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("이미 사용 중인 이메일입니다.");
        }
        User user = User.builder()
                .email(request.getEmail())
                .password(request.getPassword()) // TODO: 비밀번호 암호화 적용
                .nickname(request.getNickname())
                .build();
        return new UserResponseDto(userRepository.save(user));
    }

    @Override
    public UserResponseDto login(UserRequestDto request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new NotFoundException("사용자를 찾을 수 없습니다."));
        if (!user.getPassword().equals(request.getPassword())) {
            throw new BadRequestException("비밀번호가 올바르지 않습니다.");
        }
        return new UserResponseDto(user);
    }

    @Override
    public UserResponseDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("사용자를 찾을 수 없습니다."));
        return new UserResponseDto(user);
    }
}

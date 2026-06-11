package com.dodo.user.service;

import com.dodo.user.dto.UserRequestDto;
import com.dodo.user.dto.UserResponseDto;

public interface UserService {
    UserResponseDto register(UserRequestDto request);
    UserResponseDto login(UserRequestDto request);
    UserResponseDto getUserById(Long id);
}

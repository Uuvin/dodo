package com.dodo.home.controller;

import com.dodo.global.response.ApiResponse;
import com.dodo.home.dto.HomeResponseDto;
import com.dodo.home.service.HomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/home")
@RequiredArgsConstructor
public class HomeController {

    private final HomeService homeService;

    @GetMapping
    public ResponseEntity<ApiResponse<HomeResponseDto>> getHome() {
        return ResponseEntity.ok(ApiResponse.ok(homeService.getHomeData()));
    }
}

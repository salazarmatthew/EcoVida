package com.salazar.notificationservice.services;

import com.salazar.notificationservice.dtos.ApiResponseDto;
import com.salazar.notificationservice.dtos.MailRequestDto;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface NotificationService {
    ResponseEntity<ApiResponseDto<?>> sendEmail(MailRequestDto requestDto);
}

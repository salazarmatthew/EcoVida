package com.salazar.authservice.services;

import com.salazar.authservice.dtos.ApiResponseDto;
import com.salazar.authservice.dtos.SignInRequestDto;
import com.salazar.authservice.dtos.SignUpRequestDto;
import com.salazar.authservice.exceptions.ServiceLogicException;
import com.salazar.authservice.exceptions.UserAlreadyExistsException;
import com.salazar.authservice.exceptions.UserNotFoundException;
import com.salazar.authservice.exceptions.UserVerificationFailedException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

@Service
public interface AuthService {
    ResponseEntity<ApiResponseDto<?>> registerUser(SignUpRequestDto signUpRequestDto) throws UnsupportedEncodingException, UserAlreadyExistsException, ServiceLogicException;
    ResponseEntity<ApiResponseDto<?>> resendVerificationCode(String email) throws UnsupportedEncodingException, UserNotFoundException, ServiceLogicException;
    ResponseEntity<ApiResponseDto<?>> verifyRegistrationVerification(String code) throws UserVerificationFailedException;
    ResponseEntity<ApiResponseDto<?>> authenticateUser(SignInRequestDto signInRequestDto);
    ResponseEntity<ApiResponseDto<?>> validateToken(String token);
}

package com.salazar.authservice.controllers;

import com.salazar.authservice.dtos.ApiResponseDto;
import com.salazar.authservice.dtos.SignInRequestDto;
import com.salazar.authservice.dtos.SignUpRequestDto;
import com.salazar.authservice.exceptions.ServiceLogicException;
import com.salazar.authservice.exceptions.UserAlreadyExistsException;
import com.salazar.authservice.exceptions.UserNotFoundException;
import com.salazar.authservice.exceptions.UserVerificationFailedException;
import com.salazar.authservice.services.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.UnsupportedEncodingException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class AuthControllerTest {

    @Mock
    private AuthService authService;

    @InjectMocks
    private AuthController authController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void registerUser_Success() throws UnsupportedEncodingException, UserAlreadyExistsException, ServiceLogicException {
        // Arrange
        SignUpRequestDto signUpRequestDto = new SignUpRequestDto("test@example.com", "password123", "testuser");
        ResponseEntity<ApiResponseDto<?>> expectedResponse =
                new ResponseEntity<>(
                        ApiResponseDto.builder()
                                .isSuccess(true)
                                .message("User registered")
                                .response(null)
                                .build(),
                        HttpStatus.OK
                );

        when(authService.registerUser(signUpRequestDto)).thenReturn(expectedResponse);

        // Act
        ResponseEntity<ApiResponseDto<?>> response = authController.registerUser(signUpRequestDto);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedResponse, response);
        verify(authService, times(1)).registerUser(signUpRequestDto);
    }

    @Test
    void resendVerificationCode_Success() throws UnsupportedEncodingException, UserNotFoundException, ServiceLogicException {
        // Arrange
        String email = "test@example.com";
        ResponseEntity<ApiResponseDto<?>> expectedResponse =
                new ResponseEntity<>(
                        ApiResponseDto.builder()
                                .isSuccess(true)
                                .message("Code sent")
                                .response(null)
                                .build(),
                        HttpStatus.OK
                );

        when(authService.resendVerificationCode(email)).thenReturn(expectedResponse);

        // Act
        ResponseEntity<ApiResponseDto<?>> response = authController.resendVerificationCode(email);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedResponse, response);
        verify(authService, times(1)).resendVerificationCode(email);
    }

    @Test
    void verifyRegistrationVerification_Success() throws UserVerificationFailedException {
        // Arrange
        String code = "123456";
        ResponseEntity<ApiResponseDto<?>> expectedResponse =
                new ResponseEntity<>(
                        ApiResponseDto.builder()
                                .isSuccess(true)
                                .message("Verified")
                                .response(null)
                                .build(),
                        HttpStatus.OK
                );

        when(authService.verifyRegistrationVerification(code)).thenReturn(expectedResponse);

        // Act
        ResponseEntity<ApiResponseDto<?>> response = authController.verifyRegistrationVerification(code);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedResponse, response);
        verify(authService, times(1)).verifyRegistrationVerification(code);
    }

    @Test
    void authenticateUser_Success() {
        // Arrange
        SignInRequestDto signInRequestDto = new SignInRequestDto("test@example.com", "password123");
        ResponseEntity<ApiResponseDto<?>> expectedResponse =
                new ResponseEntity<>(
                        ApiResponseDto.builder()
                                .isSuccess(true)
                                .message("Authenticated")
                                .response(null)
                                .build(),
                        HttpStatus.OK
                );

        when(authService.authenticateUser(signInRequestDto)).thenReturn(expectedResponse);

        // Act
        ResponseEntity<ApiResponseDto<?>> response = authController.authenticateUser(signInRequestDto);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedResponse, response);
        verify(authService, times(1)).authenticateUser(signInRequestDto);
    }

    @Test
    void validateToken_Success() {
        // Arrange
        String token = "valid-token";
        ResponseEntity<ApiResponseDto<?>> expectedResponse =
                new ResponseEntity<>(
                        ApiResponseDto.builder()
                                .isSuccess(true)
                                .message("Valid token")
                                .response(null)
                                .build(),
                        HttpStatus.OK
                );

        when(authService.validateToken(token)).thenReturn(expectedResponse);

        // Act
        ResponseEntity<ApiResponseDto<?>> response = authController.validateToken(token);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedResponse, response);
        verify(authService, times(1)).validateToken(token);
    }

    @Test
    void registerUser_UserAlreadyExistsException() throws UnsupportedEncodingException, UserAlreadyExistsException, ServiceLogicException {
        // Arrange
        SignUpRequestDto signUpRequestDto = new SignUpRequestDto("test@example.com", "password123", "testuser");

        when(authService.registerUser(signUpRequestDto))
                .thenThrow(new UserAlreadyExistsException("User already exists"));

        // Act & Assert
        try {
            authController.registerUser(signUpRequestDto);
        } catch (UserAlreadyExistsException e) {
            assertEquals("User already exists", e.getMessage());
        }
        verify(authService, times(1)).registerUser(signUpRequestDto);
    }
}
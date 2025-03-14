package com.salazar.categoryservice.exceptionsHandlers;

import com.salazar.categoryservice.dtos.ApiResponseDto;
import com.salazar.categoryservice.exceptions.CategoryAlreadyExistsException;
import com.salazar.categoryservice.exceptions.CategoryNotFoundException;
import com.salazar.categoryservice.exceptions.ServiceLogicException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@RestControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(value = ServiceLogicException.class)
    public ResponseEntity<ApiResponseDto<?>> ServiceLogicExceptionHandler(ServiceLogicException exception) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                ApiResponseDto.builder()
                        .isSuccess(false)
                        .message(exception.getMessage())
                        .build()
        );
    }
    @ExceptionHandler(value = CategoryNotFoundException.class)
    public ResponseEntity<ApiResponseDto<?>> CategoryNotFoundExceptionHandler(CategoryNotFoundException exception) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                ApiResponseDto.builder()
                        .isSuccess(false)
                        .message(exception.getMessage())
                        .build()
        );
    }

    @ExceptionHandler(value = CategoryAlreadyExistsException.class)
    public ResponseEntity<ApiResponseDto<?>> CategoryAlreadyExistsExceptionHandler(CategoryAlreadyExistsException exception) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(
                ApiResponseDto.builder()
                        .isSuccess(false)
                        .message(exception.getMessage())
                        .build()
        );
    }

}

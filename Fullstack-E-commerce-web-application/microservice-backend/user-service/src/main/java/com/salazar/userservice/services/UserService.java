package com.salazar.userservice.services;

import com.salazar.userservice.dtos.ApiResponseDto;
import com.salazar.userservice.exceptions.ServiceLogicException;
import com.salazar.userservice.exceptions.UserNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Service
public interface UserService {
    ResponseEntity<ApiResponseDto<?>> existsUserById(String userId) throws ServiceLogicException;

    ResponseEntity<ApiResponseDto<?>> getUserById(String id) throws ServiceLogicException, UserNotFoundException;
}

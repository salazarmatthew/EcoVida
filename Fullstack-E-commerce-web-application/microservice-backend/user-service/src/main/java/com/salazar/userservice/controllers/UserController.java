package com.salazar.userservice.controllers;

import com.salazar.userservice.dtos.ApiResponseDto;
import com.salazar.userservice.exceptions.ServiceLogicException;
import com.salazar.userservice.exceptions.UserNotFoundException;
import com.salazar.userservice.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/exists/byId")
    public ResponseEntity<ApiResponseDto<?>> existsUserById(@RequestParam String userId) throws ServiceLogicException {
        return userService.existsUserById(userId);
    }

    @GetMapping("/get/byId")
    ResponseEntity<ApiResponseDto<?>> getUserById(@RequestParam String id) throws UserNotFoundException, ServiceLogicException {
        return userService.getUserById(id);
    }


}


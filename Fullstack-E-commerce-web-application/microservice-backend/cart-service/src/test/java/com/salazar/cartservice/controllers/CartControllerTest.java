package com.salazar.cartservice.controllers;

import com.salazar.cartservice.dtos.ApiResponseDto;
import com.salazar.cartservice.dtos.CartItemRequestDto;
import com.salazar.cartservice.exceptions.ResourceNotFoundException;
import com.salazar.cartservice.exceptions.ServiceLogicException;
import com.salazar.cartservice.services.CartService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class CartControllerTest {

    @Mock
    private CartService cartService;

    @Mock
    private Authentication authentication;

    @InjectMocks
    private CartController cartController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        // Configurar el mock de Authentication para devolver un principal
        when(authentication.getPrincipal()).thenReturn("user123");
    }

    @Test
    void addItemToCart_Success() throws ResourceNotFoundException, ServiceLogicException {
        // Arrange
        CartItemRequestDto requestDto = new CartItemRequestDto("prod1", 2);
        ResponseEntity<ApiResponseDto<?>> expectedResponse =
                new ResponseEntity<>(
                        ApiResponseDto.builder()
                                .isSuccess(true)
                                .message("Item added to cart")
                                .response(null)
                                .build(),
                        HttpStatus.OK
                );

        when(cartService.addItemToCart("user123", requestDto)).thenReturn(expectedResponse);

        // Act
        ResponseEntity<ApiResponseDto<?>> response = cartController.addItemToCart(authentication, requestDto);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedResponse, response);
        verify(cartService, times(1)).addItemToCart("user123", requestDto);
    }

    @Test
    void getCartItemsByUser_Success() throws ResourceNotFoundException, ServiceLogicException {
        // Arrange
        ResponseEntity<ApiResponseDto<?>> expectedResponse =
                new ResponseEntity<>(
                        ApiResponseDto.builder()
                                .isSuccess(true)
                                .message("Cart items retrieved")
                                .response(null)
                                .build(),
                        HttpStatus.OK
                );

        when(cartService.getCartItemsByUser("user123")).thenReturn(expectedResponse);

        // Act
        ResponseEntity<ApiResponseDto<?>> response = cartController.getCartItemsByUser(authentication);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedResponse, response);
        verify(cartService, times(1)).getCartItemsByUser("user123");
    }

    @Test
    void removeCartItemFromCart_Success() throws ServiceLogicException, ResourceNotFoundException {
        // Arrange
        String productId = "prod1";
        ResponseEntity<ApiResponseDto<?>> expectedResponse =
                new ResponseEntity<>(
                        ApiResponseDto.builder()
                                .isSuccess(true)
                                .message("Item removed from cart")
                                .response(null)
                                .build(),
                        HttpStatus.OK
                );

        when(cartService.removeCartItemFromCart("user123", productId)).thenReturn(expectedResponse);

        // Act
        ResponseEntity<ApiResponseDto<?>> response = cartController.removeCartItemFromCart(authentication, productId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedResponse, response);
        verify(cartService, times(1)).removeCartItemFromCart("user123", productId);
    }

    @Test
    void getCartById_Success() throws ServiceLogicException {
        // Arrange
        String cartId = "cart123";
        ResponseEntity<ApiResponseDto<?>> expectedResponse =
                new ResponseEntity<>(
                        ApiResponseDto.builder()
                                .isSuccess(true)
                                .message("Cart retrieved")
                                .response(null)
                                .build(),
                        HttpStatus.OK
                );

        when(cartService.getCartById(cartId)).thenReturn(expectedResponse);

        // Act
        ResponseEntity<ApiResponseDto<?>> response = cartController.getCartById(cartId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedResponse, response);
        verify(cartService, times(1)).getCartById(cartId);
    }

    @Test
    void clearCartById_Success() throws ResourceNotFoundException, ServiceLogicException {
        // Arrange
        String cartId = "cart123";
        ResponseEntity<ApiResponseDto<?>> expectedResponse =
                new ResponseEntity<>(
                        ApiResponseDto.builder()
                                .isSuccess(true)
                                .message("Cart cleared")
                                .response(null)
                                .build(),
                        HttpStatus.OK
                );

        when(cartService.clearCartById(cartId)).thenReturn(expectedResponse);

        // Act
        ResponseEntity<ApiResponseDto<?>> response = cartController.clearCartById(cartId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedResponse, response);
        verify(cartService, times(1)).clearCartById(cartId);
    }

    @Test
    void addItemToCart_ResourceNotFoundException() throws ResourceNotFoundException, ServiceLogicException {
        // Arrange
        CartItemRequestDto requestDto = new CartItemRequestDto("prod1", 2);

        when(cartService.addItemToCart("user123", requestDto))
                .thenThrow(new ResourceNotFoundException("Product not found"));

        // Act & Assert
        try {
            cartController.addItemToCart(authentication, requestDto);
        } catch (ResourceNotFoundException e) {
            assertEquals("Product not found", e.getMessage());
        }
        verify(cartService, times(1)).addItemToCart("user123", requestDto);
    }
}
package com.salazar.categoryservice.services;


import com.salazar.categoryservice.dtos.ApiResponseDto;
import com.salazar.categoryservice.dtos.CategoryRequestDto;
import com.salazar.categoryservice.exceptions.CategoryAlreadyExistsException;
import com.salazar.categoryservice.exceptions.ServiceLogicException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface CategoryService {

    ResponseEntity<ApiResponseDto<?>> getAllCategories() throws ServiceLogicException;

    ResponseEntity<ApiResponseDto<?>> getCategoryById(String categoryId) throws ServiceLogicException;

    ResponseEntity<ApiResponseDto<?>> createCategory(CategoryRequestDto categoryRequestDto) throws ServiceLogicException, CategoryAlreadyExistsException;

    ResponseEntity<ApiResponseDto<?>> editCategory(String categoryId, CategoryRequestDto categoryRequestDto) throws ServiceLogicException, CategoryAlreadyExistsException;

    ResponseEntity<ApiResponseDto<?>> deleteCategory(String categoryId) throws ServiceLogicException;
}

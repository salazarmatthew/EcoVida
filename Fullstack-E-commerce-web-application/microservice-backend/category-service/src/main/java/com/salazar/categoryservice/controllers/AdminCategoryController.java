package com.salazar.categoryservice.controllers;

import com.salazar.categoryservice.dtos.ApiResponseDto;
import com.salazar.categoryservice.dtos.CategoryRequestDto;
import com.salazar.categoryservice.exceptions.CategoryAlreadyExistsException;
import com.salazar.categoryservice.exceptions.ServiceLogicException;
import com.salazar.categoryservice.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/category")
public class AdminCategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/create")
    public ResponseEntity<ApiResponseDto<?>> createCategory(@RequestBody CategoryRequestDto categoryRequestDto) throws ServiceLogicException, CategoryAlreadyExistsException {
        return categoryService.createCategory(categoryRequestDto);
    }

    @PutMapping("/edit")
    public ResponseEntity<ApiResponseDto<?>> editCategory(@RequestParam String categoryId, @RequestBody CategoryRequestDto categoryRequestDto) throws ServiceLogicException, CategoryAlreadyExistsException {
        return categoryService.editCategory(categoryId, categoryRequestDto);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<ApiResponseDto<?>> deleteCategory(@RequestParam String categoryId) throws ServiceLogicException, CategoryAlreadyExistsException {
        return categoryService.deleteCategory(categoryId);
    }

}

package com.salazar.categoryservice.exceptions;

public class CategoryAlreadyExistsException extends Exception{
    public CategoryAlreadyExistsException(String message) {
        super(message);
    }
}

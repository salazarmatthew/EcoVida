package com.salazar.cartservice.feigns;

import com.salazar.cartservice.dtos.ApiResponseDto;
import com.salazar.cartservice.dtos.ProductDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient("PRODUCT-SERVICE")
public interface ProductService {

    @GetMapping("/product/get/byId")
    ResponseEntity<ApiResponseDto<ProductDto>> getProductById(@RequestParam String id);

}

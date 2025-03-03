package com.salazar.categoryservice.repositories;

import com.salazar.categoryservice.modals.Category;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CategoryRepository extends MongoRepository<Category,String> {
   boolean existsByCategoryName(String categoryName);

}

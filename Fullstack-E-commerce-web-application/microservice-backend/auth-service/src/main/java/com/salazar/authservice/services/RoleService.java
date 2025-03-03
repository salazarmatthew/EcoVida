package com.salazar.authservice.services;

import com.salazar.authservice.enums.ERole;
import com.salazar.authservice.modals.Role;
import org.springframework.stereotype.Service;

@Service
public interface RoleService {
    Role findByName(ERole eRole);
}
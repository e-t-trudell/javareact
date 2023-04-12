package com.erictrudell.JavaReact.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.erictrudell.JavaReact.models.Role;

public interface RoleRepository extends CrudRepository<Role, Long> {
//	find all
	List<Role> findAll();
//    find one
    List<Role> findByName(String name);

}

package com.erictrudell.JavaReact.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;

import com.erictrudell.JavaReact.models.Users;



public interface UserRepository extends CrudRepository<Users, Long>, QuerydslPredicateExecutor<Users> {
//	find all
	public List<Users> findAll();
//	find one
	public Users findByEmail(String email);
//	find one
	public Users findByUsername(String username);
//	create / update one
	public Users save(String user);
	
}

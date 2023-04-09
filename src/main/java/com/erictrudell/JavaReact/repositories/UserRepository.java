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
	public Optional<Users> findByEmail(String email);
//	create / update one
	public Users save(String user);
	
}

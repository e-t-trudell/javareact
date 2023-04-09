package com.erictrudell.JavaReact.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.erictrudell.JavaReact.models.Users;
import com.erictrudell.JavaReact.repositories.UserRepository;

@Service
@Component
public class UsersService {
	@Autowired
	private UserRepository userRepo;
	
	public List<Users> getUsers(){
		return userRepo.findAll();
	}
	public Users saveUser(Users user) {
		return userRepo.save(user);
	}
}

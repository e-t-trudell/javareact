package com.erictrudell.JavaReact.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.erictrudell.JavaReact.models.Users;
import com.erictrudell.JavaReact.repositories.RoleRepository;
import com.erictrudell.JavaReact.repositories.UserRepository;

@Service
@Component
public class UsersService {
	@Autowired
	private UserRepository userRepo;
	private RoleRepository roleRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;
//    public UserService(UserRepository userRepo, RoleRepository roleRepo, BCryptPasswordEncoder bCryptPasswordEncoder)     {
//        this.userRepo = userRepo;
//        this.roleRepo = roleRepo;
//        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
//    }
    
    
    


    public void saveWithUserRole(Users user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setRoles(roleRepository.findByName("ROLE_USER"));
        userRepo.save(user);
    }
     
    public void saveUserWithAdminRole(Users user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setRoles(roleRepository.findByName("ROLE_ADMIN"));
        userRepo.save(user);
    }    
    

    public Users findByUsername(String username) {
        return userRepo.findByUsername(username);
    }
	
	public List<Users> getUsers(){
		return userRepo.findAll();
	}
	public Users saveUser(Users user) {
		return userRepo.save(user);
	}
}

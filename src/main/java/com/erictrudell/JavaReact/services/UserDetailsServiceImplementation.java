package com.erictrudell.JavaReact.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.erictrudell.JavaReact.models.Role;
import com.erictrudell.JavaReact.models.Users;
import com.erictrudell.JavaReact.repositories.UserRepository;

@Service
public class UserDetailsServiceImplementation implements UserDetailsService {
    @Autowired
	private UserRepository userRepo;
    
//    public UserDetailsServiceImplementation(UserRepository userRepository){
//        this.userRepo = userRepository;
//    }

    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
       Users user = userRepo.findByEmail(email);
        
        if(user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), getAuthorities(user));
    }
    
    private List<GrantedAuthority> getAuthorities(Users user){
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        for(Role role : user.getRoles()) {
            GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(role.getName());
            authorities.add(grantedAuthority);
        }
        return authorities;
    }
}
//NOTES
//loadUserByUserName(String username): Finds the user by their username. If a user is found, it returns it with the correct authorities. If the username does not exist, the method throws an error.
//getAuthorities(User user): returns a list of authorities/permissions for a specific user. 
//For example, our clients can be 'user', 'admin', or both. 
//For Spring Security to implement authorization, we must get the name of the possibles roles for current user from our database and create a new `SimpleGrantedAuthority' object with those roles.
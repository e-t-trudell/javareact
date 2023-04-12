package com.erictrudell.JavaReact.controllers;


import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.erictrudell.JavaReact.links.UserLinks;
import com.erictrudell.JavaReact.models.Users;
import com.erictrudell.JavaReact.services.UsersService;
import com.erictrudell.JavaReact.validator.UserValidator;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/api/")
//Spring security is live mind your routes
public class UsersController {
	
	@Autowired
	UsersService usersServ;
	@Autowired
    private UserValidator userValidator;
	
//	UPDATE ALL ROUTES TO REMOVE BLURBSERVICE
	
//	/api/users
	@GetMapping(path = UserLinks.LIST_USERS)
    public ResponseEntity<?> listUsers() {
		System.out.println("UsersController:  list users");
//        log.info("UsersController:  list users");
        List<Users> resource = usersServ.getUsers();
        return ResponseEntity.ok(resource);
    }
	
	@PostMapping(path = UserLinks.ADD_USER)
	public ResponseEntity<?> saveUser(@RequestBody Users user) {
		System.out.println("UsersController:  add users");
        Users resource = usersServ.saveUser(user);
        return ResponseEntity.ok(resource);
    }
//	ALL ROUTES FOR JAVA FRONT END BELOW
	@GetMapping("/index")
    public String land(@Valid @ModelAttribute("user") Users user,
    		Model model) {
    	model.addAttribute("newUser", new Users());
    	return"index.jsp";
    }
    @GetMapping("/registration")
    public String registerForm(@Valid @ModelAttribute("user") Users user) {
        return "registration.jsp";
    }
    @PostMapping("/registration")
    public String registration(@Valid @ModelAttribute("user") Users user,
    		BindingResult result,
    		Model model, 
    		HttpSession session,
    		Principal principal) {
    	userValidator.validate(user, result);
    	if (result.hasErrors()) {
            return "registration.jsp";
        }
        usersServ.saveWithUserRole(user);
/*  ======================================    
	Add optional find by role to search DB for existing admin
	=====================================
	userServ.saveUserWithAdminRole(user);
*/	
        return "redirect:/login";
    }
    @GetMapping("/loginPage")
    public String loginPage() {
    	return"login.jsp";
    }
    @RequestMapping("/admin")
    public String adminPage(Principal principal, Model model) {
        String username = principal.getName();
        model.addAttribute("currentUser", usersServ.findByUsername(username));
        return "adminPage.jsp";
    }

//	On a login attempt, Spring Security will automatically call the loadUserByUsername(String) in UserDetailsServiceImplementation class. 
//	From there, Spring Security will have two options:
//	Successful Login: The user is authenticated, saves them in a context, and redirects to "/" (root route). More information on the context below.
//	Unsuccessful Login: The client is redirected to "/login?error".
//	It is important to note that the form must have a name field with the username value for Spring Security to correctly grab the information in the loadUserByUsername(String) method.
    

    @GetMapping("/login")
    public String login(@RequestParam(value="error", required=false) String error,
    		@RequestParam(value="logout", required=false) String logout,
    		Model model) {
        if(error != null) {
            model.addAttribute("errorMessage", "Invalid Credentials, Please try again.");
        }
        if(logout != null) {
            model.addAttribute("logoutMessage", "Logout Successful!");
        }
        model.addAttribute("newUser", new Users());
        return "login.jsp";
    }
    @GetMapping("/logout")
    public String logout(@RequestParam(value="logout", required=false) String logout,
    		Model model) {
    	if(logout != null) {
            model.addAttribute("logoutMessage", "Logout Successful!");
        }
        model.addAttribute("newUser", new Users());
    	
    	return "redirect:/login";
    }
    @GetMapping(value = {"/","/home"})
    public String home(Principal principal, Model model) {
        // 1
        String username = principal.getName();
//    	User userOne = userServ.findByUsername(username);
//    	Long userId = userOne.getId();
        
        model.addAttribute("currentUser", usersServ.findByUsername(username));
        return "home.jsp";
    }
}

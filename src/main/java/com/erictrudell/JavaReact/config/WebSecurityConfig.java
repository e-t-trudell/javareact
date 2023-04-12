package com.erictrudell.JavaReact.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
	private UserDetailsService userDetailsService;

    @Bean
    BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http.
                authorizeHttpRequests()
                .antMatchers("/css/**", "/js/**", "/webjars/**", "/registration").permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin(login -> login
                        .loginPage("/login")
                        .loginProcessingUrl("/login")
                        .defaultSuccessUrl("/home", true)
                        .permitAll())
                .logout(logout -> logout
                        .permitAll());
		
		return http.build();
	}
//	For Below:
//	Any URL that starts with "/admin" requires the user to have ROLE_ADMIN. Restart your server, login, and visit 'localhost:8080/admin'. You should see a 403 for Access Denied. 
//	This is the expected output since we have not added any users that have admin privileges.
	@Bean
	protected SecurityFilterChain filterAChain(HttpSecurity http) throws Exception{
        http.
                authorizeHttpRequests()
                .antMatchers("/css/**", "/js/**", "/webjars/**", "/registration").permitAll()
                .antMatchers("/admin/**").hasRole("ADMIN")   // NEW
                .anyRequest().authenticated()
                .and()
                .formLogin(login -> login
                        .loginPage("/login")
                        .loginProcessingUrl("/login")
                        .defaultSuccessUrl("/home", true)
                        .permitAll())
                .logout(logout -> logout
                        .permitAll());
		
		return http.build();
	}

//	This method is configuring Spring Security to use our custom implementation of the UserDetailsService with Bcrypt.
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder());
    } 
	
}
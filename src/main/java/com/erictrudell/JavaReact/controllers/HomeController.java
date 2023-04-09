package com.erictrudell.JavaReact.controllers;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
public class HomeController {
	
	@GetMapping({"/"})
	public String loadUI() {
		System.out.println("loading UIssdd");
		return "forward:/index.html";
	}

}

package dev.paf.FitFusion.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/homepage")
public class HomepageController {

    @GetMapping("/")
    public String homePage() {
        // Return the name of the view/template for the homepage
        return "homepage"; // Assuming "index" is the name of your homepage template
    }
}

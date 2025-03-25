package com.oauth.NOTEably_IT342;

import java.util.Map;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:8081") // ✅ Allow frontend (8081) to call backend (8080)
@RestController
@RequestMapping
public class UserController {

    @GetMapping("/user-info")
    public Map<String, Object> getUserInfo(@AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            throw new RuntimeException("User not authenticated");
        }
        System.out.println("✅ User Info API called! Returning: " + principal.getAttributes());
        return principal.getAttributes();
    }
}

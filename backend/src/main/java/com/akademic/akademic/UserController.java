//UserController.java
package com.akademic.akademic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    private User getSessionUser(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) return null;
        return userService.findById(userId);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers(HttpSession session) {
        User loggedUser = getSessionUser(session);
        if (loggedUser == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        List<User> users = userService.findAll()
                .stream()
                .filter(u -> !u.getId().equals(loggedUser.getId()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id, HttpSession session) {
        User loggedUser = getSessionUser(session);
        if (loggedUser == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        User user = userService.findById(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMyProfile(HttpSession session) {
        User loggedUser = getSessionUser(session);
        if (loggedUser == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        return ResponseEntity.ok(loggedUser);
    }

    @PutMapping("/me")
    public ResponseEntity<?> updateMyProfile(@RequestBody User updatedUser, HttpSession session) {
        User loggedUser = getSessionUser(session);
        if (loggedUser == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        updatedUser.setId(loggedUser.getId());
        userService.updateUser(updatedUser);
        session.setAttribute("userId", updatedUser.getId());
        return ResponseEntity.ok(updatedUser);
    }
}
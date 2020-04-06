package ru.jm.springSecurity.contoller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.jm.springSecurity.model.Role;
import ru.jm.springSecurity.model.User;
import ru.jm.springSecurity.repository.RoleRepository;
import ru.jm.springSecurity.repository.UserRepository;
import ru.jm.springSecurity.service.UserServiceImpl;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
public class AdminRestController {

    private UserServiceImpl userServiceImpl;
    private UserRepository userRepository;

    @Autowired
    public AdminRestController(UserServiceImpl userServiceImpl, UserRepository userRepository) {
        this.userServiceImpl = userServiceImpl;
        this.userRepository = userRepository;
    }

    //GET users
    @GetMapping("/admin/users/rest")
    public List<User> getAllUsers() {
        return userServiceImpl.getAllUsers();
    }

    //GET all roles
    @GetMapping("/admin/users/roles/rest")
    public List<Role> getAllRoles() {
        return userServiceImpl.getAllRoles();
    }

    //GET role by id
    @GetMapping("/admin/users/roles/rest/{id}")
    public Role getRoleById(@PathVariable Long id) {
        return userServiceImpl.getRoleById(id);
    }

    //ADD
    @PostMapping("admin/users/add/rest")
    public void addUser(@RequestBody User newUser) {
        userServiceImpl.addUser(newUser);
    }

    //edit GET
    @GetMapping("/admin/users/edit/rest/{id}")
    public User getUserById(@PathVariable("id") Long id) {
        return userServiceImpl.getUserById(id);
    }

    //edit PUT
    @PutMapping("/admin/users/edit/rest")
    public void updateUser(@RequestBody User editUser) {
        userServiceImpl.updateUser(editUser);
    }

    //DELETE
    /*@DeleteMapping("/admin/users/delete/rest/{id}")
    public void deleteUserId(@PathVariable("id") Long id) {
        userServiceImpl.deleteUser(id);
    }*/

    @DeleteMapping("admin/users/delete/rest/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        User user = userServiceImpl.getUserById(id);
        if (user == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        userServiceImpl.deleteUser(id);
        return new ResponseEntity<User>(HttpStatus.OK);
    }
}




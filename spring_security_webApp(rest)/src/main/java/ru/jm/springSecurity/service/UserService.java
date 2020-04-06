package ru.jm.springSecurity.service;

import ru.jm.springSecurity.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    List<User> getAllUsers();
    void addUser(User user);
    User getUserById(Long id);
    void deleteUser(Long id);
    void updateUser(User user);
    User findUserByUsername(String username);
}

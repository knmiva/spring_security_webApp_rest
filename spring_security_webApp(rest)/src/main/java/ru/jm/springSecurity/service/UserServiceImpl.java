package ru.jm.springSecurity.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.jm.springSecurity.model.Role;
import ru.jm.springSecurity.model.User;
import ru.jm.springSecurity.repository.RoleRepository;
import ru.jm.springSecurity.repository.UserRepository;
import ru.jm.springSecurity.service.UserService;

import java.util.List;
import java.util.Optional;

@Service("userService")
@Transactional
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;

    //через конструктор ошибка
    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    public void setRoleRepository(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Autowired
    public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    //взять всех юзеров
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    public Role getRoleById(Long id) {
        return roleRepository.getRoleById(id);
    }

    //взять юзера по id
    public User getUserById(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            return optionalUser.get();
        } else {
            throw new RuntimeException();
        }
    }

    //удалить юзера
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    /**
     * Создаем юзера. Передаем юзера и массив ролей
     */
    public void addUser(User addUser) {
        addUser.setPassword(passwordEncoder.encode(addUser.getPassword()));
        //проверка имени
        List<User> users = getAllUsers();
        for (User user: users) {
            if (user.getUsername().equals(addUser.getUsername())) {
                addUser.setUsername(user.getUsername() + "_copy");
            }
        }
        userRepository.save(addUser);
    }

    /**
     * Редактируем юзера. Обновляем старый пароль и массив ролей
     */
    public void updateUser(User editUser) {
        //проверка пароля
        User oldUser = getUserById(editUser.getId());
        String oldPassword = oldUser.getPassword();
        String newPassword = editUser.getPassword();
        //Доп. проверка. Если новый пароль от 3 до 5 символов - берем его
        if (newPassword.length() > 2 && newPassword.length() < 6) {
            editUser.setPassword(passwordEncoder.encode(newPassword));
        } else {
            editUser.setPassword(oldPassword);
        }

        //проверка имени
        List<User> users = getAllUsers();
        for (User user: users) {
            if (user.getUsername().equals(editUser.getUsername())) {
                editUser.setUsername(oldUser.getUsername());
            }
        }
        userRepository.save(editUser);
    }

    //достаем юзера по username
    public User findUserByUsername(String username) {
        return userRepository.findUserByUsername(username);
    }
}

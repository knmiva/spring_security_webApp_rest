package ru.jm.springSecurity.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.jm.springSecurity.model.User;

import java.util.List;

@Repository("UserRepository")
public interface UserRepository extends JpaRepository<User, Long> {

    User findUserByUsername(String username);



    /*@Query("FROM User u JOIN FETCH u.roles WHERE u.username= :username")
    User findUserByUsername(@Param("username") String username);*/

    /*@Query("FROM User u JOIN FETCH u.roles")*/
    //List<User> getAllUsers();
}

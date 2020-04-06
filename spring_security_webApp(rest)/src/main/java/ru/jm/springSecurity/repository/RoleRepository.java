package ru.jm.springSecurity.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.jm.springSecurity.model.Role;

import java.util.List;

@EnableJpaRepositories
public interface RoleRepository extends JpaRepository<Role, Long> {
    /*@Query("FROM Role WHERE name = :role")*/
    //Role getRoleByName(@Param("role") String name);
    List<Role> findAll();
    Role getRoleById(Long id);
}

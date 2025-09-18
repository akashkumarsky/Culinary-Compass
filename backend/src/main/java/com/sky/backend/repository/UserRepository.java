package com.sky.backend.repository;



import com.sky.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // We get findAll(), findById(), save(), delete() etc. for free

    // Custom query to find a user by their username
    Optional<User> findByUsername(String username);

    // Custom query to check if an email already exists
    Boolean existsByEmail(String email);

    // Custom query to check if a username already exists
    Boolean existsByUsername(String username);
}
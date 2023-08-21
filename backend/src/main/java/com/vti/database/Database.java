package com.vti.database;

import com.vti.entity.ERole;
import com.vti.entity.Role;
import com.vti.entity.User;
import com.vti.repository.RoleRepository;
import com.vti.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.*;

@Configuration
public class Database {
    //https://www.devglan.com/spring-boot/spring-boot-mongodb-configuration
    @Autowired
    PasswordEncoder encoder;

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, RoleRepository roleRepository) {
        return new CommandLineRunner()
        {
            @Override
            public void run(String... args) throws Exception {
                if(userRepository.findAll().size()==0){
                    User admin = new User();
                    admin.setId(1);
                    admin.setUserName("super_admin@fpt.edu.vn");
                    admin.setEmail("super_admin@fpt.edu.vn");
                    admin.setFullName("Super");

                    Set<Role> roles = new HashSet<>();
                    admin.setPassword(encoder.encode("Azd1232421@#"));
                    Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    roles.add(adminRole);
                    admin.setRoles(roles);
                    userRepository.save(admin);
                }else {
                    User admin = userRepository.findByEmail("zeno@gmail.com");
                    admin.setPassword(encoder.encode("123456"));
                    userRepository.save(admin);
                }
            }
        };
    }
}
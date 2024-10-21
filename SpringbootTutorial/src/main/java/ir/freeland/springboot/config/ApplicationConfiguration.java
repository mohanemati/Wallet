package ir.freeland.springboot.config;




import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import ir.freeland.springboot.persistence.repo.UsersDetailsRepository;
import ir.freeland.springboot.exception.ResourceNotFoundException;


@Configuration
@EnableWebSecurity
@EnableJpaRepositories(basePackages = "ir.freeland.springboot.persistence.model.Users") 
@ComponentScan(basePackages = "ir.freeland.springboot")
public class ApplicationConfiguration implements WebMvcConfigurer {
    private final UsersDetailsRepository usersDetailsRepository;

    public ApplicationConfiguration(UsersDetailsRepository usersDetailsRepository) {
        this.usersDetailsRepository = usersDetailsRepository;
    }

    @Bean
    UserDetailsService userDetailsService() {
        return nationalID -> usersDetailsRepository.findByAccount_NationalId(nationalID)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found"));
    }

    @Bean
    BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());

        return authProvider;
    }
}
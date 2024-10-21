package ir.freeland.springboot.web;

import ir.freeland.springboot.dto.ChangePasswordDto;
import ir.freeland.springboot.dto.LoginDto;
import ir.freeland.springboot.dto.TokenDto;
import ir.freeland.springboot.exception.ValidationException;
import ir.freeland.springboot.persistence.model.Users;
import ir.freeland.springboot.persistence.model.UsersDetails;
import ir.freeland.springboot.persistence.repo.UserRepository;
import ir.freeland.springboot.persistence.repo.UsersDetailsRepository;
import ir.freeland.springboot.exception.ResourceNotFoundException;
import ir.freeland.springboot.jwt.*;
import org.springframework.stereotype.Service;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;


@Service
public class UsersService {

    private final UserRepository usersRepository;
    private final UsersDetailsRepository usersDetailsRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public UsersService(UserRepository usersRepository,
                       UsersDetailsRepository usersDetailsRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtService jwtService) {
        this.usersRepository = usersRepository;
        this.usersDetailsRepository = usersDetailsRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public Users signup(Users user) throws ValidationException {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setActive(true);
        UsersDetails userDetails = new UsersDetails(user);
        try {
            userDetails = usersDetailsRepository.save(userDetails);
            user = userDetails.getAccount();
        } catch (RuntimeException e) {
            throw new ValidationException("Signup failed: Email or national ID already exists.");
        }
        return user;
    }

    public TokenDto login(LoginDto input) {
        String jwtToken;
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(input.getNationalId(), input.getPassword()));
            UsersDetails userDetails = usersDetailsRepository.findByAccount_NationalId(input.getNationalId())
                    .orElseThrow(() -> new ResourceNotFoundException("Invalid credentials"));
            if (!userDetails.getAccount().isActive())
                throw new ResourceNotFoundException("Account not found");

            jwtToken = jwtService.generateToken(userDetails);
        } catch (Exception ex) {
            throw new BadCredentialsException("Invalid credentials");
        }
        return new TokenDto(jwtToken, jwtService.getExpirationTime().toString());
    }

    public Users findMe() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return findByNationalId(authentication.getName());
    }

    public Users changePassword(ChangePasswordDto changePasswordDto) {
        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(changePasswordDto.getNationalId(), changePasswordDto.getOldPassword()));
        } catch (Exception ex) {
            throw new AccessDeniedException("Invalid credentials");
        }

        Users user = usersRepository.findByNationalId(authentication.getName())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!user.isActive())
            throw new ResourceNotFoundException("User not found");

        user.setPassword(passwordEncoder.encode(changePasswordDto.getNewPassword()));
        return usersRepository.save(user);
    }

    public ResponseEntity<Object> deActivate() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Users user = findByNationalId(authentication.getName());
        try {
            user.setActive(false);
            usersRepository.save(user);
            return ResponseEntity.ok("Account successfully deactivated");
        } catch (Exception ex) {
            throw new ValidationException(ex.getMessage());
        }
    }

    public Users findByNationalId(String nationalId) {
        return usersRepository.findByNationalId(nationalId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}

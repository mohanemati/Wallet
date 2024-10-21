package ir.freeland.springboot.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import ir.freeland.springboot.dto.LoginDto;
import ir.freeland.springboot.dto.TokenDto;
import ir.freeland.springboot.persistence.model.Users;
import ir.freeland.springboot.persistence.repo.TransactionRepository;
import ir.freeland.springboot.persistence.repo.UserRepository;
import ir.freeland.springboot.exception.ErrorResponseService;
import ir.freeland.springboot.exception.ResourceNotFoundException;
import ir.freeland.springboot.dto.ChangePasswordDto;

import java.util.Optional;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UsersController {

    private UserRepository userRepository;
    private TransactionRepository transactionRepository;
    UsersService usersService;
//    AccountValidator accountValidator;
    ErrorResponseService errorResponseService;

    @Autowired
    public UsersController(UsersService usersService,
//                             AccountValidator accountValidator,
                           UserRepository userRepository,
                             TransactionRepository transactionRepository,
                             ErrorResponseService errorResponseService) {
    	System.out.println("inja omade11:))))))))))))");
        this.usersService = usersService;
//        this.accountValidator = accountValidator;
        this.errorResponseService = errorResponseService;
        this.userRepository = userRepository;
        this.transactionRepository = transactionRepository;
    }
    
    @PostMapping(value = "/add")
    @ResponseBody
    public ResponseEntity<Object> createUser(@RequestBody Users user, BindingResult bindingResult) {
    	System.out.println("Hellooo");
        if (bindingResult.hasErrors())
            return errorResponseService.returnValidationError(bindingResult);
    	user = userRepository.save(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }


    @PutMapping(value = "/updateUser/{id}")
    @ResponseBody
    public ResponseEntity<Object> updateUser( @RequestBody Users userDetails) {
        System.out.println("Hellooo updateUser");

        
       Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
       String nationalId = authentication.getName();

        Optional<Users> optionalUser = userRepository.findByNationalId(nationalId);
        
        if (optionalUser.isPresent()) {
            Users user = optionalUser.get();
            
            if (userDetails.getNameUser() != null) {
                user.setNameUser(userDetails.getNameUser());
            }
            
            if (userDetails.getBirthdayDate() != null) {
                user.setBirthdayDate(userDetails.getBirthdayDate());
            }
            if (userDetails.getFamilyUser() != null) {
            	 user.setFamilyUser(userDetails.getFamilyUser());
            }

           if(userDetails.getPhoneNumber() != 0) {
        	   user.setPhoneNumber(userDetails.getPhoneNumber());
           }
           if(userDetails.getGenderUser() != null) { 
            user.setGenderUser(userDetails.getGenderUser());
            }
           if(userDetails.getSarbazi() != null) {
            user.setSarbazi(userDetails.getSarbazi());
           }
            
            userRepository.save(user);
            
            return new ResponseEntity<>("User " + user.getNameUser() + " updated successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }
    
    @DeleteMapping("/DeleteUser")
    public ResponseEntity<String> deleteUser(@RequestParam(value = "idUser") long idUser) {
        Users user = userRepository.findById(idUser)
            .orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + idUser));
        
        transactionRepository.deleteByUser(user);
        
        userRepository.deleteById(idUser);

        return new ResponseEntity<>("User account " + idUser + " and related transactions deleted.", HttpStatus.OK);
    }
    
    //sabtenam
    @PostMapping(value = "/signup")
    public ResponseEntity<Object> signup(@RequestBody Users user) {
    	System.out.println("inja omade:))))))))))))");
        Users createdUser = usersService.signup(user); 
        return new ResponseEntity<>("User " + createdUser.getNameUser() + " signed up successfully.", HttpStatus.CREATED);
    }

    // vorod
    @PostMapping(value = "/login")
    public ResponseEntity<TokenDto> login(@RequestBody LoginDto loginDto) {
        TokenDto token = usersService.login(loginDto); 
        return ResponseEntity.ok(token);
    }
    
    @PutMapping(value = "/changePassword")
    public ResponseEntity<Object> changePassword(@RequestBody ChangePasswordDto changePasswordDto) {
    	usersService.changePassword(changePasswordDto); 
        return ResponseEntity.ok("Password changed successfully.");
    }

    @DeleteMapping("/deleteAccount")
    public ResponseEntity<Object> deleteAccount() {
        return usersService.deActivate();
    }

}



//{
//    "email": "test.nemati@gmail.com",
//    "nameUser": "test",
//    "familyUser": "fateme",
//    "birthdayDate": "1985-02-22T00:00:00Z", 
//    "sarbazi": "no",
//    "phoneNumber": 9876543211,
//    "genderUser": "female",
//    "password":"12345678"
//}

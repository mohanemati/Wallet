package ir.freeland.springboot.web;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

import ir.freeland.springboot.persistence.model.CustomerAccount;
import ir.freeland.springboot.persistence.repo.CustomerAccountRepository;
import ir.freeland.springboot.persistence.repo.TransactionRepository;
import ir.freeland.springboot.exception.ResourceNotFoundException;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/customerAccount")
public class CustomerAccountController {
	
	@Autowired
	private CustomerAccountRepository customerAccountRepository;
	@Autowired
	private TransactionRepository transactionRepository;
	
	
    @PostMapping(value = "/add", consumes = "application/json")
    @ResponseBody
    public ResponseEntity<String> createCustomerAccount(@RequestBody CustomerAccount customer) {
    	System.out.println("Hellooo customer");
    	System.out.println("Account Number: " + customer.getAccountNumber());
    	System.out.println("Account Balance: " + customer.getAccountBalance());
    	System.out.println("Account IRIB: " + customer.getAccountIRIB());
    	System.out.println("Create Account Date: " + customer.getCreateAccountDate());

    	customerAccountRepository.save(customer);
        return new ResponseEntity<>("Customer " + customer.getAccountNumber() + " created ", HttpStatus.CREATED);
    }
    
    @GetMapping("/all")
    public Iterable<CustomerAccount> findAll() {
        return customerAccountRepository.findAll();
    }
    
    @PutMapping(value = "/updateCustomerAccoun/{id}")
    @ResponseBody
    public ResponseEntity<String> updateCustomerAccoun(@PathVariable Long id, @RequestBody CustomerAccount customerAccountDetails) {
        System.out.println("Hellooo updateCustomerAccoun");

        Optional<CustomerAccount> optionalCustomerAccount = customerAccountRepository.findById(id);
        
        if (optionalCustomerAccount.isPresent()) {
            CustomerAccount customerAccount = optionalCustomerAccount.get();
            
            if (customerAccountDetails.getAccountBalance() != 0) {
            	customerAccount.setAccountBalance(customerAccountDetails.getAccountBalance());
            }
            
            if (customerAccountDetails.getAccountNumber() != 0) {
            	customerAccount.setAccountNumber(customerAccountDetails.getAccountNumber());
            }
            if (customerAccountDetails.getAccountIRIB() != null) {
            	customerAccount.setAccountIRIB(customerAccountDetails.getAccountIRIB());
            }

           if(customerAccountDetails.getCreateAccountDate() != null) {
        	   customerAccount.setCreateAccountDate(customerAccountDetails.getCreateAccountDate());
           }
         
            customerAccountRepository.save(customerAccount);
            
            return new ResponseEntity<>("User " + customerAccount + " updated successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }
    
    @DeleteMapping("/DeleteCustomerAccount")
    public ResponseEntity<String> deleteCustomerAccount(@RequestParam(value = "idUser") long idUser) {
        CustomerAccount customerAccount = customerAccountRepository.findById(idUser)
            .orElseThrow(() -> new ResourceNotFoundException("CustomerAccount not found for this id :: " + idUser));
        
        transactionRepository.deleteByCustomerAccount(customerAccount);
         
        customerAccountRepository.deleteById(idUser);

        return new ResponseEntity<>("Customer account " + idUser + " and related transactions deleted.", HttpStatus.OK);
    }


}
//{
//	   "accountNumber": 2,  
//	   "accountBalance": 2.0,
//	   "accountIRIB": 2,
//	   "createAccountDate": 2
//	}



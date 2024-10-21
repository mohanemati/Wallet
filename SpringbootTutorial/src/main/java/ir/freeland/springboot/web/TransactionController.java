package ir.freeland.springboot.web;

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
import ir.freeland.springboot.persistence.model.Transaction;
import ir.freeland.springboot.persistence.repo.CustomerAccountRepository;
import ir.freeland.springboot.persistence.repo.TransactionRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/Transaction")
public class TransactionController {
	
	@Autowired
	private TransactionRepository transactionRepository;
	@Autowired
	private CustomerAccountRepository customerAccountRepository;
		

	@PostMapping(value = "/add-transaction-Debit") // برداشت
	@ResponseBody
	public ResponseEntity<String> createDebitTransaction(@RequestBody Transaction transaction) {
	    
	    if (transaction.getTransactionType() == null || transaction.getTransactionType().isEmpty()) {
	        return new ResponseEntity<>("Transaction type cannot be null", HttpStatus.BAD_REQUEST);
	    }

	    long accountNumber = transaction.getCustomerAccount().getAccountNumber();
	    Optional<CustomerAccount> customerAccountOpt = customerAccountRepository.findById(accountNumber);
	    if (!customerAccountOpt.isPresent()) {
	        return new ResponseEntity<>("Account not found", HttpStatus.NOT_FOUND);
	    }
	    CustomerAccount customerAccount = customerAccountOpt.get();

	    if (customerAccount.getAccountBalance() < transaction.getTransactionPrice()) {
	        return new ResponseEntity<>("Insufficient balance", HttpStatus.BAD_REQUEST);
	    }
	    
	    double dailyDebitLimit = 15000000; 
	    LocalDate today = LocalDate.now();
	    List<Transaction> todayDebits = transactionRepository.findByCustomerAccountAndTransactionTypeAndTransactionDate(
	        customerAccount, "Debit", today
	    );

	    double totalDailyDebits = todayDebits.stream()
	        .mapToDouble(Transaction::getTransactionPrice)
	        .sum();

	    if (totalDailyDebits + transaction.getTransactionPrice() > dailyDebitLimit) {
	        return new ResponseEntity<>("Daily debit limit exceeded", HttpStatus.BAD_REQUEST);
	    }


	    customerAccount.setAccountBalance(customerAccount.getAccountBalance() - transaction.getTransactionPrice());

	    customerAccountRepository.save(customerAccount);

	    transaction.setCustomerAccount(customerAccount);

	    transactionRepository.save(transaction);

	    return new ResponseEntity<>("Transaction Debit created: " + transaction, HttpStatus.CREATED);
	}

	@PostMapping(value = "/add-transaction-Credit") // واریز
	@ResponseBody
	public ResponseEntity<Object> createCreditTransaction(@RequestBody Transaction transaction) {
	    long accountNumber = transaction.getCustomerAccount().getAccountNumber();
	    
	    Optional<CustomerAccount> customerAccountOpt = customerAccountRepository.findById(accountNumber);
	    if (!customerAccountOpt.isPresent()) {
	        return new ResponseEntity<>("Account not found", HttpStatus.NOT_FOUND);
	    }
	    
	    CustomerAccount customerAccount = customerAccountOpt.get();

	    customerAccount.setAccountBalance(customerAccount.getAccountBalance() + transaction.getTransactionPrice());

	    customerAccountRepository.save(customerAccount);

	    transaction.setCustomerAccount(customerAccount);

	    transactionRepository.save(transaction);

	    return new ResponseEntity<>(transaction, HttpStatus.CREATED);
	}

    
    @GetMapping(value = "/getAllTransactions")
    @ResponseBody
    public ResponseEntity<List<Transaction>> getAllTransactions() {
    	List<Transaction> transactions = (List<Transaction>) transactionRepository.findAllTransaction();    
        
        if (transactions.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }
    
    @PutMapping(value = "/updateTransaction/{id}")
    @ResponseBody
    public ResponseEntity<Object> updateTransaction(@PathVariable Long id, @RequestBody Transaction transactionDetails) {
        System.out.println("Hellooo updateTransaction");

        Optional<Transaction> optionaltransaction = transactionRepository.findById(id);
        
        if (optionaltransaction.isPresent()) {
            Transaction transaction = optionaltransaction.get();
            
            if (transactionDetails.getTransactionType() != null) {
            	transaction.setTransactionType(transactionDetails.getTransactionType());
            }
            
            if (transactionDetails.getTransactionDate() != null) {
            	transaction.setTransactionDate(transactionDetails.getTransactionDate());
            }
            if (transactionDetails.getAfterTransactionPrice() != 0) {
            	transaction.setAfterTransactionPrice(transactionDetails.getAfterTransactionPrice());
            }

           if(transactionDetails.getBeforeTransactionPrice() != 0) {
        	   transaction.setBeforeTransactionPrice(transactionDetails.getBeforeTransactionPrice());
           }
           if(transactionDetails.getAfterTransactionPrice() != 0) {
        	   transaction.setAfterTransactionPrice(transactionDetails.getAfterTransactionPrice());
           }
         
            transactionRepository.save(transaction);
            
            return new ResponseEntity<>(transaction + " updated successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("transaction not found", HttpStatus.NOT_FOUND);
        }
    }
        
    @DeleteMapping("/DeleteTransaction")
    public ResponseEntity<String> deleteUser(@RequestParam(value = "idtransaction") long idtransaction) {
               
        transactionRepository.deleteById(idtransaction);
        return new ResponseEntity<>("Transaction account " + idtransaction + " and related transactions deleted.", HttpStatus.OK);
    }
 
 
    }

//{
//	   "transactionType": "Credit",
//	   "transactionPrice": 100000,
//	   "beforeTransactionPrice": 200000,
//	   "afterTransactionPrice": 300000,
//	   "transactionDate": "1985-02-22T00:00:00Z",
//	   "user": {
//	      "uniqueID": 302
//	   },
//	   "customerAccount": {
//	      "uniqueIDAccount": 2
//	   }
//	}

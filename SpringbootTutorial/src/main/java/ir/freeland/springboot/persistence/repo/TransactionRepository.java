package ir.freeland.springboot.persistence.repo;

import java.time.LocalDate;
import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ir.freeland.springboot.persistence.model.CustomerAccount;
import ir.freeland.springboot.persistence.model.Transaction;
import ir.freeland.springboot.persistence.model.Users;
import jakarta.transaction.Transactional;


@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
	 @Query(value = "SELECT * FROM TRANSACTION" , nativeQuery = true)
	 List<Transaction> findAllTransaction();
	 
	 @Transactional
	 void deleteByCustomerAccount(CustomerAccount customerAccount);

	 @Transactional
	 void deleteByUser(Users user);
	 
	 List<Transaction> findByCustomerAccountAndTransactionTypeAndTransactionDate(CustomerAccount account, String transactionType, LocalDate date);

}

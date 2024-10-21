package ir.freeland.springboot.persistence.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ir.freeland.springboot.persistence.model.CustomerAccount;

@Repository
public interface CustomerAccountRepository extends JpaRepository<CustomerAccount, Long> {
 
    CustomerAccount findByAccountNumber(long accountNumber);



}
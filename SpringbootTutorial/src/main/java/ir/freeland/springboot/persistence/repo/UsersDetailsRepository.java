package ir.freeland.springboot.persistence.repo;

import java.util.Optional;

import ir.freeland.springboot.persistence.model.UsersDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersDetailsRepository extends JpaRepository<UsersDetails, Long> {
	 Optional<UsersDetails> findByAccount_NationalId(String nationalId);
}


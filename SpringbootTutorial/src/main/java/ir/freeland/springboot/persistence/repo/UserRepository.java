package ir.freeland.springboot.persistence.repo;

import org.springframework.stereotype.Repository;

import ir.freeland.springboot.persistence.model.Users;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;


@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
 
//	Optional<Users> findByEmail(String email);
	Optional<Users> findByNationalId(String nationalId);


}

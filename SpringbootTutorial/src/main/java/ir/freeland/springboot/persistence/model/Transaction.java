package ir.freeland.springboot.persistence.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "Transaction")
public class Transaction {
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
    private long id;
	
	@Column(name = "transaction_type", nullable = false, length = 10)
	private String transactionType; 
	
	@ManyToOne
	@JoinColumn(name = "user_id", referencedColumnName = "id") 
	private Users user;
	
	@ManyToOne
	@JoinColumn(name = "uniqueIDAccount", referencedColumnName = "uniqueIDAccount") 
	private CustomerAccount customerAccount;

	@Column(name = "transaction_date")
	private LocalDateTime transactionDate;
	 
	@Column(name = "transaction_price", nullable = false)
	private double transactionPrice; 
	
	@Column(name = "before_transaction_price", nullable = false)
	private double beforeTransactionPrice; 
	
	@Column(name = "after_transaction_price", nullable = false)
	private double afterTransactionPrice; 

	// Getters and Setters
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTransactionType() {
		return transactionType;
	}

	public void setTransactionType(String transactionType) {
		this.transactionType = transactionType;
	}

	public Users getUser() {
		return user;
	}

	public void setUser(Users user) {
		this.user = user;
	}

	public CustomerAccount getCustomerAccount() {
		return customerAccount;
	}

	public void setCustomerAccount(CustomerAccount customerAccount) {
		this.customerAccount = customerAccount;
	}

	public LocalDateTime getTransactionDate() {
		return transactionDate;
	}

	public void setTransactionDate(LocalDateTime transactionDate) {
		this.transactionDate = transactionDate;
	}

	public double getTransactionPrice() {
		return transactionPrice;
	}

	public void setTransactionPrice(double transactionPrice) {
		this.transactionPrice = transactionPrice;
	}

	public double getBeforeTransactionPrice() {
		return beforeTransactionPrice;
	}

	public void setBeforeTransactionPrice(double beforeTransactionPrice) {
		this.beforeTransactionPrice = beforeTransactionPrice;
	}

	public double getAfterTransactionPrice() {
		return afterTransactionPrice;
	}

	public void setAfterTransactionPrice(double afterTransactionPrice) {
		this.afterTransactionPrice = afterTransactionPrice;
	}
}

package ir.freeland.springboot.persistence.model;

import java.time.Instant;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "CustomerAccount")
public class CustomerAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "UniqueIDAccount", nullable = false, length = 50)
    private long uniqueIDAccount;

    @Column(name = "accountNumber", nullable = false)
    private long accountNumber;

    @Column(name = "accountBalance", nullable = false)
    private double accountBalance;

    @Column(name = "createAccountDate", nullable = false)
    private Instant createAccountDate;

    @Column(name = "accountIRIB", nullable = false)
    private String  accountIRIB;

    // Default constructor
    public CustomerAccount() {
    }

    // Full constructor
    public CustomerAccount(long accountNumber, double accountBalance, Instant createAccountDate, String accountIRIB) {
        this.accountNumber = accountNumber;
        this.accountBalance = accountBalance;
        this.createAccountDate = createAccountDate;
        this.accountIRIB = accountIRIB;
    }

    // Getters and Setters

    public long getUniqueIDAccount() {
        return uniqueIDAccount;
    }

    public void setUniqueIDAccount(long uniqueIDAccount) {
        this.uniqueIDAccount = uniqueIDAccount;
    }

    public long getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(long accountNumber) {
        this.accountNumber = accountNumber;
    }

    public double getAccountBalance() {
        return accountBalance;
    }

    public void setAccountBalance(double accountBalance) {
        this.accountBalance = accountBalance;
    }

    public Instant getCreateAccountDate() {
        return createAccountDate;
    }

    public void setCreateAccountDate(Instant createAccountDate) {
        this.createAccountDate = createAccountDate;
    }

    public String getAccountIRIB() {
        return accountIRIB;
    }

    public void setAccountIRIB(String accountIRIB) {
        this.accountIRIB = accountIRIB;
    }

    @Override
    public String toString() {
        return "CustomerAccount{" +
                "uniqueIDAccount=" + uniqueIDAccount +
                ", accountNumber=" + accountNumber +
                ", accountBalance=" + accountBalance +
                ", createAccountDate=" + createAccountDate +
                ", accountIRIB=" + accountIRIB +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CustomerAccount)) return false;

        CustomerAccount that = (CustomerAccount) o;

        return uniqueIDAccount == that.uniqueIDAccount;
    }

    @Override
    public int hashCode() {
        return Long.hashCode(uniqueIDAccount);
    }
}

package ir.freeland.springboot.persistence.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;

@Entity
@Table(name = "Users")
public class Users {
	
	private boolean active;
	private String nationalId;
	 private String password;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id",nullable = false, length = 50)
	private long id;
	
	@Column(name = "nameUser",nullable = false, length = 30)
	private String nameUser;
	
	@Column(name = "familyUser",nullable = false, length = 30)
	private String familyUser;
	
	@Column(name = "birthdayDate", length = 30)
	private String birthdayDate;
	 
	@Column(name = "Gender",nullable = false, length = 10)
	private String genderUser;
	 
	@Column(name = "sarbazi",nullable = true, length = 10)
	private String sarbazi;
	 
	@Column(name = "email",nullable = false, length = 50)
	@Email(message = "Invalid email format")
	private String email;
	 
	@Column(name = "phoneNumber",nullable = false, length = 50)
	private long phoneNumber;
	 
	 
	 
	 ///setters & getters

	public String getNameUser() {
		return nameUser;
	}

	public void setNameUser(String nameUser) {
		this.nameUser = nameUser;
	}

	public String getFamilyUser() {
		return familyUser;
	}

	public void setFamilyUser(String familyUser) {
		this.familyUser = familyUser;
	}

//	public Instant getBirthdayDate() {
//		return birthdayDate;
//	}
//
//	public void setBirthdayDate(Instant birthdayDate) {
//		this.birthdayDate = birthdayDate;
//	}

	
	public String getGenderUser() {
		return genderUser;
	}

	public String getBirthdayDate() {
		return birthdayDate;
	}

	public void setBirthdayDate(String birthdayDate) {
		this.birthdayDate = birthdayDate;
	}

	public void setGenderUser(String genderUser) {
		this.genderUser = genderUser;
	}

	public String getSarbazi() {
		return sarbazi;
	}

	public void setSarbazi(String sarbazi) {
		this.sarbazi = sarbazi;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public long getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(long phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public long getUniqueID() {
		return id;
	}

	public void setUniqueID(long id) {
		this.id = id;
	}
	 
	 
	 public boolean isActive() {
	        return active;
	    }

	    public void setActive(boolean active) {
	        this.active = active;
	    }
	 
	 
	    public String getNationalId() {
	        return nationalId;
	    }

	    public void setNationalId(String nationalId) {
	        this.nationalId = nationalId;
	    }
	    

	    public String getPassword() {
	        return password;
	    }

	    public void setPassword(String password) {
	        this.password = password;
	    }

}

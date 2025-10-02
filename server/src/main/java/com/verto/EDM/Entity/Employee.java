package com.verto.EDM.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Employee {
	@Id
	@GeneratedValue(generator = "employeeId")
	private Long id;
	private String name;
	private String email;
	private String position;
}

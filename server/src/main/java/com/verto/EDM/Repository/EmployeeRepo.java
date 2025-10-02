package com.verto.EDM.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.verto.EDM.Entity.Employee;

public interface EmployeeRepo extends JpaRepository<Employee, Long>{

	boolean existsByEmail(String email);

}

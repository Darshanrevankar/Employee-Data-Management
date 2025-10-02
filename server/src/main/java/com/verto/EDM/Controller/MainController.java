package com.verto.EDM.Controller;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.verto.EDM.Entity.Employee;
import com.verto.EDM.Exception.DataExistsException;
import com.verto.EDM.Exception.DataNotFoundException;
import com.verto.EDM.Repository.EmployeeRepo;

@RestController
public class MainController {
	
	@Autowired
	EmployeeRepo employeeRepo;
	
	Map<String, Object> map = new LinkedHashMap<String, Object>();

	@PostMapping("/api/employees")
	public ResponseEntity<Map<String, Object>> addEmployee(@RequestBody Employee employee) {
		if(!employeeRepo.existsByEmail(employee.getEmail())) {
			employeeRepo.save(employee);
			Map<String, Object> map = new LinkedHashMap<String, Object>();
	    	map.put("msg", "Data Insert Success");
	    	map.put("data", employee);
	    	return ResponseEntity.status(201).body(map);
		}
		throw new DataExistsException("Email already exists");				
	}
	
	@GetMapping("/api/employees")
	public ResponseEntity<Map<String, Object>> fetchEmployee() {
		List<Employee> employees = employeeRepo.findAll();
		if(!employees.isEmpty()) {
			map.put("msg", "Data Found Success");
	    	map.put("data", employees);
	    	return ResponseEntity.status(200).body(map);
		}
		throw new DataNotFoundException("Employee Details are not Present");
	}
	
	@DeleteMapping("/api/employees/delete/{id}")
	public ResponseEntity<Map<String, Object>> removeEmployee(@PathVariable Long id) {
		Employee employee = employeeRepo.findById(id).orElseThrow(() -> new DataNotFoundException("Data with id "+ id + " is not present"));
		employeeRepo.deleteById(id);
		map.put("msg", "Data Deleted Success");
	    map.put("data", employee);
	    return ResponseEntity.status(200).body(map);
		
	}
	@PutMapping("/api/employees")
	public ResponseEntity<Map<String, Object>> editEmployee(@RequestBody Employee employee) {
		employeeRepo.findById(employee.getId()).orElseThrow(() -> new DataNotFoundException("Data with id "+ employee.getId() + " is not present"));
		employeeRepo.save(employee);
		map.put("msg", "Data Update Success");
    	map.put("data", employee);
		return ResponseEntity.status(200).body(map);
	}

}

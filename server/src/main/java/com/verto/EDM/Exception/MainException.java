package com.verto.EDM.Exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;


@RestControllerAdvice
public class MainException {

	  Map<String, String> map = new HashMap<String, String>();
	  
	 @ExceptionHandler(NoResourceFoundException.class)
     public ResponseEntity<Map<String, String>> handle(NoResourceFoundException e) {
		  map.put("error", e.getMessage());
		  return ResponseEntity.status(404).body(map);
     }
	 
	 @ExceptionHandler(DataExistsException.class)
	 public ResponseEntity<Map<String, String>> handle(DataExistsException e) {
		 map.put("error", e.message);
		 return ResponseEntity.status(404).body(map);
	 }
	 
	 @ExceptionHandler(DataNotFoundException.class)
	 public ResponseEntity<Map<String, String>> handle(DataNotFoundException e) {
		 map.put("error", e.message);
		 return ResponseEntity.status(404).body(map);
	 }

	
}

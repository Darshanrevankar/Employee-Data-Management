package com.verto.EDM.Exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class DataExistsException extends RuntimeException{
	public String message = "Data is Present Already";
}

package com.verto.EDM.Exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DataNotFoundException extends RuntimeException{
       public String message = "Data is not Present";
}

package com.gs.service.util;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.HashMap;

public class CiddProperty {
	public static HashMap<String, String> CIDD_PROPERTIES = new HashMap<String, String>();
	
	public static String getProperty(String key){
		if(null != CIDD_PROPERTIES && CIDD_PROPERTIES.size() > 0){
			return (String) CIDD_PROPERTIES.get(key.toLowerCase());
		}else{
			storePropery();
			return (String) CIDD_PROPERTIES.get(key.toLowerCase());
		}
	}
	
	public static void storePropery(){
		String key = null;
		String value = null;
		try{
			String filePath = LoadPropertyFile.APP_BASE_PATH+"/app_configuration/app_configuration.properties";
			FileReader fileReader = new FileReader(filePath);
			BufferedReader br = new BufferedReader(fileReader);
			String line = null;
			while((line = br.readLine()) != null) {
				int index = line.indexOf("="); 
                if(index > 1){
                	key = (line.substring(0, index)).trim().toLowerCase();
                	value = (line.substring(index+1)).trim();
                	if(!key.trim().startsWith("#")){
                		CIDD_PROPERTIES.put(key, value);
                	}
                }
            }
			br.close();
		}catch(Exception ex){
			ex.printStackTrace();
		}
	}
}

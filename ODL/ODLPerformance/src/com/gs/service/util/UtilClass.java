package com.gs.service.util;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.List;

import org.apache.log4j.Logger;
import org.codehaus.jettison.json.JSONObject;

//import com.gs.service.impl.ManageUserServiceImpl;

public class UtilClass {
	private static Logger log = Logger.getLogger(UtilClass.class);
	//private static Properties properties = null;
	private static JSONObject properties = null;
	
	public static boolean checkNullOrEmpty(Object object) {
		String strObject = "";
		if (object != null) {
			strObject = object.toString().trim();
			if (strObject.isEmpty()) {
				return true;
			} else {
				return false;
			}
		}
		return true;
	}
	
	public boolean updateProperties(List<String> propertyList, String username){
		boolean status = true;
		log.info("updating "+username+".properties file of user :: "+username);
		String configFile = CiddProperty.getProperty("DRIVE")+CiddProperty.getProperty("BACKSLASH")+
				CiddProperty.getProperty("CIDD_REPOSITORY")+CiddProperty.getProperty("BACKSLASH")+
				username+CiddProperty.getProperty("BACKSLASH")+username+".properties";
		log.info("location of file :: "+configFile);
		try{
			if (!UtilClass.checkNullOrEmpty(configFile)) {
				if (!FileOperationSystem.getInstance().isFileExists(configFile)) {
					log.info("specified property file for user "+username+" does not exists :: "+configFile);
					status = false;
				}else{
					FileWriter fw = new FileWriter(configFile);
					log.info("propert list has "+propertyList.size()+" string/line");
					for (int count = 0; count < propertyList.size(); count++) {
						fw.append(propertyList.get(count));
						fw.append("\n");
					}
					fw.close();
				}
			}
		}catch (Exception ex) {
			status = false;
			log.error("exception inside updateProperties method :: ",ex);
		}
		return status;
	}
	
	public static JSONObject getProperties(String username) {
		try {
			String configFile = CiddProperty.getProperty("DRIVE")+CiddProperty.getProperty("BACKSLASH")+
					CiddProperty.getProperty("CIDD_REPOSITORY")+CiddProperty.getProperty("BACKSLASH")+
					username+CiddProperty.getProperty("BACKSLASH")+username+".properties";
			log.info("property file location :: "+configFile);
			UtilClass utilClass = new UtilClass();
			if (properties == null) {
				log.info("initializing config.properties file for user "+username);
				properties = new JSONObject();
				if (!UtilClass.checkNullOrEmpty(configFile)) {
					if (!FileOperationSystem.getInstance().isFileExists(configFile)) {
						log.info("specified properties file for user "+username +"does not exists : "+configFile);
					}else{
						properties = utilClass.loadProperty(configFile);
					}
				}
			}else{
				if (!UtilClass.checkNullOrEmpty(configFile)) {
					if (!FileOperationSystem.getInstance().isFileExists(configFile)) {
						log.info("specified properties file for user "+username +" does not exists :: "+configFile);
					}else{
						properties = utilClass.loadProperty(configFile);
					}
				}
			}
		}catch (Exception ex) {
			log.error("exception inside getProperties method :: ",ex);
		}
		return properties;
	}
	
	public JSONObject loadProperty(String configFile){
		String key = null;
		String value = null;
		JSONObject json = new JSONObject();
		try{
			FileReader fileReader = new FileReader(configFile);
			BufferedReader br = new BufferedReader(fileReader);
			String line = null;
			while((line = br.readLine()) != null) {
				int index = line.indexOf("="); 
                if(index > 1){
                	key = (line.substring(0, index)).trim();
                	value = (line.substring(index+1)).trim();
                	if(!key.trim().startsWith("#")){
                		json.put(key, value);
                	}
                }
            }
			br.close();
		}catch(Exception ex){
			log.error("exception inside loadProperty method :: ",ex);
		}
		return json;
	}
}

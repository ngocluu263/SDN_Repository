package com.gs.service.impl;

import java.awt.List;
import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import net.sf.json.JSONObject;

import org.apache.http.HttpStatus;

import com.google.gson.Gson;
import com.gs.service.dto.DOLDetails;
import java.util.Date;
import java.sql.Timestamp;

@Path("/odlPer")
public class ODLPerformanceServiceImpl {
	
	@POST
	@Path("/testodlPerformance")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response addTaskRecord(DOLDetails dOLDetails,@Context HttpServletRequest request) {
		Gson gson = new Gson();
		try{
			HttpSession session = request.getSession(false);
			GenerateFileForPython generateFileForPython = new GenerateFileForPython();
			generateFileForPython.writeFileInDisk(dOLDetails);
			
			try {
				String timestamp;
			    java.util.Date date=new java.util.Date();
			    timestamp=(new Timestamp(date.getTime())).toString();
			    timestamp=(((timestamp.replace(" ", "")).replace(":", "")).replace("-", "")).replace(".", "") ;
			    System.out.println(timestamp);
			    System.out.println("T4");
				Process p = Runtime.getRuntime().exec("python C:/RemoteExecution/RemoteExecute.py "+timestamp);
			 	BufferedReader output = new BufferedReader(new InputStreamReader(p.getInputStream()));
			 	String line2;
			 	while ((line2 = output.readLine()) != null) {
			 		System.out.println(line2);
			 	}
				 System.out.println("Wait out: "+p.waitFor());
			     System.out.println("Exit Value: "+p.exitValue());
				
	         if (p.exitValue() == 5)
	         {
			    
			    	 String logFile = "C:\\RemoteExecution\\results.csv";
			    	
			         String lastLine = "";
			         String[] firstLine = null;
			         int i = 0;
			         ArrayList<String> dataTojs = new ArrayList<String>();
			         dataTojs.clear();
			         if (logFile.length() != 0) 
			         {

			             String fstream = "C:\\RemoteExecution\\results.csv";
			             BufferedReader br = new BufferedReader(new FileReader(fstream));
			             String line = "";
			             /* read log line by line */
			             while ((line = br.readLine()) != null) {
			                 lastLine += line;
			                 lastLine += "\n";
			             }
			            // for (int j = 0 ; j < lastLine.split("\n").length ; j ++ ){
			            	 
			             
			             if (lastLine.contains("run_num")) {
			            System.out.print("Whole Data :  "+lastLine); 
			            String[] completeData = lastLine.split("\n");
			            for (int j = 0 ; j < lastLine.split("\n").length ; j++ ){
			            	dataTojs.add(completeData[j]);
			            	
			            }
			            	dataTojs.add(timestamp);
			            String jsonData = gson.toJson(dataTojs);
			            return Response.status(HttpStatus.SC_OK).entity(jsonData).build();
			             }else{
			            	 System.out.println("Could not read");
			             }
			             br.close();
			         } 
			         else {
			             System.out.println("File is empty");
			         }
	         }
	         else
	         {
	        	 System.out.println("Run Failed");
	         }
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			return Response.status(5).build();
		}catch(Exception ex){
			ex.printStackTrace();
			
			return Response.status(5).entity("Service unavailable").build();
		}
	}

}

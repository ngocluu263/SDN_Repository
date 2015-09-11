package com.gs.service.impl;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

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

import org.apache.http.HttpStatus;
import org.apache.log4j.Logger;
import org.codehaus.jettison.json.JSONObject;

import com.gs.service.constants.CiddConstants;
import com.gs.service.util.UtilClass;

@Path("/configuration")
public class ManageConfigurationServiceImpl {
	private static Logger log = Logger.getLogger(ManageConfigurationServiceImpl.class);

	@GET
	@Path("/get")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getConfiguration(@Context HttpServletRequest request) {
		log.info("get configurations");
		try {
			HttpSession session = request.getSession(false);
			if (null != session) {
				log.info("Logged in user is :: "+session.getAttribute(CiddConstants.USERNAME));
				String username = (String) session.getAttribute(CiddConstants.USERNAME);
				JSONObject properties = UtilClass.getProperties(username);
				if (null != properties) {
					return Response.status(HttpStatus.SC_OK).entity(properties).build();
				} else
					return Response.status(HttpStatus.SC_NO_CONTENT).entity("Displaying Default Content..").build();
			}
			return Response.status(HttpStatus.SC_UNAUTHORIZED).build();
		} catch (Exception ex) {
			ex.printStackTrace();
			log.error("exception inside getConfiguration method :: ",ex);
			return Response.status(HttpStatus.SC_INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@POST
	@Path("/update")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateConfiguration(String jsonString, @Context HttpServletRequest request) {
		log.info("value for updating configurations :: "+jsonString);
		List<String> propertyList = new ArrayList<String>();
		boolean status;
		try{
			HttpSession session = request.getSession(false);
			if (null != session) {
				log.info("Logged in user is :: "+session.getAttribute(CiddConstants.USERNAME));
				String username = (String) session.getAttribute(CiddConstants.USERNAME);
				if(!UtilClass.checkNullOrEmpty(jsonString)){
					UtilClass utilClass = new UtilClass();
					JSONObject jsonObject = new JSONObject(jsonString.trim());
					Iterator<?> keys = jsonObject.keys();
					String key = null;
				    String value = null;
					while( keys.hasNext() ) {
					    key = (String)keys.next();
					    value = jsonObject.getString(key);
					    //System.out.println("row :: "+row+", key :: "+key+", value :: "+value);
					    propertyList.add(key+"="+value);
					}
					status = utilClass.updateProperties(propertyList, username);
				    if(true == status)
				    	return Response.status(HttpStatus.SC_OK).build();
				    else
				    	return Response.status(HttpStatus.SC_METHOD_FAILURE).build();
				}else{
					return Response.status(HttpStatus.SC_NOT_ACCEPTABLE).entity("Nothig to update").build();
				}
			}
			return Response.status(HttpStatus.SC_UNAUTHORIZED).build();
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("exception inside updateConfiguration method :: ",ex);
			return Response.status(HttpStatus.SC_INTERNAL_SERVER_ERROR).build();
		}
	}
}

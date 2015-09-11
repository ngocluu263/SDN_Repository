package com.gs.service.impl;

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
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONObject;

import com.gs.service.archive.GetUsername;
import com.gs.service.constants.CiddConstants;
import com.gs.service.constants.EmailConstant;
import com.gs.service.dao.UserDetailsDao;
import com.gs.service.dto.UserDetailsDto;
import com.gs.service.util.EmailNotification;
import com.gs.service.util.UtilClass;

@Path("/user")
public class ManageUserServiceImpl {
	private static Logger log = Logger.getLogger(ManageUserServiceImpl.class);
	
	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String sayPlainTextHello() {
		return "Hello Jersey";
	}
	
	@POST
	@Path("/login")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response validateLogin(UserDetailsDto userDetailsDto, @Context HttpServletRequest request) {
		log.info("inside validateLogin method value for user details :: " + userDetailsDto);
		try{
			UserDetailsDao userDetailsDao = UserDetailsDao.getInstatnce();
			UserDetailsDto userDetailsDtoFromDb = userDetailsDao.validateUser(userDetailsDto);
			if(UtilClass.checkNullOrEmpty(userDetailsDtoFromDb)){
				return Response.status(HttpStatus.SC_NOT_FOUND).entity("User not found").build();
			}else if(userDetailsDto.getUsername().equals(userDetailsDtoFromDb.getUsername()) && 
					userDetailsDto.getPassword().equals(userDetailsDtoFromDb.getPassword())){
				HttpSession session = request.getSession(false);
				if(null != session){
					//invalidate the session if it has any
					session.invalidate();
					//get new session
					session = request.getSession();
				}else{
					//get new session
					session = request.getSession();
				}
				GetUsername getInstance=GetUsername.getInstance();
				getInstance.setUsername(CiddConstants.USERNAME, userDetailsDtoFromDb.getUsername());
				//get session and write username attribute to it 
				session.setAttribute(CiddConstants.USERNAME, userDetailsDtoFromDb.getUsername());
				session.setAttribute(CiddConstants.USERTYPE, userDetailsDtoFromDb.getUserType());
				return Response.status(HttpStatus.SC_OK).entity("Login successful").build();
			}else{
				return Response.status(HttpStatus.SC_UNAUTHORIZED).entity("UserName or Password is incorrect").build();
			}
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("exception inside validateLogin method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
	
	@POST
	@Path("/forgotPwd")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response forgotPassword(UserDetailsDto userDetailsDto, @Context HttpServletRequest request) {
		log.info("inside forgotPassword method value for user details :: " + userDetailsDto);
		try{
			UserDetailsDao userDetailsDao = UserDetailsDao.getInstatnce();
			UserDetailsDto userDetailsDtoFromDb = userDetailsDao.getUserDetailForSpecificName(userDetailsDto);
			if(UtilClass.checkNullOrEmpty(userDetailsDtoFromDb)){
				return Response.status(HttpStatus.SC_UNAUTHORIZED).entity("User not found").build();
			}else if(userDetailsDto.getUsername().equals(userDetailsDtoFromDb.getUsername())){
				log.info("got the registered email id :: "+userDetailsDtoFromDb.getEmailId());
				if (EmailNotification.sendEmailNotificationForForgotPwd(userDetailsDtoFromDb) == true){
					return Response.status(HttpStatus.SC_OK).entity("Password has been sent to your registered email").build();
				}else{
					return Response.status(HttpStatus.SC_BAD_REQUEST).entity("Could not send the mail. Please try again later").build();
				}
			}else{
				return Response.status(HttpStatus.SC_PARTIAL_CONTENT).entity("User not available").build();
			}
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("exception inside forgotPassword method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
	
	@GET
	@Path("/get")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllUserRecord(@Context HttpServletRequest request) {
		log.info("inside getAllUserRecord method value for all user details");
		try{
			HttpSession session = request.getSession(false);
			UserDetailsDao userDetailsDao = UserDetailsDao.getInstatnce();
			UserDetailsDto userDetailsDto = null;
			JSONArray jsonArray = new JSONArray();
			JSONObject json = null;
			if(null != session) {
				List<UserDetailsDto> userRecordList = userDetailsDao.getAllUserRecord();
				for (int count = 0; count < userRecordList.size(); count++) {
					userDetailsDto = userRecordList.get(count);
					json = new JSONObject();
					json.put("userId", userDetailsDto.getUserId());
					json.put("name", userDetailsDto.getName());
					json.put("username", userDetailsDto.getUsername());
					json.put("password", userDetailsDto.getPassword());
					json.put("emailId", userDetailsDto.getEmailId());
					json.put("userType", userDetailsDto.getUserType());
					jsonArray.put(json);
				}
				return Response.status(HttpStatus.SC_OK).entity(jsonArray).build();
			}
			return Response.status(HttpStatus.SC_UNAUTHORIZED).build();
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("exception inside getAllUserRecord method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
	
	@POST
	@Path("/add")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response addUserRecord(UserDetailsDto userDetailsDto, @Context HttpServletRequest request) {
		log.info("inside addUserRecord method value for user details :: " + userDetailsDto);
		try{
			HttpSession session = request.getSession(false);
			UserDetailsDao userDetailsDao = UserDetailsDao.getInstatnce();
			boolean result = false;
			if(null != session) {
				if(!userDetailsDto.getUsername().equalsIgnoreCase("admin")){
					//If username not equal to admin
					result = userDetailsDao.addUserRecord(userDetailsDto);
					if(result == true){
						return Response.status(HttpStatus.SC_PARTIAL_CONTENT).build();
					}else{
						boolean emailResult = EmailNotification.sendEmailNotification(userDetailsDto, 
								EmailConstant.ADDUSER);
						if(emailResult == true){
							return Response.status(HttpStatus.SC_OK).build();
						}else{
							return Response.status(HttpStatus.SC_NO_CONTENT).build();
						}
					}
				}
			}
			return Response.status(HttpStatus.SC_UNAUTHORIZED).build();
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("exception inside addUserRecord method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
	
	@POST
	@Path("/removeUser")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response removeUserRecord(UserDetailsDto userDetailsDto, @Context HttpServletRequest request) {
		log.info("inside removeUserRecord method value for user details :: " + userDetailsDto);
		try{
			HttpSession session = request.getSession(false);
			UserDetailsDao userDetailsDao = UserDetailsDao.getInstatnce();
			boolean result = false;
			if(null != session) {
				//if(!userDetailsDto.getUsername().equalsIgnoreCase("admin")){
					//If username not equal to admin
					result = userDetailsDao.removeUserRecord(userDetailsDto);
					if(true == result ){
						return Response.status(HttpStatus.SC_OK).build();
					}else{
						
					}
				//}
			}
			return Response.status(HttpStatus.SC_UNAUTHORIZED).build();
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("exception inside removeUserRecord method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
}

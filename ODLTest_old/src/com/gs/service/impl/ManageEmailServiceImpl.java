package com.gs.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
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

import com.gs.service.dao.EmailDetailsDao;
import com.gs.service.dto.EmailDetailsDto;

@Path("/emails")
public class ManageEmailServiceImpl {
	private static Logger log = Logger.getLogger(ManageEmailServiceImpl.class);
	
	@POST
	@Path("/getEmails")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response getAllEmailsRecord(EmailDetailsDto emailDetailsDto, @Context HttpServletRequest request) {
		log.info("inside getAllEmailsRecord method for specified project name :: "+emailDetailsDto);
		try{
			HttpSession session = request.getSession(false);
			JSONArray jsonArray = new JSONArray();
			JSONObject json = null;
			if(null != session) {
				EmailDetailsDao emailDetailsDao = EmailDetailsDao.getInstatnce();
				List<EmailDetailsDto> emailRecordList = emailDetailsDao.getAllEmailRecordForSpecifiedProject(emailDetailsDto);
				for (int count = 0; count < emailRecordList.size(); count++) {
					emailDetailsDto = emailRecordList.get(count);
					json = new JSONObject();
					json.put("projectId", emailDetailsDto.getProjectId());
					json.put("projectName", emailDetailsDto.getProjectName());
					json.put("emailId", emailDetailsDto.getEmailId());
					json.put("email", emailDetailsDto.getEmail());
					jsonArray.put(json);
				}
				return Response.status(HttpStatus.SC_OK).entity(jsonArray).build();
			}
			return Response.status(HttpStatus.SC_UNAUTHORIZED).build();
		}catch(Exception ex){
			log.error("exception inside getAllEmailsRecord method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
	
	@POST
	@Path("/addEmail")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response addEmailRecord(EmailDetailsDto emailDetailsDto, @Context HttpServletRequest request) {
		log.info("inside addEmailRecord method value for email details :: "+emailDetailsDto);
		try{
			HttpSession session = request.getSession(false);
			EmailDetailsDao emailDetailsDao = EmailDetailsDao.getInstatnce();
			String isEmailExistStatus = null;
			if(null != session) {
				isEmailExistStatus = emailDetailsDao.addEmailRecord(emailDetailsDto);
				if(isEmailExistStatus.split("#&#")[0].equalsIgnoreCase("added")){
					return Response.status(HttpStatus.SC_OK).build();
				}else if(isEmailExistStatus.split("#&#")[0].equalsIgnoreCase("already_exist")){
					return Response.status(HttpStatus.SC_RESET_CONTENT).build();
				}else{
					return Response.status(HttpStatus.SC_NO_CONTENT).build();
				}
			}
			return Response.status(HttpStatus.SC_UNAUTHORIZED).build();
		}catch(Exception ex){
			log.error("exception inside addEmailRecord method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
	
	@POST
	@Path("/removemail")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response removeEmailRecord(EmailDetailsDto emailDetailsDto, @Context HttpServletRequest request) {
		log.info("inside removeEmailRecord method value for email details :: "+emailDetailsDto);
		try{
			HttpSession session = request.getSession(false);
			EmailDetailsDao emailDetailsDao = EmailDetailsDao.getInstatnce();
			boolean status = false;
			if(null != session) {
				status = emailDetailsDao.removeEmailRecord(emailDetailsDto);
				if(true == status){
					return Response.status(HttpStatus.SC_OK).build();
				}else{
					return Response.status(HttpStatus.SC_NO_CONTENT).build();
				}
			}
			return Response.status(HttpStatus.SC_UNAUTHORIZED).build();
		}catch(Exception ex){
			log.error("exception inside removeEmailRecord method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
}
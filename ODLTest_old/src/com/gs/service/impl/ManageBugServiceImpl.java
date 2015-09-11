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

import com.gs.service.dao.BugDetailsDao;
import com.gs.service.dto.BugDetailsDto;

@Path("/bug")
public class ManageBugServiceImpl {
	private static Logger log = Logger.getLogger(ManageBugServiceImpl.class);
	
	@GET
	@Path("/get")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getBugRecord(@Context HttpServletRequest request) {
		log.info("inside getBugRecord method to get bug record");
		JSONArray jsonArray = new JSONArray();
		JSONObject json = null;
		BugDetailsDto bugDetailsDto = null;
		try{
			BugDetailsDao bugDetailsDao = BugDetailsDao.getInstatnce();
			List<BugDetailsDto> bugRecordList = bugDetailsDao.getBugRecord();
			for (int count = 0; count < bugRecordList.size(); count++) {
				bugDetailsDto = bugRecordList.get(count);
				json = new JSONObject();
				json.put("bugId", bugDetailsDto.getBugId());
				json.put("sprintId", bugDetailsDto.getSprintId());
				json.put("userStoryId", bugDetailsDto.getUserStoryId());
				json.put("userStoryName", bugDetailsDto.getUserStoryName());
				json.put("sprintName", bugDetailsDto.getSprintName());
				json.put("taskId", bugDetailsDto.getTaskId());
				json.put("taskDescription", bugDetailsDto.getTaskDescription());
				json.put("testId", bugDetailsDto.getTestId());
				json.put("testSummary", bugDetailsDto.getTestSummary());
				json.put("assignedTo", bugDetailsDto.getAssignedTo());
				json.put("assignedName", bugDetailsDto.getAssignedName());
				json.put("bugTitle", bugDetailsDto.getBugTitle());
				json.put("bugDescription", bugDetailsDto.getBugDescription());
				json.put("bugSeverity", bugDetailsDto.getBugSeverity());
				json.put("bugStatus", bugDetailsDto.getBugStatus());
				jsonArray.put(json);
			}
			return Response.status(HttpStatus.SC_OK).entity(jsonArray).build();
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("exception inside getTaskRecord method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
	
	@POST
	@Path("/add")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response addBugRecord(BugDetailsDto bugDetailsDto, @Context HttpServletRequest request) {
		log.info("inside addBugRecord method value for bug details :: "+bugDetailsDto);
		try{
			HttpSession session = request.getSession(false);
			BugDetailsDao bugDetailsDao = BugDetailsDao.getInstatnce();
			boolean result = false;
			if(null != session) {
				result = bugDetailsDao.addBugRecord(bugDetailsDto);
				if(true == result){
					return Response.status(HttpStatus.SC_OK).build();
				}else{
					return Response.status(HttpStatus.SC_NO_CONTENT).build();
				}
			}
			return Response.status(HttpStatus.SC_UNAUTHORIZED).build();
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("exception inside addBugRecord method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
	@POST
	@Path("/update")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response updateBugRecord(BugDetailsDto bugDetailsDto, @Context HttpServletRequest request) {
		log.info("inside updateBugRecord method value for bug details :: "+bugDetailsDto);
		try{
			HttpSession session = request.getSession(false);
			BugDetailsDao bugDetailsDao = BugDetailsDao.getInstatnce();
			boolean result = false;
			if(null != session) {
				result = bugDetailsDao.updateBugRecord(bugDetailsDto);
				if(true == result){
					return Response.status(HttpStatus.SC_OK).build();
				}else{
					return Response.status(HttpStatus.SC_NO_CONTENT).build();
				}
			}
			return Response.status(HttpStatus.SC_UNAUTHORIZED).build();
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("exception inside updateBugRecord method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
}

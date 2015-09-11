package com.gs.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
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
import com.gs.service.dao.SprintDetailsDao;
import com.gs.service.dto.BugDetailsDto;
import com.gs.service.dto.SprintDetailsDto;

@Path("/sprint")
public class ManageSprintServiceImpl {
	private static Logger log = Logger.getLogger(ManageSprintServiceImpl.class);
	
	@GET
	@Path("/get")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getSprintRecord(@Context HttpServletRequest request) {
		log.info("inside getSprintRecord method to get sprint record");
		JSONArray jsonArray = new JSONArray();
		JSONObject json = null;
		SprintDetailsDto sprintDetailsDto = null;
		try{
			SprintDetailsDao sprintDetailsDao = SprintDetailsDao.getInstatnce();
			List<SprintDetailsDto> sprintRecordList = sprintDetailsDao.getSprintRecord();
			for (int count = 0; count < sprintRecordList.size(); count++) {
				sprintDetailsDto = sprintRecordList.get(count);
				json = new JSONObject();
				json.put("releaseId", sprintDetailsDto.getReleaseId());
				json.put("releaseName", sprintDetailsDto.getReleaseName());
				json.put("sprintId", sprintDetailsDto.getSprintId());
				json.put("sprintName", sprintDetailsDto.getSprintName());
				json.put("sprintItem", sprintDetailsDto.getSprintItem());
				json.put("startDate", sprintDetailsDto.getSprintStartDate());
				json.put("endDate", sprintDetailsDto.getSprintEndDate());
				json.put("sprintDuration", sprintDetailsDto.getSprintDuration());
				json.put("sprintStatus", sprintDetailsDto.getSprintStatus());
				jsonArray.put(json);
			}
			return Response.status(HttpStatus.SC_OK).entity(jsonArray).build();
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("exception inside getSprintRecord method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
	
	@POST
	@Path("/getSprintRecordForSpecifiedRelease")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response getSprintRecordForSpecifiedRelease(SprintDetailsDto sprintDetailsDto, 
			@Context HttpServletRequest request) {
		log.info("inside getSprintRecordForSpecifiedRelease method to get sprint record");
		JSONArray jsonArray = new JSONArray();
		JSONObject json = null;
		try{
			SprintDetailsDao sprintDetailsDao = SprintDetailsDao.getInstatnce();
			List<SprintDetailsDto> sprintRecordList = sprintDetailsDao.getSprintRecordForSpecifiedRelease(sprintDetailsDto);
			for (int count = 0; count < sprintRecordList.size(); count++) {
				sprintDetailsDto = sprintRecordList.get(count);
				json = new JSONObject();
				json.put("releaseId", sprintDetailsDto.getReleaseId());
				json.put("releaseName", sprintDetailsDto.getReleaseName());
				json.put("sprintId", sprintDetailsDto.getSprintId());
				json.put("sprintName", sprintDetailsDto.getSprintName());
				json.put("sprintItem", sprintDetailsDto.getSprintItem());
				json.put("startDate", sprintDetailsDto.getSprintStartDate());
				json.put("endDate", sprintDetailsDto.getSprintEndDate());
				json.put("sprintDuration", sprintDetailsDto.getSprintDuration());
				json.put("sprintStatus", sprintDetailsDto.getSprintStatus());
				jsonArray.put(json);
			}
			return Response.status(HttpStatus.SC_OK).entity(jsonArray).build();
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("exception inside getSprintRecordForSpecifiedRelease method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
	
	@POST
	@Path("/add")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response addSprintRecord(SprintDetailsDto sprintDetailsDto, @Context HttpServletRequest request) {
		log.info("inside addSprintRecord method value for sprint details :: "+sprintDetailsDto);
		try{
			HttpSession session = request.getSession(false);
			SprintDetailsDao sprintDetailsDao = SprintDetailsDao.getInstatnce();
			boolean result = false;
			if(null != session) {
				result = sprintDetailsDao.addSprintRecord(sprintDetailsDto);
				if(true == result){
					return Response.status(HttpStatus.SC_OK).build();
				}else{
					return Response.status(HttpStatus.SC_NO_CONTENT).build();
				}
			}
			return Response.status(HttpStatus.SC_UNAUTHORIZED).build();
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("exception inside addSprintRecord method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
	
	@PUT
	@Path("/update")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response updateSprintRecord(SprintDetailsDto sprintDetailsDto, @Context HttpServletRequest request) {
		log.info("inside updateSprintRecord method value for sprint details :: "+sprintDetailsDto);
		try{
			HttpSession session = request.getSession(false);
			SprintDetailsDao sprintDetailsDao = SprintDetailsDao.getInstatnce();
			boolean result = false;
			if(null != session) {
				result = sprintDetailsDao.updateSprintRecord(sprintDetailsDto);
				if(true == result){
					return Response.status(HttpStatus.SC_OK).build();
				}else{
					return Response.status(HttpStatus.SC_NO_CONTENT).build();
				}
			}
			return Response.status(HttpStatus.SC_UNAUTHORIZED).build();
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("exception inside updateSprintRecord method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
	@GET
	@Path("/getBugListForSprint")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getBugRecordforSprint(@Context HttpServletRequest request) {
		log.info("inside getBugRecordforSprint method to get bug record");
		JSONArray jsonArray = new JSONArray();
		JSONObject json = null;
		BugDetailsDto bugDetailsDto = null;
		String sprintId=request.getParameter("sprintId");
		try{
			BugDetailsDao bugDetailsDao = BugDetailsDao.getInstatnce();
			List<BugDetailsDto> bugRecordList = bugDetailsDao.getBugRecordList(sprintId,"sprint_id");
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
			log.error("exception inside getBugRecordforSprint method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
}

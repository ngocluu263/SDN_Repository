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
import com.gs.service.dao.TestDetailsDao;
import com.gs.service.dto.BugDetailsDto;
import com.gs.service.dto.TestDetailsDto;

@Path("/test")
public class ManageTestServiceImpl {
	private static Logger log = Logger.getLogger(ManageTestServiceImpl.class);
	
	@GET
	@Path("/get")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getTestRecord(@Context HttpServletRequest request) {
		log.info("inside getTestRecord method to get test record");
		JSONArray jsonArray = new JSONArray();
		JSONObject json = null;
		TestDetailsDto testDetailsDto = null;
		try{
			TestDetailsDao testDetailsDao = TestDetailsDao.getInstatnce();
			List<TestDetailsDto> testRecordList = testDetailsDao.getTestRecord();
			for (int count = 0; count < testRecordList.size(); count++) {
				testDetailsDto = testRecordList.get(count);
				json = new JSONObject();
				json.put("sprintId", testDetailsDto.getSprintId());
				json.put("sprintName", testDetailsDto.getSprintName());
				json.put("taskId", testDetailsDto.getTaskId());
				json.put("taskDescription", testDetailsDto.getTaskDescription());
				json.put("userStoryId", testDetailsDto.getUserStoryId());
				json.put("userStoryName", testDetailsDto.getUserStoryName());
				json.put("testId", testDetailsDto.getTestId());
				json.put("assignedTo", testDetailsDto.getAssignedTo());
				json.put("assignedName", testDetailsDto.getAssignedName());
				json.put("testStatus", testDetailsDto.getTestStatus());
				json.put("testSummary", testDetailsDto.getTestSummary());
				jsonArray.put(json);
			}
			return Response.status(HttpStatus.SC_OK).entity(jsonArray).build();
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("exception inside getTestRecord method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
	
	/*@POST
	@Path("/getTestRecordForSpecificUserStory")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response getTestRecordForSpecificUserStory(TestDetailsDto testDetailsDto, @Context HttpServletRequest request) {
		log.info("inside getTestRecordForSpecificUserStory method to get test record");
		JSONArray jsonArray = new JSONArray();
		JSONObject json = null;
		TestDetailsDto testDetailsDtoFromDb = null;
		try{
			TestDetailsDao testDetailsDao = TestDetailsDao.getInstatnce();
			List<TestDetailsDto> testRecordList = testDetailsDao.getTestRecordForSpecificUserStory(testDetailsDto);
			for (int count = 0; count < testRecordList.size(); count++) {
				testDetailsDtoFromDb = testRecordList.get(count);
				json = new JSONObject();
				json.put("sprintId", testDetailsDtoFromDb.getSprintId());
				json.put("sprintName", testDetailsDtoFromDb.getSprintName());
				json.put("taskId", testDetailsDtoFromDb.getTaskId());
				json.put("taskDescription", testDetailsDtoFromDb.getTaskDescription());
				json.put("userStoryId", testDetailsDtoFromDb.getUserStoryId());
				json.put("userStoryName", testDetailsDtoFromDb.getUserStoryName());
				json.put("testId", testDetailsDtoFromDb.getTestId());
				json.put("assignedTo", testDetailsDtoFromDb.getAssignedTo());
				json.put("assignedName", testDetailsDtoFromDb.getAssignedName());
				json.put("testStatus", testDetailsDtoFromDb.getTestStatus());
				json.put("testSummary", testDetailsDtoFromDb.getTestSummary());
				jsonArray.put(json);
			}
			return Response.status(HttpStatus.SC_OK).entity(jsonArray).build();
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("exception inside getTestRecordForSpecificUserStory method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}*/
	
	@POST
	@Path("/add")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response addTestRecord(TestDetailsDto testDetailsDto, @Context HttpServletRequest request) {
		log.info("inside addTestRecord method value for test details :: "+testDetailsDto);
		try{
			HttpSession session = request.getSession(false);
			TestDetailsDao testDetailsDao = TestDetailsDao.getInstatnce();
			boolean result = false;
			if(null != session) {
				result = testDetailsDao.addTestRecord(testDetailsDto);
				if(true == result){
					return Response.status(HttpStatus.SC_OK).build();
				}else{
					return Response.status(HttpStatus.SC_NO_CONTENT).build();
				}
			}
			return Response.status(HttpStatus.SC_UNAUTHORIZED).build();
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("exception inside addTestRecord method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
	
	@PUT
	@Path("/update")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response updateTestRecord(TestDetailsDto testDetailsDto, @Context HttpServletRequest request) {
		log.info("inside updateTestRecord method value for test details :: "+testDetailsDto);
		try{
			HttpSession session = request.getSession(false);
			TestDetailsDao testDetailsDao = TestDetailsDao.getInstatnce();
			boolean result = false;
			if(null != session) {
				result = testDetailsDao.updateTestRecord(testDetailsDto);
				if(true == result){
					return Response.status(HttpStatus.SC_OK).build();
				}else{
					return Response.status(HttpStatus.SC_NO_CONTENT).build();
				}
			}
			return Response.status(HttpStatus.SC_UNAUTHORIZED).build();
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("exception inside updateTestRecord method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
	@GET
	@Path("/getBugListForTest")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getBugRecordForTest(@Context HttpServletRequest request) {
		log.info("inside getBugRecordForTest method to get bug record");
		JSONArray jsonArray = new JSONArray();
		JSONObject json = null;
		BugDetailsDto bugDetailsDto = null;
		String testId = request.getParameter("test_id");
		try{
			BugDetailsDao bugDetailsDao = BugDetailsDao.getInstatnce();
			List<BugDetailsDto> bugRecordList = bugDetailsDao.getBugRecordList(testId,"test_id");
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
			log.error("exception inside getBugRecordForTest method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
}

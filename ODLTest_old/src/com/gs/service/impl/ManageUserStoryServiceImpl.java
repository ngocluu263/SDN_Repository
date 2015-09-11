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
import com.gs.service.dao.TaskDetailsDao;
import com.gs.service.dao.TestDetailsDao;
import com.gs.service.dao.UserStoryDetailsDao;
import com.gs.service.dto.BugDetailsDto;
import com.gs.service.dto.TaskDetailsDto;
import com.gs.service.dto.TestDetailsDto;
import com.gs.service.dto.UserStoryDetailsDto;

@Path("/userstory")
public class ManageUserStoryServiceImpl {
	private static Logger log = Logger.getLogger(ManageReleaseServiceImpl.class);
	
	@GET
	@Path("/get")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getUserStoryRecord(@Context HttpServletRequest request) {
		log.info("inside getUserStoryRecord method to get user story record");
		JSONArray jsonArray = new JSONArray();
		JSONObject json = null;
		UserStoryDetailsDto userStoryDetailsDto = null;
		try{
			UserStoryDetailsDao userStoryDetailsDao = UserStoryDetailsDao.getInstatnce();
			List<UserStoryDetailsDto> userStoryRecordList = userStoryDetailsDao.getUserStoryRecord();
			for (int count = 0; count < userStoryRecordList.size(); count++) {
				userStoryDetailsDto = userStoryRecordList.get(count);
				json = new JSONObject();
				json.put("userStoryId", userStoryDetailsDto.getUserStoryId());
				json.put("userStoryName", userStoryDetailsDto.getUserStoryName());
				json.put("userStoryStatus", userStoryDetailsDto.getUserStoryStatus());
				json.put("userStoryAsA", userStoryDetailsDto.getUserStoryAsA());
				json.put("userStoryDescription", userStoryDetailsDto.getUserStoryDescription());
				json.put("userStorySprintId", userStoryDetailsDto.getUserStorySprintId());
				json.put("userStorySprintName", userStoryDetailsDto.getUserStorySprintName());
				json.put("userStoryReleaseId", userStoryDetailsDto.getUserStoryReleaseId());
				json.put("userStoryReleaseName", userStoryDetailsDto.getUserStoryReleaseName());
				jsonArray.put(json);
			}
			return Response.status(HttpStatus.SC_OK).entity(jsonArray).build();
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("exception inside getUserStoryRecord method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
	
	@POST
	@Path("/getUserStoryRecordForSpecifiedReleaseOrSprint")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response getUserStoryRecordForSpecifiedRelease(UserStoryDetailsDto userStoryDetailsDto, 
			@Context HttpServletRequest request) {
		log.info("inside getUserStoryRecordForSpecifiedRelease method to get user story record");
		JSONArray jsonArray = new JSONArray();
		JSONObject json = null;
		try{
			UserStoryDetailsDao userStoryDetailsDao = UserStoryDetailsDao.getInstatnce();
			List<UserStoryDetailsDto> userStoryRecordList = userStoryDetailsDao.getUserStoryRecordForSpecifiedReleaseOrSprint(userStoryDetailsDto);
			for (int count = 0; count < userStoryRecordList.size(); count++) {
				userStoryDetailsDto = userStoryRecordList.get(count);
				json = new JSONObject();
				json = new JSONObject();
				json.put("userStoryId", userStoryDetailsDto.getUserStoryId());
				json.put("userStoryName", userStoryDetailsDto.getUserStoryName());
				json.put("userStoryStatus", userStoryDetailsDto.getUserStoryStatus());
				json.put("userStoryAsA", userStoryDetailsDto.getUserStoryAsA());
				json.put("userStoryDescription", userStoryDetailsDto.getUserStoryDescription());
				json.put("userStorySprintId", userStoryDetailsDto.getUserStorySprintId());
				json.put("userStorySprintName", userStoryDetailsDto.getUserStorySprintName());
				json.put("userStoryReleaseId", userStoryDetailsDto.getUserStoryReleaseId());
				json.put("userStoryReleaseName", userStoryDetailsDto.getUserStoryReleaseName());
				jsonArray.put(json);
			}
			return Response.status(HttpStatus.SC_OK).entity(jsonArray).build();
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("exception inside getUserStoryRecordForSpecifiedRelease method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
	
	@POST
	@Path("/add")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response addUserStoryRecord(UserStoryDetailsDto userStoryDetailsDto, @Context HttpServletRequest request) {
		log.info("inside addUserStoryRecord method value for user story details :: "+userStoryDetailsDto);
		try{
			HttpSession session = request.getSession(false);
			UserStoryDetailsDao userStoryDetailsDao = UserStoryDetailsDao.getInstatnce();
			boolean result = false;
			if(null != session) {
				result = userStoryDetailsDao.addUserStoryRecord(userStoryDetailsDto);
				if(true == result){
					return Response.status(HttpStatus.SC_OK).build();
				}else{
					return Response.status(HttpStatus.SC_NO_CONTENT).build();
				}
			}
			return Response.status(HttpStatus.SC_UNAUTHORIZED).build();
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("exception inside addUserStoryRecord method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
	
	@PUT
	@Path("/update")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response updateUserStoryRecord(UserStoryDetailsDto userStoryDetailsDto, @Context HttpServletRequest request) {
		log.info("inside updateUserStoryRecord method value for user story details :: "+userStoryDetailsDto);
		try{
			HttpSession session = request.getSession(false);
			UserStoryDetailsDao userStoryDetailsDao = UserStoryDetailsDao.getInstatnce();
			boolean result = false;
			if(null != session) {
				result = userStoryDetailsDao.updateUserStoryRecord(userStoryDetailsDto);
				if(true == result){
					return Response.status(HttpStatus.SC_OK).build();
				}else{
					return Response.status(HttpStatus.SC_NO_CONTENT).build();
				}
			}
			return Response.status(HttpStatus.SC_UNAUTHORIZED).build();
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("exception inside updateUserStoryRecord method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
	@GET
	@Path("/getTestListForUserStrory")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getTestRecordForUserStory(@Context HttpServletRequest request) {
		log.info("inside getTestRecordForUserStory method to get test records for task");
		JSONArray jsonArray = new JSONArray();
		JSONObject json = null;
		TestDetailsDto testDetailsDto = null;
		String userStroryId=request.getParameter("us_id");
		try{
			TestDetailsDao testDetailsDao = TestDetailsDao.getInstatnce();
			List<TestDetailsDto> testRecordList = testDetailsDao.getTestForTask(userStroryId,"user_story_id");
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
			log.error("exception inside getTestRecordForUserStory method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
	
	@GET
	@Path("/getBugListForUserStory")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getBugRecordforUserStrory(@Context HttpServletRequest request) {
		log.info("inside getBugRecordforUserStrory method to get bug record");
		JSONArray jsonArray = new JSONArray();
		JSONObject json = null;
		BugDetailsDto bugDetailsDto = null;
		String us_id=request.getParameter("us_id");
		try{
			BugDetailsDao bugDetailsDao = BugDetailsDao.getInstatnce();
			List<BugDetailsDto> bugRecordList = bugDetailsDao.getBugRecordList(us_id,"user_story_id");
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
			log.error("exception inside getBugRecordforUserStrory method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
	@GET
	@Path("/getTaskListForUserStory")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getTaskListForUserStory(@Context HttpServletRequest request) {
		log.info("inside getTaskListForUserStory method to get task record");
		JSONArray jsonArray = new JSONArray();
		JSONObject json = null;
		TaskDetailsDto taskDetailsDto = null;
		String userStory = request.getParameter("us_id");
		try{
			TaskDetailsDao taskDetailsDao = TaskDetailsDao.getInstatnce();
			List<TaskDetailsDto> taskRecordList = taskDetailsDao.getTaskRecordForUserStory(userStory);
			for (int count = 0; count < taskRecordList.size(); count++) {
				taskDetailsDto = taskRecordList.get(count);
				json = new JSONObject();
				json.put("sprintId", taskDetailsDto.getSprintId());
				/*json.put("sprintName", taskDetailsDto.getSprintName());*/
				json.put("taskId", taskDetailsDto.getTaskId());
				json.put("taskDescription", taskDetailsDto.getTaskDescription());
				json.put("taskStatus", taskDetailsDto.getTaskStatus());
				json.put("startDate", taskDetailsDto.getTaskStartDate());
				json.put("endDate", taskDetailsDto.getTaskEndDate());
				json.put("taskDuration", taskDetailsDto.getTaskDuration());
				json.put("userStoryId", taskDetailsDto.getUserStoryId());
				jsonArray.put(json);
			}
			return Response.status(HttpStatus.SC_OK).entity(jsonArray).build();
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("exception inside getTaskListForUserStory method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
	
}

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
import com.gs.service.dto.BugDetailsDto;
import com.gs.service.dto.TaskDetailsDto;
import com.gs.service.dto.TestDetailsDto;

@Path("/task")
public class ManageTaskServiceImpl {
	private static Logger log = Logger.getLogger(ManageTaskServiceImpl.class);
	
	@GET
	@Path("/get")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getTaskRecord(@Context HttpServletRequest request) {
		log.info("inside getTaskRecord method to get task record");
		JSONArray jsonArray = new JSONArray();
		JSONObject json = null;
		TaskDetailsDto taskDetailsDto = null;
		try{
			TaskDetailsDao taskDetailsDao = TaskDetailsDao.getInstatnce();
			List<TaskDetailsDto> taskRecordList = taskDetailsDao.getTaskRecord();
			for (int count = 0; count < taskRecordList.size(); count++) {
				taskDetailsDto = taskRecordList.get(count);
				json = new JSONObject();
				json.put("sprintId", taskDetailsDto.getSprintId());
				json.put("sprintName", taskDetailsDto.getSprintName());
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
			log.error("exception inside getTaskRecord method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
	
	@POST
	@Path("/addTask")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response addTaskRecord(TaskDetailsDto taskDetailsDto, @Context HttpServletRequest request) {
		log.info("inside addTaskRecord method value for task details :: "+taskDetailsDto);
		try{
			HttpSession session = request.getSession(false);
			TaskDetailsDao taskDetailsDao = TaskDetailsDao.getInstatnce();
			boolean result = false;
			if(null != session) {
				result = taskDetailsDao.addTaskRecord(taskDetailsDto);
				if(true == result){
					return Response.status(HttpStatus.SC_OK).build();
				}else{
					return Response.status(HttpStatus.SC_NO_CONTENT).build();
				}
			}
			return Response.status(HttpStatus.SC_UNAUTHORIZED).build();
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("exception inside addTaskRecord method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
	
	@PUT
	@Path("/update")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response updateTaskRecord(TaskDetailsDto taskDetailsDto, @Context HttpServletRequest request) {
		log.info("inside updateTaskRecord method value for task details :: "+taskDetailsDto);
		try{
			HttpSession session = request.getSession(false);
			TaskDetailsDao taskDetailsDao = TaskDetailsDao.getInstatnce();
			boolean result = false;
			if(null != session) {
				result = taskDetailsDao.updateTaskRecord(taskDetailsDto);
				if(true == result){
					return Response.status(HttpStatus.SC_OK).build();
				}else{
					return Response.status(HttpStatus.SC_NO_CONTENT).build();
				}
			}
			return Response.status(HttpStatus.SC_UNAUTHORIZED).build();
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("exception inside updateTaskRecord method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}

	@GET
	@Path("/getTestListForTask")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getTestRecordForTask(@Context HttpServletRequest request) {
		log.info("inside getTestRecordForTask method to get test records for task");
		JSONArray jsonArray = new JSONArray();
		JSONObject json = null;
		TestDetailsDto testDetailsDto = null;
		String taskId=request.getParameter("taskId");
		try{
			TestDetailsDao testDetailsDao = TestDetailsDao.getInstatnce();
			List<TestDetailsDto> testRecordList = testDetailsDao.getTestForTask(taskId,"task_id");
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
			log.error("exception inside getTestRecordForTask method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
	
	@GET
	@Path("/getBugListForTask")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getBugRecordforTask(@Context HttpServletRequest request) {
		log.info("inside getBugRecordforTask method to get bug record");
		JSONArray jsonArray = new JSONArray();
		JSONObject json = null;
		BugDetailsDto bugDetailsDto = null;
		String taskId=request.getParameter("task_id");
		try{
			BugDetailsDao bugDetailsDao = BugDetailsDao.getInstatnce();
			List<BugDetailsDto> bugRecordList = bugDetailsDao.getBugRecordList(taskId,"task_id");
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
			log.error("exception inside getBugRecordforTask method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
}

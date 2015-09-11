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
import com.gs.service.dao.ReleaseDetailsDao;
import com.gs.service.dao.SprintDetailsDao;
import com.gs.service.dao.TaskDetailsDao;
import com.gs.service.dao.TestDetailsDao;
import com.gs.service.dao.UserDetailsDao;
import com.gs.service.dao.UserStoryDetailsDao;
import com.gs.service.dto.BugDetailsDto;
import com.gs.service.dto.ReleaseDetailsDto;
import com.gs.service.dto.SprintDetailsDto;
import com.gs.service.dto.TaskDetailsDto;
import com.gs.service.dto.TestDetailsDto;
import com.gs.service.dto.UserDetailsDto;
import com.gs.service.dto.UserStoryDetailsDto;

@Path("/common")
public class ManageCommonServiceImpl {
	private static Logger log = Logger.getLogger(ManageCommonServiceImpl.class);
	
	@GET
	@Path("/releaseRecordForDropDown")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getReleaseRecordForDropDown(@Context HttpServletRequest request) {
		log.info("inside getReleaseRecordForDropDown method for release drop down");
		try{
			HttpSession session = request.getSession(false);
			ReleaseDetailsDao releaseDetailsDao = ReleaseDetailsDao.getInstatnce();
			ReleaseDetailsDto releaseDetailsDto = null;
			JSONArray jsonArray = new JSONArray();
			JSONObject json = null;
			if(null != session) {
				List<ReleaseDetailsDto> relaeseRecordForDropDown = releaseDetailsDao.getReleaseRecordForDropDown();
				for (int count = 0; count < relaeseRecordForDropDown.size(); count++) {
					releaseDetailsDto = relaeseRecordForDropDown.get(count);
					json = new JSONObject();
					json.put("releaseId", releaseDetailsDto.getReleaseId());
					json.put("releaseName", releaseDetailsDto.getReleaseName());
					jsonArray.put(json);
				}
				return Response.status(HttpStatus.SC_OK).entity(jsonArray).build();
			}
			return Response.status(HttpStatus.SC_UNAUTHORIZED).build();
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("exception inside getReleaseRecordForDropDown method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
	
	@POST
	@Path("/sprintRecordForDropDownForSpecificRelease")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response getSprintRecordForDropDownForSpecificRelease(SprintDetailsDto sprintDetailsDto, @Context HttpServletRequest request) {
		log.info("inside getSprintRecordForDropDownForSpecificRelease method for release drop down");
		try{
			HttpSession session = request.getSession(false);
			SprintDetailsDao sprintDetailsDao = SprintDetailsDao.getInstatnce();
			SprintDetailsDto sprintDetailsDtoFromDb = null;
			JSONArray jsonArray = new JSONArray();
			JSONObject json = null;
			if(null != session) {
				List<SprintDetailsDto> sprintRecordForDropDown = sprintDetailsDao.getSprintRecordForDropDownForSpecificRelease(sprintDetailsDto);
				for (int count = 0; count < sprintRecordForDropDown.size(); count++) {
					sprintDetailsDtoFromDb = sprintRecordForDropDown.get(count);
					json = new JSONObject();
					json.put("sprintId", sprintDetailsDtoFromDb.getSprintId());
					json.put("sprintName", sprintDetailsDtoFromDb.getSprintName());
					jsonArray.put(json);
				}
				return Response.status(HttpStatus.SC_OK).entity(jsonArray).build();
			}
			return Response.status(HttpStatus.SC_UNAUTHORIZED).build();
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("exception inside getReleaseRecordForDropDownForSpecificRelease method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
	
	@GET
	@Path("/sprintRecordForDropDown")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getSprintRecordForDropDown(@Context HttpServletRequest request) {
		log.info("inside getSprintRecordForDropDown method for release drop down");
		try{
			HttpSession session = request.getSession(false);
			SprintDetailsDao sprintDetailsDao = SprintDetailsDao.getInstatnce();
			SprintDetailsDto sprintDetailsDtoFromDb = null;
			JSONArray jsonArray = new JSONArray();
			JSONObject json = null;
			if(null != session) {
				List<SprintDetailsDto> sprintRecordForDropDown = sprintDetailsDao.getSprintRecordForDropDown();
				for (int count = 0; count < sprintRecordForDropDown.size(); count++) {
					sprintDetailsDtoFromDb = sprintRecordForDropDown.get(count);
					json = new JSONObject();
					json.put("sprintId", sprintDetailsDtoFromDb.getSprintId());
					json.put("sprintName", sprintDetailsDtoFromDb.getSprintName());
					jsonArray.put(json);
				}
				return Response.status(HttpStatus.SC_OK).entity(jsonArray).build();
			}
			return Response.status(HttpStatus.SC_UNAUTHORIZED).build();
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("exception inside getSprintRecordForDropDown method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
	@GET
	@Path("/userStorytRecordForDropDown")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getUserStoryRecordForDropDown(@Context HttpServletRequest request) {
		log.info("inside getUserStoryRecordForDropDown method for release drop down");
		try{
			HttpSession session = request.getSession(false);
			UserStoryDetailsDao userStoryDetailsDao = UserStoryDetailsDao.getInstatnce();
			UserStoryDetailsDto userStoryDetailsDto = null;
			JSONArray jsonArray = new JSONArray();
			JSONObject json = null;
			if(null != session) {
				List<UserStoryDetailsDto> userStoryRecordForDropDown = userStoryDetailsDao.getUserStoryRecordForDropDown();
				for (int count = 0; count < userStoryRecordForDropDown.size(); count++) {
					userStoryDetailsDto = userStoryRecordForDropDown.get(count);
					json = new JSONObject();
					json.put("userStoryId", userStoryDetailsDto.getUserStoryId());
					json.put("userStoryName", userStoryDetailsDto.getUserStoryName());
					jsonArray.put(json);
				}
				return Response.status(HttpStatus.SC_OK).entity(jsonArray).build();
			}
			return Response.status(HttpStatus.SC_UNAUTHORIZED).build();
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("exception inside getUserStoryRecordForDropDown method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
	/*@GET
	@Path("/userStorytRecordForDropDown")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getTaskRecordForDropDown(@Context HttpServletRequest request) {
		log.info("inside getUserStoryRecordForDropDown method for release drop down");
		try{
			HttpSession session = request.getSession(false);
			UserStoryDetailsDao userStoryDetailsDao = UserStoryDetailsDao.getInstatnce();
			UserStoryDetailsDto userStoryDetailsDto = null;
			JSONArray jsonArray = new JSONArray();
			JSONObject json = null;
			if(null != session) {
				List<UserStoryDetailsDto> userStoryRecordForDropDown = userStoryDetailsDao.getUserStoryRecordForDropDown();
				for (int count = 0; count < userStoryRecordForDropDown.size(); count++) {
					userStoryDetailsDto = userStoryRecordForDropDown.get(count);
					json = new JSONObject();
					json.put("userStoryId", userStoryDetailsDto.getUserStoryId());
					json.put("userStoryName", userStoryDetailsDto.getUserStoryName());
					jsonArray.put(json);
				}
				return Response.status(HttpStatus.SC_OK).entity(jsonArray).build();
			}
			return Response.status(HttpStatus.SC_UNAUTHORIZED).build();
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("exception inside getUserStoryRecordForDropDown method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}*/
	
	@POST
	@Path("/taskRecordForDropDownForSpecificSprint")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response getTaskRecordForDropDownForSpecificSprint(TaskDetailsDto taskDetailsDto, @Context HttpServletRequest request) {
		log.info("inside getTaskRecordForDropDownForSpecificSprint method for task drop down");
		try{
			HttpSession session = request.getSession(false);
			TaskDetailsDao taskDetailsDao = TaskDetailsDao.getInstatnce();
			TaskDetailsDto taskDetailsDtoFromDb = null;
			JSONArray jsonArray = new JSONArray();
			JSONObject json = null;
			if(null != session) {
				List<TaskDetailsDto> taskRecordForDropDown = taskDetailsDao.getTaskRecordForDropDownForSpecificSprint(taskDetailsDto);
				for (int count = 0; count < taskRecordForDropDown.size(); count++) {
					taskDetailsDtoFromDb = taskRecordForDropDown.get(count);
					json = new JSONObject();
					json.put("taskId", taskDetailsDtoFromDb.getTaskId());
					json.put("taskDescription", taskDetailsDtoFromDb.getTaskDescription());
					jsonArray.put(json);
				}
				return Response.status(HttpStatus.SC_OK).entity(jsonArray).build();
			}
			return Response.status(HttpStatus.SC_UNAUTHORIZED).build();
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("exception inside getTaskRecordForDropDownForSpecificSprint method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
	
	@POST
	@Path("/userStoryRecordForDropDownForSpecificSprint")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response getUserStoryRecordForDropDownForSpecificSprint(UserStoryDetailsDto userStoryDetailsDto, @Context HttpServletRequest request) {
		log.info("inside getUserStoryRecordForDropDownForSpecificSprint method for user story drop down ******** "+userStoryDetailsDto);
		try{
			HttpSession session = request.getSession(false);
			UserStoryDetailsDao userStoryDetailsDao = UserStoryDetailsDao.getInstatnce();
			UserStoryDetailsDto userStoryDetailsDtoFromDb = null;
			JSONArray jsonArray = new JSONArray();
			JSONObject json = null;
			if(null != session) {
				List<UserStoryDetailsDto> userStoryRecordForDropDown = userStoryDetailsDao.getUserStoryRecordForSpecifiedReleaseOrSprint(userStoryDetailsDto);
				for (int count = 0; count < userStoryRecordForDropDown.size(); count++) {
					userStoryDetailsDtoFromDb = userStoryRecordForDropDown.get(count);
					json = new JSONObject();
					json.put("userStoryId", userStoryDetailsDtoFromDb.getUserStoryId());
					json.put("userStoryName", userStoryDetailsDtoFromDb.getUserStoryName());
					jsonArray.put(json);
				}
				return Response.status(HttpStatus.SC_OK).entity(jsonArray).build();
			}
			return Response.status(HttpStatus.SC_UNAUTHORIZED).build();
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("exception inside getUserStoryRecordForDropDownForSpecificSprint method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
	
	@POST
	@Path("/testRecordForDropDownForSpecificSprint")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response getTestRecordForDropDownForSpecificSprint(TestDetailsDto testDetailsDto, @Context HttpServletRequest request) {
		log.info("inside getTestRecordForDropDownForSpecificSprint method for test drop down :: "+testDetailsDto);
		try{
			HttpSession session = request.getSession(false);
			TestDetailsDao testDetailsDao = TestDetailsDao.getInstatnce();
			TestDetailsDto testDetailsDtoFromDb = null;
			JSONArray jsonArray = new JSONArray();
			JSONObject json = null;
			if(null != session) {
				List<TestDetailsDto> testRecordForDropDown = testDetailsDao.getTestRecordForDropDownForSpecificSprint(testDetailsDto);
				for (int count = 0; count < testRecordForDropDown.size(); count++) {
					testDetailsDtoFromDb = testRecordForDropDown.get(count);
					json = new JSONObject();
					json.put("testId", testDetailsDtoFromDb.getTestId());
					json.put("testName", testDetailsDtoFromDb.getTestSummary());
					jsonArray.put(json);
				}
				return Response.status(HttpStatus.SC_OK).entity(jsonArray).build();
			}
			return Response.status(HttpStatus.SC_UNAUTHORIZED).build();
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("exception inside getTestRecordForDropDownForSpecificSprint method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
	
	@POST
	@Path("/bugRecordForDropDownForSpecificSprint")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response getBugRecordForDropDownForSpecificSprint(BugDetailsDto bugDetailsDto, @Context HttpServletRequest request) {
		log.info("inside getBugRecordForDropDownForSpecificSprint method for bug drop down");
		try{
			HttpSession session = request.getSession(false);
			BugDetailsDao bugDetailsDao = BugDetailsDao.getInstatnce();
			BugDetailsDto bugDetailsDtoFromDb = null;
			JSONArray jsonArray = new JSONArray();
			JSONObject json = null;
			if(null != session) {
				List<BugDetailsDto> bugRecordForDropDown = bugDetailsDao.getBugRecordForDropDownForSpecificSprint(bugDetailsDto);
				for (int count = 0; count < bugRecordForDropDown.size(); count++) {
					bugDetailsDtoFromDb = bugRecordForDropDown.get(count);
					json = new JSONObject();
					json.put("bugId", bugDetailsDtoFromDb.getBugId());
					json.put("bugTitle", bugDetailsDtoFromDb.getBugTitle());
					jsonArray.put(json);
				}
				return Response.status(HttpStatus.SC_OK).entity(jsonArray).build();
			}
			return Response.status(HttpStatus.SC_UNAUTHORIZED).build();
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("exception inside getBugRecordForDropDownForSpecificSprint method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
	
	@GET
	@Path("/getUserRecordForDropdown")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getUserRecordForDropDown(@Context HttpServletRequest request) {
		log.info("inside getUserRecordForDropDown method for release drop down");
		try{
			HttpSession session = request.getSession(false);
			UserDetailsDao userDetailsDao = UserDetailsDao.getInstatnce();
			UserDetailsDto userDetailsDtoFromDb = null;
			JSONArray jsonArray = new JSONArray();
			JSONObject json = null;
			if(null != session) {
				List<UserDetailsDto> userRecordForDropDown = userDetailsDao.getAllUserRecord();
				for (int count = 0; count < userRecordForDropDown.size(); count++) {
					userDetailsDtoFromDb = userRecordForDropDown.get(count);
					json = new JSONObject();
					json.put("userId", userDetailsDtoFromDb.getUserId());
					json.put("name", userDetailsDtoFromDb.getName());
					jsonArray.put(json);
				}
				return Response.status(HttpStatus.SC_OK).entity(jsonArray).build();
			}
			return Response.status(HttpStatus.SC_UNAUTHORIZED).build();
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("exception inside getUserRecordForDropDown method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
}

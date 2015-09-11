package com.gs.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.http.HttpStatus;
import org.apache.log4j.Logger;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONObject;

import com.gs.service.dao.ProjectDetailsDao;
import com.gs.service.dto.ProjectDetailsDto;

@Path("/projects")
public class ManageProjectServiceImpl {
	private static Logger log = Logger.getLogger(ManageProjectServiceImpl.class);
	
	@GET
	@Path("/getProjects")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllProjectRecord(@Context HttpServletRequest request) {
		log.info("inside getAllProjectRecord method");
		try{
			HttpSession session = request.getSession(false);
			JSONArray jsonArray = new JSONArray();
			JSONObject json = null;
			if(null != session) {
				ProjectDetailsDao projectDetailsDao = ProjectDetailsDao.getInstatnce();
				ProjectDetailsDto projectDetailsDto = null;
				List<ProjectDetailsDto> projectRecordList = projectDetailsDao.getAllProjectRecord();
				for (int count = 0; count < projectRecordList.size(); count++) {
					projectDetailsDto = projectRecordList.get(count);
					json = new JSONObject();
					json.put("projectId", projectDetailsDto.getProjectId());
					json.put("projectName", projectDetailsDto.getProjectName());
					jsonArray.put(json);
				}
				return Response.status(HttpStatus.SC_OK).entity(jsonArray).build();
			}
			return Response.status(HttpStatus.SC_UNAUTHORIZED).build();
		}catch(Exception ex){
			log.error("exception inside getAllProjectRecord method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
}

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

import com.gs.service.dao.ReleaseDetailsDao;
import com.gs.service.dto.ReleaseDetailsDto;

@Path("/release")
public class ManageReleaseServiceImpl {
	private static Logger log = Logger.getLogger(ManageReleaseServiceImpl.class);
	
	@GET
	@Path("/get")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getReleaseRecord(@Context HttpServletRequest request) {
		log.info("inside getReleaseRecord method to get release records");
		JSONArray jsonArray = new JSONArray();
		JSONObject json = null;
		ReleaseDetailsDto releaseDetailsDto = null;
		try{
			ReleaseDetailsDao releaseDetailsDao = ReleaseDetailsDao.getInstatnce();
			List<ReleaseDetailsDto> relaeseRecordList = releaseDetailsDao.getReleaseRecord();
			for (int count = 0; count < relaeseRecordList.size(); count++) {
				releaseDetailsDto = relaeseRecordList.get(count);
				json = new JSONObject();
				json.put("releaseId", releaseDetailsDto.getReleaseId());
				json.put("releaseName", releaseDetailsDto.getReleaseName());
				json.put("startDate", releaseDetailsDto.getStartDate());
				json.put("endDate", releaseDetailsDto.getEndDate());
				json.put("duration", releaseDetailsDto.getDuration());
				json.put("status", releaseDetailsDto.getStatus());
				json.put("content", releaseDetailsDto.getContent());
				jsonArray.put(json);
			}
			return Response.status(HttpStatus.SC_OK).entity(jsonArray).build();
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("exception inside addReleaseRecord method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
	
	@POST
	@Path("/add")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response addReleaseRecord(ReleaseDetailsDto releaseDetailsDto, @Context HttpServletRequest request) {
		log.info("inside addReleaseRecord method value for release details :: "+releaseDetailsDto);
		try{
			HttpSession session = request.getSession(false);
			ReleaseDetailsDao releaseDetailsDao = ReleaseDetailsDao.getInstatnce();
			String result = null;
			if(null != session) {
				result = releaseDetailsDao.addReleaseRecord(releaseDetailsDto);
				if(result.equalsIgnoreCase("added")){
					return Response.status(HttpStatus.SC_OK).build();
				}else if(result.equalsIgnoreCase("already_exist")){
					return Response.status(HttpStatus.SC_PARTIAL_CONTENT).build();
				}else{
					return Response.status(HttpStatus.SC_NO_CONTENT).build();
				}
			}
			return Response.status(HttpStatus.SC_UNAUTHORIZED).build();
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("exception inside addReleaseRecord method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
	
	@PUT
	@Path("/update")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response updateReleaseRecord(ReleaseDetailsDto releaseDetailsDto, @Context HttpServletRequest request) {
		log.info("inside updateReleaseRecord method value for release details :: "+releaseDetailsDto);
		try{
			HttpSession session = request.getSession(false);
			ReleaseDetailsDao releaseDetailsDao = ReleaseDetailsDao.getInstatnce();
			boolean result = false;
			if(null != session) {
				result = releaseDetailsDao.updateReleaseRecord(releaseDetailsDto);
				if(true == result){
					return Response.status(HttpStatus.SC_OK).build();
				}else{
					return Response.status(HttpStatus.SC_NO_CONTENT).build();
				}
			}
			return Response.status(HttpStatus.SC_UNAUTHORIZED).build();
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("exception inside updateReleaseRecord method :: ",ex);
			return Response.status(HttpStatus.SC_SERVICE_UNAVAILABLE).entity("Service unavailable").build();
		}
	}
}

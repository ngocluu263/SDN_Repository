package com.gs.service.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import com.gs.service.dto.SprintDetailsDto;
import com.gs.service.dto.UserStoryDetailsDto;
import com.gs.service.util.CiddProperty;
import com.gs.service.util.DbUtil;

public class UserStoryDetailsDao {
	private static Logger log = Logger.getLogger(UserStoryDetailsDao.class);
	private static UserStoryDetailsDao userStoryDetailsDao;
	
	public static UserStoryDetailsDao getInstatnce(){
		try {
			if (null == userStoryDetailsDao) {
				synchronized (UserStoryDetailsDao.class) {
					if (null == userStoryDetailsDao) {
						userStoryDetailsDao = new UserStoryDetailsDao();
					} 
				}
			}
		}catch (Exception ex) {
			ex.printStackTrace();
		}
		return userStoryDetailsDao;
	}
	
	public List<UserStoryDetailsDto> getUserStoryRecord(){
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		UserStoryDetailsDto userStoryDetailsDto = null;
		List<UserStoryDetailsDto> userStoryRecord = new ArrayList<UserStoryDetailsDto>();
		try {
			log.info("inside getUserStoryRecord method to get user story record");
			String getUserStoryRecord = "SELECT us.user_story_id, us.user_story_name, us.user_story_status, " +
				"us.user_story_as_a, us.user_story_description, us.user_story_sprint_id, " +
				"s.sprint_name, us.user_story_release_id, rm.release_name " +
				"FROM "+CiddProperty.getProperty("SCHEMA_NAME")+".user_story us " +
				"JOIN "+CiddProperty.getProperty("SCHEMA_NAME")+".sprint s " +
				"ON us.user_story_sprint_id = s.sprint_id " +
				"JOIN "+CiddProperty.getProperty("SCHEMA_NAME")+".release_master rm " +
				"ON us.user_story_release_id = rm.release_id;";
			con = DbUtil.getConnection();
			pstmt = con.prepareStatement(getUserStoryRecord);
			log.info("inside getUserStoryRecord method query to get user story record :: "+pstmt);
			rs = pstmt.executeQuery();
			while(rs.next()){
				userStoryDetailsDto = new UserStoryDetailsDto();
				userStoryDetailsDto.setUserStoryId(rs.getString("user_story_id"));
				userStoryDetailsDto.setUserStoryName(rs.getString("user_story_name"));
				userStoryDetailsDto.setUserStoryStatus(rs.getString("user_story_status"));
				userStoryDetailsDto.setUserStoryAsA(rs.getString("user_story_as_a"));
				userStoryDetailsDto.setUserStoryDescription(rs.getString("user_story_description"));
				userStoryDetailsDto.setUserStorySprintId(rs.getString("user_story_sprint_id"));
				userStoryDetailsDto.setUserStorySprintName(rs.getString("sprint_name"));
				userStoryDetailsDto.setUserStoryReleaseId(rs.getString("user_story_release_id"));
				userStoryDetailsDto.setUserStoryReleaseName(rs.getString("release_name"));
				userStoryRecord.add(userStoryDetailsDto);
			}
		}catch(Exception ex) {
			log.error("exception inside getUserStoryRecord method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		return userStoryRecord;
	}
	
	public List<UserStoryDetailsDto> getUserStoryRecordForSpecifiedReleaseOrSprint(UserStoryDetailsDto userStoryDetailsDto){
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		List<UserStoryDetailsDto> userStoryRecord = new ArrayList<UserStoryDetailsDto>();
		try {
			log.info("inside getUserStoryRecordForSpecifiedReleaseOrSprint method to get user story record");
			String getUserStoryRecord = null;
			con = DbUtil.getConnection();
			if(userStoryDetailsDto.getUserStoryReleaseId() != null && userStoryDetailsDto.getUserStorySprintId() == null){
				getUserStoryRecord = "SELECT us.user_story_id, us.user_story_name, us.user_story_status, " +
					"us.user_story_as_a, us.user_story_description, us.user_story_sprint_id, " +
					"s.sprint_name, us.user_story_release_id, rm.release_name " +
					"FROM "+CiddProperty.getProperty("SCHEMA_NAME")+".user_story us " +
					"JOIN "+CiddProperty.getProperty("SCHEMA_NAME")+".sprint s " +
					"ON us.user_story_sprint_id = s.sprint_id " +
					"JOIN "+CiddProperty.getProperty("SCHEMA_NAME")+".release_master rm " +
					"ON us.user_story_release_id = rm.release_id WHERE us.user_story_release_id = ?;";
				pstmt = con.prepareStatement(getUserStoryRecord);
				pstmt.setString(1, userStoryDetailsDto.getUserStoryReleaseId());
			}else if(userStoryDetailsDto.getUserStoryReleaseId() == null && userStoryDetailsDto.getUserStorySprintId() != null){
				getUserStoryRecord = "SELECT us.user_story_id, us.user_story_name, us.user_story_status, " +
					"us.user_story_as_a, us.user_story_description, us.user_story_sprint_id, " +
					"s.sprint_name, us.user_story_release_id, rm.release_name " +
					"FROM "+CiddProperty.getProperty("SCHEMA_NAME")+".user_story us " +
					"JOIN "+CiddProperty.getProperty("SCHEMA_NAME")+".sprint s " +
					"ON us.user_story_sprint_id = s.sprint_id " +
					"JOIN "+CiddProperty.getProperty("SCHEMA_NAME")+".release_master rm " +
					"ON us.user_story_release_id = rm.release_id WHERE us.user_story_sprint_id = ?;";
				pstmt = con.prepareStatement(getUserStoryRecord);
				pstmt.setString(1, userStoryDetailsDto.getUserStorySprintId());
			}
			log.info("inside getUserStoryRecordForSpecifiedReleaseOrSprint method query to get user story record :: "+pstmt);
			rs = pstmt.executeQuery();
			while(rs.next()){
				userStoryDetailsDto = new UserStoryDetailsDto();
				userStoryDetailsDto.setUserStoryId(rs.getString("user_story_id"));
				userStoryDetailsDto.setUserStoryName(rs.getString("user_story_name"));
				userStoryDetailsDto.setUserStoryStatus(rs.getString("user_story_status"));
				userStoryDetailsDto.setUserStoryAsA(rs.getString("user_story_as_a"));
				userStoryDetailsDto.setUserStoryDescription(rs.getString("user_story_description"));
				userStoryDetailsDto.setUserStorySprintId(rs.getString("user_story_sprint_id"));
				userStoryDetailsDto.setUserStorySprintName(rs.getString("sprint_name"));
				userStoryDetailsDto.setUserStoryReleaseId(rs.getString("user_story_release_id"));
				userStoryDetailsDto.setUserStoryReleaseName(rs.getString("release_name"));
				userStoryRecord.add(userStoryDetailsDto);
			}
		}catch(Exception ex) {
			log.error("exception inside getUserStoryRecordForSpecifiedReleaseOrSprint method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		return userStoryRecord;
	}
	
	public boolean addUserStoryRecord(UserStoryDetailsDto userStoryDetailsDto){
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		boolean status = false;
		try {
			log.info("inside addUserStoryRecord method value for user story record :: "+userStoryDetailsDto);
			String addUserStoryRecord = "INSERT " +
				"INTO "+CiddProperty.getProperty("SCHEMA_NAME")+".user_story " +
				"(user_story_name, user_story_status, user_story_as_a, " +
				"user_story_description, user_story_release_id, user_story_sprint_id) " +
				"VALUES (?, ?, ?, ?, ?, ?);";
			con = DbUtil.getConnection();
			pstmt = con.prepareStatement(addUserStoryRecord);
			pstmt.setString(1, userStoryDetailsDto.getUserStoryName());
			pstmt.setString(2, userStoryDetailsDto.getUserStoryStatus());
			pstmt.setString(3, userStoryDetailsDto.getUserStoryAsA());
			pstmt.setString(4, userStoryDetailsDto.getUserStoryDescription());
			pstmt.setString(5, userStoryDetailsDto.getUserStoryReleaseId());
			pstmt.setString(6, userStoryDetailsDto.getUserStorySprintId());
			log.info("inside addUserStoryRecord method query to add user story record :: "+pstmt);
			int result = pstmt.executeUpdate();
			log.info("inside addUserStoryRecord method value of result :: "+result);
			if(result > 0)
				status = true;
		}catch(Exception ex) {
			log.error("exception inside addUserStoryRecord method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		return status;
	}
	
	public boolean updateUserStoryRecord(UserStoryDetailsDto userStoryDetailsDto){
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		boolean status = false;
		try {
			log.info("inside updateUserStoryRecord method value for user story record :: "+userStoryDetailsDto);
			String updateUserStoryRecord = "UPDATE " +
				""+CiddProperty.getProperty("SCHEMA_NAME")+".user_story " +
				"SET user_story_name = ?, user_story_status = ?, user_story_as_a = ?, " +
				"user_story_description = ?, user_story_release_id = ?, user_story_sprint_id = ? " +
				"WHERE user_story_id = ?;";
			con = DbUtil.getConnection();
			pstmt = con.prepareStatement(updateUserStoryRecord);
			pstmt.setString(1, userStoryDetailsDto.getUserStoryName());
			pstmt.setString(2, userStoryDetailsDto.getUserStoryStatus());
			pstmt.setString(3, userStoryDetailsDto.getUserStoryAsA());
			pstmt.setString(4, userStoryDetailsDto.getUserStoryDescription());
			pstmt.setString(5, userStoryDetailsDto.getUserStoryReleaseId());
			pstmt.setString(6, userStoryDetailsDto.getUserStorySprintId());
			pstmt.setString(7, userStoryDetailsDto.getUserStoryId());
			log.info("inside updateUserStoryRecord method query to update user story record :: "+pstmt);
			int result = pstmt.executeUpdate();
			log.info("inside updateUserStoryRecord method value of result :: "+result);
			if(result > 0)
				status = true;
		}catch(Exception ex) {
			log.error("exception inside updateUserStoryRecord method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		return status;
	}
	
	public List<UserStoryDetailsDto> getUserStoryRecordForDropDown(){
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		UserStoryDetailsDto userStoryDetailsDto = null;
		List<UserStoryDetailsDto> userStoryRecordForDropDown = new ArrayList<UserStoryDetailsDto>();
		try {
			log.info("inside getUserStoryRecordForDropDown method to get user story record for drop down");
			String getUserStoryRecordForDropDown = "SELECT * " +
				"FROM "+CiddProperty.getProperty("SCHEMA_NAME")+".user_story;";
			con = DbUtil.getConnection();
			pstmt = con.prepareStatement(getUserStoryRecordForDropDown);
			log.info("inside getUserStoryRecordForDropDown method query to get user story record for drop down :: "+pstmt);
			rs = pstmt.executeQuery();
			while(rs.next()){
				userStoryDetailsDto = new UserStoryDetailsDto();
				userStoryDetailsDto.setUserStoryId(rs.getString("user_story_id"));
				userStoryDetailsDto.setUserStoryName(rs.getString("user_story_name"));
				userStoryRecordForDropDown.add(userStoryDetailsDto);
			}
		}catch(Exception ex) {
			log.error("exception inside getUserStoryRecordForDropDown method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		return userStoryRecordForDropDown;
	}
}
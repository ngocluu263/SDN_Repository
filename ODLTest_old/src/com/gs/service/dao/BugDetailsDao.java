package com.gs.service.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import com.gs.service.dto.BugDetailsDto;
import com.gs.service.dto.ReleaseDetailsDto;
import com.gs.service.util.CiddProperty;
import com.gs.service.util.DbUtil;

public class BugDetailsDao {
	private static Logger log = Logger.getLogger(BugDetailsDao.class);
	private static BugDetailsDao bugDetailsDao;
	
	public static BugDetailsDao getInstatnce(){
		try {
			if (null == bugDetailsDao) {
				synchronized (BugDetailsDao.class) {
					if (null == bugDetailsDao) {
						bugDetailsDao = new BugDetailsDao();
					} 
				}
			}
		}catch (Exception ex) {
			ex.printStackTrace();
		}
		return bugDetailsDao;
	}
	
	public List<BugDetailsDto> getBugRecord(){
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		BugDetailsDto bugDetailsDto = null;
		List<BugDetailsDto> bugRecord = new ArrayList<BugDetailsDto>();
		try {
			log.info("inside getBugkRecord method to get bug record");
			String getBugRecord = "SELECT bug_id, " +
				"IF(sprint_id IS NULL, 'N/A', sprint_id) sprint_id, " +
				"IF(sprint_name IS NULL, 'N/A', sprint_name) sprint_name, " +
				"IF(user_story_id IS NULL, 'N/A', user_story_id) user_story_id, " +
				"IF(user_story_name IS NULL, 'N/A', user_story_name) user_story_name, " +
				"IF(task_id IS NULL, 'N/A', task_id) task_id, " +
				"IF(task_description IS NULL, 'N/A', task_description) task_description, " +
				"IF(test_id IS NULL, 'N/A', test_id) test_id, " +
				"IF(test_summary IS NULL, 'N/A', test_summary) test_summary, " +
				"assigned_to, u.name, bug_title, bug_description, bug_severity, bug_status " +
				"FROM "+CiddProperty.getProperty("SCHEMA_NAME")+".bug " +
				"JOIN "+CiddProperty.getProperty("SCHEMA_NAME")+".user u ON assigned_to = user_id;";
			con = DbUtil.getConnection();
			pstmt = con.prepareStatement(getBugRecord);
			log.info("inside getBugRecord method query to get bug record :: "+pstmt);
			rs = pstmt.executeQuery();
			while(rs.next()){
				bugDetailsDto = new BugDetailsDto();
				bugDetailsDto.setSprintId(rs.getString("sprint_id"));
				bugDetailsDto.setSprintName(rs.getString("sprint_name"));
				bugDetailsDto.setUserStoryId(rs.getString("user_story_id"));
				bugDetailsDto.setUserStoryName(rs.getString("user_story_name"));
				bugDetailsDto.setTaskId(rs.getString("task_id"));
				bugDetailsDto.setTaskDescription(rs.getString("task_description"));
				bugDetailsDto.setTestId(rs.getString("test_id"));
				bugDetailsDto.setTestSummary(rs.getString("test_summary"));
				bugDetailsDto.setAssignedTo(rs.getString("assigned_to"));
				bugDetailsDto.setAssignedName(rs.getString("name"));
				bugDetailsDto.setBugId(rs.getString("bug_id"));
				bugDetailsDto.setBugTitle(rs.getString("bug_title"));
				bugDetailsDto.setBugDescription(rs.getString("bug_description"));
				bugDetailsDto.setBugSeverity(rs.getString("bug_severity"));
				bugDetailsDto.setBugStatus(rs.getString("bug_status"));
				bugRecord.add(bugDetailsDto);
			}
		}catch(Exception ex) {
			log.error("exception inside getBugRecord method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		return bugRecord;
	}
	
	public boolean addBugRecord(BugDetailsDto bugDetailsDto){
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		boolean status = false;
		try {
			log.info("inside addBugRecord method value for bug record :: "+bugDetailsDto);
			String addBugRecord = "INSERT " +
				"INTO "+CiddProperty.getProperty("SCHEMA_NAME")+".bug " +
				"(sprint_id, sprint_name, user_story_id, user_story_name, task_id, task_description, " +
				"test_id, test_summary, assigned_to, bug_title, bug_description, bug_severity, bug_status) " +
				"VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
			con = DbUtil.getConnection();
			pstmt = con.prepareStatement(addBugRecord);
			if(bugDetailsDto.getSprintId().equalsIgnoreCase("null")){
				pstmt.setNull(1, Types.INTEGER);
				pstmt.setNull(2, Types.VARCHAR);	
			}else{
				pstmt.setString(1, bugDetailsDto.getSprintId());
				pstmt.setString(2, bugDetailsDto.getSprintName());
			}
			if(bugDetailsDto.getUserStoryId().equalsIgnoreCase("null")){
				pstmt.setNull(3, Types.INTEGER);
				pstmt.setNull(4, Types.VARCHAR);	
			}else{
				pstmt.setString(3, bugDetailsDto.getUserStoryId());
				pstmt.setString(4, bugDetailsDto.getUserStoryName());
			}
			if(bugDetailsDto.getTaskId().equalsIgnoreCase("null")){
				pstmt.setNull(5, Types.INTEGER);
				pstmt.setNull(6, Types.VARCHAR);	
			}else{
				pstmt.setString(5, bugDetailsDto.getTaskId());
				pstmt.setString(6, bugDetailsDto.getTaskDescription());
			}
			if(bugDetailsDto.getTestId().equalsIgnoreCase("null")){
				pstmt.setNull(7, Types.INTEGER);
				pstmt.setNull(8, Types.VARCHAR);	
			}else{
				pstmt.setString(7, bugDetailsDto.getTestId());
				pstmt.setString(8, bugDetailsDto.getTestSummary());
			}
			pstmt.setString(9, bugDetailsDto.getAssignedTo());
			pstmt.setString(10, bugDetailsDto.getBugTitle());
			pstmt.setString(11, bugDetailsDto.getBugDescription());
			pstmt.setString(12, bugDetailsDto.getBugSeverity());
			pstmt.setString(13, bugDetailsDto.getBugStatus());
			log.info("inside addBugRecord method query to add bug record :: "+pstmt);
			int result = pstmt.executeUpdate();
			log.info("inside addBugRecord method value of result :: "+result);
			if(result > 0)
				status = true;
		}catch(Exception ex) {
			log.error("exception inside addBugRecord method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		return status;
	}
	
	public List<BugDetailsDto> getBugRecordForDropDownForSpecificSprint(BugDetailsDto bugDetailsDto){
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		BugDetailsDto bugDetailsDtoFromDb = null;
		List<BugDetailsDto> bugRecordForDropDown = new ArrayList<BugDetailsDto>();
		try {
			log.info("inside getTestRecordForDropDown method to get bug record for drop down");
			String getBugRecordForDropDown = "SELECT bug_id, bug_title " +
					"FROM "+CiddProperty.getProperty("SCHEMA_NAME")+".bug WHERE sprint_id = ?;";
			con = DbUtil.getConnection();
			pstmt = con.prepareStatement(getBugRecordForDropDown);
			pstmt.setString(1, bugDetailsDto.getSprintId());
			log.info("inside getTestRecordForDropDown method query to get bug record for drop down :: "+pstmt);
			rs = pstmt.executeQuery();
			while(rs.next()){
				bugDetailsDtoFromDb = new BugDetailsDto();
				bugDetailsDtoFromDb.setBugId(rs.getString("bug_id"));
				bugDetailsDtoFromDb.setBugTitle(rs.getString("bug_title"));
				bugRecordForDropDown.add(bugDetailsDtoFromDb);
			}
		}catch(Exception ex) {
			log.error("exception inside getTestRecordForDropDown method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		return bugRecordForDropDown;
	}
	
	public List<BugDetailsDto> getBugRecordList(String columnValue,String columnName){
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		BugDetailsDto bugDetailsDto = null;
		List<BugDetailsDto> bugRecord = new ArrayList<BugDetailsDto>();
		try {
			log.info("inside getBugRecordForTask method to get bug record");
			String getBugRecord = "SELECT bug_id, " +
				"IF(sprint_id IS NULL, 'N/A', sprint_id) sprint_id, " +
				"IF(sprint_name IS NULL, 'N/A', sprint_name) sprint_name, " +
				"IF(user_story_id IS NULL, 'N/A', user_story_id) user_story_id, " +
				"IF(user_story_name IS NULL, 'N/A', user_story_name) user_story_name, " +
				"IF(task_id IS NULL, 'N/A', task_id) task_id, " +
				"IF(task_description IS NULL, 'N/A', task_description) task_description, " +
				"IF(test_id IS NULL, 'N/A', test_id) test_id, " +
				"IF(test_summary IS NULL, 'N/A', test_summary) test_summary, " +
				"assigned_to, u.name, bug_title, bug_description, bug_severity, bug_status " +
				"FROM "+CiddProperty.getProperty("SCHEMA_NAME")+".bug " +
				"JOIN "+CiddProperty.getProperty("SCHEMA_NAME")+".user u ON assigned_to = user_id and "+ columnName+"="+columnValue+";";
			con = DbUtil.getConnection();
			pstmt = con.prepareStatement(getBugRecord);
			log.info("inside getBugRecord method query to get bug record :: "+pstmt);
			rs = pstmt.executeQuery();
			while(rs.next()){
				bugDetailsDto = new BugDetailsDto();
				bugDetailsDto.setSprintId(rs.getString("sprint_id"));
				bugDetailsDto.setSprintName(rs.getString("sprint_name"));
				bugDetailsDto.setUserStoryId(rs.getString("user_story_id"));
				bugDetailsDto.setUserStoryName(rs.getString("user_story_name"));
				bugDetailsDto.setTaskId(rs.getString("task_id"));
				bugDetailsDto.setTaskDescription(rs.getString("task_description"));
				bugDetailsDto.setTestId(rs.getString("test_id"));
				bugDetailsDto.setTestSummary(rs.getString("test_summary"));
				bugDetailsDto.setAssignedTo(rs.getString("assigned_to"));
				bugDetailsDto.setAssignedName(rs.getString("name"));
				bugDetailsDto.setBugId(rs.getString("bug_id"));
				bugDetailsDto.setBugTitle(rs.getString("bug_title"));
				bugDetailsDto.setBugDescription(rs.getString("bug_description"));
				bugDetailsDto.setBugSeverity(rs.getString("bug_severity"));
				bugDetailsDto.setBugStatus(rs.getString("bug_status"));
				bugRecord.add(bugDetailsDto);
			}
		}catch(Exception ex) {
			log.error("exception inside getBugRecordForTask method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		return bugRecord;
	}
	
	public boolean updateBugRecord(BugDetailsDto bugDetailsDto){
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		boolean status = false;
		try {
			log.info("inside updateBugRecord method value for Bug record :: "+bugDetailsDto);
			String updateBugRecord = "UPDATE " +
				""+CiddProperty.getProperty("SCHEMA_NAME")+".bug " +
				"SET sprint_id = ?, sprint_name = ?, user_story_id = ?," +
				" user_story_name = ?, task_id = ?, task_description = ?,test_id=?, test_summary=?, "+
				"assigned_to=?, bug_title=?, bug_description=?, bug_severity=?, bug_status=?  WHERE bug_id = ?;";
			con = DbUtil.getConnection();
			pstmt = con.prepareStatement(updateBugRecord);
			if(bugDetailsDto.getSprintId().equalsIgnoreCase("null")){
				pstmt.setNull(1, Types.INTEGER);
				pstmt.setNull(2, Types.VARCHAR);	
			}else{
				pstmt.setString(1, bugDetailsDto.getSprintId());
				pstmt.setString(2, bugDetailsDto.getSprintName());
			}
			if(bugDetailsDto.getUserStoryId().equalsIgnoreCase("null")){
				pstmt.setNull(3, Types.INTEGER);
				pstmt.setNull(4, Types.VARCHAR);	
			}else{
				pstmt.setString(3, bugDetailsDto.getUserStoryId());
				pstmt.setString(4, bugDetailsDto.getUserStoryName());
			}
			if(bugDetailsDto.getTaskId().equalsIgnoreCase("null")){
				pstmt.setNull(5, Types.INTEGER);
				pstmt.setNull(6, Types.VARCHAR);	
			}else{
				pstmt.setString(5, bugDetailsDto.getTaskId());
				pstmt.setString(6, bugDetailsDto.getTaskDescription());
			}
			if(bugDetailsDto.getTestId().equalsIgnoreCase("null")){
				pstmt.setNull(7, Types.INTEGER);
				pstmt.setNull(8, Types.VARCHAR);	
			}else{
				pstmt.setString(7, bugDetailsDto.getTestId());
				pstmt.setString(8, bugDetailsDto.getTestSummary());
			}
			pstmt.setString(9, bugDetailsDto.getAssignedTo());
			pstmt.setString(10, bugDetailsDto.getBugTitle());
			pstmt.setString(11, bugDetailsDto.getBugDescription());
			pstmt.setString(12, bugDetailsDto.getBugSeverity());
			pstmt.setString(13, bugDetailsDto.getBugStatus());
			pstmt.setString(14, bugDetailsDto.getBugId());
			log.info("inside updateBugRecord method query for update bug record :: "+pstmt);
			int result = pstmt.executeUpdate();
			log.info("inside updateBugRecord method value of result :: "+result);
			if(result > 0)
				status = true;
		}catch(Exception ex) {
			log.error("exception inside updateBugRecord method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		return status;
	}
	
	
	/*public List<BugDetailsDto> getBugRecordForTest(String testId){
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		BugDetailsDto bugDetailsDto = null;
		List<BugDetailsDto> bugRecord = new ArrayList<BugDetailsDto>();
		try {
			log.info("inside getBugRecordForTask method to get bug record");
			String getBugRecord = "SELECT bug_id, " +
				"IF(sprint_id IS NULL, 'N/A', sprint_id) sprint_id, " +
				"IF(sprint_name IS NULL, 'N/A', sprint_name) sprint_name, " +
				"IF(user_story_id IS NULL, 'N/A', user_story_id) user_story_id, " +
				"IF(user_story_name IS NULL, 'N/A', user_story_name) user_story_name, " +
				"IF(task_id IS NULL, 'N/A', task_id) task_id, " +
				"IF(task_description IS NULL, 'N/A', task_description) task_description, " +
				"IF(test_id IS NULL, 'N/A', test_id) test_id, " +
				"IF(test_summary IS NULL, 'N/A', test_summary) test_summary, " +
				"assigned_to, u.name, bug_title, bug_description, bug_severity, bug_status " +
				"FROM "+CiddProperty.getProperty("SCHEMA_NAME")+".bug " +
				"JOIN "+CiddProperty.getProperty("SCHEMA_NAME")+".user u ON assigned_to = user_id and test_id="+testId+";";
			con = DbUtil.getConnection();
			pstmt = con.prepareStatement(getBugRecord);
			log.info("inside getBugRecord method query to get bug record :: "+pstmt);
			rs = pstmt.executeQuery();
			while(rs.next()){
				bugDetailsDto = new BugDetailsDto();
				bugDetailsDto.setSprintId(rs.getString("sprint_id"));
				bugDetailsDto.setSprintName(rs.getString("sprint_name"));
				bugDetailsDto.setUserStoryId(rs.getString("user_story_id"));
				bugDetailsDto.setUserStoryName(rs.getString("user_story_name"));
				bugDetailsDto.setTaskId(rs.getString("task_id"));
				bugDetailsDto.setTaskDescription(rs.getString("task_description"));
				bugDetailsDto.setTestId(rs.getString("test_id"));
				bugDetailsDto.setTestSummary(rs.getString("test_summary"));
				bugDetailsDto.setAssignedTo(rs.getString("assigned_to"));
				bugDetailsDto.setAssignedName(rs.getString("name"));
				bugDetailsDto.setBugId(rs.getString("bug_id"));
				bugDetailsDto.setBugTitle(rs.getString("bug_title"));
				bugDetailsDto.setBugDescription(rs.getString("bug_description"));
				bugDetailsDto.setBugSeverity(rs.getString("bug_severity"));
				bugDetailsDto.setBugStatus(rs.getString("bug_status"));
				bugRecord.add(bugDetailsDto);
			}
		}catch(Exception ex) {
			log.error("exception inside getBugRecordForTask method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		return bugRecord;
	}*/
}

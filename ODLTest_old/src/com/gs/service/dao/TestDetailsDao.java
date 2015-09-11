package com.gs.service.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import com.gs.service.dto.TestDetailsDto;
import com.gs.service.util.CiddProperty;
import com.gs.service.util.DbUtil;

public class TestDetailsDao {
	private static Logger log = Logger.getLogger(TestDetailsDao.class);
	private static TestDetailsDao testDetailsDao;
	
	public static TestDetailsDao getInstatnce(){
		try {
			if (null == testDetailsDao) {
				synchronized (TestDetailsDao.class) {
					if (null == testDetailsDao) {
						testDetailsDao = new TestDetailsDao();
					} 
				}
			}
		}catch (Exception ex) {
			ex.printStackTrace();
		}
		return testDetailsDao;
	}
	
	public List<TestDetailsDto> getTestRecord(){
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		TestDetailsDto testDetailsDto = null;
		List<TestDetailsDto> testRecord = new ArrayList<TestDetailsDto>();
		try {
			log.info("inside getTestRecord method to get test record");
			String getTestRecord = "SELECT test_id, IF(sprint_id IS NULL, 'N/A', sprint_id) sprint_id, " +
				"IF(sprint_name IS NULL, 'N/A', sprint_name) sprint_name, " +
				"IF(task_id IS NULL, 'N/A', task_id) task_id, " +
				"IF(task_description IS NULL, 'N/A', task_description) task_description, " +
				"IF(user_story_id IS NULL, 'N/A', user_story_id) user_story_id, " +
				"IF(user_story_name IS NULL, 'N/A', user_story_name) user_story_name, assigned_to, u.name, " +
				"test_status, test_summary FROM "+CiddProperty.getProperty("SCHEMA_NAME")+".test " +
				"JOIN "+CiddProperty.getProperty("SCHEMA_NAME")+".user u ON assigned_to = user_id;";
			con = DbUtil.getConnection();
			pstmt = con.prepareStatement(getTestRecord);
			log.info("inside getTestRecord method query to get test record :: "+pstmt);
			rs = pstmt.executeQuery();
			while(rs.next()){
				testDetailsDto = new TestDetailsDto();
				testDetailsDto.setTestId(rs.getString("test_id"));
				testDetailsDto.setSprintId(rs.getString("sprint_id"));
				testDetailsDto.setSprintName(rs.getString("sprint_name"));
				testDetailsDto.setTaskId(rs.getString("task_id"));
				testDetailsDto.setTaskDescription(rs.getString("task_description"));
				testDetailsDto.setUserStoryId(rs.getString("user_story_id"));
				testDetailsDto.setUserStoryName(rs.getString("user_story_name"));
				testDetailsDto.setAssignedTo(rs.getString("assigned_to"));
				testDetailsDto.setAssignedName(rs.getString("name"));
				testDetailsDto.setTestStatus(rs.getString("test_status"));
				testDetailsDto.setTestSummary(rs.getString("test_summary"));
				testRecord.add(testDetailsDto);
			}
		}catch(Exception ex) {
			log.error("exception inside getTestRecord method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		return testRecord;
	}
	
	public List<TestDetailsDto> getTestRecordForSpecificUserStory(TestDetailsDto testDetailsDto){
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		List<TestDetailsDto> testRecord = new ArrayList<TestDetailsDto>();
		try {
			log.info("inside getTestRecordForSpecificUserStory method to get test record");
			String getTestRecordForSpecificUserStory = "SELECT test_id, " +
				"IF(sprint_id IS NULL, 'N/A', sprint_id) sprint_id, " +
				"IF(sprint_name IS NULL, 'N/A', sprint_name) sprint_name, " +
				"IF(task_id IS NULL, 'N/A', task_id) task_id, " +
				"IF(task_description IS NULL, 'N/A', task_description) task_description, " +
				"IF(user_story_id IS NULL, 'N/A', user_story_id) user_story_id, " +
				"IF(user_story_name IS NULL, 'N/A', user_story_name) user_story_name, assigned_to, u.name, " +
				"test_status, test_summary FROM "+CiddProperty.getProperty("SCHEMA_NAME")+".test " +
				"JOIN "+CiddProperty.getProperty("SCHEMA_NAME")+".user u ON assigned_to = user_id " +
				"WHERE user_story_id = ?;";
			con = DbUtil.getConnection();
			pstmt = con.prepareStatement(getTestRecordForSpecificUserStory);
			pstmt.setString(1, testDetailsDto.getUserStoryId());
			log.info("inside getTestRecordForSpecificUserStory method query to get test record :: "+pstmt);
			rs = pstmt.executeQuery();
			while(rs.next()){
				testDetailsDto = new TestDetailsDto();
				testDetailsDto.setTestId(rs.getString("test_id"));
				testDetailsDto.setSprintId(rs.getString("sprint_id"));
				testDetailsDto.setSprintName(rs.getString("sprint_name"));
				testDetailsDto.setTaskId(rs.getString("task_id"));
				testDetailsDto.setTaskDescription(rs.getString("task_description"));
				testDetailsDto.setUserStoryId(rs.getString("user_story_id"));
				testDetailsDto.setUserStoryName(rs.getString("user_story_name"));
				testDetailsDto.setAssignedTo(rs.getString("assigned_to"));
				testDetailsDto.setAssignedName(rs.getString("name"));
				testDetailsDto.setTestStatus(rs.getString("test_status"));
				testDetailsDto.setTestSummary(rs.getString("test_summary"));
				testRecord.add(testDetailsDto);
			}
		}catch(Exception ex) {
			log.error("exception inside getTestRecordForSpecificUserStory method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		return testRecord;
	}
	
	public boolean addTestRecord(TestDetailsDto testDetailsDto){
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		boolean status = false;
		try {
			log.info("inside addTestRecord method value for test record :: "+testDetailsDto);
			String addTestRecord = "INSERT " +
				"INTO "+CiddProperty.getProperty("SCHEMA_NAME")+".test " +
				"(sprint_id, sprint_name, task_id, task_description, user_story_id, " +
				"user_story_name, assigned_to, test_status, test_summary) " +
				"VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
			con = DbUtil.getConnection();
			pstmt = con.prepareStatement(addTestRecord);
			if(testDetailsDto.getSprintId().equalsIgnoreCase("null")){
				pstmt.setNull(1, Types.INTEGER);
				pstmt.setNull(2, Types.VARCHAR);	
			}else{
				pstmt.setString(1, testDetailsDto.getSprintId());
				pstmt.setString(2, testDetailsDto.getSprintName());
			}
			if(testDetailsDto.getTaskId().equalsIgnoreCase("null")){
				pstmt.setNull(3, Types.INTEGER);
				pstmt.setNull(4, Types.VARCHAR);	
			}else{
				pstmt.setString(3, testDetailsDto.getTaskId());
				pstmt.setString(4, testDetailsDto.getTaskDescription());
			}
			if(testDetailsDto.getUserStoryId().equalsIgnoreCase("null")){
				pstmt.setNull(5, Types.INTEGER);
				pstmt.setNull(6, Types.VARCHAR);	
			}else{
				pstmt.setString(5, testDetailsDto.getUserStoryId());
				pstmt.setString(6, testDetailsDto.getUserStoryName());
			}
			pstmt.setString(7, testDetailsDto.getAssignedTo());
			pstmt.setString(8, testDetailsDto.getTestStatus());
			pstmt.setString(9, testDetailsDto.getTestSummary());
			log.info("inside addTestRecord method query for add test record :: "+pstmt);
			int result = pstmt.executeUpdate();
			log.info("inside addTestRecord method value of result :: "+result);
			if(result > 0)
				status = true;
		}catch(Exception ex) {
			log.error("exception inside addTestRecord method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		return status;
	}
	
	public boolean updateTestRecord(TestDetailsDto testDetailsDto){
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		boolean status = false;
		try {
			log.info("inside updateTestRecord method value for test record :: "+testDetailsDto);
			String updateTestRecord = "UPDATE " +
				""+CiddProperty.getProperty("SCHEMA_NAME")+".test " +
				"SET sprint_id = ?, sprint_name = ?, task_id = ?, task_description = ?, user_story_id = ?, " +
				"user_story_name = ?, assigned_to = ?, test_status = ?, test_summary = ? WHERE test_id = ?;";
			con = DbUtil.getConnection();
			pstmt = con.prepareStatement(updateTestRecord);
			if(testDetailsDto.getSprintId().equalsIgnoreCase("null")){
				pstmt.setNull(1, Types.INTEGER);
				pstmt.setNull(2, Types.VARCHAR);	
			}else{
				pstmt.setString(1, testDetailsDto.getSprintId());
				pstmt.setString(2, testDetailsDto.getSprintName());
			}
			if(testDetailsDto.getTaskId().equalsIgnoreCase("null")){
				pstmt.setNull(3, Types.INTEGER);
				pstmt.setNull(4, Types.VARCHAR);	
			}else{
				pstmt.setString(3, testDetailsDto.getTaskId());
				pstmt.setString(4, testDetailsDto.getTaskDescription());
			}
			if(testDetailsDto.getUserStoryId().equalsIgnoreCase("null")){
				pstmt.setNull(5, Types.INTEGER);
				pstmt.setNull(6, Types.VARCHAR);	
			}else{
				pstmt.setString(5, testDetailsDto.getUserStoryId());
				pstmt.setString(6, testDetailsDto.getUserStoryName());
			}
			pstmt.setString(7, testDetailsDto.getAssignedTo());
			pstmt.setString(8, testDetailsDto.getTestStatus());
			pstmt.setString(9, testDetailsDto.getTestSummary());
			pstmt.setString(10, testDetailsDto.getTestId());
			log.info("inside updateTestRecord method query for update test record :: "+pstmt);
			int result = pstmt.executeUpdate();
			log.info("inside updateTestRecord method value of result :: "+result);
			if(result > 0)
				status = true;
		}catch(Exception ex) {
			log.error("exception inside updateTestRecord method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		return status;
	}
	
	public List<TestDetailsDto> getTestRecordForDropDownForSpecificSprint(TestDetailsDto testDetailsDto){
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		TestDetailsDto testDetailsDtoFromDb = null;
		List<TestDetailsDto> testRecordForDropDown = new ArrayList<TestDetailsDto>();
		try {
			log.info("inside getTestRecordForDropDown method to get test record for drop down");
			String getTestRecordForDropDown = "SELECT test_id, test_summary " +
					"FROM "+CiddProperty.getProperty("SCHEMA_NAME")+".test WHERE sprint_id = ?;";
			con = DbUtil.getConnection();
			pstmt = con.prepareStatement(getTestRecordForDropDown);
			pstmt.setString(1, testDetailsDto.getSprintId());
			log.info("inside getTestRecordForDropDown method query to get test record for drop down :: "+pstmt);
			rs = pstmt.executeQuery();
			while(rs.next()){
				testDetailsDtoFromDb = new TestDetailsDto();
				testDetailsDtoFromDb.setTestId(rs.getString("test_id"));
				testDetailsDtoFromDb.setTestSummary(rs.getString("test_summary"));
				testRecordForDropDown.add(testDetailsDtoFromDb);
			}
		}catch(Exception ex) {
			log.error("exception inside getTestRecordForDropDown method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		return testRecordForDropDown;
	}
	public List<TestDetailsDto> getTestForTask(String columnValue,String columnName)
	{
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		TestDetailsDto testDetailsDto = null;
		List<TestDetailsDto> testRecordfotTask = new ArrayList<TestDetailsDto>();
		try {
			log.info("inside getTestForTask method to get test record for perticular task");
			String getTestRecordForDropDown ="SELECT test_id, " +
					"IF(sprint_id IS NULL, 'N/A', sprint_id) sprint_id, " +
					"IF(sprint_name IS NULL, 'N/A', sprint_name) sprint_name, " +
					"IF(task_id IS NULL, 'N/A', task_id) task_id, " +
					"IF(task_description IS NULL, 'N/A', task_description) task_description, " +
					"IF(user_story_id IS NULL, 'N/A', user_story_id) user_story_id, " +
					"IF(user_story_name IS NULL, 'N/A', user_story_name) user_story_name, assigned_to,  " +
					"test_status, test_summary FROM "+CiddProperty.getProperty("SCHEMA_NAME")+".test WHERE "+columnName +"= ?;";
			con = DbUtil.getConnection();
			pstmt = con.prepareStatement(getTestRecordForDropDown);
			pstmt.setString(1, columnValue);
			log.info("insidegetTestForTask method query to get test record for task :: "+pstmt);
			rs = pstmt.executeQuery();
			while(rs.next()){

				testDetailsDto = new TestDetailsDto();
				testDetailsDto.setTestId(rs.getString("test_id"));
				testDetailsDto.setSprintId(rs.getString("sprint_id"));
				testDetailsDto.setSprintName(rs.getString("sprint_name"));
				testDetailsDto.setTaskId(rs.getString("task_id"));
				testDetailsDto.setTaskDescription(rs.getString("task_description"));
				testDetailsDto.setUserStoryId(rs.getString("user_story_id"));
				testDetailsDto.setUserStoryName(rs.getString("user_story_name"));
				testDetailsDto.setAssignedTo(rs.getString("assigned_to"));
				testDetailsDto.setTestStatus(rs.getString("test_status"));
				testDetailsDto.setTestSummary(rs.getString("test_summary"));
				testRecordfotTask.add(testDetailsDto);
			
			}
		}catch(Exception ex) {
			log.error("exception inside getTestRecordForDropDown method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		return testRecordfotTask;
		
	}
	
}

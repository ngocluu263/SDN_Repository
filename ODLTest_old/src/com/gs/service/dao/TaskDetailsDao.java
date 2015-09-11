package com.gs.service.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import com.gs.service.dto.TaskDetailsDto;
import com.gs.service.util.CiddProperty;
import com.gs.service.util.DbUtil;

public class TaskDetailsDao {
	private static Logger log = Logger.getLogger(TaskDetailsDao.class);
	private static TaskDetailsDao taskDetailsDao;
	
	public static TaskDetailsDao getInstatnce(){
		try {
			if (null == taskDetailsDao) {
				synchronized (TaskDetailsDao.class) {
					if (null == taskDetailsDao) {
						taskDetailsDao = new TaskDetailsDao();
					} 
				}
			}
		}catch (Exception ex) {
			ex.printStackTrace();
		}
		return taskDetailsDao;
	}
	
	public List<TaskDetailsDto> getTaskRecord(){
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		TaskDetailsDto taskDetailsDto = null;
		List<TaskDetailsDto> taskRecord = new ArrayList<TaskDetailsDto>();
		try {
			log.info("inside getTaskRecord method to get task record");
			String getTaskRecord = "SELECT t.task_id, t.sprint_id, s.sprint_name, t.task_description, " +
				"t.task_status, t.task_start_date, t.task_end_date, t.task_duration,t.user_story " +
				"FROM "+CiddProperty.getProperty("SCHEMA_NAME")+".task t " +
				"JOIN "+CiddProperty.getProperty("SCHEMA_NAME")+".sprint s ON t.sprint_id = s.sprint_id;";
			con = DbUtil.getConnection();
			pstmt = con.prepareStatement(getTaskRecord);
			log.info("inside getTaskRecord method query to get task record :: "+pstmt);
			rs = pstmt.executeQuery();
			while(rs.next()){
				taskDetailsDto = new TaskDetailsDto();
				taskDetailsDto.setSprintId(rs.getString("sprint_id"));
				taskDetailsDto.setSprintName(rs.getString("sprint_name"));
				taskDetailsDto.setTaskId(rs.getString("task_id"));
				taskDetailsDto.setTaskDescription(rs.getString("task_description"));
				taskDetailsDto.setTaskStatus(rs.getString("task_status"));
				taskDetailsDto.setTaskStartDate(rs.getString("task_start_date"));
				taskDetailsDto.setTaskEndDate(rs.getString("task_end_date"));
				taskDetailsDto.setTaskDuration(rs.getString("task_duration"));
				taskDetailsDto.setUserStoryId(rs.getString("user_story"));
				taskRecord.add(taskDetailsDto);
			}
		}catch(Exception ex) {
			log.error("exception inside getTaskRecord method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		return taskRecord;
	}
	
	public boolean addTaskRecord(TaskDetailsDto taskDetailsDto){
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		boolean status = false;
		try {
			log.info("inside addTaskRecord method value for task record :: "+taskDetailsDto);
			String addTaskRecord = "INSERT " +
				"INTO "+CiddProperty.getProperty("SCHEMA_NAME")+".task " +
				"(sprint_id, task_description, task_status, task_start_date, task_end_date, task_duration, user_story) " +
				"VALUES (?, ?, ?, ?, ?, ?,?);";
			con = DbUtil.getConnection();
			pstmt = con.prepareStatement(addTaskRecord);
			pstmt.setString(1, taskDetailsDto.getSprintId());
			pstmt.setString(2, taskDetailsDto.getTaskDescription());
			pstmt.setString(3, taskDetailsDto.getTaskStatus());
			pstmt.setString(4, taskDetailsDto.getTaskStartDate());
			pstmt.setString(5, taskDetailsDto.getTaskEndDate());
			pstmt.setString(6, taskDetailsDto.getTaskDuration());
			pstmt.setString(7, taskDetailsDto.getUserStoryId());
			log.info("inside addTaskRecord method query for add task record :: "+pstmt);
			int result = pstmt.executeUpdate();
			log.info("inside addTaskRecord method value of result :: "+result);
			if(result > 0)
				status = true;
		}catch(Exception ex) {
			log.error("exception inside addTaskRecord method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		return status;
	}
	
	public boolean updateTaskRecord(TaskDetailsDto taskDetailsDto){
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		boolean status = false;
		try {
			log.info("inside updateTaskRecord method value for task record :: "+taskDetailsDto);
			String updateTaskRecord = "UPDATE " +
				""+CiddProperty.getProperty("SCHEMA_NAME")+".task " +
				"SET sprint_id = ?, task_description = ?, task_status = ?, task_start_date = ?, " +
				"task_end_date = ?, task_duration = ?,user_story= ? WHERE task_id = ?;";
			con = DbUtil.getConnection();
			pstmt = con.prepareStatement(updateTaskRecord);
			pstmt.setString(1, taskDetailsDto.getSprintId());
			pstmt.setString(2, taskDetailsDto.getTaskDescription());
			pstmt.setString(3, taskDetailsDto.getTaskStatus());
			pstmt.setString(4, taskDetailsDto.getTaskStartDate());
			pstmt.setString(5, taskDetailsDto.getTaskEndDate());
			pstmt.setString(6, taskDetailsDto.getTaskDuration());
			pstmt.setString(7, taskDetailsDto.getUserStoryId());
			pstmt.setString(8, taskDetailsDto.getTaskId());
			log.info("inside updateTaskRecord method query for update task record :: "+pstmt);
			int result = pstmt.executeUpdate();
			log.info("inside addTaskRecord method value of result :: "+result);
			if(result > 0)
				status = true;
		}catch(Exception ex) {
			log.error("exception inside updateTaskRecord method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		return status;
	}
	
	public List<TaskDetailsDto> getTaskRecordForDropDownForSpecificSprint(TaskDetailsDto taskDetailsDto){
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		TaskDetailsDto taskDetailsDtoFromDb = null;
		List<TaskDetailsDto> taskRecordForDropDown = new ArrayList<TaskDetailsDto>();
		try {
			log.info("inside getTaskRecordForDropDownForSpecificSprint method to get task record for drop down");
			String getTaskRecordForDropDown = "SELECT task_id, task_description " +
					"FROM "+CiddProperty.getProperty("SCHEMA_NAME")+".task WHERE sprint_id = ?;";
			con = DbUtil.getConnection();
			pstmt = con.prepareStatement(getTaskRecordForDropDown);
			pstmt.setString(1, taskDetailsDto.getSprintId());
			log.info("inside getTaskRecordForDropDown method query to get task record for drop down :: "+pstmt);
			rs = pstmt.executeQuery();
			while(rs.next()){
				taskDetailsDtoFromDb = new TaskDetailsDto();
				taskDetailsDtoFromDb.setTaskId(rs.getString("task_id"));
				taskDetailsDtoFromDb.setTaskDescription(rs.getString("task_description"));
				taskRecordForDropDown.add(taskDetailsDtoFromDb);
			}
		}catch(Exception ex) {
			log.error("exception inside getTaskRecordForDropDownForSpecificSprint method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		return taskRecordForDropDown;
	}
	public List<TaskDetailsDto> getTaskRecordForUserStory(String userStory){
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		TaskDetailsDto taskDetailsDto = null;
		List<TaskDetailsDto> taskRecord = new ArrayList<TaskDetailsDto>();
		try {
			log.info("inside getTaskRecordForUserStory method to get task record");
			String getTaskRecord = "SELECT t.task_id, t.sprint_id, u.user_story_name, t.task_description, " +
				"t.task_status, t.task_start_date, t.task_end_date, t.task_duration,t.user_story " +
				"FROM "+CiddProperty.getProperty("SCHEMA_NAME")+".task t " +
				"JOIN "+CiddProperty.getProperty("SCHEMA_NAME")+".user_story u ON t.user_story = u.user_story_id and user_story="+userStory+";";
			con = DbUtil.getConnection();
			pstmt = con.prepareStatement(getTaskRecord);
			log.info("inside getTaskRecordForUserStory method query to get task record :: "+pstmt);
			rs = pstmt.executeQuery();
			while(rs.next()){
				taskDetailsDto = new TaskDetailsDto();
				taskDetailsDto.setSprintId(rs.getString("sprint_id"));
				//taskDetailsDto.setSprintName(rs.getString("sprint_name"));
				taskDetailsDto.setTaskId(rs.getString("task_id"));
				taskDetailsDto.setTaskDescription(rs.getString("task_description"));
				taskDetailsDto.setTaskStatus(rs.getString("task_status"));
				taskDetailsDto.setTaskStartDate(rs.getString("task_start_date"));
				taskDetailsDto.setTaskEndDate(rs.getString("task_end_date"));
				taskDetailsDto.setTaskDuration(rs.getString("task_duration"));
				taskDetailsDto.setUserStoryId(rs.getString("user_story_name"));
				taskRecord.add(taskDetailsDto);
			}
		}catch(Exception ex) {
			log.error("exception inside getTaskRecordForUserStory method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		return taskRecord;
	}
}

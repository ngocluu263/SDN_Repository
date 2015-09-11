package com.gs.service.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import com.gs.service.dto.SprintDetailsDto;
import com.gs.service.util.CiddProperty;
import com.gs.service.util.DbUtil;

public class SprintDetailsDao {
	private static Logger log = Logger.getLogger(SprintDetailsDao.class);
	private static SprintDetailsDao sprintDetailsDao;
	
	public static SprintDetailsDao getInstatnce(){
		try {
			if (null == sprintDetailsDao) {
				synchronized (SprintDetailsDao.class) {
					if (null == sprintDetailsDao) {
						sprintDetailsDao = new SprintDetailsDao();
					} 
				}
			}
		}catch (Exception ex) {
			ex.printStackTrace();
		}
		return sprintDetailsDao;
	}
	
	public List<SprintDetailsDto> getSprintRecord(){
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		SprintDetailsDto sprintDetailsDto = null;
		List<SprintDetailsDto> sprintRecord = new ArrayList<SprintDetailsDto>();
		try {
			log.info("inside getSprintRecord method to get sprint record");
			String getSprintRecord = "SELECT s.release_id, rm.release_name, s.sprint_id, s.sprint_name, " +
				"s.sprint_start_date_time, s.sprint_end_date_time, s.sprint_duration, s.sprint_item, " +
				"s.sprint_status FROM "+CiddProperty.getProperty("SCHEMA_NAME")+".sprint s " +
				"JOIN "+CiddProperty.getProperty("SCHEMA_NAME")+".release_master rm " +
				"ON s.release_id = rm.release_id;";
			con = DbUtil.getConnection();
			pstmt = con.prepareStatement(getSprintRecord);
			log.info("inside getSprintRecord method query to get sprint record :: "+pstmt);
			rs = pstmt.executeQuery();
			while(rs.next()){
				sprintDetailsDto = new SprintDetailsDto();
				sprintDetailsDto.setReleaseId(rs.getString("release_id"));
				sprintDetailsDto.setReleaseName(rs.getString("release_name"));
				sprintDetailsDto.setSprintId(rs.getString("sprint_id"));
				sprintDetailsDto.setSprintName(rs.getString("sprint_name"));
				sprintDetailsDto.setSprintStartDate(rs.getString("sprint_start_date_time"));
				sprintDetailsDto.setSprintEndDate(rs.getString("sprint_end_date_time"));
				sprintDetailsDto.setSprintDuration(rs.getString("sprint_duration"));
				sprintDetailsDto.setSprintItem(rs.getString("sprint_item"));
				sprintDetailsDto.setSprintStatus(rs.getString("sprint_status"));
				sprintRecord.add(sprintDetailsDto);
			}
		}catch(Exception ex) {
			log.error("exception inside getSprintRecord method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		return sprintRecord;
	}
	
	public List<SprintDetailsDto> getSprintRecordForSpecifiedRelease(SprintDetailsDto sprintDetailsDto){
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		List<SprintDetailsDto> sprintRecord = new ArrayList<SprintDetailsDto>();
		try {
			log.info("inside getSprintRecordForSpecifiedRelease method to get sprint record");
			String getSprintRecord = "SELECT s.release_id, rm.release_name, s.sprint_id, s.sprint_name, " +
				"s.sprint_start_date_time, s.sprint_end_date_time, s.sprint_duration, s.sprint_item, " +
				"s.sprint_status FROM "+CiddProperty.getProperty("SCHEMA_NAME")+".sprint s " +
				"JOIN "+CiddProperty.getProperty("SCHEMA_NAME")+".release_master rm " +
				"ON s.release_id = rm.release_id WHERE s.release_id = ?;";
			con = DbUtil.getConnection();
			pstmt = con.prepareStatement(getSprintRecord);
			pstmt.setString(1, sprintDetailsDto.getReleaseId());
			log.info("inside getSprintRecordForSpecifiedRelease method query to get sprint record :: "+pstmt);
			rs = pstmt.executeQuery();
			while(rs.next()){
				sprintDetailsDto = new SprintDetailsDto();
				sprintDetailsDto.setReleaseId(rs.getString("release_id"));
				sprintDetailsDto.setReleaseName(rs.getString("release_name"));
				sprintDetailsDto.setSprintId(rs.getString("sprint_id"));
				sprintDetailsDto.setSprintName(rs.getString("sprint_name"));
				sprintDetailsDto.setSprintStartDate(rs.getString("sprint_start_date_time"));
				sprintDetailsDto.setSprintEndDate(rs.getString("sprint_end_date_time"));
				sprintDetailsDto.setSprintDuration(rs.getString("sprint_duration"));
				sprintDetailsDto.setSprintItem(rs.getString("sprint_item"));
				sprintDetailsDto.setSprintStatus(rs.getString("sprint_status"));
				sprintRecord.add(sprintDetailsDto);
			}
		}catch(Exception ex) {
			log.error("exception inside getSprintRecordForSpecifiedRelease method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		return sprintRecord;
	}
	
	public boolean addSprintRecord(SprintDetailsDto sprintDetailsDto){
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		boolean status = false;
		try {
			log.info("inside addSprintRecord method value for sprint record :: "+sprintDetailsDto);
			String addSprintRecord = "INSERT " +
				"INTO "+CiddProperty.getProperty("SCHEMA_NAME")+".sprint " +
				"(release_id, sprint_name, sprint_start_date_time, sprint_end_date_time, " +
				"sprint_duration, sprint_item, sprint_status) VALUES (?, ?, ?, ?, ?, ?, ?);";
			con = DbUtil.getConnection();
			pstmt = con.prepareStatement(addSprintRecord);
			pstmt.setString(1, sprintDetailsDto.getReleaseId());
			pstmt.setString(2, sprintDetailsDto.getSprintName());
			pstmt.setString(3, sprintDetailsDto.getSprintStartDate());
			pstmt.setString(4, sprintDetailsDto.getSprintEndDate());
			pstmt.setString(5, sprintDetailsDto.getSprintDuration());
			pstmt.setString(6, sprintDetailsDto.getSprintItem());
			pstmt.setString(7, sprintDetailsDto.getSprintStatus());
			log.info("inside addSprintRecord method query to add sprint record :: "+pstmt);
			int result = pstmt.executeUpdate();
			log.info("inside addSprintRecord method value of result :: "+result);
			if(result > 0)
				status = true;
		}catch(Exception ex) {
			log.error("exception inside addSprintRecord method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		return status;
	}
	
	public boolean updateSprintRecord(SprintDetailsDto sprintDetailsDto){
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		boolean status = false;
		try {
			log.info("inside updateSprintRecord method value for sprint record :: "+sprintDetailsDto);
			String updateSprintRecord = "UPDATE " +
				""+CiddProperty.getProperty("SCHEMA_NAME")+".sprint " +
				"SET release_id = ?, sprint_name = ?, sprint_start_date_time = ?, sprint_end_date_time = ?," +
				" sprint_duration = ?, sprint_item = ?, sprint_status = ? WHERE sprint_id = ?;";
			con = DbUtil.getConnection();
			pstmt = con.prepareStatement(updateSprintRecord);
			pstmt.setString(1, sprintDetailsDto.getReleaseId());
			pstmt.setString(2, sprintDetailsDto.getSprintName());
			pstmt.setString(3, sprintDetailsDto.getSprintStartDate());
			pstmt.setString(4, sprintDetailsDto.getSprintEndDate());
			pstmt.setString(5, sprintDetailsDto.getSprintDuration());
			pstmt.setString(6, sprintDetailsDto.getSprintItem());
			pstmt.setString(7, sprintDetailsDto.getSprintStatus());
			pstmt.setString(8, sprintDetailsDto.getSprintId());
			log.info("inside updateSprintRecord method query for update sprint record :: "+pstmt);
			int result = pstmt.executeUpdate();
			log.info("inside updateSprintRecord method value of result :: "+result);
			if(result > 0)
				status = true;
		}catch(Exception ex) {
			log.error("exception inside updateSprintRecord method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		return status;
	}
	
	public List<SprintDetailsDto> getSprintRecordForDropDownForSpecificRelease(SprintDetailsDto sprintDetailsDto){
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		SprintDetailsDto sprintDetailsDtoFromDb = null;
		List<SprintDetailsDto> sprintRecordForDropDown = new ArrayList<SprintDetailsDto>();
		try {
			log.info("inside getSprintRecordForDropDownForSpecificRelease method to get sprint record for drop down");
			String getSprintRecordForDropDown = "SELECT * " +
				"FROM "+CiddProperty.getProperty("SCHEMA_NAME")+".sprint " +
				"WHERE release_id = ?;";
			con = DbUtil.getConnection();
			pstmt = con.prepareStatement(getSprintRecordForDropDown);
			pstmt.setString(1, sprintDetailsDto.getReleaseId());
			log.info("inside getSprintRecordForDropDownForSpecificRelease method query to get sprint record for drop down :: "+pstmt);
			rs = pstmt.executeQuery();
			while(rs.next()){
				sprintDetailsDtoFromDb = new SprintDetailsDto();
				sprintDetailsDtoFromDb.setSprintId(rs.getString("sprint_id"));
				sprintDetailsDtoFromDb.setSprintName(rs.getString("sprint_name"));
				sprintRecordForDropDown.add(sprintDetailsDtoFromDb);
			}
		}catch(Exception ex) {
			log.error("exception inside getReleaseRecordForDropDownForSpecificRelease method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		return sprintRecordForDropDown;
	}
	
	public List<SprintDetailsDto> getSprintRecordForDropDown(){
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		SprintDetailsDto sprintDetailsDtoFromDb = null;
		List<SprintDetailsDto> sprintRecordForDropDown = new ArrayList<SprintDetailsDto>();
		try {
			log.info("inside getSprintRecordForDropDown method to get sprint record for drop down");
			String getSprintRecordForDropDown = "SELECT * " +
				"FROM "+CiddProperty.getProperty("SCHEMA_NAME")+".sprint;";
			con = DbUtil.getConnection();
			pstmt = con.prepareStatement(getSprintRecordForDropDown);
			log.info("inside getSprintRecordForDropDown method query to get sprint record for drop down :: "+pstmt);
			rs = pstmt.executeQuery();
			while(rs.next()){
				sprintDetailsDtoFromDb = new SprintDetailsDto();
				sprintDetailsDtoFromDb.setSprintId(rs.getString("sprint_id"));
				sprintDetailsDtoFromDb.setSprintName(rs.getString("sprint_name"));
				sprintRecordForDropDown.add(sprintDetailsDtoFromDb);
			}
		}catch(Exception ex) {
			log.error("exception inside getReleaseRecordForDropDown method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		return sprintRecordForDropDown;
	}
}

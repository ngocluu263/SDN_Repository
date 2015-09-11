package com.gs.service.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import com.gs.service.dto.ReleaseDetailsDto;
import com.gs.service.util.CiddProperty;
import com.gs.service.util.DbUtil;

public class ReleaseDetailsDao {
	private static Logger log = Logger.getLogger(ReleaseDetailsDao.class);
	private static ReleaseDetailsDao releaseDetailsDao;
	
	public static ReleaseDetailsDao getInstatnce(){
		try {
			if (null == releaseDetailsDao) {
				synchronized (ReleaseDetailsDao.class) {
					if (null == releaseDetailsDao) {
						releaseDetailsDao = new ReleaseDetailsDao();
					} 
				}
			}
		}catch (Exception ex) {
			ex.printStackTrace();
		}
		return releaseDetailsDao;
	}
	
	public List<ReleaseDetailsDto> getReleaseRecord(){
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		ReleaseDetailsDto releaseDetailsDto = null;
		List<ReleaseDetailsDto> relaeseRecord = new ArrayList<ReleaseDetailsDto>();
		try {
			log.info("inside getReleaseRecord method to get release record");
			String getReleaseRecord = "SELECT * " +
				"FROM "+CiddProperty.getProperty("SCHEMA_NAME")+".release_master;";
			con = DbUtil.getConnection();
			pstmt = con.prepareStatement(getReleaseRecord);
			log.info("inside getReleaseRecord method query to get release record :: "+pstmt);
			rs = pstmt.executeQuery();
			while(rs.next()){
				releaseDetailsDto = new ReleaseDetailsDto();
				releaseDetailsDto.setReleaseId(rs.getString("release_id"));
				releaseDetailsDto.setReleaseName(rs.getString("release_name"));
				releaseDetailsDto.setStartDate(rs.getString("start_date_time"));
				releaseDetailsDto.setEndDate(rs.getString("end_date_time"));
				releaseDetailsDto.setDuration(rs.getString("duration"));
				releaseDetailsDto.setStatus(rs.getString("status"));
				releaseDetailsDto.setContent(rs.getString("content"));
				relaeseRecord.add(releaseDetailsDto);
			}
		}catch(Exception ex) {
			log.error("exception inside getReleaseRecord method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		return relaeseRecord;
	}
	
	public String addReleaseRecord(ReleaseDetailsDto releaseDetailsDto){
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String status = "not_added";
		try {
			log.info("inside addReleaseRecord method value for release record :: "+releaseDetailsDto);
			boolean isVersionExistStatus = isVersionNumberExist(releaseDetailsDto);
			if(false == isVersionExistStatus){
				String addReleaseRecord = "INSERT " +
					"INTO "+CiddProperty.getProperty("SCHEMA_NAME")+".release_master " +
					"(release_name, start_date_time, end_date_time, duration, status, content) " +
					"VALUES (?, ?, ?, ?, ?, ?);";
				con = DbUtil.getConnection();
				pstmt = con.prepareStatement(addReleaseRecord);
				pstmt.setString(1, releaseDetailsDto.getReleaseName());
				pstmt.setString(2, releaseDetailsDto.getStartDate());
				pstmt.setString(3, releaseDetailsDto.getEndDate());
				pstmt.setString(4, releaseDetailsDto.getDuration());
				pstmt.setString(5, releaseDetailsDto.getStatus());
				pstmt.setString(6, releaseDetailsDto.getContent());
				log.info("inside addReleaseRecord method query for add release record :: "+pstmt);
				int result = pstmt.executeUpdate();
				log.info("inside addReleaseRecord method value of result :: "+result);
				if(result > 0)
					status = "added";
			}else{
				status = "already_exist";
			}
		}catch(Exception ex) {
			log.error("exception inside addReleaseRecord method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		return status;
	}
	
	public boolean isVersionNumberExist(ReleaseDetailsDto releaseDetailsDto){
		boolean status = false;
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		try {
			log.info("inside isVersionNumberExist method value for release record :: "+releaseDetailsDto);
			String isVersionNumberExist = "SELECT version_number " +
				"FROM "+CiddProperty.getProperty("SCHEMA_NAME")+".release_master " +
				"WHERE version_number = ?;";
			con = DbUtil.getConnection();
			pstmt = con.prepareStatement(isVersionNumberExist);
			pstmt.setString(1, releaseDetailsDto.getReleaseName());
			log.info("inside isVersionNumberExist method query to check version number :: "+pstmt);
			rs = pstmt.executeQuery();
			if(rs.first())
				status = true;
		}catch(Exception ex) {
			log.error("exception inside isVersionNumberExist method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		log.info("inside isVersionNumberExist method value of status :: "+status);
		return status;
	}
	
	public boolean updateReleaseRecord(ReleaseDetailsDto releaseDetailsDto){
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		boolean status = false;
		try {
			log.info("inside updateReleaseRecord method value for release record :: "+releaseDetailsDto);
			String updateReleaseRecord = "UPDATE " +
				""+CiddProperty.getProperty("SCHEMA_NAME")+".release_master " +
				"SET release_name = ?, start_date_time = ?, end_date_time = ?," +
				" duration = ?, status = ?, content = ? WHERE release_id = ?;";
			con = DbUtil.getConnection();
			pstmt = con.prepareStatement(updateReleaseRecord);
			pstmt.setString(1, releaseDetailsDto.getReleaseName());
			pstmt.setString(2, releaseDetailsDto.getStartDate());
			pstmt.setString(3, releaseDetailsDto.getEndDate());
			pstmt.setString(4, releaseDetailsDto.getDuration());
			pstmt.setString(5, releaseDetailsDto.getStatus());
			pstmt.setString(6, releaseDetailsDto.getContent());
			pstmt.setString(7, releaseDetailsDto.getReleaseId());
			log.info("inside updateReleaseRecord method query for update release record :: "+pstmt);
			int result = pstmt.executeUpdate();
			log.info("inside updateReleaseRecord method value of result :: "+result);
			if(result > 0)
				status = true;
		}catch(Exception ex) {
			log.error("exception inside updateReleaseRecord method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		return status;
	}
	
	public List<ReleaseDetailsDto> getReleaseRecordForDropDown(){
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		ReleaseDetailsDto releaseDetailsDto = null;
		List<ReleaseDetailsDto> relaeseRecordForDropDown = new ArrayList<ReleaseDetailsDto>();
		try {
			log.info("inside getReleaseRecordForDropDown method to get release record for drop down");
			String getReleaseRecordForDropDown = "SELECT * " +
				"FROM "+CiddProperty.getProperty("SCHEMA_NAME")+".release_master;";
			con = DbUtil.getConnection();
			pstmt = con.prepareStatement(getReleaseRecordForDropDown);
			log.info("inside getReleaseRecordForDropDown method query for to release record for drop down :: "+pstmt);
			rs = pstmt.executeQuery();
			while(rs.next()){
				releaseDetailsDto = new ReleaseDetailsDto();
				releaseDetailsDto.setReleaseId(rs.getString("release_id"));
				releaseDetailsDto.setReleaseName(rs.getString("release_name"));
				relaeseRecordForDropDown.add(releaseDetailsDto);
			}
		}catch(Exception ex) {
			log.error("exception inside getReleaseRecordForDropDown method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		return relaeseRecordForDropDown;
	}
}

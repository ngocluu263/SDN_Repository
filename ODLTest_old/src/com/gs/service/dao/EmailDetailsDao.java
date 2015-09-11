package com.gs.service.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import com.gs.service.dto.EmailDetailsDto;
import com.gs.service.util.CiddProperty;
import com.gs.service.util.DbUtil;

public class EmailDetailsDao {
	private static Logger log = Logger.getLogger(EmailDetailsDao.class);
	private static EmailDetailsDao emailDetailsDao;
	
	public static EmailDetailsDao getInstatnce(){
		try {
			if (null == emailDetailsDao) {
				synchronized (EmailDetailsDao.class) {
					if (null == emailDetailsDao) {
						emailDetailsDao = new EmailDetailsDao();
					} 
				}
			}
		}catch (Exception ex) {
			ex.printStackTrace();
		}
		return emailDetailsDao;
	}
	
	public List<EmailDetailsDto> getAllEmailRecordForSpecifiedProject(EmailDetailsDto emailDetailsDto){
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		List<EmailDetailsDto> emailRecordList = new ArrayList<EmailDetailsDto>();
		EmailDetailsDto emailDetailsDtoFromDb = null;
		try {
			log.info("inside getAllProjectRecord method value for all project record");
			String allEmailRecord = "SELECT e.email_id, e.project_id, p.project_name, e.email " +
				"FROM "+CiddProperty.getProperty("SCHEMA_NAME")+".email e " +
				"JOIN "+CiddProperty.getProperty("SCHEMA_NAME")+".project p " +
				"ON e.project_id = p.project_id WHERE e.project_id = ?;";
			con = DbUtil.getConnection();
			pstmt = con.prepareStatement(allEmailRecord);
			pstmt.setString(1, emailDetailsDto.getProjectId());
			log.info("inside allEmailRecord method query for all email record :: " + pstmt);
			rs = pstmt.executeQuery();
			while(rs.next()){
				emailDetailsDtoFromDb = new EmailDetailsDto();
				emailDetailsDtoFromDb.setProjectId(rs.getString("project_id"));
				emailDetailsDtoFromDb.setProjectName(rs.getString("project_name"));
				emailDetailsDtoFromDb.setEmailId(rs.getInt("email_id"));
				emailDetailsDtoFromDb.setEmail(rs.getString("email"));
				emailRecordList.add(emailDetailsDtoFromDb);
			}
		}catch(Exception ex) {
			log.error("exception inside getAllEmailRecordForSpecifiedProject method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		log.info("inside getAllEmailRecordForSpecifiedProject method return size for all email record from DB :: " +emailRecordList.size());
		return emailRecordList;
	}
	
	public String addEmailRecord(EmailDetailsDto emailDetailsDto){
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String status = "added";
		try {
			log.info("inside addEmailRecord method value for email record :: "+emailDetailsDto);
			String isEmailExistStatus = isEmailExist(emailDetailsDto);
			if(isEmailExistStatus.split("#&#")[0].equalsIgnoreCase("not_exist")){
				String addEmailRecord = "INSERT " +
						"INTO "+CiddProperty.getProperty("SCHEMA_NAME")+".email " +
						"(project_id, email) VALUES (?, ?);";
				con = DbUtil.getConnection();
				String emailArr[] = emailDetailsDto.getEmail().split(",");
				int emailLen = emailArr.length;
				int result = 0;
				for (int count = 0; count < emailLen; count++) {
					pstmt = con.prepareStatement(addEmailRecord);
					pstmt.setString(1, emailDetailsDto.getProjectId());
					pstmt.setString(2, emailArr[count]);
					log.info("inside addEmailRecord method query for add email record :: "+pstmt);
					result += pstmt.executeUpdate();	
				}
				log.info("inside addEmailRecord method value of result :: "+result);
				if(result == 0)
					status = "not_added";
			}else{
				status = "already_exist#&#"+isEmailExistStatus.split("#&#")[1];
			}
		}catch(Exception ex) {
			log.error("exception inside addEmailRecord method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		return status;
	}
	
	public String isEmailExist(EmailDetailsDto emailDetailsDto){
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String status = "not_exist";
		try{
			String emailArr[] = emailDetailsDto.getEmail().split(",");
			int emailLen = emailArr.length;
			con = DbUtil.getConnection();
			String isEmailExist = "SELECT email FROM "+CiddProperty.getProperty("SCHEMA_NAME")+".email " +
					"WHERE project_id = ? AND email = ?;";
			for (int count = 0; count < emailLen; count++) {
				pstmt = con.prepareStatement(isEmailExist);
				pstmt.setString(1, emailDetailsDto.getProjectId());
				pstmt.setString(2, emailArr[count]);
				log.info("inside isEmailExist method query to check mail exist :: "+pstmt);
				rs = pstmt.executeQuery();
				if(rs.first()){
					status = "exist#&#"+emailArr[count];
					break;
				}
			}
		}catch(Exception ex){
			log.error("exception inside isEmailExist method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		return status;
	}
	
	public boolean removeEmailRecord(EmailDetailsDto emailDetailsDto){
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		boolean status = false;
		try {
			log.info("inside removeEmailRecord method value for email record :: "+emailDetailsDto);
			String removeEmailRecord = "DELETE " +
					"FROM "+CiddProperty.getProperty("SCHEMA_NAME")+".email " +
					"WHERE email_id IN ('"+emailDetailsDto.getEmailId()+"');";
			con = DbUtil.getConnection();
			pstmt = con.prepareStatement(removeEmailRecord);
			log.info("inside removeEmailRecord method query for remove email record :: "+pstmt);
			int result = pstmt.executeUpdate();
			log.info("inside removeEmailRecord method value of result :: "+result);
			if(result > 0)
				status = true;
		}catch(Exception ex) {
			ex.printStackTrace();
			log.error("exception inside removeEmailRecord method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		return status;
	}
}

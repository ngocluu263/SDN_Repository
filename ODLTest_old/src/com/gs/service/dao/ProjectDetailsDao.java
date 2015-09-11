package com.gs.service.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import com.gs.service.dto.ProjectDetailsDto;
import com.gs.service.util.CiddProperty;
import com.gs.service.util.DbUtil;

public class ProjectDetailsDao {
	private static Logger log = Logger.getLogger(ProjectDetailsDao.class);
	private static ProjectDetailsDao projectDetailsDao;
	
	public static ProjectDetailsDao getInstatnce(){
		try {
			if (null == projectDetailsDao) {
				synchronized (ProjectDetailsDao.class) {
					if (null == projectDetailsDao) {
						projectDetailsDao = new ProjectDetailsDao();
					} 
				}
			}
		}catch (Exception ex) {
			ex.printStackTrace();
		}
		return projectDetailsDao;
	}
	
	public List<ProjectDetailsDto> getAllProjectRecord(){
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		List<ProjectDetailsDto> projectRecordList = new ArrayList<ProjectDetailsDto>();
		ProjectDetailsDto projectDetailsFromDb = null;
		try {
			log.info("inside getAllProjectRecord method value for all project record");
			String allProjectRecord = "SELECT * FROM "+CiddProperty.getProperty("SCHEMA_NAME")+".project;";
			con = DbUtil.getConnection();
			pstmt = con.prepareStatement(allProjectRecord);
			log.info("inside getAllProjectRecord method query for all project record :: " + pstmt);
			rs = pstmt.executeQuery();
			while(rs.next()){
				projectDetailsFromDb = new ProjectDetailsDto();
				projectDetailsFromDb.setProjectId(rs.getString("project_id"));
				projectDetailsFromDb.setProjectName(rs.getString("project_name"));
				projectRecordList.add(projectDetailsFromDb);
			}
		}catch(Exception ex) {
			log.error("exception inside getAllProjectRecord method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		log.info("inside getAllProjectRecord method return size for all project record from DB :: " +projectRecordList.size());
		return projectRecordList;
	}
}

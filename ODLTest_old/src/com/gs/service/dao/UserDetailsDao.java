package com.gs.service.dao;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import com.gs.service.dto.UserDetailsDto;
import com.gs.service.util.CiddProperty;
import com.gs.service.util.DbUtil;

public class UserDetailsDao {
	private static Logger log = Logger.getLogger(UserDetailsDao.class);
	private static UserDetailsDao userDetailsDao;
	
	public static UserDetailsDao getInstatnce(){
		try {
			if (null == userDetailsDao) {
				synchronized (UserDetailsDao.class) {
					if (null == userDetailsDao) {
						userDetailsDao = new UserDetailsDao();
					} 
				}
			}
		}catch (Exception ex) {
			ex.printStackTrace();
		}
		return userDetailsDao;
	}

	public UserDetailsDto validateUser(UserDetailsDto userDetailsDto){
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		UserDetailsDto userDetailsFromDb = null;
		try {
			log.info("inside validateUser method value for user details object :: " + userDetailsDto);
			String loginValidation = "SELECT * FROM "+CiddProperty.getProperty("SCHEMA_NAME")+".user " +
					"WHERE username = ? and password = ?;";
			con = DbUtil.getConnection();
			pstmt = con.prepareStatement(loginValidation);
			pstmt.setString(1, userDetailsDto.getUsername());
			pstmt.setString(2, userDetailsDto.getPassword());
			log.info("inside validateUser method query for login validate :: " + pstmt);
			rs = pstmt.executeQuery();
			while(rs.next()){
				userDetailsFromDb = new UserDetailsDto();
				userDetailsFromDb.setUserId(rs.getString("user_id"));
				userDetailsFromDb.setName(rs.getString("name"));
				userDetailsFromDb.setUsername(rs.getString("username"));
				userDetailsFromDb.setPassword(rs.getString("password"));
				userDetailsFromDb.setEmailId(rs.getString("email"));
				userDetailsFromDb.setUserType(rs.getString("user_type"));
			}
		}catch(Exception ex) {
			ex.printStackTrace();
			log.error("exception inside validateUser method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		log.info("inside validateUser method return value for user details from DB :: " +userDetailsFromDb);
		return userDetailsFromDb;
	}
	
	public UserDetailsDto getUserDetailForSpecificName(UserDetailsDto userDetailsDto){
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		UserDetailsDto userDetailsFromDb = null;
		try {
			log.info("inside getUserDetailForSpecificName method value for user details object :: " + userDetailsDto);
			String allUserName = "SELECT * FROM "+CiddProperty.getProperty("SCHEMA_NAME")+".user " +
					"WHERE username = ? AND username != 'admin';";
			con = DbUtil.getConnection();
			pstmt = con.prepareStatement(allUserName);
			pstmt.setString(1, userDetailsDto.getUsername());
			log.info("inside getUserDetailForSpecificName method query for user detail :: " + pstmt);
			rs = pstmt.executeQuery();
			while(rs.next()){
				userDetailsFromDb = new UserDetailsDto();
				userDetailsFromDb.setUserId(rs.getString("user_id"));
				userDetailsFromDb.setName(rs.getString("name"));
				userDetailsFromDb.setUsername(rs.getString("username"));
				userDetailsFromDb.setPassword(rs.getString("password"));
				userDetailsFromDb.setEmailId(rs.getString("email"));
				userDetailsFromDb.setUserType(rs.getString("user_type"));
			}
		}catch(Exception ex) {
			ex.printStackTrace();
			log.error("exception inside getUserDetailForSpecificName method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		log.info("inside getUserDetailForSpecificName method return value for user details from DB :: " +userDetailsFromDb);
		return userDetailsFromDb;
	}
	
	public List<UserDetailsDto> getAllUserRecord(){
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		List<UserDetailsDto> userRecordList = new ArrayList<UserDetailsDto>();
		UserDetailsDto userDetailsFromDb = null;
		try {
			log.info("inside getAllUserRecord method value for all user record");
			String allUserRecord = "SELECT * FROM "+CiddProperty.getProperty("SCHEMA_NAME")+".user " +
					"WHERE user_type != 'Super Admin';";
			con = DbUtil.getConnection();
			pstmt = con.prepareStatement(allUserRecord);
			log.info("inside getAllUserRecord method query for all user record :: " + pstmt);
			rs = pstmt.executeQuery();
			while(rs.next()){
				userDetailsFromDb = new UserDetailsDto();
				userDetailsFromDb.setUserId(rs.getString("user_id"));
				userDetailsFromDb.setName(rs.getString("name"));
				userDetailsFromDb.setUsername(rs.getString("username"));
				userDetailsFromDb.setPassword(rs.getString("password"));
				userDetailsFromDb.setEmailId(rs.getString("email"));
				userDetailsFromDb.setUserType(rs.getString("user_type"));
				userRecordList.add(userDetailsFromDb);
			}
		}catch(Exception ex) {
			ex.printStackTrace();
			log.error("exception inside getAllUserRecord method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		log.info("inside getAllUserRecord method return size for all user record from DB :: " +userRecordList.size());
		return userRecordList;
	}
	
	public boolean addUserRecord(UserDetailsDto userDetailsDto){
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		boolean status = false;
		try{
			if (isNameOrUsernameExist(userDetailsDto) != true){
				con = DbUtil.getConnection();
				String createUser = "INSERT INTO "+CiddProperty.getProperty("SCHEMA_NAME")+".user " +
						"(name, username, password, email, user_type) VALUES (?, ?, ?, ?, ?);";
				pstmt = con.prepareStatement(createUser);
				pstmt.setString(1, userDetailsDto.getName());
				pstmt.setString(2, userDetailsDto.getUsername());
				pstmt.setString(3, userDetailsDto.getPassword());
				pstmt.setString(4, userDetailsDto.getEmailId());
				pstmt.setString(5, userDetailsDto.getUserType());
				int result = pstmt.executeUpdate();
				// connection.commit();
				log.info("inside addUserRecord method value for create user record :: "+pstmt);
				log.info("while creating user value for result :: "+result);
				//Creating a directory in the name of user
				File file = new File(CiddProperty.getProperty("DRIVE")+CiddProperty.getProperty("BACKSLASH")+
						CiddProperty.getProperty("CIDD_REPOSITORY")+CiddProperty.getProperty("BACKSLASH")+
						userDetailsDto.getUsername());
				if (!file.exists()) {
					if (file.mkdir()) {
						System.out.println("Directory is created in the name :"+userDetailsDto.getUsername());
					} else {
						System.out.println("Failed to create directory!");
					}
				}
				File file1 = new File(CiddProperty.getProperty("PYTHON_SCRIPT_PATH1")+
						CiddProperty.getProperty("BACKSLASH")+userDetailsDto.getUsername());
				if (!file1.exists()) {
					if (file1.mkdir()) {
						System.out.println("Directory is created in the name :: "+userDetailsDto.getUsername());
					} else {
						System.out.println("Failed to create directory!");
					}
				}
				
			    try {
			         File PropFile = new File(CiddProperty.getProperty("DRIVE")+CiddProperty.getProperty("BACKSLASH")+
								CiddProperty.getProperty("CIDD_REPOSITORY")+CiddProperty.getProperty("BACKSLASH")+
								userDetailsDto.getUsername()+CiddProperty.getProperty("BACKSLASH")+
								userDetailsDto.getUsername()+".properties");
			         if(!PropFile.exists()){
			         BufferedWriter output = new BufferedWriter(new FileWriter(PropFile));
			         output.close();
			         }
			    } catch (IOException ex) {
			         ex.printStackTrace();
			    }
			}else{
				status = true;
				System.out.println("This user is already present in the dBase");
			}
		}catch (Exception ex) {
			ex.printStackTrace();
			log.error("exception inside addUserRecord method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}		
		return status;
	}
	
	public boolean isNameOrUsernameExist(UserDetailsDto userDetailsDto){
		boolean status = false;
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		try{
			con = DbUtil.getConnection();
			String isNameAvailable = "SELECT name FROM "+CiddProperty.getProperty("SCHEMA_NAME")+".user WHERE " +
					"name = ?;";
			pstmt = con.prepareStatement(isNameAvailable);
			pstmt.setString(1, userDetailsDto.getName());
			log.info("inside isNameOrUsernameExist method query to check is name already present :: "+pstmt);
			rs = pstmt.executeQuery();
			if(rs.first()){
				status = true;
			}else{
				String isUsernameAvailable = "SELECT username " +
						"FROM "+CiddProperty.getProperty("SCHEMA_NAME")+".user WHERE " +
						"username = ?;";
				pstmt = con.prepareStatement(isUsernameAvailable);
				pstmt.setString(1, userDetailsDto.getUsername());
				log.info("inside isNameOrUsernameExist method query to check is name already present :: "+pstmt);
				rs = pstmt.executeQuery();
				if(rs.first()){
					status = true;
				}
			}
		}catch(Exception ex){
			ex.printStackTrace();
			log.error("exception inside isNameOrUsernameExist method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		return status;
	}
	
	public boolean removeUserRecord(UserDetailsDto userDetailsDto){
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		boolean status = false;
		try {
			log.info("inside removeUserRecord method value for user record :: "+userDetailsDto);
			String removeUserRecord = "DELETE " +
					"FROM "+CiddProperty.getProperty("SCHEMA_NAME")+".user " +
					"WHERE user_id IN ('"+userDetailsDto.getUserId()+"');";
			con = DbUtil.getConnection();
			pstmt = con.prepareStatement(removeUserRecord);
			log.info("inside removeUserRecord method query for remove user record :: "+pstmt);
			int result = pstmt.executeUpdate();
			log.info("inside removeUserRecord method value of result :: "+result);
			if(result > 0)
				status = true;
		}catch(Exception ex) {
			log.error("exception inside removeUserRecord method :: ",ex);
		}finally{
			DbUtil.closeDbResources(con, pstmt, rs);
		}
		return status;
	}
}

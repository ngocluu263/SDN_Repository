package com.gs.service.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DbUtil {
	private static String driverClassName = "com.mysql.jdbc.Driver";
	private static String url = "jdbc:mysql://10.75.15.81:3307/cidd";
	private static String userName = "root";
	private static String password = "root";
	
	static{
		try{
			Class.forName(driverClassName);
		}catch(ClassNotFoundException ex){
			ex.printStackTrace();
		}
	}
	
	public static Connection getConnection(){
		Connection con = null;
		try{
			con = DriverManager.getConnection(url, userName, password);
		}catch(SQLException ex){
			ex.printStackTrace();
		}
		return con;
	}
	
	public static void closeDbResources(Connection con, PreparedStatement pstmt, ResultSet rs){
		try{
			if(con != null){
				con.close();
			}
			if(pstmt != null){
				pstmt.close();
			}
			if(rs != null){
				rs.close();
			}
		}catch(Exception ex){
			ex.printStackTrace();
		}
	}
}

package com.gs.service.util;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

public class LoadPropertyFile extends HttpServlet {
	private static final long serialVersionUID = 1L;
	public static String APP_BASE_PATH = null;
       
    public LoadPropertyFile() {
      
    }
    
    public void init(ServletConfig config) throws ServletException {
    	APP_BASE_PATH = config.getServletContext().getRealPath("");
    	System.out.println("apllication base path :: "+APP_BASE_PATH);
    	CiddProperty.storePropery();
    }
}

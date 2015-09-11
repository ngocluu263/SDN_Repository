package com.gs.service.constants;

public interface CiddConstants {
	int ROW_INDEX_TWO = 2;
	int COLUMN_INDEX_ZERO = 0;
	int COLUMN_INDEX_ONE = 1;
	int COLUMN_INDEX_THREE = 3;
	int COLUMN_INDEX_TWO = 2;
	
	String TC_PASSED = "PASS";
	String TC_FAILED = "FAIL";
	String USERNAME = "username";
	String USERTYPE = "usertype";
	String PROJECTNAME="projectName";
	String CONFIGURATION_FILE = "/config.properties";
	
	// TestCase Management configs
	String TCM_URL_PATH ="tcmurl";
	String TCM_DEV_KEY = "devkey";
	String TMC_USERNAME = "tcmUser";
	String TMC_PASSWORD ="tcmPass";
	String TC_FILE_NAME = "TCFile";
	String TC_STATUS_FILE_NAME = "TCStatusSheet";
	
	String IPADDRESS_AVAILABLE = "AVAILABLE";
	String IPADDRESS_NOT_AVAILABLE = "NOT AVAILABLE";
	
	String CONTENT_TYPE_JSON = "application/json";
	
	//JIRA DETAILS
	String JIRA_IP = "bug_ip";
	//String JIRA_PORT ="8090";    //
	String JIRA_USER_NAME= "bugUsername";
	String JIRA_PASSWORD = "bugPwd";
	String Bug_Id="bugId";
	//JENKINS DETAILS
	String ROBOT_IP = "jenkIp";
	String ROBOT_PORT = "8083";
	String HTTP_SCHEME = "http";
	String JENKIN_USER="jenkUsername";
	String JENKIN_PWD="jenkPwd";
	
	
	String ROBOT_BASE_PATH = "robotBasepath";
	String ROBOT_IP_BASE_PATH = "robotIpBasepath";
	String TEST = "test";
	String NAME = "name";
	String STATUS = "status";
	String BACKSLASH = "\\";
	String FORWARDSLASH ="/";
	String EMPTY_STRING = "";
	String SPACE_STRING =" ";
	String JENKIN_DEFAULTPORT="8080";
	String CIDD_REPOSITORY="CIDD_repository";
	
	String NO_REPORTS_FOUND = "No reports found";
	String NO_TESTCASE_EXECUTED = "No testcases executed.";
	String TXT = ".txt";
	String TESTCASE_NAME = "testcasename";
	String PATH_PREFIX = "\\\\";
	String COLON = ":";
	String ROBOT_REST_SERVICE = "/RobotRestService";
	String USER_SPECIFIED_PATH = "userSpecifiedPath";
	String AVAILABLE = "available";
	
	String CONTENT_TYPE = "Content-Type";
	String ACCEPT = "Accept";
	String APPLICATION_JSON = "application/json";

	
	//Testlink
	
	String TESTPLAN="testPlanName";
	String EXPECTRESULT_FIELD="Expected Result";
	String PRIORITY_FIELD="Priority";
	String TESTSTEP_FIELD="TC steps";
	String TESTCYCLE_FIELD="Test Cycle";
	//String TESTLINK_PATH="tcmurl";
	//String DEVKEY="devkey";
	String TC_TESTLINK="Test Link";
	String TC_XL="Excel Sheet";
	String TEST_CASE_MANAGEMENT_TOOL="tcm_value";
	
	String REPORTS_PATH = "reporPath";
	String IP_REPORT_PATH = "ipReportPath";
	String PYTHON_SCRIPT_PATH = "pythonScriptPath";
	
	String PYTHON_SCRIPT_NAME = "pythonScriptName";
	String PYTHON_NEWSCRIPT_NAME = "jenkins_scriptNEW.py";
	String IP_RESOURCE_FILE_NAME = "ipResourceFileName";
	String ERROR_WHILE_CONVERTING_JSON_TO_OBJECT = "Erroe while converting json object";
	String ERROR_WHILE_GETTING_RESPONSE = "Error while getting response";
	
	String XLS_FILE_LOC="location";
	String outputXml="output.xml";
	//Email constants
	String EMAIL_FROM_ADDRESS = "emailFromAddress";
	String EMAIL_PASSWORD = "emailPassword";
	String SMTP_HOST_NAME = "emailSmtpHostName";
	String SMTP_PORT = "emailSmtpPort";
	//xls path
	
	String xlsName="TestCases.xls";
	String xlsPath="testCaseSriptpath";
	
	//WirelessRouter testscript path
	String scriptsLogPath="wirelessRouterTestScriptPath";
	String JENKINS_USER="admin";
	String PYTHON_SCRIPT_PATH1 = "C:\\ROBOTSERVER_FILES\\INPUT_FILE";
	String PYTHON_SCRIPT_NAME1 = "jenkins_script.py";
	
	//Scripts Path
	String EXECUTION_LOG_FILE_PATH = "C:\\ROBOTSERVER_FILES\\logs\\";
	String EXECUTION_COMMENTS_PATH = "C:\\ROBOTSERVER_FILES\\Logforbug\\logforbug.txt";
	//test case management tool
	String BUG_MGTOOL="bug_value";
	String BUG_MGTOOL_VALUE="JIRA";
	String BUG_MGT_TOOL="bug_value";
	
	//Excel file operation
	String EXCEL_SHEET_PATH="excelPath";
	String EXCEL_FILE_NAME="excelName"; 
	String EXCEL_FOLDER_PATH="tc_xlPath";
	
	//CL tool
	String CL_TOOL="cl_value";
	
	//CL tool
	String REPO_TOOL="repo_value";
	
	String TXT_FILE="C:\\CIDD_repository\\testCaseFile.txt";
	String REPORT="Report";
	
	String SHEETNAME="SheetName";
	String BUGID="bugId";
}

package com.gs.service.archive;

import java.util.HashMap;
import java.util.Map;

import com.gs.service.constants.CiddConstants;



public class GetUsername {
	
	private Map<String,String> projectNameHistory;
	//private String[] projectNameHistory;
	private static GetUsername getHistoryTracker;
	
	public GetUsername(){
		//Singleton 
		projectNameHistory =new HashMap<String, String>();
	}
	
	
	public static GetUsername getInstance(){
		if(null == getHistoryTracker){
			synchronized (GetUsername.class) {
				if(null== getHistoryTracker){
					getHistoryTracker = new GetUsername();
				}
			}
		}
		return getHistoryTracker;
	}
	
	public  void addProjectName(String projectname,String ProjectName){
		if(!projectNameHistory.containsKey(projectname)){
			projectNameHistory.put(projectname, ProjectName);
		}
	}
	
	public void setUsername(String key,String username){
		if(!projectNameHistory.containsKey(key)){
			projectNameHistory.put(key,username );
		}
	
	}
	
	public  String getBugId(){
		
			return projectNameHistory.get(CiddConstants.BUGID);
		
	}
	
	public void setBugId(String key,String bugId){
		if(!projectNameHistory.containsKey(key)){
			projectNameHistory.put(key,bugId );
		}
	
	}
	
	public void removeBugId(String bugId){
		//Remove user execution history from map
		projectNameHistory.remove(bugId);
	
	}
	
	public String  getUsername(String username){
		String US=null;
		try{
			US=projectNameHistory.get(username );
		}
		catch(Exception e){
			System.out.println(e.toString());
		}
		return US;
	}
	
	public void removeUserName(String username){
		//Remove user execution history from map
		projectNameHistory.remove(username);
	
	}
	public void setResult(String key,String result){
		if(!projectNameHistory.containsKey(key)){
			projectNameHistory.put(key, result);
			System.out.println("%%%%%%%%%%%%%%%%%%%%%%55555");
		}
		
	
	}
	
	public String  getResult(String key){
		String US=null;
		try{
			US=projectNameHistory.get(key);
		}
		catch(Exception e){
			System.out.println(e.toString());
		}
		return US;
	}
	
	public void removeResult(String key){
		//Remove user execution history from map
		projectNameHistory.remove(key);
	}
	
	public  void addtestPlanName(String username,String testPlan){
		if(!projectNameHistory.containsKey(username)){
			projectNameHistory.put(username, testPlan);
			
		}
	}
	
	public void clearUserExecutionHistory(String username){
		
	}
	public String getTestPlanName(String username){
		return projectNameHistory.get(username);

	}

	public String getProjectName(String projectname){
		return projectNameHistory.get(projectname);

	}

	public void removeTestPlan(String username){
		//Remove user execution history from map
		projectNameHistory.remove(username);
	}
	
	public void removeTestProject(String projectname){
		//Remove user execution history from map
		projectNameHistory.remove(projectname);
	}
	
	
}

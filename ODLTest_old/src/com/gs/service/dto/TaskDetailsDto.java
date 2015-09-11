package com.gs.service.dto;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "TaskDetailsDto")
public class TaskDetailsDto {
	private String sprintId;
	private String sprintName;
	private String taskId;
	private String taskDescription;
	private String taskStatus;
	private String taskStartDate;
	private String taskEndDate;
	private String taskDuration;
	private String userStoryId;
	public String getSprintId() {
		return sprintId;
	}
	public void setSprintId(String sprintId) {
		this.sprintId = sprintId;
	}
	public String getSprintName() {
		return sprintName;
	}
	public void setSprintName(String sprintName) {
		this.sprintName = sprintName;
	}
	public String getTaskId() {
		return taskId;
	}
	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}
	public String getTaskDescription() {
		return taskDescription;
	}
	public void setTaskDescription(String taskDescription) {
		this.taskDescription = taskDescription;
	}
	public String getTaskStatus() {
		return taskStatus;
	}
	public void setTaskStatus(String taskStatus) {
		this.taskStatus = taskStatus;
	}
	public String getTaskStartDate() {
		return taskStartDate;
	}
	public void setTaskStartDate(String taskStartDate) {
		this.taskStartDate = taskStartDate;
	}
	public String getTaskEndDate() {
		return taskEndDate;
	}
	public void setTaskEndDate(String taskEndDate) {
		this.taskEndDate = taskEndDate;
	}
	public String getTaskDuration() {
		return taskDuration;
	}
	public void setTaskDuration(String taskDuration) {
		this.taskDuration = taskDuration;
	}
	
	
	
	public String getUserStoryId() {
		return userStoryId;
	}
	public void setUserStoryId(String userStoryId) {
		this.userStoryId = userStoryId;
	}
	@Override
	public String toString() {
		return "[sprintId="+sprintId+", sprintName="+sprintName+", taskId="+taskId+
			", taskDescription="+taskDescription+", taskStatus="+taskStatus+", taskStartDate="+taskStartDate+
			", taskEndDate="+taskEndDate+", taskDuration="+taskDuration+", userStoryId="+userStoryId;
	}
}

package com.gs.service.dto;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement (name = "TestDetailsDto")
public class TestDetailsDto {
	private String sprintId;
	private String sprintName;
	private String taskId;
	private String taskDescription;
	private String userStoryId;
	private String userStoryName;
	private String testId;
	private String testAssignedTo;
	private String assignedTo;
	private String assignedName;
	private String testStatus;
	private String testSummary;
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
	public String getUserStoryId() {
		return userStoryId;
	}
	public void setUserStoryId(String userStoryId) {
		this.userStoryId = userStoryId;
	}
	public String getUserStoryName() {
		return userStoryName;
	}
	public void setUserStoryName(String userStoryName) {
		this.userStoryName = userStoryName;
	}
	public String getTestId() {
		return testId;
	}
	public void setTestId(String testId) {
		this.testId = testId;
	}
	public String getTestAssignedTo() {
		return testAssignedTo;
	}
	public void setTestAssignedTo(String testAssignedTo) {
		this.testAssignedTo = testAssignedTo;
	}
	public String getAssignedTo() {
		return assignedTo;
	}
	public void setAssignedTo(String assignedTo) {
		this.assignedTo = assignedTo;
	}
	public String getAssignedName() {
		return assignedName;
	}
	public void setAssignedName(String assignedName) {
		this.assignedName = assignedName;
	}
	public String getTestStatus() {
		return testStatus;
	}
	public void setTestStatus(String testStatus) {
		this.testStatus = testStatus;
	}
	public String getTestSummary() {
		return testSummary;
	}
	public void setTestSummary(String testSummary) {
		this.testSummary = testSummary;
	}
	@Override
	public String toString() {
		return "[sprintId="+sprintId+", sprintName="+sprintName+
			", taskId="+taskId+", taskDescription="+taskDescription+
			", userStoryId="+userStoryId+", userStoryName="+userStoryName+
			", testId="+testId+", testAssignedTo="+testAssignedTo+
			", assignedTo="+assignedTo+", assignedName="+assignedName+
			", testStatus="+testStatus+", testSummary="+testSummary+"]";
	}
}

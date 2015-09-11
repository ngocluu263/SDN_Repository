package com.gs.service.dto;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "BugDetailsDto")
public class BugDetailsDto {
	private String bugId;
	private String sprintId;
	private String sprintName;
	private String userStoryId;
	private String userStoryName;
	private String taskId;
	private String taskDescription;
	private String testId;
	private String testSummary;
	private String assignedTo;
	private String assignedName;
	private String bugTitle;
	private String bugDescription;
	private String bugSeverity;
	private String bugStatus;
	public String getBugId() {
		return bugId;
	}
	public void setBugId(String bugId) {
		this.bugId = bugId;
	}
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
	public String getTestId() {
		return testId;
	}
	public void setTestId(String testId) {
		this.testId = testId;
	}
	public String getTestSummary() {
		return testSummary;
	}
	public void setTestSummary(String testSummary) {
		this.testSummary = testSummary;
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
	public String getBugTitle() {
		return bugTitle;
	}
	public void setBugTitle(String bugTitle) {
		this.bugTitle = bugTitle;
	}
	public String getBugDescription() {
		return bugDescription;
	}
	public void setBugDescription(String bugDescription) {
		this.bugDescription = bugDescription;
	}
	public String getBugSeverity() {
		return bugSeverity;
	}
	public void setBugSeverity(String bugSeverity) {
		this.bugSeverity = bugSeverity;
	}
	public String getBugStatus() {
		return bugStatus;
	}
	public void setBugStatus(String bugStatus) {
		this.bugStatus = bugStatus;
	}
	@Override
	public String toString() {
		return "[bugId="+bugId+", sprintId="+sprintId+", sprintName="+sprintName+
			", userStoryId="+userStoryId+", userStoryName="+userStoryName+
			", taskId="+taskId+", taskDescription="+taskDescription+
			", testId="+testId+", testSummary="+testSummary+
			", assignedTo="+assignedTo+", assignedName="+assignedName+
			", bugTitle="+bugTitle+", bugDescription="+bugDescription+
			", bugSeverity="+bugSeverity+", bugStatus="+bugStatus+"]";
	}
}

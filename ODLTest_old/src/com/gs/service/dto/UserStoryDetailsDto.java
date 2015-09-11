package com.gs.service.dto;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "UserStoryDetailsDto")
public class UserStoryDetailsDto {
	private String userStoryId;
	private String userStoryName;
	private String userStoryStatus;
	private String userStoryAsA;
	private String userStoryDescription;
	private String userStorySprintId;
	private String userStorySprintName;
	private String userStoryReleaseId;
	private String userStoryReleaseName;
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
	public String getUserStoryStatus() {
		return userStoryStatus;
	}
	public void setUserStoryStatus(String userStoryStatus) {
		this.userStoryStatus = userStoryStatus;
	}
	public String getUserStoryAsA() {
		return userStoryAsA;
	}
	public void setUserStoryAsA(String userStoryAsA) {
		this.userStoryAsA = userStoryAsA;
	}
	public String getUserStoryDescription() {
		return userStoryDescription;
	}
	public void setUserStoryDescription(String userStoryDescription) {
		this.userStoryDescription = userStoryDescription;
	}
	public String getUserStorySprintId() {
		return userStorySprintId;
	}
	public void setUserStorySprintId(String userStorySprintId) {
		this.userStorySprintId = userStorySprintId;
	}
	public String getUserStorySprintName() {
		return userStorySprintName;
	}
	public void setUserStorySprintName(String userStorySprintName) {
		this.userStorySprintName = userStorySprintName;
	}
	public String getUserStoryReleaseId() {
		return userStoryReleaseId;
	}
	public void setUserStoryReleaseId(String userStoryReleaseId) {
		this.userStoryReleaseId = userStoryReleaseId;
	}
	public String getUserStoryReleaseName() {
		return userStoryReleaseName;
	}
	public void setUserStoryReleaseName(String userStoryReleaseName) {
		this.userStoryReleaseName = userStoryReleaseName;
	}
	@Override
	public String toString() {
		return "[userStoryId="+userStoryId+", userStoryName="+userStoryName+", userStoryStatus="+userStoryStatus+
				", userStoryAsA="+userStoryAsA+", userStoryDescription="+userStoryDescription+
				", userStorySprintId="+userStorySprintId+", userStorySprintName="+userStorySprintName+
				", userStoryReleaseId="+userStoryReleaseId+", userStoryReleaseName="+userStoryReleaseName+"]";
	}
}

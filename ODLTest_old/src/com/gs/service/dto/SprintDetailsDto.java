package com.gs.service.dto;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "SprintDetailsDto")
public class SprintDetailsDto {
	private String releaseId;
	private String releaseName;
	private String sprintId;
	private String sprintName;
	private String sprintStartDate;
	private String sprintEndDate;
	private String sprintDuration;
	private String sprintItem;
	private String sprintStatus;
	public String getReleaseId() {
		return releaseId;
	}
	public void setReleaseId(String releaseId) {
		this.releaseId = releaseId;
	}
	public String getReleaseName() {
		return releaseName;
	}
	public void setReleaseName(String releaseName) {
		this.releaseName = releaseName;
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
	public String getSprintStartDate() {
		return sprintStartDate;
	}
	public void setSprintStartDate(String sprintStartDate) {
		this.sprintStartDate = sprintStartDate;
	}
	public String getSprintEndDate() {
		return sprintEndDate;
	}
	public void setSprintEndDate(String sprintEndDate) {
		this.sprintEndDate = sprintEndDate;
	}
	public String getSprintDuration() {
		return sprintDuration;
	}
	public void setSprintDuration(String sprintDuration) {
		this.sprintDuration = sprintDuration;
	}
	public String getSprintItem() {
		return sprintItem;
	}
	public void setSprintItem(String sprintItem) {
		this.sprintItem = sprintItem;
	}
	public String getSprintStatus() {
		return sprintStatus;
	}
	public void setSprintStatus(String sprintStatus) {
		this.sprintStatus = sprintStatus;
	}
	@Override
	public String toString() {
		return "[releaseId="+releaseId+", releaseName="+releaseName+", sprintName="+sprintName+
				", sprintStartDate="+sprintStartDate+", sprintEndDate="+sprintEndDate+
				", sprintDuration="+sprintDuration+", sprintItem="+sprintItem+", sprintStatus="+sprintStatus+"]";
	}
}

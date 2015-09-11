package com.gs.service.dto;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "ProjectDetailsDto")
public class ProjectDetailsDto {
	private String projectId;
	private String projectName;
	
	public String getProjectId() {
		return projectId;
	}

	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	@Override
	public String toString() {
		return "[projectId="+projectId+", projectName="+projectName+"]";
	}
}

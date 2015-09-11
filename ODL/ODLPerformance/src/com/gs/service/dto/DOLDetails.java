package com.gs.service.dto;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "DOLDetails")
public class DOLDetails {
	private String numOfSwitches;
	private String vmIp;
	private String numOfRuns;
	private String vmUN;
	private String duration;
	private String vmPW;
	private String processors;
	private String restartOption;
	public String getNumOfSwitches() {
		return numOfSwitches;
	}
	public void setNumOfSwitches(String numOfSwitches) {
		this.numOfSwitches = numOfSwitches;
	}
	public String getVmIp() {
		return vmIp;
	}
	public void setVmIp(String vmIp) {
		this.vmIp = vmIp;
	}
	public String getNumOfRuns() {
		return numOfRuns;
	}
	public void setNumOfRuns(String numOfRuns) {
		this.numOfRuns = numOfRuns;
	}
	public String getVmUN() {
		return vmUN;
	}
	public void setVmUN(String vmUN) {
		this.vmUN = vmUN;
	}
	public String getDuration() {
		return duration;
	}
	public void setDuration(String duration) {
		this.duration = duration;
	}
	public String getVmPW() {
		return vmPW;
	}
	public void setVmPW(String vmPW) {
		this.vmPW = vmPW;
	}
	public String getProcessors() {
		return processors;
	}
	public void setProcessors(String processors) {
		this.processors = processors;
	}
	public String getRestartOption() {
		return restartOption;
	}
	public void setRestartOption(String restartOption) {
		this.restartOption = restartOption;
	}
	@Override
	public String toString() {
		return "[numOfSwitches="+numOfSwitches+", vmIp="+vmIp+", numOfRuns="+numOfRuns+
			", vmUN="+vmUN+", duration="+duration+", vmPW="+vmPW+
			", processors="+processors+", restartOption="+restartOption;
	}
	
	

}

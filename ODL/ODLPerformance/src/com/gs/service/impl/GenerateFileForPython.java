package com.gs.service.impl;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;

import net.neoremind.sshxcute.core.ConnBean;
import net.neoremind.sshxcute.core.SSHExec;
import net.neoremind.sshxcute.exception.TaskExecFailException;
import net.neoremind.sshxcute.task.CustomTask;
import net.neoremind.sshxcute.task.impl.ExecCommand;

import com.gs.service.dto.DOLDetails;

public class GenerateFileForPython {
	
	public void writeFileInDisk(DOLDetails dOLDetails)
	{
		File file = new File("C:/RemoteExecution/odltestconfig.py");
		//if (!file.exists()) {
			try {
				file.createNewFile();
				FileOutputStream fos = new FileOutputStream(file);
				 
				BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(fos));
			 
				
					bw.write("numberofswitches = "+dOLDetails.getNumOfSwitches() );
					bw.newLine();
					bw.write("numberofruns = "+dOLDetails.getNumOfRuns() );
					bw.newLine();
					bw.write("runduration = "+dOLDetails.getDuration() );
					bw.newLine();
					bw.write("numberofprocessors = "+dOLDetails.getProcessors());
					bw.newLine();
					bw.write("vmip = '"+dOLDetails.getVmIp()+"'" );
					bw.newLine();
					bw.write("vmusername = '"+dOLDetails.getVmUN()+"'" );
					bw.newLine();
					bw.write("vmpassword = '"+dOLDetails.getVmPW()+"'" );
					bw.newLine();
					bw.write("restartodl = '"+dOLDetails.getRestartOption()+"'" );
					
					
				
			 
				bw.close();
				
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		//}
		}
	public static void main(String[] arg)
	{
		DOLDetails dOLDetails = new  DOLDetails();
		dOLDetails.setDuration("500");
		dOLDetails.setNumOfRuns("6");
		dOLDetails.setNumOfSwitches("4");
		dOLDetails.setProcessors("6");
		dOLDetails.setRestartOption("yes");
		dOLDetails.setVmIp("5:");
		dOLDetails.setVmPW("wf");
		dOLDetails.setVmUN("desrfe");
		
		new GenerateFileForPython().writeFileInDisk(dOLDetails);
		
		try {
			Process p = Runtime.getRuntime().exec("python C:/RemoteExecution/dummy.py");
			
			p.waitFor();
			//System.out.println("Exit value is"+p.exitValue());
		    //Thread.sleep(1000);
		    System.out.println(p.exitValue());
		} catch (IOException | InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	}


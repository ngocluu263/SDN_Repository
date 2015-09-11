package com.gs.service.util;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;


public class FileOperationSystem {
	private static Logger log = Logger.getLogger(FileOperationSystem.class);
	private static FileOperationSystem fileOperation = new FileOperationSystem();

	public static FileOperationSystem getInstance() {
		return fileOperation;
	}

	private FileOperationSystem() {
		// Singleton
	}
	
	public List<String> getFileContentAsList(String fileName)
			throws FileNotFoundException, IOException {
		// List<String> lines = Files.readAllLines(Paths.get(fileName),
		// StandardCharsets.UTF_8);
		// log.debug("Lines are : " + lines);
		List<String> lines = new ArrayList<String>();
		BufferedReader br = null;
		try {
			br = new BufferedReader(new FileReader(fileName));
			String line = null;
			while ((line = br.readLine()) != null) {
				if (!UtilClass.checkNullOrEmpty(line)) {
					lines.add(line.trim());
				}
			}
			return lines;
		} finally {
			try {
				if (br != null) {
					br.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	public String getFileContentAsString(String fileName) throws IOException {
		String content = new String(Files.readAllBytes(Paths.get(fileName)));
		log.debug("File content is : " + content);
		return content;
	}

	public void saveFileContent(String fileName, List<String> lines) throws IOException {
		if (!lines.isEmpty()) {
			BufferedWriter bw = null;
			try {
				bw = new BufferedWriter(new FileWriter(fileName));
				for (String line : lines) {
					bw.write(line);
					bw.newLine();
				}
			} finally {
				try {
					if (bw != null) {
						bw.close();
					}
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}

	}

	public void saveFileContent(String fileName, String content) throws FileNotFoundException {
		PrintWriter printWriter = new PrintWriter(fileName);
		printWriter.write(content);
		printWriter.close();
	}

	public void clearFileContent(String fileName) throws FileNotFoundException {
		File file = new File(fileName);
		if (file.exists()) {
			PrintWriter printWriter = new PrintWriter(fileName);
			printWriter.close();
		}
	}

	public void clearFileContent(File file) throws FileNotFoundException {
		if (file.exists()) {
			PrintWriter printWriter = new PrintWriter(file);
			printWriter.close();
		}
	}

	public void deletFile(String fileName) throws IOException {
		//Files.deleteIfExists(Paths.get(fileName));
		File file=new File(fileName);
		if(file.exists()){
			FileUtils.cleanDirectory(file);
		}
		else{
			log.info("File "+file +"does not exists");
		}
	}

	public boolean isFileExists(String fileName){
		File file = new File(fileName);
		return file.exists();
	}
}
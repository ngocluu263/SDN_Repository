/*package com.gs.service.util;

import java.sql.SQLException;
import java.util.Date;
import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.apache.log4j.Logger;
import org.json.JSONException;

import com.gs.service.constants.EmailConstant;
import com.gs.service.dto.UserDetailsDto;

public class EmailNotification {

	private static Logger log = Logger.getLogger(EmailNotification.class);

	public static boolean sendEmailNotification(UserDetailsDto userDetailDto,
			String action) throws JSONException, SQLException {
		boolean result = false;
		// UserDetailsDao UserDetails = UserDetailsDao.getInstatnce();
		// UserDetailsDto UserDetail=null;
		String username = null;
		String toAddress = null;
		String pwd = null;
		StringBuffer body = new StringBuffer();
		// To address
		try {
			log.info("entering Email method....");
			// UserDetail=UserDetails.getUserDetails(username);
			toAddress = userDetailDto.getEmailId();
			username = userDetailDto.getUsername();
			pwd = userDetailDto.getPassword();
			// Get the details from configurations
			// Properties properties = UtilClass.getProperties();
			final String fromAddress = EmailConstant.FROM_ADDRESS;
			final String password = EmailConstant.PASSWORD;
			final String host = EmailConstant.HOST;
			final String port = EmailConstant.PORT;
			log.info("Email details are : " + "From address : " + fromAddress
					+ " Password : " + password + " host name:" + host
					+ " port: " + port);
			// String body = "Dear" + name;
			String sub = "CIDD Online Portal Credentials";
			log.info("User Details are : " + "User Name : " + username
					+ "Password Name : " + pwd + "email ID : " + toAddress);
			if (!UtilClass.checkNullOrEmpty(toAddress)
					&& !UtilClass.checkNullOrEmpty(username)
					&& !UtilClass.checkNullOrEmpty(pwd)) {
				if (action.equalsIgnoreCase(EmailConstant.ADDUSER)) {
					body.append("Dear " + username)
							.append(",")
							.append("\n")
							.append("Your Online Credentials for CIDD portal is")
							.append("\n").append("username : " + username)
							.append("\n").append("password : " + pwd);
					log.info("Inside Add User email");
				} else {
					body.append("Dear " + username)
							.append(",")
							.append("\n")
							.append("Your Online Credentials for CIDD portal has been removed")
							.append("\n");
				}
				Properties props = new Properties();
				props.put("mail.smtp.host", host);
				props.put("mail.smtp.port", port);
				props.put("mail.smtp.auth", "true");
				// If true then need to provide
				// username and password.

				props.put("mail.smtp.ssl.enable", false);
				props.put("mail.smtp.starttls.enable", true);
				// props.setProperty("mail.smtp.ssl.trust", "smtpserver");
				log.info("Properties setting...");
				log.info("Authentication is adding...");
				Authenticator authenticator = new Authenticator() {
					protected PasswordAuthentication getPasswordAuthentication() {
						return new PasswordAuthentication(fromAddress, password);
					}
				};

				log.info("Session is creating");
				Session session = Session.getInstance(props, authenticator);
				session.setDebug(true); // This will print out the current
										// session's activities.
				log.info("MIME is creating..");
				MimeMessage message = new MimeMessage(session);
				message.setFrom(new InternetAddress(fromAddress));

				message.setFrom(new InternetAddress(fromAddress));
				InternetAddress[] address = { new InternetAddress(toAddress) };
				message.setRecipients(Message.RecipientType.TO, address);
				message.setSubject(sub);
				message.setSentDate(new Date());
				// message.setText(body);
				// 3) create MimeBodyPart object and set your message text
				BodyPart messageBodyPart = new MimeBodyPart();
				// ((Message) messageBodyPart).setSubject(sub);
				messageBodyPart.setText(body.toString());
				Multipart multipart = new MimeMultipart();
				multipart.addBodyPart(messageBodyPart);
				message.setContent(multipart);
				log.info("mail is sending...");
				// }
				Transport.send(message);
				log.info("Mail sent successfully");
				result = true;
			} else {
				if (action.equalsIgnoreCase(EmailConstant.ExecutionStopped)) {
					body.append("Dear " + username).append(",").append("\n")
							.append("Job Not found in Jenkins").append("\n");
					log.info("Inside ExecutionStopped");
					Properties props = new Properties();
					props.put("mail.smtp.host", host);
					props.put("mail.smtp.port", port);
					props.put("mail.smtp.auth", "true"); // If true then need to
															// provide
															// username and
															// password.

					props.put("mail.smtp.ssl.enable", false);
					props.put("mail.smtp.starttls.enable", true);
					// props.setProperty("mail.smtp.ssl.trust", "smtpserver");

					log.info("Properties setting...");
					log.info("Authentication is adding...");
					Authenticator authenticator = new Authenticator() {
						protected PasswordAuthentication getPasswordAuthentication() {
							return new PasswordAuthentication(fromAddress,
									password);
						}
					};

					log.info("Session is creating");
					Session session = Session.getInstance(props, authenticator);
					session.setDebug(true); // This will print out the current
											// session's activities.

					log.info("MIME is creating..");

					MimeMessage message = new MimeMessage(session);
					message.setFrom(new InternetAddress(fromAddress));
					if (username != null) {
						username = username.replace("[", "");
						username = username.replace("]", "");
						String[] emailList = username.split(",");

						//InternetAddress[] mailAddress_TO = new InternetAddress[emailList.length];
						for (int i = 0; i < emailList.length; i++) {
							System.out.println("Email Id ares " + emailList[i]+ "**********8");
							if (emailList[i] != null && !emailList[i].isEmpty()) {

								message.setRecipients(Message.RecipientType.TO, emailList[i]);
								message.setSubject("Job Not found in Jenkins");
								message.setSentDate(new Date());

								BodyPart messageBodyPart = new MimeBodyPart();
								messageBodyPart.setText("No job in jenkins");

								Multipart multipart = new MimeMultipart();
								multipart.addBodyPart(messageBodyPart);
								message.setContent(multipart);
								log.info("mail is sending...");
								Transport.send(message);
								log.info("Mail sent successfully");

							}
							result = true;
						}
					}
				}
			}
		} catch (MessagingException ex) {
			ex.printStackTrace();
		}
		return result;

	}

	public static boolean sendEmailNotificationForForgotPwd(UserDetailsDto userDetailDto) throws JSONException {
		boolean result = false;
		try {
			log.info("entering Email method for forgot password....");
			final String fromAddress = EmailConstant.FROM_ADDRESS;
			final String password = EmailConstant.PASSWORD;
			final String host = EmailConstant.HOST;
			System.out.println(host + "##########################3");
			final String port = EmailConstant.PORT;
			log.info("Email details are : " + "From address : " + fromAddress
					+ " Password : " + password + " host name : " + host
					+ " port: " + port);
			StringBuffer body = new StringBuffer();
			Properties props = new Properties();
			props.put("mail.smtp.host", host);
			props.put("mail.smtp.port", port);
			props.put("mail.smtp.auth", "true"); // If true then need to provide
			props.put("mail.smtp.ssl.enable", false);
			props.put("mail.smtp.starttls.enable", true);
			log.info("Authenticating...");
			Authenticator authenticator = new Authenticator() {
				protected PasswordAuthentication getPasswordAuthentication() {
					return new PasswordAuthentication(fromAddress, password);
				}
			};
			log.info("Creating session..");
			Session session = Session.getInstance(props, authenticator);
			session.setDebug(true); // This will print out the current session's
									// activities.
			log.info("Creating MIME.."+userDetailDto.getEmailId());
			MimeMessage message = new MimeMessage(session);
			message.setFrom(new InternetAddress(fromAddress));
			InternetAddress[] address = { new InternetAddress(userDetailDto.getEmailId()) };
			message.setRecipients(Message.RecipientType.TO, address);
			message.setSubject("CIDD user password recovery");
			message.setSentDate(new Date());
			body.append("Dear user, \n\nThe password for your login is :" + userDetailDto.getPassword()
					+ "\n\nRegards");
			BodyPart messageBodyPart = new MimeBodyPart();
			messageBodyPart.setText(body.toString());
			Multipart multipart = new MimeMultipart();
			multipart.addBodyPart(messageBodyPart);
			message.setContent(multipart);
			log.info("Sending Mail...");
			Transport.send(message);
			log.info("Mail sent successfully");
			result = true;
		} catch (MessagingException ex) {
			ex.printStackTrace();
		}
		return result;
	}

	public static void main(String[] args) throws JSONException, SQLException {
		//sendEmailNotification("[pushpa@tataelxsi.co.in,pushpa@tataelxsi.co.in]", "ExecutionStopped");
	}

}
*/
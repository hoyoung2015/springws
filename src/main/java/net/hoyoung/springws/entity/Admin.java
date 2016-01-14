package net.hoyoung.springws.entity;

import java.io.Serializable;

public class Admin implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -3844911281844942640L;
	private int id;
	private String username;
	private String password;
	private int logTime;
	private int joinTime;
	private boolean lock;
	private String logIp;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public int getLogTime() {
		return logTime;
	}
	public void setLogTime(int logTime) {
		this.logTime = logTime;
	}
	public int getJoinTime() {
		return joinTime;
	}
	public void setJoinTime(int joinTime) {
		this.joinTime = joinTime;
	}
	public boolean isLock() {
		return lock;
	}
	public void setLock(boolean lock) {
		this.lock = lock;
	}
	public String getLogIp() {
		return logIp;
	}
	public void setLogIp(String logIp) {
		this.logIp = logIp;
	}
	
	
}

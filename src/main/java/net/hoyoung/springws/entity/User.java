package net.hoyoung.springws.entity;

import java.util.List;

public class User {
	private int id;
	//用户名
	private String username;
	//密码
	private String password;
	//openId
	private String openId;
	//电话号码
	private String phone;
	//图片url
	private String photo;
	//注册时间
	private long joinTime;
	//登陆ip
	private String logIp;
	//登陆时间
	private long logTime;
	private int level;
	public int getLevel() {
		return level;
	}
	public void setLevel(int level) {
		this.level = level;
	}
	private String info;
	private int coupons;
	public int getCoupons() {
		return coupons;
	}
	public void setCoupons(int coupons) {
		this.coupons = coupons;
	}
	public String getInfo() {
		return info;
	}
	public void setInfo(String info) {
		this.info = info;
	}
	//积分
	private int score;
	//能量
	private int energy;
	//经度
	private float lng;
	//纬度
	private float lat;

	public float getLng() {
		return lng;
	}
	public void setLng(float lng) {
		this.lng = lng;
	}
	public float getLat() {
		return lat;
	}
	public void setLat(float lat) {
		this.lat = lat;
	}
	public int getEnergy() {
		return energy;
	}
	public void setEnergy(int energy) {
		this.energy = energy;
	}
	private String devSn;
	public String getOpenId() {
		return openId;
	}
	public void setOpenId(String openId) {
		this.openId = openId;
	}
	public String getDevSn() {
		return devSn;
	}
	public void setDevSn(String devSn) {
		this.devSn = devSn;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public long getJoinTime() {
		return joinTime;
	}
	public void setJoinTime(long l) {
		this.joinTime = l;
	}
	public String getLogIp() {
		return logIp;
	}
	public void setLogIp(String logIp) {
		this.logIp = logIp;
	}
	public long getLogTime() {
		return logTime;
	}
	public void setLogTime(long logTime) {
		this.logTime = logTime;
	}
	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", password="
				+ password + ", openId=" + openId + ", phone=" + phone
				+ ", photo=" + photo + ", joinTime=" + joinTime + ", logIp="
				+ logIp + ", logTime=" + logTime + ", score=" + score
				+ ", energy=" + energy + ", devSn=" + devSn + "]";
	}
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
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
}

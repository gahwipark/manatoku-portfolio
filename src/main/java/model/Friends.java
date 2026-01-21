package model;

public class Friends {
	
	private int ucode;
	private int friendUcode;
	private String friendId;
	private String friendName;
	private String friendStat;
	
	public String getFriendStat() {
		return friendStat;
	}
	public void setFriendStat(String friendStat) {
		this.friendStat = friendStat;
	}
	public int getUcode() {
		return ucode;
	}
	public void setUcode(int ucode) {
		this.ucode = ucode;
	}
	public int getFriendUcode() {
		return friendUcode;
	}
	public void setFriendUcode(int friendUcode) {
		this.friendUcode = friendUcode;
	}
	public String getFriendId() {
		return friendId;
	}
	public void setFriendId(String friendId) {
		this.friendId = friendId;
	}
	public String getFriendName() {
		return friendName;
	}
	public void setFriendName(String friendName) {
		this.friendName = friendName;
	}
	
	
}

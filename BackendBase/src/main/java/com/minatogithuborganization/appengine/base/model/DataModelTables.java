package com.minatogithuborganization.appengine.base.model;

import java.util.HashMap;
import java.util.Map;

public enum DataModelTables {
	APPLICATION_USER("Application User"),
	TABLE123("table123");

	private static final Map<String, DataModelTables> displayNameMap = new HashMap<>();
	static {
		for (DataModelTables displayNameEnum : DataModelTables.values()) {
			displayNameMap.put(displayNameEnum.getDisplayName(), displayNameEnum);
		}
	}
	private String displayName;

	DataModelTables(String displayName) {
		this.displayName = displayName;
	}

	public static DataModelTables getDisplayNameEnum(String displayName) {
		return displayNameMap.get(displayName);
	}

	public String getDisplayName() {
		return displayName;
	}
}

package com.minatogithuborganization.appengine.base.service;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import com.vs.rappit.base.dal.providers.PersistenceType;
import com.vs.rappit.base.acl.AllowedFields;
import com.vs.rappit.base.authentication.logic.AppUserPrivilegeCache;
import com.vs.rappit.base.acl.IPerimeterManager;
import com.minatogithuborganization.appengine.model.Roles;
import com.minatogithuborganization.appengine.base.model.Table123Base;
import com.minatogithuborganization.appengine.base.model.ApplicationUserBase;
import com.minatogithuborganization.appengine.base.model.constants.Table123ConstantBase;
import org.springframework.stereotype.Component;
import org.apache.commons.lang3.BooleanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Collections;


@Component
public abstract class Table123PerimeterBaseImpl<T extends Table123Base> implements IPerimeterManager<T>, Table123ConstantBase {
	
	@Autowired
	private AppUserPrivilegeCache<ApplicationUserBase> userCache;
	
	@Override
	public boolean canCreate(T model) {
		ApplicationUserBase userBase = (ApplicationUserBase) userCache.getCurrentUser();
		if (userBase != null) {
			for (String role : userBase.getUserRoles()) {
				Roles roleName = Roles.getRoleNameEnum(role);
				switch (roleName) {
					case DEVADMIN:
						
				case APP_ADMIN: 

				return true;
					default:
						break;
				}
			}
		}
		return false;
	}

	@Override
	public boolean canUpdate(T model) {
		ApplicationUserBase userBase = (ApplicationUserBase) userCache.getCurrentUser();
		if (userBase != null) {
			for (String role : userBase.getUserRoles()) {
				Roles roleName = Roles.getRoleNameEnum(role);
				switch (roleName) {
					case DEVADMIN:
						
				case APP_ADMIN: 

				return true;
					default:
						break;
				}
			}
		}
		return false;
	}

	@Override
	public boolean canDelete(T model) {
		ApplicationUserBase userBase = (ApplicationUserBase) userCache.getCurrentUser();
		if (userBase != null) {
			for (String role : userBase.getUserRoles()) {
				Roles roleName = Roles.getRoleNameEnum(role);
				switch (roleName) {
					case DEVADMIN:
						
				case APP_ADMIN: 

				return true;
					default:
						break;
				}
			}
		}
		return false;
	}

	@Override
	public boolean canRead(T model) {
		ApplicationUserBase userBase = (ApplicationUserBase) userCache.getCurrentUser();
		if (userBase != null) {
			for (String role : userBase.getUserRoles()) {
				Roles roleName = Roles.getRoleNameEnum(role);
				switch (roleName) {
					case DEVADMIN:
						
				case APP_ADMIN: 

				return true;
					default:
						break;
				}
			}
		}
		return false;
	}

	@Override
	public String getAccessQuery(PersistenceType type) {
		return null;
	}

	@Override
	public AllowedFields getSelectFields(PersistenceType type) {
		AllowedFields allowedFields = new AllowedFields();
		ApplicationUserBase userBase = (ApplicationUserBase) userCache.getCurrentUser();
		setReadFields(userBase, allowedFields);
		setWriteFields(userBase, allowedFields);
		return allowedFields;
	}
	
	protected void setReadFields(ApplicationUserBase userBase, AllowedFields allowedFields) {
		Set<String> allowedAccessFields = new HashSet<>();
		allowedAccessFields.addAll(getTechnicalFields());
		if(userBase == null) {
			List<String> allowedAccessFieldList = new ArrayList<>(allowedAccessFields);
			allowedFields.setAllowedReadFields(allowedAccessFieldList);
			return;
		}
		if(BooleanUtils.isTrue(userBase.isDevAdmin())) {
			allowedAccessFields.add("*");
			List<String> allowedAccessFieldList = new ArrayList<>(allowedAccessFields);
			allowedFields.setAllowedReadFields(allowedAccessFieldList);
			return;
		}
					if (BooleanUtils.isTrue(userBase.isAppAdmin())) {
			String[] readFields = new String[] {SID, CREATED_BY, CREATED_DATE, MODIFIED_BY, MODIFIED_DATE, FIELD1};
			allowedAccessFields.addAll(Arrays.asList(readFields));
		}

		List<String> allowedAccessFieldList = new ArrayList<>(allowedAccessFields);
		allowedFields.setAllowedReadFields(allowedAccessFieldList);
	}
	protected void setWriteFields(ApplicationUserBase userBase, AllowedFields allowedFields) {
		Set<String> allowedAccessFields = new HashSet<>();
		allowedAccessFields.addAll(getTechnicalFields());
		if(userBase == null) {
			List<String> allowedAccessFieldList = new ArrayList<>(allowedAccessFields);
			allowedFields.setAllowedWriteFields(allowedAccessFieldList);
			return;
		}
		if(BooleanUtils.isTrue(userBase.isDevAdmin())) {
			allowedAccessFields.add("*");
			List<String> allowedAccessFieldList = new ArrayList<>(allowedAccessFields);
			allowedFields.setAllowedWriteFields(allowedAccessFieldList);
			return;
		}
					if (BooleanUtils.isTrue(userBase.isAppAdmin())) {
			String[] readFields = new String[] {SID, CREATED_BY, CREATED_DATE, MODIFIED_BY, MODIFIED_DATE, FIELD1};
			allowedAccessFields.addAll(Arrays.asList(readFields));
		}

		List<String> allowedAccessFieldList = new ArrayList<>(allowedAccessFields);
		allowedFields.setAllowedWriteFields(allowedAccessFieldList);
	}
	protected List<String> getTechnicalFields() {
		String[] technicalFields = {"sid", "createdBy", "createdDate", "modifiedBy", "modifiedDate", "recDeleted"};
		List<String> technicalFieldList =  new ArrayList<>();
		Collections.addAll(technicalFieldList, technicalFields);
		return technicalFieldList;
	}
	
	
}

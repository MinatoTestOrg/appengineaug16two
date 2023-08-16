package com.minatogithuborganization.appengine.base.model;

import com.vs.rappit.base.annotations.Searchable;
import com.vs.rappit.base.authentication.UserPrivilege;
import com.vs.rappit.base.annotations.Table;
import com.vs.rappit.base.annotations.Searchable;
@Table(name="ApplicationUser", keys={"sid"})
public class ApplicationUserBase extends UserPrivilege {


	@Searchable(index = true)
	private Boolean appAdmin=false;

	public void setAppAdmin(Boolean appAdmin) {
		this.appAdmin = appAdmin;
	}

	public Boolean isAppAdmin() {
		return appAdmin;
	}


}
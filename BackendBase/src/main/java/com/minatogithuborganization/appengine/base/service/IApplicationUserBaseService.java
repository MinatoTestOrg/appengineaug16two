package com.minatogithuborganization.appengine.base.service;

import com.vs.rappit.base.authentication.IAppUserPrivilegeBL;
import com.minatogithuborganization.appengine.base.model.ApplicationUserBase;
import com.vs.rappit.base.mail.model.EmailAddress;
import java.util.List;
import com.vs.rappit.base.model.wrapper.UserPrivilegePerimeter;


public interface IApplicationUserBaseService<T extends ApplicationUserBase> extends IAppUserPrivilegeBL<T> {
	

	public List<EmailAddress> getUsersByRole(UserPrivilegePerimeter rolePerimeterInfo, Integer page, Integer pageSize);

}
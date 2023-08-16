package com.minatogithuborganization.appengine.service;

import com.vs.rappit.base.acl.IPerimeterManager;
import com.minatogithuborganization.appengine.base.service.Table123BaseService;
import com.minatogithuborganization.appengine.model.Table123;
import com.minatogithuborganization.appengine.service.Table123PerimeterImpl;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;


@Service("Table123")
public class Table123Service extends Table123BaseService<Table123> implements ITable123Service<Table123>{

		@Autowired
		private  Table123PerimeterImpl  table123PerimeterImpl;

		public Table123Service(ChangelogService changelogService) {
			super(Table123.class);	
			setChangelogService(changelogService); 
		}
	
	
}
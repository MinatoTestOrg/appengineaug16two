package com.minatogithuborganization.appengine.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.slf4j.ext.XLogger;
import org.slf4j.ext.XLoggerFactory;
import org.springframework.http.ResponseEntity;
import com.vs.rappit.base.factory.InstanceFactory;
import com.minatogithuborganization.appengine.base.controller.Table123BaseController;
import com.minatogithuborganization.appengine.service.ITable123Service;
import com.minatogithuborganization.appengine.service.Table123Service;
import com.minatogithuborganization.appengine.model.Table123;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "rest/table123s/", produces = "application/json")
public class Table123Controller extends Table123BaseController<ITable123Service<Table123>, Table123> {
	private static XLogger LOGGER = XLoggerFactory.getXLogger(Table123Controller.class);
	public Table123Controller(Table123Service table123Service) {
		super(table123Service);
	}
}

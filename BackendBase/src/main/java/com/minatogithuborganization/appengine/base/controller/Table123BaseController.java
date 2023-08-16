package com.minatogithuborganization.appengine.base.controller;

import com.vs.rappit.base.dal.providers.PersistenceType;
import com.vs.rappit.jersey.base.webservice.BaseWebService;
import com.minatogithuborganization.appengine.base.service.ITable123BaseService;
import com.minatogithuborganization.appengine.base.model.Table123Base;
import java.util.Date;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;

import com.vs.rappit.base.model.Primary;

import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PostMapping;

import com.vs.rappit.base.model.PaginationRequest;

import com.vs.rappit.jersey.webservice.mapper.DatatableJson;

import com.vs.rappit.base.model.PaginationResponse;

import org.springframework.web.bind.annotation.DeleteMapping;

import org.springframework.web.bind.annotation.PutMapping;

import java.util.Map;

public abstract class Table123BaseController<SERVICE extends ITable123BaseService<M>, M extends Table123Base>
		extends BaseWebService<SERVICE, M> {
	
	
	public Table123BaseController(SERVICE logic) {
		super(logic);
	}
	
	
	@PreAuthorize("hasAccess('/table123s/autosuggest')")
	@GetMapping(path = "/autosuggest", produces = "application/json")
	public List<Object> autoSuggestService(@RequestParam("query") String searchText,@RequestParam(name = "sortColumn", required = false) String sortColumn,@RequestParam(name = "sortOrder", required = false) String sortOrder,@RequestParam("pgNo") int pgNo,@RequestParam("pgLen") int length) {
		return super.autosuggest(searchText,sortColumn,sortOrder,pgNo,length);
	}


	@PreAuthorize("hasAccess('/table123s/{sid}')")
	@GetMapping(path = "/{sid}", produces = "application/json")
	public M getById(@PathVariable("sid") Primary sid) {
		return super.getById(sid);
	}


	@PreAuthorize("hasAccess('/table123s/')")
	@PostMapping
	public M create(@RequestBody M modelObj) {
		return super.save(modelObj);
	}


	@PreAuthorize("hasAccess('/table123s/datatable')")
	@PostMapping("/datatable")
	public PaginationResponse getDatatableData(@RequestBody DatatableJson datatableJson)
	{
		PaginationRequest dataTable = convertToPaginationRequest(datatableJson);
	 	return logic.getAllByPage(PersistenceType.SEARCH, dataTable);
	}
	


	@PreAuthorize("hasAccess('/table123s/{ids}')")
	@DeleteMapping("/{ids}")
	public ResponseEntity deleteRecords(@PathVariable("ids") String ids) {
		boolean isDeleted = super.delete(ids);
		if (isDeleted)
			return ResponseEntity.ok().build();
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	}


	@PreAuthorize("hasAccess('/table123s/')")
	@PutMapping
	public M update(@RequestBody M modelObj) {
		return super.update(modelObj);
	}




	
}

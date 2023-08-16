package com.minatogithuborganization.appengine.base.model;
import com.vs.rappit.base.model.BaseModel;
import com.vs.rappit.base.annotations.Table;
import com.vs.rappit.base.annotations.Searchable;


@Table(name="Table123", keys={"sid"})
public class Table123Base extends BaseModel {

	@Searchable(index = true)
	private String field1;

	public void setField1(String field1) {
		this.field1 = field1;
	}

	public String getField1() {
		return field1;
	}



}
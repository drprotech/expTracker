package com.exptracker.entity;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedStoredProcedureQuery;
import javax.persistence.ParameterMode;
import javax.persistence.StoredProcedureParameter;
import javax.persistence.Table;

@Entity
@Table(name="db_expenses")
@NamedStoredProcedureQuery(name = "addexpproc", 
procedureName = "sp_insert_expense",
parameters = {
		   @StoredProcedureParameter(mode = ParameterMode.IN,name = "date",type = String.class),
		   @StoredProcedureParameter(mode = ParameterMode.IN,name = "spentby",type = String.class),
		   @StoredProcedureParameter(mode = ParameterMode.IN,name = "amount",type = Double.class),
		   @StoredProcedureParameter(mode = ParameterMode.IN,name = "where",type = String.class),
		   @StoredProcedureParameter(mode = ParameterMode.IN,name = "division",type = String.class),
		   @StoredProcedureParameter(mode = ParameterMode.IN,name = "divfactor",type = Integer.class),
		   @StoredProcedureParameter(mode = ParameterMode.OUT,name = "message",type = Integer.class)
		   
}
)
public class Expense {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="id")
	private int id;
	
	@Column(name="date")
	private String date;
	
	@Column(name="spentby")
	private String spentBy;
	
	@Column(name="amount")
	private String amount;
	
	@Column(name="place")
	private String place;
	
	private String spread;
	
	
	public String getSpread() {
		return spread;
	}
	public void setSpread(String spread) {
		this.spread = spread;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getSpentBy() {
		return spentBy;
	}
	public void setSpentBy(String spentBy) {
		this.spentBy = spentBy;
	}
	public String getAmount() {
		return amount;
	}
	public void setAmount(String amount) {
		this.amount = amount;
	}
	public String getPlace() {
		return place;
	}
	public void setPlace(String place) {
		this.place = place;
	}
	

}

/*
	This is a minified, closure-compiled Global Desktop UI Script containing
	 the EfficientGlideRecord class.
	See https://egr.snc.guru for full usage and API documentation.
 ---
 Copyright (c) 2022 Tim Woodruff (https://TimothyWoodruff.com)
 & SN Pro Tips (https://snprotips.com).
 Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.
 Alternative licensing is available upon request. Please contact tim@snc.guru
  for more info.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
  @version 1.0.4
*/
var EfficientGlideRecord=function(a){if(!a)throw Error("EfficientGlideRecord constructor called without a valid tableName argument. Cannot continue.");this._config={table_to_query:a,fields_to_get:[{name:"sys_id",get_display_value:!1}],record_limit:0,order_by_field:"",order_by_desc_field:"",encoded_queries:[],queries:[]};this._row_count=-1;this._query_complete=!1;this._records=[];this._current_record_index=-1;this._current_record={};this._gaQuery=new GlideAjax("ClientGlideRecordAJAX");this._gaQuery.addParam("sysparm_name",
	"getPseudoGlideRecord");return this};
EfficientGlideRecord.prototype.addField=function(a,b){var c;if(!a)return console.error("Attempted to call .addField() without a field name specified. Cannot add a blank field to the query."),this;for(c=0;c<this._config.fields_to_get.length;c++)if(this._config.fields_to_get[c].name===a)return console.warn("Attempted to add field with name "+a+" to EfficientGlideRecord query, but that field already exists. Cannot add the same field twice."),this;this._config.fields_to_get.push({name:a,get_display_value:!!b});
	return this};EfficientGlideRecord.prototype.addQuery=function(a,b,c){"undefined"===typeof c&&(c=b,b="=");this._config.queries.push({field:a,operator:b,value:c});return this};EfficientGlideRecord.prototype.addNotNullQuery=function(a){this.addQuery(a,"!=","NULL");return this};EfficientGlideRecord.prototype.addNullQuery=function(a){this.addQuery(a,"=","NULL");return this};
EfficientGlideRecord.prototype.addEncodedQuery=function(a){if(!a||"string"!==typeof a)throw Error("Invalid encoded query string specified. Encoded query must be a valid non-empty string.");this._config.encoded_queries.push(a);return this};EfficientGlideRecord.prototype.setEncodedQuery=function(a){this._config.encoded_queries=[a];return this};EfficientGlideRecord.prototype.addOrderBy=function(a){this.orderBy(a);return this};
EfficientGlideRecord.prototype.orderBy=function(a){this._config.order_by_field=a;return this};EfficientGlideRecord.prototype.orderByDesc=function(a){this._config.order_by_desc_field=a;return this};EfficientGlideRecord.prototype.setLimit=function(a){if("number"!==typeof a||0>=a)throw Error("EfficientGlideRecord.setLimit() method called with an invalid argument. Limit must be a number greater than zero.");this._config.record_limit=a;return this};
EfficientGlideRecord.prototype.get=function(a,b){this.addQuery("sys_id",a);this.setLimit(1);this.query(function(c){c.next()?b(c):console.warn('EfficientGlideRecord: No records found in the target table with sys_id "'+a+'".')})};
EfficientGlideRecord.prototype.query=function(a){var b;if(!this._readyToSend())return!1;for(b in this._config)if(this._config.hasOwnProperty(b)){var c=void 0;c="object"===typeof this._config[b]?JSON.stringify(this._config[b]):this._config[b];this._gaQuery.addParam(b,c)}this._gaQuery.getXMLAnswer(function(d,e){if("undefined"===typeof e){if("undefined"===typeof this||null===this)throw Error('EfficientGlideRecord ran into a problem. Neither eGR nor the "this" scope are defined. I have no idea how this happened. Better go find Tim and yell at him: https://egr.snc.guru');
	e=this}d=JSON.parse(d);if(!d.hasOwnProperty("_records"))throw Error("Something went wrong when attempting to get records from the server.\nResponse object: \n"+JSON.stringify(d));e._query_complete=!0;e._records=d._records;e._row_count=d._row_count;e._executing_as=d._executing_as;a(e)}.bind(this),null,this)};EfficientGlideRecord.prototype.hasNext=function(){return this._query_complete?this._row_count>this._current_record_index+1:!1};
EfficientGlideRecord.prototype.next=function(){if(!this._query_complete||!this.hasNext())return!1;this._current_record_index++;this._current_record=this._records[this._current_record_index];return!0};
EfficientGlideRecord.prototype.canRead=function(a){if(!this._query_complete)throw Error("The .canRead() method of EfficientGlideRecord can only be called from the callback function after calling .query(callbackFn)");return this._current_record._field_values.hasOwnProperty(a)?this._current_record._field_values[a].hasOwnProperty("can_read")?!!this._current_record._field_values[a].can_read||!1:(console.warn('The requested field "'+a+'" has no can_read node. This should not happen. Returning a blank false.'),
	!1):(console.warn("There is no field with the name "+a+" in the EfficientGlideRecord object. Did you remember to specify that you want to get that field in the query using .addField()?"),!1)};
EfficientGlideRecord.prototype.getValue=function(a){if(!this._query_complete)throw Error("The .getValue() method of EfficientGlideRecord can only be called from the callback function after calling .query(callbackFn)");return this._current_record._field_values.hasOwnProperty(a)?this._current_record._field_values[a].hasOwnProperty("value")?this._current_record._field_values[a].value||"":(console.warn('The requested field "'+a+'" has no value node. This should not happen. Returning a blank string.'),
	""):(console.warn("There is no field with the name "+a+" in the EfficientGlideRecord object. Did you remember to specify that you want to get that field in the query using .addField()?"),"")};
EfficientGlideRecord.prototype.getDisplayValue=function(a){if(!this._query_complete)throw Error("The .getDisplayValue() method of EfficientGlideRecord can only be called from the callback function after calling .query(callbackFn)");return this._current_record._field_values.hasOwnProperty(a)?this._current_record._field_values[a].hasOwnProperty("display_value")&&this._current_record._field_values[a].display_value?this._current_record._field_values[a].display_value||"":(console.warn("There is no display value for the field with the name "+
	a+" in the EfficientGlideRecord object. Did you remember to specify that you want to get that field's display value in the query using .addField(fieldName, true)?"),""):(console.warn("There is no field with the name "+a+" in the EfficientGlideRecord object. Did you remember to specify that you want to get that field in the query using .addField()?"),"")};EfficientGlideRecord.prototype.getRowCount=function(){return this._row_count};
EfficientGlideRecord.prototype._readyToSend=function(){if(!this._config.table_to_query)return console.error("EfficientGlideRecord not ready to query. Table name was not specified in the constructor's initialize argument."),!1;1>=this._config.fields_to_get.length&&console.warn("EfficientGlideRecord: No fields other than sys_id were specified to retrieve. \nYou can specify which fields you want to retrieve from the GlideRecord object using .addField(fieldName, getDisplayValue). Afterward, in your callback, you can use .getValue(fieldName). If you set getDisplayValue to true in .addField(), you can also use .getDisplayValue(fieldName).\nWithout fields to retrieve specified using .addField(), each record will be returned with only a sys_id. \nThis will not prevent you from performing your query, unless something has gone terribly wrong.");
	(!this._config.hasOwnProperty("queries")||1>this._config.queries.length)&&(!this._config.hasOwnProperty("encoded_queries")||1>this._config.encoded_queries.length)&&(!this._config.hasOwnProperty("record_limit")||1>this._config.record_limit)&&console.warn("The EfficientGlideRecord query has no query and no record limit associated with it. This may result in poor performance when querying larger tables. Please make sure that you need all records in the specified table, as all records will be returned by this query.");
	return!0};

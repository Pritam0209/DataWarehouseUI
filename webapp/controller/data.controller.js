sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("DW.DW.controller.data", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf DW.DW.view.data
		 */

		onInit: function () {
			this.previousSelected = "countryDimension";
			this.getView().byId("dimension").setSelectedKey("countryDimension");
			var dimensionName = this.getView().byId("dimension").getSelectedKey();
			this.changeDimensionBinding(dimensionName);
			this.bindFactTable();
			this.getUniqueCountry();
		},
		getUniqueCountry: function () {
			var selectList = this.getView().byId("qCountry");
			var oItemSelectTemplate = new sap.ui.core.Item({
				key: "{value}",
				text: "{value}"
			});
			var url1 = "http://127.0.0.1:3005/unique";
			var jsonData = [];
			$.ajax({
				type: "GET",
				url: url1,
				data: jsonData,
				cors: true,
				secure: true,
				async: true,
				headers: {
					'Access-Control-Allow-Origin': '*'
				},
				success: function (data, textStatus, jqXHR) {
					var oModel = new JSONModel();
					oModel.setData(data);
					selectList.setModel(oModel);
					selectList.bindAggregation("items", "/", oItemSelectTemplate);
				}
			});
		},
		bindFactTable: function () {
			//console.log("here");
			var oTable = this.getView().byId("fact");
			var url1 = "http://127.0.0.1:3005/table";
			var jsonData = {
				"Table": "fact"
			};
			$.ajax({
				type: "GET",
				url: url1,
				data: jsonData,
				cors: true,
				secure: true,
				async: false,
				headers: {
					'Access-Control-Allow-Origin': '*'
				},
				success: function (data, textStatus, jqXHR) {
					//console.log(JSON.stringify(data));
					var oModel = new JSONModel();
					oModel.setData(data);
					oTable.setModel(oModel);
				}
			});
		},
		changeDimensionBinding: function (DimensionName) {
			var that = this;
			var oTable = this.getView().byId(DimensionName);
			var url1 = "http://127.0.0.1:3005/table";
			var jsonData = {
				"Table": DimensionName
			};
			$.ajax({
				type: "GET",
				url: url1,
				data: jsonData,
				cors: true,
				secure: true,
				async: false,
				headers: {
					'Access-Control-Allow-Origin': '*'
				},
				success: function (data, textStatus, jqXHR) {
					//console.log(JSON.stringify(data));
					var oModel = new JSONModel();
					oModel.setData(data);
					oTable.setModel(oModel);
				}
			});
		},
		onDimensionSelect: function (oEvent) {
			//this.getView().byId("countryKey").setVisible(false);
			//console.log(this.getView().byId("dimension").getSelectedKey());
			var key = this.getView().byId("dimension").getSelectedKey();
			console.log(key);
			this.changeDimensionBinding(key);
			this.getView().byId(this.previousSelected).setVisible(false);
			this.getView().byId(key).setVisible(true);
			this.previousSelected = key;
		},
		onCountrySelect: function () {
			var country = this.getView().byId("qCountry").getSelectedKey();
			var selectList = this.getView().byId("qFYear");
			var oItemSelectTemplate = new sap.ui.core.Item({
				key: "{value}",
				text: "{value}"
			});
			var url1 = "http://127.0.0.1:3005/unique";
			var jsonData =[{
				"country": country
			}];
			$.ajax({
				type: "GET",
				url: url1,
				data: jsonData,
				cors: true,
				secure: true,
				async: true,
				headers: {
					'Access-Control-Allow-Origin': '*'
				},
				success: function (data, textStatus, jqXHR) {
					var oModel = new JSONModel();
					oModel.setData(data);
					selectList.setModel(oModel);
					selectList.bindAggregation("items", "/", oItemSelectTemplate);
				}
			});
		},
		onFYearSelect: function () {
			var country = this.getView().byId("qCountry").getSelectedKey();
			var fromYear = this.getView().byId("qFYear").getSelectedKey();
			var selectList = this.getView().byId("qTYear");
			var oItemSelectTemplate = new sap.ui.core.Item({
				key: "{value}",
				text: "{value}"
			});
			var url1 = "http://127.0.0.1:3005/unique";
			var jsonData =[{
				"country": country
			}, {
				"fromYear": fromYear
			}];
			$.ajax({
				type: "GET",
				url: url1,
				data: jsonData,
				cors: true,
				secure: true,
				async: true,
				headers: {
					'Access-Control-Allow-Origin': '*'
				},
				success: function (data, textStatus, jqXHR) {
					var oModel = new JSONModel();
					oModel.setData(data);
					selectList.setModel(oModel);
					selectList.bindAggregation("items", "/", oItemSelectTemplate);
				}
			});
		},
		onTYearSelect: function () {
			var country = this.getView().byId("qCountry").getSelectedKey();
			var fromYear = this.getView().byId("qFYear").getSelectedKey();
			var toYear = this.getView().byId("qTYear").getSelectedKey();
			var selectList = this.getView().byId("qElement");
			var oItemSelectTemplate = new sap.ui.core.Item({
				key: "{value}",
				text: "{value}"
			});
			var url1 = "http://127.0.0.1:3005/unique";
			var jsonData = [{
				"country": country
			}, {
				"fromYear": fromYear
			}, {
				"toYear": toYear
			}];
			$.ajax({
				type: "GET",
				url: url1,
				data: jsonData,
				cors: true,
				secure: true,
				async: true,
				headers: {
					'Access-Control-Allow-Origin': '*'
				},
				success: function (data, textStatus, jqXHR) {
					var oModel = new JSONModel();
					oModel.setData(data);
					selectList.setModel(oModel);
					selectList.bindAggregation("items", "/", oItemSelectTemplate);
				}
			});
		},
		onElementSelect: function () {
			var country = this.getView().byId("qCountry").getSelectedKey();
			var fromYear = this.getView().byId("qFYear").getSelectedKey();
			var toYear = this.getView().byId("qTYear").getSelectedKey();
			var element = this.getView().byId("qElement").getSelectedKey();
			var selectList = this.getView().byId("qCategory");
			var oItemSelectTemplate = new sap.ui.core.Item({
				key: "{value}",
				text: "{value}"
			});
			var url1 = "http://127.0.0.1:3005/unique";
			var jsonData = [{
				"country": country
			}, {
				"fromYear": fromYear
			}, {
				"toYear": toYear
			}, {
				"element": element
			}];
			$.ajax({
				type: "GET",
				url: url1,
				data: jsonData,
				cors: true,
				secure: true,
				async: true,
				headers: {
					'Access-Control-Allow-Origin': '*'
				},
				success: function (data, textStatus, jqXHR) {
					var oModel = new JSONModel();
					oModel.setData(data);
					selectList.setModel(oModel);
					selectList.bindAggregation("items", "/", oItemSelectTemplate);
				}
			});
		},
		onDisplay: function () {
			var country = this.getView().byId("qCountry").getSelectedKey();
			var fromYear = this.getView().byId("qFYear").getSelectedKey();
			var toYear = this.getView().byId("qTYear").getSelectedKey();
			var element = this.getView().byId("qElement").getSelectedKey();
			var category = this.getView().byId("qCategory").getSelectedKey();
			var url1 = "http://127.0.0.1:3005/display";
			var jsonData = {
				"country": country,
				"fromYear": fromYear,
				"toYear": toYear,
				"element": element,
				"category": category
			};
			var oTable=this.getView().byId("queryTable");
			$.ajax({
				type: "GET",
				url: url1,
				data: jsonData,
				cors: true,
				secure: true,
				async: true,
				headers: {
					'Access-Control-Allow-Origin': '*'
				},
				success: function (data, textStatus, jqXHR) {
					var oModel = new JSONModel();
					oModel.setData(data);
					oTable.setModel(oModel);
				}
			});

		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf DW.DW.view.data
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf DW.DW.view.data
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf DW.DW.view.data
		 */
		//	onExit: function() {
		//
		//	}

	});

});
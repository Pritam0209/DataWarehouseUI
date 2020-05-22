sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/BindingMode",
	"sap/ui/model/json/JSONModel",
	'sap/viz/ui5/data/FlattenedDataset',
	'sap/viz/ui5/format/ChartFormatter',
	'sap/viz/ui5/api/env/Format',
	'./InitPage'
], function (Controller, BindingMode, JSONModel, FlattenedDataset, ChartFormatter, Format, InitPageUtil) {
	"use strict";

	return Controller.extend("DW.DW.controller.analytics", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf DW.DW.view.analytics
		 */

		onInit: function () {

			// InitPageUtil.initPageSettings(this.getView());
		},
		onLoad: function () {
			Format.numericFormatter(ChartFormatter.getInstance());
			var formatPattern = ChartFormatter.DefaultPattern;
			var ovizframe = this.getView().byId("idVizFrame1");
			// var url1 = "http://127.0.0.1:3005/prevdata/";
			// $.ajax({
			// 	type: "GET",
			// 	dataType: "json",
			// 	url: url1,
			// 	cors: true,
			// 	secure: true,
			// 	async: false,
			// 	headers: {
			// 		'Access-Control-Allow-Origin': '*'
			// 	},
			// 	success: function (data, textStatus, jqXHR) {
			// 		var oModel1 = new JSONModel();
			// 		oModel1.setData(data);
			// 		ovizframe.setModel(oModel1);
			// 	}
			// });
			var data = [{
				"year": "2017",
				"Seed": 3750,
				"Yield": 2000,
				"Production": 5000,
				"areaHarvested": 400
			}, {
				"year": "2018",
				"Seed": 2000,
				"Yield": 0,
				"Production": 4800,
				"areaHarvested": 300
			}, {
				"year": "2019",
				"Seed": 1500,
				"Yield": 2000,
				"Production": 3800,
				"areaHarvested": 200
			}];
			var oModel1 = new JSONModel();
			oModel1.setData(data);
			ovizframe.setModel(oModel1);
			var oVizPop = this.getView().byId("idPopOver2");
			ovizframe.setVizProperties({
				plotArea: {
					dataLabel: {
						formatString: formatPattern.SHORTFLOAT_MFD2,
						visible: true
					}
				},
				valueAxis: {
					label: {
						formatString: formatPattern.SHORTFLOAT
					},
					title: {
						visible: false
					}
				},
				categoryAxis: {
					title: {
						visible: false
					}
				},
				title: {
					visible: false,
					text: "Analysis of Country's different element based on selected data"
				}
			});
			oVizPop.connect(ovizframe.getVizUid());
			oVizPop.setFormatString(formatPattern.STANDARDFLOAT);
		},
		onLoad2: function () {
			Format.numericFormatter(ChartFormatter.getInstance());
			var formatPattern = ChartFormatter.DefaultPattern;
			var ovizframe = this.getView().byId("idVizFrame2");
			var country=this.getView().byId("country");
			var crop=this.getView().byId("crop");
			var JSONdata={
				"country":country,
				"crop":crop
			};
			 var url1 = "http://127.0.0.1:3005/analysis1";
			// $.ajax({
			// 	type: "GET",
			// 	url: url1,
			// 	data:JSONdata,
			// 	cors: true,
			// 	secure: true,
			// 	async: false,
			// 	headers: {
			// 		'Access-Control-Allow-Origin': '*'
			// 	},
			// 	success: function (data, textStatus, jqXHR) {
			// 		var oModel1 = new JSONModel();
			// 		oModel1.setData(data);
			// 		ovizframe.setModel(oModel1);
			// 	}
			// });
			var data = [{
				"country": "India",
				"Seed": 3750,
				"Yield": 2000,
				"Production": 5000,
				"areaHarvested": 4000
			}, {
				"country": "China",
				"Seed": 2000,
				"Yield": 3000,
				"Production": 4800,
				"areaHarvested": 3000
			}, {
				"country": "America",
				"Seed": 1500,
				"Yield": 2000,
				"Production": 3800,
				"areaHarvested": 2000
			}];
			var oModel1 = new JSONModel();
			oModel1.setData(data);
			ovizframe.setModel(oModel1);
			var oVizPop = this.getView().byId("idPopOver3");
			ovizframe.setVizProperties({
				categoryAxis: {
					axisTick: {
						visible: false
					},
					axisLine: {
						visible: false
					},
					label: {
						hideWhenOverlap: false
					},
					title: {
						text: "Country"
					}
				},
				valueAxis: {
					axisTick: {
						visible: false
					},
					axisLine: {
						visible: false
					},
					title: {
						text: "Value"
					}
				},
				dataLabel: {

					visible: true,
					hideWhenOverlap: false
				},
				title: {
					visible: false,
					text: "Analysis of Country's different element based on selected data"
				}
			});
			oVizPop.connect(ovizframe.getVizUid());
			oVizPop.setFormatString(formatPattern.STANDARDFLOAT);
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf DW.DW.view.analytics
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf DW.DW.view.analytics
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf DW.DW.view.analytics
		 */
		//	onExit: function() {
		//
		//	}

	});

});
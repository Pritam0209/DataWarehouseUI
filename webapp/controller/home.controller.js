sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("DW.DW.controller.home", {
		onInit: function () {

		},
		onItemSelect: function (oEvent) {
			var oItem = oEvent.getParameter("item");
			var sKey = oItem.getKey();
			// if you click on home, settings or statistics button, call the navTo function
			if ((sKey === "data" || sKey === "analytics" )) {
				// if the device is phone, collaps the navigation side of the app to give more space
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo(sKey);

			} 
		}
	});
});
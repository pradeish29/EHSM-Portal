sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"sap/ui/model/json/JSONModel",
	"ZEHSM_PORTAL/model/models"
], function(UIComponent, Device, JSONModel, models) { // ✅ Correct order

	"use strict";

	return UIComponent.extend("ZEHSM_PORTAL.Component", {

		metadata: {
			manifest: "json"
		},

		init: function () {

			// Call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// Set user model
			this.setModel(new JSONModel({}), "userModel");

			// Set app model
			this.setModel(new JSONModel({
				busy: false
			}), "appModel");

			// Initialize the router
			this.getRouter().initialize();
		},

		setUserSession: function (oData) {
			this.getModel("userModel").setData(oData);
		},

		clearUserSession: function () {
			this.getModel("userModel").setData({});
		}
	});
});
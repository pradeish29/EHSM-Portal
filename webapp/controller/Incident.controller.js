sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/ui/model/odata/v2/ODataModel",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/m/MessageToast",
  "sap/ui/core/format/DateFormat"
], function (Controller, JSONModel, ODataModel, Filter, FilterOperator, MessageToast, DateFormat) {
  "use strict";

  return Controller.extend("ZEHSM_PORTAL.controller.Incident", {
    
    onInit: function () {
      this.oDataModel = new ODataModel("/sap/opu/odata/sap/ZODATA_EHSM_PM_SRV/");
      this.getView().setModel(this.oDataModel); // set default model
      this._loadIncidents(); // initial load with no filter
    },

    _loadIncidents: function (sStatusFilter) {
  var that = this;
  var aFilters = [];

  if (sStatusFilter) {
    aFilters.push(new Filter("IncRecStatus", FilterOperator.EQ, sStatusFilter));
  }

  this.oDataModel.read("/Incident", {
    filters: aFilters,
    success: function (oData) {
      var oModel = new JSONModel(oData);
      that.getView().setModel(oModel, "incidentModel");
    },
    error: function () {
      MessageToast.show("Failed to load incident data.");
    }
  });
},

    onFilterChange: function (oEvent) {
      var sKey = oEvent.getSource().getSelectedKey();
      this._loadIncidents(sKey); // load data with filter
    },

    onNavBack: function () {
      this.getOwnerComponent().getRouter().navTo("Home");
    },

    formatDate: function (sDate) {
      if (!sDate) return "";
      var oDate = new Date(sDate);
      return DateFormat.getDateInstance({ pattern: "yyyy-MM-dd" }).format(oDate);
    },

   formatStatusColor: function (sStatus) {
  switch (sStatus) {
    case "New": return "Information";
	case "Review Complete": return "Success";
	case "Closed": return "Warning";
	case "Void": return "Error";
    default: return "None";
  }
}

  });
});
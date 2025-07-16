sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/ui/model/odata/v2/ODataModel",
  "sap/m/MessageToast",
  "sap/ui/core/format/DateFormat"
], function (Controller, JSONModel, ODataModel, MessageToast, DateFormat) {
  "use strict";

  return Controller.extend("ZEHSM_PORTAL.controller.Risk", {
    _allRisks: [],

    onInit: function () {
      this.oDataModel = new ODataModel("/sap/opu/odata/sap/ZODATA_EHSM_PM_SRV/");
      this._loadRisks();
    },

    _loadRisks: function () {
      var that = this;

      this.oDataModel.read("/Risk", {
        success: function (oData) {
          that._allRisks = oData.results;
          const oModel = new JSONModel({ results: that._allRisks });
          that.getView().setModel(oModel, "riskModel");

          // Setup filter dropdown values
          const uniqueRoles = [...new Set(that._allRisks.map(r => r.Role))];
          const roleOptions = uniqueRoles.map(r => ({ key: r, text: r }));
          roleOptions.unshift({ key: "", text: "All Roles" });
          that.getView().setModel(new JSONModel(roleOptions), "roleFilterModel");
        },
        error: function () {
          MessageToast.show("Failed to load risk data.");
        }
      });
    },

    formatDate: function (sDate) {
      if (!sDate) return "";
      var oDate = new Date(sDate);
      return DateFormat.getDateInstance({ pattern: "yyyy-MM-dd" }).format(oDate);
    },

    onNavBack: function () {
      this.getOwnerComponent().getRouter().navTo("Home");
    },

    onSearch: function (oEvent) {
      const sQuery = oEvent.getParameter("query")?.toLowerCase() || "";
      const selectedRole = this.getView().byId("roleFilterCombo").getSelectedKey();
      const filtered = this._allRisks.filter(risk => {
        const matchesRole = !selectedRole || risk.Role === selectedRole;
        const matchesQuery = !sQuery || Object.values(risk).some(val =>
          val && val.toString().toLowerCase().includes(sQuery)
        );
        return matchesRole && matchesQuery;
      });
      this.getView().getModel("riskModel").setProperty("/results", filtered);
    },

    onRoleFilterChange: function () {
      this.onSearch({ getParameter: () => this.getView().byId("searchField").getValue() });
    }
  });
});

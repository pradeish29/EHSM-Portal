sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/Configuration",
  "sap/m/MessageToast"
], function (Controller, JSONModel, Configuration, MessageToast) {
  "use strict";

  return Controller.extend("ZEHSM_PORTAL.controller.Home", {

    onInit: function () {
      this._loadUserContext();
    },
    _loadUserContext: function () {
      var oUserModel = new JSONModel({
        name: "Welcome, Trainee",
        now: new Date()
      });
      this.getView().setModel(oUserModel, "userModel");
    },

    onNavigate: function (oEvent) {
      var sRoute = oEvent.getSource().getCustomData()[0].getValue();
      if (sRoute) {
        this.getOwnerComponent().getRouter().navTo(sRoute);
      }
    },

    onLogout: function () {
      MessageToast.show("Logging out...");
      this.getOwnerComponent().getRouter().navTo("Login");
    },

  });
});
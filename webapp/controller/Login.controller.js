sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/ui/model/odata/v2/ODataModel"
], function (Controller, MessageToast, ODataModel) {
  "use strict";

  return Controller.extend("ZEHSM_PORTAL.controller.Login", {
    onInit: function () {
      this.oModel = new ODataModel("/sap/opu/odata/sap/ZODATA_EHSM_PM_SRV/");
    },

    onLoginPress: function () {
      var empId = this.byId("empIdInput").getValue();
      var password = this.byId("passwordInput").getValue();

      if (!empId || !password) {
        MessageToast.show("Please enter both Employee ID and Password.");
        return;
      }

      var sPath = `/Login(p_emp_id='${empId}',p_password='${password}')/Set`;

      this.oModel.read(sPath, {
        success: (oData) => {
          const loginMessage = oData.results?.[0]?.MESSAGE || "Unknown response";
          this.byId("messageText").setText(loginMessage).setVisible(true);

          if (loginMessage.includes("Successful")) {
            this.getOwnerComponent().getRouter().navTo("Home");
          } else {
            MessageToast.show(loginMessage);
          }
        },
        error: (oError) => {
          MessageToast.show("Login failed or service unavailable.");
        }
      });
    }
  });
});
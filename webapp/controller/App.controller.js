sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../model/formatter",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, formatter, JSONModel, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("de.blogspot.openui5.adb.controller.App", {

		formatter: formatter,

		onInit: function() {
			var oViewModel = new JSONModel({
				total: null
			});
			this.getView().setModel(oViewModel, "ui");
			this._oViewModel = oViewModel;
			
			this.oList = this.getView().byId("List");
			this.oFavoriteToggle = this.getView().byId("FavoriteToggle");
		},

		onSearch: function(oEvent) {
			/*
			// add filter for search
			var aFilters = [],
				sQuery = oEvent.getSource().getValue(),
				oBinding = this.oList.getBinding("items");

			if (sQuery && sQuery.length > 0) {
				var oFilter = new Filter("description", FilterOperator.Contains, sQuery);
				aFilters.push(oFilter);
			}

			// update list binding
			//oBinding.filter(aFilters, "Application");
			oBinding.filter(aFilters, "Control");
			*/
			
			this.filter(oEvent.getSource().getValue());
		},
		
		onUpdateFinished: function(oEvent) {
			var iActual = oEvent.getParameter("actual"),
				iTotal = oEvent.getParameter("total");
				
			//console.log("upd fin", iActual, iTotal);
			this._oViewModel.setProperty("/total", iTotal);
		},

		onFavoriteToggle: function(oEvent) {
			//var bPressed = oEvent.getSource().getPressed();
			this.filter();
		},

		onSelectionChange: function(oEvent) {
			var oSelectedItem = oEvent.getParameter("listItem"),
				oContext = oSelectedItem.getBindingContext(),
				sPath = oContext.getPath();

			this.getView().bindElement({
				path: sPath
			});
		},
		
		filter: function(sQuery) {
			var aFilters = [],
				oBinding = this.oList.getBinding("items"),
				bFavorite = this.oFavoriteToggle.getPressed();
			
			if (sQuery && sQuery.length > 0) {
				var oFilter = new Filter("description", FilterOperator.Contains, sQuery);
				aFilters.push(oFilter);
			}
			
			if (bFavorite) {
				aFilters.push(new Filter("favorite", FilterOperator.EQ, true));
			}

			// update list binding
			//oBinding.filter(aFilters, "Application");
			oBinding.filter(aFilters, "Control");
		}

	});
});
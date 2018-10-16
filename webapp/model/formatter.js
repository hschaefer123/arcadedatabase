sap.ui.define([
	"sap/ui/core/Priority",
	"sap/ui/core/ValueState"
	], function(Priority, ValueState) {
	"use strict";

	return {
		/**
		 * remove leading zeros from sap numeric character fields
		 *
		 * @public
		 * @param {string} sStr numeric value as a string
		 * @returns {string} formatted string without leading zeros or sStr
		 */
        removeLeadingZero : function(sStr) {
            return (sStr) ? sStr.replace(/^0+/, "") : sStr;
		},		
		
		game : function(sStr) {
            return sStr.toUpperCase();
		},		
		
		/**
		 * map cer status to text
		 *
		 * @public
		 * @param {string} sValue status value
		 * @returns {string} formatted priority
		 */
		esSystemLogo: function(sSystem, sTheme) {
			//./es/theme/{system>/esTheme}/{name}/art/system.svg
			var sPath;
			switch(sTheme) {
				case "pixel":
					sPath = "logo.png";
					break;
				default:
					sPath = "art/system.svg";
					break;
			}
			return jQuery.sap.getModulePath("de.blogspot.openui5.retropie.emulationstation.theme." + sTheme + "." + sSystem, "/") + sPath;
		},
		
		esSystemController: function(sSystem, sTheme) {
			//./es/theme/{system>/esTheme}/{name}/art/system.svg
			var sPath;
			switch(sTheme) {
				case "pixel":
					sPath = "console.png";
					break;
				default:
					sPath = "art/controller.svg";
					break;
			}
			return jQuery.sap.getModulePath("de.blogspot.openui5.retropie.emulationstation.theme." + sTheme + "." + sSystem, "/") + sPath;
		},
		
		/**
		 * map cer status to text
		 *
		 * @public
		 * @param {string} sValue status value
		 * @returns {string} formatted priority
		 */
		esGameImage: function(sImage) {
			// ~/.emulationstation/downloaded_images/atari2600/3-D Tic-Tac-Toe (1980) (Atari, Carol Shaw - Sears) (CX2618 - 49-75123) ~-image.jpg
			if (sImage) {
				var sPath = sImage.replace("~/.", "");
				return jQuery.sap.getModulePath("de.blogspot.openui5.retropie", "/") + sPath;
			} else {
				return "";
			}
		}

	};

});
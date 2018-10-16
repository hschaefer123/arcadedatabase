// https://developers.google.com/youtube/youtube_player_demo
sap.ui.define([
	"jquery.sap.global",
	"sap/ui/core/Control"
], function(jQuery, Control) {
	"use strict";
	var YTPlayer = Control.extend("de.blogspot.openui5.adb.control.YTPlayer", {

		metadata: {
			properties: {
				/**
				 * Width of the control
				 */
				width: {
					type: "sap.ui.core.CSSSize",
					group: "Appearance",
					defaultValue: "inherit"
				},

				/**
				 * Height of the control
				 */
				height: {
					type: "sap.ui.core.CSSSize",
					group: "Appearance",
					defaultValue: "inherit"
				},

				/**
				 * video id
				 */
				videoId: {
					type: "string",
					group: "Data",
					defaultValue: null
				},

				/**
				 * src
				 */
				src: {
					type: "string",
					group: "Data",
					defaultValue: null
				},

				/**
				 * instantly start playing video
				 */
				autoplay: {
					type: "boolean",
					group: "Misc",
					defaultValue: false
				},

				/**
				 * show media bar to control video element
				 */
				controls: {
					type: "boolean",
					group: "Appearance",
					defaultValue: false
				},

				/**
				 * loop video at the end and start again
				 */
				loop: {
					type: "boolean",
					group: "Misc",
					defaultValue: false
				},

				/**
				 * mute volume
				 */
				muted: {
					type: "boolean",
					group: "Misc",
					defaultValue: false
				}
			}
		},

		init: function() {
		//onAfterRendering: function() {
			//jQuery.sap.includeScript("https://www.youtube.com/iframe_api", "iframe_api");
			
			this.oPlayer = null;
			if (!this.oPlayer) {
			window.onYouTubeIframeAPIReady = function() {
				console.log("onYouTubeIframeAPIReady...", this, this.getId());
				this.oPlayer = new YT.Player(this.getId(), {
					playerVars: {
						autoplay: 1,
						loop: 1
					},
					//videoId: 'SbQc_JLUH7k',
					events: {
						//"onReady": function(event) { console.log("YTonReady"); },
						//"onStateChange": function(event) { console.log("YTonStateChange"); }
					}
				})
			}.bind(this);
			}

			/*
			if (Control.prototype.init) { // check whether superclass implements the method
				Control.prototype.init.apply(this, arguments); // call the method with the original arguments
			}
			*/
		},

		/**
		 * Control lifecycle method that is fired after the control has been rendered (added to the DOM)
		 */
		/*
		onAfterRendering: function() {
			var $DomNode = this.$(),
				sDomId = "#" + this.getId();
			//oDomRef = $DomNode[0];

			/*
			this.oPlayer = new Plyr(sDomId, {
				autoplay: true,
				loop: { active: true },
				ratio: "4:3"
			});
			*/
		//console.log("this.oPlayers", this.oPlayers);

		//this.oPlayers = plyr.setup($DomNode[0], {});
		//this.oPlayers = plyr.setup(sDomId, {});
		//this.oPlayer = plyr.get(sDomId);
		//this.oPlayer = $DomNode[0];
		/*
		},
		*/

		/**
		 * Control lifecycle method that is fired when the control needs to be rendered
		 * @param rm
		 * @param oControl
		 */
		renderer: function(oRm, oControl) {
			/*
			<iframe id="ytplayer" type="text/html" width="720" height="405"
src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&controls=0&fs=0&loop=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3"
frameborder="0" allowfullscreen>
*/

			oRm.write("<iframe");
			oRm.writeControlData(oControl);
			oRm.addClass("ytplayer");
			oRm.writeClasses();

			// styles
			if (oControl.getWidth() !== "inherit") {
				oRm.addStyle("width", oControl.getWidth());
			}
			if (oControl.getHeight() !== "inherit") {
				oRm.addStyle("height", oControl.getHeight());
			}
			oRm.writeStyles();

			// attributes
			oRm.writeAttribute("type", "text/html");
			oRm.writeAttribute("frameborder", "0");
			oRm.writeAttribute("allowfullscreen", "0");

			if (oControl.getSrc()) {
				oRm.writeAttribute("src", oControl.getSrc());
			}
			
			//oRm.writeAttribute("src", "http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&origin=https://webidetesting8769871-a729dda8a.dispatcher.hana.ondemand.com");

			/*
			if (oControl.getAutoplay()) {
				oRm.writeAttribute("autoplay", true);
			}
			if (oControl.getControls()) {
				oRm.writeAttribute("controls", true);
			}
			if (oControl.getLoop()) {
				oRm.writeAttribute("loop", true);
			}
			if (oControl.getMuted()) {
				oRm.writeAttribute("muted", true);
			}
			*/

			oRm.write(">");
			oRm.write("</iframe>");
		},

		setVideoId: function(sVideoId) {
			if (sVideoId === this.getVideoId()) {
				return this;
			}

			if (sVideoId) {
				var iPos = sVideoId.indexOf("?v=");
				if (iPos !== -1) {
					sVideoId = sVideoId.substr(iPos + 3);
					//https://www.youtube.com/watch?v=voDF0q3PhvE
				}
			}

			this.setProperty("videoId", sVideoId, true);
			
			if (this.oPlayer) {
				console.log("op", this.oPlayer);
				this.oPlayer.loadVideoById(sVideoId);
			}

			
			this.setSrc("https://www.youtube.com/embed/" + sVideoId +
				//"?autoplay=1&controls=0&fs=0&loop=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3");
				"?autoplay=1&controls=1&fs=0&loop=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3");
			

			//https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&controls=0&fs=0&loop=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3

			/*
			if (this.oPlayer) {
				this.oPlayer.source = {
				    type: "video",
				    sources: [
				        {
				            src: sVideoId,
				            provider: "youtube"
				        }
				    ]
				};
			}
			*/

			/*

			var oDomRef = this.getDomRef(),
				$DomNode = this.$();
				
			//if (oDomRef) {
			if ($DomNode)  {
				console.log("setVid", sVideoId, oDomRef, $DomNode);
				$DomNode.attr("data-plyr-embed-id", sVideoId);
			}
			*/

			return this;
		}

		/**
		 * Setter for the src property
		 * Prevents rerendering of the full control and just modifies the code embedded in the QR code
		 * @param code
		 */
		/*
		setSrc: function(sSrc) {
			if (sSrc === this.getSrc()) {
				return this;
			}

			this.setProperty("src", sSrc, true);

			var oDomRef = this.getDomRef();
			if (oDomRef) {
				$DomNode.attr("src", sSrc);
			}

			return this;
		},
		*/

		/*
		pause: function() {
			var oDomRef = this.getDomRef();

			if (oDomRef) {
				oDomRef.pause();
			}
		},

		play: function() {
			var oDomRef = this.getDomRef();

			if (oDomRef) {
				oDomRef.play();
			}
		}
		*/

	});

	return YTPlayer;

});
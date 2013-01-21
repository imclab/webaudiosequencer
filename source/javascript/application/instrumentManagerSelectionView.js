define(function(require) {
	var BaseView = require("baseView"),
	    instrumentManagerSelectionTemplateString = require("text!templates/instrumentManagerSelection.html")

	var InstrumentManagerSelectionView = BaseView.extend({
		className: "instrument-manager-selection-view",

		events: {
			"click #melodic-option": function () {
				this.triggerCreateTrack("melodic");
			},

			"click #percussive-option": function () {
				this.triggerCreateTrack("percussive");
			}
		},

		triggerCreateTrack: function (instrumentManagerType) {
			this.eventBus.trigger("createTrack", {
				instrumentManagerType: instrumentManagerType,
				soundAttributes: this.model.attributes
			});
		},

		render: function () {
			this.$el.html(instrumentManagerSelectionTemplateString);

			this.$("button").each(function (index, element) {
				$(element).button();
			});

			return this;
		}
	});

	return InstrumentManagerSelectionView;
});

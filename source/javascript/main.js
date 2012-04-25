require.config({
	paths: {
		jquery: "libraries/jquery/jquery-1.7.2",
		underscore: "libraries/underscore/underscore-1.3.3",
		backbone: "libraries/backbone/backbone-0.9.2",
		templates: "../templates",
		text: "libraries/require/text-1.0.8",
		order: "libraries/require/order-1.0.5",
		use: "libraries/require/use-0.2.0"
	},

	use: {
		backbone: {
			deps: ['use!underscore', 'jquery'],
			attach: function (_, $) {
				return Backbone;
			}
		},

		underscore: {
			attach: "_"
		}
	}
});

require([
	"use!backbone",
	"application/applicationView"
], function (Backbone, ApplicationView) {
	var eventBus = _.clone(Backbone.Events);

	var applicationView = new ApplicationView({ eventBus: eventBus, el: "#container" });
	applicationView.render();
});

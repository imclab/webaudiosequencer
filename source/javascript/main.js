require.config({
	paths: {
		jquery: "libraries/jquery/jquery-1.7.2",
		underscore: "libraries/underscore/underscore-1.3.3",
		backbone: "libraries/backbone/backbone-0.9.2",
		templates: "../templates",
		text: "libraries/require/text-1.0.8",
		order: "libraries/require/order-1.0.5",
		use: "libraries/require/use-0.3.0"
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
	"use!underscore",
	"use!backbone",
	"soundOutput/soundOutput",
	"sequencer/sequencer",
	"tracks/trackCollection",
	"commandMap",
	"application/applicationView",
	"./keyboardShortcuts",
	"utilities/functionChain"
], function (_, Backbone, SoundOutput, Sequencer, TrackCollection, commandMap, ApplicationView, keyboardShortcuts, functionChain) {
	var eventBus = _.clone(Backbone.Events);

	var commandObject = {
		eventBus: eventBus,
		selectedTrackModel: null,
		sequencer: new Sequencer(16),
		soundOutput: new SoundOutput(),
		trackCollection: new TrackCollection()
	};

	_.each(commandMap, function (mappings, event) {
		_.each(mappings, function (map) {
			if (map.guards) {
				eventBus.on(event, function () {
					functionChain(map.guards, commandObject, arguments, map.successCommand, map.failureCommand);
				});
			} else {
				eventBus.on(event, map.successCommand, commandObject);
			}
		});
	});

	delete commandMap;

	var keyboardShortcuts = keyboardShortcuts(eventBus);

	var applicationView = new ApplicationView({
		eventBus: eventBus,
		el: "#container",
		model: {
			sequencer: commandObject.sequencer,
			soundOutput: commandObject.soundOutput,
			trackCollection: commandObject.trackCollection
		}
	});

	applicationView.render();

	eventBus.trigger("initialize");
});

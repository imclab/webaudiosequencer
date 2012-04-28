define([
	"use!underscore",
	"use!backbone",
	"baseView",
	"text!templates/soundBrowser/soundBrowser.html",
	"./collections/freeSoundCollection",
	"./collections/soundCloudCollection",
	"./views/soundsView"
], function(_, Backbone, BaseView, SoundBrowserTemplateString, FreeSoundCollection, SoundCloudCollection, SoundsView) {
	var SoundBrowser = BaseView.extend({
		className: "sound-browser",
		soundBrowserTemplate: _.template(SoundBrowserTemplateString),

		collectionOptions: {
			defaultFetchOptions: {
				duration: 3,
				limit: 10
			}
		},

		initialize: function () {
			this.collections = [
				new FreeSoundCollection(this.collectionOptions),
				new SoundCloudCollection(this.collectionOptions)
			];

			this.collection = this.collections[0];

			this.collectionSelectOptions = "";

			_.each(this.collections, function (collection) {
				this.collectionSelectOptions += "<option>" + collection.name + "</option>";
			}, this);
		},

		fetch: function () {
			var that = this;

			this.soundsView.render();

			this.collection.fetch({
				success: function (collection, response) {
					that.soundsView.render(collection);
				},
				error: function () {
					console.log("error", arguments);
				}
			});
		},

		render: function () {
			this.removeAllChildViews();

			this.$el.html(this.soundBrowserTemplate());

			var sounds = this.$el.find(".sounds:first");

			this.soundsView = this.addChildView(SoundsView, { el: sounds });
			this.soundsView.render();

			this.fetch();

			return this;
		}
	});

	return SoundBrowser;
});
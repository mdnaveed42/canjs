var PlaylistVM = can.DefineMap.extend("PlaylistVM", {
  init: function() {
    var self = this;

    self.on("googleAuth", function(ev, googleAuth) {
      self.signedIn = googleAuth.isSignedIn.get();
      googleAuth.isSignedIn.listen(function(isSignedIn) {
        self.signedIn = isSignedIn;
      });
    });

    self.on("createPlaylistPromise", function(ev, promise) {
      if (promise) {
        promise.then(function() {
          self.playlistVideos = [];
          self.createPlaylistPromise = null;
        });
      }
    });
  },
  googleApiLoadedPromise: {
    value: googleApiLoadedPromise
  },
  googleAuth: {
    get: function(lastSet, resolve) {
      this.googleApiLoadedPromise.then(function() {
        resolve(gapi.auth2.getAuthInstance());
      });
    }
  },
  signedIn: "boolean",
  get givenName() {
    return this.googleAuth &&
      this.googleAuth.currentUser.get().getBasicProfile().getGivenName();
  },
  searchQuery: {
    type: "string",
    value: ""
  },
  get searchResultsPromise() {
    if (this.searchQuery.length > 2) {

      var results = gapi.client.youtube.search.list({
          q: this.searchQuery,
          part: 'snippet',
          type: 'video'
        }).then(function(response){
        console.log(response.result.items);
        return response.result.items;
      });
      return new Promise(function(resolve, reject){
        results.then(resolve, reject);
      });
    }
  },
  videoDrag: function(drag) {
    drag.ghost().addClass("ghost");
  },
  getDragData: function(drag){
	return can.data.get.call(drag.element[0], "dragData");
  },
  dropPlaceholderData: "any",
  playlistVideos: {
    Type: ["any"],
    Value: can.DefineList
  },
  addDropPlaceholder: function(index, video) {
    this.dropPlaceholderData = {
      index: index,
      video: video
    };
  },
  clearDropPlaceholder: function() {
    this.dropPlaceholderData = null;
  },
  addVideo: function(index, video) {
    this.dropPlaceholderData = null;
    if (index >= this.playlistVideos.length) {
      this.playlistVideos.push(video);
    } else {
      this.playlistVideos.splice(index, 0, video);
    }
  },
  get videosWithDropPlaceholder() {
    var copy = this.playlistVideos.map(function(video) {
      return {
        video: video,
        isPlaceholder: false
      };
    });
    if (this.dropPlaceholderData) {
      copy.splice(this.dropPlaceholderData.index, 0, {
        video: this.dropPlaceholderData.video,
        isPlaceholder: true
      });
    }
    return copy;
  },
  createPlaylistPromise: "any",
  createPlaylist: function() {
    var playlistName = prompt("What would you like to name your playlist?");
    if (!playlistName) {
      return;
    }

    var playlistId;
    var lastPromise = gapi.client.youtube.playlists.insert({
      part: 'snippet,status',
      resource: {
        snippet: {
          title: playlistName,
          description: 'A private playlist created with the YouTube API and CanJS'
        },
        status: {
          privacyStatus: 'private'
        }
      }
    }).then(function(response) {
      playlistId = response.result.id;
    });


    var playlistVideos = this.playlistVideos.slice();
    playlistVideos.forEach(function(video) {
      lastPromise = lastPromise.then(function() {
        return gapi.client.youtube.playlistItems.insert({
          part: 'snippet',
          resource: {
            snippet: {
              playlistId: playlistId,
              resourceId: video.id
            }
          }
        }).then();
      });
    });

    this.createPlaylistPromise = new Promise(function(resolve, reject) {
      lastPromise.then(resolve, reject);
    });
  }
});

var Sortable = can.Control.extend({
  "{element} dropinit": function() {
    this.droppedOn = false;
  },
  "{element} dropmove": function(el, ev, drop, drag) {
    this.fireEventForDropPosition(ev, drop, drag, "sortableplaceholderat");
  },
  "{element} dropon": function(el, ev, drop, drag) {
    this.droppedOn = true;
    this.fireEventForDropPosition(ev, drop, drag, "sortableinsertat");
  },
  "{element} dropend": function(el, ev, drop, drag) {
    if (!this.droppedOn) {
      drag.revert();
    }
  },
  fireEventForDropPosition: function(ev, drop, drag, eventName) {
    var dragData = can.data.get.call(drag.element[0], "dragData");

    var sortables = $(this.element).children();

    for (var i = 0; i < sortables.length; i++) {
      //check if cursor is past 1/2 way
      var sortable = $(sortables[i]);
      if (ev.pageY < Math.floor(sortable.offset().top + sortable.height() / 2)) {
        // index at which it needs to be inserted before
        $(this.element).trigger({
          type: eventName,
          index: i,
          dragData: dragData
        });
        return;
      }
    }
    if (!sortables.length) {
      $(this.element).trigger({
        type: eventName,
        index: 0,
        dragData: dragData
      });
    } else {
      $(this.element).trigger({
        type: eventName,
        index: i,
        dragData: dragData
      });
    }
  }
});

can.view.callbacks.attr("sortable", function(el) {
  new Sortable(el);
});

var vm = new PlaylistVM();
var template = can.stache.from("app-template");
var frag = template(vm);
document.body.appendChild(frag);

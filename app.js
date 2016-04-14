(function(Vue, window) {

  new Vue({
    el: '#app',
    data: {
      list: []
    },
    methods: {
      getData: function(param, cb) {
        var self = this;
        self.asyncLoadData(param, function(data) {
          self.list = data;
          cb({ total: 100 });
        });
      },
      asyncLoadData: function(param, cb) {
        // you can load data from server here
        setTimeout(function() {
          var data = [];
          for (var i = 0; i < param.limit; i++) {
            data.push(Math.random());
          }
          cb(data);
        }, 500)
      },
      refresh: function() {
        this.$broadcast('pagination-data-reload');
      }
    }
  });
}(Vue, window));

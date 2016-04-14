(function(Vue) {

  Vue.component('pagination', {
    template: '<div class="pagination-bar" v-if="totalPage>0">' +
      '<div class="btn-toolbar" role="toolbar">' +
        '<div class="btn-group" role="group">' +
          '<button type="button" class="btn btn-default btn-sm" v-for="e in numPerPageArray" @click="changeNumPerPage(e)">{{e}}</button>' +
        '</div>' +
        '<div class="btn-group pull-right" role="group">' +
          '<span v-show="submitted"><i class="fa fa-spin fa-spinner"></i></span>' +
          '<button type="button" class="btn btn-default btn-sm" v-disabled="hasPre" @click="first">' +
            '<i class="fa fa-angle-double-left"></i>' +
          '</button>' +
          '<button type="button" class="btn btn-default btn-sm" v-disabled="hasPre" @click="pre">' +
            '<i class="fa fa-angle-left"></i>' +
          '</button>' +
          '<span>{{currPage}}/{{totalPage}}</span>' +
          '<button type="button" class="btn btn-default btn-sm" v-disabled="hasNext" @click="next">' +
            '<i class="fa fa-angle-right"></i>' +
          '</button>' +
          '<button type="button" class="btn btn-default btn-sm" v-disabled="hasNext" @click="last">' +
            '<i class="fa fa-angle-double-right"></i>' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</div>',
    directives: {
      disabled: function(val) {
        if (val) {
          this.el.removeAttribute('disabled');
        } else {
          this.el.setAttribute('disabled', '');
        }
      }
    },
    data: function() {
      return {
        numPerPageArray: [10 , 20, 50],
        currPage: 1,
        totalPage: 0,
        numPerPage: 10,
        submitted: false
      };
    },
    ready: function() {
      var self = this;
      self.submitted = true;
      self.$dispatch('params', {
        start: 0,
        limit: self.numPerPage
      }, self.onLoad);
    },
    computed: {
      hasPre: function() {
        return this.currPage > 1;
      },
      hasNext: function() {
        return this.currPage < this.totalPage;
      }
    },
    methods: {
      first: function() {
        if (this.submitted) return;
        this.currPage = 1;
      },
      last: function() {
        var self = this;
        if (self.submitted) return;
        self.currPage = self.totalPage;
      },
      pre: function() {
        var self = this;
        if (self.submitted || !self.hasPre) return;
        self.currPage--;
      },
      next: function() {
        var self = this;
        if (self.submitted || !self.hasNext) return;
        self.currPage++;
      },
      changeNumPerPage: function(numPerPage) {
        var self = this;
        self.submitted = true;
        self.numPerPage = numPerPage;
        self.$emit('pagination-data-reload');
      },
      onLoad: function(data) {
        var self = this;
        self.totalPage = Math.ceil(data.total / self.numPerPage);
        self.submitted = false;
      }
    },
    watch: {
      currPage: function(newVal) {
        var self = this;
        var params = {
          start: (newVal - 1) * self.numPerPage,
          limit: self.numPerPage
        };
        self.submitted = true;
        self.$dispatch('params', params, self.onLoad);
      }
    },
    events: {
      'pagination-data-reload': function() {
        var self = this;

        if (self.currPage == 1) {
          self.submitted = true;
          self.$dispatch('params', {
            start: 0,
            limit: self.numPerPage
          }, self.onLoad);
        } else {
          self.currPage = 1;
        }
      }
    }
  });
}(Vue));

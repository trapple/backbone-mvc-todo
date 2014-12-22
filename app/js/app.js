$(function() {


  var todoList = new TodoList();
  var appView = new AppView({
    model: todoList
  });

});

var Todo = Backbone.Model.extend({
  defaults: {
    text: null,
    complete: false
  },
  initialize: function() {
    //console.log('init ModelTodo'); 
  },
});

var TodoList = Backbone.Collection.extend({
  model: Todo,
  addTodo: function(text) {
    this.add(new Todo({
      text: text
    }));
  }
});

var ViewTodoList = Backbone.View.extend({
  tagName: "li",
  className: 'list-group-item',
  events: {
    'change input': "toggleComlete",
  },
  initialize: function() {
    this.listenTo(this.model, 'change', this.toggleClass);
  },
  render: function() {
    this.$el.html('<input type="checkbox" value="' + this.model.get('text') + '">　' + this.model.get('text') + '</li>');
    return this;
  },
  toggleComlete: function(e) {
    this.model.set({
      "complete": !!$(e.target).is(":checked")
    });
  },
  toggleClass: function(model) {
    if (model.get('complete')) {
      this.$el.addClass('list-group-item-info');
    } else {
      this.$el.removeClass('list-group-item-info');
    }
  }
});

var AppView = Backbone.View.extend({
  el: $('.app-todo'),
  events: {
    "click .usual-list li": "addTodoByUsual",
    "submit .todo-form": "addTodoByForm",
    "click #trash": "removeTodo",
  },
  initialize: function() {
    this.listenTo(this.model, 'add', this.addTodoView);
    this.listenTo(this.model, 'remove', this.removeTodoView);
  },
  addTodoByUsual: function(e) {
    this.model.addTodo($(e.target).text());
  },
  addTodoByForm: function(e) {
    e.preventDefault();
    var $input = $(e.target).find("input[type=text]");
    if ($input.val()) {
      this.model.addTodo($input.val());
    }
    $input.val(null);
  },
  removeTodo: function (e) {
    var target = this.model.filter(function (m) {
      return m.get('complete') === true;
    });
    this.model.remove(target);
  },
  addTodoView: function(model) {
    var itemView = new ViewTodoList({
      model: model
    });
    this.$('.todo-list').append(itemView.render().el);
  },
  removeTodoView: function (model) {
    var text = model.get('text');
    this.$("input[value='"+text+"']").closest("li").remove();
  }
});

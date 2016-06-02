describe('Todos tracker', function() {

  var mock = require('protractor-http-mock');

  beforeEach(function(){
    mock([{
      request: {
        path: 'http://quiet-beach-24792.herokuapp.com/todos.json',
        method: 'GET'
      },
      response: {
        data: [{text: "ToDo1", completed: true}, {text: "ToDo2", completed: false}]
      }
    }]);
  });


  it('has several ToDos', function() {
    browser.get('/');
    var todos = $$('#todos p');
    expect(todos.first().getText()).toMatch('ToDo1: completed');
    expect(todos.last().getText()).toMatch('ToDo2: not completed');
  });
  it('can add a ToDo', function() {
    browser.get('/');
    $('#new-todo-name').sendKeys("NewToDo");
    $('#add-todo').click();

    var todo = $$('#todos p').last().getText();
    expect(todo).toMatch('NewToDo: not completed');
  });
  it('can remove a ToDo', function() {
    browser.get('/');
    var todos = $$('#todos p');
    var intialCount = todos.count();

    $('#remove-todo').click();

    expect(todos.count()).toEqual(1);
  });

   it('can mark a ToDo as complete', function(){
    browser.get('/');
    var todo = $$('#todos p').last();
    todo.element(by.css('.complete')).click();

    expect(todo.getText()).toMatch("ToDo2: completed");
  });

   it ('can count number of todos remaining', function(){
    browser.get('/');
    var todos = $$('#todos span');
    expect(todos.getText()).toMatch('1 of 2 remaining');
   });

   afterEach(function(){
    mock.teardown();
  });

   it('can count number of todos remaining when another one is added', function(){
    browser.get('/');
    $('#new-todo-name').sendKeys("NewToDo");
    $('#add-todo').click();

    var todos = $$('#todos span');
    expect(todos.getText()).toMatch('2 of 3 remaining');
   });


   it('can count number of todos remaing when the last is removed', function(){
    browser.get('/');
    $('#remove-todo').click();

    var todos = $$('#todos span');
    expect(todos.getText()).toMatch('0 of 1 remaining');
   });

   it('can count number of todos remaining when one is marked as complete', function(){
    browser.get('/');
    var todo = $$('#todos p').last();
    todo.element(by.css('.complete')).click();

    var todos = $$('#todos span');
    expect(todos.getText()).toMatch('0 of 2 remaining');

   });

});
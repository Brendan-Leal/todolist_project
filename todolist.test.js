"use strict";

const Todo = require('../lib/todo');
const TodoList = require('../lib/todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  test("todolist has a size of 3", () => {
    expect(list.size()).toBe(3);
  });

  test("calling toArray returns the list in array from", () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test("calling first returns the first object in the todos array", () => {
    expect(list.first()).toEqual(todo1);
  });

  test("calling last returns the last object in the todos array", () => {
    expect(list.last()).toEqual(todo3);
  });

  test("calling shift returns and removes the first object in the todos array", () => {
    let todo = list.shift();
    expect(todo).toEqual(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });

  test("calling pop removes and returns the last object in the todos array", () => {
    let lastTodo = list.pop();
    expect(lastTodo).toBe(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  test("isDone() returns true when all items in the todos list are marked done, false otherwise", () => {
    expect(list.isDone()).toBe(false);
    todo1.done = true;
    todo2.done = true;
    todo3.done = true;
    expect(list.isDone()).toBe(true);
  });

  test("passing anything other than a Todo object will throw a TypeError", () => {
    expect(() => list.add("something")).toThrow(TypeError);
    expect(() => list.add(1)).toThrow(TypeError);
  });

  test("returns the todo object at a given index. If no index provided throws a ReferenceError", () => {
    expect(list.itemAt(0)).toEqual(todo1);
    expect(() => list.itemAt()).toThrow(ReferenceError);
  });

  test(`sets the done property of an object to true at a given index in the todos array.
  If invalid index then throws a reference error.`, () => {
    list.markDoneAt(0);
    expect(todo1.done).toBe(true);

    expect(() => list.markDoneAt()).toThrow(ReferenceError);
  });

  test('markUndoneAt marks todo at given index undone', () => {
    expect(() => list.markUndoneAt(6)).toThrow(ReferenceError);
    todo1.markDone();
    todo2.markDone();
    todo3.markDone();

    list.markUndoneAt(1);

    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(false);
    expect(todo3.isDone()).toBe(true);
  });

  test("markAllDone marks all todo objects done", () => {
    list.markAllDone();

    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(true);
    expect(list.isDone()).toBe(true);
  });

  test("remove a todo object from the todos array given an index, if bad index throws a ReferenceError", () => {

    expect(() => list.removeAt()).toThrow(ReferenceError);
    list.removeAt(1);
    expect(list.toArray()).toEqual([todo1, todo3]);
  });

  test('toString returns string representation of the list', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(string);
  });

  test('toString returns different string for done todo', () => {
    let string = `---- Today's Todos ----\n[ ] Buy milk\n[X] Clean room\n[ ] Go to the gym`;

    list.markDoneAt(1);

    expect(list.toString()).toBe(string);
  });

  test("toString returns a unique string when all todos are done", () => {
    let string = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;

    list.markAllDone();
    expect(list.toString()).toBe(string)
  });

  test("forEach iterates over each todo object", () => {
    let result = [];
    list.forEach(todo => result.push(todo));

    expect(result).toEqual([todo1, todo2, todo3]);
  });

  test("filter", () => {
    list.markDoneAt(0);

    let newList = list.filter(todo => {
      return todo.isDone;
    });

    expect(newList).toEqual(list);
  });
});
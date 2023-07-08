'use strict'

var toDoList = []

/**
 * post(route, body)
 * Handling POST Request (Create)
 * 
 * route: String - the name of GET request route
 * body: String - String in valid JSON format
 * 
 * return status code and body (if any)
 */

exports.post = (route, body) => {
    switch (route) {
        case "add":
            return add(body);
            break;

        default:
            return { 'code': 400, 'body': 'Bad Request' };
    }
}

function add(body) {
    var newItem = (JSON.parse(body))
    if (typeof newItem === "object") {
        toDoList.push(newItem);

        return { 'code': 201, 'body': 'Add new item success' };
    } else {
        return { 'code': 400, 'body': 'Please add new item' }
    }

}


/**
 * get(route)
 * Handling GET Request
 * 
 * route: String - the name of GET request route
 * 
 * return status code and body (if any)
 */

exports.get = (route) => {
    switch (route) {
        case "list":
            return { 'code': 200, 'body': getAll() };

        default:
            return { 'code': 400, 'body': 'Bad Request' };
    }
}

function getAll() {
    if (toDoList.length === 0) {
        return { code: 400, body: "No items in the list" };
    } else {
        return toDoList.map((task, index) => ({ id: index, task: toDoList[index].task }));
    }
}




/**
 * put(route)
 * Handling PUT Request (Update or Delete a designated item from the array)
 * 
 * route: String - the name of GET request route
 * body: String - String in valid JSON format
 * 
 * return status code and body (if any)
 */
 exports.delete = (route, body) => {
    switch (route) {
      case "remove":
        let taskName = JSON.parse(body).name;
        let index = toDoList.findIndex(task => task.name === taskName);
        return remove(index);
      default:
        return { code: 400, body: "Invalid Request" };
    }
  };
  
  function remove(body) {
    const taskName = body.name;
    const index = toDoList.findIndex(task => task.name === taskName);
    if (index !== -1) {
      toDoList.splice(index, 1);
      return { code: 200, body: `Task "${taskName}" removed successfully` };
    } else {
      return { code: 400, body: `Task "${taskName}" not found in the list` };
    }
  }
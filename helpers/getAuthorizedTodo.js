const getAuthorizedTodos = (req, id) => {
  if (req.authorizedTodos) {
    let authorizedTodos = req.authorizedTodos.map((todo) => todo.dataValues),
      todo = authorizedTodos.find((todo) => todo.id === +id);
    return todo;
  } else return;
};

module.exports = getAuthorizedTodos;

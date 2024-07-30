export const addTodo = async (payload) => {
  console.log(payload);

  const result = await $fetch("/api/todos/add", {
    method: "POST",
    body: payload,
  });

  if (!result.acknowledged) {
    throw new Error("Error creating a todo!");
  }

  return true;
};

export const removeTodo = async (_id) => {
  const result = await $fetch("/api/todos/remove", {
    method: "POST",
    body: { id: _id },
  });

  if (!result.acknowledged) {
    throw new Error("Error creating a todo!");
  }

  return true;
};

export const editTodo = async (payload) => {
  const id = payload._id;

  const data = {};

  Object.keys(payload).forEach((key) => {
    if (key === "_id") return;
    data[key] = payload[key];
  });

  const result = await $fetch("/api/todos/edit", {
    method: "POST",
    body: { id, payload: data },
  });

  if (!result.acknowledged) {
    throw new Error("Error creating a todo!");
  }

  return true;
};

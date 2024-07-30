const URL = process.env.SERVER_URL || "http://localhost:5005";

export default defineEventHandler(async (event) => {
  const { id, payload } = await readBody(event);

  const result = await $fetch(`${URL}/edit-todo`, {
    method: "POST",
    body: {
      id,
      payload,
    },
  });

  return result;
});

import axios from "axios";

export const getPostsRequests = async () => {
  return await axios.get("https://staychill.up.railway.app/posts"); //Ver 'proxy' en package.json
};

export const createPostsRequests = async (post) => {
  const form = new FormData(); //Crea un form para mandar, para que soporte la subida de imagenes
  for (let key in post) {
    form.append(key, post[key]);
  } //Agarra cada una de las propiedades del json que llega y las agrega como nuevos campos en el nuevo form con sus respectivos valores
  return await axios.post("https://staychill.up.railway.app/posts", form, {
    headers: {
      "Content-Type": "multipart/form-data", //Esto le dice que se van a enviar files tambien
    },
  });
};

export const deletePostRequests = async (id) => {
  return await axios.delete("https://staychill.up.railway.app/posts/" + id);
};

export const getPostRequests = async (id) => {
  return await axios.get("https://staychill.up.railway.app/posts/" + id); //Ver 'proxy' en package.json
};

export const updatePostRequests = async (id, newFields) => {
  return await axios.put(
    `https://staychill.up.railway.app/posts/${id}`,
    newFields
  );
};

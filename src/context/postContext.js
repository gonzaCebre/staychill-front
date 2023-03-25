//Si este componente tiene un estado, todos los componentes dentro van a tener acceso a este estado

import { useState, createContext, useContext, useEffect } from "react";
import {
  createPostsRequests,
  deletePostRequests,
  getPostsRequests,
  getPostRequests,
  updatePostRequests,
} from "../api/posts";

const postContext = createContext(); //Crea el contexto

export const usePosts = () => {
  //Creamos nuestro propio hook para evitar varios pasos al llamarlo desde otro componente
  const context = useContext(postContext);
  return context;
};

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const res = await getPostsRequests(); //Llama la funcion de axios
    setPosts(res.data);
  };

  const createPost = async (post) => {
    try {
      const res = await createPostsRequests(post);
      setPosts([...posts, res.data]); //Agrega el nuevo post a los ya existentes
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (id) => {
    await deletePostRequests(id);
    setPosts(posts.filter((post) => post._id !== id)); //Filtra y elimina el elemento del array
  };

  const getPost = async (id) => {
    const res = await getPostRequests(id);
    return res.data;
  };

  const updatePost = async (id, post) => {
    const res = await updatePostRequests(id, post);
    setPosts(posts.map((post) => (post._id === id ? res.data : post))); //Si el id existe lo modifica, sino lo deja como esta
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <postContext.Provider
      value={{
        posts,
        getPosts,
        createPost,
        deletePost,
        getPost,
        updatePost,
      }} //Dentro de value va a ir todo lo que queremos compartir
    >
      {children}
    </postContext.Provider>
  );
};

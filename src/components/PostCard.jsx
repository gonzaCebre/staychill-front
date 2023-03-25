/* eslint-disable jsx-a11y/alt-text */
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../context/postContext";

export function PostCard({ post }) {
  const { deletePost } = usePosts();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    toast(
      (
        t //'t' seria como el event, tiene la info del toast
      ) => (
        <div>
          <p>¿Estás seguro que querés eliminarlo?</p>
          <div>
            <button
              onClick={() => {
                deletePost(id);
                toast.dismiss(t.id);
              }}
            >
              Eliminar
            </button>
            <button onClick={() => toast.dismiss(t.id)}>Cancelar</button>
          </div>
        </div>
      ),
      {
        style: {
          background: "#202020",
          color: "#0db44d",
        },
      }
    );
  };

  return (
    <div>
      <h3>{post.title}</h3>
      {post.image && <img src={post.image.url} />}
      <p>{post.description}</p>
      <button onClick={() => handleDelete(post._id)}>Delete</button>
      <button onClick={() => navigate(`/posts/${post._id}`)}>Editar</button>
    </div>
  );
}

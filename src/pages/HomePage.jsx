import { usePosts } from "../context/postContext";
import { VscEmptyWindow } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { PostCard } from "../components/PostCard";
import { useEffect } from "react";

export function HomePage() {
  const { posts } = usePosts();

  /*   useEffect(() => {
    const fetchCheckout = async () => {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          user,
          turno,
        }),
      });
      const data = await response.json();

      console.log(data.global);

      if (data.global) {
      }
    };
  }, []);
 */
  if (posts.length === 0)
    return (
      <div>
        <Link to='/new'>Crear nuevo post</Link>
        <h1>No hay posts</h1>
        <VscEmptyWindow />
      </div>
    );

  return (
    <div>
      <Link to='/new'>Crear nuevo post</Link>
      <p>{posts.length}</p>
      <div>
        {posts.map((post) => (
          <PostCard post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
}

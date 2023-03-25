import { usePosts } from "../context/postContext";
import { VscEmptyWindow } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { PostCard } from "../components/PostCard";

export function HomePage() {
  const { posts } = usePosts();

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

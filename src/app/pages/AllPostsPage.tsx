import { useState, useEffect } from "react";
import { PostCard } from "@/components/index";
import { postServices } from "@/appwrite/services/services";
import { PostDocument } from "@/type/services";

function AllPosts() {
  const [posts, setPosts] = useState<PostDocument[]>([]);

  useEffect(() => {
    postServices.getPosts().then((res) => {
      const posts = res.data;
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="w-full py-8">
      <div className="flex flex-wrap">
        {posts.map((post) => (
          <div key={post.$id} className="p-2 w-1/4">
            <PostCard
              content={post.content}
              $id={post.$id}
              title={post.title}
              featuredImage={post.featuredImage}
              key={post.$id}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllPosts;

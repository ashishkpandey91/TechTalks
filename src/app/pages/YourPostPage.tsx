import { useState, useEffect } from "react";
import { PostCard } from "@/components/index";
import { postServices } from "@/appwrite/services/services";
import { PostDocument } from "@/type/services";
import { useAppSelector } from "@/store/hook";

function YourPost() {
  const userData = useAppSelector((state) => state.auth.userData);

  const [posts, setPosts] = useState<PostDocument[]>([]);

  useEffect(() => {
    postServices.getPosts().then((res) => {
      const fetchedPosts = res.data;
      if (fetchedPosts && fetchedPosts.documents) {
        const userPosts = fetchedPosts.documents.filter(post => post.userId === userData?.$id);
        setPosts(userPosts);
      }
    }).catch((error) => {
      console.error("Error fetching posts:", error);
    });
  }, [userData]);

  return (
    <div className="pt-24 pb-8 overflow-x-hidden grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 items-center">
      {posts.map((post) => (
        <div key={post.$id} className="p-2 w-full sm:w-1/2 lg:w-1/3">
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
}

export default YourPost;

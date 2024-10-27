import { useState, useEffect } from "react";
import { PostCard } from "@/components/index";
import { postServices } from "@/appwrite/services/services";
import { PostDocument } from "@/type/services";
import { LoaderCircle } from "lucide-react";

function AllPosts() {
  const [posts, setPosts] = useState<PostDocument[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    postServices.getPosts().then((res) => {
      const posts = res.data;
      if (posts) {
        setPosts(posts.documents);
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return <LoaderCircle size={100} className="mr-1 animate-spin" />; 
  }

  return (
    
      <div className="pt-24 pb-8 overflow-x-hidden grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 items-center">
        {posts.map((post) => (
          <div key={post.$id} className="p-2 w-1/4 ">
            <PostCard post={post} />
          </div>
        ))}
      </div>
  );
}

export default AllPosts;

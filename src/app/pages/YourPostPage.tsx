import { useState, useEffect } from "react";
import { PostCard } from "@/components/index";
import { postServices } from "@/appwrite/services/services";
import { PostDocument } from "@/type/services";
import { useAppSelector } from "@/store/hook";

function YourPost() {
  const userData = useAppSelector((state) => state.auth.userData);

  const [posts, setPosts] = useState<PostDocument[]>([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    setLoading(true); // Set loading to true when fetching starts
    postServices.getPosts()
      .then((res) => {
        const fetchedPosts = res.data;
        if (fetchedPosts && fetchedPosts.documents) {
          const userPosts = fetchedPosts.documents.filter(
            (post) => post.userId === userData?.$id
          );
          setPosts(userPosts);
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after fetching is complete
      });
  }, [userData]);

  if (loading) {
    return <div>Loading...</div>; // Display a loading message or spinner while loading
  }

  return (
    <div className="pt-24 pb-8 overflow-x-hidden grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 items-center">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.$id} className="p-2 w-full sm:w-1/2 lg:w-1/3">
            <PostCard post={post} />
          </div>
        ))
      ) : (
        <h1 className="font-medium md:text-xl">
          You haven’t posted anything yet!
        </h1>
      )}
    </div>
  );
}

export default YourPost;

import { postServices } from "@/appwrite/services";
import PostForm from "@/components/post-form/Postform";
import { PostDocument } from "@/type/services";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPosts] = useState<PostDocument>();
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      postServices.getPost(slug).then(({ data }) => {
        if (data) {
          setPosts(data);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return post ? (
    <div className="py-8">
      <div className="container mt-24">
        <h1 className="font-bold text-center text-xl">Update Post</h1>

        <PostForm post={post} />
      </div>
    </div>
  ) : null;
}

export default EditPost;

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { bucketService, postServices } from "../../appwrite/services/index";
import { Button } from "@/components/ui/button";
import parse from "html-react-parser";
import { useAppSelector } from "@/store/hook";
import { PostDocument } from "@/type/services";

export default function Post() {
  const [post, setPost] = useState<PostDocument>();
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useAppSelector((state) => state.auth.userData);

  useEffect(() => {
    if (slug) {
      postServices.getPost(slug).then(({ data, error }) => {
        if (error) {
          console.log("Post not available");
          console.log(error);
          return;
        }
        setPost(data);
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    if (!post) return;

    postServices.deletePost(post.$id).then((status) => {
      if (status) {
        bucketService.deleteImage(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8  mt-36 ">
      <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
        <img
          src={bucketService.getPreview(post.featuredImage)}
          alt={post.title}
          className="rounded-xl"
        />

        {userData?.$id === post.userId && (
          <div className="absolute right-6 top-6">
            <Link to={`/edit-post/${post.$id}`}>
              <Button className="mr-3">Edit</Button>
            </Link>
            <Button variant={"destructive"} onClick={deletePost}>
              Delete
            </Button>
          </div>
        )}
      </div>
      <div className="w-full mb-6">
        <h1 className="text-2xl font-bold">{post.title}</h1>
      </div>
      <div className="browser-css">{parse(post.content)}</div>
    </div>
  ) : null;
}

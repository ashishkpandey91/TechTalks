import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { bucketService, postServices } from "../../appwrite/services/index";
import { Button } from "@/components/ui/button";
import parse from "html-react-parser";
import { useAppSelector } from "@/store/hook";
import { PostDocument } from "@/type/services";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Post() {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "long",
    day: "numeric",
    // hour: "2-digit",
    // minute: "2-digit",
    // second: "2-digit",
    hour12: true,
  };

  const [post, setPost] = useState<PostDocument>();
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useAppSelector((state) => state.auth.userData);
  const updatedDate: Date = post?.$updatedAt ? new Date(post?.$updatedAt) : new Date(0);
  const formattedDate: string = updatedDate.toLocaleString("en-IN", options);



  useEffect(() => {
    if (slug) {
      postServices.getPost(slug).then(({ data, error }) => {
        if (error) {
          console.log("Post not available");
          console.log(error);
          return;
        }
        setPost(data.documents[0]);
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
    <div className=" container bg-gray-200 dark:bg-slate-700 p-5 mt-28 mb-5 rounded-sm mx-4">
      <div className="w-full flex justify-start mb-4 relative p-2">
        <div className="flex flex-col md:flex-row items-center justify-center md:items-start">
          <div className=" w-full md:w-[70%] md:h-[400px] bg-black p-2 rounded-lg">
            <img
              src={bucketService.getPreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg h-56 md:h-96"
            />
          </div>
          {userData?.$id === post.userId && (
            <div className="m-5">
              <Link to={`/edit-post/${post.slug}`}>
                <Button className="m-3 w-20">Edit</Button>
              </Link>
              <Button className="m-3" variant={"destructive"}>
                <AlertDialog>
                  <AlertDialogTrigger>Delete</AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your post.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-500 hover:bg-red-400"
                        onClick={deletePost}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </Button>
            </div>
          )}
        </div>
      </div>
      <p className="text-xs text-left py-3">{`${formattedDate.toLocaleLowerCase()}`}</p>

      <div className="w-full mb-6">
        <h1 className="text-2xl font-bold">{post.title}</h1>
      </div>
      <div className="browser-css">{parse(post.content)}</div>
    </div>
  ) : null;
}

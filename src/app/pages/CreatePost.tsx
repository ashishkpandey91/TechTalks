import PostForm from "@/components/post-form/Postform";

function CreatePost() {
  return (
    <div className=" container mt-24">
      <h1 className="font-bold text-center text-xl">Create New Post</h1>
      <PostForm />
    </div>
  );
}

export default CreatePost;

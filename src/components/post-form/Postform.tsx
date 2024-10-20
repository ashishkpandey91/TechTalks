import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Post, PostDocument } from "@/type/services";
import { bucketService, postServices } from "@/appwrite/services";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RTE from "../Editor";
import Select from "../Select";
import { useAppSelector } from "@/store/hook";

type Props = {
  post?: PostDocument;
};

export default function PostForm({ post }: Props) {
  const form = useForm<Post & { image: File[] }>({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const { register, handleSubmit, watch, setValue, control, getValues } = form;

  const navigate = useNavigate();
  const userData = useAppSelector((state) => state.auth.userData);

  const submit = async (data: Post & { image: File[] }) => {
    if (!userData) {
      console.log("User is null");
      return;
    }
    // // Todo: implement this feature
    if (post) {
      console.log("data: ", data);
      alert("Featured not implemented");
      return;
      //   // We have to update the ducument
      //   const file = data.image[0]
      //     ? await bucketService.uploadImage(data.image[0])
      //     : null;

      //     // Step 1: any image selected by user
      //     if(data.image[0])b

      //   if (file) {
      //     appwriteService.deleteFile(post.featuredImage);
      //   }

      //   const dbPost = await appwriteService.updatePost(post.$id, {
      //     ...data,
      //     featuredImage: file ? file.$id : undefined,
      //   });

      //   if (dbPost) {
      //     navigate(`/post/${dbPost.$id}`);
      //   }
    } else {
      // We have to create new ducument
      // Step 1 Upload file
      const { data: fileData, error: fileError } =
        await bucketService.uploadImage(data.image[0]);

      if (fileError) {
        console.log("file not uploaded");
        return;
      }

      const { data: newPost, error } = await postServices.createPost({
        ...data,
        featuredImage: fileData.$id,
        userId: userData.$id,
      });

      if (error) {
        console.log("Post can not created at this time try again");
        return;
      }

      navigate(`/post/${newPost.$id}`);
    }
  };

  const slugTransform = useCallback((value: string) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        if (value && value?.title) {
          setValue("slug", slugTransform(value.title), {
            shouldValidate: true,
          });
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post?.featuredImage && (
          <div className="w-full mb-4">
            <img
              src={bucketService.getPreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button type="submit" className="w-full">
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

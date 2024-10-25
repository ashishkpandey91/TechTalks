import { useCallback, useEffect, useState } from "react";
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
  const [loading, setLoading] = useState<boolean>(false);

  const [featuredImageSrc, setFeaturedImageSrc] = useState<string | undefined>(
    () => {
      if (post) {
        return bucketService.getPreview(post.featuredImage);
      }

      return undefined;
    }
  );

  const form = useForm<Post & { image: File[] }>({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
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

    setLoading(true);

    if (post) {
      const file = data.image[0]
        ? await bucketService.uploadImage(data.image[0])
        : null;

      if (file && file.error) {
        console.log("Error while uploading file: ", file.error);
        setLoading(false);
        return;
      }

      if (file?.data) {
        bucketService.deleteImage(post.featuredImage);
      }

      const { data: dbpost } = await postServices.updatePost({
        ...post,
        slug: data.slug,
        featuredImage: file?.data.$id || data.featuredImage,
        content: data.content,
        title: data.title,
        status: data.status,
      });

      if (dbpost) {
        setLoading(false);
        navigate(`/post/${dbpost.slug}`);
      }
    } else {
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
      setLoading(false);

      if (error) {
        console.log("Post can not created at this time try again");
        return;
      }

      navigate(`/post/${newPost.slug}`);
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
    <form onSubmit={handleSubmit(submit)} className="w-full">
      <div className="m-3 md:flex ">
        <div className="w-full px-2 my-3">
          <label htmlFor="456" className="font-bold ">
            Write Title :
          </label>
          <Input
            id="456"
            placeholder="Title"
            className="my-4"
            {...register("title", { required: true })}
          />
          <label htmlFor="789" className="font-bold ">
            Slug :
          </label>
          <Input
            placeholder="Slug"
            className="my-4"
            id="789"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />
          <RTE
            label="Write Content :"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
        <div className=" md:w-2/3 px-2 my-3">
          <label htmlFor="123" className="font-bold ">
            Upload Image :
          </label>
          <Input
            id="123"
            type="file"
            className="my-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const src = URL.createObjectURL(file);
                setFeaturedImageSrc(src);
              }
            }}
          />
          {featuredImageSrc && (
            <div className="w-full mb-4">
              <img
                src={featuredImageSrc}
                alt={post?.title}
                className="rounded-lg"
              />
            </div>
          )}

          <Select
            options={["active", "inactive"]}
            label="Status"
            className="my-4"
            {...register("status", { required: true })}
          />
          <Button type="submit" className="w-full my-4" loading={loading}>
            {post ? "Update" : "Submit"}
          </Button>
        </div>
      </div>
    </form>
  );
}

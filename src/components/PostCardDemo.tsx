import Image from "next/image";

const PostCard = ({ post }) => {

  return (
    <div
      key={post.id}
      className="group cursor-pointer"
      
    >
      <div className=" overflow-hidden rounded-md bg-gray-100 transition-all">
        <a className="relative block aspect-video">
          <Image
            alt="Thumbnail"
            fetchPriority="high"
            decoding="async"
            className="object-cover transition-all"
            sizes="(max-width: 768px) 30vw, 33vw"
            src={post.attributes?.cover_image?.data?.attributes.url}
            fill
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              inset: 0,
              color: "transparent",
            }}
          />
        </a>
      </div>
      <div className="">
        <div>
          <div className="flex gap-3">
            <span className="inline-block text-xs font-medium tracking-wider uppercase mt-5 text-blue-600">
              {post.attributes?.blog_category?.data?.attributes?.category}
            </span>
          </div>
          <h2 className="text-lg font-semibold leading-snug tracking-tight mt-2 text-black">
            <a>
              <span className="text-black bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
                {post?.attributes?.title}
              </span>
            </a>
          </h2>
          <div className="hidden">
            <div className="mt-2 line-clamp-3 text-sm text-gray-500 ">
              <p>{post?.attributes?.seo_text}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center space-x-3 text-gray-500 ">
            <div className="flex items-center gap-3">
              <span className="truncate text-sm font-semibold">
                {post?.attributes?.author?.data?.attributes?.name}
              </span>
            </div>
            {post?.attributes?.author?.data?.attributes?.name && (
              <span className="text-xs text-gray-300">•</span>
            )}

            <time
              className="truncate text-sm"
              style={
                post?.attributes?.author?.data?.attributes?.name
                  ? {}
                  : { marginLeft: "0px" }
              }
              dateTime="2022-10-21T15:48:00.000Z"
            >
              {/* {formatDate(post?.attributes?.creation_date)} */}
            </time>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import bucketService from "../appwrite/services/bucketService";
import parse from "html-react-parser";
import { PostDocument } from "@/type/services";

const PostCard = ({ post }: { post: PostDocument }) => {
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

  const { slug, title = "", content = "", featuredImage, $updatedAt } = post;
  const updatedDate: Date = new Date($updatedAt);

  const formattedDate: string = updatedDate.toLocaleString("en-IN", options);

  return (
    <Link to={`/post/${slug}`}>
      <Card className="mx-3 w-80 h-96 rounded-md bg-transparent shadow-sm shadow-emerald-700">
        <img
          className="w-full h-[47%] rounded-t-md "
          src={
            featuredImage
              ? bucketService.getPreview(featuredImage)
              : "default-image-url"
          }
          alt="img"
        />
        <p className="text-xs mt-4 text-right mr-3">{`${formattedDate.toLocaleLowerCase()}`}</p>
        <CardHeader>
          <CardTitle className="text-base">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <p>{parse(`${content.substring(0, 70)} . . . .`)}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PostCard;

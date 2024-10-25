import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import bucketService from "../appwrite/services/bucketService";
import parse from "html-react-parser";
import { PostDocument } from "@/type/services";

const PostCard = ({ post }: { post: PostDocument }) => {
  const { slug, title = "", content = "", featuredImage } = post;
  return (
    <Link to={`/post/${slug}`}>
      <Card className="mx-3 w-80 h-96 p-3 shadow-md rounded-md">
        <img
          className="w-full h-40 rounded-md "
          src={
            featuredImage
              ? bucketService.getPreview(featuredImage)
              : "default-image-url"
          }
          alt="img"
        />
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{parse(`${content.substring(0, 70)} . . . .`)}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PostCard;

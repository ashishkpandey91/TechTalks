import { postCard } from "@/type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import bucketService from '../appwrite/services/bucketService'
import parse from 'html-react-parser'

const PostCard = (post: postCard) => {
  const {
    $id ,
    title = "mice testing...",
    content = "mice testing...",
    featuredImage,
  } = post;
  return (
    <Link to={`/post/${$id}`} >
      <Card className="mx-3 w-[400px] p-3 shadow-md rounded-md">
        <img className="w-full rounded-md " src={ featuredImage ? bucketService.getPreview(featuredImage) : 'default-image-url'} alt="img" />
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{parse(content)}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PostCard;

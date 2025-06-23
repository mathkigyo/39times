type Props = {
  post: {
    title: string;
    description: string;
    slug: string;
  };
};

const PostCard = ({ post }: Props) => {
  return (
    <div className="border rounded-lg p-4 shadow">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="text-gray-600">{post.description}</p>
    </div>
  );
};

export default PostCard;

function Post({ data }) {
  return (
    <div className="Post">
      <h2>{data.author}</h2>
      <p>{data.content}</p>
      <button>like</button>
    </div>
  );
}

export default Post;

function Post({ data }) {
  return (
    <div>
      <h2>{data.author}</h2>
      <p>{data.content}</p>
      <button>like</button>
    </div>
  );
}

export default Post;

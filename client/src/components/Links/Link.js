const Link = (props) => {
  const { url, description } = props;

  return (
    <p>
      URL: {url} - <span>{description}</span>
    </p>
  );
};

export default Link;

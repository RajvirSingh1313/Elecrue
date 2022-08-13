const Links = ({ title, link, color }) => {
  return (
    <a
      className={`bg-${color}-500 rounded p-2 m-1`}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      {title}
    </a>
  );
};

export default Links;

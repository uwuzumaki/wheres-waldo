import { useParams } from "react-router-dom";

const Picture = () => {
  const params = useParams();

  return (
    <>
      <p>picture</p>
      <p>{params.pictureID}</p>
    </>
  );
};

export default Picture;

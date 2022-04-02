import Image from "next/image";
import { useEffect, useState } from "react";
import loadStyles from "./styles-component/load.module.css";
import axios from "axios";
import SquareLoader from "react-spinners/SquareLoader";
import classNames from "classnames";
import "tailwindcss/tailwind.css";

export default function LoadSwapImage({ url }) {
  const [imageUri, setImageUri] = useState();

  useEffect(() => {
    const getImage = async () => {
      const res = await axios.get(url);
      const json = await res.data;
      setImageUri(json);
      console.log(json);
    };
    getImage();
  }, []);

  // <Image src={data.haveform.} width={50} height={50} alt="test" layout="responsive" />
  return (
    <>
      {imageUri ? (
        <div className={loadStyles.metadata_image_content_main}>
          <Image
            src={imageUri.image}
            width={50}
            height={50}
            alt={imageUri.image}
            layout="responsive"
          />
          <div
            className={classNames({
              [loadStyles.metadata_image_content_text]: true,
            })}
          >
            description: {imageUri.description}
          </div>
        </div>
      ) : (
        <>
          <SquareLoader color={"#087592"} />
        </>
      )}
    </>
  );
}

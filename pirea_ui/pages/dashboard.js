import Layout from '../components/layout'
import dashStyles from './styles/dashboard.module.css'
import Image from "next/image";
import profile from '../assets/test_item.png'
import { Icon } from '@iconify/react';
import Map from '../components/map'
import { useState, useCallback, useMemo } from 'react'
import { create } from 'ipfs-http-client'
import { useDropzone } from 'react-dropzone'


// TODO: 스마트컨트랙트와 연동
// TODO: map click 동작구현

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};
const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

function MyDropzone({ onChange, previewFile, onDrop }) {
  // Do something with the files
  const {
    isDragActive,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({ accept: 'image/*', onDrop });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  return (

    <div className="dropContainer">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here</p>
            :
            <p>Drag drop some files here, or click to select files</p>
        }
        {
          previewFile ?
            <img src={previewFile.preview} alt="none" width="200" /> :
            "none"
        }
      </div>
    </div>
  )
}


export default function Dashboard() {
  const [t, setT] = useState(false);
  const [previewFile, setPreviewFile] = useState();

  async function onChange(e) {
    const file = e.target.files[0];
    setUserFileUrl(file);
    console.log(file.path)
  }

  const onDrop = useCallback(acceptedFiles => {
    // setUserFileUrl(acceptedFiles[0]);
    setPreviewFile({ preview: URL.createObjectURL(acceptedFiles[0]) });
    setUserFileUrl(URL.createObjectURL(acceptedFiles[0]));
  });

  return (
    <>
      <Layout>
        <div className={dashStyles.dashboard_main}>
          {/*left*/}
          <div className={dashStyles.dashboard_left_main}>
            <div className={dashStyles.dashboard_map}>
              <Map className={dashStyles.dashboard_map_canvas} />
            </div>
            <div className={dashStyles.dashboard_search_main}>
              <input placeholder="Search Owner Address" className={dashStyles.dashboard_search_input} type="text" />
              <Icon icon="ant-design:search-outlined" color="#087592" height="15" hFlip={true} />
            </div>
            <div className={dashStyles.dashboard_description_main}>
              <div className={dashStyles.dashboard_description_content_header}>
                Description
              </div>
            </div>
          </div>
          {/*right*/}
          {t ?
            <div>
              <div>
                <div className={dashStyles.dashboard_profile_header} >
                  Map Analytics
                </div>
                <div className={dashStyles.dashboard_profile_img_main} >
                  <div className={dashStyles.dashboard_profile_img}>
                    <Image src={profile} alt="test" />
                  </div>
                </div>
                <div className={dashStyles.dashboard_profile_address_main}>
                  <div className={dashStyles.dashboard_profile_address_header}>
                    Owner address:
                  </div>
                  <div className={dashStyles.dashboard_profile_address_text}>
                    0x8772901ea06D450C18A92a53927Ba63EFcC97Dbe
                  </div>
                </div>
                <div>
                </div>
                <div>
                </div>
              </div>
              <div className={dashStyles.dashboard_offers_main}>
                <div className={dashStyles.dashboard_offers_header}>
                  Offer
                </div>
              </div>
              <div className={dashStyles.dashboard_price_history_main}>
                <div className={dashStyles.dashboard_price_history_header}>
                  Price History
                </div>
              </div>
            </div>
            :
            <div>
              <div className={dashStyles.dashboard_profile_header} >
                Map Analytics
              </div>
              <div className={dashStyles.dashboard_none_profile_address}>
                OwnerAddress: None
              </div>
              <div className={dashStyles.dashboard_none_profile_axis_main}>
                <div className={dashStyles.dashboard_none_profile_axis_x}>
                  x:
                </div>
                <div>
                  y:
                </div>
              </div>
              <div className={dashStyles.dashboard_none_profile_input_des_main}>
                <div className={dashStyles.dashboard_none_profile_input_des_header}>
                  Description
                </div>
                <input className={dashStyles.dashboard_none_profile_input_des_text} type="text" />
              </div>
              <div className={dashStyles.dashboard_none_profile_image_drop_main}>
                <div className={dashStyles.dashboard_none_profile_image_drop_header}>
                  Image
                </div>
                <MyDropzone onChange={onChange} onDrop={onDrop} previewFile={previewFile} />
                <div className={dashStyles.dashboard_none_profile_button_main}>
                  <div className={dashStyles.dashboard_none_profile_button_mint}>
                    <Icon icon="akar-icons:circle-check-fill" color="white" height="15" hFlip={true} />
                    <div>
                      Mint
                    </div>
                  </div>
                </div>
              </div>
              <div className={dashStyles.dashboard_price_history_main}>
                <div className={dashStyles.dashboard_price_history_header}>
                  Price History
                </div>
              </div>

            </div>
          }
        </div>
        <div>
        </div>
      </Layout>
    </>
  )
}

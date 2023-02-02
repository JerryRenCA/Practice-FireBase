import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import {createUserWithEmailAndPassword } from "firebase/auth";
import { T_newUserFields } from "./newFields";
import { default_User, handleAdd, handleInput, handleSetFile } from "./newHandlers";

// Styled components
const Container = tw.div` grid grid-cols-4 `;
const Form=tw.form`col-span-3`
const ImgTag = tw.img` w-[10rem] h-[10rem] rounded-full`;
const FieldsWrapper = tw.div`flex flex-col flex-wrap gap-4 w-full max-h-[20rem]`;
const FieldDiv = tw.div`flex flex-col`;
const FieldLabel = tw.label`w-30 h-8 align-middle`;
const FieldInput = tw.input` border-b-2  p-1 w-56`;
const SubmitBtn=tw.button` text-xl border-2 w-56 bg-purple-700 rounded-md mt-8`

// Module
const New = ({ newUserFields }: { newUserFields: T_newUserFields[] }) => {
  const [userData, setUserData] = useState(default_User);
  const [per, setPer] = useState(1000);

  useEffect(()=>{
    console.log(userData)
  },[userData])
  // render module
  return (
    <Container>
      <div className="flex justify-center m-8 ">
        <ImgTag
          src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
          alt="no pic"
        />
      </div>
      <Form onSubmit={(e)=>handleAdd(e,userData,setUserData)} >
        <div className="h-20 mt-12">
          <label htmlFor="file" className=" text-xl font-roboto">
            Image: <FileUploadIcon className="icon" />
          </label>
          <input
            type="file"
            id="file"
            onChange={handleSetFile}
            style={{ display: "none" }}
          />
        </div>
        <FieldsWrapper>
          {newUserFields.map((input) => (
            <FieldDiv key={input.id}>
              <FieldLabel>{input.label}</FieldLabel>
              <FieldInput
                id={input.id}
                type={input.type}
                placeholder={input.placeholder}
                onChange={(e)=>handleInput(e,userData,setUserData)}
              />
            </FieldDiv>
          ))}
        <SubmitBtn disabled={per !== null && per < 100} type="submit">
          Send
        </SubmitBtn>
        </FieldsWrapper>
      </Form>
    </Container>
  );
};
export default New;

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Textarea } from "baseui/textarea";
import { Button } from "baseui/button";
import { Block } from "baseui/block";

type Props = any;

const HookForm: React.FC<Props> = (props) => {
  const { register, handleSubmit, setValue, errors } = useForm();
  const [aboutYourself, setAboutYourself] = useState("");

  useEffect(() => {
    register({ name: "dateOfBirth" });
    register({ name: "favoriteColor" });
    register({ name: "aboutYourself" });
    register({ name: "gender" });
  }, [register]);

  const onSubmit = (data) => {
    console.log(data);
    alert(JSON.stringify(data, null, 4));
  };

  const handleTextarea = (event) => {
    const value = event.target.value;
    setAboutYourself(value);
    setValue("aboutYourself", value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
      <Block marginBottom="30px">
        <FormControl
          label="Title of your tip"
          caption="Please use 32 characters at maximum"
          error={errors.name && "This field is required"}
        >
          <Input
            name="name"
            inputRef={register({ required: true, maxLength: 32 })}
            overrides={{
              InputContainer: {
                style: () => {
                  return { backgroundColor: "transparent" };
                },
              },
            }}
          />
        </FormControl>
      </Block>

      <Block marginBottom="30px">
        <FormControl
          label="Description of the tip"
          caption="Please use 150 characters at maximum"
        >
          <Textarea
            value={aboutYourself}
            onChange={handleTextarea}
            overrides={{
              InputContainer: {
                style: () => {
                  return { backgroundColor: "transparent" };
                },
              },
            }}
          />
        </FormControl>
      </Block>

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default HookForm;

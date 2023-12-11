"use client";

import axios from "axios";
import React, { useCallback, useState } from "react";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Modal from "./modal";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        registerModal.onClose();
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to AirBnb " subtitle="Create and Account" />
      <Input
        id="name"
        label="Name"
        type="text"
        disabled={loading}
        errors={errors}
        register={register}
        required
      />
      <Input
        id="password"
        label="Email"
        type="email"
        disabled={loading}
        errors={errors}
        register={register}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={loading}
        errors={errors}
        register={register}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        onClick={() => {}}
        label="Continue with google"
        icon={FcGoogle}
      />
      <Button
        outline
        onClick={() => {}}
        label="Continue with github"
        icon={AiFillGithub}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center gap-2 justify-center">
          <div>Already Have an Account?</div>
          <div className="text-neutral-800 cursor-pointer hover:underline">
            Login
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={loading}
      body={bodyContent}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      footer={footerContent}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default RegisterModal;

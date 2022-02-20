import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { RiLockLine, RiMessageLine, RiUser3Line } from "react-icons/ri";
import Button from "../../ui/Button";
import InputField from "../../ui/inputs/InputField";
import validator from "validator";
import { toast } from "react-toastify";
import useSubmissionState from "../../../utils/hooks/useSubmissionState";
import { useAppDispatch } from "../../../store/hooks";
import { signUserUp } from "../../../store/userSlice";
import { SuccessfulToastIcon } from "../../ui/Toast";
import { useNavigate, useSearchParams } from "react-router-dom";

const Signup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { submissionState, setSubmissionState } = useSubmissionState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const watchedPasswordField = watch("password");

  const onFormSubmitHandler = useCallback(
    async (data) => {
      setSubmissionState({
        isSubmitting: true,
        successfulSubmission: false,
        errorSubmission: "",
      });

      let successful = false,
        error = "";

      await dispatch(signUserUp(data))
        .unwrap()
        .then(() => {
          successful = true;
          toast.success("Successfuly signed up", { icon: SuccessfulToastIcon });
          setTimeout(() => {
            navigate(
              "/" + (searchParams.get("ref") || "").split("_").join("/")
            );
          }, 2000);
        })
        .catch((err) => {
          error = err;
          toast.error(error);
        });

      setSubmissionState({
        isSubmitting: false,
        successfulSubmission: successful,
        errorSubmission: error,
      });
    },
    [setSubmissionState, dispatch, navigate, searchParams]
  );

  return (
    <>
      <form noValidate={true} onSubmit={handleSubmit(onFormSubmitHandler)}>
        <h1>Signup</h1>
        <div className="auth_content__fields">
          <InputField
            icon={<RiUser3Line />}
            iconBorder={true}
            type="text"
            props={{
              ...register("name", {
                required: "This field is required",
                validate: (value) => value.trim() || "This field is required",
                setValueAs: (value) => value.trim(),
              }),
              placeholder: "Name",
            }}
            error={errors?.name?.message}
          />
          <InputField
            icon={<RiMessageLine />}
            iconBorder={true}
            type="email"
            props={{
              ...register("email", {
                required: "This field is required",
                setValueAs: (value) => value.trim(),
                validate: (value) =>
                  validator.isEmail(value) ||
                  "Please provide a correct email address",
              }),
              placeholder: "Email address",
            }}
            error={errors?.email?.message}
          />
          <InputField
            icon={<RiLockLine />}
            iconBorder={true}
            type="password"
            props={{
              ...register("password", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              }),
              placeholder: "Password",
            }}
            error={errors?.password?.message}
          />
          <InputField
            icon={<RiLockLine />}
            iconBorder={true}
            type="password"
            props={{
              ...register("passwordConfirm", {
                required: "This field is required",
                validate: (value) =>
                  value === watchedPasswordField || "Passwords don't match",
              }),
              placeholder: "Confirm password",
            }}
            error={errors?.passwordConfirm?.message}
          />
        </div>
        <div className="auth_content__submit">
          <Button
            styleType="primary"
            buttonType="submit"
            label="Submit"
            size="xl"
            disabled={
              submissionState.isSubmitting ||
              submissionState.successfulSubmission
            }
            isLoading={submissionState.isSubmitting}
          />
        </div>
      </form>
    </>
  );
};

export default Signup;

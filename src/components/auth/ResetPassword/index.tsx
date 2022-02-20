import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { RiLockLine } from "react-icons/ri";
import Button from "../../ui/Button";
import InputField from "../../ui/inputs/InputField";
import { resetPassword } from "../../../utils/fetchers/auth";
import { toast } from "react-toastify";
import useSubmissionState from "../../../utils/hooks/useSubmissionState";
import { SuccessfulToastIcon } from "../../ui/Toast";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { submissionState, setSubmissionState } = useSubmissionState();
  const navigate = useNavigate();
  const { passwordResetToken } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
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

      await resetPassword(data, passwordResetToken || "")
        .then((response) => {
          successful = true;
          toast.success("Password reset successfuly", {
            icon: SuccessfulToastIcon,
          });
          setTimeout(() => {
            navigate("/login", {
              replace: true,
            });
          }, 2000);
        })
        .catch((err) => {
          error =
            err?.response?.data?.message || "Error occured! Please try again";
          toast.error(error);
        });
      setSubmissionState({
        isSubmitting: false,
        successfulSubmission: successful,
        errorSubmission: error,
      });
    },
    [setSubmissionState, navigate, passwordResetToken]
  );

  return (
    <>
      <form noValidate={true} onSubmit={handleSubmit(onFormSubmitHandler)}>
        <h1>Reset password</h1>
        <div className="auth_content__fields">
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
              placeholder: "New Password",
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
              placeholder: "Confirm new password",
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

export default ResetPassword;

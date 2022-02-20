import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { RiLockLine, RiMessageLine, RiArrowLeftLine } from "react-icons/ri";
import useSubmissionState from "../../../utils/hooks/useSubmissionState";
import Button from "../../ui/Button";
import InputField from "../../ui/inputs/InputField";
import validator from "validator";
import ResponseMessage from "../ResponseMessage";
import { forgotPassword } from "../../../utils/fetchers/auth";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../store/hooks";
import { logUserIn } from "../../../store/userSlice";
import { SuccessfulToastIcon } from "../../ui/Toast";
import { useNavigate, useSearchParams } from "react-router-dom";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { submissionState, setSubmissionState } = useSubmissionState();
  const [activePage, setActivePage] = useState<"login" | "forget">("login");

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm({
    defaultValues: {
      login_email: "",
      login_password: "",
      forgot_email: "",
    },
  });

  const onChangeActivePage = useCallback(
    (target) => {
      reset();
      clearErrors();
      setActivePage(target);
    },
    [clearErrors, reset]
  );

  const onFormSubmitHandler = useCallback(
    async (data) => {
      setSubmissionState({
        isSubmitting: true,
        successfulSubmission: false,
        errorSubmission: "",
      });

      let successful = false,
        error = "";

      if (activePage === "login") {
        await dispatch(
          logUserIn({ email: data.login_email, password: data.login_password })
        )
          .unwrap()
          .then(() => {
            successful = true;
            toast.success("Successfuly logged in", {
              icon: SuccessfulToastIcon,
            });
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
      } else if (activePage === "forget") {
        await forgotPassword({ email: data.forgot_email })
          .then(() => {
            successful = true;
          })
          .catch((err) => {
            error =
              err?.response?.data?.message || "Error occured! Please try again";
            toast.error(error);
          });
      }
      setSubmissionState({
        isSubmitting: false,
        successfulSubmission: successful,
        errorSubmission: error,
      });
    },
    [setSubmissionState, activePage, dispatch, navigate, searchParams]
  );

  return (
    <>
      {submissionState.successfulSubmission && activePage === "forget" ? (
        <ResponseMessage
          type="success"
          message="Please check your email. A password reset email is sent to you."
        />
      ) : (
        <form noValidate={true} onSubmit={handleSubmit(onFormSubmitHandler)}>
          <h1>
            {activePage === "forget" && (
              <Button
                buttonType="button"
                size="md"
                styleType="secondary"
                fullRadius={true}
                onClick={() => onChangeActivePage("login")}
                icon={<RiArrowLeftLine />}
              />
            )}
            {activePage === "forget" ? "Forgot password" : "Login"}
          </h1>
          <div className="auth_content__fields">
            {activePage === "login" && (
              <>
                <InputField
                  icon={<RiMessageLine />}
                  iconBorder={true}
                  type="email"
                  props={{
                    ...register("login_email", {
                      required: "This field is required",
                      setValueAs: (value) => value.trim(),
                      validate: (value) =>
                        validator.isEmail(value) ||
                        "Please provide a correct email address",
                    }),
                    placeholder: "Email address",
                  }}
                  error={errors?.login_email?.message}
                />
                <InputField
                  icon={<RiLockLine />}
                  iconBorder={true}
                  type="password"
                  props={{
                    ...register("login_password", {
                      required: "This field is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    }),
                    placeholder: "Password",
                  }}
                  error={errors?.login_password?.message}
                />
              </>
            )}
            {activePage === "forget" && (
              <>
                <InputField
                  icon={<RiMessageLine />}
                  iconBorder={true}
                  type="email"
                  props={{
                    ...register("forgot_email", {
                      required: "This field is required",
                      setValueAs: (value) => value.trim(),
                      validate: (value) =>
                        validator.isEmail(value) ||
                        "Please provide a correct email address",
                    }),
                    placeholder: "Email address",
                  }}
                  error={errors?.forgot_email?.message}
                />
              </>
            )}
          </div>
          {activePage === "login" && (
            <button
              type="button"
              className="auth_content__link"
              onClick={() => onChangeActivePage("forget")}
            >
              Forgot password?
            </button>
          )}
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
      )}
    </>
  );
};

export default Login;

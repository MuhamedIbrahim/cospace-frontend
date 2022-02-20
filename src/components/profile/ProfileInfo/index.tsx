import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { RiUser3Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../store/hooks";
import { selectUser, updateUserProfile } from "../../../store/userSlice";
import { usersImagesBaseURL } from "../../../utils/env";
import useSubmissionState from "../../../utils/hooks/useSubmissionState";
import Button from "../../ui/Button";
import InputField from "../../ui/inputs/InputField";
import { SuccessfulToastIcon } from "../../ui/Toast";
import ProfileInfoStyle from "./style";

const ProfileInfo = () => {
  const { user } = useSelector(selectUser);

  const { submissionState, setSubmissionState } = useSubmissionState();
  const dispatch = useAppDispatch();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      image: "",
    },
  });

  const watchedFields = watch();

  const currentImage = useMemo(() => {
    if ((watchedFields.image as any)?.length)
      return URL.createObjectURL((watchedFields.image as any)?.[0]);
    else if (user?.image) return `${usersImagesBaseURL}/${user.image}`;
    return "";
  }, [user, watchedFields.image]);

  const onFormSubmitHandler = useCallback(
    async (data) => {
      setSubmissionState({
        isSubmitting: true,
        successfulSubmission: false,
        errorSubmission: "",
      });

      let successful = false,
        error = "";

      await dispatch(
        updateUserProfile({
          name: data.name,
          ...(data.image?.length ? { image: data.image[0] } : {}),
        })
      )
        .unwrap()
        .then(() => {
          successful = true;
          toast.success("Updated successfuly", { icon: SuccessfulToastIcon });
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
    [setSubmissionState, dispatch]
  );

  return (
    <ProfileInfoStyle
      onSubmit={handleSubmit(onFormSubmitHandler)}
      noValidate={true}
    >
      <h1 className="profile__section_title">Account information</h1>
      <div className="profile__sub_section">
        <InputField
          type="text"
          label="Name"
          icon={<RiUser3Line />}
          iconBorder={true}
          props={{
            ...register("name", {
              required: "This field can't be empty",
              validate: (value) =>
                value.trim() ? true : "This field can't be empty",
            }),
          }}
          error={errors?.name?.message}
        />
      </div>
      <div className="profile__sub_section">
        <div className="profile_info__upload">
          <div className="profile_info__image">
            {currentImage ? <img src={currentImage} alt="" /> : <RiUser3Line />}
          </div>
          <label>
            Upload profile image
            <input type="file" {...register("image")} />
          </label>
        </div>
      </div>
      <div className="profile__sub_section">
        <Button
          buttonType="submit"
          styleType="secondary_blue"
          size="lg"
          label="Save Changes"
          extraStyle={{
            display: "flex",
            width: "fit-content",
            marginLeft: "auto",
          }}
          disabled={
            submissionState.isSubmitting ||
            (watchedFields.name === user?.name &&
              (!watchedFields.image || watchedFields.image.length === 0))
          }
          isLoading={submissionState.isSubmitting}
        />
      </div>
    </ProfileInfoStyle>
  );
};

export default ProfileInfo;

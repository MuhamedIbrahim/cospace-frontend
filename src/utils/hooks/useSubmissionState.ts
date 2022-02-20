import { useState } from "react";

const useSubmissionState = () => {
  const [state, setState] = useState<{
    isSubmitting: boolean;
    successfulSubmission: boolean;
    errorSubmission: string;
  }>({
    isSubmitting: false,
    successfulSubmission: false,
    errorSubmission: "",
  });
  return {
    setSubmissionState: setState,
    submissionState: state,
  };
};

export default useSubmissionState;

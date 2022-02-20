import { useEffect } from "react";
import { useSelector } from "react-redux";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import LoadingSpinnerContainer from "./components/ui/LoadingSpinner/LoadingSpinnerContainer";
import AppRoutes from "./pages/AppRoutes";
import { useAppDispatch } from "./store/hooks";
import { fetchCurrentUser, selectUser } from "./store/userSlice";

function App() {
  const { isFetching } = useSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchController = new AbortController();
    const fetchSignal = fetchController.signal;
    dispatch(fetchCurrentUser(fetchSignal));
    return () => {
      if (fetchController) fetchController.abort();
    };
  }, [dispatch]);

  return (
    <>
      {isFetching ? (
        <LoadingSpinnerContainer>
          <LoadingSpinner />
        </LoadingSpinnerContainer>
      ) : (
        <AppRoutes />
      )}
    </>
  );
}

export default App;

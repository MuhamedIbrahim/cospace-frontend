import NotFoundPage from "../components/404";
import {
  ContentWrapper,
  OriginalWrapper,
} from "../components/containers/containers";
import Header from "../components/ui/Header";

const Page404 = () => {
  return (
    <>
      <Header />
      <ContentWrapper>
        <OriginalWrapper>
          <NotFoundPage />
        </OriginalWrapper>
      </ContentWrapper>
    </>
  );
};

export default Page404;

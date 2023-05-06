import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { SearchResult } from "./Pages/SearchResult";
import { store } from "./store";
import { Provider } from "react-redux";
import { Uploader } from "./Pages/Uploader";
import { UploadPage } from "./Pages/Upload";
import { Upload } from "./Pages/UploadPage";
import { MyUploads } from "./Pages/UploadSuccess";
import { VideosPage } from "./Pages/Videos";
import { Courses } from "./Pages/Courses";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { NotificationsProvider } from "@mantine/notifications";
import { Admin } from "./Pages/Admin";
import { MusicPage } from "./Pages/Music";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Photos } from "./Pages/Photos";
import { lazy, Suspense } from "react";
import { Loader } from "@mantine/core";
import { ThreeDModel } from "./Pages/ThreeDModel";
import Faq from "./Pages/FAQ/faq";
import TermsAndConditions from "./Pages/Policy/terms";
import PrivacyPolicy from "./Pages/Policy/privacypolicy";
import License from "./Pages/Policy/license";
import ContactUs from "./Pages/Policy/contactus";
import { Vectors } from "./Pages/Vectors/vectors";
import { SFX } from "./Pages/SFX/sfx";

const Profile = lazy(() => import("./Pages/Profile/index"));
const ChangePassword = lazy(() => import("./Pages/ChangePassword/index"));
const AccountSettings = lazy(() => import("./Pages/AccountSettings/index"));
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});
const Laoder = () => {
  return <>Load</>;
};
function App() {
  return (
    <Suspense
      fallback={
        <div className="flex w-full h-screen justify-center items-center">
          <Loader />
        </div>
      }
    >
      <GoogleOAuthProvider clientId={import.meta.env.VITE_OAUTH_CLIENT_ID}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <div className="text-[#4B3A5A]">
              <NotificationsProvider position="top-center">
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/search" element={<SearchResult />}></Route>
                    <Route
                      path="/uploader/:name"
                      element={<Uploader />}
                    ></Route>
                    <Route path="/upload" element={<UploadPage />}></Route>
                    <Route path="/upload/:type" element={<Upload />}></Route>
                    <Route path="/my-uploads" element={<MyUploads />}></Route>
                    <Route path="/videos" element={<VideosPage />}></Route>
                    <Route path="/courses" element={<Courses />}></Route>
                    <Route path="/3d" element={<ThreeDModel />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Register />} />
                    <Route path="/music" element={<MusicPage />} />
                    <Route path="/photos" element={<Photos />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/my-profile" element={<Profile />} />
                    <Route path="/vectors" element={<Vectors />} />
                    <Route path="/sfx" element={<SFX />} />
                    <Route path="/faq" element={<Faq />} />
                    <Route path="/terms" element={<TermsAndConditions />} />
                    <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                    <Route path="/license" element={<License />} />
                    <Route path="/contactus" element={<ContactUs />} />
                    <Route
                      path="/change-password"
                      element={<ChangePassword />}
                    />
                    <Route
                      path="/account-settings"
                      element={<AccountSettings />}
                    />

                    {/*Admin routes*/}
                    <Route path="/dashboard" element={<Admin />} />
                  </Routes>
                </BrowserRouter>
              </NotificationsProvider>
              <ReactQueryDevtools initialIsOpen={false} />
            </div>
          </QueryClientProvider>
        </Provider>
      </GoogleOAuthProvider>
    </Suspense>
  );
}

export default App;

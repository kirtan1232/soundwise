import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChordAndLyricPage from "./core/public/chordAndLyric.jsx";
import Dashboard from "./core/public/dashboard.jsx";
import ForgetPassword from "./core/public/forgetPassword.jsx";
import Lesson from "./core/public/lesson.jsx";
import LessonDetails from "./core/public/lessonDetails.jsx";

import LoginPage from "./core/public/loginpage.jsx";
import PracticeSession from "./core/public/practiceSessions.jsx";
import Profile from "./core/public/profile.jsx";
import RegisterPage from "./core/public/register.jsx";
import ResetPasswordPage from "./core/public/resetPassword.jsx";
import SessionDetails from "./core/public/sessionDetails.jsx";
import SongDetails from "./core/public/songDetails.jsx";
import TunerInst from "./core/public/tunerInst.jsx";
import Success from "./components/success.jsx";
import Payment from "./core/public/payment.jsx";

const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/login", element: <LoginPage/> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/forgetPassword", element: <ForgetPassword /> },
  { path: "/resetPassword", element: <ResetPasswordPage /> },
  { path: "/lesson", element: <Lesson /> },
  { path: "/practiceSessions", element: <PracticeSession /> },
  { path: "/chords", element: <ChordAndLyricPage /> },
  { path: "/song/:songId", element: <SongDetails /> },
  { path: "/tuner", element: <TunerInst /> },
  { path: "/profile", element: <Profile /> },
  { path: "/session-details/:day/:instrument", element: <SessionDetails /> },
  { path: "/lesson/:instrument/:day", element: <LessonDetails /> },

  { path: "/success", element: <Success /> },
  { path: "/payment", element: <Payment /> },
  { path: "*", element: <>Page not found</> },
]);

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
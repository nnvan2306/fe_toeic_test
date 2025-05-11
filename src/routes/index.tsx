import { lazy } from "react";

export const ToDo = lazy(() => import("../components/pages/ToDo"));
export const Home = lazy(() => import("../components/pages/Home"));
export const Login = lazy(() => import("../components/pages/Login"));
export const Register = lazy(() => import("../components/pages/Register"));
export const Blog = lazy(() => import("../components/pages/Blog"));
export const BlogDetail = lazy(() => import("../components/pages/BlogDetail"));
export const Exam = lazy(() => import("../components/pages/Exam"));
export const ExamDetail = lazy(() => import("../components/pages/ExamDetail"));
export const Learn = lazy(() => import("../components/pages/Learn"));
export const Profile = lazy(() => import("../components/pages/Profile"));
export const Dashboard = lazy(() => import("../components/pages/Dashboard"));
export const Chart = lazy(() => import("../components/pages/Chart"));
export const BlogManager = lazy(
    () => import("../components/pages/BlogManager")
);
export const UserManager = lazy(
    () => import("../components/pages/UserManager")
);
export const ExamManager = lazy(
    () => import("../components/pages/ExamManager")
);
export const ExamNew = lazy(() => import("../components/pages/ExamNew"));

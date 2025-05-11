import {
    Blog,
    BlogDetail,
    BlogManager,
    Chart,
    Dashboard,
    Exam,
    ExamDetail,
    ExamManager,
    ExamNew,
    Home,
    Learn,
    Login,
    Profile,
    Register,
    ToDo,
    UserManager,
} from "./index";

export const routes = [
    {
        name: "TODo",
        path: "/todo",
        element: <ToDo />,
        requiresAuth: false,
    },
    {
        name: "Home",
        path: "/",
        element: <Home />,
        requiresAuth: false,
    },
    {
        name: "Login",
        path: "/login",
        element: <Login />,
        requiresAuth: false,
    },
    {
        name: "Regsiter",
        path: "/register",
        element: <Register />,
        requiresAuth: false,
    },
    {
        name: "Blog",
        path: "/blog",
        element: <Blog />,
        requiresAuth: false,
    },
    {
        name: "BlogDetail",
        path: "/blog/:id",
        element: <BlogDetail />,
        requiresAuth: false,
    },
    {
        name: "Exam",
        path: "/exam",
        element: <Exam />,
        requiresAuth: false,
    },
    {
        name: "ExamDetail",
        path: "/exam_detail/:id",
        element: <ExamDetail />,
        requiresAuth: false,
    },
    {
        name: "Learn",
        path: "/learn",
        element: <Learn />,
        requiresAuth: false,
    },
    {
        name: "Profile",
        path: "/profile",
        element: <Profile />,
        requiresAuth: false,
    },
    {
        name: "DashBoard",
        path: "/dashboard",
        element: <Dashboard />,
        requiresAuth: true,
    },
    {
        name: "Chart",
        path: "/admin/chart",
        element: <Chart />,
        requiresAuth: true,
    },
    {
        name: "BlogManager",
        path: "/admin/blog",
        element: <BlogManager />,
        requiresAuth: true,
    },
    {
        name: "UserManager",
        path: "/admin/user-manager",
        element: <UserManager />,
        requiresAuth: true,
    },
    {
        name: "ExamManager",
        path: "/admin/exam",
        element: <ExamManager />,
        requiresAuth: true,
    },
    {
        name: "ExamNew",
        path: "/admin/exam/new",
        element: <ExamNew />,
        requiresAuth: true,
    },
] as const;

type RouteName = (typeof routes)[number]["name"];

type RoutesMap = {
    [K in RouteName]: (typeof routes)[number]["path"];
};

export const routesMap = ((): RoutesMap => {
    return routes.reduce((acc, route) => {
        acc[route.name] = route.path;
        return acc;
    }, {} as RoutesMap);
})();

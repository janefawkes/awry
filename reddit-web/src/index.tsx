import { withUrqlClient } from "next-urql"
import { NavBar } from "./components/NavBar"
import { createUrqlClient } from "./utils/createUrqlClient"
import React from 'react';
import ReactDOM from 'react-dom';
import App from "./pages/App"
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom"

// const Index = () =>
//   <>
//     <NavBar />
//     <div>uwu</div>
//   </>

// export default withUrqlClient(createUrqlClient, { ssr: false })(Index)

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
]);

ReactDOM.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
    document.getElementById("root"))
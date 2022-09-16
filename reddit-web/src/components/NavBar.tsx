import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

// import "../styles/NavBar.scss"
import { IsServer } from "../utils/isServer";

interface NavBarProps { }

export const NavBar: React.FC<NavBarProps> = ({ }) => {
    const [{ fetching: logoutFetching }, logout] = useLogoutMutation()
    const [{ data, fetching }] = useMeQuery({
        pause: IsServer()
    })
    let body = null

    if (fetching) {
        body = null
    } else if (!data?.me) {
        body = (
            <>
                <nav className='nav-loggedOut'>
                    <a href="/login">
                        {/* <Link color="white" mr={2}>login</Link> */}
                        <button className="nav-link">Sign in</button>
                    </a>
                    <a href="/register">
                        {/* <Link color="white">register</Link> */}
                        <button className="nav-link">Sign up</button>
                    </a>
                </nav>
            </>
        )
    } else {
        body = (
            <nav>
                <div>{data.me.username}</div>
                <button
                    onClick={() => {
                        confirm("Are you sure you want to logout?") ? logout() : null
                    }}
                // isLoading={logoutFetching}
                // variant='link'
                >
                    logout
                </button>
            </nav>
        )
    }

    return (
        <>
            {body}
        </>
    )
}
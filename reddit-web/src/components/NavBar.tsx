import React from "react";
import NextLink from 'next/link'
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import Head from "next/head";

import style from "../styles/NavBar.module.scss"
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
                <nav className={style['nav-loggedOut']}>
                    <NextLink href="/login">
                        {/* <Link color="white" mr={2}>login</Link> */}
                        <button className={style["nav-link"]}>Sign in</button>
                    </NextLink>
                    <NextLink href="/register">
                        {/* <Link color="white">register</Link> */}
                        <button className={style["nav-link"]}>Sign up</button>
                    </NextLink>
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
            <Head>
                <title>uwu</title>
            </Head>
            <div>
                {body}
            </div>
        </>
    )
}
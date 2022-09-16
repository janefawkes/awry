import React from "react"

import { NavBar } from '../components/NavBar';

import { usePostsQuery } from '../generated/graphql'

export default function App() {
  const [{ data }] = usePostsQuery()
  return (
    <>
      <NavBar />
    </>
  )
}

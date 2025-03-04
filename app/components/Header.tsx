'use client'

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

function Header() {
  const {data: session} = useSession()
  const handleLogout = async () => {
    await signOut()
  }
  return <div>
    <button onClick={handleLogout}>SignOut</button>
    {
      session ? (
        <div>Welcome</div>
      ) : (
        <div>
          <Link href='/login'>login</Link>
          <Link href='/register'>register</Link>
        </div>
      )
    }
  </div>;
}

export default Header;

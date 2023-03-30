import { NextPage } from "next";
import { useRouter } from "next/router";
import nookies from "nookies";
import React, { useState } from "react";
import { setLeagueId } from "@/redux/slices/activeLeague";
import { useAppDispatch } from "@/hooks/redux";

const LeagueCode: NextPage = () => {
  const [code, setCode] = useState<string>("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    nookies.set(null, "leagueId", code);

    localStorage.setItem("leagueId", code);

    dispatch(setLeagueId(Number(code)));

    router.push("/");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={(e) => setCode(e.currentTarget.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LeagueCode;

import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import Layout from "../components/Layout";
import { getCertainProspectPlayer, getCertainTopPlayer } from "../lib/players";

interface IPlayerData {
  name: string;
  team: string;
  position: string;
  SignedAge?: number;
  years?: number;
  period?: string;
  averageValue?: string;
  totalValue?: string;
  currentAge?: number;
  leftYear?: number;
  playerImg: string;
  playerVideo: string;
}

interface IProps {
  player: IPlayerData;
}

const PlayerPage: NextPage<IProps> = ({ player }) => {
  const salaryPerGame = (money: string) => {
    const moneyToNumber = Number(money.replace(/[^0-9.-]+/g, ""));
    const perGame = Math.round(moneyToNumber / 162);

    return "$" + perGame.toLocaleString();
  };

  if (!player) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title={player.name} goBackBtn={true}>
      <Head>
        <title>MLB | {player.name}</title>
        <meta name="description" content={`Information about ${player.name}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-evenly mx-3 p-2 rounded-lg">
        <Image
          src={player.playerImg}
          className="p-12 border border-slate-700 border-solid rounded-xl"
          width={200}
          height={300}
        />
        <div className="text-left  text-xl flex flex-col justify-evenly">
          <p className="border-b-2 border-b-slate-400">이름 : {player.name}</p>
          <p className="border-b-2 border-b-slate-400">
            소속 팀 : {player.team}
          </p>
          <p className="border-b-2 border-b-slate-400">
            포지션 : {player.position}
          </p>
          {player.SignedAge ? (
            <>
              <p className="border-b-2 border-b-slate-400">
                계약 당시 나이 : {player.SignedAge}
              </p>
              <p className="border-b-2 border-b-slate-400">
                계약 기간 : {player.years}
              </p>
              <p className="border-b-2 border-b-slate-400">
                계약 년도 : {player.period}
              </p>
              <p className="border-b-2 border-b-slate-400">
                연평균 금액 : {player.averageValue}
              </p>
              <p className="border-b-2 border-b-slate-400">
                총 계약 금액 : {player.totalValue}
              </p>
              {player.averageValue && (
                <p className="border-b-2 border-b-slate-400">
                  한 경기당 수령 금액 : {salaryPerGame(player.averageValue)}
                </p>
              )}
            </>
          ) : (
            <>
              <p className="border-b-2 border-b-slate-400">
                현재 나이 : {player.currentAge}
              </p>
              <p className="border-b-2 border-b-slate-400">
                FA까지 남은 기간 : {player.leftYear}년
              </p>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center text-center py-5 ">
        <h1>{player.name}는 얼마나 잘하는 선수일까?</h1>
      </div>
      <div className="flex justify-center content-center">
        <iframe src={player.playerVideo} width="600" height="360" />
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  if (params) {
    const playerName = params.player as string;
    const player =
      (await getCertainTopPlayer(playerName)) ??
      (await getCertainProspectPlayer(playerName));
    return {
      props: { player },
    };
  }

  return {
    props: {},
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

export default PlayerPage;

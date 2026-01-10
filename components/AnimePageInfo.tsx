"use client";

import { useState } from "react";
import Link from "next/link";


const AnimePageInfo = ( {currentAnime}: { currentAnime: any }) => {
  const [activeContent, setActiveContent] = useState("Overview");

  

  const buttons = [{
    title: "Overview",
  }, {
    title: "Watch",
  }, {
    title: "Characters",
  }, {
    title: "Staff",
  }, 
    ];

   const renderContent = () => {
    switch (activeContent) {
      case "Overview":
        return  <div>


      <div className="w-220 mt-10">
      {currentAnime.trailer?.site === "youtube" && (
        <>
      <h2 className="text-3xl my-4 font-bold">Trailer</h2>
        <div className="w-full aspect-video rounded-2xl overflow-hidden mb-4">
          <iframe
            src={`https://www.youtube.com/embed/${currentAnime.trailer.id}`}
            className="w-full h-full"
            allowFullScreen
          />
        </div>
        </>
      )}
    </div>

    <div className="mt-10">
      {currentAnime.relations?.edges?.length > 0 && (
      <h2 className="text-3xl font-bold">Relations</h2>
      )}
        <div className="flex gap-4 my-8 flex-wrap ">
      {currentAnime.relations?.edges?.map((edge: any) => (
        <Link
          key={edge.node.id}
          href={edge.node.id ? `/anime/${edge.node.id}` : '#'}
          className="flex w-80 h-full bg-(--bg-light) rounded-xl gap-4 "
        >
        
          {edge.node.coverImage?.large && (
            <div className="w-30">
              <img
                className="w-full h-full rounded-xl shrink-0"
                src={edge.node.coverImage.large}
                alt={edge.node.title?.romaji ?? "Relation cover"}
              />

            </div>
          )}
          <div className="w-50 h-40 flex flex-col gap-2">
            <span className="mt-2 text-sm">{edge.relationType}</span>
            <span className="text-md font-bold">{edge.node.title?.romaji.length > 50 ? `${edge.node.title?.romaji.substring(0, 50)}...` : edge.node.title?.romaji}</span>
            <div className="mt-auto mb-2 flex gap-2" >
            <span className="text-sm">{edge.node.type}</span>
            <span className="text-sm">{edge.node.status}</span>
            </div>
          </div>
        </Link>
      ))}
        </div>
    </div>



  </div>

      case "Watch":
        return <div>Watch content here...</div>;

      case "Characters":
        return <div>Characters content here...</div>;

      case "Staff":
        return <div>Staff content here...</div>;

      case "Stats":
        return <div>Stats content here...</div>;

      default:
        return <div>Overview content here...</div>;
    }
  };

  return (
    <div className="">

        <div className=" w-full flex items-center gap-8">
            {
                buttons.map((button) => (
                    <button key={button.title}  onClick={() => setActiveContent(button.title)} className="bg-(--bg-light) p-2 rounded-2xl w-28 ">{button.title}</button>
                ))
            }

        </div>

        <div className="mt-4 ">
            {renderContent()}
        </div>

    </div>
  )
}

export default AnimePageInfo

import { client, revalidate } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Link from "next/link";
import React from "react";
import Menu from "@/public/menu.svg";
import Close from "@/public/close.svg";

const query = (query: string) => {
  return groq`
  *[_type == "${query}"]|order(orderRank){
    name,
    slug
  }
  `;
};

const firstHandQuery = query("firstHand");
const costumeConstructionQuery = query("costumeConstruction");
const underGradCouresWorkQuery = query("underGradCourseWork");
const relatedWorkQuery = query("relatedWork");

type NavItem = {
  name: string;
  slug: {
    current: string;
  };
};

const dataFetch = async (query: string) => {
  return await client.fetch<NavItem[]>(
    query,
    {},
    { next: { revalidate: revalidate } }
  );
};

export default async function Nav() {
  const firstHandQueryData = await dataFetch(firstHandQuery);
  const costumeConstructiodData = await dataFetch(costumeConstructionQuery);
  const underGradCourseWorkData = await dataFetch(underGradCouresWorkQuery);
  const relatedWorkData = await dataFetch(relatedWorkQuery);

  const navRenderer = (data: NavItem[], category: string, url: string) => {
    return (
      <li className="lg:[&>ul]:hover:opacity-100 lg:[&>ul]:hover:left-0 relative">
        <p
          tabIndex={0}
          className="peer pt-4 pr-7 pb-4 pl-7 block mb-0 text-[#5f6368] lg:text-[#fff]"
        >
          {category}
        </p>
        <ul className="lg:peer-focus:opacity-100 lg:peer-focus:left-0 lg:focus-within:opacity-100 lg:focus-within:left-0 lg:opacity-0 lg:absolute lg:top-full lg:-left-[9999px] lg:backdrop-blur-xl lg:bg-black/60">
          {data.map((item: NavItem, i: number) => (
            <li key={item?.name + i} className="lg:[&>a]:last:pb-6">
              <Link
                href={`/${url}/${item?.slug?.current}`}
                className="pt-2 pr-7 pb-2 pl-7 block"
              >
                {item?.name}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    );
  };

  return (
    <>
      <input
        type="checkbox"
        id="drawer-toggle"
        name="drawer-toggle"
        className="peer absolute opacity-0"
      />
      <label
        htmlFor="drawer-toggle"
        id="drawer-toggle-label"
        className="w-16 h-16 lgMax:peer-[:checked]:hidden lock left-0 absolute z-30 lg:hidden cursor-pointer flex items-center justify-center"
      >
        <Menu className="w-[50%] h-[50%]" />
      </label>
      <label
        htmlFor="drawer-toggle"
        id="drawer-toggle-label"
        className="w-16 h-16 lgMax:peer-[:checked]:flex hidden right-0 absolute z-30 lg:hidden cursor-pointer items-center justify-center"
      >
        <Close className="w-[50%] h-[50%]" />
      </label>
      <nav className="w-[100vw] lg:w-full absolute lg:left-0 -left-[100vw] lg:top-0 smDesktop:pl-24 smDesktop:pr-24 bg-black/60 lgMax:backdrop-blur-xl z-20 lgMax:peer-[:checked]:left-0">
        <ul className="lg:flex">
          <li>
            <Link href="/" className="pt-4 pr-8 pb-4 pl-8 block">
              Home
            </Link>
          </li>
          <li>
            <Link href="/contact" className="pt-4 pr-8 pb-4 pl-8 block">
              Contact
            </Link>
          </li>
          {navRenderer(firstHandQueryData, "First Hand", "first-hand")}
          {navRenderer(
            costumeConstructiodData,
            "Costume Construction",
            "costume-construction"
          )}
          {navRenderer(
            underGradCourseWorkData,
            "Undergrad Course Work",
            "undergrad-course-work"
          )}
          {navRenderer(relatedWorkData, "Related Work", "related-work")}
        </ul>
      </nav>
    </>
  );
}

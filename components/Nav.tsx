import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Link from "next/link";
import React from "react";

const costumeConstructionQuery = groq`
*[_type == "costumeConstruction"]|order(orderRank){
  name,
  slug
}
`;

const underGradCouresWorkQuery = groq`
*[_type == "underGradCourseWork"]|order(orderRank){
  name,
  slug
}
`;

const relatedWorkQuery = groq`
*[_type == "relatedWork"]|order(orderRank){
  name,
  slug
}
`;

type NavItem = {
  name: string;
  slug: {
    current: string;
  };
};

export default async function Nav() {
  const revalidate = 60;
  const costumeConstructiodData = (await client.fetch(
    costumeConstructionQuery,
    {
      // @ts-ignore
      next: { revalidate: revalidate },
    }
  )) as NavItem[];

  const underGradCourseWorkData = (await client.fetch(
    underGradCouresWorkQuery,
    {
      // @ts-ignore
      next: { revalidate: revalidate },
    }
  )) as NavItem[];

  const relatedWorkData = (await client.fetch(relatedWorkQuery, {
    // @ts-ignore
    next: { revalidate: revalidate },
  })) as NavItem[];

  return (
    <nav className="w-full absolute left-0 top-0  bg-black/60">
      <ul className="flex">
        <li>
          <Link href="/" className="pt-4 pr-8 pb-4 pl-8 block">
            Home
          </Link>
        </li>
        <li className="[&>ul]:hover:opacity-100 [&>ul]:hover:left-0 relative">
          <p tabIndex={0} className="peer pt-4 pr-8 pb-4 pl-8 block mb-0">
            Costume Construction
          </p>
          <ul className="peer-focus:opacity-100 peer-focus:left-0 focus-within:opacity-100 focus-within:left-0 opacity-0 absolute top-full -left-[9999px] backdrop-blur-xl bg-black/60">
            {costumeConstructiodData.map((item: NavItem, i: number) => (
              <li key={item?.name + i} className="[&>a]:last:pb-6">
                <Link
                  href={`/costumeConstruction/${item?.slug?.current}`}
                  className="pt-2 pr-8 pb-2 pl-8 block"
                >
                  {item?.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>
        <li className="[&>ul]:hover:opacity-100 [&>ul]:hover:left-0 relative">
          <p tabIndex={0} className="peer pt-4 pr-8 pb-4 pl-8 block mb-0">
            Undergrad Course Work
          </p>
          <ul className="peer-focus:opacity-100 peer-focus:left-0 focus-within:opacity-100 focus-within:left-0 opacity-0 absolute top-full -left-[9999px] backdrop-blur-xl bg-black/60">
            {underGradCourseWorkData.map((item: NavItem, i: number) => (
              <li key={item?.name + i} className="[&>a]:last:pb-6">
                <Link
                  href={`/undergradCourseWork/${item?.slug?.current}`}
                  className="pt-2 pr-8 pb-2 pl-8 block"
                >
                  {item?.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>
        <li className="[&>ul]:hover:opacity-100 [&>ul]:hover:left-0 relative">
          <p tabIndex={0} className="peer pt-4 pr-8 pb-4 pl-8 block mb-0">
            Related Work
          </p>
          <ul className="peer-focus:opacity-100 peer-focus:left-0 focus-within:opacity-100 focus-within:left-0 opacity-0 absolute top-full -left-[9999px] backdrop-blur-xl bg-black/60">
            {relatedWorkData.map((item: NavItem, i: number) => (
              <li key={item?.name + i} className="[&>a]:last:pb-6">
                <Link
                  href={`/relatedWork/${item?.slug?.current}`}
                  className="pt-2 pr-8 pb-2 pl-8 block"
                >
                  {item?.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>
        <li>
          <Link href="/contact" className="pt-4 pr-8 pb-4 pl-8 block">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

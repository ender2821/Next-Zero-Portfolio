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
    <nav style={{ display: "flex", justifyContent: "center" }}>
      <ul style={{ display: "flex", listStyle: "none" }}>
        <li style={{ margin: "0 10px" }}>
          <Link href="/">Home</Link>
        </li>
        <li style={{ margin: "0 10px" }}>
          <a href="#">Costume Construction</a>
          <ul>
            {costumeConstructiodData.map((item: NavItem, i: number) => (
              <li key={item?.name + i} style={{ margin: "0 10px" }}>
                <Link href={`/costumeConstruction/${item?.slug?.current}`}>
                  {item?.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>
        <li style={{ margin: "0 10px" }}>
          <a href="#">Undergrad Course Work</a>
          <ul>
            {underGradCourseWorkData.map((item: NavItem, i: number) => (
              <li key={item?.name + i} style={{ margin: "0 10px" }}>
                <Link href={`/undergradCourseWork/${item?.slug?.current}`}>
                  {item?.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>
        <li style={{ margin: "0 10px" }}>
          <a href="#">Related Work</a>
          <ul>
            {relatedWorkData.map((item: NavItem, i: number) => (
              <li key={item?.name + i} style={{ margin: "0 10px" }}>
                <Link href={`/relatedWork/${item?.slug?.current}`}>
                  {item?.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>
        <li style={{ margin: "0 10px" }}>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}

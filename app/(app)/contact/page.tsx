import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { PortableText } from "@portabletext/react";
import { Noto_Serif_Display } from "next/font/google";
import Header from "@/components/Header";
import Divider from "@/components/Divider";
import { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import ContactForm from "@/components/ContactForm";
import ContactImage from "./ContactImage";

const notoSerifDisplay = Noto_Serif_Display({ subsets: ["latin"] });

const contactQuery = groq`
*[_type == "contact"][0]{
  heroTitle,
  heroSubtitle,
  content
}
`;

type Contact = {
  heroTitle: string;
  heroSubtitle?: string;
  content: Block[];
};

export default async function Contact() {
  const revalidate = 60;

  const contactData = await client.fetch<Contact>(
    contactQuery,
    {},
    {
      next: { revalidate: revalidate },
    }
  );

  return (
    <>
      <Header />
      <main className="min-h-screen flex-col items-center md:pl-24 pb-24 md:pt-24 md:pr-24 lgMax:peer-has-[:checked]:fixed">
        <section className="grid grid-cols-1 md:grid-cols-3 pageContent">
          <div className="bg-black/20 backdrop-blur-sm md:pl-8 p-8 md:col-span-2 relative flex justify-center">
            <div className="max-w-[600px]">
              <h1
                className={`${notoSerifDisplay.className} text-6xl font-bold`}
              >
                {contactData?.heroTitle}
              </h1>
              <h2 className="text-2xl font-semibold">
                {contactData?.heroSubtitle}
              </h2>
              <Divider />
              {contactData?.content && (
                <PortableText value={contactData?.content} />
              )}
              <ContactForm />
            </div>
          </div>
          <div className="bg-black/20 backdrop-blur-sm p-8 2xl:pt-0 2xl:pr-0 2xl:backdrop-blur-0 2xl:bg-transparent 2xl:pl-0 flex md:block justify-center">
            <Suspense fallback={<LoadingSpinner />}>
              <ContactImage />
            </Suspense>
          </div>
        </section>
      </main>
    </>
  );
}

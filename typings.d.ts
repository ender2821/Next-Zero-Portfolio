type Image = {
  _type?: string;
  name: string;
  asset: Asset;
};

type Block = {
  _key: string;
  markDefs: unknown[];
  children: unknown[];
  _type: string;
  style: string;
};

type Gallery = {
  gallery: [
    {
      imageUrl: string;
      imageName: string;
    },
  ];
};

type SecondaryPageData = {
  heroTitle: string;
  heroSubtitle?: string;
  content: Block[];
};

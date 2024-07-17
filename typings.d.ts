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

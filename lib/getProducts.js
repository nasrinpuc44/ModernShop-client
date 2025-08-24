const getProducts = async () => {
  const result = await fetch("https://nextserver-black.vercel.app/product");

  return result;
};

export default getProducts;

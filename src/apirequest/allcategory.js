const AllCategory = async () => {
  try {
    const dataFetch = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/products/all`
    );
    const data = dataFetch.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return <h1>Hello</h1>;
};

export default AllCategory;

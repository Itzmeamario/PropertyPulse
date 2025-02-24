const PropertyPage = async ({ params }) => {
  const { id } = await params;
  return <div>Property Page {id}</div>;
};

export default PropertyPage;

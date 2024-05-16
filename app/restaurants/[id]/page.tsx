interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = ({ params: { id } }: RestaurantPageProps) => {
  return <h1>Restaurant Page {id}</h1>;
};

export default RestaurantPage;

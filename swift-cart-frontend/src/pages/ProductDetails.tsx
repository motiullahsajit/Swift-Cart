import { useParams } from "react-router-dom";

/**
 * Component that renders the product details page.
 */
const ProductDetails = () => {
  const id = useParams().id;

  return (
    <div>
      ProductDetails
      <h2>{id}</h2>
    </div>
  );
};

export default ProductDetails;

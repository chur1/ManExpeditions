import { useQuery } from "urql"
import { useRouter } from "next/router";
import { GET_PRODUCT_QUERY } from "../../lib/query"
import { DetailsStyle, ProductInfo } from "../../styles/ProductDetails";

export default function ProductDetails() {
    const { query } = useRouter();
    const [results] = useQuery({
        query: GET_PRODUCT_QUERY,
        variables: {slug: query.slug },
    });
    const { data, fetching, error } = results;
    if(fetching) return <p>Loading...</p>
    if(error) return <p>Oh no...</p>
    
    const{ title, description, image } = data.products.data[0].attributes; 

    return(
        <body>
            <DetailsStyle>
                <img src={image.data.attributes.formats.medium.url} alt={title} />
                <ProductInfo>
                    <div>
                        <h3>{title}</h3>  
                        <p>{description}</p>
                    </div>
                    <div>
                        <button>Add to Cart</button>
                    </div>
                </ProductInfo>
            </DetailsStyle>
        </body>
    
    )
}
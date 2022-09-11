import { useEffect } from "react";
import auth from "../store/auth";
import { useQuery } from "@apollo/client";
import Router from "next/router";
import { API_URL } from "../constants/common"
import { GetProductsDocument, GetProductsQuery, GetProductsQueryVariables } from "../graphql/generated";
import { Col, Row, Card } from 'antd';
import Link from "next/link";
const { Meta } = Card;

const Videogames = () => {
   const { data, loading, error } = useQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, {
      variables: {
         "pagination": {
            "page": 1,
            "pageSize": 20
         }
      }
   })
   const videogames = data ? data.products.data : []
   console.log('videogames', videogames)

   useEffect(() => {
      const { pathname } = Router;
      if (!auth.isAuth && pathname === "/") {
         Router.push("/signup");
      }
   }, []);

   if (!auth.isAuth) return null;
   return (
      <div>
         {loading && "loading"}
         {error && error.message}
         <Row>
            {videogames.map((videogame) => (
               <Col span={6} key={videogame.id}>
                  <Link href={`/products/${videogame.id}`}>
                  <Card
                     hoverable
                     cover={<img alt={videogame.attributes.Name} src={API_URL + videogame?.attributes?.Image?.data?.[0]?.attributes?.url} />}
                  >
                     <Meta title={videogame.attributes.Name} description={`${videogame.attributes.Price} ${videogame.attributes.Currency}`} />
                  </Card>
                  </Link>
               </Col>
            ))}
         </Row>
      </div >
   );
};

export default Videogames;

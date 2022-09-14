import { useQuery } from "@apollo/client";
import Router, { useRouter } from "next/router";
import { GetProductDocument, GetProductQuery, GetProductQueryVariables } from "../../graphql/generated";
import { API_URL } from "../../constants/common";
import { Button } from "antd";
import styles from "../../styles/videogame.module.css"
import ImageSlider from "../../components/ImageSlider";

export default function Videogame() {
  const { query } = useRouter();
  const { data, loading, error } = useQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, {
    variables: {
      id: query.id as string,
      screenshotsPagination: { "pageSize": 25 }
    }
  })
  const videogame = data?.product?.data?.attributes ?? null
  return (
    <div className={styles.product}>
      {loading && "loading"}
      {error && error.message}
      <Button onClick={() => Router.push('/')}>На главную</Button>
      {videogame ? <div>
        <h1>{videogame.Name}</h1>
        <div className={styles.rightSideBar}>
          <img alt={videogame.Name} src={API_URL + videogame?.LargeImg?.data?.[0]?.attributes?.url} className={styles.artwork} />
          <div className={styles.description}>{videogame.Description}</div>
        </div>
        <div className={styles.screenshots}>
          <div className={styles.slider}><ImageSlider slides={videogame.Screenshots.data} /></div>
        </div>

        {/* <div>{videogame.Price + videogame.Currency}</div>
        <div>{videogame.Date}</div> */}
      </div> : null}
    </div>
  );
}
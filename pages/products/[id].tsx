import { useQuery } from "@apollo/client";
import Router, { useRouter } from "next/router";
import { GetProductDocument, GetProductQuery, GetProductQueryVariables } from "../../graphql/generated";
import { API_URL } from "../../constants/common";
import { Button } from "antd";
import styles from "../../styles/videogame.module.css"

export default function Videogame() {
  const { query } = useRouter();
  const { data, loading, error } = useQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, {
    variables: {
      id: query.id as string
    }
  })
  const videogame = data?.product?.data?.attributes ?? null
  console.log('videogame', videogame)
  return (
    <div className={styles.product}>
      {loading && "loading"}
      {error && error.message}
      <Button onClick={() => Router.push('/')}>На главную</Button>
      {videogame ? <div>
        <h1>{videogame.Name}</h1>
        <div>
          <img alt={videogame.Name} src={API_URL + videogame?.LargeImg?.data?.[0]?.attributes?.url} className={styles.artwork} />
        </div>
        <div className={styles.screenshots}>
          {videogame.Screenshots?.data?.map(screenshot => <div>
            <img alt={screenshot.attributes.name} src={API_URL + screenshot?.attributes?.url} className={styles.screenshot} />
          </div>)}
        </div>
        <div className={styles.description}>{videogame.Description}</div>
        <div>{videogame.Price + videogame.Currency}</div>
        <div>{videogame.Date}</div>
      </div> : null}
    </div>
  );
}
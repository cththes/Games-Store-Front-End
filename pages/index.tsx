import Pictures from "../components/pictures";
import NoSSR from "../components/NoSSR"
import Upload from "../components/Upload";
import Videogames from "../components/videogames";

const index = () => {

   return (
      <div>
         <h1>
            Главная страница
         </h1>
         <NoSSR>
            <Videogames />
         </NoSSR>  
      </div>
   )
}

export default index
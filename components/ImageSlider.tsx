import { useState } from "react"
import { API_URL } from "../constants/common"
import styles from "../styles/ImageSlider.module.css"

const ImageSlider = ({ slides }) => {
   const [currentIndex, setCurrentIndex] = useState(0)

   const goToPrevious = () => {
      const isFirstSlide = currentIndex === 0
      const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1
      setCurrentIndex(newIndex)
   }
   const goToNext = () => {
      const isLastSlide = currentIndex === slides.length - 1
      const newIndex = isLastSlide ? 0 : currentIndex + 1
      setCurrentIndex(newIndex)
   }
   const goToSlide = slideIndex => {
      setCurrentIndex(slideIndex)
   }
   return (
      <div className={styles.sliderStyles}>
         <div className={styles.leftArrowStyles} onClick={goToPrevious}></div>
         <div className={styles.rightArrowStyles} onClick={goToNext}></div>
         <img className={styles.slideStyles} src={API_URL + slides[currentIndex]?.attributes?.url} />
         <div className={styles.slideContainerStyles}>
            {slides.map((slide, slideIndex) => (
               <div key={slideIndex}
                  className={styles.dotStyles}
                  onClick={() => goToSlide(slideIndex)}>
                     <img className={styles.thumbnail} src={API_URL + slides[slideIndex]?.attributes?.url}/>
                  </div>
            ))}
         </div>
      </div>
   )
}

export default ImageSlider
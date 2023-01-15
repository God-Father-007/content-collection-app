import '../style/ImageCarousel.css';
import { useState, useEffect, useRef } from 'react';

export default function ImageCarousel(props) {
    let images = props.images;
    const [carouselImage, setCarouselImage] = useState(0);

    function nextImage() {
        setCarouselImage(previousState => {
            return previousState === images.length - 1 ? 0 : previousState + 1;
        });
    }

    // autoplay
    const autoPlayRef = useRef();
    useEffect(() => {
        autoPlayRef.current = nextImage;
    });
    useEffect(() => {
        const play = () => {
            autoPlayRef.current();
        }
        const interval = setInterval(play,3000);
        return () => clearInterval(interval);
    }, []);

    

    return (
        <div className="image-carousel">
            <img
                src={images[carouselImage]}
                style={{
                    objectFit: "cover",
                    height: "100%",
                    maxHeight: "60vh"
                }}
                alt={"https://upload.wikimedia.org/wikipedia/commons/7/75/No_image_available.png"}
            />
        </div>
    );
}
import styles from './Image.module.css';
export const Image = ({ image }) => {
    return (
            <marquee className={styles['marquee-container']}>
                {
                    image.map((img) => (
                        <img
                            key={img.id}
                            src={img.imgSrc}
                            alt={img.alt}
                            className={styles['actual-image']}
                        />
                    ))
                }
            </marquee>
    )
}
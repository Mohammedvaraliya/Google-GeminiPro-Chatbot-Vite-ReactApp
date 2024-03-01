import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

interface StarRatingProps {
    onChange: (newRating: number) => void;
    value:number
}

const StarRating: React.FC<StarRatingProps> = ({ value, onChange }) => {
    return (
        <Rating style={{ maxWidth: 250 }} value={value} onChange={onChange} />
    )
}

export default StarRating
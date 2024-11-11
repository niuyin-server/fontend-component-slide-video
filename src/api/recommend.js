import axios from 'axios';

export async function recommendVideoFeed() {
    return await axios.get('/mock/recommend/video/feed')
}


import mongoose, {Schema} from 'mongoose';

const MovieSchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
});

const Movie = mongoose.model('Movie', MovieSchema);

export default Movie;

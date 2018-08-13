import mongoose, {Schema} from 'mongoose';
import findOrCreate from 'mongoose-findorcreate';

const SeriesSchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  episodes: [
    {
      type: String,
    },
  ],
});

SeriesSchema.plugin(findOrCreate);

const Series = mongoose.model('Series', SeriesSchema);

export default Series;

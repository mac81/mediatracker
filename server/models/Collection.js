import mongoose, {Schema} from 'mongoose';
import findOrCreate from 'mongoose-findorcreate';

const CollectionSchema = new Schema({
  owner: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  series: [
    {
      type: Schema.ObjectId,
      ref: 'Series',
    },
  ],
  movies: [
    {
      type: Schema.ObjectId,
      ref: 'Movie',
    },
  ],
});

CollectionSchema.plugin(findOrCreate);

const Collection = mongoose.model('Collection', CollectionSchema);

export default Collection;

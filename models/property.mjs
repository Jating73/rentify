import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
    seller_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    place: { type: String, required: true },
    area: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    nearby_hospitals: { type: String, required: true },
    nearby_colleges: { type: String, required: true },
    description: { type: String },
    images: [{ type: String }]
}, { timestamps: true });

export default mongoose.models.Property || mongoose.model('Property', PropertySchema);

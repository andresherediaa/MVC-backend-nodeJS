import mongoose from "mongoose";
const { Schema } = mongoose;

const planetsSchema = new Schema({
    keplerName: {
        type: String,
        required: true,
    },
});

export default mongoose.model("Planet", planetsSchema);

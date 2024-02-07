import mongoose from "mongoose";

const serviceProviderSchema = new mongoose.Schema({
  spname: {
    type: String,
    required: true,
  },
  spmobile: {
    type: String,
    required: true,
  },
  spaddress: {
    type: String,
    required: true,
  },
  spcity: {
    type: String,
    required: true,
  },
  spservicename: {
    type: String,
    required: true,
  },
  spemail: {
    type: String,
    required: true,
  },
  sppassword: {
    type: String,
    required: true,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});
export default mongoose.model("ServiceProvider", serviceProviderSchema);
//table nu naam aekvachan ma

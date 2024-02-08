import ServiceProvider from "../model/serviceProviderModel.js";
import Review from "../model/reviewModel.js";

export const createServiceProvider = async (req, res) => {
  try {
    const serviceProviderData = new ServiceProvider(req.body);
    if (!serviceProviderData) {
      return res.status(404).json({ msg: "Service provider data not found" });
    }

    const savedData = await serviceProviderData.save();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAllServiceProviders = async (req, res) => {
  try {
    const serviceProviderData = await ServiceProvider.find();
    if (!serviceProviderData) {
      return res.status(404).json({ msg: "Service provider data not found" });
    }
    res.status(200).json(serviceProviderData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//for fetching one perticular record
export const getOneServiceProvider = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await ServiceProvider.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "service provider data not found" });
    }
    res.status(200).json(userExist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//for updating data
export const updateServiceProvider = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await ServiceProvider.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "serviceprovider data not found" });
    }
    const updatedData = await ServiceProvider.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    // await Review.updateMany(
    //   { serviceProviderId: id },
    //   {
    //     $set: {
    //       "serviceProviderId.spname": req.body.spname,
    //       "serviceProviderId.spemail": req.body.spemail,
    //     },
    //   }
    // );

    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//for deleting record
export const deleteServiceProvider = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await ServiceProvider.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "Service provider data not found" });
    }
    await ServiceProvider.findByIdAndDelete(id);

    res.status(200).json({ msg: "service provider deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//search by service
export const SearchServiceProvider_byservice = async (req, res) => {
  try {
    const { query } = req.body;
    const filter = {
      $or: [
        {
          spservicename: { $regex: `\\b${query}\\b`, $options: "i" },
          // for exact term finding
        },
        // {
        //   spcity: { $regex: query, $options: "i" },

        // },
      ],
    };
    const filterData = await ServiceProvider.find(filter);
    if (filterData.length === 0) {
      res.status(404).json({ msg: "Data not found" });
    }
    res.status(200).json(filterData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//query in api url
export const getServiceProviderByServiceName = async (req, res) => {
  try {
    const { serviceName } = req.params;
    const serviceProvider = await ServiceProvider.find({
      spservicename: serviceName,
    });

    if (!serviceProvider) {
      return res
        .status(404)
        .json({ msg: `Service provider for service ${serviceName} not found` });
    }

    res.status(200).json(serviceProvider);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// localhost:8000/api/service-providers/getallquery/carpenter

export const addReviewToServiceProvider = async (req, res) => {
  try {
    const serviceProviderId = req.params.id;

    const serviceProvider = await ServiceProvider.findById(serviceProviderId);
    if (!serviceProvider) {
      return res.status(404).json({ msg: "Service provider not found" });
    }
    const reviewData = req.body;
    const userId = new mongoose.Types.ObjectId(reviewData.userId); // Convert userId to ObjectId
    // console.log("Received review data:", reviewData); // Add this line

    const review = new Review({ ...reviewData, serviceProviderId });
    const savedReview = await review.save();

    const updatedServiceProvider = await ServiceProvider.findByIdAndUpdate(
      serviceProviderId,
      { $push: { reviews: savedReview._id } },
      { new: true }
    );

    // console.log("Updated serviceProvider data:", serviceProvider); // Add this line

    res.status(200).json(savedReview);
  } catch (error) {
    // console.error("Error in addReviewToServiceProvider:", error); // Add this line
    res.status(500).json({ error: error.message });
  }
};
// POST localhost:8000/api/service-providers/SP_ID/reviews

// {
//   "userId": "USER_ID",
//   "rating": 5,
//   "comment": "Great service!"
// }

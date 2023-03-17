import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    course_title: { type: String, required: true },
    seo_title: { type: String, required: true },
    seo_description: { type: String, required: true },
    seo_URL: { type: String, required: true },
    course_description: { type: String, required: true },
    seo_keywords: { type: String, required: true },
    seo_slug: { type: String, required: true },
    route: { type: String, required: true },
    course_category: { type: String },
    course_type: { type: String },
    course_thumbnail: { type: String, required: true },
    course_promo_video: { type: String, required: true },
    promo_codes: [{ type: String, required: true }],
    course_features: [{ item: { type: String } }],
    rating: { type: Number },
    reviews: [
      {
        image: { type: String },
        name: { type: String },
        courseName: { type: String },
        route: { type: String },
        description: { type: String },
      },
    ],
    course_module: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        isFree: { type: Boolean, default: false, required: true },
        video: [
          {
            isFree: { type: Boolean, default: false, required: true },
            subtitle: { type: String },
            videoId: { type: String },
          },
        ],
      },
    ],
    regular_price: { type: Number, required: true },
    regular_price_bn: { type: String, required: true },
    offer: [
      {
        isOn: { type: Boolean, default: false, required: true },
        offer_msg: { type: String, required: true },
        offer_price: { type: Number, required: true },
        offer_price_bn: { type: String, required: true },
      },
    ],

    num_Classes: { type: String, required: true },
    course_duration: { type: String, required: true },

    batches: [
      {
        batch_number: { type: String, required: true },
        class_days: [String],
        class_link: { type: String },
        class_time: { type: String, required: true },
        num_students: { type: Number, required: true },
        start_date: { type: String, required: true },
        admission_going: { type: Boolean, default: true },
      },
    ],
    instructor: [
      {
        name: { type: String, required: true },
        ins_current_position: { type: String, required: true },
        ins_previous_position: { type: String, required: true },
        instructor_image: { type: String, required: true },
        companies: [
          {
            company_name: { type: String, required: true },
            company_logo: { type: String },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Course", courseSchema);

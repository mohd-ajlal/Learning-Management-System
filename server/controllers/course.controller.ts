import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import { createCourse, getAllCoursesService } from "../services/course.service";
import CourseModel from "../models/course.model";
import { redis } from "../utils/redis";
import mongoose from "mongoose";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notification.model";
import axios from "axios";

// upload course
export const uploadCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;
      if (thumbnail) {
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      createCourse(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const editCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;
      if (thumbnail) {
        await cloudinary.v2.uploader.destroy(thumbnail.public_id);

        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      const courseId = req.params.id;

      const course = await CourseModel.findByIdAndUpdate(
        courseId,
        {
          $set: data,
        },
        { new: true }
      );

      res.status(201).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get course data or can view course detail without purchase

export const getSingleCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;
      const isCacheExist = await redis.get(courseId);

      if (isCacheExist) {
        const course = JSON.parse(isCacheExist);
        console.log("Hitting Redis...");
        res.status(200).json({
          success: true,
          course,
        });
      } else {
        const course = await CourseModel.findById(req.params.id).select(
          "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
        );

        // console.log("Hitting MongoDB...");



        await redis.set(courseId, JSON.stringify(course), 'EX', 604800); // 7 days

        res.status(200).json({
          success: true,
          course,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get all courses --without purchasing

export const getAllCourses = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isCacheExist = await redis.get("allCourses");

      if (isCacheExist) {
        const courses = JSON.parse(isCacheExist);
        console.log("Hitting Redis...");
        res.status(200).json({
          success: true,
          courses,
        });
      } else {
        const courses = await CourseModel.find().select(
          "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
        );

        console.log("Hitting MongoDB...");

        await redis.set("allCourses", JSON.stringify(courses));

        res.status(200).json({
          success: true,
          courses,
        });
      }
      //   const courses = await CourseModel.find().select(
      //     "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
      //   );

      //   res.status(200).json({
      //     success: true,
      //     courses,
      //   });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get course content - only for user who has purchased the course

export const getCourseByUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCourseList = req.user?.courses;
      const courseId = req.params.id;
      const courseExist = userCourseList?.find(
        (course: any) => course._id.toString() === courseId
      );

      if (!courseExist) {
        return next(
          new ErrorHandler("You are not eligible to access this course", 404)
        );
      }

      const course = await CourseModel.findById(courseId);

      const content = course?.courseData;
      console.log(content);
      res.status(200).json({
        success: true,
        content,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);


// add question in course

interface IAddQuestionData{
    question:string;
    courseId:string;
    contentId:string;
}

export const addQuestion = CatchAsyncError(async(req: Request, res: Response, next: NextFunction)=>{
    try {
        
        const {question, courseId, contentId}:IAddQuestionData = req.body;
        const course = await CourseModel.findById(courseId)

        if(!mongoose.Types.ObjectId.isValid(contentId)){
            return next(new ErrorHandler("Invalid ID", 400));
        }

        const courseContent = course?.courseData?.find((item:any) => item._id.equals(contentId));

        if(!courseContent){
            return next(new ErrorHandler("Course content not found || Invalid content id", 404));
        }
        
        // create new question object

        const newQuestion:any={
            user:req.user,
            question,
            questionReplies:[]
        }

        // add this question to course content

        courseContent.questions.push(newQuestion);

        await NotificationModel.create({
          user: req.user?._id,
          title:"New Question Received",
          message:`You have a new question in ${courseContent.title}`,
        })

        // save the updated course

        await course?.save();

        res.status(200).json({
            success: true,
            course
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
})


// add answer to course question
interface IAddAnswerData{
    answer: string;
    courseId: string;
    contentId: string;
    questionId: string;
}

export const addAnswer = CatchAsyncError(async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const { answer, courseId, contentId, questionId } : IAddAnswerData = req.body;

        const course = await CourseModel.findById(courseId);
        if(!mongoose.Types.ObjectId.isValid(contentId)){
            return next(new ErrorHandler("Invalid ID", 400));
        }

        const courseContent = course?.courseData?.find((item:any) => item._id.equals(contentId));

        if(!courseContent){
            return next(new ErrorHandler("Course content not found || Invalid content id", 404));
        }

        const question = courseContent.questions.find((item:any) => item._id.equals(questionId));

        if(!question){
            return next(new ErrorHandler("Question not found || Invalid question id", 404));
        }

        // create new answer object
        const newAnswer:any={
            user:req.user,
            answer
        }

        // add answer to course content

        question.questionReplies?.push(newAnswer);

        await course?.save();

        if(req.user?._id === question.user._id){
            // create a notification
            await NotificationModel.create({
                user:req.user?._id,
                title:"Question Answered",
                message:`Your question has been answered in ${courseContent.title}`,
            })
        }else{
            const data ={
                name:question.user.name,
                title:courseContent.title,
            }

            const html = await ejs.renderFile(path.join(__dirname,"../mails/question-reply.ejs"),
        data);

        try {
            // send email
            await sendMail({
                email:question.user.email,
                subject:"Question Reply",
                template:"question-reply.ejs",
                data
            })
        } catch (error:any) {
            return next(new ErrorHandler(error.message, 500));
        }
        }

        res.status(200).json({
            success: true,
            course
        })
    } catch (error:any) {
        return next(new ErrorHandler(error.message, 500));
        
    }
})


// add review in course

interface IAddReviewData{
    review:string;
    rating:number;
    userId:string;
}

export const addReview = CatchAsyncError(async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const userCourseList = req.user?.courses;

        const courseId = req.params.id;

        // check if courseId already exists in userCourseList based on _id then

        const courseExist = userCourseList?.some((course:any) =>course._id.toString() === courseId.toString())

        if(!courseExist){
            return next(new ErrorHandler("You are not eligible to review this course", 404));
        }

        const course = await CourseModel.findById(courseId);
        
        const {review, rating} = req.body as IAddReviewData; 
        const reviewData:any = {
            user:req.user,
            comment:review,
            rating,
        }

        course?.reviews.push(reviewData)

        let avg = 0;
        course?.reviews.forEach((rev:any)=>{
            avg += rev.rating;
        })

        if(course){
            course.rating = avg / course.reviews.length;
        }

        // course?.rating = avg / course?.reviews.length

        await course?.save();

        const notification= {
            title:"New Review Received",
            message:`${req.user?.name} has given a review in ${course?.name}`,
        }

        // create notification

        res.status(200).json({
            success:true,
            course
        });
    } catch (error:any) {
        return next(new ErrorHandler(error.message, 500));
    }
})

// add reply in review where only admin is allowed to reply

interface IAddReviewData{
    comment:string;
    courseId:string;
    reviewId:string;
}

export const addReplyToReview = CatchAsyncError(async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const {comment, courseId, reviewId} = req.body as IAddReviewData;

        const course = await CourseModel.findById(courseId);

        if(!course){
            return next(new ErrorHandler("Course not found", 404));
        }

        const review = course?.reviews.find((rev:any) => rev._id.toString() === reviewId);

        if(!review){
            return next(new ErrorHandler("Review not found", 404));
        }

        const replyData:any = {
            user: req.user,
            comment
        }

        if(!review.commentReplies){
            review.commentReplies = [];
        }

        review.commentReplies?.push(replyData);

        await course.save()

        res.status(200).json({
            success: true,
            course
        })
    } catch (error:any) {
        return next(new ErrorHandler(error.message, 500));
    }
})

// get all courses only for admin dashboard

export const getAllCourse = CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
  try {
    getAllCoursesService(res);
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
})


// delete course || only for admin

export const deleteCourse = CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
  try {
    const {id} = req.params;

    const course = await CourseModel.findById(id);

    if(!course){
      return next(new ErrorHandler("Course not found", 400));
    }

    await course.deleteOne({id});

    await redis.del(id);

    res.status(200).json({
      success:true,
      message:"Course deleted successfully"
    })

  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
})

// generate video url

export const generateVideoUrl = CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=> {
  try{
    const {videoId} = req.body;
    const response = await axios.post(
      `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
      {ttl:300},
      {
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization:`Apisecret ${process.env.VDOCIPHER_API_SECRET}`,
        }
      }
    );
    res.json(response.data)

  }catch(error:any){
    console.log(error)
    return next(new ErrorHandler(error.messages, 400))
  }
})
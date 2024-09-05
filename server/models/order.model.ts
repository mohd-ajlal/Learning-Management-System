import mongoose, {Document, Model,Schema } from "mongoose";


export interface IOrder extends Document{
    courseId: string;
    userId: string;
    payment_info:object;
}

const orderSchema = new Schema<IOrder>({
    courseId:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true,
    },
    payment_info:{
        type:Object,
        // required:true,  // we can make it required if we want to store payment
    }
},{timestamps:true});

const OrderModel:Model<IOrder> = mongoose.model('Order', orderSchema);

export default OrderModel;
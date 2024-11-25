'use client'; // Add this line at the top of the file

import React, { useEffect, useState } from 'react';
import { useGetCourseDetailsQuery } from '@/redux/features/courses/coursesApi';
import Loader from '../Leader/Loader';
import Heading from '@/app/utils/Heading';
import Header from '../Header';
import Footer from '../Footer';
import CourseDetails from './CourseDetails';
import { useCreatePaymentIntentMutation, useGetStripePublishablekeyQuery } from '@/redux/features/orders/ordersApi';
// import { loadStripe } from '@stripe/stripe-js';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';

type Props = {
  id: string;
};

const CourseDetailsPage = ({ id }: Props) => {
  const [route, setRoute] = useState('Login');
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetCourseDetailsQuery(id);
//   const { data: config } = useGetStripePublishablekeyQuery({});
//   const [createPaymentIntent, { data: paymentIntentData }] = useCreatePaymentIntentMutation();
//   const { data: userData } = useLoadUserQuery(undefined, {});
//   const [stripePromise, setStripePromise] = useState<any>(null);
//   const [clientSecret, setClientSecret] = useState('');

//   useEffect(() => {
//     if (config) {
//       const publishablekey = config?.publishablekey;
//       setStripePromise(loadStripe(publishablekey));
//     }
//     if (data && userData?.user) {
//       const amount = Math.round(data.course.price * 100);
//       createPaymentIntent(amount);
//     }
//   }, [config, data, userData]);

//   useEffect(() => {
//     if (paymentIntentData) {
//       setClientSecret(paymentIntentData?.client_secret);
//     }
//   }, [paymentIntentData]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
           <Heading
        title="Gravity Coaching Classes"
        description="Best IIT-JEE Coaching | Best NEET Coaching | Best FOUNDATION Coaching"
        keywords={data?.course?.tags}
      />
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          {/* {stripePromise && ( */}
            <CourseDetails
              data={data.course}
            //   stripePromise={stripePromise}
            //   clientSecret={clientSecret}
              setRoute={setRoute}
              setOpen={setOpen}
            />
          {/* )} */}
          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
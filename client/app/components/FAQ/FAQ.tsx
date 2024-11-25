import { styles } from '@/app/styles/style';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import React, { useEffect, useState } from 'react';
import { HiMinus, HiPlus } from 'react-icons/hi';

type Props = {};

const FAQ = (props: Props) => {
  const { data } = useGetHeroDataQuery('FAQ', {});
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data.layout?.faq);
    }
  }, [data]);

  const toggleQuestion = (id: string) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <div className="py-16 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-[90%] 800px:w-[80%] m-auto">
        {/* Header Section */}
        <h1
          className={`${styles.title} 800px:text-[40px] text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500`}
        >
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Have questions? We’ve got answers. Check out the most common inquiries
          below or reach out to our team for more details.
        </p>

        {/* FAQ List */}
        <div className="mt-12">
          <dl className="space-y-8">
            {questions?.map((q) => (
              <div
                key={q._id}
                className={`${
                  q._id !== questions[0]?._id && 'border-t'
                } border-gray-200 dark:border-gray-700 pt-6`}
              >
                <dt>
                  <button
                    className="flex items-center justify-between w-full text-left focus:outline-none transition-all duration-300"
                    onClick={() => toggleQuestion(q._id)}
                  >
                    <span className="font-semibold text-lg text-gray-900 dark:text-white">
                      {q.question}
                    </span>
                    <span className="ml-6">
                      {activeQuestion === q._id ? (
                        <HiMinus className="h-6 w-6 text-blue-500 dark:text-teal-400" />
                      ) : (
                        <HiPlus className="h-6 w-6 text-blue-500 dark:text-teal-400" />
                      )}
                    </span>
                  </button>
                </dt>
                {activeQuestion === q._id && (
                  <dd className="mt-3 pr-6">
                    <p className="text-base text-gray-700 dark:text-gray-300 font-light">
                      {q.answer}
                    </p>
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FAQ;

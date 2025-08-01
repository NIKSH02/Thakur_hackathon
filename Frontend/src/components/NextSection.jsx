import React from 'react';

const NextSection = ({ title = "Next Section", bgColor = "bg-[#1a1a1a]" }) => {
  return (
    <section className={`h-[100vh] flex items-center justify-center ${bgColor}`}>
      <h2 className="text-4xl lg:text-7xl font-bold text-gray-300">{title}</h2>
    </section>
  );
};

export default NextSection;

import React from "react";
import team1 from "../../../assets/1team.png";
import team2 from "../../../assets/2team.png";
import team3 from "../../../assets/3team.png";
import team4 from "../../../assets/4team.png";

const Team = () => {
  return (
    <div className="flex px-12 lg:px-0 flex-col lg:flex-row items-center justify-center">
      <div className="flex flex-col justify-start items-center">
        <img className="w-[400px] hover:scale-90 transition-all duration-300" src={team1} alt="" />
        <h1 className="py-5 font-bold text-2xl text-primaryColor">Brigitte Schwartz</h1>
        <p className="text-center px-10">
          With years of experience in the transportation industry, [Name] leads
          our company with a vision of providing safe, timely, and
          customer-focused transport solutions. His leadership and expertise
          ensure smooth operations and continuous growth.
        </p>
      </div>
      <div className="flex flex-col justify-start items-center">
        <img className="w-[450px] hover:scale-90 transition-all duration-300" src={team2} alt="" />
        <h1 className="py-5 font-bold text-2xl text-primaryColor">Alfredo Torres</h1>
        <p className="text-center px-10">
          As the backbone of our daily operations, [Name] oversees fleet
          management, driver coordination, and logistics planning. His keen
          attention to detail and problem-solving skills ensure that every trip
          is executed flawlessly.
        </p>
      </div>
    
      <div className="flex flex-col justify-center items-center">
        <img className="w-[400px] hover:scale-90 transition-all duration-300" src={team4} alt="" />
        <h1 className="py-5 font-bold text-2xl text-primaryColor">Margarita Perez</h1>
        <p className="text-center px-10">
          Providing excellent customer service is [Name]’s top priority. She
          handles client inquiries, resolves issues, and ensures a smooth
          communication process between customers and our team, making sure
          every client gets the best experience.
        </p>
      </div>
    </div>
  );
};

export default Team;

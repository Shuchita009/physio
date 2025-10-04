import React from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { contactInfo } from '../mock';
import { sendWhatsAppMessage } from '../utils/communication';
import { CheckCircle, GraduationCap, Users, Star } from 'lucide-react';

export const Hero = () => {
  const handleBookConsultation = () => {
    const message = "Dear Dr. SS, I would like to book a consultation. Please contact me to schedule an appointment.";
    sendWhatsAppMessage(contactInfo.phone, message);
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
          Elite Sports <span className="text-blue-600">Physiotherapy</span> Excellence
        </h1>
        <p className="text-xl text-gray-700 max-w-3xl mb-8 leading-relaxed">
          Trusted by Olympic athletes and sports champions. Specialized in manual therapy, musculoskeletal rehabilitation, and sports injury recovery with international expertise.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

        <h4 className="font-semibold text-gray-900 flex items-center gap-4 mt-6 mb-3" 
        // style={{background:'#f7fbff',
        //   borderRadius:0,
        //   boxShadow:'0 2px 8px #e6f2ff',
        //   padding:6,
        //   marginBottom:1,
        //   border: '1px solid #bfdbfe'}}
        >
          {/* <GraduationCap className="w-7 h-7 text-blue-400" /> */}
          <span>  </span>
          <span>🎓 MPT Australia | Sports & ortho</span>
        </h4>
        <h4 className="font-semibold text-gray-900 flex items-center gap-4 mt-6 mb-3">
          {/* <Users className="w-7 h-7 text-blue-400" /> */}
          {/* <span>   </span> */}
          <span>👥 Elite Athletes | Olympic & National</span>
        </h4>
        <h4 className="font-semibold text-gray-900 flex items-center gap-4 mt-6 mb-3">
          {/* <Star className="w-7 h-7 text-blue-400" /> */}
          <span>  </span>
          <span>🌟 10+ Years | Sports Experience</span>
        </h4>  

        </div>

        <ul className="space-y-3 mb-10 list-none">
          <li className="flex items-center text-gray-700 text-lg">
            Worked with Saina Nehwal, Lakshya Sen, MC Mary Kom
          </li>
          {/* <li className="flex items-center text-gray-700 text-lg">
            Head Physiotherapist - OGQ Junior Scholarship Program
          </li> */}
          <li className="flex items-center text-gray-700 text-lg">
            Certified in Ergonomics from USA
          </li>
        </ul>

        <div className="flex space-x-4">
          <Button
            className="bg-blue-700 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
            onClick={handleBookConsultation}
          >
            Book Consultation
          </Button>

        </div>
      </div>
    </section>
  );
};

export default Hero;




// import React from 'react';
// import { Badge } from './ui/badge';
// import { Button } from './ui/button';
// import { contactInfo } from '../mock';
// import { sendWhatsAppMessage } from '../utils/communication';
// import { CheckCircle, GraduationCap, Users, Star } from 'lucide-react';

// export const Hero = () => {
//   const handleBookConsultation = () => {
//     const message = "Dear Dr. SS, I would like to book a consultation. Please contact me to schedule an appointment.";
//     sendWhatsAppMessage(contactInfo.phone, message);
//   };

//   return (
//     <section className="py-16 lg:py-24 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
//         <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
//           Elite Sports <span className="text-blue-600">Physiotherapy</span> Excellence
//         </h1>
//         <p className="text-xl text-gray-700 max-w-3xl mb-8 leading-relaxed">
//           Trusted by Olympic athletes and sports champions. Specialized in manual therapy, musculoskeletal rehabilitation, and sports injury recovery with international expertise.
//         </p>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

//         <h3 className="font-semibold text-gray-900 flex items-center gap-4 mt-6 mb-3">
//           <GraduationCap className="w-7 h-7 text-green-600" />
//           <span> </span>
//           <span>MPT Australia | Sports & ortho</span>
//         </h3>
//           <div className="flex items-start space-x-">
//             <GraduationCap className="w-8 h-8 text-blue-600 flex-shrink-0" />
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900">MPT Australia</h3>
//             </div>
//           </div>
//           <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex flex-col items-center text-center space-y-2 border border-gray-100">
//             <Users className="w-8 h-8 text-teal-600 flex-shrink-0" />
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900">Elite Athletes</h3>
//               <p className="text-gray-600">Olympic & National</p>
//             </div>
//           </div>
//           <div className="bg-gray-50 p-6 rounded-lg shadow-sm flex flex-col items-center text-center space-y-2 border border-gray-100">
//             <Star className="w-8 h-8 text-yellow-600 flex-shrink-0" />
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900">10+ Years</h3>
//               <p className="text-gray-600">Sports Experience</p>
//             </div>
//           </div>
//         </div>

//         <ul className="space-y-3 mb-10 list-none">
//           <li className="flex items-center text-gray-700 text-lg">
//             Worked with Saina Nehwal, Lakshya Sen, MC Mary Kom
//           </li>
//           <li className="flex items-center text-gray-700 text-lg">
//             Head Physiotherapist - OGQ Junior Scholarship Program
//           </li>
//           <li className="flex items-center text-gray-700 text-lg">
//             Certified in Ergonomics from USA
//           </li>
//         </ul>

//         <div className="flex space-x-4">
//           <Button
//             className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
//             onClick={handleBookConsultation}
//           >
//             Book Consultation
//           </Button>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;

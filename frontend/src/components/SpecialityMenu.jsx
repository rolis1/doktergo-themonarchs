/* eslint-disable no-unused-vars */
import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div className='flex flex-col items-center gap-8 py-16 text-gray-800 px-4 bg-gray-50 rounded-3xl mx-4' id='speciality'>
        <div className="text-center">
          <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent'>Find by Speciality</h1>
          <p className='mt-4 text-gray-600 max-w-2xl'>Browse our medical specialties to find the right doctor for your specific health needs.</p>
        </div>
        
        <div className='flex flex-wrap justify-center gap-6 pt-5 w-full'>
            {specialityData.map((item, index)=>(
                <Link 
                  onClick={()=>scrollTo(0,0)} 
                  className='group flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 hover:-translate-y-2 w-36' 
                  key={index} 
                  to={`/doctors/${item.speciality}`}
                >
                    <div className="bg-blue-50 p-4 rounded-full mb-4 group-hover:bg-blue-100 transition-colors">
                      <img className='w-12 h-12 object-contain' src={item.image} alt={item.speciality} />
                    </div>
                    <p className='text-center font-medium text-gray-800 group-hover:text-blue-600 transition-colors'>{item.speciality}</p>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default SpecialityMenu
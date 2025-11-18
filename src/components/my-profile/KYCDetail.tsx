import { updateUserProfile } from '@/services/user_actions';
import { UserProfile } from '@/types/auth.types';
import { ProfileFormData } from '@/types/updateprofile.type';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import UserFieldDetail from './UserFieldDetail';

function KYCDetail({ userData, userId, setUserData }: { userData: Partial<UserProfile> | undefined, userId: string | undefined, setUserData: React.Dispatch<React.SetStateAction<Partial<UserProfile> | undefined>> }) {
  const {
    register,
    handleSubmit,
    unregister
  } = useForm();

  const onSubmit = async (data: ProfileFormData) => {
    if (userId) {
      await updateUserProfile(userId, data);
      setUserData(prev => ({
        ...prev,
        ...data
      }))
    }
  };
  useEffect(() => {
    if (userData) {
      if (userData?.pan_number) {
        unregister("pan_number")
      };
      if (userData?.aadhar_number) {
        unregister("aadhar_number")
      };
    }
  }, [userData, unregister]);
  return (
    <div>
      {
        userData?.pan_number &&
        <UserFieldDetail label={"PAN Card Details"} detail={userData.pan_number} />
      }
      {
        userData?.aadhar_number &&
        <UserFieldDetail label={"Aadhar Number"} detail={userData.aadhar_number} />
      }
      {(!userData?.pan_number || !userData?.aadhar_number) &&
        <form onSubmit={handleSubmit(onSubmit)} className="user-form">
          {!userData?.pan_number && <div className="max-w-[300px] mb-1">
            <label htmlFor="pan_number" className="text-sm font-medium text-[#898585]">
              PAN Card Details
            </label>
            <input
              id="pan_number"
              {...register("pan_number")}
              className="w-full mx-auto px-4 py-3 border border-white rounded-xl mb-4 text-white bg-gray-900 placeholder:text-sm mt-2"
              name="pan_number"
              required
            />
          </div>
          }
          {!userData?.aadhar_number && <div className="max-w-[300px] mb-1">
            <label htmlFor="aadhar_number" className="text-sm font-medium text-[#898585]">
              Aadhar Number
            </label>
            <input
              id="aadhar_number"
              {...register("aadhar_number")}
              className="w-full mx-auto px-4 py-3 border border-white rounded-xl mb-4 text-white bg-gray-900 placeholder:text-sm mt-2"
              name="aadhar_number"
              required
            />
          </div>
          }
          <div className="max-w-[300px] text-center mt-3">
            <button type="submit" className="rethink-secondary-btn cursor-pointer">
              Save
            </button>
          </div>
        </form>
      }
    </div>
  )
}

export default React.memo(KYCDetail);

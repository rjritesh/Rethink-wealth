import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import UserFieldDetail from './UserFieldDetail'
import { ProfileFormData } from '@/types/updateprofile.type';
import { updateUserProfile } from '@/services/user_actions';
import { UserProfile } from '@/types/auth.types';
import UserProfileSkeleton from '../skeletons/UserProfileSkeleton';

function ProfileTab({ userData, user, setUserData }:
  { userData: Partial<UserProfile> | undefined, user: UserProfile | null, setUserData: React.Dispatch<React.SetStateAction<Partial<UserProfile> | undefined>> }) {
  const profileData = [
    {
      label: "Name",
      user_data: user && user.displayName
    },
    {
      label: "Email",
      user_data: userData?.email || ""
    },
    {
      label: "Phone",
      user_data: userData?.phone ? `XXXXXX${userData.phone.slice(-4)}` : ""
    },
  ]
  const {
    register,
    handleSubmit,
    unregister
  } = useForm<ProfileFormData>();

  const onSubmit = async (data: ProfileFormData) => {
    if (user) {
      await updateUserProfile(user.uid, data);
      setUserData(prev => ({
        ...prev,
        ...data
      }))
    }
  };
  useEffect(() => {
    if (userData) {
      if (userData.dob) {
        unregister("dob");
      }
      if (userData.gender) {
        unregister("gender");
      }
      if (userData.income) {
        unregister("income");
      }
    }
  }, [userData, unregister]);
  return (
    <div>
      {!userData?.phone ?
        (
          <>
          <UserProfileSkeleton />
          </>
        ) :
        (<>
          {
            profileData.map(item => (
              <UserFieldDetail label={item.label} detail={item.user_data} key={item.label} />
            ))
          }
          {
            userData?.dob &&
            <UserFieldDetail label={"Date of Birth"} detail={userData.dob} />
          }
          {
            userData?.gender &&
            <UserFieldDetail label={"Gender"} detail={userData.gender} />
          }
          {
            userData?.income &&
            <UserFieldDetail label={"Income Range"} detail={userData.income} />
          }

          {(!userData?.dob || !userData?.gender || !userData?.income) &&
            <div>
              <form onSubmit={handleSubmit(onSubmit)} className="user-form">
                {!userData?.dob && <div className="max-w-[300px] relative mb-1">
                  <label htmlFor="dob" className="text-sm font-medium text-[#898585]">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dob"
                    {...register("dob")}
                    className="w-full mx-auto px-4 py-3 border border-white rounded-xl mb-4 text-white bg-gray-900 appearance-none placeholder:text-sm mt-2"
                    name="dob"
                    required
                  />
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-5 bottom-5 transform -translate-y-1/2 w-5 h-5 text-white pointer-events-none">
                    <path d="M0 17C0 18.7 1.3 20 3 20H17C18.7 20 20 18.7 20 17V9H0V17ZM17 2H15V1C15 0.4 14.6 0 14 0C13.4 0 13 0.4 13 1V2H7V1C7 0.4 6.6 0 6 0C5.4 0 5 0.4 5 1V2H3C1.3 2 0 3.3 0 5V7H20V5C20 3.3 18.7 2 17 2Z" fill="#E6E6E6" fillOpacity="0.44" />Add commentMore actions
                  </svg>
                </div>
                }
                {!userData?.gender && <div className="max-w-[300px] relative mb-1">
                  <label htmlFor="gender" className="text-sm font-medium text-[#898585]">
                    Gender
                  </label>
                  <select
                    id="gender"
                    {...register("gender")}
                    className="w-full mx-auto px-4 py-3 border border-white rounded-xl mb-4 text-white bg-gray-900 appearance-none placeholder:text-sm mt-2"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                }
                {!userData?.income &&
                  <div className="max-w-[300px] relative mb-1">
                    <label htmlFor="income" className="text-sm font-medium text-[#898585]">Income Range</label>
                    <select
                      id="income"
                      {...register("income")}
                      required
                      className="w-full mx-auto px-4 py-3 border border-white rounded-xl mb-4 text-white bg-gray-900 appearance-none placeholder:text-sm mt-2"
                    >
                      <option value="">Select Income Range</option>
                      <option value="0 - 10L">Below 10 Lakhs</option>
                      <option value="10L - 50L">10 Lakhs - 50 Lakhs</option>
                      <option value="50L - 1Cr">50 Lakhs - 1 Cr</option>
                      <option value="1CR+">Above 1 Cr</option>
                    </select>
                  </div>
                }
                <div className="max-w-[300px] text-center mt-3">
                  <button type="submit" className="rethink-secondary-btn cursor-pointer">
                    Save
                  </button>
                </div>
              </form>
            </div>
          }
        </>)
      }
    </div>
  )
}

export default React.memo(ProfileTab);

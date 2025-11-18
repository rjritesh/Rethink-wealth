import { updateUserProfile } from '@/services/user_actions';
import { UserProfile } from '@/types/auth.types';
import { ProfileFormData } from '@/types/updateprofile.type';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import UserFieldDetail from './UserFieldDetail';

function BankDemat({ userData, userId, setUserData }: { userData: Partial<UserProfile> | undefined, userId: string | undefined, setUserData: React.Dispatch<React.SetStateAction<Partial<UserProfile> | undefined>> }) {
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
      if (userData?.demat_ac) {
        unregister("demat_ac")
      };
      if (userData?.bank_ac) {
        unregister("bank_ac")
      };
    }
  }, [userData, unregister]);
  return (
    <div>
      {
        userData?.demat_ac &&
        <UserFieldDetail label={"Demat Account Number"} detail={userData.demat_ac} />
      }
      {
        userData?.bank_ac &&
        <UserFieldDetail label={"Bank Account Number"} detail={userData.bank_ac} />
      }

      {(!userData?.demat_ac || !userData?.bank_ac) &&
        <form onSubmit={handleSubmit(onSubmit)} className="user-form">
          {!userData?.demat_ac && <div className="max-w-[300px] mb-1">
            <label htmlFor="demat_ac" className="text-sm font-medium text-[#898585]">
              Demat Account Number
            </label>
            <input
              id="demat_ac"
              {...register("demat_ac")}
              className="w-full mx-auto px-4 py-3 border border-white rounded-xl mb-4 text-white bg-gray-900 placeholder:text-sm mt-2"
              name="demat_ac"
              required
            />
          </div>
          }
          {!userData?.bank_ac && <div className="max-w-[300px] mb-1">
            <label htmlFor="bank_ac" className="text-sm font-medium text-[#898585]">
              Bank Account Number
            </label>
            <input
              id="bank_ac"
              {...register("bank_ac")}
              className="w-full mx-auto px-4 py-3 border border-white rounded-xl mb-4 text-white bg-gray-900 placeholder:text-sm mt-2"
              name="bank_ac"
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

export default React.memo(BankDemat);

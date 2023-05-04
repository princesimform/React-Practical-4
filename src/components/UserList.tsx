import React, { ReactElement, useMemo, useState } from "react";
import { Trash2, Lock } from "react-feather";
import Profile from "./Profile";
import { useDispatch } from "react-redux";
import { hoverActions, profileAction } from "../store/store";
import { useSelector } from "react-redux";
import { userDataType } from "../interface/userDataType";
import { RootState } from "../store/store";
const TrashMemo = React.memo(Trash2);
const LockMemo = React.memo(Lock);

function UserList() {
  const { users } = useSelector((state: RootState) => state.userSlice);

  const dispatch = useDispatch();
  function setChangeHover(userData: any) {
    dispatch(profileAction.setProfile(userData));
    dispatch(hoverActions.changeHovering(true));
  }
  function ussetChangeHover() {
    dispatch(hoverActions.changeHovering(false));
  }

  const ProfileComponent = useMemo(() => {
    return <Profile />;
  }, []);
  function tableBody() {
    let rows: ReactElement[] = [];
    users.map((user: userDataType) => {
      rows.push(
        <tr className='grid grid-cols-6' key={user.id}>
          <td
            className='mx-6 my-5 flex col-span-3 cursor-pointer'
            onMouseEnter={() => setChangeHover(user)}
            onMouseLeave={ussetChangeHover}
          >
            <div className=''>
              <img
                src={user.profile}
                alt=''
                className='h-12 w-12  block rounded-full'
              />
            </div>
            <div className='pl-4'>
              <p className='font-medium text-gray-900'>{user.name}</p>
              <p className='text-gray-500'>{user.email}</p>
            </div>
          </td>
          <td className='mx-6 my-5 col-span-1 '>
            {/* <p className='text-green-600 font-bold'>Active</p> */}
            {user.isActive == "active" ? (
              <p className='text-green-600 font-bold'>Active</p>
            ) : (
              <select
                id='countries'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                defaultValue={"inactive"}
              >
                <option value='inactive'>Inactive</option>
                <option value='active'>Active</option>
              </select>
            )}
          </td>
          <td className='mx-6 my-5 col-span-1 '>
            {user.access == "owner" ? (
              <p className='text-gray-800 font-bold'>Owner</p>
            ) : (
              <select
                id='countries'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              >
                <option defaultValue={user.access}>{user.access}</option>
              </select>
            )}
          </td>
          <td className='mx-6 my-5 col-span-1'>
            {user.access == "owner" ? <LockMemo /> : <TrashMemo />}
          </td>
        </tr>
      );
    });

    return rows;
  }
  return (
    <>
      <div className='container mx-auto  justify-center items-center max-[1000px]:flex-col font-sans'>
        <div className='w-[65vw] h-full list-table relative  min-[1000px]:overflow-hidden '>
          <table className='table-auto w-full text-left max-[1000px]:w-[800px] '>
            <thead>
              <tr className='grid grid-cols-6'>
                <th scope='col' className='px-6 py-5 col-span-3'>
                  Name
                </th>
                <th scope='col' className='px-6 py-5 col-span-1'>
                  Status
                </th>
                <th scope='col' className='px-6 py-5 col-span-1'>
                  Access
                </th>
                <th scope='col' className='px-6 py-5 col-span-1'></th>
              </tr>
            </thead>
            <tbody className='h-[90vh] max-[1000px]:h-[10vh] overflow-x-auto'>
              {tableBody()}
            </tbody>
          </table>
        </div>
        <div className='w-[35vw]'>{ProfileComponent}</div>
      </div>
    </>
  );
}

export default UserList;

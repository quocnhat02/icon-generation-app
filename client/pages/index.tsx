import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import {
  FaHome,
  FaTwitter,
  FaHashtag,
  FaBell,
  FaEnvelope,
  FaBookmark,
  FaUser,
} from 'react-icons/fa';

const inter = Inter({ subsets: ['latin'] });

interface TwitterSidebarButton {
  title: string;
  icon: ReactNode;
}

const sidebarMenuItems: TwitterSidebarButton[] = [
  {
    title: 'Home',
    icon: <FaHome />,
  },
  {
    title: 'Explore',
    icon: <FaHashtag />,
  },
  {
    title: 'Notifications',
    icon: <FaBell />,
  },
  {
    title: 'Messages',
    icon: <FaEnvelope />,
  },
  {
    title: 'Bookmarks',
    icon: <FaBookmark />,
  },
  {
    title: 'Profile',
    icon: <FaUser />,
  },
];

export default function Home() {
  return (
    <div className={inter.className}>
      <div className='grid grid-cols-12 h-screen w-screen px-52'>
        <div className='col-span-3 pl-4 pt-8 px-4'>
          <div className='h-fit w-fit text-3xl hover:bg-gray-500 hover:cursor-pointer p-2 rounded-full transition-all'>
            <FaTwitter />
          </div>
          <div className='mt-4 text-lg pr-4'>
            <ul>
              {sidebarMenuItems.map((item) => (
                <li
                  key={item.title}
                  className='flex justify-start items-center gap-4 hover:hover:bg-gray-500 hover:cursor-pointer rounded-full px-5 py-2 w-fit'
                >
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
            <div className='mt-5'>
              <button className='bg-sky-600 font-semibold text-lg py-3 px-5 rounded-full w-full'>
                Tweet
              </button>
            </div>
          </div>
        </div>
        <div className='col-span-6 border-r-[1px] border-l-[1px] border-gray-400'></div>
        <div className='col-span-3'></div>
      </div>
    </div>
  );
}
